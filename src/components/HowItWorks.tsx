import { motion } from 'framer-motion';
import { Search, Palette, Send } from 'lucide-react';

const steps = [
  {
    icon: <Search className="w-8 h-8 text-primary" strokeWidth={1.5} />,
    title: 'Escolha',
    description: 'Navegue pelo nosso cardápio e escolha seus doces favoritos.',
  },
  {
    icon: <Palette className="w-8 h-8 text-primary" strokeWidth={1.5} />,
    title: 'Personalize',
    description: 'Selecione tamanho, sabores e quantidade do seu jeito.',
  },
  {
    icon: <Send className="w-8 h-8 text-primary" strokeWidth={1.5} />,
    title: 'Envie no WhatsApp',
    description: 'Finalize seu pedido diretamente pelo WhatsApp com um clique.',
  },
];

export function HowItWorks() {
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
            Como <span className="text-primary italic">Funciona</span>
          </h2>
          <p className="mt-3 text-muted-foreground font-body text-lg">
            Pedir seus doces nunca foi tão fácil
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="text-center"
            >
              <div className="w-16 h-16 rounded-2xl bg-card shadow-candy flex items-center justify-center mx-auto mb-5">
                {step.icon}
              </div>
              <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-4 font-body font-bold text-sm">
                {i + 1}
              </div>
              <h3 className="font-display text-xl text-foreground mb-2">{step.title}</h3>
              <p className="text-muted-foreground font-body text-sm max-w-xs mx-auto">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
