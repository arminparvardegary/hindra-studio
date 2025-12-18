-- Hindra Studio Supabase Schema
-- Run this in your Supabase SQL Editor

-- Create invoices table
CREATE TABLE IF NOT EXISTS invoices (
  id TEXT PRIMARY KEY,
  invoice_number TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  due_date TIMESTAMPTZ,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'pending', 'paid', 'overdue', 'cancelled')),
  
  -- Sender info
  sender_name TEXT DEFAULT 'Hindra Studio',
  sender_email TEXT DEFAULT 'hello@hindra.studio',
  sender_phone TEXT,
  sender_address TEXT DEFAULT 'Istanbul, Turkey',
  sender_logo TEXT,
  
  -- Client info
  client_name TEXT,
  client_email TEXT,
  client_phone TEXT,
  client_address TEXT,
  client_company TEXT,
  
  -- Items (stored as JSONB)
  items JSONB DEFAULT '[]',
  
  -- Amounts
  subtotal DECIMAL(12,2) DEFAULT 0,
  tax_rate DECIMAL(5,2) DEFAULT 9,
  tax_amount DECIMAL(12,2) DEFAULT 0,
  discount DECIMAL(12,2) DEFAULT 0,
  discount_type TEXT DEFAULT 'percentage' CHECK (discount_type IN ('percentage', 'fixed')),
  total DECIMAL(12,2) DEFAULT 0,
  
  -- Additional
  notes TEXT,
  terms TEXT DEFAULT 'Payment is due within 30 days of invoice date.',
  currency TEXT DEFAULT 'USD',
  
  -- Sender Signature
  signature_type TEXT DEFAULT 'text' CHECK (signature_type IN ('text', 'drawn')),
  signature_text TEXT,
  signature_data TEXT,
  signed_at TIMESTAMPTZ,
  
  -- Client Signature
  client_signature_type TEXT CHECK (client_signature_type IN ('text', 'drawn')),
  client_signature_text TEXT,
  client_signature_data TEXT,
  client_signed_at TIMESTAMPTZ,
  client_signed_ip TEXT,
  
  -- Metadata
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_invoices_status ON invoices(status);
CREATE INDEX IF NOT EXISTS idx_invoices_created_at ON invoices(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_invoices_client_email ON invoices(client_email);

-- Enable Row Level Security (optional, for production)
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;

-- Create policy for authenticated users (adjust as needed)
CREATE POLICY "Allow all operations for service role"
  ON invoices
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- Function to auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to auto-update updated_at
CREATE TRIGGER update_invoices_updated_at
  BEFORE UPDATE ON invoices
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Sample comment for setup
COMMENT ON TABLE invoices IS 'Hindra Studio client agreements and invoices';
