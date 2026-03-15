import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import MenuPage from "./pages/MenuPage.tsx";
import AdminPage from "./pages/AdminPage.tsx";
import AdminDashboard from "./pages/AdminDashboard.tsx";
import AdminProducts from "./pages/AdminProducts.tsx";
import AdminCalculator from "./pages/AdminCalculator.tsx";
import AdminCharts from "./pages/AdminCharts.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/cardapio" element={<MenuPage />} />
          <Route path="/admin" element={<AdminPage />}>
            <Route index element={<AdminDashboard />} />
            <Route path="produtos" element={<AdminProducts />} />
            <Route path="calculadora" element={<AdminCalculator />} />
            <Route path="graficos" element={<AdminCharts />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
