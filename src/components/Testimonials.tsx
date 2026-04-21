import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Ana Carolina',
    text: 'Os brigadeiros da Mary Candy são os melhores que já provei! Sempre peço para festas.',
    rating: 5,
  },
  {
    name: 'Juliana Santos',
    text: 'A travessa de frutas é simplesmente linda e deliciosa. Superou minhas expectativas!',
    rating: 5,
  },
  {
    name: 'Mariana Oliveira',
    text: 'Mousse trufado incrível! Atendimento carinhoso e entrega perfeita. Recomendo demais!',
    rating: 5,
  },
  {
    name: 'Patrícia Lima',
    text: 'Encomendei o ovo de colher e foi um sucesso na família. Sabor maravilhoso!',
    rating: 5,
  },
  {
    name: 'Camila Rodrigues',
    text: 'Caprichada, atenciosa e os doces são uma delícia. Já virei cliente fiel!',
    rating: 5,
  },
  {
    name: 'Beatriz Almeida',
    text: 'A caixinha de Dia das Mães foi o presente perfeito. Minha mãe amou cada detalhe!',
    rating: 5,
  },
  {
    name: 'Fernanda Costa',
    text: 'Brigadeiros gourmet de outro nível! Embalagem linda e sabor incomparável.',
    rating: 5,
  },
  {
    name: 'Larissa Mendes',
    text: 'Pedi para o aniversário da minha filha e todos elogiaram. Voltarei a pedir com certeza!',
    rating: 5,
  },
  {
    name: 'Renata Souza',
    text: 'Mousse de maracujá divino! Cremosidade na medida certa, simplesmente perfeito.',
    rating: 5,
  },
  {
    name: 'Tatiana Ribeiro',
    text: 'Atendimento impecável e doces artesanais de altíssima qualidade. Super recomendo!',
    rating: 5,
  },
];

export function Testimonials() {
  // Duplicate for seamless loop
  const looped = [...testimonials, ...testimonials];

  return (
    <section className="py-20 bg-muted overflow-hidden">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-display tracking-tight text-foreground">
            O que nossos clientes{' '}
            <span className="text-primary italic">dizem</span>
          </h2>
        </motion.div>
      </div>

      <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <div className="flex w-max animate-marquee-right gap-6 hover:[animation-play-state:paused]">
          {looped.map((t, i) => (
            <div
              key={`${t.name}-${i}`}
              className="bg-card rounded-3xl p-6 shadow-candy w-[320px] sm:w-[360px] shrink-0"
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star
                    key={j}
                    className="w-4 h-4 fill-candy-gold text-candy-gold"
                    strokeWidth={1.5}
                  />
                ))}
              </div>
              <p className="text-foreground font-body text-sm mb-4 italic">"{t.text}"</p>
              <p className="text-muted-foreground font-body text-sm font-semibold">— {t.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
