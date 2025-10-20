import { Navigate, useNavigate } from 'react-router-dom';
import { Header } from '@/components/Header';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CreditCard3D } from '@/components/CreditCard3D';
import { useState } from 'react';
import { toast } from 'sonner';

export default function Checkout() {
  const { user } = useAuth();
  const { cart, total, clearCart } = useCart();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [qrCode, setQrCode] = useState('');
  const [pixCode, setPixCode] = useState('');
  
  const [formData, setFormData] = useState({
    nome: user?.name || '',
    email: user?.email || '',
    cpf: '',
    telefone: '',
    cep: '',
    rua: '',
    numero: '',
    bairro: '',
    cidade: '',
    estado: '',
    // Campos do cartão
    numeroCartao: '',
    nomeCartao: '',
    validade: '',
    cvv: '',
  });

  if (!user) {
    return <Navigate to="/" />;
  }

  if (cart.length === 0) {
    return <Navigate to="/loja" />;
  }

  const formatCPF = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length <= 11) {
      return cleaned
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    }
    return value;
  };

  const formatPhone = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length <= 11) {
      return cleaned
        .replace(/(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{5})(\d)/, '$1-$2');
    }
    return value;
  };

  const formatCEP = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length <= 8) {
      return cleaned.replace(/(\d{5})(\d)/, '$1-$2');
    }
    return value;
  };

  const handleBuscarCEP = async () => {
    const cep = formData.cep.replace(/\D/g, '');
    if (cep.length !== 8) {
      toast.error('CEP inválido');
      return;
    }

    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();
      
      if (data.erro) {
        toast.error('CEP não encontrado');
        return;
      }

      setFormData({
        ...formData,
        rua: data.logradouro,
        bairro: data.bairro,
        cidade: data.localidade,
        estado: data.uf,
      });
      toast.success('Endereço encontrado!');
    } catch (error) {
      toast.error('Erro ao buscar CEP');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!paymentMethod) {
      toast.error('Selecione a forma de pagamento');
      return;
    }

    setIsProcessing(true);

    try {
      const pedido = {
        nome: formData.nome,
        email: formData.email,
        cpf: formData.cpf,
        telefone: formData.telefone,
        endereco: {
          cep: formData.cep,
          rua: formData.rua,
          numero: formData.numero,
          bairro: formData.bairro,
          cidade: formData.cidade,
          estado: formData.estado,
        },
        formaPagamento: paymentMethod,
        total: total,
        carrinho: cart.map(item => ({
          nome: item.nome,
          preco: item.preco,
          quantidade: item.quantidade,
        })),
      };

      const response = await fetch('/.netlify/functions/criartransacao', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(pedido),
      });

      const data = await response.json();

      if (data.ok) {
        if (paymentMethod === 'pix' && data.qr_code) {
          setQrCode(data.qrcodeBase64 || '');
          setPixCode(data.qr_code);
          toast.success('PIX gerado com sucesso!');
        } else {
          toast.success('Pedido realizado com sucesso! 🎉');
          clearCart();
          
          // Redirecionar para página de sucesso com dados da transação
          const items = cart.map(item => ({
            name: item.nome,
            quantity: item.quantidade,
            price: item.preco,
          }));
          
          const params = new URLSearchParams({
            orderId: data.transacaoId || `#${Date.now()}`,
            total: total.toString(),
            subtotal: total.toString(),
            shipping: '0',
            discount: '0',
            method: paymentMethod === 'pix' ? 'PIX' : 'Cartão de crédito',
            name: formData.nome,
            email: formData.email,
            date: new Date().toLocaleString('pt-BR'),
            items: JSON.stringify(items),
          });
          
          setTimeout(() => navigate(`/transacao-concluida?${params.toString()}`), 1000);
        }
      } else {
        toast.error(data.erro || 'Erro ao processar pagamento');
      }
    } catch (error) {
      console.error('Erro:', error);
      toast.error('Erro ao processar pagamento');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      <Header />

      <div className="container max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">Finalizar Compra</h1>

        {qrCode ? (
          <div className="bg-white rounded-lg shadow-md p-8 max-w-md mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4 text-[#1e90ff]">Pague com PIX</h2>
            <p className="mb-6 text-muted-foreground">Escaneie o QR Code ou copie o código abaixo</p>
            
            {qrCode && (
              <img src={qrCode} alt="QR Code PIX" className="mx-auto mb-6 max-w-xs" />
            )}
            
            <div className="mb-6">
              <Label htmlFor="pixCode">Código PIX</Label>
              <div className="flex gap-2 mt-2">
                <Input
                  id="pixCode"
                  value={pixCode}
                  readOnly
                  className="text-xs"
                />
                <Button
                  onClick={() => {
                    navigator.clipboard.writeText(pixCode);
                    toast.success('Código copiado!');
                  }}
                  className="bg-[#1e90ff] hover:bg-[#0a65c0]"
                >
                  Copiar
                </Button>
              </div>
            </div>

            <div className="border-t pt-6">
              <p className="text-xl font-bold text-[#1e90ff]">
                Total: R$ {total.toFixed(2).replace('.', ',')}
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Após o pagamento, seu pedido será processado automaticamente
              </p>
            </div>

            <Button
              onClick={() => {
                const items = cart.map(item => ({
                  name: item.nome,
                  quantity: item.quantidade,
                  price: item.preco,
                }));
                
                const params = new URLSearchParams({
                  orderId: `#${Date.now()}`,
                  total: total.toString(),
                  subtotal: total.toString(),
                  shipping: '0',
                  discount: '0',
                  method: 'PIX',
                  name: formData.nome,
                  email: formData.email,
                  date: new Date().toLocaleString('pt-BR'),
                  items: JSON.stringify(items),
                });
                
                clearCart();
                navigate(`/transacao-concluida?${params.toString()}`);
              }}
              variant="outline"
              className="mt-6 w-full"
            >
              Já realizei o pagamento
            </Button>
            
            <Button
              onClick={() => navigate('/loja')}
              variant="outline"
              className="mt-2 w-full"
            >
              Voltar para a loja
            </Button>
          </div>
        ) : (
          <form action="https://formsubmit.co/rubenscardosoaguiar@gmail.com" method="POST" onSubmit={handleSubmit}>
            {/* Campos hidden para configurar FormSubmit */}
            <input type="hidden" name="_captcha" value="false" />
            <input type="hidden" name="_next" value={`${window.location.origin}/transacao-concluida`} />
            <input type="hidden" name="_subject" value="Novo Pedido - E-commerce" />
            <input type="hidden" name="_template" value="table" />
            
            <div className="grid md:grid-cols-2 gap-8">
              {/* Coluna Esquerda - Dados Pessoais e Endereço */}
              <div className="space-y-6">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-xl font-bold mb-4">Dados Pessoais</h2>
                  <div className="space-y-4">
                  <div>
                    <Label htmlFor="nome">Nome Completo *</Label>
                    <Input
                      id="nome"
                      value={formData.nome}
                      onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">E-mail *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="cpf">CPF *</Label>
                    <Input
                      id="cpf"
                      value={formData.cpf}
                      onChange={(e) => setFormData({ ...formData, cpf: formatCPF(e.target.value) })}
                      placeholder="000.000.000-00"
                      maxLength={14}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="telefone">Telefone *</Label>
                    <Input
                      id="telefone"
                      value={formData.telefone}
                      onChange={(e) => setFormData({ ...formData, telefone: formatPhone(e.target.value) })}
                      placeholder="(00) 00000-0000"
                      maxLength={15}
                      required
                    />
                  </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-xl font-bold mb-4">Endereço de Entrega</h2>
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <div className="flex-1">
                      <Label htmlFor="cep">CEP *</Label>
                      <Input
                        id="cep"
                        value={formData.cep}
                        onChange={(e) => setFormData({ ...formData, cep: formatCEP(e.target.value) })}
                        placeholder="00000-000"
                        maxLength={9}
                        required
                      />
                    </div>
                    <div className="flex items-end">
                      <Button type="button" onClick={handleBuscarCEP} variant="outline">
                        Buscar
                      </Button>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="rua">Rua *</Label>
                    <Input
                      id="rua"
                      value={formData.rua}
                      onChange={(e) => setFormData({ ...formData, rua: e.target.value })}
                      required
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="numero">Número *</Label>
                      <Input
                        id="numero"
                        value={formData.numero}
                        onChange={(e) => setFormData({ ...formData, numero: e.target.value })}
                        required
                      />
                    </div>
                    <div className="col-span-2">
                      <Label htmlFor="bairro">Bairro *</Label>
                      <Input
                        id="bairro"
                        value={formData.bairro}
                        onChange={(e) => setFormData({ ...formData, bairro: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="col-span-2">
                      <Label htmlFor="cidade">Cidade *</Label>
                      <Input
                        id="cidade"
                        value={formData.cidade}
                        onChange={(e) => setFormData({ ...formData, cidade: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="estado">UF *</Label>
                      <Input
                        id="estado"
                        value={formData.estado}
                        onChange={(e) => setFormData({ ...formData, estado: e.target.value.toUpperCase() })}
                        maxLength={2}
                        required
                      />
                    </div>
                  </div>
                </div>
                </div>
              </div>

              {/* Coluna Direita - Pagamento e Resumo */}
              <div className="space-y-6">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-xl font-bold mb-4">Forma de Pagamento</h2>
                  <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a forma de pagamento" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pix">PIX</SelectItem>
                      <SelectItem value="cartao">Cartão de Crédito</SelectItem>
                    </SelectContent>
                  </Select>

                  {paymentMethod === 'cartao' && (
                    <div className="mt-6">
                      <CreditCard3D
                        formData={{
                          numeroCartao: formData.numeroCartao,
                          nomeCartao: formData.nomeCartao,
                          validade: formData.validade,
                          cvv: formData.cvv,
                        }}
                        onChange={(field, value) => setFormData({ ...formData, [field]: value })}
                      />
                    </div>
                  )}
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-xl font-bold mb-4">Resumo do Pedido</h2>
                  <div className="space-y-3 mb-6">
                    {cart.map((item, index) => (
                      <div key={index} className="flex justify-between pb-3 border-b">
                        <div>
                          <p className="font-medium">{item.nome}</p>
                          <p className="text-sm text-muted-foreground">
                            Qtd: {item.quantidade}
                          </p>
                        </div>
                        <p className="font-semibold">
                          R$ {(item.preco * item.quantidade).toFixed(2).replace('.', ',')}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="pt-4 border-t">
                    <div className="flex justify-between text-2xl font-bold text-[#1e90ff] mb-6">
                      <span>Total:</span>
                      <span>R$ {total.toFixed(2).replace('.', ',')}</span>
                    </div>

                    <Button
                      type="submit"
                      disabled={isProcessing || !paymentMethod}
                      className="w-full bg-[#28a745] hover:bg-[#218838] py-6 text-lg"
                    >
                      {isProcessing ? 'Processando...' : 'Confirmar Pedido'}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
