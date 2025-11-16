import { supabase } from '@/integrations/supabase/client';

export const searchProductImages = async (productName: string, count: number = 3): Promise<string[]> => {
  try {
    // Clean product name for better search results
    const searchQuery = productName
      .replace(/\d+GB/gi, '')
      .replace(/\d+MP/gi, '')
      .replace(/\d+"/gi, '')
      .replace(/\d+W/gi, '')
      .replace(/[,]/g, '')
      .trim();

    const { data, error } = await supabase.functions.invoke('google-image-search', {
      body: { query: searchQuery }
    });

    if (error) {
      console.warn('Google Image Search error:', error);
      return [];
    }

    if (data?.images && data.images.length > 0) {
      return data.images.slice(0, count).map((img: any) => img.url);
    }

    return [];
  } catch (error) {
    console.error('Error generating images with AI:', error);
    return [];
  }
};

export const getCachedProductImages = async (productName: string, fallbackImages: string[]): Promise<string[]> => {
  try {
    // First, check if images are already cached in database
    const { data: cachedData, error: cacheError } = await supabase
      .from('product_images_cache')
      .select('image_urls')
      .eq('product_name', productName)
      .maybeSingle();

    if (!cacheError && cachedData?.image_urls && cachedData.image_urls.length > 0) {
      console.log('Using cached images for:', productName);
      return cachedData.image_urls;
    }

    // If not cached, search with Google API
    console.log('Searching Google images for:', productName);
    const images = await searchProductImages(productName, 3);
    
    // If we got images, they were automatically cached by the edge function
    if (images.length > 0) {
      return images;
    }

    // Return fallback if everything fails
    return fallbackImages;
  } catch (error) {
    console.error('Error in getCachedProductImages:', error);
    return fallbackImages;
  }
};
