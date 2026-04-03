// ══════════════════════════════════════════
// DATABASE INITIALIZATION SCRIPT
// Auto-build PostgreSQL schema
// ══════════════════════════════════════════

const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const createTableSQL = `
  -- ── Drop existing table if needed (for fresh start) ──
  DROP TABLE IF EXISTS inventories CASCADE;

  -- ── Create inventories table ──
  CREATE TABLE inventories (
    id BIGSERIAL PRIMARY KEY,
    unit_id VARCHAR(255) UNIQUE NOT NULL,
    unit_name VARCHAR(255),
    auditor VARCHAR(255),
    data JSONB DEFAULT '{}',
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
  );

  -- ── Create indexes for better query performance ──
  CREATE INDEX idx_unit_id ON inventories(unit_id);
  CREATE INDEX idx_updated_at ON inventories(updated_at DESC);
  CREATE INDEX idx_unit_name ON inventories(unit_name);

  -- ── Create update trigger to update updated_at ──
  CREATE OR REPLACE FUNCTION update_updated_at_column()
  RETURNS TRIGGER AS $$
  BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
  END;
  $$ LANGUAGE plpgsql;

  CREATE TRIGGER update_inventories_updated_at
  BEFORE UPDATE ON inventories
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
`;

async function initializeDatabase() {
  try {
    console.log('🔄 Initializing PostgreSQL database...');
    console.log(`📍 Database URL: ${process.env.DATABASE_URL}`);

    // Split queries by semicolon and execute them
    const queries = createTableSQL.split(';').filter(q => q.trim());

    for (const query of queries) {
      if (query.trim()) {
        await pool.query(query);
        console.log('✅ Query executed successfully');
      }
    }

    console.log('✨ Database initialization complete!');
    console.log('📊 Tables created: inventories');
    console.log('📑 Indexes created: idx_unit_id, idx_updated_at, idx_unit_name');

    await pool.end();
    process.exit(0);
  } catch (err) {
    console.error('❌ Error initializing database:', err.message);
    await pool.end();
    process.exit(1);
  }
}

initializeDatabase();
