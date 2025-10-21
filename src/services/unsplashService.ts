// Unsplash API Service
const UNSPLASH_ACCESS_KEY = 'nVX5XcbG66en78dad4KPHq1rsWoPNIk2qsgiwGTaXHE';
const UNSPLASH_API_URL = 'https://api.unsplash.com';

export interface UnsplashImage {
  id: string;
  urls: {
    raw: string;
    full: string;
    regular: string;
    small: string;
    thumb: string;
  };
  alt_description: string | null;
}

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

    const response = await fetch(
      `${UNSPLASH_API_URL}/search/photos?query=${encodeURIComponent(searchQuery)}&per_page=${count}&orientation=landscape`,
      {
        headers: {
          Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch from Unsplash');
    }

    const data = await response.json();
    
    if (data.results && data.results.length > 0) {
      return data.results.slice(0, count).map((img: UnsplashImage) => img.urls.regular);
    }

    // Fallback: search for product category
    const fallbackQuery = productName.split(' ')[0];
    const fallbackResponse = await fetch(
      `${UNSPLASH_API_URL}/search/photos?query=${encodeURIComponent(fallbackQuery)}&per_page=${count}&orientation=landscape`,
      {
        headers: {
          Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
        },
      }
    );

    const fallbackData = await fallbackResponse.json();
    
    if (fallbackData.results && fallbackData.results.length > 0) {
      return fallbackData.results.slice(0, count).map((img: UnsplashImage) => img.urls.regular);
    }

    return [];
  } catch (error) {
    console.error('Error fetching images from Unsplash:', error);
    return [];
  }
};

// Cache para evitar múltiplas requisições
const imageCache = new Map<string, string[]>();

export const getCachedProductImages = async (productName: string, fallbackImages: string[]): Promise<string[]> => {
  // Check cache first
  if (imageCache.has(productName)) {
    return imageCache.get(productName)!;
  }

  // Fetch from Unsplash
  const images = await searchProductImages(productName, 3);
  
  // If we got images, cache them
  if (images.length > 0) {
    imageCache.set(productName, images);
    return images;
  }

  // Return fallback if Unsplash fails
  return fallbackImages;
};
