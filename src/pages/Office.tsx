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
  { nome: 'Cadeira Ergonômica DT3 Office Maya', descricao: 'Com apoio lombar', preco: 1299.00 },
  { nome: 'Mesa para Escritório 120cm', descricao: 'MDF com gavetas', preco: 799.00 },
  { nome: 'Monitor LG 24" Full HD', descricao: 'IPS, 75Hz', preco: 699.00 },
  { nome: 'Teclado Mecânico Logitech K835', descricao: 'Switch Blue', preco: 399.00 },
  { nome: 'Mouse Logitech MX Master 3S', descricao: 'Sem fio, ergonômico', preco: 599.00 },
  { nome: 'WebCam Logitech C920', descricao: 'Full HD 1080p', preco: 499.00 },
  { nome: 'Suporte para Monitor Articulado', descricao: 'Até 27 polegadas', preco: 199.00 },
  { nome: 'Luminária LED de Mesa', descricao: 'Ajustável, USB', preco: 149.00 },
];

export default function Office() {
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
          <h2 className="text-3xl font-bold">Escritório</h2>
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
