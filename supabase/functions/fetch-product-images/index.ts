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
    const { productName, productId } = await req.json();
    
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

    // Fetch from Google API
    const searchQuery = encodeURIComponent(`${productName} product high quality`);
    const url = `https://www.googleapis.com/customsearch/v1?key=${GOOGLE_API_KEY}&cx=${SEARCH_ENGINE_ID}&q=${searchQuery}&searchType=image&num=4`;

    console.log(`Fetching images for ${productName} from Google API`);
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Google API error: ${response.status}`);
    }

    const data = await response.json();
    const imageUrls = data.items?.map((item: any) => item.link) || [];

    // Save to cache
    await supabase
      .from('product_images_cache')
      .upsert({
        product_name: productName,
        search_query: searchQuery,
        image_urls: imageUrls,
      });

    console.log(`Cached ${imageUrls.length} images for ${productName}`);

    return new Response(
      JSON.stringify({ images: imageUrls }),
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