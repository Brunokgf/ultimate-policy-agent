import { Link } from 'react-router-dom';
import { ShoppingCart, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';

export const Header = () => {
  const { user, logout } = useAuth();
  const { cart } = useCart();

  return (
    <header className="bg-black text-white">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/loja" className="text-2xl font-bold">
            World Tech
          </Link>
          <div className="flex items-center gap-4">
            {user && (
              <>
                <span className="text-sm">Olá, {user.name}</span>
                <div className="relative">
                  <ShoppingCart className="w-6 h-6" />
                  {cart.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-primary text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                      {cart.length}
                    </span>
                  )}
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={logout}
                  className="text-white hover:text-white/80"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sair
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
