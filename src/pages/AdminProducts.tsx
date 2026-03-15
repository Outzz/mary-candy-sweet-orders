import { useState } from 'react';
import { products, seasonalProducts } from '@/lib/products';
import { formatCurrency } from '@/lib/whatsapp';
import { Eye, EyeOff } from 'lucide-react';

export default function AdminProducts() {
  const [visibility, setVisibility] = useState<Record<string, boolean>>(() => {
    const v: Record<string, boolean> = {};
    [...products, ...seasonalProducts].forEach((p) => (v[p.id] = true));
    return v;
  });

  const toggleVisibility = (id: string) => {
    setVisibility((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const allProducts = [...products, ...seasonalProducts];

  return (
    <div>
      <h1 className="font-display text-3xl text-foreground mb-8">Produtos</h1>

      <div className="grid gap-4">
        {allProducts.map((product) => (
          <div key={product.id} className="bg-card rounded-3xl p-5 shadow-candy flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-body font-semibold text-foreground">{product.name}</h3>
                {product.seasonal && (
                  <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-body font-semibold">
                    Sazonal
                  </span>
                )}
                {product.badge && (
                  <span className="px-2 py-0.5 rounded-full bg-secondary text-muted-foreground text-xs font-body">
                    {product.badge}
                  </span>
                )}
              </div>
              <p className="text-muted-foreground font-body text-sm">
                {product.sizes
                  ? product.sizes.map((s) => `${s.label}: ${formatCurrency(s.price)}`).join(' | ')
                  : product.packages
                  ? product.packages.map((p) => `${p.label}: ${formatCurrency(p.price)}`).join(' | ')
                  : ''}
              </p>
              <p className="text-muted-foreground/60 font-body text-xs mt-1">
                Sabores: {product.flavors.join(', ')}
              </p>
            </div>

            <button
              onClick={() => toggleVisibility(product.id)}
              className={`p-2.5 rounded-full transition-colors ${
                visibility[product.id] ? 'bg-secondary text-primary' : 'bg-muted text-muted-foreground'
              }`}
            >
              {visibility[product.id] ? (
                <Eye className="w-4 h-4" strokeWidth={1.5} />
              ) : (
                <EyeOff className="w-4 h-4" strokeWidth={1.5} />
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
