-- Supabase Migration: Initialize Schema for Repo Motors
-- Run this in Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create vehicles table
CREATE TABLE IF NOT EXISTS vehicles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  stock_id TEXT UNIQUE NOT NULL,
  make TEXT NOT NULL,
  model TEXT NOT NULL,
  year INTEGER NOT NULL,
  price NUMERIC NOT NULL,
  mileage INTEGER NOT NULL,
  down_payment NUMERIC,
  engine TEXT NOT NULL,
  transmission TEXT NOT NULL,
  fuel_type TEXT NOT NULL,
  color TEXT NOT NULL,
  vin TEXT NOT NULL,
  engine_capacity TEXT NOT NULL,
  drive_train TEXT NOT NULL,
  description TEXT NOT NULL,
  location TEXT NOT NULL,
  image_urls JSONB DEFAULT '[]'::jsonb,
  features JSONB DEFAULT '[]'::jsonb,
  inspection_report JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on slug for faster lookups
CREATE INDEX IF NOT EXISTS idx_vehicles_slug ON vehicles(slug);

-- Create index on stock_id
CREATE INDEX IF NOT EXISTS idx_vehicles_stock_id ON vehicles(stock_id);

-- Create index on created_at for ordering
CREATE INDEX IF NOT EXISTS idx_vehicles_created_at ON vehicles(created_at DESC);

-- Create contacts table
CREATE TABLE IF NOT EXISTS contacts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on created_at for ordering
CREATE INDEX IF NOT EXISTS idx_contacts_created_at ON contacts(created_at DESC);

-- Enable Row Level Security
ALTER TABLE vehicles ENABLE ROW LEVEL SECURITY;
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

-- RLS Policies for vehicles
-- Public can read all vehicles
CREATE POLICY "Public can read vehicles"
  ON vehicles
  FOR SELECT
  TO public
  USING (true);

-- Authenticated users (admins) can insert vehicles
CREATE POLICY "Authenticated users can insert vehicles"
  ON vehicles
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Authenticated users (admins) can update vehicles
CREATE POLICY "Authenticated users can update vehicles"
  ON vehicles
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Authenticated users (admins) can delete vehicles
CREATE POLICY "Authenticated users can delete vehicles"
  ON vehicles
  FOR DELETE
  TO authenticated
  USING (true);

-- RLS Policies for contacts
-- Public can insert contacts (submit contact form)
CREATE POLICY "Public can insert contacts"
  ON contacts
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Authenticated users (admins) can read all contacts
CREATE POLICY "Authenticated users can read contacts"
  ON contacts
  FOR SELECT
  TO authenticated
  USING (true);

-- Create function to auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to auto-update updated_at on vehicles
CREATE TRIGGER update_vehicles_updated_at
  BEFORE UPDATE ON vehicles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Grant permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON vehicles TO anon, authenticated;
GRANT ALL ON contacts TO anon, authenticated;
