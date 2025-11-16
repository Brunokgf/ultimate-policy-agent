import { useProducts } from '@/hooks/useProducts';
import { Card } from '@/components/ui/card';

export default function TestProducts() {
  const { products, loading, error } = useProducts();

  if (loading) return <div className="p-8">Carregando...</div>;
  if (error) return <div className="p-8 text-red-500">Erro: {error}</div>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Teste de Produtos ({products.length})</h1>
      <div className="grid gap-4">
        {products.map((product) => (
          <Card key={product.id} className="p-4">
            <h2 className="font-bold">{product.nome}</h2>
            <p className="text-sm text-muted-foreground">{product.descricao}</p>
            <p className="text-lg font-bold text-primary">R$ {product.preco}</p>
            <p className="text-xs">Categoria: {product.categoria}</p>
            {product.imagens && product.imagens[0] && (
              <img src={product.imagens[0]} alt={product.nome} className="w-32 h-32 object-cover mt-2" />
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}