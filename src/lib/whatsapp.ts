import type { CartItem } from '@/store/cart';

const WHATSAPP_NUMBER = '5513988556686';

export function formatCurrency(value: number): string {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

export function buildWhatsAppMessage(items: CartItem[]): string {
  if (items.length === 0) return '';

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  let msg = `Olá Mary Candy! Gostaria de fazer um pedido:\n\n🛍️ *Resumo do Pedido:*\n--------------------------\n`;

  items.forEach((item) => {
    msg += `${item.quantity}x ${item.name}`;
    if (item.size) msg += ` (${item.size})`;
    msg += `\n`;
    if (item.flavor) msg += `- Sabor: ${item.flavor}\n`;
    if (item.flavorBreakdown && Object.keys(item.flavorBreakdown).length > 0) {
      Object.entries(item.flavorBreakdown).forEach(([flavor, qty]) => {
        if (qty > 0) msg += `- ${qty}x ${flavor}\n`;
      });
    }
    msg += `- ${formatCurrency(item.price * item.quantity)}\n\n`;
  });

  msg += `--------------------------\n*Total: ${formatCurrency(total)}*\n\nForma de entrega/retirada a combinar.`;

  return msg;
}

export function getWhatsAppUrl(items: CartItem[]): string {
  const message = buildWhatsAppMessage(items);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function getWhatsAppDirectUrl(): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Olá Mary Candy! Gostaria de saber mais sobre os doces. 🥰')}`;
}
