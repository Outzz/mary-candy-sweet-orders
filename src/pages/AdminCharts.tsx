import { useAdmin } from '@/store/admin';
import { formatCurrency } from '@/lib/whatsapp';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

export default function AdminCharts() {
  const { monthlySales } = useAdmin();

  return (
    <div>
      <h1 className="font-display text-3xl text-foreground mb-8">Gráficos de Vendas</h1>

      <div className="grid gap-6">
        {/* Revenue chart */}
        <div className="bg-card rounded-3xl p-6 shadow-candy">
          <h2 className="font-display text-xl text-foreground mb-6">Receita Mensal</h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlySales}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(340, 70%, 60%)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(340, 70%, 60%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(340, 30%, 92%)" />
                <XAxis dataKey="month" tick={{ fontSize: 12, fontFamily: 'Outfit' }} stroke="hsl(20, 15%, 50%)" />
                <YAxis tick={{ fontSize: 12, fontFamily: 'Outfit' }} stroke="hsl(20, 15%, 50%)" tickFormatter={(v) => `R$${v}`} />
                <Tooltip
                  formatter={(value: number) => [formatCurrency(value), 'Receita']}
                  contentStyle={{
                    borderRadius: '16px',
                    border: 'none',
                    boxShadow: '0 8px 30px rgb(0 0 0 / 0.08)',
                    fontFamily: 'Outfit',
                  }}
                />
                <Area type="monotone" dataKey="revenue" stroke="hsl(340, 70%, 60%)" fill="url(#colorRevenue)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Orders chart */}
        <div className="bg-card rounded-3xl p-6 shadow-candy">
          <h2 className="font-display text-xl text-foreground mb-6">Pedidos por Mês</h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlySales}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(340, 30%, 92%)" />
                <XAxis dataKey="month" tick={{ fontSize: 12, fontFamily: 'Outfit' }} stroke="hsl(20, 15%, 50%)" />
                <YAxis tick={{ fontSize: 12, fontFamily: 'Outfit' }} stroke="hsl(20, 15%, 50%)" />
                <Tooltip
                  formatter={(value: number) => [value, 'Pedidos']}
                  contentStyle={{
                    borderRadius: '16px',
                    border: 'none',
                    boxShadow: '0 8px 30px rgb(0 0 0 / 0.08)',
                    fontFamily: 'Outfit',
                  }}
                />
                <Bar dataKey="orders" fill="hsl(340, 82%, 92%)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
