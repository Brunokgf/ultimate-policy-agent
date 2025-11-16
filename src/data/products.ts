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
  { id: 'tel-01', nome: 'Samsung Galaxy S24 Ultra', descricao: '256GB, Titânio', preco: 7499.00, categoria: 'telefones', imagens: [], detalhes: 'Smartphone top de linha da Samsung', especificacoes: ['256GB', 'Snapdragon 8 Gen 3', '200MP', '5000mAh'] },
  { id: 'tel-02', nome: 'iPhone 15 Pro Max', descricao: '256GB, Titânio Natural', preco: 9499.00, categoria: 'telefones', imagens: [], detalhes: 'iPhone mais poderoso já criado', especificacoes: ['256GB', 'A17 Pro', '48MP', 'ProMotion'] },
  { id: 'tel-03', nome: 'iPhone 14', descricao: '128GB, Roxo', preco: 5499.00, categoria: 'telefones', imagens: [], detalhes: 'iPhone com câmera de última geração', especificacoes: ['128GB', 'A15 Bionic', '12MP', 'Super Retina XDR'] },
  { id: 'tel-04', nome: 'iPhone 13', descricao: '128GB, Azul', preco: 4599.00, categoria: 'telefones', imagens: [], detalhes: 'iPhone com ótimo custo-benefício', especificacoes: ['128GB', 'A15 Bionic', '12MP', 'Ceramic Shield'] },
  { id: 'tel-05', nome: 'Samsung Galaxy Z Flip5', descricao: '256GB, Lavanda', preco: 5999.00, categoria: 'telefones', imagens: [], detalhes: 'Dobrável premium da Samsung', especificacoes: ['256GB', 'Snapdragon 8 Gen 2', 'Flex Display', '3700mAh'] },
  { id: 'tel-06', nome: 'Xiaomi 13T', descricao: '256GB, Preto', preco: 2799.00, categoria: 'telefones', imagens: [], detalhes: 'Flagship killer com câmera Leica', especificacoes: ['256GB', 'Dimensity 8200', '50MP Leica', '67W'] },
  { id: 'tel-07', nome: 'Motorola Edge 40 Neo', descricao: '256GB, Preto', preco: 2199.00, categoria: 'telefones', imagens: [], detalhes: 'Design premium e pOLED 144Hz', especificacoes: ['256GB', 'Dimensity 7030', 'pOLED 144Hz', '68W'] },
  { id: 'tel-08', nome: 'Nothing Phone (2)', descricao: '256GB, Branco', preco: 3999.00, categoria: 'telefones', imagens: [], detalhes: 'Design único com Glyph Interface', especificacoes: ['256GB', 'Snapdragon 8+ Gen 1', '50MP', 'Glyph'] },
  { id: 'tel-09', nome: 'Samsung Galaxy A54', descricao: '256GB, Verde', preco: 2199.00, categoria: 'telefones', imagens: [], detalhes: 'Intermediário premium com AMOLED 120Hz', especificacoes: ['256GB', 'Exynos 1380', '50MP', '5000mAh'] },
  { id: 'tel-10', nome: 'Motorola Moto G84', descricao: '256GB, Preto', preco: 1799.00, categoria: 'telefones', imagens: [], detalhes: 'pOLED 120Hz e som estéreo', especificacoes: ['256GB', 'Snapdragon 695', 'pOLED', '5000mAh'] },
  { id: 'tel-11', nome: 'Samsung Galaxy S23 FE', descricao: '256GB, Grafite', preco: 2999.00, categoria: 'telefones', imagens: [], detalhes: 'Fan Edition com recursos premium', especificacoes: ['256GB', 'Exynos 2200', '50MP', '120Hz'] },
  { id: 'tel-12', nome: 'Xiaomi Poco X6 Pro', descricao: '256GB, Amarelo', preco: 2199.00, categoria: 'telefones', imagens: [], detalhes: 'Melhor custo-benefício para games', especificacoes: ['256GB', 'Dimensity 8300', '64MP', '67W'] },
  { id: 'tel-13', nome: 'OnePlus Nord CE 3', descricao: '128GB, Verde', preco: 1699.00, categoria: 'telefones', imagens: [], detalhes: 'Carregamento super rápido de 80W', especificacoes: ['128GB', 'Snapdragon 782G', '80W', '5000mAh'] },
  { id: 'tel-14', nome: 'Realme 11 Pro+', descricao: '256GB, Preto', preco: 2399.00, categoria: 'telefones', imagens: [], detalhes: 'Câmera de 200MP e AMOLED 120Hz', especificacoes: ['256GB', 'Dimensity 7050', '200MP', '100W'] },
  { id: 'tel-15', nome: 'Motorola Moto G54', descricao: '256GB, Azul', preco: 1099.00, categoria: 'telefones', imagens: [], detalhes: 'Mais vendido da Motorola em 2024', especificacoes: ['256GB', 'Dimensity 7020', '50MP', '5000mAh'] },
  { id: 'tel-16', nome: 'Samsung Galaxy A34', descricao: '128GB, Violeta', preco: 1799.00, categoria: 'telefones', imagens: [], detalhes: 'Display Super AMOLED e resistência IP67', especificacoes: ['128GB', 'Dimensity 1080', '48MP', 'IP67'] },
  { id: 'tel-17', nome: 'iPhone SE 2022', descricao: '64GB, Branco', preco: 3299.00, categoria: 'telefones', imagens: [], detalhes: 'iPhone mais acessível com chip A15', especificacoes: ['64GB', 'A15 Bionic', '12MP', 'Touch ID'] },
  { id: 'tel-18', nome: 'Xiaomi Redmi 13C', descricao: '128GB, Verde', preco: 799.00, categoria: 'telefones', imagens: [], detalhes: 'Entrada Xiaomi com melhor bateria', especificacoes: ['128GB', 'Helio G85', '50MP', '5000mAh'] },
  { id: 'tel-19', nome: 'Samsung Galaxy M54', descricao: '256GB, Prata', preco: 2099.00, categoria: 'telefones', imagens: [], detalhes: 'Bateria gigante de 6000mAh', especificacoes: ['256GB', 'Exynos 1380', '108MP', '6000mAh'] },
  { id: 'tel-20', nome: 'Xiaomi Redmi Note 13 Pro', descricao: '256GB, Preto', preco: 1799.00, categoria: 'telefones', imagens: [], detalhes: 'Câmera de 200MP com OIS', especificacoes: ['256GB', 'Snapdragon 7s Gen 2', '200MP OIS', '67W'] },
  { id: 'tel-21', nome: 'Motorola Razr 40', descricao: '256GB, Preto', preco: 4999.00, categoria: 'telefones', imagens: [], detalhes: 'Dobrável com display externo grande', especificacoes: ['256GB', 'Snapdragon 7 Gen 1', 'Flex Display', '4200mAh'] },
  { id: 'tel-22', nome: 'Samsung Galaxy A14', descricao: '128GB, Preto', preco: 999.00, categoria: 'telefones', imagens: [], detalhes: 'Entrada Samsung com display grande', especificacoes: ['128GB', 'Helio G80', '50MP', '5000mAh'] },
  { id: 'tel-23', nome: 'Motorola Moto G24', descricao: '128GB, Grafite', preco: 799.00, categoria: 'telefones', imagens: [], detalhes: 'Som estéreo Dolby Atmos', especificacoes: ['128GB', 'Helio G85', '50MP', '5000mAh'] },
  { id: 'tel-24', nome: 'Xiaomi Redmi Note 12', descricao: '128GB, Azul', preco: 1299.00, categoria: 'telefones', imagens: [], detalhes: 'AMOLED 120Hz e câmera de 50MP', especificacoes: ['128GB', 'Snapdragon 685', 'AMOLED 120Hz', '5000mAh'] },
  { id: 'tel-25', nome: 'OnePlus 11', descricao: '256GB, Verde', preco: 4299.00, categoria: 'telefones', imagens: [], detalhes: 'Flagship com câmera Hasselblad', especificacoes: ['256GB', 'Snapdragon 8 Gen 2', 'Hasselblad', '100W'] },
  { id: 'tel-26', nome: 'Google Pixel 7a', descricao: '128GB, Azul', preco: 2999.00, categoria: 'telefones', imagens: [], detalhes: 'Melhor fotografia com IA do Google', especificacoes: ['128GB', 'Tensor G2', 'Magic Eraser', '90Hz'] },
  { id: 'tel-27', nome: 'Asus Zenfone 10', descricao: '256GB, Preto', preco: 4799.00, categoria: 'telefones', imagens: [], detalhes: 'Compacto com Snapdragon 8 Gen 2', especificacoes: ['256GB', 'Snapdragon 8 Gen 2', '50MP', '4300mAh'] },
  { id: 'tel-28', nome: 'Motorola Edge 30 Fusion', descricao: '256GB, Azul', preco: 2399.00, categoria: 'telefones', imagens: [], detalhes: 'pOLED de 144Hz e carregamento rápido', especificacoes: ['256GB', 'Snapdragon 888+', 'pOLED 144Hz', '68W'] },
  { id: 'tel-29', nome: 'Realme GT Neo 5', descricao: '256GB, Branco', preco: 2699.00, categoria: 'telefones', imagens: [], detalhes: 'Carregamento ultrarrápido de 150W', especificacoes: ['256GB', 'Snapdragon 8+ Gen 1', '150W', '144Hz'] },
  { id: 'tel-30', nome: 'Xiaomi 12 Lite', descricao: '256GB, Rosa', preco: 2199.00, categoria: 'telefones', imagens: [], detalhes: 'Design fino com AMOLED 120Hz', especificacoes: ['256GB', 'Snapdragon 778G', '108MP', '4300mAh'] },
  { id: 'tel-31', nome: 'Samsung Galaxy A24', descricao: '128GB, Preto', preco: 1299.00, categoria: 'telefones', imagens: [], detalhes: 'Super AMOLED e bateria de longa duração', especificacoes: ['128GB', 'Helio G99', 'Super AMOLED', '5000mAh'] },
  { id: 'tel-32', nome: 'Xiaomi Poco F5 Pro', descricao: '256GB, Branco', preco: 2899.00, categoria: 'telefones', imagens: [], detalhes: 'Snapdragon 8+ Gen 1 e AMOLED 120Hz', especificacoes: ['256GB', 'Snapdragon 8+ Gen 1', '64MP', '67W'] },
  { id: 'tel-33', nome: 'iPhone 12', descricao: '64GB, Preto', preco: 3499.00, categoria: 'telefones', imagens: [], detalhes: 'iPhone 5G acessível', especificacoes: ['64GB', 'A14 Bionic', '12MP', '5G'] },
  { id: 'tel-34', nome: 'Samsung Galaxy S21 FE', descricao: '128GB, Branco', preco: 2399.00, categoria: 'telefones', imagens: [], detalhes: 'Fan Edition com câmera tripla', especificacoes: ['128GB', 'Snapdragon 888', '32MP', '120Hz'] },
  { id: 'tel-35', nome: 'Xiaomi Poco M6 Pro', descricao: '256GB, Azul', preco: 1399.00, categoria: 'telefones', imagens: [], detalhes: 'Bateria 5000mAh e carregamento 67W', especificacoes: ['256GB', 'Helio G99', '64MP', '67W'] },
  { id: 'tel-36', nome: 'Motorola Moto G73', descricao: '256GB, Branco', preco: 1599.00, categoria: 'telefones', imagens: [], detalhes: 'Display pOLED de 120Hz', especificacoes: ['256GB', 'Dimensity 930', '50MP', 'pOLED'] },
  { id: 'tel-37', nome: 'Realme C55', descricao: '128GB, Preto', preco: 999.00, categoria: 'telefones', imagens: [], detalhes: 'Carregamento rápido de 33W', especificacoes: ['128GB', 'Helio G88', '64MP', '33W'] },
  { id: 'tel-38', nome: 'Samsung Galaxy A04s', descricao: '128GB, Verde', preco: 749.00, categoria: 'telefones', imagens: [], detalhes: 'Entrada Samsung com câmera tripla', especificacoes: ['128GB', 'Exynos 850', '50MP', '5000mAh'] },
  { id: 'tel-39', nome: 'Xiaomi Redmi A2', descricao: '64GB, Azul', preco: 599.00, categoria: 'telefones', imagens: [], detalhes: 'Smartphone mais acessível da Xiaomi', especificacoes: ['64GB', 'Helio G36', '8MP', '5000mAh'] },
  { id: 'tel-40', nome: 'Motorola Moto E13', descricao: '64GB, Grafite', preco: 549.00, categoria: 'telefones', imagens: [], detalhes: 'Entrada Motorola com Android Go', especificacoes: ['64GB', 'Unisoc T606', '13MP', '5000mAh'] },

  // Fones de Ouvido
  { id: 'fone-01', nome: 'Sony WH-1000XM5', descricao: 'Cancelamento de ruído premium', preco: 2299.00, categoria: 'fones', imagens: [], detalhes: 'Melhor cancelamento de ruído do mercado', especificacoes: ['ANC', '30h bateria', 'LDAC', 'Multi-point'] },
  { id: 'fone-02', nome: 'AirPods Pro 2', descricao: 'ANC adaptativo da Apple', preco: 2199.00, categoria: 'fones', imagens: [], detalhes: 'ANC adaptativo e áudio espacial', especificacoes: ['ANC Adaptativo', 'H2 chip', 'Spatial Audio', 'MagSafe'] },
  { id: 'fone-03', nome: 'Sony WF-1000XM5', descricao: 'Earbuds com ANC premium', preco: 1899.00, categoria: 'fones', imagens: [], detalhes: 'Earbuds com melhor qualidade de som', especificacoes: ['ANC', 'LDAC', '8h bateria', 'IPX4'] },
  { id: 'fone-04', nome: 'Samsung Galaxy Buds2 Pro', descricao: 'Earbuds premium Samsung', preco: 1199.00, categoria: 'fones', imagens: [], detalhes: 'ANC inteligente e som 360º', especificacoes: ['ANC', '360 Audio', '8h bateria', 'IPX7'] },
  { id: 'fone-05', nome: 'Sennheiser Momentum 4', descricao: 'Audiófilo com 60h de bateria', preco: 2499.00, categoria: 'fones', imagens: [], detalhes: 'Som audiófilo e bateria de 60 horas', especificacoes: ['ANC', '60h bateria', 'aptX', 'Dobrável'] },
  { id: 'fone-06', nome: 'Beats Studio Buds+', descricao: 'Earbuds com chip Apple', preco: 1099.00, categoria: 'fones', imagens: [], detalhes: 'Áudio espacial e design ergonômico', especificacoes: ['ANC', 'Spatial Audio', '9h bateria', 'IPX4'] },
  { id: 'fone-07', nome: 'Bose QuietComfort Earbuds II', descricao: 'ANC personalizado da Bose', preco: 1699.00, categoria: 'fones', imagens: [], detalhes: 'ANC personalizado para cada ouvido', especificacoes: ['CustomTune ANC', '6h bateria', 'IPX4', 'Multi-point'] },
  { id: 'fone-08', nome: 'JBL Tune 510BT', descricao: 'Fone bluetooth acessível', preco: 249.00, categoria: 'fones', imagens: [], detalhes: 'Som JBL Pure Bass e bateria longa', especificacoes: ['Pure Bass', '40h bateria', 'Dobrável', 'Multi-point'] },
  { id: 'fone-09', nome: 'JBL Live Pro 2', descricao: 'Earbuds com JBL Signature Sound', preco: 899.00, categoria: 'fones', imagens: [], detalhes: 'ANC adaptativo e som potente', especificacoes: ['ANC Adaptativo', '10h bateria', 'JBL Sound', 'IPX5'] },
  { id: 'fone-10', nome: 'Xiaomi Redmi Buds 4 Pro', descricao: 'Earbuds com ANC de 43dB', preco: 399.00, categoria: 'fones', imagens: [], detalhes: 'ANC de até 43dB e certificação Hi-Res', especificacoes: ['ANC 43dB', 'Hi-Res', '9h bateria', 'IPX4'] },
  { id: 'fone-11', nome: 'Motorola Moto Buds+', descricao: 'Earbuds com Dolby Atmos', preco: 499.00, categoria: 'fones', imagens: [], detalhes: 'Dolby Atmos e ANC híbrido', especificacoes: ['ANC', 'Dolby Atmos', '8h bateria', 'IPX5'] },
  { id: 'fone-12', nome: 'Anker Soundcore Life Q30', descricao: 'ANC acessível de qualidade', preco: 399.00, categoria: 'fones', imagens: [], detalhes: 'ANC híbrido e 40 horas de bateria', especificacoes: ['ANC Híbrido', '40h bateria', 'Hi-Res', 'Multi-point'] },
  { id: 'fone-13', nome: 'Edifier W800BT Plus', descricao: 'Fone bluetooth com boa bateria', preco: 179.00, categoria: 'fones', imagens: [], detalhes: 'Som balanceado e 55h de bateria', especificacoes: ['55h bateria', 'Bluetooth 5.0', 'Dobrável', 'Leve'] },
  { id: 'fone-14', nome: 'Philips TAH4205', descricao: 'Fone bluetooth econômico', preco: 149.00, categoria: 'fones', imagens: [], detalhes: 'Som claro e bateria de 29 horas', especificacoes: ['29h bateria', 'Bluetooth 5.0', 'Bass Boost', 'Almofadas macias'] },

  // Computadores
  { id: 'comp-01', nome: 'MacBook Pro 14 M3', descricao: '16GB RAM, 512GB SSD', preco: 18999.00, categoria: 'computadores', imagens: [], detalhes: 'Chip M3 revolucionário da Apple', especificacoes: ['M3 Pro', '16GB RAM', '512GB SSD', 'Liquid Retina XDR'] },
  { id: 'comp-02', nome: 'Dell Inspiron 15', descricao: 'i7 13ª, 16GB, 512GB', preco: 4999.00, categoria: 'computadores', imagens: [], detalhes: 'Notebook intermediário versátil', especificacoes: ['Core i7-1355U', '16GB RAM', '512GB SSD', 'Full HD'] },
  { id: 'comp-03', nome: 'Lenovo Ideapad 3i', descricao: 'i5 12ª, 8GB, 256GB', preco: 2999.00, categoria: 'computadores', imagens: [], detalhes: 'Notebook custo-benefício para estudos', especificacoes: ['Core i5-1235U', '8GB RAM', '256GB SSD', '15.6" Full HD'] },

  // Jogos
  { id: 'jogo-01', nome: 'PlayStation 5 Slim', descricao: 'Console next-gen', preco: 4299.00, categoria: 'jogos', imagens: [], detalhes: 'Console mais poderoso da Sony', especificacoes: ['1TB SSD', '4K 120fps', 'Ray Tracing', 'Tempest 3D'] },
  { id: 'jogo-02', nome: 'Xbox Series X', descricao: 'Console 4K 120fps', preco: 4499.00, categoria: 'jogos', imagens: [], detalhes: 'Poder máximo com Game Pass', especificacoes: ['1TB SSD', '4K 120fps', '12 TFLOPs', 'Quick Resume'] },
  { id: 'jogo-03', nome: 'Nintendo Switch OLED', descricao: 'Portátil com tela OLED', preco: 2799.00, categoria: 'jogos', imagens: [], detalhes: 'Tela OLED vibrante de 7 polegadas', especificacoes: ['OLED 7"', '64GB', 'Portátil', 'Dock incluído'] },
  { id: 'jogo-04', nome: 'Controle Xbox Wireless', descricao: 'Controle sem fio', preco: 499.00, categoria: 'jogos', imagens: [], detalhes: 'Controle oficial Xbox com Bluetooth', especificacoes: ['Wireless', 'Bluetooth', 'USB-C', '40h bateria'] },

  // Acessórios
  { id: 'aces-01', nome: 'Carregador Portátil 20000mAh', descricao: 'Power bank de alta capacidade', preco: 149.00, categoria: 'acessorios', imagens: [], detalhes: 'Carregue múltiplos dispositivos', especificacoes: ['20000mAh', '2x USB', '1x USB-C', 'Display LED'] },
  { id: 'aces-02', nome: 'Cabo USB-C 2m', descricao: 'Cabo reforçado', preco: 39.90, categoria: 'acessorios', imagens: [], detalhes: 'Cabo resistente de alta qualidade', especificacoes: ['2 metros', 'USB-C', 'Trançado', '60W'] },
  { id: 'aces-03', nome: 'Capa Protetora Silicone', descricao: 'Proteção premium', preco: 79.90, categoria: 'acessorios', imagens: [], detalhes: 'Proteção completa e grip antiderrapante', especificacoes: ['Silicone', 'Anti-impacto', 'Bordas elevadas', 'Diversas cores'] },

  // Escritório
  { id: 'escr-01', nome: 'Monitor LG 27" 4K', descricao: 'IPS 4K HDR10', preco: 1799.00, categoria: 'escritorio', imagens: [], detalhes: 'Monitor profissional 4K', especificacoes: ['27" IPS', '4K UHD', 'HDR10', '99% sRGB'] },
  { id: 'escr-02', nome: 'Monitor Curvo Samsung 27"', descricao: 'Curvo 165Hz', preco: 1499.00, categoria: 'escritorio', imagens: [], detalhes: 'Monitor gamer curvo 165Hz', especificacoes: ['27" Curvo', '165Hz', 'Full HD', 'FreeSync'] },
  { id: 'escr-03', nome: 'Cadeira Escritório Ergonômica', descricao: 'Ajuste lombar', preco: 899.00, categoria: 'escritorio', imagens: [], detalhes: 'Conforto para longas jornadas', especificacoes: ['Ajuste lombar', 'Braços 3D', 'Reclinável', '150kg'] },
  { id: 'escr-04', nome: 'Cadeira Gamer RGB', descricao: 'Design esportivo', preco: 1299.00, categoria: 'escritorio', imagens: [], detalhes: 'Cadeira gamer premium com LED', especificacoes: ['RGB', 'Reclinável 180°', 'Almofadas', '150kg'] },
  { id: 'escr-05', nome: 'Teclado Mecânico RGB', descricao: 'Switch Blue', preco: 399.00, categoria: 'escritorio', imagens: [], detalhes: 'Teclado mecânico para produtividade', especificacoes: ['Switch Blue', 'RGB', 'ABNT2', 'Anti-ghosting'] },
  { id: 'escr-06', nome: 'Teclado Gamer RGB', descricao: 'Mecânico Red Switch', preco: 549.00, categoria: 'escritorio', imagens: [], detalhes: 'Teclado gamer com RGB dinâmico', especificacoes: ['Red Switch', 'RGB', 'Anti-ghosting', 'Apoio pulso'] },
  { id: 'escr-07', nome: 'Mouse Gamer RGB', descricao: '12000 DPI', preco: 199.00, categoria: 'escritorio', imagens: [], detalhes: 'Precisão extrema para gamers', especificacoes: ['12000 DPI', '8 botões', 'RGB', 'Sensor óptico'] },
  { id: 'escr-08', nome: 'Mouse Sem Fio', descricao: 'Silencioso e ergonômico', preco: 89.00, categoria: 'escritorio', imagens: [], detalhes: 'Mouse sem fio para trabalho', especificacoes: ['2400 DPI', 'Wireless', 'Silencioso', '18 meses bateria'] },

  // Impressoras
  { id: 'impr-01', nome: 'Impressora HP Jato de Tinta', descricao: 'Multifuncional colorida', preco: 599.00, categoria: 'impressoras', imagens: [], detalhes: 'Imprime, copia e digitaliza', especificacoes: ['Jato tinta', 'Wi-Fi', 'Colorida', 'Scanner'] },
  { id: 'impr-02', nome: 'Impressora Brother Laser', descricao: 'Laser monocromática', preco: 1299.00, categoria: 'impressoras', imagens: [], detalhes: 'Velocidade e economia', especificacoes: ['Laser', 'Wi-Fi', 'Duplex', '30 ppm'] },
];

export const getProductsByCategory = (category: string): Product[] => {
  return allProducts
    .filter(product => product.categoria === category)
    .sort((a, b) => a.preco - b.preco);
};

export const getProductById = (id: string): Product | undefined => {
  return allProducts.find(product => product.id === id);
};
