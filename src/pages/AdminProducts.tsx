import { useState, useRef } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Plus, Pencil, Trash2, Eye, EyeOff, Upload, X, Save, ChevronDown, ChevronUp } from 'lucide-react';
import { toast } from 'sonner';

interface DbProduct {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  category: string;
  sizes: any;
  packages: any;
  flavors: any;
  badge: string | null;
  seasonal: boolean | null;
  weight: string | null;
  image_url: string | null;
  flavor_images: any;
  max_flavors: any;
  visible: boolean | null;
  sort_order: number | null;
}

const categories = [
  { value: 'travessa', label: 'Travessa' },
  { value: 'mousse-tradicional', label: 'Mousse Tradicional' },
  { value: 'mousse-trufado', label: 'Mousse Trufado' },
  { value: 'brigadeiro', label: 'Brigadeiro' },
  { value: 'ovo-tradicional', label: 'Ovo Tradicional' },
  { value: 'ovo-especial', label: 'Ovo Especial' },
  { value: 'kit-degustacao', label: 'Kit Degustação' },
  { value: 'outro', label: 'Outro' },
];

function formatCurrency(value: number) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

export default function AdminProducts() {
  const queryClient = useQueryClient();
  const [editingProduct, setEditingProduct] = useState<DbProduct | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const { data: products = [], isLoading } = useQuery({
    queryKey: ['admin-products'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('sort_order', { ascending: true });
      if (error) throw error;
      return data as DbProduct[];
    },
  });

  const toggleVisibility = useMutation({
    mutationFn: async ({ id, visible }: { id: string; visible: boolean }) => {
      const { error } = await supabase
        .from('products')
        .update({ visible })
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-products'] });
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast.success('Visibilidade atualizada');
    },
  });

  const deleteProduct = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('products').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-products'] });
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast.success('Produto removido');
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display text-3xl text-foreground">Produtos</h1>
        <button
          onClick={() => setIsCreating(true)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-primary-foreground font-body font-semibold text-sm hover:opacity-90 transition-opacity"
        >
          <Plus className="w-4 h-4" />
          Novo Produto
        </button>
      </div>

      {isCreating && (
        <ProductForm
          onClose={() => setIsCreating(false)}
          onSaved={() => {
            setIsCreating(false);
            queryClient.invalidateQueries({ queryKey: ['admin-products'] });
            queryClient.invalidateQueries({ queryKey: ['products'] });
          }}
        />
      )}

      {editingProduct && (
        <ProductForm
          product={editingProduct}
          onClose={() => setEditingProduct(null)}
          onSaved={() => {
            setEditingProduct(null);
            queryClient.invalidateQueries({ queryKey: ['admin-products'] });
            queryClient.invalidateQueries({ queryKey: ['products'] });
          }}
        />
      )}

      <div className="grid gap-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-card rounded-3xl p-5 shadow-candy flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              {product.image_url && (
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="w-14 h-14 rounded-2xl object-cover"
                />
              )}
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-body font-semibold text-foreground">{product.name}</h3>
                  {product.seasonal && (
                    <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-body font-semibold">
                      Sazonal
                    </span>
                  )}
                  {product.badge && (
                    <span className="px-2 py-0.5 rounded-full bg-secondary text-muted-foreground text-xs font-body">
                      {product.badge}
                    </span>
                  )}
                  {!product.visible && (
                    <span className="px-2 py-0.5 rounded-full bg-destructive/10 text-destructive text-xs font-body font-semibold">
                      Oculto
                    </span>
                  )}
                </div>
                <p className="text-muted-foreground font-body text-sm">
                  {product.sizes && Array.isArray(product.sizes) && product.sizes.length > 0
                    ? product.sizes.map((s: any) => `${s.label}: ${formatCurrency(s.price)}`).join(' | ')
                    : product.packages && Array.isArray(product.packages) && product.packages.length > 0
                    ? product.packages.map((p: any) => `${p.label}: ${formatCurrency(p.price)}`).join(' | ')
                    : ''}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setEditingProduct(product)}
                className="p-2.5 rounded-full bg-secondary text-primary hover:bg-accent transition-colors"
              >
                <Pencil className="w-4 h-4" strokeWidth={1.5} />
              </button>
              <button
                onClick={() => toggleVisibility.mutate({ id: product.id, visible: !product.visible })}
                className={`p-2.5 rounded-full transition-colors ${
                  product.visible ? 'bg-secondary text-primary' : 'bg-muted text-muted-foreground'
                }`}
              >
                {product.visible ? (
                  <Eye className="w-4 h-4" strokeWidth={1.5} />
                ) : (
                  <EyeOff className="w-4 h-4" strokeWidth={1.5} />
                )}
              </button>
              <button
                onClick={() => {
                  if (confirm('Tem certeza que deseja remover este produto?')) {
                    deleteProduct.mutate(product.id);
                  }
                }}
                className="p-2.5 rounded-full bg-destructive/10 text-destructive hover:bg-destructive/20 transition-colors"
              >
                <Trash2 className="w-4 h-4" strokeWidth={1.5} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

interface ProductFormProps {
  product?: DbProduct;
  onClose: () => void;
  onSaved: () => void;
}

function ProductForm({ product, onClose, onSaved }: ProductFormProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    name: product?.name || '',
    slug: product?.slug || '',
    description: product?.description || '',
    category: product?.category || 'outro',
    badge: product?.badge || '',
    seasonal: product?.seasonal || false,
    weight: product?.weight || '',
    image_url: product?.image_url || '',
    visible: product?.visible ?? true,
    sort_order: product?.sort_order || 0,
    sizes: product?.sizes && Array.isArray(product.sizes) ? product.sizes : [],
    packages: product?.packages && Array.isArray(product.packages) ? product.packages : [],
    flavors: product?.flavors && Array.isArray(product.flavors) ? product.flavors : [],
    flavor_images: product?.flavor_images && typeof product.flavor_images === 'object' ? product.flavor_images : {},
    max_flavors: product?.max_flavors && typeof product.max_flavors === 'object' ? product.max_flavors : {},
  });

  const [newFlavor, setNewFlavor] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
  };

  const handleNameChange = (name: string) => {
    setForm((prev) => ({
      ...prev,
      name,
      slug: product ? prev.slug : generateSlug(name),
    }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const ext = file.name.split('.').pop();
    const fileName = `${form.slug || 'product'}-${Date.now()}.${ext}`;

    const { error } = await supabase.storage
      .from('product-images')
      .upload(fileName, file, { upsert: true });

    if (error) {
      toast.error('Erro ao enviar imagem');
      setUploading(false);
      return;
    }

    const { data: urlData } = supabase.storage
      .from('product-images')
      .getPublicUrl(fileName);

    setForm((prev) => ({ ...prev, image_url: urlData.publicUrl }));
    setUploading(false);
    toast.success('Imagem enviada');
  };

  const addSize = () => {
    setForm((prev) => ({
      ...prev,
      sizes: [...prev.sizes, { label: '', price: 0 }],
    }));
  };

  const updateSize = (index: number, field: string, value: any) => {
    setForm((prev) => ({
      ...prev,
      sizes: prev.sizes.map((s: any, i: number) =>
        i === index ? { ...s, [field]: field === 'price' ? parseFloat(value) || 0 : value } : s
      ),
    }));
  };

  const removeSize = (index: number) => {
    setForm((prev) => ({
      ...prev,
      sizes: prev.sizes.filter((_: any, i: number) => i !== index),
    }));
  };

  const addPackage = () => {
    setForm((prev) => ({
      ...prev,
      packages: [...prev.packages, { label: '', price: 0 }],
    }));
  };

  const updatePackage = (index: number, field: string, value: any) => {
    setForm((prev) => ({
      ...prev,
      packages: prev.packages.map((p: any, i: number) =>
        i === index ? { ...p, [field]: field === 'price' ? parseFloat(value) || 0 : value } : p
      ),
    }));
  };

  const removePackage = (index: number) => {
    setForm((prev) => ({
      ...prev,
      packages: prev.packages.filter((_: any, i: number) => i !== index),
    }));
  };

  const addFlavor = () => {
    if (newFlavor.trim()) {
      setForm((prev) => ({
        ...prev,
        flavors: [...prev.flavors, newFlavor.trim()],
      }));
      setNewFlavor('');
    }
  };

  const removeFlavor = (index: number) => {
    setForm((prev) => ({
      ...prev,
      flavors: prev.flavors.filter((_: any, i: number) => i !== index),
    }));
  };

  const handleSave = async () => {
    if (!form.name || !form.slug || !form.category) {
      toast.error('Preencha nome, slug e categoria');
      return;
    }

    setSaving(true);

    const payload = {
      name: form.name,
      slug: form.slug,
      description: form.description || null,
      category: form.category,
      badge: form.badge || null,
      seasonal: form.seasonal,
      weight: form.weight || null,
      image_url: form.image_url || null,
      visible: form.visible,
      sort_order: form.sort_order,
      sizes: form.sizes.length > 0 ? form.sizes : [],
      packages: form.packages.length > 0 ? form.packages : [],
      flavors: form.flavors,
      flavor_images: form.flavor_images,
      max_flavors: form.max_flavors,
    };

    let error;
    if (product) {
      ({ error } = await supabase
        .from('products')
        .update(payload)
        .eq('id', product.id));
    } else {
      ({ error } = await supabase.from('products').insert(payload));
    }

    setSaving(false);

    if (error) {
      toast.error('Erro ao salvar: ' + error.message);
      return;
    }

    toast.success(product ? 'Produto atualizado' : 'Produto criado');
    onSaved();
  };

  return (
    <div className="bg-card rounded-3xl p-6 shadow-candy-float mb-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-xl text-foreground">
          {product ? 'Editar Produto' : 'Novo Produto'}
        </h2>
        <button onClick={onClose} className="p-2 rounded-full hover:bg-muted transition-colors">
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="grid gap-4">
        {/* Image */}
        <div className="flex items-center gap-4">
          {form.image_url ? (
            <img src={form.image_url} alt="" className="w-20 h-20 rounded-2xl object-cover" />
          ) : (
            <div className="w-20 h-20 rounded-2xl bg-muted flex items-center justify-center">
              <Upload className="w-6 h-6 text-muted-foreground" />
            </div>
          )}
          <div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="px-4 py-2 rounded-full bg-secondary text-foreground font-body text-sm font-medium hover:bg-accent transition-colors disabled:opacity-50"
            >
              {uploading ? 'Enviando...' : 'Enviar Foto'}
            </button>
            {form.image_url && (
              <button
                onClick={() => setForm((prev) => ({ ...prev, image_url: '' }))}
                className="ml-2 text-destructive text-xs font-body"
              >
                Remover
              </button>
            )}
          </div>
        </div>

        {/* Name & slug */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="font-body text-xs font-semibold text-foreground/70 mb-1 block">Nome</label>
            <input
              value={form.name}
              onChange={(e) => handleNameChange(e.target.value)}
              className="w-full px-4 py-2.5 rounded-2xl bg-muted font-body text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Nome do produto"
            />
          </div>
          <div>
            <label className="font-body text-xs font-semibold text-foreground/70 mb-1 block">Slug</label>
            <input
              value={form.slug}
              onChange={(e) => setForm((prev) => ({ ...prev, slug: e.target.value }))}
              className="w-full px-4 py-2.5 rounded-2xl bg-muted font-body text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="slug-do-produto"
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="font-body text-xs font-semibold text-foreground/70 mb-1 block">Descrição</label>
          <textarea
            value={form.description}
            onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
            className="w-full px-4 py-2.5 rounded-2xl bg-muted font-body text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
            rows={2}
            placeholder="Descrição do produto"
          />
        </div>

        {/* Category, badge, seasonal */}
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="font-body text-xs font-semibold text-foreground/70 mb-1 block">Categoria</label>
            <select
              value={form.category}
              onChange={(e) => setForm((prev) => ({ ...prev, category: e.target.value }))}
              className="w-full px-4 py-2.5 rounded-2xl bg-muted font-body text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {categories.map((c) => (
                <option key={c.value} value={c.value}>{c.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="font-body text-xs font-semibold text-foreground/70 mb-1 block">Badge</label>
            <input
              value={form.badge}
              onChange={(e) => setForm((prev) => ({ ...prev, badge: e.target.value }))}
              className="w-full px-4 py-2.5 rounded-2xl bg-muted font-body text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Ex: Mais pedido"
            />
          </div>
          <div className="flex items-end gap-4">
            <label className="flex items-center gap-2 font-body text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={form.seasonal}
                onChange={(e) => setForm((prev) => ({ ...prev, seasonal: e.target.checked }))}
                className="rounded"
              />
              Sazonal
            </label>
            <label className="flex items-center gap-2 font-body text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={form.visible}
                onChange={(e) => setForm((prev) => ({ ...prev, visible: e.target.checked }))}
                className="rounded"
              />
              Visível
            </label>
          </div>
        </div>

        {/* Sizes */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="font-body text-xs font-semibold text-foreground/70">Tamanhos / Preços</label>
            <button onClick={addSize} className="text-primary text-xs font-body font-semibold flex items-center gap-1">
              <Plus className="w-3 h-3" /> Adicionar
            </button>
          </div>
          {form.sizes.map((size: any, i: number) => (
            <div key={i} className="flex items-center gap-2 mb-2">
              <input
                value={size.label}
                onChange={(e) => updateSize(i, 'label', e.target.value)}
                className="flex-1 px-3 py-2 rounded-xl bg-muted font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Ex: P, G, 250g"
              />
              <input
                type="number"
                step="0.01"
                value={size.price}
                onChange={(e) => updateSize(i, 'price', e.target.value)}
                className="w-28 px-3 py-2 rounded-xl bg-muted font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Preço"
              />
              <button onClick={() => removeSize(i)} className="text-destructive p-1">
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        {/* Packages (for brigadeiros) */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="font-body text-xs font-semibold text-foreground/70">Pacotes (brigadeiros)</label>
            <button onClick={addPackage} className="text-primary text-xs font-body font-semibold flex items-center gap-1">
              <Plus className="w-3 h-3" /> Adicionar
            </button>
          </div>
          {form.packages.map((pkg: any, i: number) => (
            <div key={i} className="flex items-center gap-2 mb-2">
              <input
                value={pkg.label}
                onChange={(e) => updatePackage(i, 'label', e.target.value)}
                className="flex-1 px-3 py-2 rounded-xl bg-muted font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Ex: 25 unidades"
              />
              <input
                type="number"
                step="0.01"
                value={pkg.price}
                onChange={(e) => updatePackage(i, 'price', e.target.value)}
                className="w-28 px-3 py-2 rounded-xl bg-muted font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Preço"
              />
              <button onClick={() => removePackage(i)} className="text-destructive p-1">
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        {/* Flavors */}
        <div>
          <label className="font-body text-xs font-semibold text-foreground/70 mb-2 block">Sabores</label>
          <div className="flex flex-wrap gap-2 mb-2">
            {form.flavors.map((flavor: string, i: number) => (
              <span
                key={i}
                className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-secondary text-foreground text-xs font-body"
              >
                {flavor}
                <button onClick={() => removeFlavor(i)} className="text-destructive">
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              value={newFlavor}
              onChange={(e) => setNewFlavor(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addFlavor())}
              className="flex-1 px-3 py-2 rounded-xl bg-muted font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Novo sabor"
            />
            <button
              onClick={addFlavor}
              className="px-4 py-2 rounded-xl bg-secondary text-foreground font-body text-sm font-medium hover:bg-accent transition-colors"
            >
              Adicionar
            </button>
          </div>
        </div>

        {/* Advanced */}
        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="flex items-center gap-2 text-muted-foreground font-body text-xs"
        >
          {showAdvanced ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          Configurações avançadas
        </button>

        {showAdvanced && (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="font-body text-xs font-semibold text-foreground/70 mb-1 block">Peso</label>
              <input
                value={form.weight}
                onChange={(e) => setForm((prev) => ({ ...prev, weight: e.target.value }))}
                className="w-full px-3 py-2 rounded-xl bg-muted font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Ex: 15g cada"
              />
            </div>
            <div>
              <label className="font-body text-xs font-semibold text-foreground/70 mb-1 block">Ordem</label>
              <input
                type="number"
                value={form.sort_order}
                onChange={(e) => setForm((prev) => ({ ...prev, sort_order: parseInt(e.target.value) || 0 }))}
                className="w-full px-3 py-2 rounded-xl bg-muted font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center justify-end gap-3 mt-6 pt-4 border-t border-border">
        <button
          onClick={onClose}
          className="px-5 py-2.5 rounded-full bg-secondary text-foreground font-body text-sm font-medium hover:bg-accent transition-colors"
        >
          Cancelar
        </button>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-primary-foreground font-body font-semibold text-sm hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          {saving ? 'Salvando...' : 'Salvar'}
        </button>
      </div>
    </div>
  );
}
