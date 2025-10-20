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
  { nome: 'AirPods Pro 2', descricao: 'Cancelamento de ruído ativo', preco: 2199.00 },
  { nome: 'Sony WH-1000XM5', descricao: 'Premium noise cancelling', preco: 2299.00 },
  { nome: 'Bose QuietComfort 45', descricao: 'Bluetooth com ANC', preco: 1999.00 },
  { nome: 'JBL Tune 760NC', descricao: 'Over-ear com noise cancelling', preco: 599.00 },
  { nome: 'Samsung Galaxy Buds 2 Pro', descricao: 'In-ear com ANC', preco: 1099.00 },
  { nome: 'Beats Studio Pro', descricao: 'Over-ear premium', preco: 1899.00 },
  { nome: 'Sennheiser Momentum 4', descricao: 'Alta fidelidade', preco: 2499.00 },
  { nome: 'Edifier W820NB', descricao: 'Custo-benefício premium', preco: 449.00 },
];

export default function Headphones() {
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
          <h2 className="text-3xl font-bold">Fones de Ouvido</h2>
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
