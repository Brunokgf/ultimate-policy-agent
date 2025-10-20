import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface CartItem {
  nome: string;
  preco: number;
  quantidade: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (nome: string, preco: number) => void;
  removeFromCart: (index: number) => void;
  clearCart: () => void;
  total: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const savedCart = localStorage.getItem('carrinho');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  const saveCart = (newCart: CartItem[]) => {
    localStorage.setItem('carrinho', JSON.stringify(newCart));
    setCart(newCart);
  };

  const addToCart = (nome: string, preco: number) => {
    const existingItem = cart.find(item => item.nome === nome);
    
    if (existingItem) {
      const updatedCart = cart.map(item =>
        item.nome === nome
          ? { ...item, quantidade: item.quantidade + 1 }
          : item
      );
      saveCart(updatedCart);
    } else {
      saveCart([...cart, { nome, preco, quantidade: 1 }]);
    }
  };

  const removeFromCart = (index: number) => {
    const newCart = cart.filter((_, i) => i !== index);
    saveCart(newCart);
  };

  const clearCart = () => {
    localStorage.removeItem('carrinho');
    setCart([]);
  };

  const total = cart.reduce((sum, item) => sum + item.preco * item.quantidade, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, total }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};
