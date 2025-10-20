import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Navigation } from '@/components/Navigation';
import { ProductCard } from '@/components/ProductCard';
import { CartSidebar } from '@/components/CartSidebar';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';

const products = [
  { nome: 'iPhone 15 Pro Max', descricao: '256GB, Titânio Natural', preco: 9499.00 },
  { nome: 'Samsung Galaxy S24 Ultra', descricao: '512GB, Preto', preco: 7999.00 },
  { nome: 'Xiaomi 14 Pro', descricao: '256GB, Azul', preco: 4999.00 },
  { nome: 'iPhone 14', descricao: '128GB, Roxo', preco: 5499.00 },
  { nome: 'Samsung Galaxy A54', descricao: '256GB, Verde', preco: 2299.00 },
  { nome: 'Motorola Edge 40', descricao: '256GB, Preto', preco: 2499.00 },
  { nome: 'OnePlus 11', descricao: '256GB, Verde', preco: 3799.00 },
  { nome: 'Google Pixel 8 Pro', descricao: '256GB, Azul', preco: 6499.00 },
];

export default function Store() {
  const { user } = useAuth();
  const { cart } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);

  if (!user) {
    return <Navigate to="/" />;
  }

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      <Header />
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Telefones</h2>
          <Button
            onClick={() => setIsCartOpen(!isCartOpen)}
            className="bg-[#1e90ff] hover:bg-[#0a65c0] relative"
          >
            <ShoppingCart className="w-5 h-5 mr-2" />
            Ver Carrinho
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-destructive text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">
                {cart.length}
              </span>
            )}
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <ProductCard key={index} {...product} />
          ))}
        </div>
      </div>

      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
}
