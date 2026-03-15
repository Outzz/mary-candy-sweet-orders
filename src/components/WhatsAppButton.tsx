import { getWhatsAppDirectUrl } from '@/lib/whatsapp';
import { MessageCircle } from 'lucide-react';

export function WhatsAppButton() {
  return (
    <a
      href={getWhatsAppDirectUrl()}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-20 right-6 z-50 w-14 h-14 rounded-full bg-[#25D366] text-primary-foreground flex items-center justify-center shadow-candy-float hover:scale-110 transition-transform"
      aria-label="WhatsApp"
    >
      <MessageCircle className="w-6 h-6" fill="white" strokeWidth={0} />
    </a>
  );
}
