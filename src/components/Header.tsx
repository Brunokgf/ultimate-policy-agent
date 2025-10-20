import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { SearchBar } from '@/components/SearchBar';
import { useState } from 'react';
import { allProducts } from '@/data/products';

export const Header = () => {
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const navigate = useNavigate();
  const [, setSearchResults] = useState(allProducts);

  const handleSearch = (query: string) => {
    if (!query.trim()) {
      setSearchResults(allProducts);
      return;
    }
    const filtered = allProducts.filter(product =>
      product.nome.toLowerCase().includes(query.toLowerCase()) ||
      product.descricao.toLowerCase().includes(query.toLowerCase()) ||
      product.categoria.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(filtered);
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantidade, 0);

  return (
    <header className="bg-black text-white">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center gap-4">
          <Link to="/loja" className="text-2xl font-bold whitespace-nowrap">
            World Tech
          </Link>
          
          {user && (
            <>
              <div className="flex-1 max-w-xl">
                <SearchBar onSearch={handleSearch} />
              </div>
              
              <div className="flex items-center gap-4">
                <span className="text-sm hidden md:block">Olá, {user.name}</span>
                <button
                  onClick={() => navigate('/carrinho')}
                  className="relative hover:opacity-80 transition"
                >
                  <ShoppingCart className="w-6 h-6" />
                  {totalItems > 0 && (
                    <span className="absolute -top-2 -right-2 bg-[#1e90ff] text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                      {totalItems}
                    </span>
                  )}
                </button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={logout}
                  className="text-white hover:text-white/80"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sair
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
