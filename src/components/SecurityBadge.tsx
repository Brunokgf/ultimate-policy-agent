import { Shield, Lock, CheckCircle } from 'lucide-react';

export const SecurityBadge = () => {
  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="bg-white border-2 border-green-500 rounded-lg shadow-lg p-3 flex items-center gap-3 hover:shadow-xl transition-shadow">
        <div className="flex items-center gap-2">
          <div className="relative">
            <Shield className="w-8 h-8 text-green-600" fill="currentColor" />
            <Lock className="w-3 h-3 text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span className="text-xs font-bold text-gray-800">Site Seguro</span>
            </div>
            <span className="text-[10px] text-gray-600">Compra Protegida</span>
          </div>
        </div>
      </div>
    </div>
  );
};
