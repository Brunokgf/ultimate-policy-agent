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
  { nome: 'Carregador Rápido 65W USB-C', descricao: 'Universal, 3 portas', preco: 149.00 },
  { nome: 'Cabo USB-C Premium 2m', descricao: 'Carga rápida 100W', preco: 79.00 },
  { nome: 'Hub USB-C 7 em 1', descricao: 'HDMI, USB, SD, LAN', preco: 299.00 },
  { nome: 'Capa para Notebook 15"', descricao: 'Impermeável, acolchoada', preco: 99.00 },
  { nome: 'Suporte para Notebook Ajustável', descricao: 'Alumínio, ergonômico', preco: 149.00 },
  { nome: 'Película de Vidro para Laptop', descricao: 'Anti-reflexo, 15.6"', preco: 89.00 },
  { nome: 'Mousepad Gamer XL', descricao: '90x40cm, base antiderrapante', preco: 79.00 },
  { nome: 'Organizador de Cabos', descricao: 'Kit com 10 peças', preco: 39.00 },
];

export default function Accessories() {
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
          <h2 className="text-3xl font-bold">Acessórios</h2>
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
