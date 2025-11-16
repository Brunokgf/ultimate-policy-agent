import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { productName, productDescription, productId } = await req.json();
    
    if (!productName) {
      throw new Error('Product name is required');
    }

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

    if (!LOVABLE_API_KEY) {
      throw new Error('Lovable AI not configured');
    }

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

    console.log(`Generating images for ${productName} using AI...`);

    // Generate 4 different views of the product
    const views = ['front view', 'side view', 'back view', 'angled view'];
    const imagePromises = views.map(async (view, index) => {
      const prompt = `Professional product photography of ${productName}. ${productDescription}. ${view}, clean white background, studio lighting, high quality, 4K resolution, commercial photography style`;
      
      console.log(`Generating ${view} for ${productName}`);
      
      const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${LOVABLE_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'google/gemini-2.5-flash-image',
          messages: [
            {
              role: 'user',
              content: prompt
            }
          ],
          modalities: ['image', 'text']
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`AI generation error ${response.status}:`, errorText);
        throw new Error(`AI generation failed: ${response.status}`);
      }

      const data = await response.json();
      const imageUrl = data.choices?.[0]?.message?.images?.[0]?.image_url?.url;
      
      if (!imageUrl) {
        throw new Error('No image URL in response');
      }

      // Convert base64 to blob and upload to storage
      const base64Data = imageUrl.split(',')[1];
      const binaryData = Uint8Array.from(atob(base64Data), c => c.charCodeAt(0));
      
      const sanitizedName = productName.toLowerCase().replace(/[^a-z0-9]/g, '-');
      const filename = `${sanitizedName}-${view.replace(' ', '-')}-${index}.png`;
      const filePath = `products/${filename}`;
      
      const { data: uploadData, error: uploadError } = await supabase.storage
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
    });

    const imageUrls = await Promise.all(imagePromises);
    const validUrls = imageUrls.filter((url): url is string => url !== null);

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

    console.log(`Generated and cached ${validUrls.length} images for ${productName}`);

    return new Response(
      JSON.stringify({ images: validUrls }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in generate-product-image:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
