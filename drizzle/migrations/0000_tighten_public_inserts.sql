DROP POLICY IF EXISTS "Anyone can create feedbacks" ON public.feedbacks;
CREATE POLICY "Anyone can create valid feedbacks" ON public.feedbacks FOR INSERT TO anon, authenticated
WITH CHECK (
  char_length(btrim(name)) BETWEEN 1 AND 100
  AND char_length(btrim(message)) BETWEEN 1 AND 2000
  AND (rating IS NULL OR rating BETWEEN 1 AND 5)
);
DROP POLICY IF EXISTS "Anyone can create orders" ON public.orders;
CREATE POLICY "Anyone can create valid orders" ON public.orders FOR INSERT TO anon, authenticated
WITH CHECK (
  jsonb_typeof(items) = 'array'
  AND jsonb_array_length(items) BETWEEN 1 AND 50
  AND total > 0 AND total <= 100000
);