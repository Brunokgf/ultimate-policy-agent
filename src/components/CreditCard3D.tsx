import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface CreditCard3DProps {
  formData: {
    numeroCartao: string;
    nomeCartao: string;
    validade: string;
    cvv: string;
  };
  onChange: (field: string, value: string) => void;
}

export const CreditCard3D = ({ formData, onChange }: CreditCard3DProps) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    const formatted = cleaned.match(/.{1,4}/g)?.join(' ') || cleaned;
    return formatted.substring(0, 19); // 16 dígitos + 3 espaços
  };

  const formatExpiry = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length >= 2) {
      return cleaned.substring(0, 2) + '/' + cleaned.substring(2, 4);
    }
    return cleaned;
  };

  const formatCVV = (value: string) => {
    return value.replace(/\D/g, '').substring(0, 3);
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value);
    onChange('numeroCartao', formatted);
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatExpiry(e.target.value);
    onChange('validade', formatted);
  };

  const handleCVVChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCVV(e.target.value);
    onChange('cvv', formatted);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange('nomeCartao', e.target.value.toUpperCase());
  };

  return (
    <div className="w-full">
      {/* Cartão 3D */}
      <div className="perspective-1000 mb-8">
        <div
          className={`relative w-full max-w-md mx-auto transition-transform duration-700 transform-style-3d ${
            isFlipped ? 'rotate-y-180' : ''
          }`}
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Frente do Cartão */}
          <div
            className="absolute w-full h-56 rounded-2xl p-6 shadow-2xl backface-hidden"
            style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              backfaceVisibility: 'hidden',
            }}
          >
            <div className="flex flex-col h-full justify-between text-white">
              <div className="flex justify-between items-start">
                <div className="w-12 h-10 bg-gradient-to-br from-yellow-200 to-yellow-400 rounded opacity-80"></div>
                <div className="text-sm font-semibold opacity-90">CREDIT CARD</div>
              </div>

              <div>
                <div className="text-2xl font-mono tracking-wider mb-4 drop-shadow-lg">
                  {formData.numeroCartao || '•••• •••• •••• ••••'}
                </div>
                <div className="flex justify-between items-end">
                  <div>
                    <div className="text-xs opacity-70 mb-1">Nome do Titular</div>
                    <div className="text-sm font-semibold tracking-wide">
                      {formData.nomeCartao || 'SEU NOME AQUI'}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs opacity-70 mb-1">Validade</div>
                    <div className="text-sm font-semibold">
                      {formData.validade || 'MM/AA'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Verso do Cartão */}
          <div
            className="w-full h-56 rounded-2xl shadow-2xl rotate-y-180 backface-hidden"
            style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
            }}
          >
            <div className="flex flex-col h-full">
              <div className="bg-gray-800 h-12 mt-6"></div>
              <div className="flex-1 p-6">
                <div className="bg-white h-10 mb-4 flex items-center justify-end px-4">
                  <div className="text-gray-800 font-mono font-bold">
                    {formData.cvv || '•••'}
                  </div>
                </div>
                <div className="text-white text-xs opacity-70">
                  Este é o código de segurança do seu cartão (CVV)
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Formulário */}
      <div className="space-y-4">
        <div>
          <Label htmlFor="numeroCartao">Número do Cartão *</Label>
          <Input
            id="numeroCartao"
            value={formData.numeroCartao}
            onChange={handleCardNumberChange}
            onFocus={() => setIsFlipped(false)}
            placeholder="1234 5678 9012 3456"
            maxLength={19}
            required
            className="font-mono text-lg"
          />
        </div>

        <div>
          <Label htmlFor="nomeCartao">Nome no Cartão *</Label>
          <Input
            id="nomeCartao"
            value={formData.nomeCartao}
            onChange={handleNameChange}
            onFocus={() => setIsFlipped(false)}
            placeholder="NOME COMO NO CARTÃO"
            required
            className="uppercase"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="validade">Validade *</Label>
            <Input
              id="validade"
              value={formData.validade}
              onChange={handleExpiryChange}
              onFocus={() => setIsFlipped(false)}
              placeholder="MM/AA"
              maxLength={5}
              required
              className="font-mono"
            />
          </div>
          <div>
            <Label htmlFor="cvv">CVV *</Label>
            <Input
              id="cvv"
              type="text"
              value={formData.cvv}
              onChange={handleCVVChange}
              onFocus={() => setIsFlipped(true)}
              onBlur={() => setIsFlipped(false)}
              placeholder="123"
              maxLength={3}
              required
              className="font-mono"
            />
          </div>
        </div>
      </div>

      <style>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .transform-style-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </div>
  );
};
