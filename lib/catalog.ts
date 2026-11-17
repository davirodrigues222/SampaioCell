/**
 * Catálogo de EXEMPLO (Fase 1).
 * Nomes e preços são ilustrativos — serão substituídos pela lista real da loja
 * e, na Fase 3, passam a ser gerenciados pelo painel administrativo (Supabase).
 */

export type CategoryIcon =
  | "case"
  | "screen"
  | "charger"
  | "headphones"
  | "speaker"
  | "watch"
  | "games"
  | "home"
  | "cap"
  | "phone";

export type Category = {
  slug: string;
  name: string;
  description: string;
  icon: CategoryIcon;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  category: string; // slug da categoria
  price: number;
  /** Preço antigo, quando houver promoção */
  compareAtPrice?: number;
  description: string;
  stock: number;
  featured?: boolean;
  /** Caminho da foto em /public. Sem foto, mostramos uma arte com o ícone da categoria. */
  image?: string;
};

export const categories: Category[] = [
  { slug: "capinhas", name: "Capinhas", description: "Proteção com estilo para o seu aparelho", icon: "case" },
  { slug: "peliculas", name: "Películas", description: "Vidro 3D, privacidade e cerâmica", icon: "screen" },
  { slug: "carregadores-e-cabos", name: "Carregadores e Cabos", description: "Turbo, USB-C, Lightning e veicular", icon: "charger" },
  { slug: "fones", name: "Fones de Ouvido", description: "Bluetooth, com fio e esportivos", icon: "headphones" },
  { slug: "caixas-de-som", name: "Caixas de Som", description: "Portáteis e bluetooth", icon: "speaker" },
  { slug: "smartwatches", name: "Smartwatches", description: "Relógios inteligentes e pulseiras", icon: "watch" },
  { slug: "games", name: "Games", description: "Videogames retrô e controles", icon: "games" },
  { slug: "casa-e-variedades", name: "Casa e Variedades", description: "Controles de TV, rádios, garrafas e mais", icon: "home" },
  { slug: "bones", name: "Bonés", description: "Modelos aba curva e ajustáveis", icon: "cap" },
  { slug: "celulares", name: "Celulares", description: "Aparelhos disponíveis na loja", icon: "phone" },
];

export const products: Product[] = [
  // Capinhas
  { id: "p01", slug: "capinha-iphone-16-fashion-case", name: "Capinha iPhone 16 Fashion Case", category: "capinhas", price: 39.9, description: "Capinha transparente com borda metalizada e proteção de câmera. Disponível em preto, rosa e vinho.", stock: 12, featured: true },
  { id: "p02", slug: "capinha-anti-impacto-samsung-a15", name: "Capinha Anti-impacto Galaxy A15", category: "capinhas", price: 29.9, description: "Cantos reforçados contra quedas, material flexível e toque macio.", stock: 20 },
  { id: "p03", slug: "capinha-silicone-aveludada-redmi-note-13", name: "Capinha Silicone Aveludada Redmi Note 13", category: "capinhas", price: 34.9, description: "Interior aveludado que protege contra arranhões. Várias cores.", stock: 15 },
  { id: "p04", slug: "capinha-carteira-motorola-g54", name: "Capinha Carteira Moto G54", category: "capinhas", price: 44.9, compareAtPrice: 54.9, description: "Estilo carteira com espaço para cartões e fechamento magnético.", stock: 6 },

  // Películas
  { id: "p05", slug: "pelicula-3d-iphone-15", name: "Película de Vidro 3D iPhone 15", category: "peliculas", price: 24.9, description: "Cobertura total da tela, bordas pretas e alta transparência.", stock: 30, featured: true },
  { id: "p06", slug: "pelicula-privacidade-iphone-13", name: "Película Privacidade iPhone 13", category: "peliculas", price: 39.9, description: "Impede que pessoas ao lado vejam sua tela.", stock: 14 },
  { id: "p07", slug: "pelicula-ceramica-galaxy-a54", name: "Película Cerâmica Galaxy A54", category: "peliculas", price: 19.9, description: "Flexível e resistente, não estilhaça.", stock: 25 },

  // Carregadores e cabos
  { id: "p08", slug: "carregador-turbo-20w-usb-c", name: "Carregador Turbo 20W USB-C", category: "carregadores-e-cabos", price: 59.9, description: "Carregamento rápido compatível com iPhone e Android.", stock: 18, featured: true },
  { id: "p09", slug: "cabo-usb-c-lightning-1m", name: "Cabo USB-C para Lightning 1m", category: "carregadores-e-cabos", price: 29.9, description: "Cabo reforçado para carregamento rápido de iPhone.", stock: 40 },
  { id: "p10", slug: "cabo-usb-c-usb-c-2m", name: "Cabo USB-C / USB-C 2m", category: "carregadores-e-cabos", price: 34.9, description: "Dois metros de comprimento, ideal para usar na cama ou no sofá.", stock: 22 },
  { id: "p11", slug: "carregador-veicular-duplo", name: "Carregador Veicular Duplo", category: "carregadores-e-cabos", price: 39.9, description: "Duas saídas USB para carregar dois aparelhos no carro.", stock: 10 },

  // Fones
  { id: "p12", slug: "fone-bluetooth-tws", name: "Fone Bluetooth TWS", category: "fones", price: 79.9, compareAtPrice: 99.9, description: "Sem fio, com estojo carregador e controle por toque.", stock: 9, featured: true },
  { id: "p13", slug: "fone-com-fio-p2", name: "Fone com Fio P2", category: "fones", price: 19.9, description: "Som limpo e microfone para chamadas.", stock: 35 },
  { id: "p14", slug: "headset-bluetooth-dobravel", name: "Headset Bluetooth Dobrável", category: "fones", price: 89.9, description: "Confortável, dobrável e com bateria de longa duração.", stock: 5 },

  // Caixas de som
  { id: "p15", slug: "caixa-de-som-bluetooth-portatil", name: "Caixa de Som Bluetooth Portátil", category: "caixas-de-som", price: 89.9, description: "Compacta, potente e com entrada para cartão de memória.", stock: 8, featured: true },
  { id: "p16", slug: "caixa-de-som-led-rgb", name: "Caixa de Som com LED RGB", category: "caixas-de-som", price: 129.9, description: "Luzes coloridas que acompanham a música e rádio FM.", stock: 4 },

  // Smartwatches
  { id: "p17", slug: "smartwatch-serie-9", name: "Smartwatch Série 9", category: "smartwatches", price: 189.9, description: "Notificações, monitor de batimentos e várias faces de tela.", stock: 6, featured: true },
  { id: "p18", slug: "pulseira-silicone-smartwatch", name: "Pulseira de Silicone para Smartwatch", category: "smartwatches", price: 24.9, description: "Encaixe universal 42/44/45mm, várias cores.", stock: 20 },

  // Games
  { id: "p19", slug: "videogame-retro-portatil", name: "Videogame Retrô Portátil", category: "games", price: 119.9, description: "Mais de 400 jogos clássicos na palma da mão.", stock: 7, featured: true },
  { id: "p20", slug: "controle-sem-fio-ps4", name: "Controle sem Fio para PS4", category: "games", price: 99.9, description: "Compatível com PS4 e PC, com vibração.", stock: 5 },
  { id: "p21", slug: "controle-usb-pc", name: "Controle USB para PC", category: "games", price: 49.9, description: "Plug and play, ideal para emuladores.", stock: 9 },

  // Casa e variedades
  { id: "p22", slug: "controle-remoto-universal-tv", name: "Controle Remoto Universal para TV", category: "casa-e-variedades", price: 29.9, description: "Compatível com as principais marcas de TV.", stock: 15 },
  { id: "p23", slug: "radio-portatil-am-fm", name: "Rádio Portátil AM/FM", category: "casa-e-variedades", price: 59.9, description: "Recarregável, com lanterna e entrada USB.", stock: 6 },
  { id: "p24", slug: "garrafa-termica-inox-500ml", name: "Garrafa Térmica Inox 500ml", category: "casa-e-variedades", price: 49.9, description: "Mantém a bebida gelada ou quente por horas.", stock: 10 },
  { id: "p25", slug: "raquete-eletrica-mata-muricoca", name: "Raquete Elétrica Mata-muriçoca", category: "casa-e-variedades", price: 39.9, description: "Recarregável e com lanterna de LED.", stock: 12, featured: true },

  // Bonés
  { id: "p26", slug: "bone-aba-curva-ny-rosa", name: "Boné Aba Curva NY Rosa", category: "bones", price: 59.9, description: "Ajustável, bordado frontal.", stock: 4 },
  { id: "p27", slug: "bone-aba-curva-ny-azul", name: "Boné Aba Curva NY Azul", category: "bones", price: 59.9, description: "Ajustável, bordado frontal.", stock: 3 },

  // Celulares
  { id: "p28", slug: "realme-note-60x", name: "Realme Note 60x", category: "celulares", price: 899.0, description: "Smartphone com tela grande e bateria de longa duração. Novo, lacrado.", stock: 1 },
  { id: "p29", slug: "celular-basico-dual-chip", name: "Celular Básico Dual Chip", category: "celulares", price: 129.9, description: "Simples, com rádio FM, lanterna e bateria que dura dias.", stock: 1 },
];

export function getCategory(slug: string) {
  return categories.find((c) => c.slug === slug);
}

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(slug: string) {
  return products.filter((p) => p.category === slug);
}

export function getFeaturedProducts() {
  return products.filter((p) => p.featured);
}

export function getRelatedProducts(product: Product, limit = 4) {
  return products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, limit);
}
