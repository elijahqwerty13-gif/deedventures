/*
# Create products and settings tables (single-tenant, no auth)

1. New Tables
- `products`
  - `id` (uuid, primary key)
  - `name` (text, not null) — product title
  - `category` (text, not null) — one of: Leather Case Series, Multi-Port Hubs, Fast Cables, Magnetic Car Mounts
  - `price` (numeric, not null) — price in Ghanaian Cedis
  - `image_url` (text, not null) — link to product image
  - `created_at` (timestamptz, default now)
- `settings`
  - `id` (uuid, primary key)
  - `phone` (text) — public contact phone number
  - `location` (text) — public location address
  - `updated_at` (timestamptz, default now)

2. Seed Data
- Insert one default settings row with Accra, Ghana location and a placeholder phone.
- Insert a few sample products across all four categories so the catalog isn't empty on first load.

3. Security
- Enable RLS on both tables.
- Allow anon + authenticated full CRUD on both tables because this is a single-tenant public catalog with no sign-in screen. The admin lock is a client-side gate only (per requirements); the data itself is intentionally public.
*/

CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  category text NOT NULL CHECK (category IN ('Leather Case Series', 'Multi-Port Hubs', 'Fast Cables', 'Magnetic Car Mounts')),
  price numeric NOT NULL DEFAULT 0,
  image_url text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_products" ON products;
CREATE POLICY "anon_select_products" ON products FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_products" ON products;
CREATE POLICY "anon_insert_products" ON products FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_products" ON products;
CREATE POLICY "anon_update_products" ON products FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_products" ON products;
CREATE POLICY "anon_delete_products" ON products FOR DELETE
  TO anon, authenticated USING (true);

CREATE TABLE IF NOT EXISTS settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  phone text NOT NULL DEFAULT 'Call Admin to Inquire',
  location text NOT NULL DEFAULT 'Accra, Ghana',
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_settings" ON settings;
CREATE POLICY "anon_select_settings" ON settings FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_settings" ON settings;
CREATE POLICY "anon_insert_settings" ON settings FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_settings" ON settings;
CREATE POLICY "anon_update_settings" ON settings FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_settings" ON settings;
CREATE POLICY "anon_delete_settings" ON settings FOR DELETE
  TO anon, authenticated USING (true);

-- Seed default settings row (idempotent)
INSERT INTO settings (phone, location)
SELECT 'Call Admin to Inquire', 'Accra, Ghana'
WHERE NOT EXISTS (SELECT 1 FROM settings);

-- Seed sample products (idempotent by checking existing rows)
INSERT INTO products (name, category, price, image_url)
SELECT 'Executive Leather Sleeve Pro', 'Leather Case Series', 320.00,
       'https://images.pexels.com/photos/4224023/pexels-photo-4224023.jpeg?auto=compress&cs=tinysrgb&w=600'
WHERE NOT EXISTS (SELECT 1 FROM products WHERE name = 'Executive Leather Sleeve Pro');

INSERT INTO products (name, category, price, image_url)
SELECT 'Titanium 7-in-1 USB-C Hub', 'Multi-Port Hubs', 450.00,
       'https://images.pexels.com/photos/4224023/pexels-photo-4224023.jpeg?auto=compress&cs=tinysrgb&w=600'
WHERE NOT EXISTS (SELECT 1 FROM products WHERE name = 'Titanium 7-in-1 USB-C Hub');

INSERT INTO products (name, category, price, image_url)
SELECT 'Braided Fast Charge Cable 1.5m', 'Fast Cables', 85.00,
       'https://images.pexels.com/photos/4224023/pexels-photo-4224023.jpeg?auto=compress&cs=tinysrgb&w=600'
WHERE NOT EXISTS (SELECT 1 FROM products WHERE name = 'Braided Fast Charge Cable 1.5m');

INSERT INTO products (name, category, price, image_url)
SELECT 'Magnetic Grip Car Mount Elite', 'Magnetic Car Mounts', 180.00,
       'https://images.pexels.com/photos/4224023/pexels-photo-4224023.jpeg?auto=compress&cs=tinysrgb&w=600'
WHERE NOT EXISTS (SELECT 1 FROM products WHERE name = 'Magnetic Grip Car Mount Elite');
