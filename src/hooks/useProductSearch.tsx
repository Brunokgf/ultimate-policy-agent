import { useState, useMemo } from 'react';
import { Product } from '@/data/products';

export const useProductSearch = (products: Product[]) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) {
      return products;
    }

    const query = searchQuery.toLowerCase();
    return products.filter(product =>
      product.nome.toLowerCase().includes(query) ||
      product.descricao.toLowerCase().includes(query) ||
      product.categoria.toLowerCase().includes(query)
    );
  }, [products, searchQuery]);

  return {
    searchQuery,
    setSearchQuery,
    filteredProducts,
  };
};
