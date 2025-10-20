import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { Link } from 'react-router-dom';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CartSidebar = ({ isOpen, onClose }: CartSidebarProps) => {
  const { cart, removeFromCart, total } = useCart();

  if (!isOpen) return null;

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/50 z-40"
        onClick={onClose}
      />
      <div className="fixed top-20 right-4 w-80 max-h-[500px] bg-white rounded-lg shadow-2xl p-4 z-50 overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-lg">Carrinho</h3>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        {cart.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">Carrinho vazio</p>
        ) : (
          <>
            <div className="space-y-3">
              {cart.map((item, index) => (
                <div key={index} className="flex justify-between items-start gap-2 pb-3 border-b">
                  <div className="flex-1">
                    <p className="font-medium text-sm">{item.nome}</p>
                    <p className="text-sm text-muted-foreground">
                      {item.quantidade}x R$ {item.preco.toFixed(2).replace('.', ',')}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFromCart(index)}
                    className="text-destructive hover:text-destructive"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t">
              <p className="text-lg font-bold text-[#1e90ff] text-right mb-4">
                Total: R$ {total.toFixed(2).replace('.', ',')}
              </p>
              <Link to="/checkout" onClick={onClose}>
                <Button className="w-full bg-[#1e90ff] hover:bg-[#0a65c0]">
                  Finalizar Compra
                </Button>
              </Link>
            </div>
          </>
        )}
      </div>
    </>
  );
};
