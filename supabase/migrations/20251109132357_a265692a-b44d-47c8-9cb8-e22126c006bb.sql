-- Create table to cache product images permanently
CREATE TABLE IF NOT EXISTS public.product_images_cache (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_name TEXT NOT NULL UNIQUE,
  search_query TEXT NOT NULL,
  image_urls TEXT[] NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.product_images_cache ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read cached images
CREATE POLICY "Anyone can read cached images"
  ON public.product_images_cache
  FOR SELECT
  TO PUBLIC
  USING (true);

-- Only service role can insert/update cached images
CREATE POLICY "Service role can manage cached images"
  ON public.product_images_cache
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_product_images_cache_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for updated_at
CREATE TRIGGER update_product_images_cache_updated_at
  BEFORE UPDATE ON public.product_images_cache
  FOR EACH ROW
  EXECUTE FUNCTION public.update_product_images_cache_updated_at();