import { motion } from 'framer-motion';
import { Sparkles, Star, MessageCircle, Cake } from 'lucide-react';
import { formatCurrency } from '@/lib/whatsapp';
import travessaUvaImg from '@/assets/travessa-uva.png';
import mousseTrufadoImg from '@/assets/mousse-trufado.png';

const WHATSAPP_NUMBER = '5513988556686';

interface XmasProduct {
  name: string;
  description: string;
  p: number;
  m: number;
  flavors?: string;
  image?: string;
}

const xmasProducts: XmasProduct[] = [
  {
    name: 'Travessa surpresa de morango',
    description: 'Camadas de morangos fatiados, camadas de brigadeiro de ninho cremoso e por cima uma deliciosa ganache de chocolate.',
    p: 49, m: 99,
  },
  {
    name: 'Travessa surpresa de uva',
    description: 'Camadas de uvas verdes, camadas de brigadeiro de ninho cremoso e por cima deliciosa ganache de chocolate ao leite.',
    p: 49, m: 99,
    image: travessaUvaImg,
  },
  {
    name: 'Travessa de morango cravejado',
    description: 'Camadas de morangos fatiados, brigadeiro cremoso de ninho e por cima a famosa casquinha cravejada, feita com chocolate branco e pedaços de caramelo.',
    p: 55, m: 110,
  },
  {
    name: 'Mousses de fruta, trufados',
    description: 'Mousses cremosos feitos da fruta, com deliciosa ganache de chocolate ao leite, finalizados com uma decoração que encanta.',
    flavors: 'Limão, maracujá ou sensação',
    p: 40, m: 80,
    image: mousseTrufadoImg,
  },
];

function orderUrl(name: string) {
  const msg = `Olá Mary Candy! Gostaria de encomendar do Especial de Natal: ${name}.`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
}

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

export function ChristmasSection() {
  return (
    <section id="natal" className="relative py-20 overflow-hidden gradient-xmas">
      <Sparkles className="absolute top-8 left-6 w-6 h-6 text-candy-gold/60 animate-float-candy" aria-hidden />
      <Star className="absolute top-16 right-10 w-5 h-5 text-candy-gold/50 fill-candy-gold/40 animate-float-candy-delayed" aria-hidden />
      <span className="absolute bottom-10 left-12 w-4 h-4 rounded-full bg-primary/30 animate-float-candy" aria-hidden />
      <div className="container relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 max-w-2xl mx-auto"
        >
          <ChristmasDivider />
          <h2 className="mt-4 text-3xl md:text-5xl font-display tracking-tight text-foreground">
            🎄 Especial de Natal <span className="text-primary italic">Mary Candy</span>
          </h2>
          <p className="mt-4 text-muted-foreground font-body text-base md:text-lg">
            Neste Natal, deixe seus momentos ainda mais doces! Conheça nossas opções especiais para celebrar com quem você ama.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {xmasProducts.map((p, i) => (
            <motion.article
              key={p.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col bg-card rounded-3xl p-4 shadow-candy hover:shadow-candy-hover hover:-translate-y-1 transition-all duration-300 border border-candy-gold/20"
            >
              <div className="rounded-2xl overflow-hidden bg-secondary aspect-square mb-4 flex items-center justify-center">
                {p.image ? (
                  <img src={p.image} alt={p.name} loading="lazy" className="w-full h-full object-contain" />
                ) : (
                  <Cake className="w-14 h-14 text-primary/60" strokeWidth={1.2} />
                )}
              </div>
              <h3 className="font-display text-xl text-foreground mb-2">{p.name}</h3>
              {p.flavors && (
                <p className="text-xs font-body font-semibold text-candy-gold mb-1">Sabores: {p.flavors}</p>
              )}
              <p className="text-sm text-muted-foreground font-body mb-4 flex-1">{p.description}</p>
              <div className="flex gap-2 mb-4">
                <div className="flex-1 rounded-2xl bg-secondary py-2 text-center">
                  <div className="text-xs font-body text-muted-foreground">P</div>
                  <div className="font-display text-lg text-primary">{formatCurrency(p.p)}</div>
                </div>
                <div className="flex-1 rounded-2xl bg-secondary py-2 text-center">
                  <div className="text-xs font-body text-muted-foreground">M</div>
                  <div className="font-display text-lg text-primary">{formatCurrency(p.m)}</div>
                </div>
              </div>
              <a
                href={orderUrl(p.name)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full py-3.5 rounded-full bg-gradient-to-r from-primary to-candy-gold text-primary-foreground font-body font-semibold hover:opacity-90 transition-opacity"
              >
                <MessageCircle className="w-4 h-4" /> Encomendar pelo WhatsApp
              </a>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
