import { useState, useEffect } from 'react';
import { getCachedProductImages } from '@/services/unsplashService';

export const useUnsplashImages = (productName: string, fallbackImages: string[]) => {
  const [images, setImages] = useState<string[]>(fallbackImages);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const loadImages = async () => {
      console.log('🎨 useUnsplashImages: Loading images for', productName);
      try {
        const unsplashImages = await getCachedProductImages(productName, fallbackImages);
        
        if (mounted) {
          console.log('✅ useUnsplashImages: Loaded', unsplashImages.length, 'images');
          setImages(unsplashImages);
          setLoading(false);
        }
      } catch (error) {
        console.error('❌ useUnsplashImages: Error loading images:', error);
        if (mounted) {
          setImages(fallbackImages);
          setLoading(false);
        }
      }
    };

    loadImages();

    return () => {
      mounted = false;
    };
  }, [productName, fallbackImages]);

  return { images, loading };
};
