-- Optional phone (E.164) from contact form
ALTER TABLE contacts
  ADD COLUMN IF NOT EXISTS phone TEXT;
