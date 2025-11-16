import { useState } from 'react';

export const useUnsplashImages = (productName: string, fallbackImages: string[]) => {
  // DESABILITADO: Usando apenas imagens locais
  const [images] = useState<string[]>(fallbackImages);
  const [loading] = useState(false);

  return { images, loading };
};
