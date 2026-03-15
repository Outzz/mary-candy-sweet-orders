import { motion } from 'framer-motion';
import { products } from '@/lib/products';
import { formatCurrency } from '@/lib/whatsapp';
import { Link } from 'react-router-dom';
import { Cake, Cherry, Cookie, IceCreamCone } from 'lucide-react';

const categoryIcons: Record<string, React.ReactNode> = {
  travessa: <Cherry className="w-10 h-10 text-primary" strokeWidth={1.5} />,
  'mousse-tradicional': <IceCreamCone className="w-10 h-10 text-primary" strokeWidth={1.5} />,
  'mousse-trufado': <Cake className="w-10 h-10 text-primary" strokeWidth={1.5} />,
  brigadeiro: <Cookie className="w-10 h-10 text-primary" strokeWidth={1.5} />,
};

export function FeaturedProducts() {
  const featured = products.slice(0, 4);

  return (
    <section className="py-20 bg-background">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-display tracking-tight text-foreground">
            Nossos <span className="text-primary italic">Destaques</span>
          </h2>
          <p className="mt-3 text-muted-foreground font-body text-lg">
            Os favoritos dos nossos clientes
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group bg-card rounded-3xl p-6 shadow-candy hover:shadow-candy-hover hover:scale-[1.02] transition-all duration-300 cursor-pointer"
            >
              <div className="w-20 h-20 rounded-2xl bg-secondary flex items-center justify-center mx-auto mb-5">
                {categoryIcons[product.category] || <Cake className="w-10 h-10 text-primary" strokeWidth={1.5} />}
              </div>

              {product.badge && (
                <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-body font-semibold mb-3">
                  {product.badge}
                </span>
              )}

              <h3 className="font-display text-xl text-foreground mb-2">{product.name}</h3>
              <p className="text-muted-foreground text-sm font-body mb-4 line-clamp-2">{product.description}</p>

              <div className="font-body font-semibold text-primary text-lg">
                {product.sizes
                  ? `A partir de ${formatCurrency(product.sizes[0].price)}`
                  : product.packages
                  ? `A partir de ${formatCurrency(product.packages[0].price)}`
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
            Ver Cardápio Completo
          </Link>
        </div>
      </div>
    </section>
  );
}
