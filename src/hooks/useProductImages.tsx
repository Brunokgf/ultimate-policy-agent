import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const useProductImages = (productName: string, productId: string) => {
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        setLoading(true);
        setError(null);

        const { data, error: functionError } = await supabase.functions.invoke(
          'fetch-product-images',
          {
            body: { productName, productId }
          }
        );

        if (functionError) throw functionError;

        if (data?.images && data.images.length > 0) {
          setImages(data.images);
        } else {
          // Fallback to placeholder if no images found
          setImages(['/placeholder.svg']);
        }
      } catch (err) {
        console.error('Error fetching product images:', err);
        setError(err instanceof Error ? err.message : 'Failed to load images');
        setImages(['/placeholder.svg']);
      } finally {
        setLoading(false);
      }
    };

    if (productName) {
      fetchImages();
    }
  }, [productName, productId]);

  return { images, loading, error };
};