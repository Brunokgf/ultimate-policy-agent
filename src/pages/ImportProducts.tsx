import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';
import { ArrowLeft, Link as LinkIcon, Loader2, Upload } from 'lucide-react';

interface Product {
  nome: string;
  descricao: string;
  preco: number;
  categoria: string;
  imagens?: string[];
}

export default function ImportProducts() {
  const navigate = useNavigate();
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [saving, setSaving] = useState(false);

  const handleScrape = async () => {
    if (!url) {
      toast.error('Digite uma URL');
      return;
    }

    setLoading(true);
    setProducts([]);
    
    try {
      const { data, error } = await supabase.functions.invoke('scrape-products', {
        body: { url }
      });

      if (error) throw error;

      if (data.products && data.products.length > 0) {
        setProducts(data.products);
        toast.success(`${data.products.length} produtos encontrados!`);
      } else {
        toast.warning('Nenhum produto encontrado nesta página');
      }
    } catch (error) {
      console.error('Error scraping:', error);
      toast.error('Erro ao buscar produtos');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (products.length === 0) {
      toast.error('Nenhum produto para salvar');
      return;
    }

    setSaving(true);
    
    try {
      const { error } = await supabase
        .from('products')
        .insert(
          products.map(p => ({
            nome: p.nome,
            descricao: p.descricao,
            preco: p.preco,
            categoria: p.categoria,
            imagens: p.imagens || [],
            source_url: url
          }))
        );

      if (error) throw error;

      toast.success(`${products.length} produtos salvos!`);
      setProducts([]);
      setUrl('');
      navigate('/admin/produtos');
    } catch (error) {
      console.error('Error saving products:', error);
      toast.error('Erro ao salvar produtos');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="outline" size="icon" onClick={() => navigate('/admin/produtos')}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Importar Produtos</h1>
            <p className="text-muted-foreground">
              Cole o link de uma página de produtos (Amazon, Mercado Livre, etc)
            </p>
          </div>
        </div>

        <Card className="p-6 mb-6">
          <div className="space-y-4">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="https://www.amazon.com.br/produtos..."
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="pl-10"
                  disabled={loading}
                />
              </div>
              <Button onClick={handleScrape} disabled={loading || !url}>
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Buscando...
                  </>
                ) : (
                  <>
                    <LinkIcon className="h-4 w-4 mr-2" />
                    Buscar Produtos
                  </>
                )}
              </Button>
            </div>

            {products.length > 0 && (
              <div className="flex items-center justify-between pt-4 border-t">
                <p className="text-sm text-muted-foreground">
                  {products.length} produto(s) encontrado(s)
                </p>
                <Button onClick={handleSave} disabled={saving}>
                  {saving ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Salvando...
                    </>
                  ) : (
                    <>
                      <Upload className="h-4 w-4 mr-2" />
                      Salvar Todos
                    </>
                  )}
                </Button>
              </div>
            )}
          </div>
        </Card>

        {products.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map((product, index) => (
              <Card key={index} className="p-4">
                {product.imagens && product.imagens[0] && (
                  <img
                    src={product.imagens[0]}
                    alt={product.nome}
                    className="w-full h-48 object-cover rounded mb-3"
                    onError={(e) => {
                      e.currentTarget.src = '/placeholder.svg';
                    }}
                  />
                )}
                <h3 className="font-semibold mb-2 line-clamp-2">{product.nome}</h3>
                <p className="text-sm text-muted-foreground mb-2 line-clamp-3">
                  {product.descricao}
                </p>
                <div className="flex items-center justify-between">
                  <p className="text-lg font-bold text-primary">
                    R$ {product.preco.toFixed(2).replace('.', ',')}
                  </p>
                  <span className="text-xs text-muted-foreground px-2 py-1 bg-muted rounded">
                    {product.categoria}
                  </span>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}