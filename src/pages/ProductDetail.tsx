import { useParams, useNavigate, Navigate } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Navigation } from '@/components/Navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import { getProductById } from '@/data/products';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ShoppingCart } from 'lucide-react';
import { toast } from 'sonner';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addToCart } = useCart();

  if (!user) {
    return <Navigate to="/" />;
  }

  const product = getProductById(id || '');

  if (!product) {
    return (
      <div className="min-h-screen bg-[#f8f9fa]">
        <Header />
        <Navigation />
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">Produto não encontrado</h1>
          <Button onClick={() => navigate('/loja')}>Voltar para a loja</Button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product.nome, product.preco);
    toast.success(`${product.nome} adicionado ao carrinho!`);
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      <Header />
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar
        </Button>

        <div className="grid md:grid-cols-2 gap-8 bg-white rounded-lg shadow-lg p-8">
          <div>
            <div className="aspect-square bg-muted rounded-lg flex items-center justify-center mb-4">
              <span className="text-9xl">📦</span>
            </div>
          </div>

          <div>
            <h1 className="text-3xl font-bold mb-4">{product.nome}</h1>
            <p className="text-xl text-muted-foreground mb-6">{product.descricao}</p>

            {product.detalhes && (
              <div className="mb-6">
                <h2 className="text-lg font-semibold mb-2">Sobre o produto</h2>
                <p className="text-muted-foreground">{product.detalhes}</p>
              </div>
            )}

            {product.especificacoes && product.especificacoes.length > 0 && (
              <div className="mb-6">
                <h2 className="text-lg font-semibold mb-3">Especificações</h2>
                <ul className="space-y-2">
                  {product.especificacoes.map((spec, index) => (
                    <li key={index} className="flex items-center">
                      <span className="w-2 h-2 bg-[#1e90ff] rounded-full mr-3"></span>
                      <span className="text-muted-foreground">{spec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="border-t pt-6">
              <p className="text-4xl font-bold text-[#1e90ff] mb-6">
                R$ {product.preco.toFixed(2).replace('.', ',')}
              </p>

              <div className="flex gap-4">
                <Button
                  onClick={handleAddToCart}
                  className="flex-1 bg-[#1e90ff] hover:bg-[#0a65c0] py-6 text-lg"
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Adicionar ao Carrinho
                </Button>
                <Button
                  onClick={() => navigate('/carrinho')}
                  variant="outline"
                  className="px-8 py-6"
                >
                  Ver Carrinho
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
