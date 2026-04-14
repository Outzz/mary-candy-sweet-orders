import { useOrders } from '@/hooks/useOrders';
import { formatCurrency } from '@/lib/whatsapp';
import { DollarSign, ShoppingBag, TrendingUp, Package } from 'lucide-react';
import { useProducts } from '@/hooks/useProducts';

export default function AdminDashboard() {
  const { data: orders = [], isLoading } = useOrders();
  const { data: products } = useProducts();

  const totalRevenue = orders.reduce((s, o) => s + Number(o.total), 0);
  const totalOrders = orders.length;
  const avgOrder = totalOrders > 0 ? totalRevenue / totalOrders : 0;
  const activeProducts = products?.length ?? 0;

  return (
    <div>
      <h1 className="font-display text-3xl text-foreground mb-8">Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Receita Total', value: formatCurrency(totalRevenue), icon: DollarSign, color: 'text-primary' },
          { label: 'Total de Pedidos', value: totalOrders.toString(), icon: ShoppingBag, color: 'text-primary' },
          { label: 'Ticket Médio', value: formatCurrency(avgOrder), icon: TrendingUp, color: 'text-primary' },
          { label: 'Produtos Ativos', value: activeProducts.toString(), icon: Package, color: 'text-primary' },
        ].map((stat) => (
          <div key={stat.label} className="bg-card rounded-3xl p-5 shadow-candy">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-2xl bg-secondary flex items-center justify-center">
                <stat.icon className={`w-5 h-5 ${stat.color}`} strokeWidth={1.5} />
              </div>
              <span className="font-body text-xs text-muted-foreground">{stat.label}</span>
            </div>
            <p className="font-display text-2xl text-foreground">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Recent orders */}
      <div className="bg-card rounded-3xl p-6 shadow-candy">
        <h2 className="font-display text-xl text-foreground mb-5">Pedidos Recentes</h2>
        {isLoading ? (
          <p className="text-muted-foreground font-body text-sm">Carregando...</p>
        ) : orders.length === 0 ? (
          <p className="text-muted-foreground font-body text-sm">Nenhum pedido registrado ainda.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left font-body text-xs font-semibold text-muted-foreground pb-3">Data</th>
                  <th className="text-left font-body text-xs font-semibold text-muted-foreground pb-3">Itens</th>
                  <th className="text-left font-body text-xs font-semibold text-muted-foreground pb-3">Total</th>
                </tr>
              </thead>
              <tbody>
                {orders.slice(0, 10).map((order) => (
                  <tr key={order.id} className="border-b border-border/50">
                    <td className="py-3 font-body text-sm text-foreground">
                      {new Date(order.created_at).toLocaleDateString('pt-BR')}
                    </td>
                    <td className="py-3 font-body text-sm text-foreground">
                      {(order.items as any[]).map(i => `${i.quantity}x ${i.name}`).join(', ')}
                    </td>
                    <td className="py-3 font-body text-sm text-foreground tabular-nums">
                      {formatCurrency(Number(order.total))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
