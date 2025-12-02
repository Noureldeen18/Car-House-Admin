-- ============================================
-- CAR HOUSE DATABASE SCHEMA
-- ============================================

-- Categories Table
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Products Table
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  price NUMERIC NOT NULL,
  stock INT NOT NULL,
  car_model TEXT,
  brand TEXT,
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  image_url TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Users Table (Admins + Customers)
CREATE TABLE users (
  id UUID PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  role TEXT CHECK (role IN ('admin','customer')) DEFAULT 'customer',
  blocked BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Orders Table
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  status TEXT CHECK (status IN ('pending','shipped','delivered','cancelled')) DEFAULT 'pending',
  total NUMERIC NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Order Items Table
CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  quantity INT NOT NULL,
  price NUMERIC NOT NULL
);

-- ============================================
-- ENABLE ROW LEVEL SECURITY (RLS)
-- ============================================

ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

-- ============================================
-- RLS POLICIES
-- ============================================

-- Categories: Everyone can read, only admins can modify
CREATE POLICY "Allow public read access on categories"
  ON categories FOR SELECT
  USING (true);

CREATE POLICY "Allow admins to manage categories"
  ON categories FOR ALL
  USING (
    auth.uid() IN (
      SELECT id FROM users WHERE role = 'admin'
    )
  );

-- Products: Everyone can read, only admins can modify
CREATE POLICY "Allow public read access on products"
  ON products FOR SELECT
  USING (true);

CREATE POLICY "Allow admins to manage products"
  ON products FOR ALL
  USING (
    auth.uid() IN (
      SELECT id FROM users WHERE role = 'admin'
    )
  );

-- Users: Users can read own data, admins can read all
CREATE POLICY "Users can read own data"
  ON users FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Admins can read all users"
  ON users FOR SELECT
  USING (
    auth.uid() IN (
      SELECT id FROM users WHERE role = 'admin'
    )
  );

CREATE POLICY "Admins can update users"
  ON users FOR UPDATE
  USING (
    auth.uid() IN (
      SELECT id FROM users WHERE role = 'admin'
    )
  );

CREATE POLICY "Users can be created on signup"
  ON users FOR INSERT
  WITH CHECK (true);

-- Orders: Users can read own orders, admins can read all
CREATE POLICY "Users can read own orders"
  ON orders FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can read all orders"
  ON orders FOR SELECT
  USING (
    auth.uid() IN (
      SELECT id FROM users WHERE role = 'admin'
    )
  );

CREATE POLICY "Users can create own orders"
  ON orders FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can update orders"
  ON orders FOR UPDATE
  USING (
    auth.uid() IN (
      SELECT id FROM users WHERE role = 'admin'
    )
  );

-- Order Items: Same as orders
CREATE POLICY "Users can read own order items"
  ON order_items FOR SELECT
  USING (
    order_id IN (
      SELECT id FROM orders WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Admins can read all order items"
  ON order_items FOR SELECT
  USING (
    auth.uid() IN (
      SELECT id FROM users WHERE role = 'admin'
    )
  );

CREATE POLICY "Users can create order items for own orders"
  ON order_items FOR INSERT
  WITH CHECK (
    order_id IN (
      SELECT id FROM orders WHERE user_id = auth.uid()
    )
  );

-- ============================================
-- SAMPLE DATA (Optional)
-- ============================================

-- Insert sample categories
INSERT INTO categories (name, description, icon) VALUES
  ('Engine', 'Engine components and parts', '⚙️'),
  ('Brakes', 'Brake systems and components', '🛑'),
  ('Suspension', 'Suspension and steering parts', '🦾'),
  ('Lighting', 'Lights and electrical components', '💡'),
  ('Transmission', 'Transmission parts', '🔧'),
  ('Exhaust', 'Exhaust system components', '💨');

-- Insert sample products (you'll need to replace category_id with actual IDs after running above)
INSERT INTO products (name, description, price, stock, car_model, brand, category_id) VALUES
  ('Brake Pad Set', 'Premium ceramic brake pads', 89.99, 42, 'BMW 3 Series (2015-2020)', 'Brembo', 
    (SELECT id FROM categories WHERE name = 'Brakes' LIMIT 1)),
  ('Oil Filter', 'High-quality oil filter', 14.50, 120, 'Toyota Corolla (2010-2018)', 'Bosch', 
    (SELECT id FROM categories WHERE name = 'Engine' LIMIT 1)),
  ('LED Headlight Bulb', 'Bright LED headlight bulbs', 39.00, 65, 'Universal H7', 'Philips', 
    (SELECT id FROM categories WHERE name = 'Lighting' LIMIT 1)),
  ('Spark Plugs Set', 'Iridium spark plugs (4 pack)', 45.99, 80, 'Honda Civic (2012-2016)', 'NGK', 
    (SELECT id FROM categories WHERE name = 'Engine' LIMIT 1)),
  ('Shock Absorber', 'Front shock absorber', 125.00, 30, 'Ford Focus (2014-2018)', 'Monroe', 
    (SELECT id FROM categories WHERE name = 'Suspension' LIMIT 1));

-- ============================================
-- FUNCTIONS (Optional but recommended)
-- ============================================

-- Function to automatically create user record on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, full_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    'customer'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to call the function
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
