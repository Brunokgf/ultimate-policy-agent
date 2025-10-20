import { Link, useLocation } from 'react-router-dom';

const categories = [
  { name: 'Telefones', path: '/loja' },
  { name: 'Fones de Ouvido', path: '/fones' },
  { name: 'Impressoras', path: '/impressoras' },
  { name: 'Computadores', path: '/computadores' },
  { name: 'Escritório', path: '/escritorio' },
  { name: 'Acessórios', path: '/acessorios' },
  { name: 'Games & Consoles', path: '/games' },
];

export const Navigation = () => {
  const location = useLocation();

  return (
    <nav className="bg-[#222]">
      <div className="container mx-auto px-4">
        <div className="flex justify-center gap-8 py-3">
          {categories.map((category) => (
            <Link
              key={category.path}
              to={category.path}
              className={`text-white font-bold transition-colors hover:text-[#1e90ff] ${
                location.pathname === category.path ? 'text-[#1e90ff]' : ''
              }`}
            >
              {category.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};
