export interface ProductSize {
  label: string;
  price: number;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  category: 'travessa' | 'mousse-tradicional' | 'mousse-trufado' | 'brigadeiro' | 'ovo-tradicional' | 'ovo-especial' | 'kit-degustacao';
  sizes?: ProductSize[];
  flavors: string[];
  packages?: ProductSize[];
  weight?: string;
  seasonal?: boolean;
  badge?: string;
  image?: string;
  flavorImages?: Record<string, string>;
  maxFlavors?: Record<string, number>;
}

import travessaUvaImg from '@/assets/travessa-uva.png';
import mousseMorangoImg from '@/assets/mousse-morango.png';
import brigadeirosImg from '@/assets/brigadeiros.jpeg';
import ovoColherImg from '@/assets/ovo-colher.jpeg';
import ovoColherOreoImg from '@/assets/ovo-colher-oreo.png';

export const products: Product[] = [
  {
    id: 'travessa-frutas',
    name: 'Travessa de Frutas',
    description: 'Travessa artesanal com frutas frescas selecionadas, perfeita para eventos e celebrações.',
    category: 'travessa',
    sizes: [
      { label: 'P', price: 49.90 },
      { label: 'G', price: 90.00 },
    ],
    flavors: ['Morango', 'Uva'],
    badge: 'Mais pedido',
    image: travessaUvaImg,
  },
  {
    id: 'mousse-tradicional',
    name: 'Mousses Tradicionais',
    description: 'Mousses cremosos e delicados, feitos com ingredientes frescos e muito carinho.',
    category: 'mousse-tradicional',
    sizes: [
      { label: 'P', price: 35.00 },
      { label: 'G', price: 45.00 },
    ],
    flavors: ['Limão', 'Maracujá', 'Morango'],
    image: mousseMorangoImg,
  },
  {
    id: 'mousse-trufado',
    name: 'Mousses Trufados',
    description: 'Mousses premium com camada trufada, uma experiência irresistível.',
    category: 'mousse-trufado',
    sizes: [
      { label: 'P', price: 58.00 },
      { label: 'G', price: 68.00 },
    ],
    flavors: ['Limão', 'Maracujá', 'Morango'],
    badge: 'Premium',
  },
  {
    id: 'brigadeiros',
    name: 'Brigadeiros Gourmet',
    description: 'Brigadeiros artesanais de 15g cada, feitos com ingredientes selecionados. Monte sua caixa!',
    category: 'brigadeiro',
    packages: [
      { label: '25 unidades', price: 39.00 },
      { label: '50 unidades', price: 79.00 },
      { label: '100 unidades', price: 120.00 },
      { label: '150 unidades', price: 190.00 },
    ],
    flavors: ['Tradicional', 'Beijinho', 'Morango', 'Prestígio', 'Chocoball', 'Confete', 'Ninho', 'Churros', 'Oreo', 'Casadinho'],
    weight: '15g cada',
    badge: 'Mais pedido',
    image: brigadeirosImg,
    maxFlavors: {
      '25 unidades': 2,
      '50 unidades': 2,
      '100 unidades': 4,
      '150 unidades': 4,
    },
  },
];

export const seasonalProducts: Product[] = [
  {
    id: 'ovo-tradicional',
    name: 'Ovo de Colher Tradicional',
    description: 'Ovo de Páscoa artesanal recheado com sabores irresistíveis. Edição limitada!',
    category: 'ovo-tradicional',
    sizes: [
      { label: '250g', price: 35.00 },
    ],
    flavors: ['Brigadeiro', 'Ninho', 'Dois Amores', 'Beijinho', 'Moranguinho', 'Mousse de Limão', 'Mousse de Maracujá'],
    seasonal: true,
    badge: 'Sazonal',
    image: ovoColherImg,
    flavorImages: {
      'Mousse de Limão': ovoColherLimaoImg,
    },
  },
  {
    id: 'ovo-especial',
    name: 'Ovo de Colher Especial',
    description: 'Ovos especiais com recheios premium. 250g de pura felicidade!',
    category: 'ovo-especial',
    sizes: [
      { label: '250g', price: 45.00 },
    ],
    flavors: ['Ninho com Nutella', 'Ferrero Rocher', 'Óreo'],
    image: ovoColherOreoImg,
    weight: '250g',
    seasonal: true,
    badge: 'Especial',
  },
  {
    id: 'kit-degustacao',
    name: 'Kit Degustação (Mini Ovos)',
    description: '4 mini ovos de 50g para você experimentar diferentes sabores. Presente perfeito!',
    category: 'kit-degustacao',
    sizes: [{ label: '4 mini ovos 50g', price: 24.00 }],
    flavors: ['Sortidos'],
    seasonal: true,
    badge: 'Oferta',
  },
];

export function getPackageQuantity(label: string): number {
  const match = label.match(/(\d+)/);
  return match ? parseInt(match[1]) : 0;
}
