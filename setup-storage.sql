-- ============================================
-- STORAGE SETUP FOR IMAGES
-- ============================================

-- 1. Create Buckets (if they don't exist)
INSERT INTO storage.buckets (id, name, public)
VALUES 
  ('categories', 'categories', true),
  ('products', 'products', true)
ON CONFLICT (id) DO NOTHING;

-- 2. Enable RLS
-- (Buckets usually have RLS enabled by default, but policies are needed)

-- ============================================
-- POLICIES FOR CATEGORIES BUCKET
-- ============================================

-- Allow public read access
CREATE POLICY "Public Access Categories"
ON storage.objects FOR SELECT
USING ( bucket_id = 'categories' );

-- Allow authenticated users (admins) to upload
CREATE POLICY "Admin Upload Categories"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK ( bucket_id = 'categories' );

-- Allow authenticated users to update/delete
CREATE POLICY "Admin Update Categories"
ON storage.objects FOR UPDATE
TO authenticated
USING ( bucket_id = 'categories' );

CREATE POLICY "Admin Delete Categories"
ON storage.objects FOR DELETE
TO authenticated
USING ( bucket_id = 'categories' );

-- ============================================
-- POLICIES FOR PRODUCTS BUCKET
-- ============================================

-- Allow public read access
CREATE POLICY "Public Access Products"
ON storage.objects FOR SELECT
USING ( bucket_id = 'products' );

-- Allow authenticated users (admins) to upload
CREATE POLICY "Admin Upload Products"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK ( bucket_id = 'products' );

-- Allow authenticated users to update/delete
CREATE POLICY "Admin Update Products"
ON storage.objects FOR UPDATE
TO authenticated
USING ( bucket_id = 'products' );

CREATE POLICY "Admin Delete Products"
ON storage.objects FOR DELETE
TO authenticated
USING ( bucket_id = 'products' );
