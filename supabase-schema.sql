-- Hindra Admin Panel - Supabase Schema
-- Run this in your Supabase SQL Editor to create the invoices table

-- Create invoices table
CREATE TABLE IF NOT EXISTS invoices (
  id TEXT PRIMARY KEY,
  invoice_number TEXT NOT NULL,
  client_name TEXT,
  client_email TEXT,
  client_address TEXT,
  company_name TEXT DEFAULT 'Hindra Studio',
  company_address TEXT,
  items JSONB NOT NULL DEFAULT '[]'::jsonb,
  subtotal DECIMAL(12,2) DEFAULT 0,
  tax_rate DECIMAL(5,2) DEFAULT 0,
  tax_amount DECIMAL(12,2) DEFAULT 0,
  discount DECIMAL(12,2) DEFAULT 0,
  discount_type TEXT DEFAULT 'percentage',
  discount_amount DECIMAL(12,2) DEFAULT 0,
  total DECIMAL(12,2) DEFAULT 0,
  currency TEXT DEFAULT 'USD',
  status TEXT DEFAULT 'pending',
  notes TEXT,
  terms TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  due_date TIMESTAMP WITH TIME ZONE,
  client_signed_at TIMESTAMP WITH TIME ZONE,
  client_signature TEXT,
  admin_signature TEXT
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_invoices_status ON invoices(status);
CREATE INDEX IF NOT EXISTS idx_invoices_created_at ON invoices(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_invoices_client_name ON invoices(client_name);

-- Enable Row Level Security (optional, for future multi-tenant support)
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;

-- Policy to allow all operations for authenticated users (adjust as needed)
CREATE POLICY "Allow all operations" ON invoices
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- If you want to restrict to specific admin emails:
-- CREATE POLICY "Admin only" ON invoices
--   FOR ALL
--   USING (auth.jwt() ->> 'email' = 'hello@hindra.studio')
--   WITH CHECK (auth.jwt() ->> 'email' = 'hello@hindra.studio');

