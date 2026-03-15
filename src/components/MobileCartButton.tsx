import { ShoppingBag } from 'lucide-react';
import { useCart } from '@/store/cart';
import { formatCurrency } from '@/lib/whatsapp';

export function MobileCartButton() {
  const { items, toggleCart } = useCart();
  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const count = items.reduce((sum, i) => sum + i.quantity, 0);

  if (count === 0) return null;

  return (
    <button
      onClick={toggleCart}
      className="fixed bottom-6 left-6 right-20 z-50 md:hidden flex items-center justify-between px-5 py-3.5 rounded-full bg-primary text-primary-foreground shadow-candy-float font-body font-semibold text-sm"
    >
      <span className="flex items-center gap-2">
        <ShoppingBag className="w-5 h-5" strokeWidth={1.5} />
        Ver Carrinho ({count})
      </span>
      <span>{formatCurrency(total)}</span>
    </button>
  );
}
