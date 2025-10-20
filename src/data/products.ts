// Import product images
import headphonesAirpods from '@/assets/products/headphones-airpods.jpg';
import headphonesSony from '@/assets/products/headphones-sony.jpg';
import headphonesGaming from '@/assets/products/headphones-gaming.jpg';
import laptopMacbook from '@/assets/products/laptop-macbook.jpg';
import laptopGaming from '@/assets/products/laptop-gaming.jpg';
import laptopBusiness from '@/assets/products/laptop-business.jpg';
import printerInkjet from '@/assets/products/printer-inkjet.jpg';
import printerLaser from '@/assets/products/printer-laser.jpg';
import consolePS5 from '@/assets/products/console-ps5.jpg';
import consoleXbox from '@/assets/products/console-xbox.jpg';
import consoleSwitch from '@/assets/products/console-switch.jpg';
import officeChair from '@/assets/products/office-chair.jpg';
import gamingChair from '@/assets/products/gaming-chair.jpg';
import monitorProfessional from '@/assets/products/monitor-professional.jpg';
import keyboardMechanical from '@/assets/products/keyboard-mechanical.jpg';
import mouseGaming from '@/assets/products/mouse-gaming.jpg';
import accessoryPowerbank from '@/assets/products/accessory-powerbank.jpg';
import accessoryCable from '@/assets/products/accessory-cable.jpg';
import accessoryPhoneCase from '@/assets/products/accessory-phone-case.jpg';
import phoneIphone from '@/assets/products/phone-iphone.jpg';
import phoneSamsung from '@/assets/products/phone-samsung.jpg';

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

// Helper function to get images by category
const getProductImages = (categoria: string, productName: string): string[] => {
  // Telefones
  if (categoria === 'telefones') {
    if (productName.toLowerCase().includes('iphone') || productName.toLowerCase().includes('apple')) {
      return [phoneIphone, phoneIphone, phoneIphone];
    }
    return [phoneSamsung, phoneSamsung, phoneSamsung];
  }
  
  // Fones de ouvido
  if (categoria === 'fones') {
    if (productName.toLowerCase().includes('airpods') || productName.toLowerCase().includes('apple')) {
      return [headphonesAirpods, headphonesAirpods, headphonesAirpods];
    }
    if (productName.toLowerCase().includes('gamer') || productName.toLowerCase().includes('gaming') || 
        productName.toLowerCase().includes('headset') || productName.toLowerCase().includes('rgb')) {
      return [headphonesGaming, headphonesGaming, headphonesGaming];
    }
    return [headphonesSony, headphonesSony, headphonesSony];
  }
  
  // Computadores
  if (categoria === 'computadores') {
    if (productName.toLowerCase().includes('macbook') || productName.toLowerCase().includes('apple')) {
      return [laptopMacbook, laptopMacbook, laptopMacbook];
    }
    if (productName.toLowerCase().includes('gam') || productName.toLowerCase().includes('legion') || 
        productName.toLowerCase().includes('nitro') || productName.toLowerCase().includes('tuf') ||
        productName.toLowerCase().includes('predator') || productName.toLowerCase().includes('rog')) {
      return [laptopGaming, laptopGaming, laptopGaming];
    }
    return [laptopBusiness, laptopBusiness, laptopBusiness];
  }
  
  // Impressoras
  if (categoria === 'impressoras') {
    if (productName.toLowerCase().includes('laser')) {
      return [printerLaser, printerLaser, printerLaser];
    }
    return [printerInkjet, printerInkjet, printerInkjet];
  }
  
  // Games
  if (categoria === 'games') {
    if (productName.toLowerCase().includes('playstation') || productName.toLowerCase().includes('ps5') || 
        productName.toLowerCase().includes('ps4') || productName.toLowerCase().includes('dualsense')) {
      return [consolePS5, consolePS5, consolePS5];
    }
    if (productName.toLowerCase().includes('xbox') || productName.toLowerCase().includes('series')) {
      return [consoleXbox, consoleXbox, consoleXbox];
    }
    if (productName.toLowerCase().includes('switch') || productName.toLowerCase().includes('nintendo') ||
        productName.toLowerCase().includes('joy-con')) {
      return [consoleSwitch, consoleSwitch, consoleSwitch];
    }
    // For peripherals and accessories, use appropriate images
    if (productName.toLowerCase().includes('cadeira') || productName.toLowerCase().includes('chair')) {
      return [gamingChair, gamingChair, gamingChair];
    }
    if (productName.toLowerCase().includes('teclado') || productName.toLowerCase().includes('keyboard')) {
      return [keyboardMechanical, keyboardMechanical, keyboardMechanical];
    }
    if (productName.toLowerCase().includes('mouse')) {
      return [mouseGaming, mouseGaming, mouseGaming];
    }
    if (productName.toLowerCase().includes('monitor')) {
      return [monitorProfessional, monitorProfessional, monitorProfessional];
    }
    return [consolePS5, consolePS5, consolePS5]; // Default to PS5 for games
  }
  
  // Escritório
  if (categoria === 'escritorio') {
    if (productName.toLowerCase().includes('cadeira') || productName.toLowerCase().includes('chair')) {
      if (productName.toLowerCase().includes('gam')) {
        return [gamingChair, gamingChair, gamingChair];
      }
      return [officeChair, officeChair, officeChair];
    }
    if (productName.toLowerCase().includes('monitor')) {
      return [monitorProfessional, monitorProfessional, monitorProfessional];
    }
    if (productName.toLowerCase().includes('teclado') || productName.toLowerCase().includes('keyboard')) {
      return [keyboardMechanical, keyboardMechanical, keyboardMechanical];
    }
    if (productName.toLowerCase().includes('mouse')) {
      return [mouseGaming, mouseGaming, mouseGaming];
    }
    return [officeChair, officeChair, officeChair];
  }
  
  // Acessórios
  if (categoria === 'acessorios') {
    if (productName.toLowerCase().includes('powerbank') || productName.toLowerCase().includes('bateria')) {
      return [accessoryPowerbank, accessoryPowerbank, accessoryPowerbank];
    }
    if (productName.toLowerCase().includes('cabo') || productName.toLowerCase().includes('cable') ||
        productName.toLowerCase().includes('carregador') || productName.toLowerCase().includes('usb')) {
      return [accessoryCable, accessoryCable, accessoryCable];
    }
    if (productName.toLowerCase().includes('capa') || productName.toLowerCase().includes('case') ||
        productName.toLowerCase().includes('película')) {
      return [accessoryPhoneCase, accessoryPhoneCase, accessoryPhoneCase];
    }
    return [accessoryCable, accessoryCable, accessoryCable];
  }
  
  // Default
  return [laptopBusiness, laptopBusiness, laptopBusiness];
};

export const allProducts: Product[] = [
  // Telefones - 40 produtos dos mais vendidos
  { id: 'tel-1', nome: 'iPhone 15 Pro Max', descricao: '256GB, Titânio Natural', preco: 9499.00, categoria: 'telefones', imagens: getProductImages('telefones', 'iPhone 15 Pro Max'), detalhes: 'O mais avançado iPhone com chip A17 Pro, câmera de 48MP e tela Super Retina XDR de 6.7"', especificacoes: ['256GB', 'Titânio Natural', 'Chip A17 Pro', 'Câmera 48MP'] },
  { id: 'tel-2', nome: 'Samsung Galaxy S24 Ultra', descricao: '512GB, Preto', preco: 7999.00, categoria: 'telefones', imagens: getProductImages('telefones', 'Samsung Galaxy S24 Ultra'), detalhes: 'Tela Dynamic AMOLED 2X de 6.8", S Pen integrada, câmera de 200MP', especificacoes: ['512GB', 'Preto', 'Snapdragon 8 Gen 3', 'Câmera 200MP'] },
  { id: 'tel-3', nome: 'Xiaomi Redmi Note 13 Pro', descricao: '256GB, Azul', preco: 1899.00, categoria: 'telefones', imagens: getProductImages('telefones', 'Xiaomi Redmi Note 13 Pro'), detalhes: 'Best-seller Xiaomi com câmera de 200MP e carregamento 67W', especificacoes: ['256GB', 'Snapdragon 7s Gen 2', '200MP', '67W'] },
  { id: 'tel-4', nome: 'iPhone 14', descricao: '128GB, Roxo', preco: 5499.00, categoria: 'telefones', imagens: getProductImages('telefones', 'iPhone 14'), detalhes: 'Chip A15 Bionic, câmera dupla de 12MP, resistência à água', especificacoes: ['128GB', 'Roxo', 'Chip A15', 'Câmera Dupla 12MP'] },
  { id: 'tel-5', nome: 'Samsung Galaxy A54 5G', descricao: '256GB, Verde', preco: 2299.00, categoria: 'telefones', imagens: getProductImages('telefones', 'Samsung Galaxy A54 5G'), detalhes: 'Mais vendido da linha Galaxy A, câmera tripla de 50MP', especificacoes: ['256GB', '5G', 'Exynos 1380', 'Bateria 5000mAh'] },
  { id: 'tel-6', nome: 'Motorola Moto G84', descricao: '256GB, Preto', preco: 1499.00, categoria: 'telefones', imagens: getProductImages('telefones', 'Motorola Moto G84'), detalhes: 'Best-seller Motorola com tela OLED de 120Hz', especificacoes: ['256GB', 'OLED 120Hz', 'Snapdragon 695', '5000mAh'] },
  { id: 'tel-7', nome: 'Xiaomi Redmi Note 12', descricao: '128GB, Azul', preco: 1199.00, categoria: 'telefones', imagens: getProductImages('telefones', 'Xiaomi Redmi Note 12'), detalhes: 'Campeão de vendas no Brasil, ótimo custo-benefício', especificacoes: ['128GB', 'Snapdragon 685', '50MP', '5000mAh'] },
  { id: 'tel-8', nome: 'Samsung Galaxy A14', descricao: '128GB, Preto', preco: 899.00, categoria: 'telefones', imagens: getProductImages('telefones', 'Samsung Galaxy A14'), detalhes: 'Celular mais vendido no Brasil em 2024', especificacoes: ['128GB', 'MediaTek Helio G80', '50MP', '5000mAh'] },
  { id: 'tel-9', nome: 'iPhone 13', descricao: '128GB, Azul', preco: 4299.00, categoria: 'telefones', imagens: getProductImages('telefones', 'iPhone 13'), detalhes: 'iPhone best-seller com ótimo preço', especificacoes: ['128GB', 'A15 Bionic', '12MP', '5G'] },
  { id: 'tel-10', nome: 'Motorola Edge 40 Neo', descricao: '256GB, Preto', preco: 1799.00, categoria: 'telefones', imagens: getProductImages('telefones', 'Motorola Edge 40 Neo'), detalhes: 'Tela OLED curva de 144Hz, carregamento 68W', especificacoes: ['256GB', 'MediaTek 7030', '144Hz', '68W'] },
  { id: 'tel-11', nome: 'Samsung Galaxy S23 FE', descricao: '256GB, Grafite', preco: 2999.00, categoria: 'telefones', imagens: getProductImages('telefones', 'Samsung Galaxy S23 FE'), detalhes: 'Fan Edition com recursos premium', especificacoes: ['256GB', 'Exynos 2200', '50MP', '120Hz'] },
  { id: 'tel-12', nome: 'Xiaomi Poco X6 Pro', descricao: '256GB, Amarelo', preco: 2199.00, categoria: 'telefones', imagens: getProductImages('telefones', 'Xiaomi Poco X6 Pro'), detalhes: 'Melhor custo-benefício para games', especificacoes: ['256GB', 'Dimensity 8300', '64MP', '67W'] },
  { id: 'tel-13', nome: 'OnePlus Nord CE 3', descricao: '128GB, Verde', preco: 1699.00, categoria: 'telefones', imagens: getProductImages('telefones', 'OnePlus Nord CE 3'), detalhes: 'Carregamento super rápido de 80W', especificacoes: ['128GB', 'Snapdragon 782G', '80W', '5000mAh'] },
  { id: 'tel-14', nome: 'Realme 11 Pro+', descricao: '256GB, Preto', preco: 2399.00, categoria: 'telefones', imagens: getProductImages('telefones', 'Realme 11 Pro+'), detalhes: 'Câmera de 200MP e AMOLED 120Hz', especificacoes: ['256GB', 'Dimensity 7050', '200MP', '100W'] },
  { id: 'tel-15', nome: 'Motorola Moto G54', descricao: '256GB, Azul', preco: 1099.00, categoria: 'telefones', imagens: getProductImages('telefones', 'Motorola Moto G54'), detalhes: 'Mais vendido da Motorola em 2024', especificacoes: ['256GB', 'Dimensity 7020', '50MP', '5000mAh'] },
  { id: 'tel-16', nome: 'Samsung Galaxy A34', descricao: '128GB, Violeta', preco: 1799.00, categoria: 'telefones', imagens: getProductImages('telefones', 'Samsung Galaxy A34'), detalhes: 'Display Super AMOLED e resistência IP67', especificacoes: ['128GB', 'Dimensity 1080', '48MP', 'IP67'] },
  { id: 'tel-17', nome: 'iPhone SE 2022', descricao: '64GB, Branco', preco: 3299.00, categoria: 'telefones', imagens: getProductImages('telefones', 'iPhone SE 2022'), detalhes: 'iPhone mais acessível com chip A15', especificacoes: ['64GB', 'A15 Bionic', '12MP', 'Touch ID'] },
  { id: 'tel-18', nome: 'Xiaomi Redmi 13C', descricao: '128GB, Verde', preco: 799.00, categoria: 'telefones', imagens: getProductImages('telefones', 'Xiaomi Redmi 13C'), detalhes: 'Entrada Xiaomi com melhor bateria', especificacoes: ['128GB', 'Helio G85', '50MP', '5000mAh'] },
  { id: 'tel-19', nome: 'Samsung Galaxy M54', descricao: '256GB, Prata', preco: 2099.00, categoria: 'telefones', imagens: getProductImages('telefones', 'Samsung Galaxy M54'), detalhes: 'Bateria gigante de 6000mAh', especificacoes: ['256GB', 'Exynos 1380', '108MP', '6000mAh'] },
  { id: 'tel-20', nome: 'Motorola Moto G24', descricao: '128GB, Grafite', preco: 699.00, categoria: 'telefones', imagens: getProductImages('telefones', 'Motorola Moto G24'), detalhes: 'Melhor custo-benefício Motorola', especificacoes: ['128GB', 'Helio G85', '50MP', '5000mAh'] },
  { id: 'tel-21', nome: 'Nothing Phone 2', descricao: '256GB, Branco', preco: 3499.00, categoria: 'telefones', imagens: getProductImages('telefones', 'Nothing Phone 2'), detalhes: 'Design único com Glyph Interface', especificacoes: ['256GB', 'Snapdragon 8+ Gen 1', '50MP', 'LED traseiro'] },
  { id: 'tel-22', nome: 'ASUS Zenfone 10', descricao: '256GB, Preto', preco: 3799.00, categoria: 'telefones', imagens: getProductImages('telefones', 'ASUS Zenfone 10'), detalhes: 'Compacto e potente com Snapdragon 8 Gen 2', especificacoes: ['256GB', 'Snapdragon 8 Gen 2', '50MP', 'Compacto'] },
  { id: 'tel-23', nome: 'Google Pixel 7a', descricao: '128GB, Azul', preco: 2799.00, categoria: 'telefones', imagens: getProductImages('telefones', 'Google Pixel 7a'), detalhes: 'Melhor câmera intermediária com IA Google', especificacoes: ['128GB', 'Tensor G2', '64MP', 'IA avançada'] },
  { id: 'tel-24', nome: 'Xiaomi 13T', descricao: '256GB, Preto', preco: 2899.00, categoria: 'telefones', imagens: getProductImages('telefones', 'Xiaomi 13T'), detalhes: 'Câmera Leica e carregamento 67W', especificacoes: ['256GB', 'Dimensity 8200', 'Leica', '67W'] },
  { id: 'tel-25', nome: 'Samsung Galaxy Z Flip 5', descricao: '256GB, Lavanda', preco: 5999.00, categoria: 'telefones', imagens: getProductImages('telefones', 'Samsung Galaxy Z Flip 5'), detalhes: 'Dobrável compacto mais vendido', especificacoes: ['256GB', 'Snapdragon 8 Gen 2', 'Dobrável', 'Tela externa'] },
  { id: 'tel-26', nome: 'Motorola Razr 40', descricao: '256GB, Preto', preco: 3999.00, categoria: 'telefones', imagens: getProductImages('telefones', 'Motorola Razr 40'), detalhes: 'Dobrável com melhor preço', especificacoes: ['256GB', 'Snapdragon 7 Gen 1', 'Dobrável', 'OLED'] },
  { id: 'tel-27', nome: 'OnePlus 11', descricao: '256GB, Verde', preco: 3799.00, categoria: 'telefones', imagens: getProductImages('telefones', 'OnePlus 11'), detalhes: 'Carregamento de 100W e câmera Hasselblad', especificacoes: ['256GB', 'Snapdragon 8 Gen 2', '100W', 'Hasselblad'] },
  { id: 'tel-28', nome: 'Realme GT Neo 5', descricao: '256GB, Branco', preco: 2699.00, categoria: 'telefones', imagens: getProductImages('telefones', 'Realme GT Neo 5'), detalhes: 'Carregamento mais rápido do mundo - 240W', especificacoes: ['256GB', 'Snapdragon 8+ Gen 1', '240W', '144Hz'] },
  { id: 'tel-29', nome: 'Poco F5 Pro', descricao: '256GB, Branco', preco: 2499.00, categoria: 'telefones', imagens: getProductImages('telefones', 'Poco F5 Pro'), detalhes: 'Flagship killer com Snapdragon 8+ Gen 1', especificacoes: ['256GB', 'Snapdragon 8+ Gen 1', '64MP', '67W'] },
  { id: 'tel-30', nome: 'Samsung Galaxy A24', descricao: '128GB, Preto', preco: 1299.00, categoria: 'telefones', imagens: getProductImages('telefones', 'Samsung Galaxy A24'), detalhes: 'Display Super AMOLED e bateria 5000mAh', especificacoes: ['128GB', 'Helio G99', '50MP', 'Super AMOLED'] },
  { id: 'tel-31', nome: 'Motorola Edge 30 Fusion', descricao: '128GB, Azul', preco: 1999.00, categoria: 'telefones', imagens: getProductImages('telefones', 'Motorola Edge 30 Fusion'), detalhes: 'Design premium com Snapdragon 888+', especificacoes: ['128GB', 'Snapdragon 888+', '50MP', 'OLED 144Hz'] },
  { id: 'tel-32', nome: 'Xiaomi 12 Lite', descricao: '256GB, Rosa', preco: 2199.00, categoria: 'telefones', imagens: getProductImages('telefones', 'Xiaomi 12 Lite'), detalhes: 'Design fino e leve com AMOLED 120Hz', especificacoes: ['256GB', 'Snapdragon 778G', '108MP', '67W'] },
  { id: 'tel-33', nome: 'iPhone 12', descricao: '64GB, Preto', preco: 3499.00, categoria: 'telefones', imagens: getProductImages('telefones', 'iPhone 12'), detalhes: 'iPhone 5G acessível', especificacoes: ['64GB', 'A14 Bionic', '12MP', '5G'] },
  { id: 'tel-34', nome: 'Samsung Galaxy S21 FE', descricao: '128GB, Branco', preco: 2399.00, categoria: 'telefones', imagens: getProductImages('telefones', 'Samsung Galaxy S21 FE'), detalhes: 'Fan Edition com câmera tripla', especificacoes: ['128GB', 'Snapdragon 888', '32MP', '120Hz'] },
  { id: 'tel-35', nome: 'Xiaomi Poco M6 Pro', descricao: '256GB, Azul', preco: 1399.00, categoria: 'telefones', imagens: getProductImages('telefones', 'Xiaomi Poco M6 Pro'), detalhes: 'Bateria 5000mAh e carregamento 67W', especificacoes: ['256GB', 'Helio G99', '64MP', '67W'] },
  { id: 'tel-36', nome: 'Motorola Moto G73', descricao: '256GB, Branco', preco: 1599.00, categoria: 'telefones', imagens: getProductImages('telefones', 'Motorola Moto G73'), detalhes: 'Display pOLED de 120Hz', especificacoes: ['256GB', 'Dimensity 930', '50MP', 'pOLED'] },
  { id: 'tel-37', nome: 'Realme C55', descricao: '128GB, Preto', preco: 999.00, categoria: 'telefones', imagens: getProductImages('telefones', 'Realme C55'), detalhes: 'Carregamento rápido de 33W', especificacoes: ['128GB', 'Helio G88', '64MP', '33W'] },
  { id: 'tel-38', nome: 'Samsung Galaxy A04s', descricao: '128GB, Verde', preco: 749.00, categoria: 'telefones', imagens: getProductImages('telefones', 'Samsung Galaxy A04s'), detalhes: 'Entrada Samsung com câmera tripla', especificacoes: ['128GB', 'Exynos 850', '50MP', '5000mAh'] },
  { id: 'tel-39', nome: 'Xiaomi Redmi A2', descricao: '64GB, Azul', preco: 599.00, categoria: 'telefones', imagens: getProductImages('telefones', 'Xiaomi Redmi A2'), detalhes: 'Smartphone mais acessível da Xiaomi', especificacoes: ['64GB', 'Helio G36', '8MP', '5000mAh'] },
  { id: 'tel-40', nome: 'Motorola Moto E13', descricao: '64GB, Grafite', preco: 549.00, categoria: 'telefones', imagens: getProductImages('telefones', 'Motorola Moto E13'), detalhes: 'Entrada Motorola com Android Go', especificacoes: ['64GB', 'Unisoc T606', '13MP', '5000mAh'] },

  // Fones de Ouvido - 40 produtos dos mais vendidos
  { id: 'fone-1', nome: 'AirPods Pro 2ª Geração', descricao: 'Cancelamento de ruído ativo', preco: 2199.00, categoria: 'fones', imagens: getProductImages('fones', 'AirPods Pro 2ª Geração'), detalhes: 'Fone mais vendido da Apple com ANC adaptável', especificacoes: ['ANC', 'Áudio Espacial', 'Até 6h', 'IPX4'] },
  { id: 'fone-2', nome: 'Sony WH-1000XM5', descricao: 'Premium noise cancelling', preco: 2299.00, categoria: 'fones', imagens: getProductImages('fones', 'Sony WH-1000XM5'), detalhes: 'Melhor ANC do mercado segundo testes', especificacoes: ['ANC Premium', '30h bateria', 'LDAC', '8 microfones'] },
  { id: 'fone-3', nome: 'JBL Tune 510BT', descricao: 'On-ear sem fio', preco: 199.00, categoria: 'fones', imagens: getProductImages('fones', 'JBL Tune 510BT'), detalhes: 'Fone JBL mais vendido no Brasil', especificacoes: ['40h bateria', 'Pure Bass', 'Dobrável', 'USB-C'] },
  { id: 'fone-4', nome: 'Samsung Galaxy Buds2 Pro', descricao: 'In-ear com ANC', preco: 1099.00, categoria: 'fones', imagens: getProductImages('fones', 'Samsung Galaxy Buds2 Pro'), detalhes: 'Best-seller Samsung com Hi-Fi 24bit', especificacoes: ['ANC', '8h', 'IPX7', '360 Audio'] },
  { id: 'fone-5', nome: 'Edifier W800BT Plus', descricao: 'Over-ear Bluetooth', preco: 249.00, categoria: 'fones', imagens: getProductImages('fones', 'Edifier W800BT Plus'), detalhes: 'Campeão de vendas no Brasil', especificacoes: ['80h bateria', 'Dobrável', 'Almofadas macias', 'Bluetooth 5.3'] },
  { id: 'fone-6', nome: 'Beats Studio Buds+', descricao: 'True Wireless', preco: 1099.00, categoria: 'fones', imagens: getProductImages('fones', 'Beats Studio Buds+'), detalhes: 'ANC e design compacto Beats', especificacoes: ['ANC', '9h', 'IPX4', 'USB-C'] },
{ id: 'fone-7', nome: 'Anker Soundcore Life Q30', descricao: 'ANC híbrido', preco: 499.00, categoria: 'fones', imagens: getProductImages('fones', 'Anker Soundcore Life Q30'), detalhes: 'Best-seller Amazon com ANC eficiente', especificacoes: ['ANC Híbrido', '40h', 'Hi-Res', 'USB-C'] },
  { id: 'fone-8', nome: 'Xiaomi Redmi Buds 4 Pro', descricao: 'TWS com ANC', preco: 399.00, categoria: 'fones', imagens: getProductImages('fones', 'Xiaomi Redmi Buds 4 Pro'), detalhes: 'TWS mais vendido da Xiaomi', especificacoes: ['ANC 43dB', '9h', 'IP54', 'Spatial Audio'] },
  { id: 'fone-9', nome: 'JBL Live Pro 2', descricao: 'TWS premium', preco: 799.00, categoria: 'fones', imagens: getProductImages('fones', 'JBL Live Pro 2'), detalhes: 'True Adaptive ANC e áudio espacial', especificacoes: ['Smart ANC', '10h', 'IPX5', 'JBL Signature'] },
  { id: 'fone-10', nome: 'Sony WF-1000XM5', descricao: 'TWS top de linha', preco: 1999.00, categoria: 'fones', imagens: getProductImages('fones', 'Sony WF-1000XM5'), detalhes: 'Melhor TWS do mercado em 2024', especificacoes: ['ANC class-leading', '8h+16h', 'LDAC', 'IPX4'] },
  { id: 'fone-11', nome: 'Bose QuietComfort Earbuds II', descricao: 'TWS ANC personalizado', preco: 1799.00, categoria: 'fones', imagens: getProductImages('fones', 'Bose QuietComfort Earbuds II'), detalhes: 'ANC que se adapta ao seu ouvido', especificacoes: ['CustomTune', '6h', 'IPX4', 'Fit personalizado'] },
  { id: 'fone-12', nome: 'Motorola Moto Buds+', descricao: 'TWS com ANC', preco: 499.00, categoria: 'fones', imagens: getProductImages('fones', 'Motorola Moto Buds+'), detalhes: 'TWS Motorola com melhor custo-benefício', especificacoes: ['ANC', '8h+24h', 'IPX5', 'Dolby Audio'] },
  { id: 'fone-13', nome: 'Philips TAH4205', descricao: 'Over-ear Bluetooth', preco: 179.00, categoria: 'fones', imagens: getProductImages('fones', 'Philips TAH4205'), detalhes: 'Fone Philips mais vendido', especificacoes: ['29h', 'Bass Boost', 'Dobrável', 'Almofadas soft'] },
  { id: 'fone-14', nome: 'Sennheiser Momentum 4', descricao: 'Over-ear audiófilo', preco: 2499.00, categoria: 'fones', imagens: getProductImages('fones', 'Sennheiser Momentum 4'), detalhes: 'Qualidade de som referência', especificacoes: ['ANC adaptável', '60h', 'aptX Adaptive', 'Hi-Res'] },
  { id: 'fone-15', nome: 'QCY T13', descricao: 'TWS econômico', preco: 79.00, categoria: 'fones', imagens: getProductImages('fones', 'QCY T13'), detalhes: 'TWS mais vendido na Shopee', especificacoes: ['8h+32h', 'Bluetooth 5.3', 'IPX4', 'Touch control'] },
  { id: 'fone-16', nome: 'Baseus Bowie M2', descricao: 'TWS ANC acessível', preco: 199.00, categoria: 'fones', imagens: getProductImages('fones', 'Baseus Bowie M2'), detalhes: 'ANC com preço imbatível', especificacoes: ['ANC -43dB', '7h+30h', 'LDAC', 'IPX6'] },
  { id: 'fone-17', nome: 'Havit H2232d', descricao: 'Headset Gamer USB', preco: 89.00, categoria: 'fones', imagens: getProductImages('fones', 'Havit H2232d'), detalhes: 'Headset gamer mais vendido', especificacoes: ['7.1 Surround', 'RGB', 'Microfone', 'Almofadas gel'] },
  { id: 'fone-18', nome: 'Logitech G733', descricao: 'Headset Wireless RGB', preco: 799.00, categoria: 'fones', imagens: getProductImages('fones', 'Logitech G733'), detalhes: 'Headset gamer sem fio mais vendido', especificacoes: ['Lightspeed', '29h', 'Blue VO!CE', 'RGB Lightsync'] },
  { id: 'fone-19', nome: 'HyperX Cloud II', descricao: 'Headset Gamer 7.1', preco: 499.00, categoria: 'fones', imagens: getProductImages('fones', 'HyperX Cloud II'), detalhes: 'Headset profissional e-sports', especificacoes: ['7.1 Virtual', 'Mic destacável', 'Almofadas memory', 'USB'] },
  { id: 'fone-20', nome: 'Razer BlackShark V2', descricao: 'Headset E-sports', preco: 599.00, categoria: 'fones', imagens: getProductImages('fones', 'Razer BlackShark V2'), detalhes: 'Usado por pro players', especificacoes: ['THX Spatial', 'Drivers 50mm', 'Mic HyperClear', 'Leve 262g'] },
  { id: 'fone-21', nome: 'Apple AirPods 3ª Geração', descricao: 'Design aberto', preco: 1599.00, categoria: 'fones', imagens: getProductImages('fones', 'Apple AirPods 3ª Geração'), detalhes: 'AirPods com áudio espacial', especificacoes: ['Spatial Audio', '6h+30h', 'IPX4', 'MagSafe'] },
  { id: 'fone-22', nome: 'Soundcore Liberty 4', descricao: 'TWS Hi-Res', preco: 699.00, categoria: 'fones', imagens: getProductImages('fones', 'Soundcore Liberty 4'), detalhes: 'TWS com certificação Hi-Res', especificacoes: ['LDAC', 'ANC', '9h+28h', 'IPX4'] },
  { id: 'fone-23', nome: 'Jabra Elite 85t', descricao: 'TWS profissional', preco: 1199.00, categoria: 'fones', imagens: getProductImages('fones', 'Jabra Elite 85t'), detalhes: 'TWS para calls e música', especificacoes: ['ANC ajustável', '6 mics', '5.5h+25h', 'IPX4'] },
  { id: 'fone-24', nome: 'Lenovo LP40 Pro', descricao: 'TWS econômico', preco: 49.00, categoria: 'fones', imagens: getProductImages('fones', 'Lenovo LP40 Pro'), detalhes: 'TWS mais vendido no AliExpress', especificacoes: ['Bluetooth 5.1', '4h+20h', 'Touch', 'IPX5'] },
  { id: 'fone-25', nome: 'Shokz OpenRun Pro', descricao: 'Condução óssea', preco: 1299.00, categoria: 'fones', imagens: getProductImages('fones', 'Shokz OpenRun Pro'), detalhes: 'Fone esportivo por condução óssea', especificacoes: ['10h bateria', 'IP67', 'Quick charge', 'Seguro'] },
  { id: 'fone-26', nome: 'JBL Wave Beam', descricao: 'TWS compacto', preco: 299.00, categoria: 'fones', imagens: getProductImages('fones', 'JBL Wave Beam'), detalhes: 'TWS JBL acessível', especificacoes: ['8h+24h', 'IP54', 'Deep Bass', 'USB-C'] },
  { id: 'fone-27', nome: 'Edifier TWS1 Pro', descricao: 'TWS gaming', preco: 349.00, categoria: 'fones', imagens: getProductImages('fones', 'Edifier TWS1 Pro'), detalhes: 'TWS com baixa latência para jogos', especificacoes: ['Low Latency 80ms', '12h+42h', 'IP55', 'Gaming mode'] },
  { id: 'fone-28', nome: 'Audio-Technica ATH-M50x', descricao: 'Monitor profissional', preco: 1299.00, categoria: 'fones', imagens: getProductImages('fones', 'Audio-Technica ATH-M50x'), detalhes: 'Referência para produção musical', especificacoes: ['Drivers 45mm', 'Dobrável', 'Cabo destacável', 'Studio grade'] },
  { id: 'fone-29', nome: 'Philips SHP9500', descricao: 'Open-back Hi-Fi', preco: 699.00, categoria: 'fones', imagens: getProductImages('fones', 'Philips SHP9500'), detalhes: 'Fone aberto audiófilo', especificacoes: ['Open-back', 'Drivers 50mm', 'Conforto', 'Som natural'] },
  { id: 'fone-30', nome: 'Corsair HS55 Stereo', descricao: 'Headset multiplataforma', preco: 299.00, categoria: 'fones', imagens: getProductImages('fones', 'Corsair HS55 Stereo'), detalhes: 'Headset compatível com tudo', especificacoes: ['Multi-platform', 'Mic unidirecional', 'Leve', 'P2'] },
  { id: 'fone-31', nome: 'Bose SoundLink II', descricao: 'Over-ear Bluetooth', preco: 1499.00, categoria: 'fones', imagens: getProductImages('fones', 'Bose SoundLink II'), detalhes: 'Som Bose característico', especificacoes: ['15h', 'NFC', 'Multi-device', 'Dobrável'] },
  { id: 'fone-32', nome: 'Steelseries Arctis Nova Pro', descricao: 'Headset gamer premium', preco: 2199.00, categoria: 'fones', imagens: getProductImages('fones', 'Steelseries Arctis Nova Pro'), detalhes: 'Headset profissional com DAC', especificacoes: ['DAC Hi-Res', 'ANC', 'Hot-swap', '360 Spatial'] },
  { id: 'fone-33', nome: 'KZ ZSN Pro X', descricao: 'In-ear audiófilo', preco: 129.00, categoria: 'fones', imagens: getProductImages('fones', 'KZ ZSN Pro X'), detalhes: 'IEM com melhor custo-benefício', especificacoes: ['Hybrid BA+DD', 'Cabo destacável', 'Metal', 'Hi-Res'] },
  { id: 'fone-34', nome: 'Sony WH-CH520', descricao: 'On-ear econômico', preco: 299.00, categoria: 'fones', imagens: getProductImages('fones', 'Sony WH-CH520'), detalhes: 'Sony acessível com bateria gigante', especificacoes: ['50h bateria', 'Quick charge', 'Leve', 'Multi-point'] },
  { id: 'fone-35', nome: 'Huawei FreeBuds 5i', descricao: 'TWS ANC', preco: 449.00, categoria: 'fones', imagens: getProductImages('fones', 'Huawei FreeBuds 5i'), detalhes: 'TWS Huawei com ANC eficiente', especificacoes: ['ANC 42dB', '7.5h+28h', 'LDAC', 'IP54'] },
  { id: 'fone-36', nome: 'Gamesir T1s', descricao: 'Headset gamer RGB', preco: 179.00, categoria: 'fones', imagens: getProductImages('fones', 'Gamesir T1s'), detalhes: 'Headset gamer com ótimo preço', especificacoes: ['7.1', 'RGB', 'Drivers 50mm', 'P2+USB'] },
  { id: 'fone-37', nome: 'Oneodio A71', descricao: 'Monitor Studio', preco: 199.00, categoria: 'fones', imagens: getProductImages('fones', 'Oneodio A71'), detalhes: 'Fone para produção musical', especificacoes: ['Drivers 40mm', 'Dobrável', 'Shareport', '2 cabos'] },
  { id: 'fone-38', nome: 'QCY HT05', descricao: 'TWS ANC econômico', preco: 149.00, categoria: 'fones', imagens: getProductImages('fones', 'QCY HT05'), detalhes: 'ANC acessível da QCY', especificacoes: ['ANC 40dB', '7h+30h', 'App', 'IPX5'] },
  { id: 'fone-39', nome: 'Haylou GT7', descricao: 'TWS gaming', preco: 139.00, categoria: 'fones', imagens: getProductImages('fones', 'Haylou GT7'), detalhes: 'TWS para gamers mobile', especificacoes: ['Latência 65ms', '5h+20h', 'Game mode', 'IPX4'] },
  { id: 'fone-40', nome: 'Redragon Zeus X', descricao: 'Headset 7.1 RGB', preco: 249.00, categoria: 'fones', imagens: getProductImages('fones', 'Redragon Zeus X'), detalhes: 'Headset gamer best-seller', especificacoes: ['7.1 Surround', 'RGB', 'Drivers 53mm', 'USB'] },

  // Computadores - 40 produtos
  { id: 'comp-1', nome: 'MacBook Pro 14" M3', descricao: '16GB RAM, 512GB SSD', preco: 14999.00, categoria: 'computadores', imagens: getProductImages('computadores', 'MacBook Pro 14" M3'), detalhes: 'MacBook mais vendido no mundo', especificacoes: ['M3', '16GB', '512GB SSD', 'Tela 14.2" XDR'] },
  { id: 'comp-2', nome: 'Dell Inspiron 15', descricao: 'i5, 8GB, 256GB SSD', preco: 3299.00, categoria: 'computadores', imagens: ['💻', '💻', '💻'], detalhes: 'Notebook mais vendido da Dell no Brasil', especificacoes: ['Intel i5 12ª gen', '8GB RAM', '256GB SSD', 'Tela 15.6"'] },
  { id: 'comp-3', nome: 'Lenovo IdeaPad 3i', descricao: 'i3, 8GB, 256GB SSD', preco: 2499.00, categoria: 'computadores', imagens: ['💻', '💻', '💻'], detalhes: 'Notebook mais vendido do Brasil', especificacoes: ['Intel i3 12ª gen', '8GB', '256GB SSD', 'Windows 11'] },
  { id: 'comp-4', nome: 'Acer Aspire 5', descricao: 'i5, 8GB, 512GB SSD', preco: 3199.00, categoria: 'computadores', imagens: ['💻', '💻', '💻'], detalhes: 'Best-seller Acer para trabalho', especificacoes: ['Intel i5', '8GB RAM', '512GB SSD', 'Tela 15.6"'] },
{ id: 'comp-5', nome: 'HP 246 G9', descricao: 'i3, 4GB, 256GB SSD', preco: 2199.00, categoria: 'computadores', imagens: ['💻', '💻', '💻'], detalhes: 'Notebook HP mais acessível', especificacoes: ['Intel i3', '4GB RAM', '256GB SSD', 'Tela 14"'] },
  { id: 'comp-6', nome: 'Samsung Book E30', descricao: 'i3, 4GB, 256GB SSD', preco: 2099.00, categoria: 'computadores', imagens: ['💻', '💻', '💻'], detalhes: 'Samsung com melhor custo-benefício', especificacoes: ['Intel i3', '4GB RAM', '256GB SSD', 'Windows 11'] },
  { id: 'comp-7', nome: 'Asus VivoBook 15', descricao: 'Ryzen 5, 8GB, 512GB', preco: 2899.00, categoria: 'computadores', imagens: ['💻', '💻', '💻'], detalhes: 'VivoBook mais vendido no Brasil', especificacoes: ['Ryzen 5 5500U', '8GB', '512GB SSD', 'Tela 15.6"'] },
  { id: 'comp-8', nome: 'Lenovo Legion 5', descricao: 'Ryzen 7, RTX 4060, 16GB', preco: 6999.00, categoria: 'computadores', imagens: ['💻', '💻', '💻'], detalhes: 'Notebook gamer mais vendido', especificacoes: ['Ryzen 7', 'RTX 4060', '16GB', 'Tela 165Hz'] },
  { id: 'comp-9', nome: 'Dell G15', descricao: 'i5, RTX 3050, 8GB', preco: 4999.00, categoria: 'computadores', imagens: ['💻', '💻', '💻'], detalhes: 'Gamer Dell entrada', especificacoes: ['Intel i5', 'RTX 3050', '8GB', 'Tela 120Hz'] },
  { id: 'comp-10', nome: 'Acer Nitro 5', descricao: 'i5, RTX 3050, 8GB', preco: 4499.00, categoria: 'computadores', imagens: ['💻', '💻', '💻'], detalhes: 'Gamer best-seller no Brasil', especificacoes: ['Intel i5', 'RTX 3050', '8GB', '144Hz'] },
  { id: 'comp-11', nome: 'MacBook Air M2', descricao: '8GB, 256GB SSD', preco: 9999.00, categoria: 'computadores', imagens: ['💻', '💻', '💻'], detalhes: 'MacBook mais vendido globalmente', especificacoes: ['M2', '8GB', '256GB', 'Tela 13.6"'] },
  { id: 'comp-12', nome: 'Asus TUF Gaming F15', descricao: 'i5, RTX 4050, 16GB', preco: 5499.00, categoria: 'computadores', imagens: ['💻', '💻', '💻'], detalhes: 'TUF com melhor durabilidade', especificacoes: ['Intel i5', 'RTX 4050', '16GB', '144Hz'] },
  { id: 'comp-13', nome: 'HP Pavilion Gaming', descricao: 'Ryzen 5, GTX 1650, 8GB', preco: 3999.00, categoria: 'computadores', imagens: ['💻', '💻', '💻'], detalhes: 'Gamer acessível HP', especificacoes: ['Ryzen 5', 'GTX 1650', '8GB', 'SSD 512GB'] },
  { id: 'comp-14', nome: 'Lenovo IdeaPad Gaming 3', descricao: 'Ryzen 5, RTX 3050, 8GB', preco: 4299.00, categoria: 'computadores', imagens: ['💻', '💻', '💻'], detalhes: 'Gaming com ótimo preço', especificacoes: ['Ryzen 5', 'RTX 3050', '8GB', '120Hz'] },
  { id: 'comp-15', nome: 'Dell Inspiron 14 2-em-1', descricao: 'i5, 8GB, 256GB SSD', preco: 3799.00, categoria: 'computadores', imagens: ['💻', '💻', '💻'], detalhes: 'Notebook conversível Dell', especificacoes: ['Intel i5', '8GB', 'Touchscreen', 'Dobrável'] },
  { id: 'comp-16', nome: 'Samsung Galaxy Book3', descricao: 'i7, 16GB, 512GB', preco: 6499.00, categoria: 'computadores', imagens: ['💻', '💻', '💻'], detalhes: 'Samsung com tela AMOLED', especificacoes: ['Intel i7', '16GB', 'AMOLED', '512GB SSD'] },
  { id: 'comp-17', nome: 'Microsoft Surface Laptop 5', descricao: 'i7, 16GB, 512GB', preco: 8999.00, categoria: 'computadores', imagens: ['💻', '💻', '💻'], detalhes: 'Surface premium touchscreen', especificacoes: ['Intel i7', '16GB', 'Touchscreen', '512GB'] },
  { id: 'comp-18', nome: 'Asus Zenbook 14', descricao: 'i5, 8GB, 512GB', preco: 4999.00, categoria: 'computadores', imagens: ['💻', '💻', '💻'], detalhes: 'Ultrabook fino e leve', especificacoes: ['Intel i5', '8GB', 'OLED', '1.39kg'] },
  { id: 'comp-19', nome: 'Acer Swift 3', descricao: 'Ryzen 7, 16GB, 512GB', preco: 4299.00, categoria: 'computadores', imagens: ['💻', '💻', '💻'], detalhes: 'Notebook leve e potente', especificacoes: ['Ryzen 7', '16GB', '512GB', '1.2kg'] },
  { id: 'comp-20', nome: 'Vaio FE14', descricao: 'i3, 4GB, 256GB SSD', preco: 2399.00, categoria: 'computadores', imagens: ['💻', '💻', '💻'], detalhes: 'Vaio entrada mais vendido', especificacoes: ['Intel i3', '4GB', '256GB', 'Windows 11'] },
  { id: 'comp-21', nome: 'Lenovo ThinkPad E14', descricao: 'i5, 8GB, 256GB', preco: 4199.00, categoria: 'computadores', imagens: ['💻', '💻', '💻'], detalhes: 'ThinkPad corporativo', especificacoes: ['Intel i5', '8GB', 'Teclado retroiluminado', 'Durável'] },
  { id: 'comp-22', nome: 'HP Victus 15', descricao: 'i5, RTX 3050, 8GB', preco: 4699.00, categoria: 'computadores', imagens: ['💻', '💻', '💻'], detalhes: 'Gamer HP com design premium', especificacoes: ['Intel i5', 'RTX 3050', '144Hz', '8GB'] },
  { id: 'comp-23', nome: 'MSI GF63 Thin', descricao: 'i5, GTX 1650, 8GB', preco: 4299.00, categoria: 'computadores', imagens: ['💻', '💻', '💻'], detalhes: 'MSI gamer fino', especificacoes: ['Intel i5', 'GTX 1650', '8GB', 'Fino'] },
  { id: 'comp-24', nome: 'Positivo Motion Q464C', descricao: 'Celeron, 4GB, 64GB', preco: 1499.00, categoria: 'computadores', imagens: ['💻', '💻', '💻'], detalhes: 'Notebook mais acessível do Brasil', especificacoes: ['Celeron', '4GB', '64GB eMMC', 'Básico'] },
  { id: 'comp-25', nome: 'Dell XPS 13', descricao: 'i7, 16GB, 512GB', preco: 8999.00, categoria: 'computadores', imagens: ['💻', '💻', '💻'], detalhes: 'Ultrabook premium Dell', especificacoes: ['Intel i7', '16GB', '13.4"', 'InfinityEdge'] },
  { id: 'comp-26', nome: 'LG Gram 17', descricao: 'i7, 16GB, 512GB', preco: 7999.00, categoria: 'computadores', imagens: ['💻', '💻', '💻'], detalhes: 'Tela grande e ultraleve', especificacoes: ['Intel i7', '17"', '1.35kg', '80Wh'] },
  { id: 'comp-27', nome: 'Razer Blade 15', descricao: 'i7, RTX 4070, 16GB', preco: 12999.00, categoria: 'computadores', imagens: ['💻', '💻', '💻'], detalhes: 'Premium gamer compacto', especificacoes: ['Intel i7', 'RTX 4070', '240Hz', 'RGB'] },
  { id: 'comp-28', nome: 'Alienware M15 R7', descricao: 'i7, RTX 4060, 16GB', preco: 9999.00, categoria: 'computadores', imagens: ['💻', '💻', '💻'], detalhes: 'Gamer Dell Alienware', especificacoes: ['Intel i7', 'RTX 4060', '165Hz', 'RGB'] },
  { id: 'comp-29', nome: 'Asus ROG Strix G15', descricao: 'Ryzen 9, RTX 4070, 32GB', preco: 11999.00, categoria: 'computadores', imagens: ['💻', '💻', '💻'], detalhes: 'Top gamer ROG', especificacoes: ['Ryzen 9', 'RTX 4070', '32GB', '240Hz'] },
  { id: 'comp-30', nome: 'Acer Predator Helios 300', descricao: 'i7, RTX 4060, 16GB', preco: 8499.00, categoria: 'computadores', imagens: ['💻', '💻', '💻'], detalhes: 'Predator com RGB', especificacoes: ['Intel i7', 'RTX 4060', '165Hz', 'RGB Keyboard'] },
  { id: 'comp-31', nome: 'HP Envy x360', descricao: 'Ryzen 7, 16GB, 512GB', preco: 5999.00, categoria: 'computadores', imagens: ['💻', '💻', '💻'], detalhes: 'Conversível HP premium', especificacoes: ['Ryzen 7', '16GB', 'Touchscreen', '2-em-1'] },
  { id: 'comp-32', nome: 'Samsung Galaxy Book2 360', descricao: 'i7, 16GB, 512GB', preco: 6999.00, categoria: 'computadores', imagens: ['💻', '💻', '💻'], detalhes: 'Conversível AMOLED', especificacoes: ['Intel i7', '16GB', 'AMOLED Touch', 'S Pen'] },
  { id: 'comp-33', nome: 'Lenovo Yoga 7i', descricao: 'i7, 16GB, 512GB', preco: 6499.00, categoria: 'computadores', imagens: ['💻', '💻', '💻'], detalhes: 'Yoga conversível premium', especificacoes: ['Intel i7', '16GB', '2-em-1', 'Gauntlet hinge'] },
  { id: 'comp-34', nome: 'Dell Latitude 5430', descricao: 'i5, 8GB, 256GB', preco: 5299.00, categoria: 'computadores', imagens: ['💻', '💻', '💻'], detalhes: 'Corporativo Dell durável', especificacoes: ['Intel i5', '8GB', 'MIL-STD', 'ExpressCharge'] },
  { id: 'comp-35', nome: 'HP ProBook 440 G9', descricao: 'i5, 8GB, 256GB', preco: 4799.00, categoria: 'computadores', imagens: ['💻', '💻', '💻'], detalhes: 'ProBook para empresas', especificacoes: ['Intel i5', '8GB', 'Durável', 'Segurança'] },
  { id: 'comp-36', nome: 'Asus ExpertBook B1', descricao: 'i3, 8GB, 256GB', preco: 3299.00, categoria: 'computadores', imagens: ['💻', '💻', '💻'], detalhes: 'Corporativo Asus acessível', especificacoes: ['Intel i3', '8GB', 'MIL-STD', 'Leitor biométrico'] },
  { id: 'comp-37', nome: 'Lenovo V15 G3', descricao: 'Ryzen 5, 8GB, 256GB', preco: 2699.00, categoria: 'computadores', imagens: ['💻', '💻', '💻'], detalhes: 'V15 para empresas', especificacoes: ['Ryzen 5', '8GB', '256GB', 'Tela 15.6"'] },
  { id: 'comp-38', nome: 'Acer TravelMate P2', descricao: 'i3, 4GB, 128GB', preco: 2299.00, categoria: 'computadores', imagens: ['💻', '💻', '💻'], detalhes: 'TravelMate básico', especificacoes: ['Intel i3', '4GB', '128GB SSD', 'Corporativo'] },
  { id: 'comp-39', nome: 'Samsung Chromebook 4', descricao: 'Celeron, 4GB, 64GB', preco: 1799.00, categoria: 'computadores', imagens: ['💻', '💻', '💻'], detalhes: 'Chromebook Samsung', especificacoes: ['Celeron', '4GB', 'Chrome OS', '12.5h bateria'] },
  { id: 'comp-40', nome: 'Lenovo Chromebook S330', descricao: 'MediaTek, 4GB, 64GB', preco: 1599.00, categoria: 'computadores', imagens: ['💻', '💻', '💻'], detalhes: 'Chromebook acessível', especificacoes: ['MediaTek', '4GB', 'Chrome OS', '10h bateria'] },

  // Impressoras - 40 produtos
  { id: 'imp-1', nome: 'HP DeskJet 2774', descricao: 'Multifuncional Wi-Fi', preco: 599.00, categoria: 'impressoras', imagens: ['🖨️', '🖨️', '🖨️'], detalhes: 'Impressora mais vendida do Brasil', especificacoes: ['Wi-Fi', 'Scanner', 'Cópia', 'USB'] },
  { id: 'imp-2', nome: 'Epson EcoTank L3250', descricao: 'Tanque de tinta Wi-Fi', preco: 1299.00, categoria: 'impressoras', imagens: ['🖨️', '🖨️', '🖨️'], detalhes: 'EcoTank mais vendida Amazon', especificacoes: ['Tanque tinta', 'Wi-Fi', '7500 páginas', 'Scanner'] },
  { id: 'imp-3', nome: 'Canon PIXMA G3260', descricao: 'Tanque de tinta colorida', preco: 1499.00, categoria: 'impressoras', imagens: ['🖨️', '🖨️', '🖨️'], detalhes: 'PIXMA G best-seller', especificacoes: ['Tanque', 'Wi-Fi', '6000 pág', 'Scanner'] },
  { id: 'imp-4', nome: 'HP Smart Tank 580', descricao: 'Tanque Wi-Fi colorida', preco: 1199.00, categoria: 'impressoras', imagens: ['🖨️', '🖨️', '🖨️'], detalhes: 'Smart Tank HP econômica', especificacoes: ['Tanque', 'Wi-Fi', '8000 pág', 'Scanner'] },
  { id: 'imp-5', nome: 'Epson L3210', descricao: 'EcoTank básica', preco: 949.00, categoria: 'impressoras', imagens: ['🖨️', '🖨️', '🖨️'], detalhes: 'EcoTank mais acessível', especificacoes: ['Tanque', 'USB', '4500 pág', 'Scanner'] },
  { id: 'imp-6', nome: 'Canon PIXMA G2260', descricao: 'Tanque compacta', preco: 1099.00, categoria: 'impressoras', imagens: ['🖨️', '🖨️', '🖨️'], detalhes: 'G2260 acessível', especificacoes: ['Tanque', 'USB', '6000 pág', 'Scanner'] },
  { id: 'imp-7', nome: 'Brother DCP-T720DW', descricao: 'Tanque Wi-Fi duplex', preco: 1599.00, categoria: 'impressoras', imagens: ['🖨️', '🖨️', '🖨️'], detalhes: 'Brother com duplex automático', especificacoes: ['Tanque', 'Wi-Fi', 'Duplex', '5000 pág'] },
  { id: 'imp-8', nome: 'HP LaserJet M110w', descricao: 'Laser mono Wi-Fi', preco: 999.00, categoria: 'impressoras', imagens: ['🖨️', '🖨️', '🖨️'], detalhes: 'Laser mais vendida', especificacoes: ['Laser Mono', 'Wi-Fi', '20 ppm', 'Compacta'] },
  { id: 'imp-9', nome: 'Brother HL-L2350DW', descricao: 'Laser mono Wi-Fi duplex', preco: 1199.00, categoria: 'impressoras', imagens: ['🖨️', '🖨️', '🖨️'], detalhes: 'Laser Brother best-seller', especificacoes: ['Laser', 'Wi-Fi', 'Duplex', '32 ppm'] },
  { id: 'imp-10', nome: 'Samsung Xpress M2020W', descricao: 'Laser mono Wi-Fi', preco: 899.00, categoria: 'impressoras', imagens: ['🖨️', '🖨️', '🖨️'], detalhes: 'Xpress compacta', especificacoes: ['Laser', 'Wi-Fi', '20 ppm', 'NFC'] },
  { id: 'imp-11', nome: 'Epson L3150', descricao: 'EcoTank Wi-Fi', preco: 1099.00, categoria: 'impressoras', imagens: ['🖨️', '🖨️', '🖨️'], detalhes: 'L3150 econômica', especificacoes: ['Tanque', 'Wi-Fi', '7500 pág', 'Scanner'] },
  { id: 'imp-12', nome: 'Canon PIXMA TS3450', descricao: 'Multifuncional Wi-Fi', preco: 449.00, categoria: 'impressoras', imagens: ['🖨️', '🖨️', '🖨️'], detalhes: 'PIXMA mais acessível', especificacoes: ['Jato', 'Wi-Fi', 'Scanner', 'Compacta'] },
  { id: 'imp-13', nome: 'HP DeskJet 4120e', descricao: 'Multifuncional HP+', preco: 699.00, categoria: 'impressoras', imagens: ['🖨️', '🖨️', '🖨️'], detalhes: 'DeskJet com HP+', especificacoes: ['HP+', 'Wi-Fi', 'Scanner', '3 meses grátis'] },
  { id: 'imp-14', nome: 'Epson L3250', descricao: 'EcoTank Wi-Fi duplex', preco: 1399.00, categoria: 'impressoras', imagens: ['🖨️', '🖨️', '🖨️'], detalhes: 'L3250 com duplex manual', especificacoes: ['Tanque', 'Wi-Fi', '7500 pág', 'Duplex'] },
  { id: 'imp-15', nome: 'Brother DCP-T520W', descricao: 'Tanque Wi-Fi', preco: 1299.00, categoria: 'impressoras', imagens: ['🖨️', '🖨️', '🖨️'], detalhes: 'Brother tanque acessível', especificacoes: ['Tanque', 'Wi-Fi', '5000 pág', 'Scanner'] },
  { id: 'imp-16', nome: 'Canon MEGA Tank G4210', descricao: 'Tanque Wi-Fi com fax', preco: 1899.00, categoria: 'impressoras', imagens: ['🖨️', '🖨️', '🖨️'], detalhes: 'MEGA Tank completa', especificacoes: ['Tanque', 'Wi-Fi', 'Fax', 'ADF'] },
  { id: 'imp-17', nome: 'HP Smart Tank 720', descricao: 'Tanque Wi-Fi pro', preco: 1699.00, categoria: 'impressoras', imagens: ['🖨️', '🖨️', '🖨️'], detalhes: 'Smart Tank premium', especificacoes: ['Tanque', 'Wi-Fi', 'Duplex', 'ADF'] },
  { id: 'imp-18', nome: 'Epson L4260', descricao: 'EcoTank Wi-Fi duplex ADF', preco: 1999.00, categoria: 'impressoras', imagens: ['🖨️', '🖨️', '🖨️'], detalhes: 'L4260 completa', especificacoes: ['Tanque', 'Wi-Fi', 'ADF', 'Duplex auto'] },
  { id: 'imp-19', nome: 'Brother MFC-L2750DW', descricao: 'Laser multifuncional', preco: 2299.00, categoria: 'impressoras', imagens: ['🖨️', '🖨️', '🖨️'], detalhes: 'Laser completa Brother', especificacoes: ['Laser', 'Wi-Fi', 'ADF', 'Duplex'] },
  { id: 'imp-20', nome: 'HP LaserJet Pro M404dw', descricao: 'Laser profissional', preco: 2599.00, categoria: 'impressoras', imagens: ['🖨️', '🖨️', '🖨️'], detalhes: 'LaserJet Pro rápida', especificacoes: ['Laser', 'Wi-Fi', '40 ppm', 'Duplex'] },
  { id: 'imp-21', nome: 'Canon imageCLASS MF264dw', descricao: 'Laser multi completa', preco: 2199.00, categoria: 'impressoras', imagens: ['🖨️', '🖨️', '🖨️'], detalhes: 'imageCLASS profissional', especificacoes: ['Laser', 'Wi-Fi', 'ADF', 'Touch'] },
  { id: 'imp-22', nome: 'Epson WorkForce WF-2830', descricao: 'Jato multi Wi-Fi', preco: 799.00, categoria: 'impressoras', imagens: ['🖨️', '🖨️', '🖨️'], detalhes: 'WorkForce acessível', especificacoes: ['Jato', 'Wi-Fi', 'Scanner', 'Cópia'] },
  { id: 'imp-23', nome: 'HP OfficeJet Pro 8210', descricao: 'Jato profissional', preco: 1299.00, categoria: 'impressoras', imagens: ['🖨️', '🖨️', '🖨️'], detalhes: 'OfficeJet Pro rápida', especificacoes: ['Jato', 'Wi-Fi', '22 ppm', 'Duplex'] },
  { id: 'imp-24', nome: 'Canon PIXMA TR4722', descricao: 'Multi com ADF', preco: 699.00, categoria: 'impressoras', imagens: ['🖨️', '🖨️', '🖨️'], detalhes: 'TR com alimentador', especificacoes: ['Jato', 'Wi-Fi', 'ADF', 'Fax'] },
  { id: 'imp-25', nome: 'Epson L3110', descricao: 'EcoTank USB', preco: 799.00, categoria: 'impressoras', imagens: ['🖨️', '🖨️', '🖨️'], detalhes: 'EcoTank mais básica', especificacoes: ['Tanque', 'USB', '4500 pág', 'Scanner'] },
  { id: 'imp-26', nome: 'Brother DCP-1617NW', descricao: 'Laser multi Wi-Fi', preco: 1399.00, categoria: 'impressoras', imagens: ['🖨️', '🖨️', '🖨️'], detalhes: 'Laser Brother compacta', especificacoes: ['Laser', 'Wi-Fi', '20 ppm', 'Scanner'] },
  { id: 'imp-27', nome: 'HP DeskJet 3776', descricao: 'Menor multifuncional', preco: 399.00, categoria: 'impressoras', imagens: ['🖨️', '🖨️', '🖨️'], detalhes: 'DeskJet ultra compacta', especificacoes: ['Jato', 'Wi-Fi', 'Mini', 'Scanner'] },
  { id: 'imp-28', nome: 'Canon SELPHY CP1500', descricao: 'Fotográfica portátil', preco: 1199.00, categoria: 'impressoras', imagens: ['🖨️', '🖨️', '🖨️'], detalhes: 'SELPHY para fotos', especificacoes: ['Térmica', 'Wi-Fi', 'Portátil', '10x15cm'] },
  { id: 'imp-29', nome: 'Epson L6191', descricao: 'EcoTank A4 duplex ADF', preco: 2799.00, categoria: 'impressoras', imagens: ['🖨️', '🖨️', '🖨️'], detalhes: 'L6191 profissional', especificacoes: ['Tanque', 'Wi-Fi', 'ADF', 'Fax'] },
  { id: 'imp-30', nome: 'HP LaserJet Pro MFP M428fdw', descricao: 'Laser multi pro', preco: 3999.00, categoria: 'impressoras', imagens: ['🖨️', '🖨️', '🖨️'], detalhes: 'LaserJet Pro top', especificacoes: ['Laser', 'Wi-Fi', 'ADF', '40 ppm'] },
  { id: 'imp-31', nome: 'Brother HL-L2305W', descricao: 'Laser mono Wi-Fi', preco: 799.00, categoria: 'impressoras', imagens: ['🖨️', '🖨️', '🖨️'], detalhes: 'Laser Brother básica', especificacoes: ['Laser', 'Wi-Fi', '20 ppm', 'Só imprime'] },
  { id: 'imp-32', nome: 'Canon PIXMA iP110', descricao: 'Portátil Wi-Fi', preco: 1599.00, categoria: 'impressoras', imagens: ['🖨️', '🖨️', '🖨️'], detalhes: 'PIXMA portátil', especificacoes: ['Jato', 'Wi-Fi', 'Bateria', 'A4'] },
  { id: 'imp-33', nome: 'Epson L1250', descricao: 'EcoTank A4 Wi-Fi', preco: 899.00, categoria: 'impressoras', imagens: ['🖨️', '🖨️', '🖨️'], detalhes: 'L1250 só imprime', especificacoes: ['Tanque', 'Wi-Fi', '5200 pág', 'A4'] },
  { id: 'imp-34', nome: 'HP DeskJet Plus 4122e', descricao: 'Multi com HP+', preco: 799.00, categoria: 'impressoras', imagens: ['🖨️', '🖨️', '🖨️'], detalhes: 'DeskJet Plus HP+', especificacoes: ['HP+', 'Wi-Fi', 'Scanner', 'Grátis'] },
  { id: 'imp-35', nome: 'Brother MFC-J4540DW', descricao: 'Jato A3 ADF', preco: 2199.00, categoria: 'impressoras', imagens: ['🖨️', '🖨️', '🖨️'], detalhes: 'Multi A3 Brother', especificacoes: ['Jato A3', 'Wi-Fi', 'ADF', 'Duplex'] },
  { id: 'imp-36', nome: 'Canon MAXIFY GX7010', descricao: 'Tanque office', preco: 2899.00, categoria: 'impressoras', imagens: ['🖨️', '🖨️', '🖨️'], detalhes: 'MAXIFY para escritório', especificacoes: ['Tanque', 'Wi-Fi', 'ADF', 'Fax'] },
  { id: 'imp-37', nome: 'Epson EcoTank L6270', descricao: 'A4 multifuncional completa', preco: 3199.00, categoria: 'impressoras', imagens: ['🖨️', '🖨️', '🖨️'], detalhes: 'L6270 profissional', especificacoes: ['Tanque', 'Wi-Fi', 'ADF', 'Duplex auto'] },
  { id: 'imp-38', nome: 'HP Smart Tank 670', descricao: 'Tanque Wi-Fi direto', preco: 1499.00, categoria: 'impressoras', imagens: ['🖨️', '🖨️', '🖨️'], detalhes: 'Smart Tank 670', especificacoes: ['Tanque', 'Wi-Fi Direct', '8000 pág', 'Scanner'] },
  { id: 'imp-39', nome: 'Brother DCP-T920DW', descricao: 'Tanque duplex automático', preco: 1899.00, categoria: 'impressoras', imagens: ['🖨️', '🖨️', '🖨️'], detalhes: 'T920DW duplex', especificacoes: ['Tanque', 'Wi-Fi', 'Duplex auto', '5000 pág'] },
  { id: 'imp-40', nome: 'Canon PIXMA G6010', descricao: 'Tanque office avançada', preco: 2199.00, categoria: 'impressoras', imagens: ['🖨️', '🖨️', '🖨️'], detalhes: 'G6010 para empresas', especificacoes: ['Tanque', 'Wi-Fi', 'ADF', '6000 pág'] },

  // Escritório - 40 produtos
  { id: 'esc-1', nome: 'Cadeira Gamer DT3 Sports GTX', descricao: 'Reclinável 180°', preco: 1299.00, categoria: 'escritorio', imagens: ['🪑', '🪑', '🪑'], detalhes: 'Cadeira gamer mais vendida do Brasil', especificacoes: ['Reclinável 180°', 'Apoio lombar', 'Braços 4D', 'Couro PU'] },
  { id: 'esc-2', nome: 'Cadeira Presidente Giratória', descricao: 'Couro sintético', preco: 599.00, categoria: 'escritorio', imagens: ['🪑', '🪑', '🪑'], detalhes: 'Cadeira executiva best-seller', especificacoes: ['Giratória', 'Base metal', 'Apoio lombar', 'Rodas'] },
  { id: 'esc-3', nome: 'Cadeira Ergonômica Cavaletti', descricao: 'Tela mesh', preco: 899.00, categoria: 'escritorio', imagens: ['🪑', '🪑', '🪑'], detalhes: 'Ergonômica com tela respirável', especificacoes: ['Tela mesh', 'Regulável', 'Apoio lombar', 'Braços'] },
  { id: 'esc-4', nome: 'Mesa para Escritório 120cm', descricao: 'MDF branca', preco: 399.00, categoria: 'escritorio', imagens: ['🪑', '🪑', '🪑'], detalhes: 'Mesa mais vendida Amazon', especificacoes: ['120x60cm', 'MDF', 'Branca', 'Gaveta'] },
  { id: 'esc-5', nome: 'Mesa L para Computador', descricao: 'Formato L 150x150cm', preco: 699.00, categoria: 'escritorio', imagens: ['🪑', '🪑', '🪑'], detalhes: 'Mesa L para canto', especificacoes: ['150x150cm', 'Formato L', 'MDF', '2 níveis'] },
  { id: 'esc-6', nome: 'Escrivaninha Suspensa', descricao: 'Parede 90cm', preco: 249.00, categoria: 'escritorio', imagens: ['🪑', '🪑', '🪑'], detalhes: 'Escrivaninha suspensa econômica', especificacoes: ['90cm', 'Suspensa', 'MDP', 'Suporta 20kg'] },
  { id: 'esc-7', nome: 'Monitor Samsung 24" T350', descricao: 'IPS Full HD 75Hz', preco: 699.00, categoria: 'escritorio', imagens: ['🖥️', '🖥️', '🖥️'], detalhes: 'Monitor Samsung mais vendido', especificacoes: ['24"', 'Full HD', 'IPS', '75Hz'] },
  { id: 'esc-8', nome: 'Monitor LG 27" UltraWide', descricao: '29" 21:9 75Hz', preco: 1199.00, categoria: 'escritorio', imagens: ['🖥️', '🖥️', '🖥️'], detalhes: 'UltraWide para produtividade', especificacoes: ['29"', '21:9', 'IPS', '75Hz'] },
  { id: 'esc-9', nome: 'Monitor AOC 24" Gamer', descricao: '144Hz 1ms', preco: 899.00, categoria: 'escritorio', imagens: ['🖥️', '🖥️', '🖥️'], detalhes: 'Monitor gamer AOC best-seller', especificacoes: ['24"', '144Hz', '1ms', 'FreeSync'] },
  { id: 'esc-10', nome: 'Monitor Dell 27" QHD', descricao: 'IPS 2K 60Hz', preco: 1699.00, categoria: 'escritorio', imagens: ['🖥️', '🖥️', '🖥️'], detalhes: 'Monitor profissional Dell', especificacoes: ['27"', '2560x1440', 'IPS', 'USB-C'] },
  { id: 'esc-11', nome: 'Teclado Mecânico Redragon K552', descricao: 'RGB Outemu Blue', preco: 249.00, categoria: 'escritorio', imagens: ['⌨️', '⌨️', '⌨️'], detalhes: 'Teclado mecânico mais vendido BR', especificacoes: ['Mecânico', 'RGB', 'Outemu Blue', 'TKL'] },
  { id: 'esc-12', nome: 'Teclado Logitech K380', descricao: 'Bluetooth multi-device', preco: 229.00, categoria: 'escritorio', imagens: ['⌨️', '⌨️', '⌨️'], detalhes: 'Bluetooth Logitech best-seller', especificacoes: ['Bluetooth', '3 devices', 'Compacto', '2 anos bateria'] },
  { id: 'esc-13', nome: 'Teclado Mecânico HyperX Alloy', descricao: 'RGB Switch Red', preco: 499.00, categoria: 'escritorio', imagens: ['⌨️', '⌨️', '⌨️'], detalhes: 'HyperX Switch Red', especificacoes: ['Mecânico Red', 'RGB', 'Alumínio', 'Full size'] },
  { id: 'esc-14', nome: 'Teclado Microsoft 600', descricao: 'Sem fio compacto', preco: 129.00, categoria: 'escritorio', imagens: ['⌨️', '⌨️', '⌨️'], detalhes: 'Teclado Microsoft básico', especificacoes: ['Sem fio', 'Compacto', 'Preto', 'USB'] },
  { id: 'esc-15', nome: 'Mouse Logitech G203', descricao: 'Gamer RGB 8000 DPI', preco: 149.00, categoria: 'escritorio', imagens: ['🖱️', '🖱️', '🖱️'], detalhes: 'Mouse gamer mais vendido', especificacoes: ['8000 DPI', 'RGB', '6 botões', 'USB'] },
  { id: 'esc-16', nome: 'Mouse Logitech MX Anywhere 3', descricao: 'Compacto sem fio', preco: 499.00, categoria: 'escritorio', imagens: ['🖱️', '🖱️', '🖱️'], detalhes: 'Mouse portátil premium', especificacoes: ['4000 DPI', 'Bluetooth', 'Compacto', '70 dias'] },
  { id: 'esc-17', nome: 'Mouse Razer DeathAdder', descricao: 'Gamer 20000 DPI', preco: 349.00, categoria: 'escritorio', imagens: ['🖱️', '🖱️', '🖱️'], detalhes: 'DeathAdder clássico', especificacoes: ['20000 DPI', 'Ergonômico', '8 botões', 'RGB'] },
  { id: 'esc-18', nome: 'Mouse Microsoft Bluetooth', descricao: 'Mobile 1850', preco: 79.00, categoria: 'escritorio', imagens: ['🖱️', '🖱️', '🖱️'], detalhes: 'Mouse básico Microsoft', especificacoes: ['Bluetooth', 'Compacto', '1000 DPI', '12 meses'] },
  { id: 'esc-19', nome: 'Webcam Logitech C920s HD Pro', descricao: '1080p 30fps', preco: 499.00, categoria: 'escritorio', imagens: ['📷', '📷', '📷'], detalhes: 'Webcam mais vendida mundo', especificacoes: ['1080p', '30fps', 'Mic estéreo', 'Tampa privacidade'] },
  { id: 'esc-20', nome: 'Webcam Logitech C270', descricao: '720p HD', preco: 199.00, categoria: 'escritorio', imagens: ['📷', '📷', '📷'], detalhes: 'Webcam Logitech acessível', especificacoes: ['720p', 'Mic', 'Widescreen', 'USB'] },
  { id: 'esc-21', nome: 'Webcam Multilaser Full HD', descricao: '1080p com tripé', preco: 149.00, categoria: 'escritorio', imagens: ['📷', '📷', '📷'], detalhes: 'Webcam nacional com tripé', especificacoes: ['1080p', 'Tripé', 'Mic', 'USB'] },
  { id: 'esc-22', nome: 'Ring Light 26cm', descricao: 'Com tripé 2m', preco: 129.00, categoria: 'escritorio', imagens: ['💡', '💡', '💡'], detalhes: 'Ring light mais vendida', especificacoes: ['26cm', 'Tripé 2m', '3 tons', 'USB'] },
  { id: 'esc-23', nome: 'Luminária de Mesa LED', descricao: 'Ajustável USB', preco: 89.00, categoria: 'escritorio', imagens: ['💡', '💡', '💡'], detalhes: 'Luminária LED ajustável', especificacoes: ['LED', 'Ajustável', 'USB', '3 níveis'] },
  { id: 'esc-24', nome: 'Suporte para Notebook', descricao: 'Alumínio ajustável', preco: 89.00, categoria: 'escritorio', imagens: ['💻', '💻', '💻'], detalhes: 'Suporte notebook mais vendido', especificacoes: ['Alumínio', 'Ajustável', 'Até 17"', 'Ventilação'] },
  { id: 'esc-25', nome: 'Suporte Monitor Articulado', descricao: 'VESA 13-32"', preco: 179.00, categoria: 'escritorio', imagens: ['🖥️', '🖥️', '🖥️'], detalhes: 'Suporte articulado best-seller', especificacoes: ['13-32"', 'VESA', 'Articulado', 'Até 8kg'] },
  { id: 'esc-26', nome: 'Suporte Monitor Duplo', descricao: 'VESA para 2 monitores', preco: 299.00, categoria: 'escritorio', imagens: ['🖥️', '🖥️', '🖥️'], detalhes: 'Suporte para 2 monitores', especificacoes: ['Duplo', 'VESA', '13-27"', 'Até 16kg'] },
  { id: 'esc-27', nome: 'Apoio para Pés', descricao: 'Ergonômico ajustável', preco: 79.00, categoria: 'escritorio', imagens: ['🪑', '🪑', '🪑'], detalhes: 'Apoio pés ergonômico', especificacoes: ['Ajustável', 'Massageador', 'Antiderrapante', 'Plástico'] },
  { id: 'esc-28', nome: 'Apoio para Punho Teclado', descricao: 'Gel ergonômico', preco: 39.00, categoria: 'escritorio', imagens: ['⌨️', '⌨️', '⌨️'], detalhes: 'Apoio punho gel', especificacoes: ['Gel', 'Ergonômico', 'Antiderrapante', 'Memory foam'] },
  { id: 'esc-29', nome: 'Organizador de Mesa', descricao: 'Bambu 6 compartimentos', preco: 69.00, categoria: 'escritorio', imagens: ['🪑', '🪑', '🪑'], detalhes: 'Organizador bambu sustentável', especificacoes: ['Bambu', '6 divisórias', 'Compacto', 'Eco'] },
  { id: 'esc-30', nome: 'Filtro de Linha 8 Tomadas', descricao: 'Proteção contra surtos', preco: 79.00, categoria: 'escritorio', imagens: ['🔌', '🔌', '🔌'], detalhes: 'Filtro linha mais vendido', especificacoes: ['8 tomadas', 'Proteção', '2m cabo', 'LED'] },
  { id: 'esc-31', nome: 'Estabilizador 300VA', descricao: 'Bivolt 4 tomadas', preco: 129.00, categoria: 'escritorio', imagens: ['🔌', '🔌', '🔌'], detalhes: 'Estabilizador SMS básico', especificacoes: ['300VA', 'Bivolt', '4 tomadas', 'LED'] },
  { id: 'esc-32', nome: 'No-Break 600VA', descricao: 'SMS bivolt 6 tomadas', preco: 299.00, categoria: 'escritorio', imagens: ['🔌', '🔌', '🔌'], detalhes: 'No-break mais vendido', especificacoes: ['600VA', 'Bivolt', '6 tomadas', 'Bateria'] },
  { id: 'esc-33', nome: 'Ventilador de Mesa USB', descricao: 'Silencioso 360°', preco: 49.00, categoria: 'escritorio', imagens: ['💨', '💨', '💨'], detalhes: 'Mini ventilador USB', especificacoes: ['USB', '360°', 'Silencioso', '2 velocidades'] },
  { id: 'esc-34', nome: 'Headset com Microfone USB', descricao: 'Para home office', preco: 89.00, categoria: 'escritorio', imagens: ['🎧', '🎧', '🎧'], detalhes: 'Headset corporativo USB', especificacoes: ['USB', 'Mic cancelamento', 'Almofadas', 'Leve'] },
  { id: 'esc-35', nome: 'Hub USB 3.0 com 4 Portas', descricao: 'Alta velocidade', preco: 49.00, categoria: 'escritorio', imagens: ['🔌', '🔌', '🔌'], detalhes: 'Hub USB 4 portas', especificacoes: ['USB 3.0', '4 portas', '5Gbps', 'Compacto'] },
  { id: 'esc-36', nome: 'Cabo HDMI 2.0 Premium', descricao: '2m 4K 60Hz', preco: 39.00, categoria: 'escritorio', imagens: ['🔌', '🔌', '🔌'], detalhes: 'HDMI premium 4K', especificacoes: ['2m', '4K 60Hz', 'HDR', 'Reforçado'] },
  { id: 'esc-37', nome: 'Adaptador USB-C para HDMI', descricao: '4K 60Hz', preco: 69.00, categoria: 'escritorio', imagens: ['🔌', '🔌', '🔌'], detalhes: 'Adaptador USB-C HDMI', especificacoes: ['USB-C', 'HDMI', '4K 60Hz', 'Plug&Play'] },
  { id: 'esc-38', nome: 'Caixa de Som USB', descricao: '6W estéreo', preco: 59.00, categoria: 'escritorio', imagens: ['🔊', '🔊', '🔊'], detalhes: 'Caixa som USB simples', especificacoes: ['USB', '6W', 'Estéreo', 'P2'] },
  { id: 'esc-39', nome: 'Calculadora Científica', descricao: 'Casio FX-82MS', preco: 89.00, categoria: 'escritorio', imagens: ['🔢', '🔢', '🔢'], detalhes: 'Calculadora Casio clássica', especificacoes: ['Científica', '240 funções', 'Solar', 'Display 2 linhas'] },
  { id: 'esc-40', nome: 'Quadro Branco 60x40cm', descricao: 'Com moldura alumínio', preco: 49.00, categoria: 'escritorio', imagens: ['📋', '📋', '📋'], detalhes: 'Quadro branco pequeno', especificacoes: ['60x40cm', 'Alumínio', 'Apagador', 'Marcador'] },

  // Acessórios - 40 produtos
  { id: 'aces-1', nome: 'Carregador Anker 20W USB-C', descricao: 'Nano Pro compacto', preco: 89.00, categoria: 'acessorios', imagens: ['🔌', '🔌', '🔌'], detalhes: 'Carregador Anker mais vendido', especificacoes: ['20W', 'USB-C PD', 'Dobrável', 'Compacto'] },
  { id: 'aces-2', nome: 'Cabo Lightning 1m', descricao: 'Certificado MFi', preco: 49.00, categoria: 'acessorios', imagens: ['🔌', '🔌', '🔌'], detalhes: 'Cabo iPhone certificado', especificacoes: ['MFi', '1m', 'Fast charge', 'Reforçado'] },
  { id: 'aces-3', nome: 'Cabo USB-C Premium 2m', descricao: 'Carga rápida 100W', preco: 79.00, categoria: 'acessorios', imagens: ['🔌', '🔌', '🔌'], detalhes: 'Cabo USB-C mais vendido', especificacoes: ['2m', '100W', 'USB 3.2', 'Trançado'] },
  { id: 'aces-4', nome: 'Powerbank Xiaomi 10000mAh', descricao: '22.5W fast charge', preco: 129.00, categoria: 'acessorios', imagens: ['🔋', '🔋', '🔋'], detalhes: 'Powerbank Xiaomi best-seller', especificacoes: ['10000mAh', '22.5W', 'USB-C', '2 portas'] },
  { id: 'aces-5', nome: 'Powerbank Anker 20000mAh', descricao: 'PowerCore 20K', preco: 249.00, categoria: 'acessorios', imagens: ['🔋', '🔋', '🔋'], detalhes: 'Bateria externa Anker premium', especificacoes: ['20000mAh', '20W PD', '2 portas', 'Display LED'] },
  { id: 'aces-6', nome: 'Capa para iPhone 15', descricao: 'Silicone líquido', preco: 39.00, categoria: 'acessorios', imagens: ['📱', '📱', '📱'], detalhes: 'Capa iPhone mais vendida', especificacoes: ['Silicone', 'Proteção câmera', 'Macio', 'Anti-queda'] },
  { id: 'aces-7', nome: 'Película 3D Galaxy S24', descricao: 'Vidro temperado curvo', preco: 29.00, categoria: 'acessorios', imagens: ['📱', '📱', '📱'], detalhes: 'Película 3D best-seller', especificacoes: ['3D curvo', 'Vidro 9H', 'Touch sensível', 'Fácil'] },
  { id: 'aces-8', nome: 'Suporte Veicular Magnético', descricao: 'Ventilação do ar', preco: 39.00, categoria: 'acessorios', imagens: ['📱', '📱', '📱'], detalhes: 'Suporte carro mais vendido', especificacoes: ['Magnético', 'Ventilação', '360°', '2 imãs'] },
  { id: 'aces-9', nome: 'Hub USB-C 7 em 1', descricao: 'HDMI 4K USB SD RJ45', preco: 159.00, categoria: 'acessorios', imagens: ['🔌', '🔌', '🔌'], detalhes: 'Hub USB-C completo', especificacoes: ['7 em 1', 'HDMI 4K', 'USB 3.0', 'Ethernet'] },
  { id: 'aces-10', nome: 'Pen Drive SanDisk 128GB', descricao: 'USB 3.0 ultra', preco: 49.00, categoria: 'acessorios', imagens: ['💾', '💾', '💾'], detalhes: 'Pen drive mais vendido', especificacoes: ['128GB', 'USB 3.0', '130MB/s', 'Compacto'] },
  { id: 'aces-11', nome: 'Cartão MicroSD 128GB', descricao: 'SanDisk Extreme', preco: 89.00, categoria: 'acessorios', imagens: ['💾', '💾', '💾'], detalhes: 'MicroSD mais vendido Amazon', especificacoes: ['128GB', 'A2', '160MB/s', 'U3'] },
  { id: 'aces-12', nome: 'SSD Externo 1TB', descricao: 'Portátil USB-C', preco: 499.00, categoria: 'acessorios', imagens: ['💾', '💾', '💾'], detalhes: 'SSD externo best-seller', especificacoes: ['1TB', 'USB-C 3.2', '1050MB/s', 'Compacto'] },
  { id: 'aces-13', nome: 'HD Externo 1TB', descricao: 'WD Elements portátil', preco: 299.00, categoria: 'acessorios', imagens: ['💾', '💾', '💾'], detalhes: 'HD externo mais vendido', especificacoes: ['1TB', 'USB 3.0', 'Portátil', 'Plug&Play'] },
  { id: 'aces-14', nome: 'Adaptador Bluetooth USB', descricao: 'Dongle 5.0', preco: 29.00, categoria: 'acessorios', imagens: ['🔌', '🔌', '🔌'], detalhes: 'Adaptador Bluetooth compacto', especificacoes: ['Bluetooth 5.0', 'USB', '20m alcance', 'Mini'] },
  { id: 'aces-15', nome: 'Carregador Veicular 2 USB', descricao: '36W fast charge', preco: 39.00, categoria: 'acessorios', imagens: ['🔌', '🔌', '🔌'], detalhes: 'Carregador carro dual USB', especificacoes: ['36W', '2 USB', 'QC 3.0', 'LED'] },
  { id: 'aces-16', nome: 'Capa para Notebook 15.6"', descricao: 'Impermeável acolchoada', preco: 69.00, categoria: 'acessorios', imagens: ['💼', '💼', '💼'], detalhes: 'Capa notebook mais vendida', especificacoes: ['15.6"', 'Impermeável', 'Acolchoada', 'Bolso'] },
  { id: 'aces-17', nome: 'Mochila para Notebook', descricao: '15.6" anti-furto USB', preco: 149.00, categoria: 'acessorios', imagens: ['🎒', '🎒', '🎒'], detalhes: 'Mochila notebook best-seller', especificacoes: ['15.6"', 'Anti-furto', 'USB', 'Impermeável'] },
  { id: 'aces-18', nome: 'Cooler para Notebook', descricao: '6 ventoinhas RGB', preco: 89.00, categoria: 'acessorios', imagens: ['💨', '💨', '💨'], detalhes: 'Cooler notebook gamer', especificacoes: ['6 coolers', 'RGB', 'USB', 'Até 17"'] },
  { id: 'aces-19', nome: 'Fone de Ouvido P2', descricao: 'Com microfone', preco: 29.00, categoria: 'acessorios', imagens: ['🎧', '🎧', '🎧'], detalhes: 'Fone P2 básico', especificacoes: ['P2', 'Mic', 'In-ear', '1.2m'] },
  { id: 'aces-20', nome: 'Splitter de Áudio', descricao: 'P2 Y duplo', preco: 19.00, categoria: 'acessorios', imagens: ['🔌', '🔌', '🔌'], detalhes: 'Splitter P2 para 2 fones', especificacoes: ['P2 Y', '2 saídas', 'Compacto', 'Dourado'] },
  { id: 'aces-21', nome: 'Mousepad Gamer XXL', descricao: '90x40cm RGB', preco: 79.00, categoria: 'acessorios', imagens: ['🖱️', '🖱️', '🖱️'], detalhes: 'Mousepad XXL RGB', especificacoes: ['90x40cm', 'RGB USB', 'Base borracha', 'Costurado'] },
  { id: 'aces-22', nome: 'Suporte de Mesa Ajustável', descricao: 'Para celular/tablet', preco: 49.00, categoria: 'acessorios', imagens: ['📱', '📱', '📱'], detalhes: 'Suporte mesa ajustável', especificacoes: ['Ajustável', 'Alumínio', '360°', 'Até 12.9"'] },
  { id: 'aces-23', nome: 'Tripé para Celular', descricao: 'Com controle Bluetooth', preco: 59.00, categoria: 'acessorios', imagens: ['📱', '📱', '📱'], detalhes: 'Tripé com remote', especificacoes: ['Tripé flexível', 'Bluetooth', '360°', 'Controle'] },
  { id: 'aces-24', nome: 'Lente Olho de Peixe', descricao: 'Clip 3 em 1', preco: 39.00, categoria: 'acessorios', imagens: ['📷', '📷', '📷'], detalhes: 'Lente celular 3 em 1', especificacoes: ['Olho peixe', 'Macro', 'Wide', 'Clip universal'] },
  { id: 'aces-25', nome: 'Gimbal Estabilizador', descricao: 'Para smartphone', preco: 399.00, categoria: 'acessorios', imagens: ['📱', '📱', '📱'], detalhes: 'Gimbal 3 eixos', especificacoes: ['3 eixos', '12h bateria', 'Bluetooth', 'Dobrável'] },
  { id: 'aces-26', nome: 'Lanterna Tática LED', descricao: 'Recarregável USB', preco: 49.00, categoria: 'acessorios', imagens: ['🔦', '🔦', '🔦'], detalhes: 'Lanterna LED potente', especificacoes: ['LED CREE', '1200 lumens', 'USB-C', 'Zoom'] },
  { id: 'aces-27', nome: 'Fita LED RGB 5m', descricao: 'Com controle remoto', preco: 59.00, categoria: 'acessorios', imagens: ['💡', '💡', '💡'], detalhes: 'Fita LED RGB 5m', especificacoes: ['5m', 'RGB', 'Controle', 'Adesiva'] },
  { id: 'aces-28', nome: 'Smart Lamp RGB', descricao: 'WiFi Alexa Google', preco: 79.00, categoria: 'acessorios', imagens: ['💡', '💡', '💡'], detalhes: 'Lâmpada inteligente RGB', especificacoes: ['RGB', 'WiFi', 'Alexa', '9W'] },
  { id: 'aces-29', nome: 'Tomada Inteligente WiFi', descricao: 'Alexa Google Home', preco: 69.00, categoria: 'acessorios', imagens: ['🔌', '🔌', '🔌'], detalhes: 'Smart plug WiFi', especificacoes: ['WiFi', 'Alexa', 'Timer', '10A'] },
  { id: 'aces-30', nome: 'Leitor Biométrico USB', descricao: 'Fingerprint', preco: 49.00, categoria: 'acessorios', imagens: ['🔐', '🔐', '🔐'], detalhes: 'Leitor digital USB', especificacoes: ['USB', 'Windows Hello', 'Seguro', 'Rápido'] },
  { id: 'aces-31', nome: 'Switch HDMI 4K', descricao: '3 entradas 1 saída', preco: 69.00, categoria: 'acessorios', imagens: ['🔌', '🔌', '🔌'], detalhes: 'Switch HDMI 3x1', especificacoes: ['3x1', '4K 60Hz', 'HDR', 'Controle'] },
  { id: 'aces-32', nome: 'Cabo DisplayPort 1.4', descricao: '2m 8K 60Hz', preco: 49.00, categoria: 'acessorios', imagens: ['🔌', '🔌', '🔌'], detalhes: 'DisplayPort premium', especificacoes: ['2m', '8K 60Hz', 'DP 1.4', 'HDR'] },
  { id: 'aces-33', nome: 'Adaptador Mini DisplayPort', descricao: 'Para HDMI 4K', preco: 39.00, categoria: 'acessorios', imagens: ['🔌', '🔌', '🔌'], detalhes: 'Adaptador Mini DP HDMI', especificacoes: ['Mini DP', 'HDMI', '4K 60Hz', 'Plug&Play'] },
  { id: 'aces-34', nome: 'Extensor HDMI 30m', descricao: 'Via cabo de rede', preco: 149.00, categoria: 'acessorios', imagens: ['🔌', '🔌', '🔌'], detalhes: 'Extender HDMI via RJ45', especificacoes: ['30m', 'Full HD', 'Cat5e/6', '2 peças'] },
  { id: 'aces-35', nome: 'Conversor VGA para HDMI', descricao: 'Com áudio', preco: 49.00, categoria: 'acessorios', imagens: ['🔌', '🔌', '🔌'], detalhes: 'Conversor VGA HDMI', especificacoes: ['VGA-HDMI', 'Áudio', 'USB power', '1080p'] },
  { id: 'aces-36', nome: 'Cabos Organizadores', descricao: 'Kit 20 peças', preco: 29.00, categoria: 'acessorios', imagens: ['🔌', '🔌', '🔌'], detalhes: 'Kit organizador cabos', especificacoes: ['20 peças', 'Velcro', 'Reutilizável', 'Colorido'] },
  { id: 'aces-37', nome: 'Canaleta para Cabos', descricao: 'Adesiva 1m', preco: 19.00, categoria: 'acessorios', imagens: ['🔌', '🔌', '🔌'], detalhes: 'Canaleta organiza cabos', especificacoes: ['1m', 'Adesiva', 'Branca', 'Cortável'] },
  { id: 'aces-38', nome: 'Abraçadeira de Nylon', descricao: 'Pack 100 unidades', preco: 15.00, categoria: 'acessorios', imagens: ['🔌', '🔌', '🔌'], detalhes: 'Abraçadeiras de nylon', especificacoes: ['100 un', '20cm', 'Nylon', 'Branca/Preta'] },
  { id: 'aces-39', nome: 'Spray Ar Comprimido', descricao: 'Limpeza eletrônicos', preco: 29.00, categoria: 'acessorios', imagens: ['💨', '💨', '💨'], detalhes: 'Ar comprimido limpeza', especificacoes: ['400ml', 'Inflamável não', 'Gatilho', 'Eletrônicos'] },
  { id: 'aces-40', nome: 'Kit Limpeza Eletrônicos', descricao: 'Pano + spray + pincel', preco: 39.00, categoria: 'acessorios', imagens: ['🧹', '🧹', '🧹'], detalhes: 'Kit completo limpeza', especificacoes: ['Pano microfibra', 'Spray 100ml', 'Pincel', 'Kit 10 peças'] },

  // Games & Consoles - 40 produtos
  { id: 'game-1', nome: 'PlayStation 5', descricao: 'Slim 1TB + 1 controle', preco: 3999.00, categoria: 'games', imagens: ['🎮', '🎮', '🎮'], detalhes: 'Console mais vendido do mundo', especificacoes: ['1TB SSD', '4K/120fps', 'Ray tracing', 'DualSense'] },
  { id: 'game-2', nome: 'Xbox Series X', descricao: '1TB SSD preto', preco: 3799.00, categoria: 'games', imagens: ['🎮', '🎮', '🎮'], detalhes: 'Console Xbox mais poderoso', especificacoes: ['1TB SSD', '4K/120fps', '12 TF', 'Game Pass'] },
  { id: 'game-3', nome: 'Nintendo Switch OLED', descricao: 'Branco com dock', preco: 2499.00, categoria: 'games', imagens: ['🎮', '🎮', '🎮'], detalhes: 'Switch com tela OLED', especificacoes: ['OLED 7"', 'Portátil', '64GB', 'Dock branco'] },
  { id: 'game-4', nome: 'Xbox Series S', descricao: '512GB digital', preco: 2299.00, categoria: 'games', imagens: ['🎮', '🎮', '🎮'], detalhes: 'Console Xbox acessível', especificacoes: ['512GB', '1440p/120fps', 'Digital', 'Compacto'] },
  { id: 'game-5', nome: 'Nintendo Switch Lite', descricao: 'Turquesa portátil', preco: 1699.00, categoria: 'games', imagens: ['🎮', '🎮', '🎮'], detalhes: 'Switch portátil mais vendido', especificacoes: ['Portátil', '32GB', '5.5"', 'Leve'] },
  { id: 'game-6', nome: 'Controle DualSense', descricao: 'PS5 branco', preco: 499.00, categoria: 'games', imagens: ['🎮', '🎮', '🎮'], detalhes: 'Controle DualSense oficial', especificacoes: ['Haptic', 'Gatilhos adaptativos', 'Mic', 'USB-C'] },
  { id: 'game-7', nome: 'Controle Xbox Wireless', descricao: 'Carbon Black', preco: 449.00, categoria: 'games', imagens: ['🎮', '🎮', '🎮'], detalhes: 'Controle Xbox oficial', especificacoes: ['Sem fio', 'Bluetooth', '40h', 'USB-C'] },
  { id: 'game-8', nome: 'Joy-Con Par', descricao: 'Neon vermelho e azul', preco: 599.00, categoria: 'games', imagens: ['🎮', '🎮', '🎮'], detalhes: 'Joy-Con Nintendo oficial', especificacoes: ['Par', 'HD Rumble', 'Motion', 'NFC'] },
  { id: 'game-9', nome: 'Pro Controller Switch', descricao: 'Preto oficial', preco: 399.00, categoria: 'games', imagens: ['🎮', '🎮', '🎮'], detalhes: 'Pro Controller Nintendo', especificacoes: ['Sem fio', 'USB-C', '40h bateria', 'NFC'] },
  { id: 'game-10', nome: 'Volante Logitech G29', descricao: 'Para PS5/PS4/PC', preco: 2199.00, categoria: 'games', imagens: ['🎮', '🎮', '🎮'], detalhes: 'Volante racing mais vendido', especificacoes: ['Force feedback', 'Pedais', 'Couro', 'PS5/PC'] },
  { id: 'game-11', nome: 'HOTAS Thrustmaster', descricao: 'Joystick simulador', preco: 1599.00, categoria: 'games', imagens: ['🎮', '🎮', '🎮'], detalhes: 'HOTAS para simuladores', especificacoes: ['Joystick', 'Throttle', 'PC', '12 botões'] },
  { id: 'game-12', nome: 'Headset Razer Kraken', descricao: '7.1 surround RGB', preco: 599.00, categoria: 'games', imagens: ['🎧', '🎧', '🎧'], detalhes: 'Headset gamer mais vendido', especificacoes: ['7.1 Virtual', 'RGB', 'Mic retrátil', 'Multi-platform'] },
  { id: 'game-13', nome: 'Headset HyperX Cloud II', descricao: '7.1 USB vermelho', preco: 499.00, categoria: 'games', imagens: ['🎧', '🎧', '🎧'], detalhes: 'HyperX best-seller', especificacoes: ['7.1 USB', 'Drivers 53mm', 'Mic destacável', 'Almofadas'] },
  { id: 'game-14', nome: 'Headset Logitech G733', descricao: 'Wireless RGB branco', preco: 899.00, categoria: 'games', imagens: ['🎧', '🎧', '🎧'], detalhes: 'Headset wireless premium', especificacoes: ['Lightspeed', 'RGB', '29h', '278g'] },
  { id: 'game-15', nome: 'Teclado Mecânico Razer', descricao: 'BlackWidow RGB', preco: 699.00, categoria: 'games', imagens: ['⌨️', '⌨️', '⌨️'], detalhes: 'Teclado Razer mecânico', especificacoes: ['Switch Green', 'RGB Chroma', 'Full size', 'USB'] },
  { id: 'game-16', nome: 'Teclado Logitech G213', descricao: 'RGB gaming', preco: 349.00, categoria: 'games', imagens: ['⌨️', '⌨️', '⌨️'], detalhes: 'Teclado gamer Logitech', especificacoes: ['Membrana', 'RGB', 'Resistente água', 'Palm rest'] },
  { id: 'game-17', nome: 'Mouse Logitech G502', descricao: 'Hero 25K RGB', preco: 299.00, categoria: 'games', imagens: ['🖱️', '🖱️', '🖱️'], detalhes: 'Mouse gamer mais vendido', especificacoes: ['25600 DPI', 'Hero', '11 botões', 'RGB'] },
  { id: 'game-18', nome: 'Mouse Razer DeathAdder V3', descricao: '30K DPI', preco: 449.00, categoria: 'games', imagens: ['🖱️', '🖱️', '🖱️'], detalhes: 'DeathAdder V3 premium', especificacoes: ['30000 DPI', 'Focus Pro', 'Óptico', '8 botões'] },
  { id: 'game-19', nome: 'Mousepad Gamer Razer', descricao: 'Goliathus Extended', preco: 149.00, categoria: 'games', imagens: ['🖱️', '🖱️', '🖱️'], detalhes: 'Mousepad Razer best-seller', especificacoes: ['92x29cm', 'Speed', 'Base borracha', 'Preto'] },
  { id: 'game-20', nome: 'Cadeira Gamer DT3 Sports', descricao: 'GTX Black', preco: 1299.00, categoria: 'games', imagens: ['🪑', '🪑', '🪑'], detalhes: 'Cadeira gamer mais vendida BR', especificacoes: ['Reclinável 180°', 'Apoio lombar', '4D', 'PU'] },
  { id: 'game-21', nome: 'Cadeira Gamer ThunderX3', descricao: 'BC3 preta', preco: 999.00, categoria: 'games', imagens: ['🪑', '🪑', '🪑'], detalhes: 'ThunderX3 custo-benefício', especificacoes: ['Reclinável', 'Apoio lombar', 'Braços 2D', 'Couro'] },
  { id: 'game-22', nome: 'Mesa Gamer RGB', descricao: '120cm com LED', preco: 699.00, categoria: 'games', imagens: ['🪑', '🪑', '🪑'], detalhes: 'Mesa gamer com RGB', especificacoes: ['120cm', 'RGB', 'Gancho fone', 'Porta copos'] },
  { id: 'game-23', nome: 'Monitor Gamer 24" 165Hz', descricao: 'AOC Hero', preco: 1099.00, categoria: 'games', imagens: ['🖥️', '🖥️', '🖥️'], detalhes: 'Monitor gamer AOC 165Hz', especificacoes: ['24"', 'Full HD', '165Hz', '1ms'] },
  { id: 'game-24', nome: 'Monitor Gamer 27" 144Hz', descricao: 'LG UltraGear', preco: 1499.00, categoria: 'games', imagens: ['🖥️', '🖥️', '🖥️'], detalhes: 'Monitor LG UltraGear', especificacoes: ['27"', 'Full HD', '144Hz', 'IPS'] },
  { id: 'game-25', nome: 'Webcam Logitech C922', descricao: '1080p 60fps', preco: 699.00, categoria: 'games', imagens: ['📷', '📷', '📷'], detalhes: 'Webcam para streaming', especificacoes: ['1080p', '60fps', 'Tripé', 'Mic estéreo'] },
  { id: 'game-26', nome: 'Microfone HyperX SoloCast', descricao: 'USB cardioid', preco: 399.00, categoria: 'games', imagens: ['🎤', '🎤', '🎤'], detalhes: 'Microfone USB streaming', especificacoes: ['USB', 'Cardioid', 'Tap mute', 'Suporte'] },
  { id: 'game-27', nome: 'Microfone Blue Yeti', descricao: 'USB profissional', preco: 899.00, categoria: 'games', imagens: ['🎤', '🎤', '🎤'], detalhes: 'Blue Yeti mais vendido', especificacoes: ['USB', '4 padrões', 'Mute', 'Suporte'] },
  { id: 'game-28', nome: 'Captura Elgato HD60 S', descricao: '1080p 60fps', preco: 1199.00, categoria: 'games', imagens: ['📹', '📹', '📹'], detalhes: 'Placa captura Elgato', especificacoes: ['1080p 60fps', 'USB 3.0', 'Passthrough', 'PC'] },
  { id: 'game-29', nome: 'Ring Light 30cm', descricao: 'Tripé 2m USB', preco: 149.00, categoria: 'games', imagens: ['💡', '💡', '💡'], detalhes: 'Ring light para streaming', especificacoes: ['30cm', 'Tripé 2m', '3 tons', 'Suporte celular'] },
  { id: 'game-30', nome: 'Green Screen Portátil', descricao: '150x200cm', preco: 299.00, categoria: 'games', imagens: ['🎬', '🎬', '🎬'], detalhes: 'Chroma key portátil', especificacoes: ['150x200cm', 'Verde', 'Suporte', 'Dobrável'] },
  { id: 'game-31', nome: 'God of War Ragnarök', descricao: 'PS5 mídia física', preco: 299.00, categoria: 'games', imagens: ['🎮', '🎮', '🎮'], detalhes: 'God of War mais vendido', especificacoes: ['PS5', 'Mídia física', 'Português', 'Ação'] },
  { id: 'game-32', nome: 'Hogwarts Legacy', descricao: 'PS5/Xbox', preco: 299.00, categoria: 'games', imagens: ['🎮', '🎮', '🎮'], detalhes: 'Hogwarts Legacy best-seller', especificacoes: ['Multi-platform', 'RPG', 'Mundo aberto', 'Português'] },
  { id: 'game-33', nome: 'FIFA 24', descricao: 'PS5/Xbox', preco: 299.00, categoria: 'games', imagens: ['🎮', '🎮', '🎮'], detalhes: 'FIFA 24 futebol', especificacoes: ['Multi-platform', 'Esporte', 'Online', 'Português'] },
  { id: 'game-34', nome: 'The Legend of Zelda', descricao: 'Tears of the Kingdom', preco: 349.00, categoria: 'games', imagens: ['🎮', '🎮', '🎮'], detalhes: 'Zelda mais vendido Switch', especificacoes: ['Switch', 'Aventura', 'Mundo aberto', 'Português'] },
  { id: 'game-35', nome: 'Spider-Man 2', descricao: 'PS5 exclusivo', preco: 349.00, categoria: 'games', imagens: ['🎮', '🎮', '🎮'], detalhes: 'Spider-Man 2 exclusivo PS5', especificacoes: ['PS5', 'Ação', 'Exclusivo', 'Português'] },
  { id: 'game-36', nome: 'Call of Duty MW III', descricao: 'Multi-platform', preco: 349.00, categoria: 'games', imagens: ['🎮', '🎮', '🎮'], detalhes: 'COD MW3 best-seller', especificacoes: ['Multi-platform', 'FPS', 'Online', 'Português'] },
  { id: 'game-37', nome: 'GTA V Premium', descricao: 'PS5/Xbox/PC', preco: 149.00, categoria: 'games', imagens: ['🎮', '🎮', '🎮'], detalhes: 'GTA V mais vendido', especificacoes: ['Multi-platform', 'Ação', 'Online', 'Português'] },
  { id: 'game-38', nome: 'Minecraft', descricao: 'Todas plataformas', preco: 99.00, categoria: 'games', imagens: ['🎮', '🎮', '🎮'], detalhes: 'Minecraft campeão vendas', especificacoes: ['Multi-platform', 'Sandbox', 'Online', 'Todos públicos'] },
  { id: 'game-39', nome: 'Forza Horizon 5', descricao: 'Xbox/PC', preco: 249.00, categoria: 'games', imagens: ['🎮', '🎮', '🎮'], detalhes: 'Forza corrida best-seller', especificacoes: ['Xbox/PC', 'Racing', 'Mundo aberto', 'Game Pass'] },
  { id: 'game-40', nome: 'Cartão PSN R$100', descricao: 'PlayStation Store', preco: 100.00, categoria: 'games', imagens: ['🎮', '🎮', '🎮'], detalhes: 'Recarga PSN mais vendida', especificacoes: ['R$ 100', 'Digital', 'PSN', 'Código online'] },
];

// Apply correct images to all products
const productsWithImages = allProducts.map(product => ({
  ...product,
  imagens: getProductImages(product.categoria, product.nome)
}));

export const getProductsByCategory = (category: string): Product[] => {
  return productsWithImages.filter(p => p.categoria === category).sort((a, b) => a.preco - b.preco);
};

export const getProductById = (id: string): Product | undefined => {
  return productsWithImages.find(p => p.id === id);
};
