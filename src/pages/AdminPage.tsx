import { useAuth } from '@/hooks/useAuth';
import { AdminLogin } from '@/components/AdminLogin';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { LayoutDashboard, Package, Calculator, BarChart3, MessageCircle, LogOut } from 'lucide-react';

const navItems = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, exact: true },
  { to: '/admin/produtos', label: 'Produtos', icon: Package },
  { to: '/admin/calculadora', label: 'Calculadora', icon: Calculator },
  { to: '/admin/graficos', label: 'Gráficos', icon: BarChart3 },
  { to: '/admin/feedbacks', label: 'Feedbacks', icon: MessageCircle },
];

const AdminPage = () => {
  const { user, loading, signOut } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!user) return <AdminLogin />;

  return (
    <div className="min-h-screen bg-muted flex">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-card border-r border-border p-6">
        <Link to="/" className="font-display text-xl text-primary mb-8">Mary Candy</Link>
        <span className="font-body text-xs text-muted-foreground uppercase tracking-wider mb-4">Gestão</span>
        <nav className="flex flex-col gap-1 flex-1">
          {navItems.map((item) => {
            const active = item.exact
              ? location.pathname === item.to
              : location.pathname.startsWith(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-2xl font-body text-sm font-medium transition-colors ${
                  active ? 'bg-secondary text-primary' : 'text-foreground/70 hover:bg-muted'
                }`}
              >
                <item.icon className="w-4 h-4" strokeWidth={1.5} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <button
          onClick={signOut}
          className="flex items-center gap-3 px-4 py-2.5 rounded-2xl font-body text-sm font-medium text-muted-foreground hover:bg-muted transition-colors"
        >
          <LogOut className="w-4 h-4" strokeWidth={1.5} />
          Sair
        </button>
      </aside>

      {/* Mobile header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-card border-b border-border">
        <div className="flex items-center justify-between px-4 py-3">
          <Link to="/" className="font-display text-lg text-primary">Mary Candy</Link>
          <button onClick={signOut} className="text-muted-foreground">
            <LogOut className="w-4 h-4" strokeWidth={1.5} />
          </button>
        </div>
        <nav className="flex gap-1 px-4 pb-3 overflow-x-auto">
          {navItems.map((item) => {
            const active = item.exact
              ? location.pathname === item.to
              : location.pathname.startsWith(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center gap-2 px-3 py-2 rounded-full font-body text-xs font-medium whitespace-nowrap transition-colors ${
                  active ? 'bg-primary text-primary-foreground' : 'bg-secondary text-foreground/70'
                }`}
              >
                <item.icon className="w-3.5 h-3.5" strokeWidth={1.5} />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Main content */}
      <main className="flex-1 p-6 md:p-8 mt-24 md:mt-0 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminPage;
