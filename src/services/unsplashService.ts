import { supabase } from '@/integrations/supabase/client';

export const searchProductImages = async (productName: string, count: number = 3): Promise<string[]> => {
  try {
    console.log('🔍 Searching images for product:', productName);
    
    // Clean product name for better search results
    const searchQuery = productName
      .replace(/\d+GB/gi, '')
      .replace(/\d+MP/gi, '')
      .replace(/\d+"/gi, '')
      .replace(/\d+W/gi, '')
      .replace(/[,]/g, '')
      .trim();

    console.log('📝 Cleaned search query:', searchQuery);

    const { data, error } = await supabase.functions.invoke('google-image-search', {
      body: { query: searchQuery }
    });

    console.log('📡 Edge function response:', { data, error });

    if (error) {
      console.error('❌ Google Image Search error:', error);
      return [];
    }

    if (data?.images && data.images.length > 0) {
      console.log(`✅ Found ${data.images.length} images`);
      return data.images.slice(0, count).map((img: any) => img.url);
    }

    console.warn('⚠️ No images found in response');
    return [];
  } catch (error) {
    console.error('Error generating images with AI:', error);
    return [];
  }
};

export const getCachedProductImages = async (productName: string, fallbackImages: string[]): Promise<string[]> => {
  try {
    console.log('💾 getCachedProductImages: Checking cache for', productName);
    
    // First, check if images are already cached in database
    const { data: cachedData, error: cacheError } = await supabase
      .from('product_images_cache')
      .select('image_urls')
      .eq('product_name', productName)
      .maybeSingle();

    if (!cacheError && cachedData?.image_urls && cachedData.image_urls.length > 0) {
      console.log('✨ Using cached images for:', productName, 'Count:', cachedData.image_urls.length);
      return cachedData.image_urls;
    }

    // If not cached, search with Google API
    console.log('🔎 No cache found. Searching Google images for:', productName);
    const images = await searchProductImages(productName, 3);
    
    // If we got images, they were automatically cached by the edge function
    if (images.length > 0) {
      console.log('✅ Got', images.length, 'images from Google API for:', productName);
      return images;
    }

    // Return fallback if everything fails
    console.warn('⚠️ No images found, using fallback for:', productName);
    return fallbackImages;
  } catch (error) {
    console.error('❌ Error in getCachedProductImages:', error);
    return fallbackImages;
  }
};
