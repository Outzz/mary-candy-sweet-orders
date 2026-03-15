import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { useCart } from '@/store/cart';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function Header() {
  const { itemCount, toggleCart } = useCart();
  const count = useCart((s) => s.items.length > 0 ? s.items.reduce((sum, i) => sum + i.quantity, 0) : 0);
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { to: '/', label: 'Início' },
    { to: '/cardapio', label: 'Cardápio' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl font-display text-primary tracking-tight">Mary Candy</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`font-body text-sm font-medium transition-colors hover:text-primary ${
                isActive(link.to) ? 'text-primary' : 'text-foreground/70'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={toggleCart}
            className="relative p-2 rounded-full hover:bg-secondary transition-colors"
            aria-label="Carrinho"
          >
            <ShoppingBag className="w-5 h-5 text-foreground" strokeWidth={1.5} />
            {count > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-body font-semibold">
                {count}
              </span>
            )}
          </button>

          <button
            className="md:hidden p-2 rounded-full hover:bg-secondary transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden border-t border-border bg-background"
          >
            <div className="container py-4 flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  className={`font-body text-base font-medium py-2 px-4 rounded-2xl transition-colors ${
                    isActive(link.to) ? 'bg-secondary text-primary' : 'text-foreground/70 hover:bg-secondary'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
