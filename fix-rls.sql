-- ============================================
-- FIX RLS POLICY FOR USER REGISTRATION
-- ============================================

-- First, drop existing policies for users table
DROP POLICY IF EXISTS "Users can read own data" ON users;
DROP POLICY IF EXISTS "Admins can read all users" ON users;
DROP POLICY IF EXISTS "Admins can update users" ON users;
DROP POLICY IF EXISTS "Users can be created on signup" ON users;

-- ============================================
-- NEW POLICIES WITH PROPER PERMISSIONS
-- ============================================

-- Allow authenticated users to insert their own record
CREATE POLICY "Enable insert for authenticated users"
  ON users FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Allow service role to insert (for trigger)
CREATE POLICY "Enable insert for service role"
  ON users FOR INSERT
  TO service_role
  WITH CHECK (true);

-- Users can read their own data
CREATE POLICY "Users can read own data"
  ON users FOR SELECT
  USING (auth.uid() = id);

-- Admins can read all users
CREATE POLICY "Admins can read all users"
  ON users FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Admins can update any user
CREATE POLICY "Admins can update users"
  ON users FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- ============================================
-- OPTIONAL: TRIGGER FOR AUTO USER CREATION
-- ============================================

-- Function to automatically create user record on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
BEGIN
  INSERT INTO public.users (id, email, full_name, role, blocked)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    'customer',
    false
  );
  RETURN NEW;
EXCEPTION
  WHEN others THEN
    RAISE LOG 'Error in handle_new_user: %', SQLERRM;
    RETURN NEW;
END;
$$;

-- Drop existing trigger if it exists
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Create trigger to call the function
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- ============================================
-- TEST THE SETUP (Optional)
-- ============================================

-- Verify policies are created
SELECT tablename, policyname 
FROM pg_policies 
WHERE tablename = 'users';
