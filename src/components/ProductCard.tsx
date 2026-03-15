import { useState } from 'react';
import { Plus, Minus, ShoppingBag, Cake, Cherry, IceCreamCone, Egg, Gift, Star as StarIcon, Cookie } from 'lucide-react';
import { Product, ProductSize } from '@/lib/products';
import { useCart } from '@/store/cart';
import { formatCurrency } from '@/lib/whatsapp';
import { motion } from 'framer-motion';

const categoryIcons: Record<string, React.ReactNode> = {
  travessa: <Cherry className="w-12 h-12 text-primary" strokeWidth={1.5} />,
  'mousse-tradicional': <IceCreamCone className="w-12 h-12 text-primary" strokeWidth={1.5} />,
  'mousse-trufado': <Cake className="w-12 h-12 text-primary" strokeWidth={1.5} />,
  brigadeiro: <Cookie className="w-12 h-12 text-primary" strokeWidth={1.5} />,
  'ovo-tradicional': <Egg className="w-12 h-12 text-primary" strokeWidth={1.5} />,
  'ovo-especial': <StarIcon className="w-12 h-12 text-primary" strokeWidth={1.5} />,
  'kit-degustacao': <Gift className="w-12 h-12 text-primary" strokeWidth={1.5} />,
};

interface ProductCardProps {
  product: Product;
  delay?: number;
}

export function ProductCard({ product, delay = 0 }: ProductCardProps) {
  const { addItem, setCartOpen } = useCart();
  const [selectedSize, setSelectedSize] = useState<ProductSize | null>(
    product.sizes ? product.sizes[0] : product.packages ? product.packages[0] : null
  );
  const [selectedFlavor, setSelectedFlavor] = useState<string>(product.flavors[0] || '');
  const [quantity, setQuantity] = useState(1);

  const price = selectedSize?.price || 0;

  const handleAdd = () => {
    addItem({
      productId: product.id,
      name: product.name,
      size: selectedSize?.label,
      flavor: selectedFlavor,
      quantity,
      price,
    });
    setCartOpen(true);
  };

  // Don't render brigadeiro here - it has its own card
  if (product.category === 'brigadeiro') return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      className="bg-card rounded-3xl p-6 shadow-candy hover:shadow-candy-hover transition-all duration-300"
    >
      <div className="w-24 h-24 rounded-2xl bg-secondary flex items-center justify-center mx-auto mb-5">
        {categoryIcons[product.category] || <Cake className="w-12 h-12 text-primary" strokeWidth={1.5} />}
      </div>

      {product.badge && (
        <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-body font-semibold mb-3">
          {product.badge}
        </span>
      )}

      <h3 className="font-display text-2xl text-foreground mb-2">{product.name}</h3>
      <p className="text-muted-foreground font-body text-sm mb-5">{product.description}</p>

      {product.weight && (
        <p className="text-muted-foreground/60 font-body text-xs mb-3">Peso: {product.weight}</p>
      )}

      {/* Size selector */}
      {product.sizes && product.sizes.length > 1 && (
        <div className="mb-4">
          <label className="font-body text-xs font-semibold text-foreground/70 mb-2 block">Tamanho</label>
          <div className="flex gap-2">
            {product.sizes.map((size) => (
              <button
                key={size.label}
                onClick={() => setSelectedSize(size)}
                className={`px-4 py-2 rounded-full font-body text-sm font-medium transition-all ${
                  selectedSize?.label === size.label
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-foreground hover:bg-accent'
                }`}
              >
                {size.label} — {formatCurrency(size.price)}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Flavor selector */}
      {product.flavors.length > 1 && (
        <div className="mb-4">
          <label className="font-body text-xs font-semibold text-foreground/70 mb-2 block">Sabor</label>
          <div className="flex flex-wrap gap-2">
            {product.flavors.map((flavor) => (
              <button
                key={flavor}
                onClick={() => setSelectedFlavor(flavor)}
                className={`px-3 py-1.5 rounded-full font-body text-sm transition-all ${
                  selectedFlavor === flavor
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-foreground hover:bg-accent'
                }`}
              >
                {flavor}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Quantity */}
      <div className="mb-5">
        <label className="font-body text-xs font-semibold text-foreground/70 mb-2 block">Quantidade</label>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center hover:bg-accent transition-colors"
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="font-body font-semibold text-lg tabular-nums w-8 text-center">{quantity}</span>
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center hover:bg-accent transition-colors"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Price & Add */}
      <div className="flex items-center justify-between pt-4 border-t border-border">
        <span className="font-display text-2xl text-primary">{formatCurrency(price * quantity)}</span>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-primary-foreground font-body font-semibold text-sm hover:opacity-90 transition-opacity"
        >
          <ShoppingBag className="w-4 h-4" strokeWidth={1.5} />
          Adicionar
        </button>
      </div>
    </motion.div>
  );
}
