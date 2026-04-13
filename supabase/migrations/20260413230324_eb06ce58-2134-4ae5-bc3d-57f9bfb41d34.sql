-- Drop overly permissive policies
DROP POLICY "Authenticated users can read all products" ON public.products;
DROP POLICY "Authenticated users can insert products" ON public.products;
DROP POLICY "Authenticated users can update products" ON public.products;
DROP POLICY "Authenticated users can delete products" ON public.products;

-- Helper function to check if user is admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT (auth.jwt() ->> 'email') = 'mariana.creator8@gmail.com'
$$;

-- Authenticated admin can read all products (including hidden)
CREATE POLICY "Admin can read all products"
ON public.products FOR SELECT
TO authenticated
USING (public.is_admin());

-- Admin can insert
CREATE POLICY "Admin can insert products"
ON public.products FOR INSERT
TO authenticated
WITH CHECK (public.is_admin());

-- Admin can update
CREATE POLICY "Admin can update products"
ON public.products FOR UPDATE
TO authenticated
USING (public.is_admin());

-- Admin can delete
CREATE POLICY "Admin can delete products"
ON public.products FOR DELETE
TO authenticated
USING (public.is_admin());

-- Fix storage policies
DROP POLICY "Anyone can view product images" ON storage.objects;
DROP POLICY "Authenticated users can upload product images" ON storage.objects;
DROP POLICY "Authenticated users can update product images" ON storage.objects;
DROP POLICY "Authenticated users can delete product images" ON storage.objects;

-- Restrict storage listing to specific paths only
CREATE POLICY "Anyone can view product images"
ON storage.objects FOR SELECT
USING (bucket_id = 'product-images' AND (storage.filename(name) IS NOT NULL));

-- Admin can upload product images
CREATE POLICY "Admin can upload product images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'product-images' AND public.is_admin());

-- Admin can update product images
CREATE POLICY "Admin can update product images"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'product-images' AND public.is_admin());

-- Admin can delete product images
CREATE POLICY "Admin can delete product images"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'product-images' AND public.is_admin());