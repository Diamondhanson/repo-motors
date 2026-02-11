-- Supabase Migration: Admin Users for Repo Motors
-- Run this in Supabase SQL Editor after 001_init_schema.sql

CREATE TABLE IF NOT EXISTS admin_users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Seed initial admin user (matches code-level credentials)
INSERT INTO admin_users (email, password_hash)
VALUES (
  'admin@repomotors.com',
  'scrypt$dad171d08f85062df33989f8a1190f98$5243cd15ea3b9fb5c152bd4d991ab12cd74c51746e8ec3a1a481c0f2cf805a6d7ddfd0beefa06194f7a516bf1412d97c64225dc0fa5f2582537141d2f0a3b3a7'
)
ON CONFLICT (email) DO NOTHING;
