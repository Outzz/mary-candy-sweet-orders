import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Star, ShoppingBag, Check } from 'lucide-react';
import { formatCurrency } from '@/lib/whatsapp';
import { useCart } from '@/store/cart';
import { useChristmasProducts } from '@/hooks/useProducts';
import type { Product } from '@/lib/products';
import { getServings } from '@/lib/servings';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export function ChristmasDivider() {
  return (
    <div className="flex items-center justify-center gap-3 py-2" aria-hidden>
      <span className="h-px w-16 bg-gradient-to-r from-transparent to-candy-gold/60" />
      <Star className="w-3 h-3 text-candy-gold fill-candy-gold" />
      <span className="w-2 h-2 rounded-full bg-primary/50" />
      <Star className="w-4 h-4 text-candy-gold fill-candy-gold" />
      <span className="w-2 h-2 rounded-full bg-primary/50" />
      <Star className="w-3 h-3 text-candy-gold fill-candy-gold" />
      <span className="h-px w-16 bg-gradient-to-l from-transparent to-candy-gold/60" />
    </div>
  );
}

function XmasCard({ product, index }: { product: Product; index: number }) {
  const addItem = useCart((s) => s.addItem);
  const setCartOpen = useCart((s) => s.setCartOpen);
  const [size, setSize] = useState<'P' | 'M'>('P');
  const [flavor, setFlavor] = useState(product.flavors[0] || '');
  const [added, setAdded] = useState(false);
  const price = product.sizes?.find(option => option.label === size)?.price || 0;
  const servings = getServings(product, size);

  const add = () => {
    addItem({ productId: product.id, name: product.name, size, flavor: flavor || undefined, quantity: 1, price });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
    setCartOpen(true);
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ delay: index * 0.08 }}
      className="flex flex-col bg-card rounded-3xl p-4 shadow-candy hover:shadow-candy-hover transition-all duration-300 border border-candy-gold/20"
    >
      <div className="rounded-2xl overflow-hidden bg-secondary aspect-square mb-4">
        <img src={product.flavorImages?.[flavor] || product.image} alt={`${product.name}${flavor ? ` – ${flavor}` : ''}`} loading="lazy" className="w-full h-full object-cover" />
      </div>
      <h3 className="font-display text-xl text-foreground mb-2"><Link to="/cardapio" state={{ openProductId: product.id }} className="hover:text-primary">{product.name}</Link></h3>
      <p className="text-sm text-muted-foreground font-body mb-4 flex-1">{product.description}</p>

      {product.flavors.length > 0 && (
        <div className="mb-3">
          <div className="text-xs font-body font-semibold text-foreground/70 mb-2">Sabor</div>
          <div className="flex flex-wrap gap-2">
            {product.flavors.map((f) => (
              <Button key={f} onClick={() => setFlavor(f)} variant={flavor === f ? "default" : "secondary"}
                className={`px-3 py-2 rounded-full text-sm font-body transition-colors ${flavor === f ? 'bg-primary text-primary-foreground' : 'bg-secondary text-foreground hover:bg-accent'}`}>
                {f}
              </Button>
            ))}
          </div>
        </div>
      )}

      <div className="text-xs font-body font-semibold text-foreground/70 mb-2">Tamanho</div>
      <div className="flex gap-2 mb-4">
        {(['P', 'M'] as const).map((s) => (
          <Button key={s} onClick={() => setSize(s)} variant={size === s ? "default" : "secondary"}
            className={`flex-1 h-auto flex-col gap-0 rounded-2xl py-2 text-center transition-colors ${size === s ? 'bg-primary text-primary-foreground' : 'bg-secondary text-foreground hover:bg-accent'}`}>
            <div className="text-xs font-body">{s}</div>
            <div className="font-display text-lg">{formatCurrency(product.sizes?.find(option => option.label === s)?.price || 0)}</div>
          </Button>
        ))}
      </div>

      {servings && <p className="text-sm font-body text-muted-foreground mb-3">Serve de {servings[0]} a {servings[1]} pessoas</p>}
      <Button asChild variant="link" className="mb-2"><Link to="/cardapio" state={{ openProductId: product.id }}>Ver detalhes</Link></Button>
      <Button onClick={add}
        className="inline-flex items-center justify-center gap-2 w-full h-auto py-3.5 rounded-full bg-gradient-to-r from-primary to-candy-gold text-primary-foreground font-body font-semibold hover:opacity-90 transition-opacity">
        {added ? <><Check className="w-4 h-4" /> Adicionado!</> : <><ShoppingBag className="w-4 h-4" /> Adicionar ao pedido</>}
      </Button>
    </motion.article>
  );
}

export function ChristmasSection() {
  const { data: christmasProducts = [] } = useChristmasProducts();
  if (christmasProducts.length === 0) return null;
  return (
    <section id="natal" className="relative py-20 overflow-hidden gradient-xmas">
      <Sparkles className="absolute top-8 left-6 w-6 h-6 text-candy-gold/60 animate-float-candy" aria-hidden />
      <Star className="absolute top-16 right-10 w-5 h-5 text-candy-gold/50 fill-candy-gold/40 animate-float-candy-delayed" aria-hidden />
      <div className="container relative">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-center mb-12 max-w-2xl mx-auto">
          <ChristmasDivider />
          <h2 className="mt-4 text-3xl md:text-5xl font-display tracking-tight text-foreground">
            🎄 Especial de Natal <span className="text-primary italic">Mary Candy</span>
          </h2>
          <p className="mt-4 text-muted-foreground font-body text-base md:text-lg">
            Neste Natal, deixe seus momentos ainda mais doces! Conheça nossas opções especiais para celebrar com quem você ama.
          </p>
          <p className="mt-3 text-sm font-body text-primary">Escolha o tamanho, adicione ao pedido e finalize pelo WhatsApp.</p>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {christmasProducts.map((p, i) => <XmasCard key={p.id} product={p} index={i} />)}
        </div>
      </div>
    </section>
  );
}
