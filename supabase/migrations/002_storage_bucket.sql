-- Supabase Storage Migration: Create vehicle-images bucket
-- Run this in Supabase SQL Editor after running 001_init_schema.sql

-- Create storage bucket for vehicle images (public access)
INSERT INTO storage.buckets (id, name, public)
VALUES ('vehicle-images', 'vehicle-images', true)
ON CONFLICT (id) DO NOTHING;

-- Allow public read access to vehicle images
CREATE POLICY "Public read access"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'vehicle-images');

-- Allow authenticated users (admins with service role) to upload
CREATE POLICY "Authenticated users can upload"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'vehicle-images');

-- Allow authenticated users to update files
CREATE POLICY "Authenticated users can update"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'vehicle-images');

-- Allow authenticated users to delete files
CREATE POLICY "Authenticated users can delete"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'vehicle-images');

-- Note: The admin dashboard uses service role key for authentication,
-- which has full access to storage operations.
