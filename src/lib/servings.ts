import type { Product } from './products';

export function getServings(product: Pick<Product, 'category'>, size: string | undefined): readonly [number, number] | undefined {
  if (!['travessa', 'mousse-tradicional', 'mousse-trufado'].includes(product.category)) return undefined;
  if (size === 'P') return [4, 6];
  if (size === 'M') return [8, 10];
  return undefined;
}