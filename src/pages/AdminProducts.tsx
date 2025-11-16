import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Upload, Trash2, ArrowLeft } from 'lucide-react';
import { allProducts } from '@/data/products';

export default function AdminProducts() {
  const navigate = useNavigate();
  const [selectedProduct, setSelectedProduct] = useState('');
  const [uploading, setUploading] = useState(false);
  const [productImages, setProductImages] = useState<string[]>([]);
  const [loadingImages, setLoadingImages] = useState(false);

  useEffect(() => {
    if (selectedProduct) {
      loadProductImages();
    }
  }, [selectedProduct]);

  const loadProductImages = async () => {
    try {
      setLoadingImages(true);
      const { data: files, error } = await supabase.storage
        .from('product-images')
        .list(selectedProduct);

      if (error) throw error;

      if (files) {
        const imageUrls = files.map(file => 
          `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/product-images/${selectedProduct}/${file.name}`
        );
        setProductImages(imageUrls);
      }
    } catch (error) {
      console.error('Error loading images:', error);
      toast.error('Erro ao carregar imagens');
    } finally {
      setLoadingImages(false);
    }
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0 || !selectedProduct) return;

    setUploading(true);

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}-${i}.${fileExt}`;
        const filePath = `${selectedProduct}/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('product-images')
          .upload(filePath, file);

        if (uploadError) throw uploadError;
      }

      toast.success(`${files.length} imagem(ns) enviada(s) com sucesso!`);
      loadProductImages();
    } catch (error) {
      console.error('Error uploading:', error);
      toast.error('Erro ao fazer upload das imagens');
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  const handleDelete = async (imageUrl: string) => {
    try {
      const path = imageUrl.split('/product-images/')[1];
      const { error } = await supabase.storage
        .from('product-images')
        .remove([path]);

      if (error) throw error;

      toast.success('Imagem removida com sucesso!');
      loadProductImages();
    } catch (error) {
      console.error('Error deleting:', error);
      toast.error('Erro ao remover imagem');
    }
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" onClick={() => navigate('/')}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-3xl font-bold">Gerenciar Imagens dos Produtos</h1>
          </div>
        </div>

        <Card className="p-6 mb-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="product">Selecione um Produto</Label>
              <select
                id="product"
                className="w-full p-2 border rounded-md mt-2"
                value={selectedProduct}
                onChange={(e) => setSelectedProduct(e.target.value)}
              >
                <option value="">Escolha um produto...</option>
                {allProducts.map((product) => (
                  <option key={product.id} value={product.id}>
                    {product.nome} (ID: {product.id})
                  </option>
                ))}
              </select>
            </div>

            {selectedProduct && (
              <div>
                <Label htmlFor="images">Upload de Imagens</Label>
                <div className="flex items-center gap-4 mt-2">
                  <Input
                    id="images"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleUpload}
                    disabled={uploading}
                  />
                  <Button disabled={uploading}>
                    <Upload className="h-4 w-4 mr-2" />
                    {uploading ? 'Enviando...' : 'Upload'}
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  Você pode selecionar múltiplas imagens de uma vez
                </p>
              </div>
            )}
          </div>
        </Card>

        {selectedProduct && (
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">
              Imagens do Produto {loadingImages && '(Carregando...)'}
            </h2>
            {productImages.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {productImages.map((imageUrl, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={imageUrl}
                      alt={`Produto ${index + 1}`}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    <Button
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => handleDelete(imageUrl)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-center py-8">
                Nenhuma imagem encontrada. Faça upload para começar!
              </p>
            )}
          </Card>
        )}
      </div>
    </div>
  );
}
