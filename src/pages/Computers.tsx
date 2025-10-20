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
  { nome: 'MacBook Pro 14" M3', descricao: '16GB RAM, 512GB SSD', preco: 14999.00 },
  { nome: 'Dell XPS 15', descricao: 'i7, 16GB, 1TB SSD', preco: 9999.00 },
  { nome: 'Lenovo Legion 5', descricao: 'Ryzen 7, RTX 4060, 16GB', preco: 6999.00 },
  { nome: 'ASUS ROG Strix G15', descricao: 'i9, RTX 4070, 32GB', preco: 11999.00 },
  { nome: 'Acer Nitro 5', descricao: 'i5, RTX 3050, 8GB', preco: 4499.00 },
  { nome: 'HP Pavilion Gaming', descricao: 'Ryzen 5, GTX 1650, 8GB', preco: 3999.00 },
  { nome: 'Microsoft Surface Laptop 5', descricao: 'i7, 16GB, 512GB', preco: 8999.00 },
  { nome: 'Samsung Galaxy Book3', descricao: 'i7, 16GB, 512GB', preco: 6499.00 },
];

export default function Computers() {
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
          <h2 className="text-3xl font-bold">Computadores</h2>
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
