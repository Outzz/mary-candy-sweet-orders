import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { MobileCartButton } from '@/components/MobileCartButton';
import { CartSidebar } from '@/components/CartSidebar';
import { ProductCard } from '@/components/ProductCard';
import { ProductDetailModal } from '@/components/ProductDetailModal';
import { products, seasonalProducts, Product } from '@/lib/products';
import { isSeasonal } from '@/lib/seasonal';
import { motion } from 'framer-motion';

const MenuPage = () => {
  const showSeasonal = isSeasonal();
  const allProducts = products;
  const location = useLocation();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    const openProductId = (location.state as any)?.openProductId;
    if (openProductId) {
      const all = [...products, ...seasonalProducts];
      const found = all.find((p) => p.id === openProductId);
      if (found) setSelectedProduct(found);
      // Clear state so refresh doesn't re-open
      window.history.replaceState({}, '');
    }
  }, [location.state]);

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
            Clique em um produto para ver detalhes e fazer seu pedido
          </p>
        </motion.div>

        {/* All products grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
          {allProducts.map((product, i) => (
            <ProductCard
              key={product.id}
              product={product}
              delay={i * 0.08}
              onClick={() => setSelectedProduct(product)}
            />
          ))}
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

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              {seasonalProducts.map((product, i) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  delay={i * 0.08}
                  onClick={() => setSelectedProduct(product)}
                />
              ))}
            </div>
          </>
        )}
      </main>
      <Footer />
      <WhatsAppButton />
      <MobileCartButton />
      <CartSidebar />

      <ProductDetailModal
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
};

export default MenuPage;
