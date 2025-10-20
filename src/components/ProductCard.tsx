import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { toast } from 'sonner';

interface ProductCardProps {
  nome: string;
  descricao: string;
  preco: number;
  imagem?: string;
}

export const ProductCard = ({ nome, descricao, preco }: ProductCardProps) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(nome, preco);
    toast.success(`${nome} adicionado ao carrinho!`);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-xl transition-all hover:-translate-y-1">
      <div className="aspect-square bg-muted rounded mb-3 flex items-center justify-center">
        <span className="text-4xl">📦</span>
      </div>
      <h3 className="font-semibold text-base mb-2 line-clamp-2">{nome}</h3>
      <p className="text-sm text-muted-foreground mb-2 line-clamp-2">{descricao}</p>
      <p className="text-lg font-bold text-[#1e90ff] mb-3">
        R$ {preco.toFixed(2).replace('.', ',')}
      </p>
      <Button 
        onClick={handleAddToCart}
        className="w-full bg-[#1e90ff] hover:bg-[#0a65c0]"
      >
        Adicionar ao Carrinho
      </Button>
    </div>
  );
};
