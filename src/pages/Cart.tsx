import { Navigate, useNavigate, Link } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Navigation } from '@/components/Navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { X, ShoppingBag } from 'lucide-react';

export default function Cart() {
  const { user } = useAuth();
  const { cart, removeFromCart, total } = useCart();
  const navigate = useNavigate();

  if (!user) {
    return <Navigate to="/" />;
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-[#f8f9fa]">
        <Header />
        <Navigation />
        
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-12 text-center">
            <ShoppingBag className="w-24 h-24 mx-auto text-muted-foreground mb-6" />
            <h2 className="text-2xl font-bold mb-4">Seu carrinho está vazio</h2>
            <p className="text-muted-foreground mb-8">
              Adicione produtos ao carrinho para continuar comprando
            </p>
            <Button onClick={() => navigate('/loja')} className="bg-[#1e90ff] hover:bg-[#0a65c0]">
              Continuar Comprando
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      <Header />
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-8 text-center">Seu Carrinho</h2>

        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
          <div className="space-y-4">
            {cart.map((item, index) => (
              <div key={index} className="flex items-center gap-4 pb-4 border-b last:border-b-0">
                <div className="w-20 h-20 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-3xl">📦</span>
                </div>

                <div className="flex-1">
                  <h3 className="font-semibold mb-1">{item.nome}</h3>
                  <p className="text-sm text-muted-foreground">
                    Quantidade: {item.quantidade}
                  </p>
                  <p className="text-sm font-semibold text-[#1e90ff]">
                    R$ {(item.preco * item.quantidade).toFixed(2).replace('.', ',')}
                  </p>
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeFromCart(index)}
                  className="text-destructive hover:text-destructive flex-shrink-0"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-6 border-t">
            <div className="flex justify-between items-center text-xl font-bold mb-6">
              <span>Total:</span>
              <span className="text-[#1e90ff]">
                R$ {total.toFixed(2).replace('.', ',')}
              </span>
            </div>

            <div className="flex gap-4">
              <Link to="/loja" className="flex-1">
                <Button variant="outline" className="w-full">
                  Continuar Comprando
                </Button>
              </Link>
              <Link to="/checkout" className="flex-1">
                <Button className="w-full bg-[#28a745] hover:bg-[#218838]">
                  Finalizar Compra
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
