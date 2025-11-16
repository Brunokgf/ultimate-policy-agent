import { useNavigate } from 'react-router-dom';

interface ProductCardProps {
  id: string;
  nome: string;
  descricao: string;
  preco: number;
  imagens: string[];
}

export const ProductCard = ({ id, nome, descricao, preco, imagens }: ProductCardProps) => {
  const navigate = useNavigate();

  return (
    <div 
      onClick={() => navigate(`/produto/${id}`)}
      className="bg-white rounded-lg shadow-md p-4 hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer"
    >
      <div className="aspect-square bg-muted rounded mb-3 overflow-hidden">
        <img 
          src={imagens[0]} 
          alt={nome}
          className="w-full h-full object-cover"
        />
      </div>
      <h3 className="font-semibold text-base mb-2 line-clamp-2">{nome}</h3>
      <p className="text-sm text-muted-foreground mb-2 line-clamp-2">{descricao}</p>
      <p className="text-lg font-bold text-[#1e90ff] mb-3">
        R$ {preco.toFixed(2).replace('.', ',')}
      </p>
      <div className="text-center text-sm text-muted-foreground">
        Clique para ver detalhes →
      </div>
    </div>
  );
};
