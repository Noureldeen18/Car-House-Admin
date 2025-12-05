-- ============================================
-- ADD RATING COLUMN TO PRODUCTS TABLE
-- ============================================
-- Run this in Supabase SQL Editor to add rating support

-- Add rating column if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'products' AND column_name = 'rating'
    ) THEN
        ALTER TABLE products ADD COLUMN rating NUMERIC(2,1) DEFAULT 0 CHECK (rating >= 0 AND rating <= 5);
    END IF;
END $$;

-- Update any NULL ratings to 0
UPDATE products SET rating = 0 WHERE rating IS NULL;

-- Verify the column was added
SELECT column_name, data_type, column_default 
FROM information_schema.columns 
WHERE table_name = 'products' AND column_name = 'rating';
