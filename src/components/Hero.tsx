import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { getWhatsAppDirectUrl } from '@/lib/whatsapp';
import { Heart, Cake, Cookie } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative overflow-hidden gradient-hero">
      {/* Floating decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <Heart className="absolute top-20 left-[10%] w-6 h-6 text-primary/20 animate-float-candy" strokeWidth={1.5} />
        <Cake className="absolute top-32 right-[15%] w-8 h-8 text-primary/15 animate-float-candy-delayed" strokeWidth={1.5} />
        <Cookie className="absolute bottom-32 left-[20%] w-7 h-7 text-primary/15 animate-float-candy" strokeWidth={1.5} />
        <Heart className="absolute bottom-20 right-[10%] w-5 h-5 text-primary/20 animate-float-candy-delayed" strokeWidth={1.5} />
      </div>

      <div className="container relative z-10 py-20 md:py-32 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-secondary text-primary text-sm font-body font-medium mb-6">
            🍬 Doces Artesanais
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-6xl lg:text-7xl font-display tracking-tight text-foreground max-w-3xl"
        >
          Momentos doces,{' '}
          <span className="text-primary italic">feitos à mão</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 text-lg md:text-xl text-muted-foreground font-body max-w-xl"
        >
          Descubra a delicadeza dos nossos mousses, travessas e brigadeiros gourmet.
          Peça agora e receba em casa.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex flex-col sm:flex-row gap-4"
        >
          <Link
            to="/cardapio"
            className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-primary text-primary-foreground font-body font-semibold text-base hover:opacity-90 transition-opacity shadow-candy-float"
          >
            Ver Cardápio
          </Link>
          <a
            href={getWhatsAppDirectUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-card text-foreground font-body font-semibold text-base ring-1 ring-border hover:bg-secondary transition-colors shadow-candy"
          >
            💬 Falar no WhatsApp
          </a>
        </motion.div>
      </div>
    </section>
  );
}
