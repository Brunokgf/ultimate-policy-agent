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
  { nome: 'PlayStation 5', descricao: 'Console + 1 controle', preco: 3999.00 },
  { nome: 'Xbox Series X', descricao: '1TB SSD', preco: 3799.00 },
  { nome: 'Nintendo Switch OLED', descricao: 'Tela OLED 7"', preco: 2499.00 },
  { nome: 'God of War Ragnarök', descricao: 'PS5, mídia física', preco: 299.00 },
  { nome: 'FIFA 24', descricao: 'Xbox Series X|S', preco: 299.00 },
  { nome: 'The Legend of Zelda: Tears', descricao: 'Nintendo Switch', preco: 349.00 },
  { nome: 'Controle Xbox Wireless', descricao: 'Preto carbon', preco: 449.00 },
  { nome: 'Headset Gamer Razer Kraken', descricao: '7.1 surround', preco: 599.00 },
];

export default function Games() {
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
          <h2 className="text-3xl font-bold">Games & Consoles</h2>
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
