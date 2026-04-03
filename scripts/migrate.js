// ══════════════════════════════════════════
// MIGRATION SCRIPT
// Run schema migrations and data setup
// ══════════════════════════════════════════

const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Define migrations in order
const migrations = [
  {
    id: '001_create_inventories_table',
    up: `
      DROP TABLE IF EXISTS inventories CASCADE;
      CREATE TABLE inventories (
        id BIGSERIAL PRIMARY KEY,
        unit_id VARCHAR(255) UNIQUE NOT NULL,
        unit_name VARCHAR(255),
        auditor VARCHAR(255),
        data JSONB DEFAULT '{}',
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      );
      CREATE INDEX idx_unit_id ON inventories(unit_id);
      CREATE INDEX idx_updated_at ON inventories(updated_at DESC);
      CREATE INDEX idx_unit_name ON inventories(unit_name);
    `,
  },
  {
    id: '002_add_triggers',
    up: `
      CREATE OR REPLACE FUNCTION update_updated_at_column()
      RETURNS TRIGGER AS $$
      BEGIN
        NEW.updated_at = NOW();
        RETURN NEW;
      END;
      $$ LANGUAGE plpgsql;

      DROP TRIGGER IF EXISTS update_inventories_updated_at ON inventories;
      CREATE TRIGGER update_inventories_updated_at
      BEFORE UPDATE ON inventories
      FOR EACH ROW
      EXECUTE FUNCTION update_updated_at_column();
    `,
  },
];

async function runMigrations() {
  const client = await pool.connect();

  try {
    console.log('🔄 Running migrations...');

    // Create migrations history table
    await client.query(`
      CREATE TABLE IF NOT EXISTS migrations (
        id VARCHAR(255) PRIMARY KEY,
        executed_at TIMESTAMP DEFAULT NOW()
      );
    `);

    for (const migration of migrations) {
      const { rows } = await client.query(
        'SELECT * FROM migrations WHERE id = $1',
        [migration.id]
      );

      if (rows.length === 0) {
        console.log(`⏳ Running migration: ${migration.id}`);
        await client.query(migration.up);
        await client.query('INSERT INTO migrations (id) VALUES ($1)', [migration.id]);
        console.log(`✅ Completed: ${migration.id}`);
      } else {
        console.log(`⏭️  Skipping (already ran): ${migration.id}`);
      }
    }

    console.log('✨ All migrations completed!');
  } catch (err) {
    console.error('❌ Migration error:', err.message);
    throw err;
  } finally {
    client.release();
    await pool.end();
  }
}

runMigrations().catch(err => {
  console.error('Failed to run migrations:', err);
  process.exit(1);
});
