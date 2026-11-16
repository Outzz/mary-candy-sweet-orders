import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Star, ShoppingBag, Check } from 'lucide-react';
import { formatCurrency } from '@/lib/whatsapp';
import { useCart } from '@/store/cart';
import uva from '@/assets/natal-uva.jpg.asset.json';
import morango from '@/assets/natal-morango.jpg.asset.json';
import cravejado from '@/assets/natal-cravejado.jpg.asset.json';
import limao from '@/assets/natal-mousse-limao.jpg.asset.json';
import maracuja from '@/assets/natal-mousse-maracuja.jpg.asset.json';
import sensacao from '@/assets/natal-mousse-sensacao.jpg.asset.json';

interface XmasProduct {
  id: string;
  name: string;
  description: string;
  p: number;
  m: number;
  image: string;
  flavors?: { name: string; image: string }[];
}

const xmasProducts: XmasProduct[] = [
  { id: 'natal-travessa-morango', name: 'Travessa surpresa de morango', p: 49, m: 99, image: morango.url,
    description: 'Camadas de morangos fatiados, camadas de brigadeiro de ninho cremoso e por cima uma deliciosa ganache de chocolate.' },
  { id: 'natal-travessa-uva', name: 'Travessa surpresa de uva', p: 49, m: 99, image: uva.url,
    description: 'Camadas de uvas verdes, camadas de brigadeiro de ninho cremoso e por cima deliciosa ganache de chocolate ao leite.' },
  { id: 'natal-morango-cravejado', name: 'Travessa de morango cravejado', p: 55, m: 110, image: cravejado.url,
    description: 'Camadas de morangos fatiados, brigadeiro cremoso de ninho e por cima a famosa casquinha cravejada, feita com chocolate branco e pedaços de caramelo.' },
  { id: 'natal-mousse-trufado', name: 'Mousses de fruta, trufados', p: 40, m: 80, image: limao.url,
    description: 'Mousses cremosos feitos da fruta, com deliciosa ganache de chocolate ao leite, finalizados com uma decoração que encanta.',
    flavors: [ { name: 'Limão', image: limao.url }, { name: 'Maracujá', image: maracuja.url }, { name: 'Sensação', image: sensacao.url } ] },
];

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

function XmasCard({ product, index }: { product: XmasProduct; index: number }) {
  const addItem = useCart((s) => s.addItem);
  const setCartOpen = useCart((s) => s.setCartOpen);
  const [size, setSize] = useState<'P' | 'M'>('P');
  const [flavor, setFlavor] = useState(product.flavors?.[0]);
  const [added, setAdded] = useState(false);
  const price = size === 'P' ? product.p : product.m;

  const add = () => {
    addItem({ productId: product.id, name: product.name, size, flavor: flavor?.name, quantity: 1, price });
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
        <img src={flavor?.image || product.image} alt={`${product.name}${flavor ? ` – ${flavor.name}` : ''}`} loading="lazy" className="w-full h-full object-cover" />
      </div>
      <h3 className="font-display text-xl text-foreground mb-2">{product.name}</h3>
      <p className="text-sm text-muted-foreground font-body mb-4 flex-1">{product.description}</p>

      {product.flavors && (
        <div className="mb-3">
          <div className="text-xs font-body font-semibold text-foreground/70 mb-2">Sabor</div>
          <div className="flex flex-wrap gap-2">
            {product.flavors.map((f) => (
              <button key={f.name} onClick={() => setFlavor(f)}
                className={`px-3 py-2 rounded-full text-sm font-body transition-colors ${flavor?.name === f.name ? 'bg-primary text-primary-foreground' : 'bg-secondary text-foreground hover:bg-accent'}`}>
                {f.name}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="text-xs font-body font-semibold text-foreground/70 mb-2">Tamanho</div>
      <div className="flex gap-2 mb-4">
        {(['P', 'M'] as const).map((s) => (
          <button key={s} onClick={() => setSize(s)}
            className={`flex-1 rounded-2xl py-2 text-center transition-colors ${size === s ? 'bg-primary text-primary-foreground' : 'bg-secondary text-foreground hover:bg-accent'}`}>
            <div className="text-xs font-body">{s}</div>
            <div className="font-display text-lg">{formatCurrency(s === 'P' ? product.p : product.m)}</div>
          </button>
        ))}
      </div>

      <button onClick={add}
        className="inline-flex items-center justify-center gap-2 w-full py-3.5 rounded-full bg-gradient-to-r from-primary to-candy-gold text-primary-foreground font-body font-semibold hover:opacity-90 transition-opacity">
        {added ? <><Check className="w-4 h-4" /> Adicionado!</> : <><ShoppingBag className="w-4 h-4" /> Adicionar ao pedido</>}
      </button>
    </motion.article>
  );
}

export function ChristmasSection() {
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
          {xmasProducts.map((p, i) => <XmasCard key={p.id} product={p} index={i} />)}
        </div>
      </div>
    </section>
  );
}
