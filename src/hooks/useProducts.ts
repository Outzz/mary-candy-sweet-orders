import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { Product, ProductSize } from '@/lib/products';

interface DbProduct {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  category: string;
  sizes: any;
  packages: any;
  flavors: any;
  badge: string | null;
  seasonal: boolean | null;
  weight: string | null;
  image_url: string | null;
  flavor_images: any;
  max_flavors: any;
  visible: boolean | null;
  sort_order: number | null;
}

function toProduct(db: DbProduct): Product {
  return {
    id: db.slug,
    name: db.name,
    description: db.description || '',
    category: db.category as Product['category'],
    sizes: (db.sizes && Array.isArray(db.sizes) && db.sizes.length > 0) ? db.sizes as ProductSize[] : undefined,
    packages: (db.packages && Array.isArray(db.packages) && db.packages.length > 0) ? db.packages as ProductSize[] : undefined,
    flavors: (db.flavors as string[]) || [],
    badge: db.badge || undefined,
    seasonal: db.seasonal || undefined,
    weight: db.weight || undefined,
    image: db.image_url || undefined,
    flavorImages: (db.flavor_images && typeof db.flavor_images === 'object' && Object.keys(db.flavor_images).length > 0)
      ? db.flavor_images as Record<string, string>
      : undefined,
    maxFlavors: (db.max_flavors && typeof db.max_flavors === 'object' && Object.keys(db.max_flavors).length > 0)
      ? db.max_flavors as Record<string, number>
      : undefined,
  };
}

export function useProducts() {
  return useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('visible', true)
        .order('sort_order', { ascending: true });

      if (error) throw error;
      return (data as DbProduct[]).map(toProduct);
    },
  });
}

export function useRegularProducts() {
  const { data, ...rest } = useProducts();
  return {
    data: data?.filter((p) => !p.seasonal),
    ...rest,
  };
}

export function useSeasonalProducts() {
  const { data, ...rest } = useProducts();
  return {
    data: data?.filter((p) => p.seasonal),
    ...rest,
  };
}
