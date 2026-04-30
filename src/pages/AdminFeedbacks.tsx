import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Star, Trash2, MessageCircle } from 'lucide-react';
import { toast } from 'sonner';

interface Feedback {
  id: string;
  name: string;
  message: string;
  rating: number | null;
  created_at: string;
}

export default function AdminFeedbacks() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('feedbacks')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) {
      toast.error('Erro ao carregar feedbacks');
    } else {
      setFeedbacks((data ?? []) as Feedback[]);
    }
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Excluir este feedback?')) return;
    const { error } = await supabase.from('feedbacks').delete().eq('id', id);
    if (error) {
      toast.error('Erro ao excluir');
      return;
    }
    setFeedbacks((prev) => prev.filter((f) => f.id !== id));
    toast.success('Feedback excluído');
  };

  return (
    <div>
      <h1 className="font-display text-3xl text-foreground mb-2">Feedbacks</h1>
      <p className="text-muted-foreground font-body text-sm mb-8">
        Mensagens enviadas pelos visitantes do site.
      </p>

      {loading ? (
        <p className="text-muted-foreground font-body text-sm">Carregando...</p>
      ) : feedbacks.length === 0 ? (
        <div className="bg-card rounded-3xl p-10 shadow-candy text-center">
          <MessageCircle className="w-10 h-10 text-muted-foreground mx-auto mb-3" strokeWidth={1.5} />
          <p className="text-muted-foreground font-body text-sm">Nenhum feedback recebido ainda.</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {feedbacks.map((f) => (
            <div key={f.id} className="bg-card rounded-3xl p-5 shadow-candy">
              <div className="flex items-start justify-between gap-4 mb-2">
                <div>
                  <p className="font-display text-lg text-foreground">{f.name}</p>
                  <p className="text-muted-foreground font-body text-xs">
                    {new Date(f.created_at).toLocaleString('pt-BR')}
                  </p>
                </div>
                <button
                  onClick={() => handleDelete(f.id)}
                  className="p-2 rounded-full hover:bg-muted text-muted-foreground hover:text-destructive transition-colors"
                  aria-label="Excluir"
                >
                  <Trash2 className="w-4 h-4" strokeWidth={1.5} />
                </button>
              </div>
              {f.rating ? (
                <div className="flex gap-0.5 mb-2">
                  {Array.from({ length: f.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-candy-gold text-candy-gold" strokeWidth={1.5} />
                  ))}
                </div>
              ) : null}
              <p className="text-foreground font-body text-sm whitespace-pre-wrap">{f.message}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
