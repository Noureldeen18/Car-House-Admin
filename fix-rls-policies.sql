-- ============================================
-- FIX RLS POLICIES FOR ADMIN OPERATIONS
-- Run this script to fix insert/update/delete permissions
-- ============================================

-- Drop existing problematic policies and recreate with proper permissions

-- ============================================
-- FIX CATEGORIES POLICIES
-- ============================================
DROP POLICY IF EXISTS "categories_all_admin" ON categories;
CREATE POLICY "categories_insert_admin" ON categories FOR INSERT WITH CHECK (is_admin());
CREATE POLICY "categories_update_admin" ON categories FOR UPDATE USING (is_admin());
CREATE POLICY "categories_delete_admin" ON categories FOR DELETE USING (is_admin());

-- ============================================
-- FIX PRODUCTS POLICIES
-- ============================================
DROP POLICY IF EXISTS "products_all_admin" ON products;
CREATE POLICY "products_insert_admin" ON products FOR INSERT WITH CHECK (is_admin());
CREATE POLICY "products_update_admin" ON products FOR UPDATE USING (is_admin());
CREATE POLICY "products_delete_admin" ON products FOR DELETE USING (is_admin());

-- ============================================
-- FIX PRODUCT IMAGES POLICIES
-- ============================================
DROP POLICY IF EXISTS "product_images_all_admin" ON product_images;
CREATE POLICY "product_images_insert_admin" ON product_images FOR INSERT WITH CHECK (is_admin());
CREATE POLICY "product_images_update_admin" ON product_images FOR UPDATE USING (is_admin());
CREATE POLICY "product_images_delete_admin" ON product_images FOR DELETE USING (is_admin());

-- ============================================
-- FIX SERVICE TYPES POLICIES
-- ============================================
DROP POLICY IF EXISTS "service_types_all_admin" ON service_types;
CREATE POLICY "service_types_insert_admin" ON service_types FOR INSERT WITH CHECK (is_admin());
CREATE POLICY "service_types_update_admin" ON service_types FOR UPDATE USING (is_admin());
CREATE POLICY "service_types_delete_admin" ON service_types FOR DELETE USING (is_admin());

-- ============================================
-- FIX WORKSHOP BOOKINGS POLICIES (add insert for admin)
-- ============================================
DROP POLICY IF EXISTS "bookings_insert_own" ON workshop_bookings;
CREATE POLICY "bookings_insert_auth" ON workshop_bookings FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
-- Ensure admin delete policy exists
DROP POLICY IF EXISTS "bookings_delete_admin" ON workshop_bookings;
CREATE POLICY "bookings_delete_admin" ON workshop_bookings FOR DELETE USING (is_admin());

-- ============================================
-- FIX ORDERS POLICIES (add delete for admin)
-- ============================================
CREATE POLICY "orders_delete_admin" ON orders FOR DELETE USING (is_admin());

-- Also add delete policy for order_items
CREATE POLICY "order_items_update_admin" ON order_items FOR UPDATE USING (is_admin());
CREATE POLICY "order_items_delete_admin" ON order_items FOR DELETE USING (is_admin());

-- ============================================
-- FIX STORES POLICIES
-- ============================================
DROP POLICY IF EXISTS "stores_all_admin" ON stores;
CREATE POLICY "stores_insert_admin" ON stores FOR INSERT WITH CHECK (is_admin());
CREATE POLICY "stores_update_admin" ON stores FOR UPDATE USING (is_admin());
CREATE POLICY "stores_delete_admin" ON stores FOR DELETE USING (is_admin());

-- ============================================
-- FIX INVENTORY POLICIES
-- ============================================
DROP POLICY IF EXISTS "inventory_all_admin" ON inventory;
CREATE POLICY "inventory_insert_admin" ON inventory FOR INSERT WITH CHECK (is_admin());
CREATE POLICY "inventory_update_admin" ON inventory FOR UPDATE USING (is_admin());
CREATE POLICY "inventory_delete_admin" ON inventory FOR DELETE USING (is_admin());

-- ============================================
-- FIX SUPPLIERS POLICIES
-- ============================================
DROP POLICY IF EXISTS "suppliers_all_admin" ON suppliers;
CREATE POLICY "suppliers_insert_admin" ON suppliers FOR INSERT WITH CHECK (is_admin());
CREATE POLICY "suppliers_update_admin" ON suppliers FOR UPDATE USING (is_admin());
CREATE POLICY "suppliers_delete_admin" ON suppliers FOR DELETE USING (is_admin());

-- ============================================
-- FIX SHIPMENTS POLICIES
-- ============================================
DROP POLICY IF EXISTS "shipments_all_admin" ON shipments;
CREATE POLICY "shipments_insert_admin" ON shipments FOR INSERT WITH CHECK (is_admin());
CREATE POLICY "shipments_update_admin" ON shipments FOR UPDATE USING (is_admin());
CREATE POLICY "shipments_delete_admin" ON shipments FOR DELETE USING (is_admin());

-- ============================================
-- FIX MEDIA POLICIES
-- ============================================
DROP POLICY IF EXISTS "media_all_admin" ON media;
CREATE POLICY "media_update_admin" ON media FOR UPDATE USING (is_admin());
CREATE POLICY "media_delete_admin" ON media FOR DELETE USING (is_admin());

-- ============================================
-- FIX NOTIFICATIONS POLICIES
-- ============================================
DROP POLICY IF EXISTS "notifications_all_admin" ON notifications;
CREATE POLICY "notifications_insert_admin" ON notifications FOR INSERT WITH CHECK (is_admin());
CREATE POLICY "notifications_update_admin" ON notifications FOR UPDATE USING (is_admin());
CREATE POLICY "notifications_delete_admin" ON notifications FOR DELETE USING (is_admin());

-- ============================================
-- FIX SETTINGS POLICIES
-- ============================================
DROP POLICY IF EXISTS "settings_all_admin" ON settings;
CREATE POLICY "settings_insert_admin" ON settings FOR INSERT WITH CHECK (is_admin());
CREATE POLICY "settings_update_admin" ON settings FOR UPDATE USING (is_admin());
CREATE POLICY "settings_delete_admin" ON settings FOR DELETE USING (is_admin());

-- ============================================
-- FIX COUPONS POLICIES
-- ============================================
DROP POLICY IF EXISTS "coupons_all_admin" ON coupons;
CREATE POLICY "coupons_insert_admin" ON coupons FOR INSERT WITH CHECK (is_admin());
CREATE POLICY "coupons_update_admin" ON coupons FOR UPDATE USING (is_admin());
CREATE POLICY "coupons_delete_admin" ON coupons FOR DELETE USING (is_admin());

-- ============================================
-- FIX REVIEWS POLICIES (allow admin to delete)
-- ============================================
CREATE POLICY "reviews_delete_admin" ON reviews FOR DELETE USING (is_admin());
