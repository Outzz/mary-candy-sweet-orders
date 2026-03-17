import { useState, useMemo } from 'react';
import { Plus, Minus, ShoppingBag, X, Cake, Cherry, IceCreamCone, Cookie, Egg, Gift, Star as StarIcon } from 'lucide-react';
import { Product, ProductSize, getPackageQuantity } from '@/lib/products';
import { useCart } from '@/store/cart';
import { formatCurrency } from '@/lib/whatsapp';
import { motion, AnimatePresence } from 'framer-motion';

const categoryIcons: Record<string, React.ReactNode> = {
  travessa: <Cherry className="w-16 h-16 text-primary" strokeWidth={1.5} />,
  'mousse-tradicional': <IceCreamCone className="w-16 h-16 text-primary" strokeWidth={1.5} />,
  'mousse-trufado': <Cake className="w-16 h-16 text-primary" strokeWidth={1.5} />,
  brigadeiro: <Cookie className="w-16 h-16 text-primary" strokeWidth={1.5} />,
  'ovo-tradicional': <Egg className="w-16 h-16 text-primary" strokeWidth={1.5} />,
  'ovo-especial': <StarIcon className="w-16 h-16 text-primary" strokeWidth={1.5} />,
  'kit-degustacao': <Gift className="w-16 h-16 text-primary" strokeWidth={1.5} />,
};

interface ProductDetailModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProductDetailModal({ product, isOpen, onClose }: ProductDetailModalProps) {
  if (!product) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
          onClick={onClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-foreground/40 backdrop-blur-sm" />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="relative bg-card rounded-t-3xl sm:rounded-3xl w-full sm:max-w-lg max-h-[90vh] overflow-y-auto shadow-candy-float"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-secondary flex items-center justify-center hover:bg-accent transition-colors z-10"
            >
              <X className="w-5 h-5 text-foreground" />
            </button>

            {product.category === 'brigadeiro' ? (
              <BrigadeiroContent product={product} onClose={onClose} />
            ) : (
              <RegularContent product={product} onClose={onClose} />
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function RegularContent({ product, onClose }: { product: Product; onClose: () => void }) {
  const { addItem, setCartOpen } = useCart();
  const [selectedSize, setSelectedSize] = useState<ProductSize | null>(
    product.sizes ? product.sizes[0] : product.packages ? product.packages[0] : null
  );
  const [selectedFlavor, setSelectedFlavor] = useState<string>(product.flavors[0] || '');
  const [quantity, setQuantity] = useState(1);

  const price = selectedSize?.price || 0;

  const handleAdd = () => {
    addItem({
      productId: product.id,
      name: product.name,
      size: selectedSize?.label,
      flavor: selectedFlavor,
      quantity,
      price,
    });
    setCartOpen(true);
    onClose();
  };

  return (
    <div className="p-6 pt-8">
      {/* Hero area */}
      {product.image ? (
        <div className="w-40 h-40 rounded-3xl overflow-hidden mx-auto mb-6">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
        </div>
      ) : (
        <div className="w-32 h-32 rounded-3xl bg-secondary flex items-center justify-center mx-auto mb-6">
          {categoryIcons[product.category] || <Cake className="w-16 h-16 text-primary" strokeWidth={1.5} />}
        </div>
      )}

      {product.badge && (
        <div className="text-center mb-3">
          <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-body font-semibold">
            {product.badge}
          </span>
        </div>
      )}

      <h2 className="font-display text-3xl text-foreground text-center mb-2">{product.name}</h2>
      <p className="text-muted-foreground font-body text-sm text-center mb-6">{product.description}</p>

      {product.weight && (
        <p className="text-muted-foreground/60 font-body text-xs text-center mb-4">Peso: {product.weight}</p>
      )}

      {/* Size selector */}
      {product.sizes && product.sizes.length > 1 && (
        <div className="mb-5">
          <label className="font-body text-xs font-semibold text-foreground/70 mb-2 block">Tamanho</label>
          <div className="flex gap-2">
            {product.sizes.map((size) => (
              <button
                key={size.label}
                onClick={() => setSelectedSize(size)}
                className={`flex-1 px-4 py-3 rounded-2xl font-body text-sm font-medium transition-all ${
                  selectedSize?.label === size.label
                    ? 'bg-primary text-primary-foreground shadow-candy'
                    : 'bg-secondary text-foreground hover:bg-accent'
                }`}
              >
                <span className="block font-semibold">{size.label}</span>
                <span className="block text-xs mt-0.5 opacity-80">{formatCurrency(size.price)}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Flavor selector */}
      {product.flavors.length > 1 && (
        <div className="mb-5">
          <label className="font-body text-xs font-semibold text-foreground/70 mb-2 block">Sabor</label>
          <div className="flex flex-wrap gap-2">
            {product.flavors.map((flavor) => (
              <button
                key={flavor}
                onClick={() => setSelectedFlavor(flavor)}
                className={`px-4 py-2 rounded-2xl font-body text-sm transition-all ${
                  selectedFlavor === flavor
                    ? 'bg-primary text-primary-foreground shadow-candy'
                    : 'bg-secondary text-foreground hover:bg-accent'
                }`}
              >
                {flavor}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Quantity */}
      <div className="mb-6">
        <label className="font-body text-xs font-semibold text-foreground/70 mb-2 block">Quantidade</label>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="w-11 h-11 rounded-2xl bg-secondary flex items-center justify-center hover:bg-accent transition-colors"
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="font-body font-semibold text-xl tabular-nums w-8 text-center">{quantity}</span>
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="w-11 h-11 rounded-2xl bg-secondary flex items-center justify-center hover:bg-accent transition-colors"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Add to cart */}
      <div className="flex items-center justify-between pt-5 border-t border-border">
        <span className="font-display text-3xl text-primary">{formatCurrency(price * quantity)}</span>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-primary text-primary-foreground font-body font-semibold text-sm hover:opacity-90 transition-opacity"
        >
          <ShoppingBag className="w-4 h-4" strokeWidth={1.5} />
          Adicionar
        </button>
      </div>
    </div>
  );
}

function BrigadeiroContent({ product, onClose }: { product: Product; onClose: () => void }) {
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
    onClose();
    resetFlavors();
  };

  return (
    <div className="p-6 pt-8">
      {/* Hero */}
      {product.image ? (
        <div className="w-40 h-40 rounded-3xl overflow-hidden mx-auto mb-6">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
        </div>
      ) : (
        <div className="w-32 h-32 rounded-3xl bg-secondary flex items-center justify-center mx-auto mb-6">
          <Cookie className="w-16 h-16 text-primary" strokeWidth={1.5} />
        </div>
      )}

      {product.badge && (
        <div className="text-center mb-3">
          <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-body font-semibold">
            {product.badge}
          </span>
        </div>
      )}

      <h2 className="font-display text-3xl text-foreground text-center mb-2">{product.name}</h2>
      <p className="text-muted-foreground font-body text-sm text-center mb-2">{product.description}</p>
      <p className="text-muted-foreground/60 font-body text-xs text-center mb-6">Peso: {product.weight}</p>

      {/* Package selector */}
      <div className="mb-5">
        <label className="font-body text-xs font-semibold text-foreground/70 mb-2 block">Quantidade de unidades</label>
        <div className="grid grid-cols-2 gap-2">
          {product.packages?.map((pkg) => (
            <button
              key={pkg.label}
              onClick={() => handlePackageChange(pkg)}
              className={`px-4 py-3 rounded-2xl font-body text-sm font-medium transition-all ${
                selectedPackage?.label === pkg.label
                  ? 'bg-primary text-primary-foreground shadow-candy'
                  : 'bg-secondary text-foreground hover:bg-accent'
              }`}
            >
              <span className="block font-semibold">{pkg.label}</span>
              <span className="block text-xs mt-0.5 opacity-80">{formatCurrency(pkg.price)}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Progress bar */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="font-body text-xs font-semibold text-foreground/70">
            Escolha os sabores ({maxFlavors === Infinity ? '∞' : `máx. ${maxFlavors}`} sabores)
          </span>
          <span className="font-body text-xs text-muted-foreground tabular-nums">
            {usedSlots}/{totalSlots}
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
      <div className="grid grid-cols-2 gap-2 mb-6">
        {product.flavors.map((flavor) => (
          <div
            key={flavor}
            className="bg-muted rounded-2xl p-3 flex items-center justify-between gap-2"
          >
            <span className="font-body text-xs font-medium text-foreground">{flavor}</span>
            <div className="flex items-center gap-1.5">
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
      <div className="flex items-center justify-between pt-5 border-t border-border">
        <span className="font-display text-3xl text-primary">
          {selectedPackage ? formatCurrency(selectedPackage.price) : 'R$ 0,00'}
        </span>
        <button
          onClick={handleAdd}
          disabled={remaining !== 0}
          className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-primary text-primary-foreground font-body font-semibold text-sm hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <ShoppingBag className="w-4 h-4" strokeWidth={1.5} />
          {remaining === 0 ? 'Adicionar' : `Faltam ${remaining}`}
        </button>
      </div>
    </div>
  );
}
