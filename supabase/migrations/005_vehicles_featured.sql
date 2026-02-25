-- Add featured column to vehicles table
-- Run this in Supabase SQL Editor

ALTER TABLE vehicles ADD COLUMN IF NOT EXISTS featured BOOLEAN DEFAULT false;

CREATE INDEX IF NOT EXISTS idx_vehicles_featured ON vehicles(featured) WHERE featured = true;
