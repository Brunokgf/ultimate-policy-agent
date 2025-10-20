import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import logo from '@/assets/logo-professional.png';

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isLogin) {
      if (login(email, password)) {
        toast.success('Login realizado com sucesso!');
        navigate('/loja');
      } else {
        toast.error('E-mail ou senha incorretos.');
      }
    } else {
      if (register(name, email, password)) {
        toast.success(`Cadastro realizado! Bem-vindo, ${name}!`);
        navigate('/loja');
      } else {
        toast.error('E-mail já cadastrado.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-black text-white py-6 flex justify-center items-center">
        <img src={logo} alt="World Tech" className="h-16 w-auto object-contain" />
      </header>

      <div className="container max-w-md mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-2xl font-bold text-center mb-6">
            {isLogin ? 'Login' : 'Cadastro'}
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <Input
                type="text"
                placeholder="Nome Completo"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            )}
            <Input
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button type="submit" className="w-full">
              {isLogin ? 'Entrar' : 'Cadastrar'}
            </Button>
          </form>

          <p
            className="text-center mt-4 text-sm text-primary cursor-pointer hover:underline"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? 'Não tem conta? Cadastre-se' : 'Já tem conta? Faça login'}
          </p>
        </div>
      </div>
    </div>
  );
}
