import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';
import { ArrowLeft, Upload, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { allProducts } from '@/data/products';

interface MigrationStatus {
  productId: string;
  productName: string;
  status: 'pending' | 'processing' | 'success' | 'error' | 'skipped';
  message?: string;
  imagesGenerated?: number;
}

export default function MigrateImages() {
  const navigate = useNavigate();
  const [migrating, setMigrating] = useState(false);
  const [clearing, setClearing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [statuses, setStatuses] = useState<MigrationStatus[]>([]);

  const clearStorage = async () => {
    setClearing(true);
    try {
      const { data, error } = await supabase.functions.invoke('clear-product-images');
      
      if (error) throw error;
      
      toast.success(data.message || 'Storage limpo com sucesso!');
      setStatuses([]);
    } catch (error) {
      console.error('Error clearing storage:', error);
      toast.error('Erro ao limpar storage');
    } finally {
      setClearing(false);
    }
  };

  const startMigration = async () => {
    setMigrating(true);
    setProgress(0);
    
    const initialStatuses: MigrationStatus[] = allProducts.map(product => ({
      productId: product.id,
      productName: product.nome,
      status: 'pending'
    }));
    setStatuses(initialStatuses);

    let completed = 0;

    for (let i = 0; i < allProducts.length; i++) {
      const product = allProducts[i];
      
      // Update status to processing
      setStatuses(prev => prev.map(s => 
        s.productId === product.id 
          ? { ...s, status: 'processing' }
          : s
      ));

      try {
        const { data, error } = await supabase.functions.invoke('migrate-product-images', {
          body: {
            productId: product.id,
            productName: product.nome,
            productDescription: product.descricao,
            categoria: product.categoria
          }
        });

        if (error) throw error;

        // Update status based on result
        setStatuses(prev => prev.map(s => 
          s.productId === product.id 
            ? { 
                ...s, 
                status: data.skipped ? 'skipped' : 'success',
                imagesGenerated: data.imagesGenerated,
                message: data.message || `${data.imagesGenerated} imagens geradas`
              }
            : s
        ));

        if (!data.skipped) {
          toast.success(`${product.nome}: ${data.imagesGenerated} imagens geradas!`);
        }

      } catch (error) {
        console.error(`Error migrating ${product.nome}:`, error);
        setStatuses(prev => prev.map(s => 
          s.productId === product.id 
            ? { ...s, status: 'error', message: 'Erro ao gerar imagens' }
            : s
        ));
        toast.error(`Erro ao migrar ${product.nome}`);
      }

      completed++;
      setProgress((completed / allProducts.length) * 100);
    }

    setMigrating(false);
    toast.success('Migração concluída!');
  };

  const getStatusIcon = (status: MigrationStatus['status']) => {
    switch (status) {
      case 'processing':
        return <Loader2 className="h-5 w-5 animate-spin text-blue-500" />;
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'error':
        return <XCircle className="h-5 w-5 text-red-500" />;
      case 'skipped':
        return <CheckCircle className="h-5 w-5 text-yellow-500" />;
      default:
        return <div className="h-5 w-5 rounded-full border-2 border-muted" />;
    }
  };

  const successCount = statuses.filter(s => s.status === 'success').length;
  const skippedCount = statuses.filter(s => s.status === 'skipped').length;
  const errorCount = statuses.filter(s => s.status === 'error').length;

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" onClick={() => navigate('/admin/produtos')}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold">Migração Automática de Imagens</h1>
              <p className="text-muted-foreground">
                Gera imagens automaticamente para todos os produtos usando IA
              </p>
            </div>
          </div>
        </div>

        <Card className="p-6 mb-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold">Iniciar Migração</h2>
                <p className="text-sm text-muted-foreground">
                  {allProducts.length} produtos serão processados
                </p>
              </div>
              <div className="flex gap-2">
                <Button 
                  onClick={clearStorage} 
                  disabled={migrating || clearing}
                  variant="outline"
                  size="lg"
                >
                  {clearing ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Limpando...
                    </>
                  ) : (
                    <>
                      <XCircle className="h-4 w-4 mr-2" />
                      Limpar Storage
                    </>
                  )}
                </Button>
                <Button 
                  onClick={startMigration} 
                  disabled={migrating || clearing}
                  size="lg"
                >
                  {migrating ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Processando...
                    </>
                  ) : (
                    <>
                      <Upload className="h-4 w-4 mr-2" />
                      Iniciar Migração
                    </>
                  )}
                </Button>
              </div>
            </div>

            {migrating && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progresso</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <Progress value={progress} />
              </div>
            )}

            {statuses.length > 0 && (
              <div className="grid grid-cols-3 gap-4 pt-4 border-t">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-500">{successCount}</div>
                  <div className="text-sm text-muted-foreground">Sucesso</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-500">{skippedCount}</div>
                  <div className="text-sm text-muted-foreground">Já existente</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-500">{errorCount}</div>
                  <div className="text-sm text-muted-foreground">Erro</div>
                </div>
              </div>
            )}
          </div>
        </Card>

        {statuses.length > 0 && (
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Status da Migração</h2>
            <div className="space-y-2 max-h-[500px] overflow-y-auto">
              {statuses.map((status) => (
                <div 
                  key={status.productId}
                  className="flex items-center justify-between p-3 border rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    {getStatusIcon(status.status)}
                    <div>
                      <div className="font-medium">{status.productName}</div>
                      <div className="text-sm text-muted-foreground">
                        ID: {status.productId}
                      </div>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {status.message}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
