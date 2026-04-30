CREATE TABLE public.feedbacks (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  message TEXT NOT NULL,
  rating INTEGER,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.feedbacks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can create feedbacks"
ON public.feedbacks
FOR INSERT
TO public
WITH CHECK (true);

CREATE POLICY "Admin can read all feedbacks"
ON public.feedbacks
FOR SELECT
TO authenticated
USING (is_admin());

CREATE POLICY "Admin can delete feedbacks"
ON public.feedbacks
FOR DELETE
TO authenticated
USING (is_admin());