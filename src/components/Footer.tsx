import { getWhatsAppDirectUrl } from '@/lib/whatsapp';
import { Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-foreground py-12">
      <div className="container text-center">
        <h3 className="font-display text-2xl text-primary-foreground mb-2">Mary Candy</h3>
        <p className="text-primary-foreground/60 font-body text-sm mb-6">
          Doces artesanais feitos com carinho para momentos especiais.
        </p>
        <a
          href={getWhatsAppDirectUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-body font-semibold text-sm hover:opacity-90 transition-opacity"
        >
          💬 Encomendar no WhatsApp
        </a>
        <div className="mt-8 pt-6 border-t border-primary-foreground/10 flex items-center justify-center gap-1 text-primary-foreground/40 font-body text-xs">
          Feito com <Heart className="w-3 h-3 fill-primary text-primary" /> Mary Candy © {new Date().getFullYear()}
        </div>
      </div>
    </footer>
  );
}
