-- ============================================
-- VERIFY AND FIX ADMIN ACCESS
-- ============================================

-- Step 1: Check if you're registered
SELECT id, email, full_name, role 
FROM public.profiles 
ORDER BY created_at DESC 
LIMIT 10;

-- Copy your user ID from above results
-- It looks like: 123e4567-e89b-12d3-a456-426614174000

-- Step 2: Check if you're in the admins table
SELECT 
  a.id,
  a.user_id,
  a.role as admin_role,
  a.meta,
  p.email,
  p.full_name
FROM public.admins a
LEFT JOIN public.profiles p ON p.id = a.user_id
ORDER BY a.created_at DESC;

-- If you DON'T see your email above, you're not an admin yet!

-- Step 3: Add yourself as admin (REPLACE THE USER_ID!)
-- Get your user_id from Step 1, then run:

INSERT INTO public.admins (user_id, role, meta)
VALUES (
  'PASTE_YOUR_USER_ID_HERE',  -- Replace this!
  'superadmin',
  '{"permissions": ["all"]}'::jsonb
)
ON CONFLICT (user_id) 
DO UPDATE SET 
  role = 'superadmin',
  meta = '{"permissions": ["all"]}'::jsonb;

-- Step 4: Verify you're now an admin
SELECT 
  p.email,
  p.full_name,
  p.role as profile_role,
  a.role as admin_role,
  a.meta
FROM public.profiles p
LEFT JOIN public.admins a ON a.user_id = p.id
WHERE p.id = 'PASTE_YOUR_USER_ID_HERE';  -- Replace this!

-- You should see:
-- admin_role = 'superadmin'

-- ============================================
-- QUICK FIX: Use your email instead
-- ============================================

-- If you know your email, use this instead:

INSERT INTO public.admins (user_id, role, meta)
SELECT 
  id,
  'superadmin',
  '{"permissions": ["all"]}'::jsonb
FROM public.profiles
WHERE email = 'YOUR_EMAIL@example.com'  -- Replace with your email
ON CONFLICT (user_id) 
DO UPDATE SET 
  role = 'superadmin',
  meta = '{"permissions": ["all"]}'::jsonb;

-- Verify it worked:
SELECT 
  p.email,
  p.full_name,
  a.role as admin_role
FROM public.profiles p
JOIN public.admins a ON a.user_id = p.id
WHERE p.email = 'YOUR_EMAIL@example.com';  -- Replace with your email

-- Should show: admin_role = 'superadmin'

-- ============================================
-- IMPORTANT: AFTER RUNNING THIS
-- ============================================
-- 1. LOGOUT from the app completely
-- 2. Close all browser tabs with the app
-- 3. Clear browser cache (Ctrl+Shift+Delete)
-- 4. LOGIN again
-- 5. Should work now!

-- ============================================
-- ALTERNATIVE: Check what the app sees
-- ============================================
-- After logging in, open browser console (F12) and run:
-- 
-- console.log('Current User:', AuthService.currentUser);
-- console.log('Is Admin:', AuthService.isAdmin());
-- console.log('Admin Role:', AuthService.getAdminRole());
--
-- Should show:
-- isAdmin: true
-- adminRole: 'superadmin'
