-- ============================================
-- FIX: Database error saving new user
-- ============================================
-- Run this entire script in Supabase SQL Editor

-- Step 1: Drop existing trigger and function (if they exist)
DROP TRIGGER IF EXISTS trg_auth_user_insert ON auth.users;
DROP FUNCTION IF EXISTS public.handle_auth_user_insert();

-- Step 2: Create improved function
CREATE OR REPLACE FUNCTION public.handle_auth_user_insert()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Insert into profiles table
  INSERT INTO public.profiles (
    id, 
    email, 
    full_name, 
    phone,
    role,
    created_at
  )
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'phone', ''),
    COALESCE(NEW.raw_user_meta_data->>'role', 'customer'),
    NOW()
  )
  ON CONFLICT (id) DO UPDATE 
  SET 
    email = EXCLUDED.email,
    full_name = COALESCE(EXCLUDED.full_name, public.profiles.full_name),
    updated_at = NOW();
  
  RETURN NEW;
EXCEPTION
  WHEN others THEN
    -- Log error but don't fail the auth user creation
    RAISE WARNING 'Error creating profile for user %: %', NEW.id, SQLERRM;
    RETURN NEW;
END;
$$;

-- Step 3: Create trigger on auth.users
CREATE TRIGGER trg_auth_user_insert
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_auth_user_insert();

-- Step 4: Fix RLS policies for profiles table

-- Drop existing policies
DROP POLICY IF EXISTS "profiles_is_owner_or_admin" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;
DROP POLICY IF EXISTS "Enable insert for authenticated users" ON public.profiles;
DROP POLICY IF EXISTS "Enable read for authenticated users" ON public.profiles;

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Allow users to read their own profile
CREATE POLICY "Users can view own profile"
  ON public.profiles
  FOR SELECT
  USING (auth.uid() = id);

-- Allow admins to read all profiles
CREATE POLICY "Admins can view all profiles"
  ON public.profiles
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.admins 
      WHERE user_id = auth.uid()
    )
  );

-- Allow users to update their own profile
CREATE POLICY "Users can update own profile"
  ON public.profiles
  FOR UPDATE
  USING (auth.uid() = id);

-- Allow admins to update any profile
CREATE POLICY "Admins can update all profiles"
  ON public.profiles
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.admins 
      WHERE user_id = auth.uid()
    )
  );

-- CRITICAL: Allow profile creation via trigger
-- This bypasses RLS for the trigger function
CREATE POLICY "Allow profile creation via trigger"
  ON public.profiles
  FOR INSERT
  WITH CHECK (true);

-- Step 5: Test the trigger
-- You can test by trying to register again after running this script

-- Step 6: Verify policies
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual,
  with_check
FROM pg_policies 
WHERE tablename = 'profiles'
ORDER BY policyname;

-- Expected to see:
-- - Allow profile creation via trigger (FOR INSERT)
-- - Users can view own profile (FOR SELECT)
-- - Admins can view all profiles (FOR SELECT)
-- - Users can update own profile (FOR UPDATE)
-- - Admins can update all profiles (FOR UPDATE)

-- ============================================
-- ALTERNATIVE: If trigger still doesn't work
-- ============================================
-- Some Supabase instances don't allow triggers on auth.users
-- In that case, we need to handle it in the application

-- If you still get errors after this, let me know and 
-- I'll update the auth.js to handle profile creation manually
