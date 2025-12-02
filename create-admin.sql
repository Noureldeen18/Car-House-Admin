-- ============================================
-- QUICK SETUP: CREATE YOUR FIRST ADMIN
-- ============================================

-- Step 1: Register via the app first (register.html)
--         This creates your auth.users and profiles entry

-- Step 2: Find your user ID
SELECT id, email, full_name 
FROM public.profiles 
WHERE email = 'YOUR_EMAIL_HERE';  -- Replace with your email

-- Step 3: Add yourself to admins table
-- Copy your user ID from Step 2 and use it below:
INSERT INTO public.admins (user_id, role, meta)
VALUES (
  '8c701632-1372-455e-92dd-ba19851b9464',  -- Replace with actual UUID
  'superadmin',                 -- Or: 'product_manager', 'order_manager', etc.
  '{"permissions": ["all"], "level": "full"}'::jsonb
);

-- Step 4: Verify you're an admin
SELECT 
  p.email,
  p.full_name,
  p.role as profile_role,
  a.role as admin_role,
  a.meta as admin_meta
FROM public.profiles p
LEFT JOIN public.admins a ON a.user_id = p.id
WHERE p.email = 'YOUR_EMAIL_HERE';  -- Replace with your email

-- You should see admin_role = 'superadmin'

-- ============================================
-- NOW YOU CAN LOGIN!
-- ============================================
-- Go to login.html and sign in
-- The app will detect you as an admin and grant access

-- ============================================
-- OPTIONAL: Add More Admins
-- ============================================
INSERT INTO public.admins (user_id, role, meta)
VALUES 
  -- Product Manager (can manage products & categories)
  ('USER_ID_2', 'product_manager', '{"permissions": ["manage_products", "manage_categories"]}'::jsonb),
  
  -- Order Manager (can manage orders only)
  ('USER_ID_3', 'order_manager', '{"permissions": ["manage_orders", "view_reports"]}'::jsonb),
  
  -- Support (read-only admin)
  ('USER_ID_4', 'support', '{"permissions": ["view_all"]}'::jsonb);

-- ============================================
-- REMOVE ADMIN ACCESS
-- ============================================
-- To remove admin access from a user:
DELETE FROM public.admins 
WHERE user_id = 'USER_ID_TO_REMOVE';

-- ============================================
-- HELPFUL QUERIES
-- ============================================

-- See all admins
SELECT 
  p.email,
  p.full_name,
  a.role as admin_role,
  a.created_at as admin_since
FROM public.admins a
JOIN public.profiles p ON p.id = a.user_id
ORDER BY a.created_at DESC;

-- See all users (admins and customers)
SELECT 
  p.id,
  p.email,
  p.full_name,
  p.role,
  CASE WHEN a.user_id IS NOT NULL THEN 'Yes' ELSE 'No' END as is_admin,
  a.role as admin_level
FROM public.profiles p
LEFT JOIN public.admins a ON a.user_id = p.id
ORDER BY p.created_at DESC;

-- Recent admin actions (audit log)
SELECT 
  al.created_at,
  p.email as admin_email,
  al.action,
  al.resource_type,
  al.resource_id,
  al.details
FROM public.audit_logs al
JOIN public.profiles p ON p.id = al.user_id
ORDER BY al.created_at DESC
LIMIT 20;
