import { describe, expect, it } from 'vitest';
import { getServings } from '../lib/servings';
import { christmasProducts } from '../lib/christmas-products';
import { assetUrl } from '../lib/asset-url';

describe('Rendimento das travessas', () => {
  it('P serve de 4 a 6 pessoas em todas as travessas de Natal', () => {
    expect(christmasProducts).toHaveLength(4);
    for (const product of christmasProducts) expect(getServings(product, 'P')).toEqual([4, 6]);
  });
  it('M serve de 8 a 10 pessoas em todas as travessas de Natal', () => {
    for (const product of christmasProducts) expect(getServings(product, 'M')).toEqual([8, 10]);
  });
  it('Não inventa o rendimento de outros tamanhos ou doces', () => {
    expect(getServings({ category: 'brigadeiro' }, 'P')).toBeUndefined();
    expect(getServings({ category: 'travessa' }, 'G')).toBeUndefined();
  });
});

describe('Fotos portáteis', () => {
  it('Resolve fotos na origem que as serve, inclusive em hospedagens externas', () => {
    expect(assetUrl('/__l5e/assets-v1/example/photo.jpg')).toBe('https://mary-candy.lovable.app/__l5e/assets-v1/example/photo.jpg');
    expect(assetUrl('/local.jpg')).toBe('/local.jpg');
  });
  it('Usa fotos distintas nos três sabores de mousse', () => {
    const mousse = christmasProducts.find(p => p.id === 'natal-mousse-trufado');
    expect(new Set(Object.values(mousse?.flavorImages ?? {})).size).toBe(3);
  });
});