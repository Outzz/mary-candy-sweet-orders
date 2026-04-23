import { motion } from 'framer-motion';
import { isSeasonal } from '@/lib/seasonal';
import { useSeasonalProducts } from '@/hooks/useProducts';
import { formatCurrency } from '@/lib/whatsapp';
import { Link } from 'react-router-dom';
import { Egg, Gift, Star, Heart } from 'lucide-react';

const seasonalIcons: Record<string, React.ReactNode> = {
  'ovo-tradicional': <Egg className="w-10 h-10 text-primary" strokeWidth={1.5} />,
  'ovo-especial': <Star className="w-10 h-10 text-primary" strokeWidth={1.5} />,
  'kit-degustacao': <Gift className="w-10 h-10 text-primary" strokeWidth={1.5} />,
  'maes-caixinha': <Heart className="w-10 h-10 text-primary" strokeWidth={1.5} />,
  'maes-coracao': <Heart className="w-10 h-10 text-primary" strokeWidth={1.5} />,
  'maes-mini': <Heart className="w-10 h-10 text-primary" strokeWidth={1.5} />,
};

export function SeasonalSection() {
  const { data: seasonalProducts = [] } = useSeasonalProducts();

  if (!isSeasonal() || seasonalProducts.length === 0) return null;

  return (
    <section className="py-20 bg-secondary">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-body font-semibold mb-4">
            Edição Limitada
          </span>
          <h2 className="text-3xl md:text-4xl font-display tracking-tight text-foreground">
            Produtos da <span className="text-primary italic">Temporada</span>
          </h2>
          <p className="mt-3 text-muted-foreground font-body text-lg">
            Disponíveis por tempo limitado
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {seasonalProducts.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-card rounded-3xl p-6 shadow-candy hover:shadow-candy-hover hover:scale-[1.02] transition-all duration-300"
            >
              {product.image ? (
                <div className="w-20 h-20 rounded-2xl overflow-hidden mx-auto mb-5">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                </div>
              ) : (
                <div className="w-20 h-20 rounded-2xl bg-secondary flex items-center justify-center mx-auto mb-5">
                  {seasonalIcons[product.category] || <Egg className="w-10 h-10 text-primary" strokeWidth={1.5} />}
                </div>
              )}

              <span className="inline-block px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-body font-semibold mb-3">
                {product.badge}
              </span>

              <h3 className="font-display text-xl text-foreground mb-2">{product.name}</h3>
              <p className="text-muted-foreground text-sm font-body mb-4">{product.description}</p>

              <div className="font-body font-semibold text-primary text-lg">
                {product.sizes
                  ? `A partir de ${formatCurrency(product.sizes[0].price)}`
                  : ''}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/cardapio"
            className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-primary text-primary-foreground font-body font-semibold hover:opacity-90 transition-opacity"
          >
            Ver Produtos Sazonais
          </Link>
        </div>
      </div>
    </section>
  );
}
