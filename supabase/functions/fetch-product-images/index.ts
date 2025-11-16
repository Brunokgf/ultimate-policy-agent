import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

async function downloadAndUploadImage(
  imageUrl: string, 
  productName: string, 
  index: number,
  supabase: any
): Promise<string | null> {
  try {
    // Download image
    const response = await fetch(imageUrl);
    if (!response.ok) return null;
    
    const blob = await response.blob();
    const arrayBuffer = await blob.arrayBuffer();
    const uint8Array = new Uint8Array(arrayBuffer);
    
    // Get file extension from URL or default to jpg
    const urlPath = new URL(imageUrl).pathname;
    const ext = urlPath.split('.').pop()?.toLowerCase() || 'jpg';
    const validExts = ['jpg', 'jpeg', 'png', 'webp', 'gif'];
    const fileExt = validExts.includes(ext) ? ext : 'jpg';
    
    // Create filename
    const sanitizedName = productName.toLowerCase().replace(/[^a-z0-9]/g, '-');
    const filename = `${sanitizedName}-${index}.${fileExt}`;
    const filePath = `products/${filename}`;
    
    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from('product-images')
      .upload(filePath, uint8Array, {
        contentType: blob.type || 'image/jpeg',
        upsert: true
      });
    
    if (error) {
      console.error(`Error uploading ${filename}:`, error);
      return null;
    }
    
    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('product-images')
      .getPublicUrl(filePath);
    
    return publicUrl;
  } catch (error) {
    console.error('Error downloading/uploading image:', error);
    return null;
  }
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { productName, productId, categoria } = await req.json();
    console.log('=== Request received ===');
    console.log('Product Name:', productName);
    console.log('Product ID:', productId);
    console.log('Categoria:', categoria || 'NOT PROVIDED');
    
    if (!productName) {
      throw new Error('Product name is required');
    }

    const GOOGLE_API_KEY = Deno.env.get('GOOGLE_SEARCH_API_KEY');
    const SEARCH_ENGINE_ID = Deno.env.get('GOOGLE_SEARCH_ENGINE_ID');
    const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

    if (!GOOGLE_API_KEY || !SEARCH_ENGINE_ID) {
      throw new Error('Google API credentials not configured');
    }

    // Initialize Supabase client
    const supabase = createClient(SUPABASE_URL!, SUPABASE_SERVICE_ROLE_KEY!);

    // Check cache first
    const { data: cached } = await supabase
      .from('product_images_cache')
      .select('image_urls')
      .eq('product_name', productName)
      .single();

    if (cached && cached.image_urls.length > 0) {
      console.log(`Using cached images for ${productName}`);
      return new Response(
        JSON.stringify({ images: cached.image_urls }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Generate images with AI for better consistency
    console.log(`Generating AI images for ${productName}...`);
    
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('Lovable AI not configured');
    }

    const categoryMap: Record<string, string> = {
      'telefones': 'smartphone mobile phone',
      'fones': 'wireless headphones earbuds',
      'computadores': 'laptop computer notebook',
      'impressoras': 'office printer',
      'escritorio': 'office chair',
      'acessorios': 'tech accessory',
      'games': 'gaming console',
      'jogos': 'gaming console'
    };
    
    const categoryTerm = categoria ? categoryMap[categoria.toLowerCase()] || categoria : 'product';
    
    // Generate 4 different product views with AI
    const aiImagePromises = ['front view', 'side view', 'angled view', '3/4 view'].map(async (view, index) => {
      const prompt = `Professional product photography of ${productName}. High quality ${categoryTerm}, ${view}, clean white background, studio lighting, 4K resolution, commercial photography style, product only, no accessories, realistic`;
      
      try {
        console.log(`Generating ${view} for ${productName}`);
        
        const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${LOVABLE_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: 'google/gemini-2.5-flash-image',
            messages: [{ role: 'user', content: prompt }],
            modalities: ['image', 'text']
          }),
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error(`AI generation error ${response.status}:`, errorText);
          return null;
        }

        const data = await response.json();
        const imageUrl = data.choices?.[0]?.message?.images?.[0]?.image_url?.url;
        if (!imageUrl) {
          console.error('No image URL in AI response');
          return null;
        }

        // Upload to storage
        const base64Data = imageUrl.split(',')[1];
        const binaryData = Uint8Array.from(atob(base64Data), c => c.charCodeAt(0));
        
        const sanitizedName = productName.toLowerCase().replace(/[^a-z0-9]/g, '-');
        const filename = `${sanitizedName}-ai-${index}.png`;
        const filePath = `products/${filename}`;
        
        const { error: uploadError } = await supabase.storage
          .from('product-images')
          .upload(filePath, binaryData, {
            contentType: 'image/png',
            upsert: true
          });
        
        if (uploadError) {
          console.error(`Error uploading ${filename}:`, uploadError);
          return null;
        }
        
        const { data: { publicUrl } } = supabase.storage
          .from('product-images')
          .getPublicUrl(filePath);
        
        console.log(`Generated and uploaded ${view} for ${productName}`);
        return publicUrl;
      } catch (error) {
        console.error(`Error generating ${view}:`, error);
        return null;
      }
    });

    const aiUrls = await Promise.all(aiImagePromises);
    const validUrls = aiUrls.filter((url): url is string => url !== null);

    if (validUrls.length === 0) {
      throw new Error('Failed to generate any images');
    }

    // Cache the generated images
    await supabase
      .from('product_images_cache')
      .upsert({
        product_name: productName,
        search_query: productName,
        image_urls: validUrls,
      });

    console.log(`Generated and cached ${validUrls.length} AI images for ${productName}`);

    return new Response(
      JSON.stringify({ images: validUrls }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in fetch-product-images:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});