import { X, Trash2, Plus, Minus } from 'lucide-react';
import { useCart } from '@/store/cart';
import { formatCurrency, getWhatsAppUrl } from '@/lib/whatsapp';
import { AnimatePresence, motion } from 'framer-motion';

export function CartSidebar() {
  const { items, isOpen, setCartOpen, removeItem, updateQuantity, clearCart } = useCart();
  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCartOpen(false)}
            className="fixed inset-0 z-[60] bg-foreground/20 backdrop-blur-sm"
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 z-[70] w-full max-w-md bg-background shadow-candy-float flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h2 className="font-display text-2xl text-foreground">Seu Pedido</h2>
              <button
                onClick={() => setCartOpen(false)}
                className="p-2 rounded-full hover:bg-secondary transition-colors"
              >
                <X className="w-5 h-5" strokeWidth={1.5} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground font-body">Seu carrinho está vazio</p>
                  <p className="text-muted-foreground/60 font-body text-sm mt-2">
                    Explore nosso cardápio e adicione delícias!
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.id} className="bg-muted rounded-2xl p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-body font-semibold text-foreground text-sm">{item.name}</h4>
                          {item.size && (
                            <span className="text-muted-foreground font-body text-xs">Tam: {item.size}</span>
                          )}
                          {item.flavor && (
                            <span className="text-muted-foreground font-body text-xs ml-2">Sabor: {item.flavor}</span>
                          )}
                          {item.flavorBreakdown && Object.keys(item.flavorBreakdown).length > 0 && (
                            <div className="mt-1">
                              {Object.entries(item.flavorBreakdown).map(([flavor, qty]) =>
                                qty > 0 ? (
                                  <span key={flavor} className="text-muted-foreground font-body text-xs block">
                                    {qty}x {flavor}
                                  </span>
                                ) : null
                              )}
                            </div>
                          )}
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="p-1.5 rounded-full hover:bg-destructive/10 text-destructive transition-colors"
                        >
                          <Trash2 className="w-4 h-4" strokeWidth={1.5} />
                        </button>
                      </div>

                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                            className="w-7 h-7 rounded-full bg-card flex items-center justify-center hover:bg-secondary transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="font-body font-semibold text-sm tabular-nums w-6 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-7 h-7 rounded-full bg-card flex items-center justify-center hover:bg-secondary transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <span className="font-body font-semibold text-primary tabular-nums">
                          {formatCurrency(item.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-6 border-t border-border space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-body font-semibold text-foreground">Total</span>
                  <span className="font-display text-2xl text-primary">{formatCurrency(total)}</span>
                </div>

                <a
                  href={getWhatsAppUrl(items)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-full px-8 py-4 rounded-full bg-[#25D366] text-primary-foreground font-body font-semibold text-base hover:opacity-90 transition-opacity"
                >
                  💬 Finalizar no WhatsApp
                </a>

                <button
                  onClick={clearCart}
                  className="flex items-center justify-center w-full px-8 py-3 rounded-full bg-muted text-muted-foreground font-body font-medium text-sm hover:bg-secondary transition-colors"
                >
                  Limpar Carrinho
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
