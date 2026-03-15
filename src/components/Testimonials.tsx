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
];

export function Testimonials() {
  return (
    <section className="py-20 bg-muted">
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-card rounded-3xl p-6 shadow-candy"
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-candy-gold text-candy-gold" strokeWidth={1.5} />
                ))}
              </div>
              <p className="text-foreground font-body text-sm mb-4 italic">"{t.text}"</p>
              <p className="text-muted-foreground font-body text-sm font-semibold">— {t.name}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
