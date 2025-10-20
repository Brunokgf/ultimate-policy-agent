export interface Product {
  id: string;
  nome: string;
  descricao: string;
  preco: number;
  categoria: string;
  imagens: string[];
  detalhes?: string;
  especificacoes?: string[];
}

export const allProducts: Product[] = [
  // Telefones
  { id: 'tel-1', nome: 'iPhone 15 Pro Max', descricao: '256GB, Titânio Natural', preco: 9499.00, categoria: 'telefones', imagens: ['📱', '📱', '📱'], detalhes: 'O mais avançado iPhone com chip A17 Pro, câmera de 48MP e tela Super Retina XDR de 6.7"', especificacoes: ['256GB', 'Titânio Natural', 'Chip A17 Pro', 'Câmera 48MP'] },
  { id: 'tel-2', nome: 'Samsung Galaxy S24 Ultra', descricao: '512GB, Preto', preco: 7999.00, categoria: 'telefones', imagens: ['📱', '📱', '📱'], detalhes: 'Tela Dynamic AMOLED 2X de 6.8", S Pen integrada, câmera de 200MP', especificacoes: ['512GB', 'Preto', 'Snapdragon 8 Gen 3', 'Câmera 200MP'] },
  { id: 'tel-3', nome: 'Xiaomi 14 Pro', descricao: '256GB, Azul', preco: 4999.00, categoria: 'telefones', imagens: ['📱', '📱', '📱'], detalhes: 'Câmera Leica, carregamento rápido de 120W, tela AMOLED de 6.73"', especificacoes: ['256GB', 'Azul', 'Snapdragon 8 Gen 3', 'Carregamento 120W'] },
  { id: 'tel-4', nome: 'iPhone 14', descricao: '128GB, Roxo', preco: 5499.00, categoria: 'telefones', imagens: ['📱', '📱', '📱'], detalhes: 'Chip A15 Bionic, câmera dupla de 12MP, resistência à água', especificacoes: ['128GB', 'Roxo', 'Chip A15', 'Câmera Dupla 12MP'] },
  { id: 'tel-5', nome: 'Samsung Galaxy A54', descricao: '256GB, Verde', preco: 2299.00, categoria: 'telefones', imagens: ['📱', '📱', '📱'], detalhes: 'Câmera tripla de 50MP, bateria de 5000mAh, tela Super AMOLED', especificacoes: ['256GB', 'Verde', 'Exynos 1380', 'Bateria 5000mAh'] },
  { id: 'tel-6', nome: 'Motorola Edge 40', descricao: '256GB, Preto', preco: 2499.00, categoria: 'telefones', imagens: ['📱', '📱', '📱'], detalhes: 'Tela OLED de 144Hz, câmera de 50MP, carregamento sem fio', especificacoes: ['256GB', 'Preto', 'MediaTek 8020', 'Tela 144Hz'] },
  { id: 'tel-7', nome: 'OnePlus 11', descricao: '256GB, Verde', preco: 3799.00, categoria: 'telefones', imagens: ['📱', '📱', '📱'], detalhes: 'Carregamento super rápido de 100W, câmera Hasselblad', especificacoes: ['256GB', 'Verde', 'Snapdragon 8 Gen 2', 'Carregamento 100W'] },
  { id: 'tel-8', nome: 'Google Pixel 8 Pro', descricao: '256GB, Azul', preco: 6499.00, categoria: 'telefones', imagens: ['📱', '📱', '📱'], detalhes: 'IA avançada do Google, câmera de 50MP com recursos exclusivos', especificacoes: ['256GB', 'Azul', 'Google Tensor G3', 'Câmera 50MP'] },

  // Fones de Ouvido
  { id: 'fone-1', nome: 'AirPods Pro 2', descricao: 'Cancelamento de ruído ativo', preco: 2199.00, categoria: 'fones', imagens: ['🎧', '🎧', '🎧'], detalhes: 'ANC adaptável, áudio espacial personalizado, resistência à água IPX4', especificacoes: ['ANC', 'Áudio Espacial', 'Até 6h de bateria', 'IPX4'] },
  { id: 'fone-2', nome: 'Sony WH-1000XM5', descricao: 'Premium noise cancelling', preco: 2299.00, categoria: 'fones', imagens: ['🎧', '🎧', '🎧'], detalhes: 'Melhor cancelamento de ruído da categoria, 30 horas de bateria', especificacoes: ['ANC Premium', '30h bateria', 'LDAC', 'Conforto supremo'] },
  { id: 'fone-3', nome: 'Bose QuietComfort 45', descricao: 'Bluetooth com ANC', preco: 1999.00, categoria: 'fones', imagens: ['🎧', '🎧', '🎧'], detalhes: 'Cancelamento de ruído legendário da Bose, conforto incomparável', especificacoes: ['ANC Bose', '24h bateria', 'Bluetooth 5.1', 'Dobráveis'] },
  { id: 'fone-4', nome: 'JBL Tune 760NC', descricao: 'Over-ear com noise cancelling', preco: 599.00, categoria: 'fones', imagens: ['🎧', '🎧', '🎧'], detalhes: 'Excelente custo-benefício, som JBL Pure Bass, 50h de bateria', especificacoes: ['ANC', '50h bateria', 'Pure Bass', 'Dobrável'] },
  { id: 'fone-5', nome: 'Samsung Galaxy Buds 2 Pro', descricao: 'In-ear com ANC', preco: 1099.00, categoria: 'fones', imagens: ['🎧', '🎧', '🎧'], detalhes: 'Design compacto, ANC inteligente, integração perfeita com Galaxy', especificacoes: ['ANC', '8h bateria', 'IPX7', 'Áudio 360'] },
  { id: 'fone-6', nome: 'Beats Studio Pro', descricao: 'Over-ear premium', preco: 1899.00, categoria: 'fones', imagens: ['🎧', '🎧', '🎧'], detalhes: 'Som característico Beats, ANC personalizado, design icônico', especificacoes: ['ANC', '40h bateria', 'USB-C', 'Cancelamento de Voz'] },
  { id: 'fone-7', nome: 'Sennheiser Momentum 4', descricao: 'Alta fidelidade', preco: 2499.00, categoria: 'fones', imagens: ['🎧', '🎧', '🎧'], detalhes: 'Qualidade de som audiófila, 60 horas de bateria, ANC adaptável', especificacoes: ['Hi-Fi', '60h bateria', 'ANC', 'aptX Adaptive'] },
  { id: 'fone-8', nome: 'Edifier W820NB', descricao: 'Custo-benefício premium', preco: 449.00, categoria: 'fones', imagens: ['🎧', '🎧', '🎧'], detalhes: 'ANC híbrido, design confortável, ótimo som pelo preço', especificacoes: ['ANC Híbrido', '49h bateria', 'Bluetooth 5.0', 'Leve'] },

  // Computadores
  { id: 'comp-1', nome: 'MacBook Pro 14" M3', descricao: '16GB RAM, 512GB SSD', preco: 14999.00, categoria: 'computadores', imagens: ['💻', '💻', '💻'], detalhes: 'Chip M3 revolucionário, tela Liquid Retina XDR, até 22h de bateria', especificacoes: ['M3', '16GB RAM', '512GB SSD', 'Tela 14.2" XDR'] },
  { id: 'comp-2', nome: 'Dell XPS 15', descricao: 'i7, 16GB, 1TB SSD', preco: 9999.00, categoria: 'computadores', imagens: ['💻', '💻', '💻'], detalhes: 'Design premium em alumínio, tela OLED 4K, desempenho excepcional', especificacoes: ['Intel i7 13ª gen', '16GB RAM', '1TB SSD', 'OLED 4K'] },
  { id: 'comp-3', nome: 'Lenovo Legion 5', descricao: 'Ryzen 7, RTX 4060, 16GB', preco: 6999.00, categoria: 'computadores', imagens: ['💻', '💻', '💻'], detalhes: 'Gaming poderoso, tela de 165Hz, sistema de refrigeração avançado', especificacoes: ['Ryzen 7 7000', 'RTX 4060', '16GB RAM', 'Tela 165Hz'] },
  { id: 'comp-4', nome: 'ASUS ROG Strix G15', descricao: 'i9, RTX 4070, 32GB', preco: 11999.00, categoria: 'computadores', imagens: ['💻', '💻', '💻'], detalhes: 'Top de linha para jogos, RGB personalizável, tela QHD 240Hz', especificacoes: ['Intel i9 13ª gen', 'RTX 4070', '32GB RAM', 'QHD 240Hz'] },
  { id: 'comp-5', nome: 'Acer Nitro 5', descricao: 'i5, RTX 3050, 8GB', preco: 4499.00, categoria: 'computadores', imagens: ['💻', '💻', '💻'], detalhes: 'Entrada no mundo gamer, bom custo-benefício, design agressivo', especificacoes: ['Intel i5 12ª gen', 'RTX 3050', '8GB RAM', 'Tela 144Hz'] },
  { id: 'comp-6', nome: 'HP Pavilion Gaming', descricao: 'Ryzen 5, GTX 1650, 8GB', preco: 3999.00, categoria: 'computadores', imagens: ['💻', '💻', '💻'], detalhes: 'Gaming acessível, design elegante, bom para trabalho e jogos', especificacoes: ['Ryzen 5 5000', 'GTX 1650', '8GB RAM', 'SSD 512GB'] },
  { id: 'comp-7', nome: 'Microsoft Surface Laptop 5', descricao: 'i7, 16GB, 512GB', preco: 8999.00, categoria: 'computadores', imagens: ['💻', '💻', '💻'], detalhes: 'Ultraportátil premium, tela touchscreen de 13.5", design minimalista', especificacoes: ['Intel i7 12ª gen', '16GB RAM', '512GB SSD', 'Touchscreen'] },
  { id: 'comp-8', nome: 'Samsung Galaxy Book3', descricao: 'i7, 16GB, 512GB', preco: 6499.00, categoria: 'computadores', imagens: ['💻', '💻', '💻'], detalhes: 'Leve e portátil, tela AMOLED, integração com Galaxy', especificacoes: ['Intel i7 13ª gen', '16GB RAM', '512GB SSD', 'AMOLED'] },

  // Impressoras
  { id: 'imp-1', nome: 'HP LaserJet Pro M404dn', descricao: 'Monocromática, 40 ppm', preco: 1799.00, categoria: 'impressoras', imagens: ['🖨️', '🖨️', '🖨️'], detalhes: 'Laser monocromática profissional, impressão rápida e econômica', especificacoes: ['Laser Mono', '40 ppm', 'Duplex automático', 'Rede'] },
  { id: 'imp-2', nome: 'Epson EcoTank L3250', descricao: 'Multifuncional tanque de tinta', preco: 1299.00, categoria: 'impressoras', imagens: ['🖨️', '🖨️', '🖨️'], detalhes: 'Sistema de tanque de tinta, econômica, Wi-Fi integrado', especificacoes: ['Tanque de tinta', 'Wi-Fi', 'Scanner', 'Colorida'] },
  { id: 'imp-3', nome: 'Canon PIXMA G3260', descricao: 'Colorida, tanque de tinta', preco: 1499.00, categoria: 'impressoras', imagens: ['🖨️', '🖨️', '🖨️'], detalhes: 'Alta qualidade de impressão, baixo custo por página', especificacoes: ['Tanque de tinta', 'Wi-Fi', 'Colorida', 'Scanner'] },
  { id: 'imp-4', nome: 'Brother HL-L2360DW', descricao: 'Laser mono, WiFi', preco: 999.00, categoria: 'impressoras', imagens: ['🖨️', '🖨️', '🖨️'], detalhes: 'Laser compacta, conexão sem fio, ideal para home office', especificacoes: ['Laser Mono', 'Wi-Fi', '32 ppm', 'Duplex'] },
  { id: 'imp-5', nome: 'HP DeskJet Ink Advantage 2774', descricao: 'Multifuncional colorida', preco: 599.00, categoria: 'impressoras', imagens: ['🖨️', '🖨️', '🖨️'], detalhes: 'Compacta e acessível, perfeita para uso doméstico', especificacoes: ['Jato de tinta', 'Wi-Fi', 'Scanner', 'Cópia'] },
  { id: 'imp-6', nome: 'Samsung Xpress M2070W', descricao: 'Laser multifuncional', preco: 1199.00, categoria: 'impressoras', imagens: ['🖨️', '🖨️', '🖨️'], detalhes: 'Multifuncional laser, impressão rápida, conexão wireless', especificacoes: ['Laser Mono', 'Wi-Fi', '20 ppm', 'Scanner'] },
  { id: 'imp-7', nome: 'Epson WorkForce Pro WF-4820', descricao: 'Jato de tinta profissional', preco: 2299.00, categoria: 'impressoras', imagens: ['🖨️', '🖨️', '🖨️'], detalhes: 'Produtividade profissional, impressão frente e verso automática', especificacoes: ['Jato de tinta', 'Duplex auto', 'Fax', 'ADF'] },
  { id: 'imp-8', nome: 'Canon imageCLASS MF445dw', descricao: 'Laser multifuncional', preco: 2799.00, categoria: 'impressoras', imagens: ['🖨️', '🖨️', '🖨️'], detalhes: 'Multifuncional laser completa, tela touchscreen', especificacoes: ['Laser Mono', 'Touchscreen', '40 ppm', 'Duplex'] },

  // Escritório
  { id: 'esc-1', nome: 'Cadeira Ergonômica DT3 Office Maya', descricao: 'Com apoio lombar', preco: 1299.00, categoria: 'escritorio', imagens: ['🪑', '🪑', '🪑'], detalhes: 'Design ergonômico premium, apoio lombar ajustável, acabamento premium', especificacoes: ['Apoio lombar', 'Altura ajustável', 'Braços 3D', 'Rodas PU'] },
  { id: 'esc-2', nome: 'Mesa para Escritório 120cm', descricao: 'MDF com gavetas', preco: 799.00, categoria: 'escritorio', imagens: ['🪑', '🪑', '🪑'], detalhes: 'Mesa espaçosa com gavetas, acabamento em MDF de qualidade', especificacoes: ['120cm largura', 'MDF', '2 gavetas', 'Suporte para CPU'] },
  { id: 'esc-3', nome: 'Monitor LG 24" Full HD', descricao: 'IPS, 75Hz', preco: 699.00, categoria: 'escritorio', imagens: ['🖥️', '🖥️', '🖥️'], detalhes: 'Painel IPS com cores precisas, 75Hz para maior fluidez', especificacoes: ['24"', 'Full HD', 'IPS', '75Hz'] },
  { id: 'esc-4', nome: 'Teclado Mecânico Logitech K835', descricao: 'Switch Blue', preco: 399.00, categoria: 'escritorio', imagens: ['⌨️', '⌨️', '⌨️'], detalhes: 'Switches mecânicos de alta qualidade, design compacto', especificacoes: ['Switch Blue', 'TKL', 'USB', 'Alumínio'] },
  { id: 'esc-5', nome: 'Mouse Logitech MX Master 3S', descricao: 'Sem fio, ergonômico', preco: 599.00, categoria: 'escritorio', imagens: ['🖱️', '🖱️', '🖱️'], detalhes: 'Top de linha para produtividade, scroll eletromagnético', especificacoes: ['Sem fio', 'Ergonômico', '8000 DPI', 'Bateria 70 dias'] },
  { id: 'esc-6', nome: 'WebCam Logitech C920', descricao: 'Full HD 1080p', preco: 499.00, categoria: 'escritorio', imagens: ['📷', '📷', '📷'], detalhes: 'Qualidade Full HD, foco automático, microfone estéreo', especificacoes: ['1080p 30fps', 'Foco automático', 'Microfone estéreo', 'USB'] },
  { id: 'esc-7', nome: 'Suporte para Monitor Articulado', descricao: 'Até 27 polegadas', preco: 199.00, categoria: 'escritorio', imagens: ['🖥️', '🖥️', '🖥️'], detalhes: 'Suporte ajustável em altura, rotação e inclinação', especificacoes: ['Até 27"', 'VESA', 'Articulado', 'Giro 360°'] },
  { id: 'esc-8', nome: 'Luminária LED de Mesa', descricao: 'Ajustável, USB', preco: 149.00, categoria: 'escritorio', imagens: ['💡', '💡', '💡'], detalhes: 'Iluminação LED ajustável, braço articulado, porta USB', especificacoes: ['LED', 'Ajustável', 'USB', '3 modos de luz'] },

  // Acessórios
  { id: 'aces-1', nome: 'Carregador Rápido 65W USB-C', descricao: 'Universal, 3 portas', preco: 149.00, categoria: 'acessorios', imagens: ['🔌', '🔌', '🔌'], detalhes: 'Carregamento rápido para múltiplos dispositivos, compacto', especificacoes: ['65W', '3 portas', 'USB-C', 'Dobrável'] },
  { id: 'aces-2', nome: 'Cabo USB-C Premium 2m', descricao: 'Carga rápida 100W', preco: 79.00, categoria: 'acessorios', imagens: ['🔌', '🔌', '🔌'], detalhes: 'Cabo reforçado, suporta até 100W, transferência rápida de dados', especificacoes: ['2 metros', '100W', 'USB 3.2', 'Reforçado'] },
  { id: 'aces-3', nome: 'Hub USB-C 7 em 1', descricao: 'HDMI, USB, SD, LAN', preco: 299.00, categoria: 'acessorios', imagens: ['🔌', '🔌', '🔌'], detalhes: 'Expanda as conexões do seu notebook, design compacto em alumínio', especificacoes: ['7 em 1', 'HDMI 4K', 'USB 3.0', 'Ethernet'] },
  { id: 'aces-4', nome: 'Capa para Notebook 15"', descricao: 'Impermeável, acolchoada', preco: 99.00, categoria: 'acessorios', imagens: ['💼', '💼', '💼'], detalhes: 'Proteção completa, material impermeável, bolso extra', especificacoes: ['15.6"', 'Impermeável', 'Acolchoada', 'Bolso frontal'] },
  { id: 'aces-5', nome: 'Suporte para Notebook Ajustável', descricao: 'Alumínio, ergonômico', preco: 149.00, categoria: 'acessorios', imagens: ['💻', '💻', '💻'], detalhes: 'Eleva o notebook para melhor ergonomia, dissipa calor', especificacoes: ['Alumínio', 'Ajustável', 'Dobrável', 'Ventilação'] },
  { id: 'aces-6', nome: 'Película de Vidro para Laptop', descricao: 'Anti-reflexo, 15.6"', preco: 89.00, categoria: 'acessorios', imagens: ['💻', '💻', '💻'], detalhes: 'Protege a tela contra riscos, reduz reflexos', especificacoes: ['15.6"', 'Vidro temperado', 'Anti-reflexo', 'Fácil instalação'] },
  { id: 'aces-7', nome: 'Mousepad Gamer XL', descricao: '90x40cm, base antiderrapante', preco: 79.00, categoria: 'acessorios', imagens: ['🖱️', '🖱️', '🖱️'], detalhes: 'Grande área, superfície lisa, bordas costuradas', especificacoes: ['90x40cm', 'Base borracha', 'RGB opcional', 'Costurado'] },
  { id: 'aces-8', nome: 'Organizador de Cabos', descricao: 'Kit com 10 peças', preco: 39.00, categoria: 'acessorios', imagens: ['🔌', '🔌', '🔌'], detalhes: 'Mantenha os cabos organizados, várias opções de fixação', especificacoes: ['10 peças', 'Silicone', 'Reutilizável', 'Adesivo'] },

  // Games & Consoles
  { id: 'game-1', nome: 'PlayStation 5', descricao: 'Console + 1 controle', preco: 3999.00, categoria: 'games', imagens: ['🎮', '🎮', '🎮'], detalhes: 'Console next-gen, gráficos em 4K, SSD ultrarrápido', especificacoes: ['825GB SSD', '4K/120fps', 'Ray tracing', 'DualSense'] },
  { id: 'game-2', nome: 'Xbox Series X', descricao: '1TB SSD', preco: 3799.00, categoria: 'games', imagens: ['🎮', '🎮', '🎮'], detalhes: 'Poder computacional de 12 teraflops, Game Pass incluído', especificacoes: ['1TB SSD', '4K/120fps', '12 TF', 'Game Pass'] },
  { id: 'game-3', nome: 'Nintendo Switch OLED', descricao: 'Tela OLED 7"', preco: 2499.00, categoria: 'games', imagens: ['🎮', '🎮', '🎮'], detalhes: 'Tela OLED vibrante, jogue em casa ou leve para qualquer lugar', especificacoes: ['OLED 7"', 'Portátil', '64GB', 'Dock incluído'] },
  { id: 'game-4', nome: 'God of War Ragnarök', descricao: 'PS5, mídia física', preco: 299.00, categoria: 'games', imagens: ['🎮', '🎮', '🎮'], detalhes: 'Continue a saga de Kratos e Atreus na mitologia nórdica', especificacoes: ['PS5', 'Mídia física', 'Português', 'Ação/Aventura'] },
  { id: 'game-5', nome: 'FIFA 24', descricao: 'Xbox Series X|S', preco: 299.00, categoria: 'games', imagens: ['🎮', '🎮', '🎮'], detalhes: 'O futebol mais realista, novos modos de jogo e times atualizados', especificacoes: ['Xbox', 'Esporte', 'Online', 'Português'] },
  { id: 'game-6', nome: 'The Legend of Zelda: Tears', descricao: 'Nintendo Switch', preco: 349.00, categoria: 'games', imagens: ['🎮', '🎮', '🎮'], detalhes: 'Aventura épica, mundo aberto gigantesco, física inovadora', especificacoes: ['Switch', 'Aventura', 'Mundo aberto', 'Português'] },
  { id: 'game-7', nome: 'Controle Xbox Wireless', descricao: 'Preto carbon', preco: 449.00, categoria: 'games', imagens: ['🎮', '🎮', '🎮'], detalhes: 'Controle sem fio, compatível com PC e Xbox, design ergonômico', especificacoes: ['Sem fio', 'Bluetooth', 'Bateria 40h', 'USB-C'] },
  { id: 'game-8', nome: 'Headset Gamer Razer Kraken', descricao: '7.1 surround', preco: 599.00, categoria: 'games', imagens: ['🎧', '🎧', '🎧'], detalhes: 'Som surround 7.1, conforto para longas sessões, microfone retrátil', especificacoes: ['7.1 Surround', 'RGB', 'Microfone', 'Almofadas gel'] },
];

export const getProductsByCategory = (category: string): Product[] => {
  return allProducts.filter(p => p.categoria === category);
};

export const getProductById = (id: string): Product | undefined => {
  return allProducts.find(p => p.id === id);
};
