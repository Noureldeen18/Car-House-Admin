-- ============================================
-- FIX STORAGE BUCKETS FOR PUBLIC ACCESS
-- ============================================
-- Run this in Supabase SQL Editor to fix image display issues

-- ============================================
-- 1. CREATE STORAGE BUCKETS (if not exist)
-- ============================================

-- Create categories bucket
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'categories',
  'categories',
  true,
  5242880, -- 5MB
  ARRAY['image/png', 'image/jpeg', 'image/jpg', 'image/gif', 'image/webp', 'image/svg+xml']
)
ON CONFLICT (id) DO UPDATE SET
  public = true,
  allowed_mime_types = ARRAY['image/png', 'image/jpeg', 'image/jpg', 'image/gif', 'image/webp', 'image/svg+xml'];

-- Create products bucket  
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'products',
  'products',
  true,
  10485760, -- 10MB
  ARRAY['image/png', 'image/jpeg', 'image/jpg', 'image/gif', 'image/webp', 'image/svg+xml']
)
ON CONFLICT (id) DO UPDATE SET
  public = true,
  allowed_mime_types = ARRAY['image/png', 'image/jpeg', 'image/jpg', 'image/gif', 'image/webp', 'image/svg+xml'];

-- ============================================
-- 2. DROP EXISTING POLICIES (clean slate)
-- ============================================

DROP POLICY IF EXISTS "Public Access" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can view categories" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can view products" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload to categories" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload to products" ON storage.objects;
DROP POLICY IF EXISTS "Admins can delete from categories" ON storage.objects;
DROP POLICY IF EXISTS "Admins can delete from products" ON storage.objects;

-- ============================================
-- 3. CREATE PUBLIC READ POLICIES
-- ============================================

-- Allow anyone to view files in categories bucket
CREATE POLICY "Anyone can view categories"
ON storage.objects FOR SELECT
USING (bucket_id = 'categories');

-- Allow anyone to view files in products bucket
CREATE POLICY "Anyone can view products"
ON storage.objects FOR SELECT
USING (bucket_id = 'products');

-- ============================================
-- 4. CREATE UPLOAD POLICIES (Authenticated Users)
-- ============================================

-- Allow authenticated users to upload to categories
CREATE POLICY "Authenticated users can upload to categories"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'categories' 
  AND auth.role() = 'authenticated'
);

-- Allow authenticated users to upload to products
CREATE POLICY "Authenticated users can upload to products"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'products' 
  AND auth.role() = 'authenticated'
);

-- ============================================
-- 5. CREATE UPDATE POLICIES
-- ============================================

-- Allow authenticated users to update their uploads
CREATE POLICY "Authenticated users can update categories"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'categories' 
  AND auth.role() = 'authenticated'
);

CREATE POLICY "Authenticated users can update products"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'products' 
  AND auth.role() = 'authenticated'
);

-- ============================================
-- 6. CREATE DELETE POLICIES (Admins only)
-- ============================================

-- Allow admins to delete from categories
CREATE POLICY "Admins can delete from categories"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'categories' 
  AND EXISTS (
    SELECT 1 FROM public.admins WHERE user_id = auth.uid()
  )
);

-- Allow admins to delete from products
CREATE POLICY "Admins can delete from products"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'products' 
  AND EXISTS (
    SELECT 1 FROM public.admins WHERE user_id = auth.uid()
  )
);

-- ============================================
-- VERIFY BUCKETS ARE PUBLIC
-- ============================================
SELECT id, name, public FROM storage.buckets WHERE id IN ('categories', 'products');
