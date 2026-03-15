import { useState } from 'react';
import { formatCurrency } from '@/lib/whatsapp';

export default function AdminCalculator() {
  const [ingredientCost, setIngredientCost] = useState(10);
  const [packagingCost, setPackagingCost] = useState(3);
  const [laborHourRate, setLaborHourRate] = useState(25);
  const [productionMinutes, setProductionMinutes] = useState(30);
  const [currentPrice, setCurrentPrice] = useState(35);

  const laborCost = (laborHourRate / 60) * productionMinutes;
  const totalCost = ingredientCost + packagingCost + laborCost;
  const suggestedPrice = totalCost * 3;
  const margin = currentPrice > 0 ? ((currentPrice - totalCost) / currentPrice) * 100 : 0;
  const profit = currentPrice - totalCost;

  return (
    <div>
      <h1 className="font-display text-3xl text-foreground mb-2">Calculadora de Lucro</h1>
      <p className="text-muted-foreground font-body text-sm mb-8">
        Simule custos e preços para seus produtos
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Inputs */}
        <div className="bg-card rounded-3xl p-6 shadow-candy space-y-5">
          <h2 className="font-display text-xl text-foreground mb-4">Custos</h2>

          {[
            { label: 'Custo de Ingredientes', value: ingredientCost, set: setIngredientCost },
            { label: 'Embalagem', value: packagingCost, set: setPackagingCost },
            { label: 'Taxa Hora (R$/h)', value: laborHourRate, set: setLaborHourRate },
            { label: 'Tempo de Produção (min)', value: productionMinutes, set: setProductionMinutes },
            { label: 'Preço Atual', value: currentPrice, set: setCurrentPrice },
          ].map((input) => (
            <div key={input.label}>
              <label className="font-body text-xs font-semibold text-foreground/70 mb-1.5 block">
                {input.label}
              </label>
              <input
                type="number"
                value={input.value}
                onChange={(e) => input.set(Number(e.target.value))}
                className="w-full px-4 py-2.5 rounded-2xl bg-muted border-0 font-body text-sm text-foreground tabular-nums focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          ))}
        </div>

        {/* Results */}
        <div className="space-y-4">
          <div className="bg-card rounded-3xl p-6 shadow-candy">
            <h2 className="font-display text-xl text-foreground mb-5">Resultado</h2>

            <div className="space-y-4">
              {[
                { label: 'Custo Total', value: formatCurrency(totalCost) },
                { label: 'Preço Sugerido (Markup 3x)', value: formatCurrency(suggestedPrice), highlight: true },
                { label: 'Lucro Líquido (preço atual)', value: formatCurrency(profit), color: profit >= 0 ? 'text-[#25D366]' : 'text-destructive' },
                { label: 'Margem de Lucro', value: `${margin.toFixed(1)}%`, color: margin >= 50 ? 'text-[#25D366]' : margin >= 30 ? 'text-candy-gold' : 'text-destructive' },
              ].map((r) => (
                <div key={r.label} className="flex items-center justify-between py-3 border-b border-border/50 last:border-0">
                  <span className="font-body text-sm text-muted-foreground">{r.label}</span>
                  <span className={`font-display text-xl ${r.color || 'text-foreground'} ${r.highlight ? 'text-primary' : ''}`}>
                    {r.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Comparison */}
          <div className="bg-card rounded-3xl p-6 shadow-candy">
            <h3 className="font-body text-sm font-semibold text-foreground/70 mb-4">Comparação de Preço</h3>
            <div className="flex items-end gap-4">
              <div className="flex-1">
                <p className="font-body text-xs text-muted-foreground mb-2">Preço Atual</p>
                <div className="h-24 bg-secondary rounded-2xl flex items-end justify-center pb-3">
                  <span className="font-body font-semibold text-foreground tabular-nums">{formatCurrency(currentPrice)}</span>
                </div>
              </div>
              <div className="flex-1">
                <p className="font-body text-xs text-muted-foreground mb-2">Preço Sugerido</p>
                <div
                  className="bg-primary/10 rounded-2xl flex items-end justify-center pb-3"
                  style={{ height: `${Math.max(96, (suggestedPrice / Math.max(currentPrice, 1)) * 96)}px` }}
                >
                  <span className="font-body font-semibold text-primary tabular-nums">{formatCurrency(suggestedPrice)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
