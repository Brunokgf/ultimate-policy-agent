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
      'telefones': 'smartphone',
      'fones de ouvido': 'headphones earbuds',
      'computadores': 'laptop notebook computer',
      'impressoras': 'printer',
      'escritorio': 'office furniture',
      'acessorios': 'tech accessory',
      'jogos': 'gaming console'
    };
    
    const categoryTerm = categoria ? categoryMap[categoria.toLowerCase()] || categoria : '';
    console.log('Category term mapped to:', categoryTerm || 'NONE');
    
    // Build more specific search terms with category
    const searchTerms = categoryTerm 
      ? [
          `${productName} ${categoryTerm} official product photography`,
          `${productName} ${categoryTerm} product image high quality`,
          `${productName} official ${categoryTerm} white background`
        ]
      : [
          `${productName} official product image`,
          `${productName} stock photo`,
          `${productName} product photography`
        ];
    
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
    
    if (allImages.length === 0) {
      console.log('No images found, using fallback');
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