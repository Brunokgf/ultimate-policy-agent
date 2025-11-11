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
    <nav className="bg-[#222] overflow-x-auto">
      <div className="container mx-auto px-3 sm:px-4">
        <div className="flex sm:justify-center gap-4 sm:gap-8 py-3 min-w-max sm:min-w-0">
          {categories.map((category) => (
            <Link
              key={category.path}
              to={category.path}
              className={`text-white text-sm sm:text-base font-bold transition-colors hover:text-[#1e90ff] whitespace-nowrap ${
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
