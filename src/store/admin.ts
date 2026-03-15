import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface AdminOrder {
  id: string;
  date: string;
  items: string;
  total: number;
  status: 'pending' | 'confirmed' | 'delivered';
}

export interface MonthlySales {
  month: string;
  revenue: number;
  orders: number;
}

interface AdminState {
  isAuthenticated: boolean;
  orders: AdminOrder[];
  monthlySales: MonthlySales[];
  login: (password: string) => boolean;
  logout: () => void;
  addOrder: (order: AdminOrder) => void;
  updateOrderStatus: (id: string, status: AdminOrder['status']) => void;
}

const ADMIN_PASSWORD = 'marycandy2024';

const defaultMonthlySales: MonthlySales[] = [
  { month: 'Jan', revenue: 2400, orders: 32 },
  { month: 'Fev', revenue: 3100, orders: 41 },
  { month: 'Mar', revenue: 4800, orders: 58 },
  { month: 'Abr', revenue: 3900, orders: 47 },
  { month: 'Mai', revenue: 3200, orders: 39 },
  { month: 'Jun', revenue: 2800, orders: 35 },
  { month: 'Jul', revenue: 3500, orders: 43 },
  { month: 'Ago', revenue: 4200, orders: 52 },
  { month: 'Set', revenue: 3800, orders: 46 },
  { month: 'Out', revenue: 4100, orders: 50 },
  { month: 'Nov', revenue: 5200, orders: 63 },
  { month: 'Dez', revenue: 6800, orders: 82 },
];

const defaultOrders: AdminOrder[] = [
  { id: '1', date: '2024-03-14', items: '50x Brigadeiros, 1x Travessa G', total: 169.00, status: 'delivered' },
  { id: '2', date: '2024-03-14', items: '2x Mousse Trufado P', total: 116.00, status: 'confirmed' },
  { id: '3', date: '2024-03-13', items: '1x Kit Degustação', total: 24.00, status: 'pending' },
  { id: '4', date: '2024-03-13', items: '100x Brigadeiros', total: 120.00, status: 'delivered' },
  { id: '5', date: '2024-03-12', items: '1x Ovo Especial - Ferrero', total: 45.00, status: 'confirmed' },
];

export const useAdmin = create<AdminState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      orders: defaultOrders,
      monthlySales: defaultMonthlySales,
      login: (password: string) => {
        if (password === ADMIN_PASSWORD) {
          set({ isAuthenticated: true });
          return true;
        }
        return false;
      },
      logout: () => set({ isAuthenticated: false }),
      addOrder: (order) =>
        set((state) => ({ orders: [order, ...state.orders] })),
      updateOrderStatus: (id, status) =>
        set((state) => ({
          orders: state.orders.map((o) => (o.id === id ? { ...o, status } : o)),
        })),
    }),
    { name: 'mary-candy-admin' }
  )
);
