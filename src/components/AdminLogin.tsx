import { useState } from 'react';
import { useAdmin } from '@/store/admin';
import { Lock } from 'lucide-react';
import { motion } from 'framer-motion';

export function AdminLogin() {
  const { login } = useAdmin();
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!login(password)) {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="min-h-screen gradient-hero flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-card rounded-3xl p-8 shadow-candy-float w-full max-w-sm"
      >
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8 text-primary" strokeWidth={1.5} />
          </div>
          <h1 className="font-display text-2xl text-foreground">Área Admin</h1>
          <p className="text-muted-foreground font-body text-sm mt-1">Mary Candy — Painel de Gestão</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Senha de acesso"
            className="w-full px-4 py-3 rounded-2xl bg-muted border-0 font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
          {error && (
            <p className="text-destructive font-body text-xs text-center">Senha incorreta</p>
          )}
          <button
            type="submit"
            className="w-full px-4 py-3 rounded-full bg-primary text-primary-foreground font-body font-semibold hover:opacity-90 transition-opacity"
          >
            Entrar
          </button>
        </form>

        <p className="text-muted-foreground/50 font-body text-xs text-center mt-6">
          Senha padrão: marycandy2024
        </p>
      </motion.div>
    </div>
  );
}
