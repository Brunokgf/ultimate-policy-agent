import { useParams, useNavigate, Navigate } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Navigation } from '@/components/Navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import { getProductById } from '@/data/products';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ShoppingCart } from 'lucide-react';
import { toast } from 'sonner';
import { useState } from 'react';
import { SecurityBadge } from '@/components/SecurityBadge';
import { useProductImages } from '@/hooks/useProductImages';
import { Skeleton } from '@/components/ui/skeleton';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addToCart } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);

  if (!user) {
    return <Navigate to="/" />;
  }

  const product = getProductById(id || '');
  const { images, loading } = useProductImages(
    product?.nome || '', 
    id || '',
    product?.descricao
  );

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
    navigate('/carrinho');
  };

  const handleBuyNow = () => {
    addToCart(product.nome, product.preco);
    navigate('/checkout');
  }

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      <Header />
      <Navigation />

      <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-8">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-4 sm:mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar
        </Button>

        <div className="grid md:grid-cols-2 gap-6 sm:gap-8 bg-white rounded-lg shadow-lg p-4 sm:p-8">
        <div>
          <div className="aspect-square bg-muted rounded-lg overflow-hidden mb-4">
            {loading ? (
              <Skeleton className="w-full h-full" />
            ) : (
              <img 
                src={images[selectedImage] || '/placeholder.svg'} 
                alt={product.nome}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = '/placeholder.svg';
                }}
              />
            )}
          </div>
          <div className="flex gap-2 justify-center overflow-x-auto pb-2">
            {images.map((img, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 rounded-lg overflow-hidden border-2 transition ${
                  selectedImage === index ? 'border-[#1e90ff] bg-blue-50' : 'border-gray-200'
                }`}
              >
                <img 
                  src={img} 
                  alt={`${product.nome} ${index + 1}`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = '/placeholder.svg';
                  }}
                />
              </button>
            ))}
          </div>
        </div>

          <div>
            <h1 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">{product.nome}</h1>
            <p className="text-lg sm:text-xl text-muted-foreground mb-4 sm:mb-6">{product.descricao}</p>

            {product.detalhes && (
              <div className="mb-4 sm:mb-6">
                <h2 className="text-base sm:text-lg font-semibold mb-2">Sobre o produto</h2>
                <p className="text-sm sm:text-base text-muted-foreground">{product.detalhes}</p>
              </div>
            )}

            {product.especificacoes && product.especificacoes.length > 0 && (
              <div className="mb-4 sm:mb-6">
                <h2 className="text-base sm:text-lg font-semibold mb-3">Especificações</h2>
                <ul className="space-y-2">
                  {product.especificacoes.map((spec, index) => (
                    <li key={index} className="flex items-center">
                      <span className="w-2 h-2 bg-[#1e90ff] rounded-full mr-3 flex-shrink-0"></span>
                      <span className="text-sm sm:text-base text-muted-foreground">{spec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="border-t pt-4 sm:pt-6">
              <p className="text-3xl sm:text-4xl font-bold text-[#1e90ff] mb-4 sm:mb-6">
                R$ {product.preco.toFixed(2).replace('.', ',')}
              </p>

              <div className="flex flex-col gap-3">
                <Button
                  onClick={handleBuyNow}
                  className="w-full bg-[#28a745] hover:bg-[#218838] py-5 sm:py-6 text-base sm:text-lg"
                >
                  Comprar Agora
                </Button>
                <Button
                  onClick={handleAddToCart}
                  className="w-full bg-[#1e90ff] hover:bg-[#0a65c0] py-5 sm:py-6 text-base sm:text-lg"
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Adicionar ao Carrinho
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <SecurityBadge />
    </div>
  );
}
