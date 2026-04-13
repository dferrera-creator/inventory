-- ══════════════════════════════════════════
-- POSTGRESQL DATABASE INITIALIZATION SCRIPT
-- Inventory Management System
-- ══════════════════════════════════════════

-- Create inventories table
CREATE TABLE IF NOT EXISTS inventories (
  id BIGSERIAL PRIMARY KEY,
  unit_id VARCHAR(255) UNIQUE NOT NULL,
  unit_name VARCHAR(255),
  auditor VARCHAR(255),
  data JSONB DEFAULT '{}',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_unit_id ON inventories(unit_id);
CREATE INDEX IF NOT EXISTS idx_updated_at ON inventories(updated_at DESC);
CREATE INDEX IF NOT EXISTS idx_unit_name ON inventories(unit_name);
CREATE INDEX IF NOT EXISTS idx_created_at ON inventories(created_at DESC);

-- Create function to auto-update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update updated_at on every update
DROP TRIGGER IF EXISTS update_inventories_updated_at ON inventories;
CREATE TRIGGER update_inventories_updated_at
BEFORE UPDATE ON inventories
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Create migrations table to track applied migrations
CREATE TABLE IF NOT EXISTS migrations (
  id VARCHAR(255) PRIMARY KEY,
  executed_at TIMESTAMP DEFAULT NOW()
);

-- ══════════════════════════════════════════
-- END OF INITIALIZATION SCRIPT
-- ══════════════════════════════════════════
