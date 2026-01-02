-- ===============================
-- TENANT
-- ===============================
INSERT INTO tenants (id, name, subdomain, status, subscription_plan, max_users, max_projects)
VALUES (
  '11111111-1111-1111-1111-111111111111',
  'Demo Company',
  'demo',
  'active',
  'pro',
  25,
  15
)
ON CONFLICT (id) DO NOTHING;

-- ===============================
-- SUPER ADMIN
-- ===============================
INSERT INTO users (id, tenant_id, email, password_hash, full_name, role)
VALUES (
  'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
  NULL,
  'superadmin@system.com',
  '$2b$10$XipYITahg3vZFPu1yEuS3.plOew/.UqU53wssis3J2hPuFLAYkfKO',
  'Super Admin',
  'super_admin'
)
ON CONFLICT (id) DO NOTHING;

-- ===============================
-- TENANT ADMIN
-- ===============================
INSERT INTO users (id, tenant_id, email, password_hash, full_name, role)
VALUES (
  'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
  '11111111-1111-1111-1111-111111111111',
  'admin@demo.com',
  '$2b$10$XipYITahg3vZFPu1yEuS3.plOew/.UqU53wssis3J2hPuFLAYkfKO',
  'Demo Admin',
  'tenant_admin'
)
ON CONFLICT (id) DO NOTHING;
