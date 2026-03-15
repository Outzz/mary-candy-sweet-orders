import { motion } from 'framer-motion';
import { Heart, Award, Truck, Clock } from 'lucide-react';

const reasons = [
  {
    icon: <Heart className="w-7 h-7 text-primary" strokeWidth={1.5} />,
    title: 'Feito com Carinho',
    description: 'Cada doce é preparado artesanalmente com ingredientes selecionados.',
  },
  {
    icon: <Award className="w-7 h-7 text-primary" strokeWidth={1.5} />,
    title: 'Qualidade Premium',
    description: 'Ingredientes de primeira linha para um sabor incomparável.',
  },
  {
    icon: <Truck className="w-7 h-7 text-primary" strokeWidth={1.5} />,
    title: 'Entrega com Cuidado',
    description: 'Seus doces chegam perfeitos, com embalagem especial.',
  },
  {
    icon: <Clock className="w-7 h-7 text-primary" strokeWidth={1.5} />,
    title: 'Pedido Fácil',
    description: 'Monte seu pedido online e finalize pelo WhatsApp em segundos.',
  },
];

export function WhyMaryCandy() {
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
            Por que escolher a{' '}
            <span className="text-primary italic">Mary Candy</span>?
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((reason, i) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-card rounded-3xl p-6 shadow-candy text-center"
            >
              <div className="w-14 h-14 rounded-2xl bg-secondary flex items-center justify-center mx-auto mb-4">
                {reason.icon}
              </div>
              <h3 className="font-display text-lg text-foreground mb-2">{reason.title}</h3>
              <p className="text-muted-foreground font-body text-sm">{reason.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
