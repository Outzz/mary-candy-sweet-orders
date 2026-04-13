import { getWhatsAppDirectUrl } from '@/lib/whatsapp';
import { Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export function Footer() {
  const navigate = useNavigate();
  const [clickCount, setClickCount] = useState(0);

  const handleHeartClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const newCount = clickCount + 1;
    setClickCount(newCount);
    if (newCount >= 3) {
      setClickCount(0);
      navigate('/admin');
    }
    // Reset after 2 seconds if not enough clicks
    setTimeout(() => setClickCount(0), 2000);
  };

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
          Feito com{' '}
          <button onClick={handleHeartClick} className="focus:outline-none" aria-label="Admin">
            <Heart className="w-3 h-3 fill-primary text-primary cursor-pointer hover:scale-125 transition-transform" />
          </button>{' '}
          Mary Candy © {new Date().getFullYear()}
        </div>
      </div>
    </footer>
  );
}
