-- Add sold column to vehicles table
-- Run this in Supabase SQL Editor

ALTER TABLE vehicles ADD COLUMN IF NOT EXISTS sold BOOLEAN DEFAULT false;

CREATE INDEX IF NOT EXISTS idx_vehicles_sold ON vehicles(sold) WHERE sold = true;
