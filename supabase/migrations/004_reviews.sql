-- Supabase Migration: Reviews table for client testimonials
-- Run this in Supabase SQL Editor after 001_init_schema.sql

CREATE TABLE IF NOT EXISTS reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  text TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_reviews_created_at ON reviews(created_at DESC);

ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Public can read all reviews (for home page and /reviews page)
CREATE POLICY "Public can read reviews"
  ON reviews
  FOR SELECT
  TO public
  USING (true);

-- Public can insert reviews (submit form)
CREATE POLICY "Public can insert reviews"
  ON reviews
  FOR INSERT
  TO public
  WITH CHECK (true);

GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON reviews TO anon, authenticated;

-- Seed 10 sample reviews
INSERT INTO reviews (name, text)
VALUES
  (
    'John M.',
    'Smooth process from start to finish. Got a great deal on a 2019 Camry. Title came in 4 days. Highly recommend.'
  ),
  (
    'Sarah K.',
    'I was skeptical about buying a repo car, but the inspection report gave me confidence. The car runs perfectly.'
  ),
  (
    'Michael T.',
    'No auctions, no pressure. Fixed price and transparent. Will buy from them again.'
  ),
  (
    'Jennifer L.',
    'Reserved my vehicle with a deposit, inspected it, and drove it home. Exactly as described. Great experience.'
  ),
  (
    'David R.',
    'Professional team from start to finish. The 2-day inspection period gave me peace of mind. Car exceeded expectations.'
  ),
  (
    'Amanda S.',
    'Finally found a fair deal on a used SUV. No bidding wars, no hassle. Would definitely recommend to friends.'
  ),
  (
    'James W.',
    'Quick title transfer, honest pricing, and a smooth buying experience. Exactly what I was looking for.'
  ),
  (
    'Nicole P.',
    'The reservation deposit process was straightforward. Got my Honda within a week. Very satisfied.'
  ),
  (
    'Robert H.',
    'Bank repo cars can be risky, but their inspection reports made the decision easy. Got a great car at a great price.'
  ),
  (
    'Emma L.',
    'Transparent pricing and no pressure sales. The team answered all my questions. Highly recommend National Repo Motors.'
  );
