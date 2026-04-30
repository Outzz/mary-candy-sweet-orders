import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Star } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export function FeedbackForm() {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) {
      toast.error('Preencha seu nome e mensagem 💕');
      return;
    }
    setLoading(true);
    const { error } = await supabase.from('feedbacks').insert({
      name: name.trim(),
      message: message.trim(),
      rating: rating || null,
    });
    setLoading(false);
    if (error) {
      toast.error('Não foi possível enviar. Tente novamente.');
      return;
    }
    toast.success('Obrigada pelo seu feedback! 🍓');
    setName('');
    setMessage('');
    setRating(0);
  };

  return (
    <section className="py-20 bg-background">
      <div className="container max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-display tracking-tight text-foreground">
            Deixe seu{' '}
            <span className="text-primary italic">feedback</span>
          </h2>
          <p className="text-muted-foreground font-body text-sm mt-3">
            Sua opinião é muito especial para nós. Conte como foi a sua experiência!
          </p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-card rounded-3xl p-6 md:p-8 shadow-candy space-y-4"
        >
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Seu nome"
            maxLength={80}
            className="w-full px-4 py-3 rounded-2xl bg-muted border-0 font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />

          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Conte sua experiência..."
            rows={4}
            maxLength={600}
            className="w-full px-4 py-3 rounded-2xl bg-muted border-0 font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
          />

          <div className="flex items-center gap-2">
            <span className="font-body text-xs text-muted-foreground mr-1">Avaliação:</span>
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => setRating(n)}
                onMouseEnter={() => setHover(n)}
                onMouseLeave={() => setHover(0)}
                className="p-1"
                aria-label={`${n} estrelas`}
              >
                <Star
                  className={`w-5 h-5 transition-colors ${
                    n <= (hover || rating)
                      ? 'fill-candy-gold text-candy-gold'
                      : 'text-muted-foreground'
                  }`}
                  strokeWidth={1.5}
                />
              </button>
            ))}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-body font-semibold text-sm hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            <Send className="w-4 h-4" strokeWidth={1.5} />
            {loading ? 'Enviando...' : 'Enviar feedback'}
          </button>
        </motion.form>
      </div>
    </section>
  );
}
