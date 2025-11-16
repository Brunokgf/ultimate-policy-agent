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

    // Fetch from Google API with improved specificity using category
    const categoryMap: Record<string, string> = {
      'telefones': 'smartphone only',
      'fones': 'headphones only',
      'computadores': 'laptop only',
      'impressoras': 'printer only',
      'escritorio': 'office chair',
      'acessorios': 'tech accessory',
      'games': 'gaming console only',
      'jogos': 'gaming console only'
    };
    
    // Terms to exclude from search results
    const excludeTerms: Record<string, string> = {
      'telefones': '-charger -case -cover -screen -protector -cabo -carregador -capa -fone -headphone -acessorio',
      'fones': '-case -cable -tips -cabo -phone -smartphone',
      'computadores': '-mouse -keyboard -bag -mochila -acessorio',
      'impressoras': '-paper -toner -cartridge -ink',
      'games': '-controller -controle -game -jogo -cd -dvd',
      'jogos': '-controller -controle -game -jogo -cd -dvd'
    };
    
    const categoryTerm = categoria ? categoryMap[categoria.toLowerCase()] || categoria : '';
    const excludeTerm = categoria ? excludeTerms[categoria.toLowerCase()] || '' : '';
    console.log('Category term:', categoryTerm || 'NONE', '| Exclude:', excludeTerm || 'NONE');
    
    // Extract brand from product name
    const brandKeywords = ['Samsung', 'Apple', 'iPhone', 'Motorola', 'Xiaomi', 'Realme', 'OnePlus', 
                          'Sony', 'JBL', 'Bose', 'Dell', 'Lenovo', 'HP', 'Acer', 'PlayStation', 
                          'Xbox', 'Nintendo', 'Logitech', 'Razer', 'HyperX', 'Nothing', 'Asus', 
                          'Google', 'Pixel', 'Poco', 'Redmi', 'Oppo', 'Vivo'];
    const brand = brandKeywords.find(b => productName.includes(b)) || '';
    
    // Build highly specific search terms combining name AND category with exclusions
    const searchTerms = [
      `"${productName}" ${categoryTerm} official product photo white background ${excludeTerm}`,
      `${brand} ${productName.replace(brand, '').trim()} ${categoryTerm} official image ${excludeTerm}`,
      `"${productName}" ${categoryTerm} stock photo ${excludeTerm}`
    ].filter(term => term.trim().length > 0);
    
    console.log('Search terms:', searchTerms);
    
    const allImages: string[] = [];
    
    // Try multiple search queries to get the best results
    for (const searchTerm of searchTerms) {
      const searchQuery = encodeURIComponent(searchTerm);
      const url = `https://www.googleapis.com/customsearch/v1?key=${GOOGLE_API_KEY}&cx=${SEARCH_ENGINE_ID}&q=${searchQuery}&searchType=image&num=2&imgSize=large&imgType=photo`;

      console.log(`Searching: ${searchTerm}`);
      
      const response = await fetch(url);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error(`Google API error ${response.status}:`, errorText);
        continue; // Try next search term
      }

      const data = await response.json();
      const googleImageUrls = data.items?.map((item: any) => item.link) || [];
      
      if (googleImageUrls.length > 0) {
        allImages.push(...googleImageUrls);
      }
    }
    
    // If no images found from Google, generate with AI
    if (allImages.length === 0) {
      console.log('No images found from Google, generating with AI...');
      
      const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
      if (!LOVABLE_API_KEY) {
        console.log('Lovable API not configured, returning empty');
        return new Response(
          JSON.stringify({ images: [] }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      // Generate 4 AI images
      const aiImagePromises = ['front view', 'side view', 'angled view', '3/4 view'].map(async (view, index) => {
        const prompt = `Professional product photography of ${productName}. ${categoryTerm || 'product'}, ${view}, clean white background, studio lighting, high quality, 4K, commercial style, no accessories, product only`;
        
        try {
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

          if (!response.ok) return null;

          const data = await response.json();
          const imageUrl = data.choices?.[0]?.message?.images?.[0]?.image_url?.url;
          if (!imageUrl) return null;

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
          
          if (uploadError) return null;
          
          const { data: { publicUrl } } = supabase.storage
            .from('product-images')
            .getPublicUrl(filePath);
          
          return publicUrl;
        } catch (error) {
          console.error('Error generating AI image:', error);
          return null;
        }
      });

      const aiUrls = await Promise.all(aiImagePromises);
      const validAiUrls = aiUrls.filter((url): url is string => url !== null);

      if (validAiUrls.length > 0) {
        await supabase
          .from('product_images_cache')
          .upsert({
            product_name: productName,
            search_query: productName,
            image_urls: validAiUrls,
          });

        console.log(`Generated ${validAiUrls.length} AI images for ${productName}`);
        return new Response(
          JSON.stringify({ images: validAiUrls }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      return new Response(
        JSON.stringify({ images: [] }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Remove duplicates and take best 4 images
    const uniqueImages = [...new Set(allImages)].slice(0, 4);
    console.log(`Found ${uniqueImages.length} unique images, downloading and uploading to storage...`);

    // Download and upload images to Supabase Storage
    const uploadPromises = uniqueImages.map((url: string, index: number) => 
      downloadAndUploadImage(url, productName, index, supabase)
    );
    
    const uploadedUrls = await Promise.all(uploadPromises);
    const validUrls = uploadedUrls.filter((url): url is string => url !== null);

    if (validUrls.length === 0) {
      console.error('Failed to upload any images');
      return new Response(
        JSON.stringify({ images: [] }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Save permanent URLs to cache
    await supabase
      .from('product_images_cache')
      .upsert({
        product_name: productName,
        search_query: productName,
        image_urls: validUrls,
      });

    console.log(`Uploaded and cached ${validUrls.length} images for ${productName}`);

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