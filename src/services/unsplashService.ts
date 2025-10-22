import { supabase } from '@/integrations/supabase/client';

// Cache para evitar múltiplas requisições
const imageCache = new Map<string, string[]>();

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
    console.error('Error fetching images from Google:', error);
    return [];
  }
};

export const getCachedProductImages = async (productName: string, fallbackImages: string[]): Promise<string[]> => {
  // Check cache first
  if (imageCache.has(productName)) {
    return imageCache.get(productName)!;
  }

  // Fetch from Google Image Search
  const images = await searchProductImages(productName, 3);
  
  // If we got images, cache them
  if (images.length > 0) {
    imageCache.set(productName, images);
    return images;
  }

  // Return fallback if Google search fails
  return fallbackImages;
};
