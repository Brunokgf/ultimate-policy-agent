import { Navigate, useNavigate } from 'react-router-dom';
import { Header } from '@/components/Header';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { toast } from 'sonner';

export default function Checkout() {
  const { user } = useAuth();
  const { cart, total, clearCart } = useCart();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nome: user?.name || '',
    endereco: '',
    cidade: '',
    cep: '',
    cartao: '',
  });

  if (!user) {
    return <Navigate to="/" />;
  }

  if (cart.length === 0) {
    return <Navigate to="/loja" />;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Pedido realizado com sucesso! 🎉');
    clearCart();
    setTimeout(() => navigate('/loja'), 1500);
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      <Header />

      <div className="container max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">Finalizar Compra</h1>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">Dados de Entrega</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="nome">Nome Completo</Label>
                <Input
                  id="nome"
                  value={formData.nome}
                  onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="endereco">Endereço</Label>
                <Input
                  id="endereco"
                  value={formData.endereco}
                  onChange={(e) => setFormData({ ...formData, endereco: e.target.value })}
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="cidade">Cidade</Label>
                  <Input
                    id="cidade"
                    value={formData.cidade}
                    onChange={(e) => setFormData({ ...formData, cidade: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="cep">CEP</Label>
                  <Input
                    id="cep"
                    value={formData.cep}
                    onChange={(e) => setFormData({ ...formData, cep: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="cartao">Número do Cartão</Label>
                <Input
                  id="cartao"
                  value={formData.cartao}
                  onChange={(e) => setFormData({ ...formData, cartao: e.target.value })}
                  placeholder="0000 0000 0000 0000"
                  required
                />
              </div>
              <Button type="submit" className="w-full bg-[#28a745] hover:bg-[#218838]">
                Confirmar Pedido
              </Button>
            </form>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 h-fit">
            <h2 className="text-xl font-bold mb-4">Resumo do Pedido</h2>
            <div className="space-y-3 mb-6">
              {cart.map((item, index) => (
                <div key={index} className="flex justify-between pb-3 border-b">
                  <div>
                    <p className="font-medium">{item.nome}</p>
                    <p className="text-sm text-muted-foreground">
                      Quantidade: {item.quantidade}
                    </p>
                  </div>
                  <p className="font-semibold">
                    R$ {(item.preco * item.quantidade).toFixed(2).replace('.', ',')}
                  </p>
                </div>
              ))}
            </div>
            <div className="pt-4 border-t">
              <div className="flex justify-between text-xl font-bold text-[#1e90ff]">
                <span>Total:</span>
                <span>R$ {total.toFixed(2).replace('.', ',')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
