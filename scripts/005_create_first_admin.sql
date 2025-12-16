-- IMPORTANT: This script creates the first admin user.
-- Before running this script:
-- 1. Create a user via Supabase Auth (sign up with email/password)
-- 2. Replace the UUID below with the user's actual ID from auth.users
-- 3. Run this script to grant them admin access

-- Example: To create an admin, first sign up a user, then run:
-- INSERT INTO admin_profiles (id, email, full_name, role)
-- VALUES (
--   'YOUR-USER-UUID-HERE',  -- Get this from auth.users after signup
--   'admin@himachalyatra.com',
--   'Admin User',
--   'super_admin'
-- );

-- For development/testing, you can also use the signup with metadata approach:
-- When signing up, include is_admin: true in the user metadata
-- and the trigger will automatically create the admin profile.

-- Temporary: Insert a placeholder to verify the table works
-- DELETE this row and insert real admin after setting up auth user
DO $$
BEGIN
  -- Only insert if no admins exist (first-time setup check)
  IF NOT EXISTS (SELECT 1 FROM admin_profiles LIMIT 1) THEN
    RAISE NOTICE 'No admin profiles found. Please create a user via Supabase Auth first, then insert their profile here.';
  END IF;
END $$;
