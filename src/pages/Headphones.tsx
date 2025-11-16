import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Navigation } from '@/components/Navigation';
import { Banner } from '@/components/Banner';
import { ProductCard } from '@/components/ProductCard';
import { CartSidebar } from '@/components/CartSidebar';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useProductSearch } from '@/hooks/useProductSearch';
import { getProductsByCategory } from '@/data/products';
import { SearchBar } from '@/components/SearchBar';
import { SecurityBadge } from '@/components/SecurityBadge';
import { usePagination } from '@/hooks/usePagination';
import { Pagination } from '@/components/Pagination';

export default function Headphones() {
  const { user } = useAuth();
  const { cart } = useCart();
  const navigate = useNavigate();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const products = getProductsByCategory('fones');
  const { searchQuery, setSearchQuery, filteredProducts } = useProductSearch(products);
  const {
    currentPage,
    totalPages,
    paginatedItems,
    goToPage,
    hasNextPage,
    hasPrevPage,
  } = usePagination(filteredProducts, 40);

  if (!user) {
    return <Navigate to="/" />;
  }

  const totalItems = cart.reduce((sum, item) => sum + item.quantidade, 0);

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      <Header />
      <Navigation />
      <Banner />

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <h2 className="text-3xl font-bold">Fones de Ouvido</h2>
          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="flex-1 md:flex-initial md:w-80">
              <SearchBar 
                onSearch={setSearchQuery}
                placeholder="Pesquisar fones..."
              />
            </div>
            <Button
              onClick={() => navigate('/carrinho')}
              className="bg-[#1e90ff] hover:bg-[#0a65c0] relative"
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              Carrinho
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-destructive text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">
                  {totalItems}
                </span>
              )}
            </Button>
          </div>
        </div>

        <div className="mb-4 text-muted-foreground">
          {filteredProducts.length} produtos encontrados | Página {currentPage} de {totalPages}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {paginatedItems.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={goToPage}
          hasNextPage={hasNextPage}
          hasPrevPage={hasPrevPage}
        />

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-muted-foreground">Nenhum produto encontrado para "{searchQuery}"</p>
            <Button
              onClick={() => setSearchQuery('')}
              variant="outline"
              className="mt-4"
            >
              Limpar pesquisa
            </Button>
          </div>
        )}
      </div>

      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <SecurityBadge />
    </div>
  );
}
