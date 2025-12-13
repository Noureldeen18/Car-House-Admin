-- ============================================
-- ADD SERVICE TYPES TABLE
-- Run this script to add service types management
-- ============================================

-- Create service_types table
CREATE TABLE IF NOT EXISTS service_types (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  estimated_duration INT, -- in minutes
  base_price NUMERIC(10,2),
  icon TEXT DEFAULT '🔧',
  is_active BOOLEAN DEFAULT TRUE,
  position INT DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add service_type_id column to workshop_bookings if not exists
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'workshop_bookings' AND column_name = 'service_type_id'
  ) THEN
    ALTER TABLE workshop_bookings ADD COLUMN service_type_id UUID REFERENCES service_types(id) ON DELETE SET NULL;
  END IF;
END $$;

-- Enable Row Level Security
ALTER TABLE service_types ENABLE ROW LEVEL SECURITY;

-- RLS Policies (public read, admin write)
DROP POLICY IF EXISTS "service_types_select_all" ON service_types;
CREATE POLICY "service_types_select_all" ON service_types FOR SELECT USING (true);

DROP POLICY IF EXISTS "service_types_all_admin" ON service_types;
CREATE POLICY "service_types_all_admin" ON service_types FOR ALL USING (is_admin());

-- Insert sample service types
INSERT INTO service_types (name, description, estimated_duration, base_price, icon, position) VALUES
  ('Oil Change', 'Complete oil and filter change service', 30, 150.00, '🛢️', 1),
  ('Brake Service', 'Brake inspection, pad replacement and fluid check', 60, 350.00, '🛑', 2),
  ('Engine Repair', 'Diagnostic and repair of engine issues', 120, 800.00, '⚙️', 3),
  ('Transmission Service', 'Transmission fluid change and inspection', 90, 500.00, '🔧', 4),
  ('Tire Service', 'Tire rotation, balancing, and alignment', 45, 200.00, '🔴', 5),
  ('Suspension Repair', 'Shock absorber and suspension component repair', 90, 600.00, '🦾', 6),
  ('Electrical Repair', 'Electrical system diagnosis and repair', 60, 400.00, '⚡', 7),
  ('AC Service', 'Air conditioning system service and recharge', 60, 300.00, '❄️', 8),
  ('General Inspection', 'Full vehicle inspection and health check', 45, 100.00, '🔍', 9),
  ('Body Work', 'Dent repair, painting and body restoration', 180, 1000.00, '🚗', 10),
  ('Battery Service', 'Battery testing, charging and replacement', 30, 150.00, '🔋', 11),
  ('Wheel Alignment', 'Precision wheel alignment service', 45, 250.00, '🎯', 12)
ON CONFLICT (name) DO NOTHING;
