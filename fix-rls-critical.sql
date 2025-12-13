-- ============================================
-- CRITICAL RLS FIX
-- Run this script to fix the "infinite recursion" RLS bug
-- ============================================

-- 1. First, temporarily disable RLS on admins to break the loop
ALTER TABLE admins DISABLE ROW LEVEL SECURITY;

-- 2. Drop the problematic recursive policy on admins table
DROP POLICY IF EXISTS "admins_select_admin" ON admins;
DROP POLICY IF EXISTS "admins_all_superadmin" ON admins;

-- 3. Create a safe policy for admins (allow users to read their OWN admin status)
-- This allows is_admin() to work without recursion
CREATE POLICY "admins_read_own" ON admins FOR SELECT USING (user_id = auth.uid());

-- 4. Re-enable RLS on admins
ALTER TABLE admins ENABLE ROW LEVEL SECURITY;

-- 5. Redefine is_admin just to be safe (Security Definer ensures it runs with owner privileges)
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM admins WHERE user_id = auth.uid()
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================
-- FIX CRUD POLICIES (Insert/Update/Delete) for all tables
-- ============================================

-- Helper macro to simple fix a table (Drop all policies and re-add simple ones)
-- We do this manually for each table to be safe

-- CATEGORIES
DROP POLICY IF EXISTS "categories_select_all" ON categories;
DROP POLICY IF EXISTS "categories_all_admin" ON categories;
DROP POLICY IF EXISTS "categories_insert_admin" ON categories;
DROP POLICY IF EXISTS "categories_update_admin" ON categories;
DROP POLICY IF EXISTS "categories_delete_admin" ON categories;
-- Re-apply
CREATE POLICY "categories_select_all" ON categories FOR SELECT USING (true);
CREATE POLICY "categories_insert_admin" ON categories FOR INSERT WITH CHECK (is_admin());
CREATE POLICY "categories_update_admin" ON categories FOR UPDATE USING (is_admin());
CREATE POLICY "categories_delete_admin" ON categories FOR DELETE USING (is_admin());

-- PRODUCTS
DROP POLICY IF EXISTS "products_select_all" ON products;
DROP POLICY IF EXISTS "products_all_admin" ON products;
DROP POLICY IF EXISTS "products_insert_admin" ON products;
DROP POLICY IF EXISTS "products_update_admin" ON products;
DROP POLICY IF EXISTS "products_delete_admin" ON products;
-- Re-apply
CREATE POLICY "products_select_all" ON products FOR SELECT USING (true);
CREATE POLICY "products_insert_admin" ON products FOR INSERT WITH CHECK (is_admin());
CREATE POLICY "products_update_admin" ON products FOR UPDATE USING (is_admin());
CREATE POLICY "products_delete_admin" ON products FOR DELETE USING (is_admin());

-- SERVICE TYPES
DROP POLICY IF EXISTS "service_types_select_all" ON service_types;
DROP POLICY IF EXISTS "service_types_all_admin" ON service_types;
DROP POLICY IF EXISTS "service_types_insert_admin" ON service_types;
DROP POLICY IF EXISTS "service_types_update_admin" ON service_types;
DROP POLICY IF EXISTS "service_types_delete_admin" ON service_types;
-- Re-apply
CREATE POLICY "service_types_select_all" ON service_types FOR SELECT USING (true);
CREATE POLICY "service_types_insert_admin" ON service_types FOR INSERT WITH CHECK (is_admin());
CREATE POLICY "service_types_update_admin" ON service_types FOR UPDATE USING (is_admin());
CREATE POLICY "service_types_delete_admin" ON service_types FOR DELETE USING (is_admin());

-- WORKSHOP BOOKINGS
DROP POLICY IF EXISTS "bookings_select_own" ON workshop_bookings;
DROP POLICY IF EXISTS "bookings_select_admin" ON workshop_bookings;
DROP POLICY IF EXISTS "bookings_insert_own" ON workshop_bookings;
DROP POLICY IF EXISTS "bookings_insert_auth" ON workshop_bookings;
DROP POLICY IF EXISTS "bookings_update_admin" ON workshop_bookings;
DROP POLICY IF EXISTS "bookings_delete_admin" ON workshop_bookings;
-- Re-apply
CREATE POLICY "bookings_select_own" ON workshop_bookings FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "bookings_select_admin" ON workshop_bookings FOR SELECT USING (is_admin());
CREATE POLICY "bookings_insert_any_auth" ON workshop_bookings FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "bookings_update_admin" ON workshop_bookings FOR UPDATE USING (is_admin());
CREATE POLICY "bookings_delete_admin" ON workshop_bookings FOR DELETE USING (is_admin());

-- ORDERS
DROP POLICY IF EXISTS "orders_delete_admin" ON orders;
CREATE POLICY "orders_delete_admin" ON orders FOR DELETE USING (is_admin());

-- ORDER ITEMS
DROP POLICY IF EXISTS "order_items_delete_admin" ON order_items;
CREATE POLICY "order_items_delete_admin" ON order_items FOR DELETE USING (is_admin());
