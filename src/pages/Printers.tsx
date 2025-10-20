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
  { nome: 'HP LaserJet Pro M404dn', descricao: 'Monocromática, 40 ppm', preco: 1799.00 },
  { nome: 'Epson EcoTank L3250', descricao: 'Multifuncional tanque de tinta', preco: 1299.00 },
  { nome: 'Canon PIXMA G3260', descricao: 'Colorida, tanque de tinta', preco: 1499.00 },
  { nome: 'Brother HL-L2360DW', descricao: 'Laser mono, WiFi', preco: 999.00 },
  { nome: 'HP DeskJet Ink Advantage 2774', descricao: 'Multifuncional colorida', preco: 599.00 },
  { nome: 'Samsung Xpress M2070W', descricao: 'Laser multifuncional', preco: 1199.00 },
  { nome: 'Epson WorkForce Pro WF-4820', descricao: 'Jato de tinta profissional', preco: 2299.00 },
  { nome: 'Canon imageCLASS MF445dw', descricao: 'Laser multifuncional', preco: 2799.00 },
];

export default function Printers() {
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
          <h2 className="text-3xl font-bold">Impressoras</h2>
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
