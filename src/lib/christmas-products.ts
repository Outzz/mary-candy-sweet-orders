import type { Product } from './products';
import { assetUrl } from './asset-url';
import uva from '@/assets/natal-uva.jpg.asset.json';
import morango from '@/assets/natal-morango.jpg.asset.json';
import cravejado from '@/assets/natal-cravejado.jpg.asset.json';
import limao from '@/assets/natal-mousse-limao.jpg.asset.json';
import maracuja from '@/assets/mousse-maracuja-travessa.jpeg.asset.json';
import sensacao from '@/assets/mousse-sensacao-travessa.jpeg.asset.json';

export const christmasProducts: Product[] = [
  { id: 'natal-travessa-morango', name: 'Travessa surpresa de morango', category: 'travessa',
    sizes: [{ label: 'P', price: 49 }, { label: 'M', price: 99 }], flavors: [], image: assetUrl(morango.url), badge: 'Natal',
    description: 'Camadas de morangos fatiados, camadas de brigadeiro de ninho cremoso e por cima uma deliciosa ganache de chocolate.' },
  { id: 'natal-travessa-uva', name: 'Travessa surpresa de uva', category: 'travessa',
    sizes: [{ label: 'P', price: 49 }, { label: 'M', price: 99 }], flavors: [], image: assetUrl(uva.url), badge: 'Natal',
    description: 'Camadas de uvas verdes, camadas de brigadeiro de ninho cremoso e por cima deliciosa ganache de chocolate ao leite.' },
  { id: 'natal-morango-cravejado', name: 'Travessa de morango cravejado', category: 'travessa',
    sizes: [{ label: 'P', price: 55 }, { label: 'M', price: 110 }], flavors: [], image: assetUrl(cravejado.url), badge: 'Natal',
    description: 'Camadas de morangos fatiados, brigadeiro cremoso de ninho e por cima a famosa casquinha cravejada, feita com chocolate branco e pedaços de caramelo.' },
  { id: 'natal-mousse-trufado', name: 'Mousses de fruta, trufados', category: 'mousse-trufado',
    sizes: [{ label: 'P', price: 40 }, { label: 'M', price: 80 }], flavors: ['Limão', 'Maracujá', 'Sensação'], image: assetUrl(limao.url), badge: 'Natal',
    flavorImages: { 'Limão': assetUrl(limao.url), 'Maracujá': assetUrl(maracuja.url), 'Sensação': assetUrl(sensacao.url) },
    description: 'Mousses cremosos feitos da fruta, com deliciosa ganache de chocolate ao leite, finalizados com uma decoração que encanta.' },
];