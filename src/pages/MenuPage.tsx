import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { MobileCartButton } from '@/components/MobileCartButton';
import { CartSidebar } from '@/components/CartSidebar';
import { ProductCard } from '@/components/ProductCard';
import { BrigadeiroCard } from '@/components/BrigadeiroCard';
import { products, seasonalProducts } from '@/lib/products';
import { isSeasonal } from '@/lib/seasonal';
import { motion } from 'framer-motion';

const MenuPage = () => {
  const showSeasonal = isSeasonal();
  const brigadeiro = products.find((p) => p.category === 'brigadeiro')!;
  const regularProducts = products.filter((p) => p.category !== 'brigadeiro');

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-10 md:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-14"
        >
          <h1 className="text-4xl md:text-5xl font-display tracking-tight text-foreground">
            Nosso <span className="text-primary italic">Cardápio</span>
          </h1>
          <p className="mt-3 text-muted-foreground font-body text-lg">
            Escolha seus sabores preferidos e monte seu pedido
          </p>
        </motion.div>

        {/* Regular products */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {regularProducts.map((product, i) => (
            <ProductCard key={product.id} product={product} delay={i * 0.1} />
          ))}
        </div>

        {/* Brigadeiros - special card */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <BrigadeiroCard product={brigadeiro} delay={0.2} />
        </div>

        {/* Seasonal products */}
        {showSeasonal && (
          <>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center my-14"
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-body font-semibold mb-4">
                🐣 Edição Limitada de Páscoa
              </span>
              <h2 className="text-3xl md:text-4xl font-display tracking-tight text-foreground">
                Produtos <span className="text-primary italic">Sazonais</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {seasonalProducts.map((product, i) => (
                <ProductCard key={product.id} product={product} delay={i * 0.1} />
              ))}
            </div>
          </>
        )}
      </main>
      <Footer />
      <WhatsAppButton />
      <MobileCartButton />
      <CartSidebar />
    </div>
  );
};

export default MenuPage;
