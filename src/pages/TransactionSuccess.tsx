import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { SecurityBadge } from '@/components/SecurityBadge';

interface OrderItem {
  name: string;
  code?: string;
  quantity: number;
  price: number;
}

export default function TransactionSuccess() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [orderData, setOrderData] = useState({
    orderId: '',
    total: 0,
    subtotal: 0,
    shipping: 0,
    discount: 0,
    method: '',
    name: '',
    email: '',
    date: '',
  });
  const [items, setItems] = useState<OrderItem[]>([]);

  useEffect(() => {
    // Parse URL params
    const orderId = searchParams.get('orderId') || `#${Math.floor(Math.random() * 900000 + 100000)}`;
    const total = Number(searchParams.get('total') || 0);
    const subtotal = Number(searchParams.get('subtotal') || total);
    const shipping = Number(searchParams.get('shipping') || 0);
    const discount = Number(searchParams.get('discount') || 0);
    const method = searchParams.get('method') || 'Cartão de crédito';
    const name = searchParams.get('name') || '';
    const email = searchParams.get('email') || '';
    const date = searchParams.get('date') || new Date().toLocaleString('pt-BR');

    // Parse items
    const itemsParam = searchParams.get('items');
    let parsedItems: OrderItem[] = [];
    if (itemsParam) {
      try {
        parsedItems = JSON.parse(decodeURIComponent(itemsParam));
      } catch (e) {
        console.error('Error parsing items:', e);
      }
    }

    setOrderData({ orderId, total, subtotal, shipping, discount, method, name, email, date });
    setItems(parsedItems);
  }, [searchParams]);

  const formatBRL = (value: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  };

  return (
    <div className="min-h-screen" style={{ 
      background: 'linear-gradient(180deg, #071028 0%, #071428 60%)',
      color: '#e6eef6'
    }}>
      <div className="container max-w-[980px] mx-auto px-6 py-10">
        <div className="rounded-2xl p-7 shadow-2xl" style={{
          background: 'linear-gradient(180deg, #0b1220, rgba(9,12,20,0.6))'
        }}>
          {/* Header */}
          <div className="flex items-center gap-5">
            <div 
              className="w-18 h-18 rounded-full grid place-items-center"
              style={{
                background: 'linear-gradient(135deg, #052f20, #06382b)',
                boxShadow: '0 8px 30px rgba(16,185,129,0.12), inset 0 -4px 10px rgba(0,0,0,0.4)'
              }}
            >
              <Check className="w-11 h-11 text-emerald-400" strokeWidth={1.8} />
            </div>
            <div>
              <h1 className="text-2xl font-semibold m-0">Pagamento confirmado — Obrigado pela compra!</h1>
              <p className="mt-2 text-[#9aa4b2]">Sua transação foi processada com sucesso. A seguir estão os detalhes do pedido.</p>
            </div>
          </div>

          {/* Grid Layout */}
          <div className="grid lg:grid-cols-[1fr_360px] gap-5 mt-6">
            {/* Order Info */}
            <div>
              <div 
                className="p-5 rounded-xl"
                style={{ background: 'rgba(255,255,255,0.03)' }}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-sm text-[#9aa4b2]">Pedido</div>
                    <div className="font-bold">{orderData.orderId}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-[#9aa4b2]">Total pago</div>
                    <div className="font-bold">{formatBRL(orderData.total)}</div>
                  </div>
                </div>

                <div className="flex justify-between items-center py-2 mt-3 border-b border-dashed border-white/5">
                  <div>
                    <div className="text-sm text-[#9aa4b2]">Status</div>
                    <div className="font-bold text-emerald-400">Concluído</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-[#9aa4b2]">Forma de pagamento</div>
                    <div>{orderData.method}</div>
                  </div>
                </div>

                <div className="flex justify-between items-center py-2 border-b border-dashed border-white/5">
                  <div>
                    <div className="text-sm text-[#9aa4b2]">Nome</div>
                    <div>{orderData.name}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-[#9aa4b2]">Email</div>
                    <div>{orderData.email}</div>
                  </div>
                </div>

                {/* Items */}
                <div className="mt-4">
                  {items.length === 0 ? (
                    <div className="text-[#9aa4b2] text-sm p-3">Sem itens listados — os detalhes do pedido foram enviados por e‑mail.</div>
                  ) : (
                    items.map((item, index) => (
                      <div 
                        key={index} 
                        className="flex gap-3 items-center p-3 rounded-xl mb-2"
                        style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.01), transparent)' }}
                      >
                        <div 
                          className="w-16 h-16 rounded-lg flex items-center justify-center text-[#9aa4b2] text-xs"
                          style={{ background: 'linear-gradient(180deg, #0a1b2b, #081323)' }}
                        >
                          {item.code || ''}
                        </div>
                        <div className="flex-1">
                          <div className="font-semibold">{item.name}</div>
                          <div className="text-sm text-[#9aa4b2]">
                            Quantidade: {item.quantity} · {formatBRL(item.price)}
                          </div>
                        </div>
                        <div className="font-bold">{formatBRL(item.price * item.quantity)}</div>
                      </div>
                    ))
                  )}
                </div>

                <div className="flex gap-3 flex-wrap mt-4 pt-3 border-t border-dashed border-white/5">
                  <a href="#" className="text-[#bfeecd] font-semibold">Baixar comprovante (PDF)</a>
                  <a href="#" className="text-[#bfeecd] font-semibold">Ver detalhes do pedido</a>
                </div>
              </div>

              <div className="mt-3 text-[#9aa4b2] text-sm">
                Se precisar de ajuda, responda este e‑mail ou contate nosso suporte.
              </div>
            </div>

            {/* Summary Sidebar */}
            <aside>
              <div 
                className="p-5 rounded-xl"
                style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.01), transparent)' }}
              >
                <div className="flex justify-between items-center">
                  <div className="text-[#9aa4b2]">Resumo</div>
                  <div className="text-[#9aa4b2] text-sm">{orderData.date}</div>
                </div>

                <div className="mt-3">
                  <div className="flex justify-between py-2 border-b border-dashed border-white/5">
                    <div className="text-[#9aa4b2]">Subtotal</div>
                    <div>{formatBRL(orderData.subtotal)}</div>
                  </div>
                  <div className="flex justify-between py-2 border-b border-dashed border-white/5">
                    <div className="text-[#9aa4b2]">Frete</div>
                    <div>{formatBRL(orderData.shipping)}</div>
                  </div>
                  <div className="flex justify-between py-2 border-b border-dashed border-white/5">
                    <div className="text-[#9aa4b2]">Descontos</div>
                    <div>{formatBRL(orderData.discount)}</div>
                  </div>
                  <div className="h-2"></div>
                  <div className="flex justify-between font-bold text-lg">
                    <div>Total pago</div>
                    <div>{formatBRL(orderData.total)}</div>
                  </div>
                </div>

                <div className="flex gap-2 mt-5">
                  <Button 
                    onClick={() => navigate('/loja')}
                    className="flex-1"
                    style={{ 
                      background: 'linear-gradient(90deg, #10b981, #06a06f)',
                      color: '#02120d'
                    }}
                  >
                    Continuar comprando
                  </Button>
                  <Button 
                    onClick={() => window.print()}
                    variant="outline"
                    className="border-white/10 text-[#9aa4b2]"
                  >
                    Imprimir recibo
                  </Button>
                </div>

                <div className="text-[#9aa4b2] text-sm mt-3">
                  Número do pedido e detalhes foram enviados por e‑mail.
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
      <SecurityBadge />
    </div>
  );
}
