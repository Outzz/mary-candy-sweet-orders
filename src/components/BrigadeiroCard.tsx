import { useState, useMemo } from 'react';
import { Plus, Minus, ShoppingBag, Cookie } from 'lucide-react';
import { Product, getPackageQuantity } from '@/lib/products';
import { useCart } from '@/store/cart';
import { formatCurrency } from '@/lib/whatsapp';
import { motion } from 'framer-motion';

interface BrigadeiroCardProps {
  product: Product;
  delay?: number;
}

export function BrigadeiroCard({ product, delay = 0 }: BrigadeiroCardProps) {
  const { addItem, setCartOpen } = useCart();
  const [selectedPackage, setSelectedPackage] = useState(product.packages?.[0] || null);
  const [flavorCounts, setFlavorCounts] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    product.flavors.forEach((f) => (initial[f] = 0));
    return initial;
  });

  const totalSlots = selectedPackage ? getPackageQuantity(selectedPackage.label) : 0;
  const maxFlavors = selectedPackage && product.maxFlavors
    ? product.maxFlavors[selectedPackage.label] || Infinity
    : Infinity;
  const usedSlots = useMemo(
    () => Object.values(flavorCounts).reduce((s, v) => s + v, 0),
    [flavorCounts]
  );
  const selectedFlavorCount = useMemo(
    () => Object.values(flavorCounts).filter((v) => v > 0).length,
    [flavorCounts]
  );
  const remaining = totalSlots - usedSlots;

  const updateFlavor = (flavor: string, delta: number) => {
    setFlavorCounts((prev) => {
      const newVal = Math.max(0, (prev[flavor] || 0) + delta);
      const otherUsed = usedSlots - (prev[flavor] || 0);
      if (newVal + otherUsed > totalSlots) return prev;
      // Check max flavors limit when adding a new flavor
      if (delta > 0 && prev[flavor] === 0) {
        const currentFlavorCount = Object.values(prev).filter((v) => v > 0).length;
        if (currentFlavorCount >= maxFlavors) return prev;
      }
      return { ...prev, [flavor]: newVal };
    });
  };

  const resetFlavors = () => {
    const reset: Record<string, number> = {};
    product.flavors.forEach((f) => (reset[f] = 0));
    setFlavorCounts(reset);
  };

  const handlePackageChange = (pkg: typeof selectedPackage) => {
    setSelectedPackage(pkg);
    resetFlavors();
  };

  const handleAdd = () => {
    if (!selectedPackage || remaining !== 0) return;
    addItem({
      productId: product.id,
      name: product.name,
      size: selectedPackage.label,
      flavorBreakdown: { ...flavorCounts },
      quantity: 1,
      price: selectedPackage.price,
    });
    setCartOpen(true);
    resetFlavors();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      className="bg-card rounded-3xl p-6 shadow-candy col-span-full lg:col-span-2"
    >
      <div className="flex items-start gap-5 mb-6">
        <div className="w-24 h-24 rounded-2xl bg-secondary flex items-center justify-center shrink-0">
          <Cookie className="w-12 h-12 text-primary" strokeWidth={1.5} />
        </div>
        <div>
          {product.badge && (
            <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-body font-semibold mb-2">
              {product.badge}
            </span>
          )}
          <h3 className="font-display text-2xl text-foreground mb-1">{product.name}</h3>
          <p className="text-muted-foreground font-body text-sm">{product.description}</p>
          <p className="text-muted-foreground/60 font-body text-xs mt-1">Peso: {product.weight}</p>
        </div>
      </div>

      {/* Package selector */}
      <div className="mb-5">
        <label className="font-body text-xs font-semibold text-foreground/70 mb-2 block">Quantidade de unidades</label>
        <div className="flex flex-wrap gap-2">
          {product.packages?.map((pkg) => (
            <button
              key={pkg.label}
              onClick={() => handlePackageChange(pkg)}
              className={`px-4 py-2 rounded-full font-body text-sm font-medium transition-all ${
                selectedPackage?.label === pkg.label
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-foreground hover:bg-accent'
              }`}
            >
              {pkg.label} — {formatCurrency(pkg.price)}
            </button>
          ))}
        </div>
      </div>

      {/* Progress bar */}
      <div className="mb-5">
        <div className="flex items-center justify-between mb-2">
          <span className="font-body text-xs font-semibold text-foreground/70">
            Escolha os sabores ({maxFlavors === Infinity ? '∞' : `máx. ${maxFlavors}`} sabores)
          </span>
          <span className="font-body text-xs text-muted-foreground tabular-nums">
            {usedSlots}/{totalSlots} selecionados
          </span>
        </div>
        <div className="w-full h-2 rounded-full bg-secondary overflow-hidden">
          <div
            className="h-full rounded-full bg-primary transition-all duration-300"
            style={{ width: `${totalSlots > 0 ? (usedSlots / totalSlots) * 100 : 0}%` }}
          />
        </div>
      </div>

      {/* Flavor counters */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 mb-6">
        {product.flavors.map((flavor) => (
          <div
            key={flavor}
            className="bg-muted rounded-2xl p-3 flex flex-col items-center gap-2"
          >
            <span className="font-body text-xs font-medium text-foreground text-center">{flavor}</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => updateFlavor(flavor, -1)}
                disabled={flavorCounts[flavor] === 0}
                className="w-7 h-7 rounded-full bg-card flex items-center justify-center hover:bg-secondary transition-colors disabled:opacity-30"
              >
                <Minus className="w-3 h-3" />
              </button>
              <span className="font-body font-semibold text-sm tabular-nums w-5 text-center">
                {flavorCounts[flavor]}
              </span>
              <button
                onClick={() => updateFlavor(flavor, 1)}
                disabled={remaining === 0 || (flavorCounts[flavor] === 0 && selectedFlavorCount >= maxFlavors)}
                className="w-7 h-7 rounded-full bg-card flex items-center justify-center hover:bg-secondary transition-colors disabled:opacity-30"
              >
                <Plus className="w-3 h-3" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Price & Add */}
      <div className="flex items-center justify-between pt-4 border-t border-border">
        <span className="font-display text-2xl text-primary">
          {selectedPackage ? formatCurrency(selectedPackage.price) : 'R$ 0,00'}
        </span>
        <button
          onClick={handleAdd}
          disabled={remaining !== 0}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-primary-foreground font-body font-semibold text-sm hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <ShoppingBag className="w-4 h-4" strokeWidth={1.5} />
          {remaining === 0 ? 'Adicionar' : `Faltam ${remaining}`}
        </button>
      </div>
    </motion.div>
  );
}
