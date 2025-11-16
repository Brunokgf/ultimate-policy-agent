import { useState } from 'react';

export const useUnsplashImages = (productName: string, fallbackImages: string[]) => {
  // Usando apenas imagens locais - sem busca externa
  const [images] = useState<string[]>(fallbackImages);
  const [loading] = useState(false);

  return { images, loading };
};
