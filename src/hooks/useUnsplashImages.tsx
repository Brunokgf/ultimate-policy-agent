import { useState, useEffect } from 'react';
import { getCachedProductImages } from '@/services/unsplashService';

export const useUnsplashImages = (productName: string, fallbackImages: string[]) => {
  const [images, setImages] = useState<string[]>(fallbackImages);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const loadImages = async () => {
      try {
        const unsplashImages = await getCachedProductImages(productName, fallbackImages);
        
        if (mounted) {
          setImages(unsplashImages);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error loading images:', error);
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
  }, [productName]);

  return { images, loading };
};
