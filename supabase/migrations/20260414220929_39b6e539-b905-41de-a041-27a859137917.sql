
-- Create orders table
CREATE TABLE public.orders (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  items JSONB NOT NULL DEFAULT '[]'::jsonb,
  total NUMERIC(10,2) NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Anyone can insert (checkout happens without auth)
CREATE POLICY "Anyone can create orders"
ON public.orders
FOR INSERT
TO public
WITH CHECK (true);

-- Only admin can read
CREATE POLICY "Admin can read all orders"
ON public.orders
FOR SELECT
TO authenticated
USING (public.is_admin());
