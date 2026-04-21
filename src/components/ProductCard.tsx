import { Cake, Cherry, IceCreamCone, Cookie, Egg, Gift, Star as StarIcon, Heart } from 'lucide-react';
import { Product } from '@/lib/products';
import { formatCurrency } from '@/lib/whatsapp';
import { motion } from 'framer-motion';

const categoryIcons: Record<string, React.ReactNode> = {
  travessa: <Cherry className="w-10 h-10 text-primary" strokeWidth={1.5} />,
  'mousse-tradicional': <IceCreamCone className="w-10 h-10 text-primary" strokeWidth={1.5} />,
  'mousse-trufado': <Cake className="w-10 h-10 text-primary" strokeWidth={1.5} />,
  brigadeiro: <Cookie className="w-10 h-10 text-primary" strokeWidth={1.5} />,
  'ovo-tradicional': <Egg className="w-10 h-10 text-primary" strokeWidth={1.5} />,
  'ovo-especial': <StarIcon className="w-10 h-10 text-primary" strokeWidth={1.5} />,
  'kit-degustacao': <Gift className="w-10 h-10 text-primary" strokeWidth={1.5} />,
  'maes-caixinha': <Heart className="w-10 h-10 text-primary" strokeWidth={1.5} />,
  'maes-coracao': <Heart className="w-10 h-10 text-primary" strokeWidth={1.5} />,
  'maes-mini': <Heart className="w-10 h-10 text-primary" strokeWidth={1.5} />,
};

interface ProductCardProps {
  product: Product;
  delay?: number;
  onClick?: () => void;
}

export function ProductCard({ product, delay = 0, onClick }: ProductCardProps) {
  const startPrice = product.sizes?.[0]?.price || product.packages?.[0]?.price || 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      onClick={onClick}
      className="group bg-card rounded-3xl p-5 shadow-candy hover:shadow-candy-hover hover:scale-[1.02] transition-all duration-300 cursor-pointer"
    >
      {product.image ? (
        <div className="w-20 h-20 rounded-2xl overflow-hidden mx-auto mb-4 group-hover:scale-105 transition-transform">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
        </div>
      ) : (
        <div className="w-20 h-20 rounded-2xl bg-secondary flex items-center justify-center mx-auto mb-4 group-hover:scale-105 transition-transform">
          {categoryIcons[product.category] || <Cake className="w-10 h-10 text-primary" strokeWidth={1.5} />}
        </div>
      )}

      {product.badge && (
        <div className="text-center mb-2">
          <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-body font-semibold">
            {product.badge}
          </span>
        </div>
      )}

      <h3 className="font-display text-xl text-foreground text-center mb-1">{product.name}</h3>
      <p className="text-muted-foreground text-xs font-body text-center mb-3 line-clamp-2">{product.description}</p>

      <div className="text-center">
        <span className="font-display text-xl text-primary">{formatCurrency(startPrice)}</span>
      </div>
    </motion.div>
  );
}
