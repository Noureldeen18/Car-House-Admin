-- ============================================
-- FIX ADMINS TABLE RLS POLICY
-- ============================================
-- Run this in Supabase SQL Editor to allow 
-- authenticated users to check their own admin status

-- First, drop existing policies that might be blocking
DROP POLICY IF EXISTS "admins_select_admin" ON admins;
DROP POLICY IF EXISTS "admins_all_superadmin" ON admins;
DROP POLICY IF EXISTS "admins_select_own" ON admins;

-- Allow ANY authenticated user to check if THEY are an admin
-- This is necessary for the login flow to work
CREATE POLICY "admins_select_own" ON admins 
  FOR SELECT 
  USING (auth.uid() = user_id);

-- Allow superadmins to manage all admin records
CREATE POLICY "admins_all_superadmin" ON admins 
  FOR ALL 
  USING (
    EXISTS (
      SELECT 1 FROM admins 
      WHERE user_id = auth.uid() AND role = 'superadmin'
    )
  );

-- Verify the policies
SELECT * FROM pg_policies WHERE tablename = 'admins';
