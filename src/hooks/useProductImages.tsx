import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

// Complete mapping of product IDs to their local images (fallback)
const getLocalImages = (productId: string): string[] => {
  const imageMap: Record<string, string[]> = {
    // Telefones
    'tel-01': ['/src/assets/products/samsung-s24-ultra.jpg', '/src/assets/products/samsung-s24-ultra-front.jpg', '/src/assets/products/samsung-s24-ultra-back.jpg', '/src/assets/products/samsung-s24-ultra-side.jpg'],
    'tel-02': ['/src/assets/products/iphone-15-pro-max.jpg', '/src/assets/products/iphone-15-pro-max-front.jpg', '/src/assets/products/iphone-15-pro-max-back.jpg', '/src/assets/products/iphone-15-pro-max-side.jpg'],
    'tel-03': ['/src/assets/products/iphone-14-purple.jpg', '/src/assets/products/iphone-14-purple-front.jpg', '/src/assets/products/iphone-14-purple-back.jpg', '/src/assets/products/iphone-14-purple-side.jpg'],
    'tel-04': ['/src/assets/products/iphone-13-blue.jpg', '/src/assets/products/iphone-13-blue-front.jpg', '/src/assets/products/iphone-13-blue-back.jpg', '/src/assets/products/iphone-13-blue-side.jpg'],
    'tel-05': ['/src/assets/products/samsung-z-flip5-lavender.jpg', '/src/assets/products/samsung-z-flip5-lavender-front.jpg', '/src/assets/products/samsung-z-flip5-lavender-back.jpg', '/src/assets/products/samsung-z-flip5-lavender-side.jpg'],
    'tel-06': ['/src/assets/products/xiaomi-13t-black.jpg'],
    'tel-07': ['/src/assets/products/motorola-edge-40-neo.jpg', '/src/assets/products/motorola-edge-40-neo-front.jpg', '/src/assets/products/motorola-edge-40-neo-back.jpg', '/src/assets/products/motorola-edge-40-neo-side.jpg'],
    'tel-08': ['/src/assets/products/nothing-phone-2-white.jpg', '/src/assets/products/nothing-phone-2-white-front.jpg', '/src/assets/products/nothing-phone-2-white-back.jpg', '/src/assets/products/nothing-phone-2-white-side.jpg'],
    'tel-09': ['/src/assets/products/samsung-a54-green.jpg', '/src/assets/products/samsung-a54-green-front.jpg', '/src/assets/products/samsung-a54-green-back.jpg', '/src/assets/products/samsung-a54-green-side.jpg'],
    'tel-10': ['/src/assets/products/motorola-g84-black.jpg', '/src/assets/products/motorola-g84-black-front.jpg', '/src/assets/products/motorola-g84-black-back.jpg', '/src/assets/products/motorola-g84-black-side.jpg'],
    'tel-11': ['/src/assets/products/samsung-s23-fe-graphite.jpg', '/src/assets/products/samsung-s23-fe-graphite-front.jpg', '/src/assets/products/samsung-s23-fe-graphite-back.jpg', '/src/assets/products/samsung-s23-fe-graphite-side.jpg'],
    'tel-12': ['/src/assets/products/xiaomi-poco-x6-pro.jpg', '/src/assets/products/xiaomi-poco-x6-pro-front.jpg', '/src/assets/products/xiaomi-poco-x6-pro-back.jpg', '/src/assets/products/xiaomi-poco-x6-pro-side.jpg'],
    'tel-13': ['/src/assets/products/oneplus-nord-ce3.jpg', '/src/assets/products/oneplus-nord-ce3-front.jpg', '/src/assets/products/oneplus-nord-ce3-back.jpg', '/src/assets/products/oneplus-nord-ce3-side.jpg'],
    'tel-14': ['/src/assets/products/realme-11-pro-plus.jpg', '/src/assets/products/realme-11-pro-plus-front.jpg', '/src/assets/products/realme-11-pro-plus-back.jpg', '/src/assets/products/realme-11-pro-plus-side.jpg'],
    'tel-15': ['/src/assets/products/motorola-moto-g54.jpg', '/src/assets/products/motorola-moto-g54-front.jpg', '/src/assets/products/motorola-moto-g54-back.jpg', '/src/assets/products/motorola-moto-g54-side.jpg'],
    'tel-16': ['/src/assets/products/samsung-a34-violet.jpg', '/src/assets/products/samsung-a34-violet-front.jpg', '/src/assets/products/samsung-a34-violet-back.jpg', '/src/assets/products/samsung-a34-violet-side.jpg'],
    'tel-17': ['/src/assets/products/iphone-se-2022-white.jpg', '/src/assets/products/iphone-se-2022-white-front.jpg', '/src/assets/products/iphone-se-2022-white-back.jpg', '/src/assets/products/iphone-se-2022-white-side.jpg'],
    'tel-18': ['/src/assets/products/xiaomi-redmi-13c-green.jpg', '/src/assets/products/xiaomi-redmi-13c-green-front.jpg', '/src/assets/products/xiaomi-redmi-13c-green-back.jpg', '/src/assets/products/xiaomi-redmi-13c-green-side.jpg'],
    'tel-19': ['/src/assets/products/samsung-a14-black.jpg', '/src/assets/products/samsung-a14-black-front.jpg', '/src/assets/products/samsung-a14-black-back.jpg', '/src/assets/products/samsung-a14-black-side.jpg'],
    'tel-20': ['/src/assets/products/motorola-moto-g24-graphite.jpg', '/src/assets/products/motorola-moto-g24-graphite-front.jpg', '/src/assets/products/motorola-moto-g24-graphite-back.jpg', '/src/assets/products/motorola-moto-g24-graphite-side.jpg'],
    'tel-21': ['/src/assets/products/xiaomi-redmi-note-13-pro.jpg', '/src/assets/products/xiaomi-redmi-note-13-pro-front.jpg', '/src/assets/products/xiaomi-redmi-note-13-pro-back.jpg', '/src/assets/products/xiaomi-redmi-note-13-pro-side.jpg'],
    'tel-22': ['/src/assets/products/samsung-m54-silver.jpg', '/src/assets/products/samsung-m54-silver-front.jpg', '/src/assets/products/samsung-m54-silver-back.jpg', '/src/assets/products/samsung-m54-silver-side.jpg'],
    'tel-23': ['/src/assets/products/motorola-razr-40-black.jpg', '/src/assets/products/motorola-razr-40-black-front.jpg', '/src/assets/products/motorola-razr-40-black-back.jpg', '/src/assets/products/motorola-razr-40-black-side.jpg'],
    'tel-24': ['/src/assets/products/xiaomi-redmi-note-12-blue.jpg', '/src/assets/products/xiaomi-redmi-note-12-blue-front.jpg', '/src/assets/products/xiaomi-redmi-note-12-blue-back.jpg', '/src/assets/products/xiaomi-redmi-note-12-blue-side.jpg'],
    
    // Fones de Ouvido
    'fone-01': ['/src/assets/products/sony-wh1000xm5.jpg', '/src/assets/products/sony-wh1000xm5-front.jpg', '/src/assets/products/sony-wh1000xm5-side.jpg', '/src/assets/products/sony-wh1000xm5-folded.jpg'],
    'fone-02': ['/src/assets/products/airpods-pro-2.jpg', '/src/assets/products/airpods-pro-2-front.jpg', '/src/assets/products/airpods-pro-2-open.jpg', '/src/assets/products/airpods-pro-2-side.jpg'],
    'fone-03': ['/src/assets/products/jbl-tune-510bt.jpg', '/src/assets/products/jbl-tune-510bt-front.jpg', '/src/assets/products/jbl-tune-510bt-side.jpg', '/src/assets/products/jbl-tune-510bt-folded.jpg'],
    'fone-04': ['/src/assets/products/sennheiser-momentum-4.jpg', '/src/assets/products/sennheiser-momentum-4-front.jpg', '/src/assets/products/sennheiser-momentum-4-side.jpg', '/src/assets/products/sennheiser-momentum-4-folded.jpg'],
    'fone-05': ['/src/assets/products/sony-wf-1000xm5.jpg', '/src/assets/products/sony-wf-1000xm5-front.jpg', '/src/assets/products/sony-wf-1000xm5-open.jpg', '/src/assets/products/sony-wf-1000xm5-side.jpg'],
    'fone-06': ['/src/assets/products/galaxy-buds2-pro.jpg', '/src/assets/products/galaxy-buds2-pro-front.jpg', '/src/assets/products/galaxy-buds2-pro-open.jpg', '/src/assets/products/galaxy-buds2-pro-side.jpg'],
    'fone-07': ['/src/assets/products/bose-quietcomfort-earbuds-ii.jpg', '/src/assets/products/bose-quietcomfort-earbuds-ii-front.jpg', '/src/assets/products/bose-quietcomfort-earbuds-ii-open.jpg', '/src/assets/products/bose-quietcomfort-earbuds-ii-side.jpg'],
    'fone-08': ['/src/assets/products/beats-studio-buds-plus.jpg', '/src/assets/products/beats-studio-buds-plus-front.jpg', '/src/assets/products/beats-studio-buds-plus-open.jpg', '/src/assets/products/beats-studio-buds-plus-side.jpg'],
    
    // Computadores
    'comp-01': ['/src/assets/products/macbook-pro-14-m3.jpg', '/src/assets/products/macbook-pro-14-m3-front.jpg', '/src/assets/products/macbook-pro-14-m3-side.jpg', '/src/assets/products/macbook-pro-14-m3-closed.jpg'],
    'comp-02': ['/src/assets/products/dell-inspiron-15-silver.jpg', '/src/assets/products/dell-inspiron-15-silver-front.jpg', '/src/assets/products/dell-inspiron-15-silver-side.jpg', '/src/assets/products/dell-inspiron-15-silver-closed.jpg'],
    'comp-03': ['/src/assets/products/lenovo-ideapad-3i-gray.jpg', '/src/assets/products/lenovo-ideapad-3i-gray-front.jpg', '/src/assets/products/lenovo-ideapad-3i-gray-side.jpg', '/src/assets/products/lenovo-ideapad-3i-gray-closed.jpg'],
    
    // Jogos
    'jogo-01': ['/src/assets/products/playstation-5-slim.jpg', '/src/assets/products/playstation-5-slim-front.jpg', '/src/assets/products/playstation-5-slim-side.jpg', '/src/assets/products/playstation-5-slim-top.jpg'],
    'jogo-02': ['/src/assets/products/xbox-series-x-black.jpg', '/src/assets/products/xbox-series-x-black-front.jpg', '/src/assets/products/xbox-series-x-black-side.jpg', '/src/assets/products/xbox-series-x-black-top.jpg'],
    'jogo-03': ['/src/assets/products/nintendo-switch-oled-white.jpg', '/src/assets/products/nintendo-switch-oled-white-front.jpg', '/src/assets/products/nintendo-switch-oled-white-dock.jpg', '/src/assets/products/nintendo-switch-oled-white-back.jpg'],
    'jogo-04': ['/src/assets/products/controller-white.jpg', '/src/assets/products/controller-white-front.jpg', '/src/assets/products/controller-white-side.jpg', '/src/assets/products/controller-white-top.jpg'],
    
    // Acessórios
    'ace-01': ['/src/assets/products/mouse-gaming.jpg', '/src/assets/products/mouse-gaming-front.jpg', '/src/assets/products/mouse-gaming-side.jpg', '/src/assets/products/mouse-gaming-top.jpg'],
    'ace-02': ['/src/assets/products/keyboard-mechanical.jpg', '/src/assets/products/keyboard-mechanical-front.jpg', '/src/assets/products/keyboard-mechanical-side.jpg', '/src/assets/products/keyboard-mechanical-angle.jpg'],
    'ace-03': ['/src/assets/products/monitor-curved.jpg', '/src/assets/products/monitor-curved-front.jpg', '/src/assets/products/monitor-curved-side.jpg', '/src/assets/products/monitor-curved-angle.jpg'],
    'ace-04': ['/src/assets/products/powerbank-black.jpg', '/src/assets/products/powerbank-black-front.jpg', '/src/assets/products/powerbank-black-side.jpg', '/src/assets/products/powerbank-black-top.jpg'],
    'ace-05': ['/src/assets/products/mouse-wireless.jpg', '/src/assets/products/mouse-wireless-side.jpg', '/src/assets/products/mouse-wireless-top.jpg', '/src/assets/products/mouse-wireless-angle.jpg'],
    'ace-06': ['/src/assets/products/keyboard-rgb.jpg', '/src/assets/products/keyboard-rgb-front.jpg', '/src/assets/products/keyboard-rgb-side.jpg', '/src/assets/products/keyboard-rgb-angle.jpg'],
    
    // Escritório
    'escr-01': ['/src/assets/products/office-chair.jpg', '/src/assets/products/office-chair-front.jpg', '/src/assets/products/office-chair-side.jpg', '/src/assets/products/office-chair-angle.jpg'],
    'escr-02': ['/src/assets/products/gaming-chair.jpg', '/src/assets/products/gaming-chair-front.jpg', '/src/assets/products/gaming-chair-side.jpg', '/src/assets/products/gaming-chair-angle.jpg'],
    'escr-03': ['/src/assets/products/monitor-professional.jpg', '/src/assets/products/monitor-professional-front.jpg', '/src/assets/products/monitor-professional-side.jpg', '/src/assets/products/monitor-professional-angle.jpg'],
    
    // Impressoras
    'imp-01': ['/src/assets/products/printer-laser.jpg', '/src/assets/products/printer-laser-front.jpg', '/src/assets/products/printer-laser-side.jpg', '/src/assets/products/printer-laser-angle.jpg'],
    'imp-02': ['/src/assets/products/printer-inkjet.jpg', '/src/assets/products/printer-inkjet-front.jpg', '/src/assets/products/printer-inkjet-side.jpg', '/src/assets/products/printer-inkjet-top.jpg'],
  };
  
  return imageMap[productId] || ['/placeholder.svg'];
};

export const useProductImages = (productName: string, productId: string, productDescription?: string, categoria?: string) => {
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        setLoading(true);
        setError(null);

        // Try Google API first for real product images
        const { data, error: functionError } = await supabase.functions.invoke(
          'fetch-product-images',
          {
            body: { 
              productName, 
              productId,
              categoria: categoria || ''
            }
          }
        );

        if (functionError) {
          console.error('Google API failed, using local fallback:', functionError);
          const localImages = getLocalImages(productId);
          setImages(localImages);
        } else if (data?.images && data.images.length > 0) {
          setImages(data.images);
        } else {
          // Fallback to local images
          const localImages = getLocalImages(productId);
          setImages(localImages);
        }
      } catch (err) {
        console.error('Error fetching product images:', err);
        setError(err instanceof Error ? err.message : 'Failed to load images');
        const localImages = getLocalImages(productId);
        setImages(localImages);
      } finally {
        setLoading(false);
      }
    };

    if (productName) {
      fetchImages();
    }
  }, [productName, productId, productDescription]);

  return { images, loading, error };
};