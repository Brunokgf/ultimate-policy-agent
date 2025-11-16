import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';
import { ArrowLeft, Plus } from 'lucide-react';

export default function AddProduct() {
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    nome: '',
    descricao: '',
    preco: '',
    categoria: 'celulares',
    imagem: ''
  });

  const categorias = [
    { value: 'celulares', label: 'Celulares' },
    { value: 'notebooks', label: 'Notebooks' },
    { value: 'fones', label: 'Fones de Ouvido' },
    { value: 'acessorios', label: 'Acessórios' },
    { value: 'games', label: 'Games' },
    { value: 'computadores', label: 'Computadores' },
    { value: 'escritorio', label: 'Escritório' },
    { value: 'impressoras', label: 'Impressoras' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.nome || !formData.descricao || !formData.preco) {
      toast.error('Preencha todos os campos obrigatórios');
      return;
    }

    setSaving(true);
    
    try {
      const { error } = await supabase
        .from('products')
        .insert({
          nome: formData.nome,
          descricao: formData.descricao,
          preco: parseFloat(formData.preco),
          categoria: formData.categoria,
          imagens: formData.imagem ? [formData.imagem] : []
        });

      if (error) throw error;

      toast.success('Produto adicionado com sucesso!');
      setFormData({
        nome: '',
        descricao: '',
        preco: '',
        categoria: 'celulares',
        imagem: ''
      });
    } catch (error) {
      console.error('Error adding product:', error);
      toast.error('Erro ao adicionar produto');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="outline" size="icon" onClick={() => navigate('/test-produtos')}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-3xl font-bold">Adicionar Produto</h1>
        </div>

        <Card className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="nome">Nome do Produto *</Label>
              <Input
                id="nome"
                value={formData.nome}
                onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                placeholder="Ex: iPhone 15 Pro Max"
                required
              />
            </div>

            <div>
              <Label htmlFor="descricao">Descrição *</Label>
              <Textarea
                id="descricao"
                value={formData.descricao}
                onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                placeholder="Descreva o produto..."
                rows={4}
                required
              />
            </div>

            <div>
              <Label htmlFor="preco">Preço (R$) *</Label>
              <Input
                id="preco"
                type="number"
                step="0.01"
                value={formData.preco}
                onChange={(e) => setFormData({ ...formData, preco: e.target.value })}
                placeholder="1299.90"
                required
              />
            </div>

            <div>
              <Label htmlFor="categoria">Categoria</Label>
              <select
                id="categoria"
                value={formData.categoria}
                onChange={(e) => setFormData({ ...formData, categoria: e.target.value })}
                className="w-full rounded-md border border-input bg-background px-3 py-2"
              >
                {categorias.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <Label htmlFor="imagem">URL da Imagem (opcional)</Label>
              <Input
                id="imagem"
                type="url"
                value={formData.imagem}
                onChange={(e) => setFormData({ ...formData, imagem: e.target.value })}
                placeholder="https://exemplo.com/imagem.jpg"
              />
              {formData.imagem && (
                <img 
                  src={formData.imagem} 
                  alt="Preview" 
                  className="mt-2 w-32 h-32 object-cover rounded"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              )}
            </div>

            <Button type="submit" disabled={saving} className="w-full">
              {saving ? 'Salvando...' : (
                <>
                  <Plus className="h-4 w-4 mr-2" />
                  Adicionar Produto
                </>
              )}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
}