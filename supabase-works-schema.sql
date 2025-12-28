-- Hindra Studio Works/Projects Schema
-- Run this in your Supabase SQL Editor

-- Create works table
CREATE TABLE IF NOT EXISTS works (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  
  -- Hero section
  title TEXT NOT NULL,
  subtitle TEXT NOT NULL,
  year TEXT NOT NULL,
  client TEXT NOT NULL,
  website TEXT NOT NULL,
  description TEXT NOT NULL,
  image TEXT NOT NULL,
  
  -- Tags and Services
  tags JSONB DEFAULT '[]',
  services JSONB DEFAULT '[]',
  
  -- Challenge & Solution
  challenge TEXT NOT NULL,
  solution TEXT NOT NULL,
  
  -- Stats (key-value pairs)
  stats JSONB DEFAULT '{}',
  
  -- Process (4 steps)
  process JSONB DEFAULT '[]',
  
  -- Gallery (3 images)
  gallery JSONB DEFAULT '[]',
  
  -- Results (4 items)
  results JSONB DEFAULT '[]',
  
  -- Color Palette (4 colors)
  palette JSONB DEFAULT '[]',
  
  -- Testimonial
  testimonial_quote TEXT,
  testimonial_author TEXT,
  testimonial_role TEXT,
  
  -- Full description
  full_description TEXT NOT NULL,
  
  -- Display settings
  featured BOOLEAN DEFAULT false,
  sort_order INTEGER DEFAULT 0,
  category TEXT DEFAULT 'Web Platform',
  color TEXT DEFAULT '#000000',
  
  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_works_slug ON works(slug);
CREATE INDEX IF NOT EXISTS idx_works_sort_order ON works(sort_order);
CREATE INDEX IF NOT EXISTS idx_works_category ON works(category);
CREATE INDEX IF NOT EXISTS idx_works_featured ON works(featured);

-- Enable Row Level Security
ALTER TABLE works ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access
CREATE POLICY "Allow public read access on works"
  ON works
  FOR SELECT
  USING (true);

-- Create policy for service role to do everything
CREATE POLICY "Allow all operations for service role on works"
  ON works
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- Function to auto-update updated_at (reuse if exists)
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to auto-update updated_at
DROP TRIGGER IF EXISTS update_works_updated_at ON works;
CREATE TRIGGER update_works_updated_at
  BEFORE UPDATE ON works
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Comment
COMMENT ON TABLE works IS 'Hindra Studio portfolio works/projects';
