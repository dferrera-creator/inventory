// ══════════════════════════════════════════
// SERVER — Express Backend com PostgreSQL
// ══════════════════════════════════════════

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const { Pool } = require('pg');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// ── PostgreSQL Connection Pool ──
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
});

// ── Middleware ──
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// ── Health Check ──
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// ── Database Health Check ──
app.get('/api/db-health', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({ status: 'OK', timestamp: result.rows[0] });
  } catch (err) {
    res.status(500).json({ status: 'ERROR', message: err.message });
  }
});

// ── Save Inventory ──
app.post('/api/inventory', async (req, res) => {
  try {
    const { unitId, unitName, auditor, data } = req.body;

    const query = `
      INSERT INTO inventories (unit_id, unit_name, auditor, data, updated_at)
      VALUES ($1, $2, $3, $4, NOW())
      ON CONFLICT (unit_id) DO UPDATE SET
        unit_name = EXCLUDED.unit_name,
        auditor = EXCLUDED.auditor,
        data = EXCLUDED.data,
        updated_at = NOW()
      RETURNING id;
    `;

    const result = await pool.query(query, [unitId, unitName, auditor, JSON.stringify(data)]);
    res.json({ id: result.rows[0].id, success: true });
  } catch (err) {
    console.error('Error saving inventory:', err);
    res.status(500).json({ error: err.message });
  }
});

// ── Load Inventory List ──
app.get('/api/inventory', async (req, res) => {
  try {
    const query = `
      SELECT unit_id, unit_name, updated_at, data
      FROM inventories
      ORDER BY updated_at DESC;
    `;

    const result = await pool.query(query);
    const inventories = result.rows.map(row => {
      const rooms = row.data && row.data.rooms ? row.data.rooms : [];
      const itemCount = rooms.reduce((sum, r) => sum + (r.items ? r.items.length : 0), 0);
      return {
        unitId: row.unit_id,
        unitName: row.unit_name,
        updatedAt: row.updated_at,
        itemCount,
      };
    });

    res.json(inventories);
  } catch (err) {
    console.error('Error loading inventory:', err);
    res.status(500).json({ error: err.message });
  }
});

// ── Load Single Inventory ──
app.get('/api/inventory/:unitId', async (req, res) => {
  try {
    const { unitId } = req.params;
    const query = 'SELECT data FROM inventories WHERE unit_id = $1;';
    const result = await pool.query(query, [unitId]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Not found' });
    }

    res.json(result.rows[0].data);
  } catch (err) {
    console.error('Error loading inventory:', err);
    res.status(500).json({ error: err.message });
  }
});

// ── Delete Inventory ──
app.delete('/api/inventory/:unitId', async (req, res) => {
  try {
    const { unitId } = req.params;
    const query = 'DELETE FROM inventories WHERE unit_id = $1;';
    await pool.query(query, [unitId]);
    res.json({ success: true });
  } catch (err) {
    console.error('Error deleting inventory:', err);
    res.status(500).json({ error: err.message });
  }
});

// ── Load All Records ──
app.get('/api/records', async (req, res) => {
  try {
    const query = `
      SELECT id, unit_id, unit_name, auditor, updated_at, data
      FROM inventories
      ORDER BY updated_at DESC;
    `;

    const result = await pool.query(query);
    const records = result.rows.map(row => {
      const d = row.data || {};
      const type = d.type || 'inventory';
      let itemCount = 0;
      let completedCount = 0;

      if (type === 'onboarding') {
        const sections = d.sections || [];
        sections.forEach(section => {
          section.groups && section.groups.forEach(group => {
            itemCount += (group.items || []).length;
            completedCount += (group.items || []).filter(i => i.status).length;
          });
        });
      } else {
        const rooms = d.rooms || [];
        itemCount = rooms.reduce((sum, r) => sum + (r.items ? r.items.length : 0), 0);
        if (type === 'inspection') {
          completedCount = rooms.reduce((sum, r) =>
            sum + (r.items ? r.items.filter(i => i.status).length : 0), 0);
        }
      }

      return {
        id: row.id,
        unitId: row.unit_id,
        unitName: row.unit_name,
        auditor: row.auditor,
        updatedAt: row.updated_at,
        date: d.date || '',
        type,
        itemCount,
        completedCount,
        sourceUnitId: d.sourceUnitId || null,
        versionCount: (d.versions || []).length,
      };
    });

    res.json(records);
  } catch (err) {
    console.error('Error loading records:', err);
    res.status(500).json({ error: err.message });
  }
});

// ── Initialize database on startup ──
async function initializeDatabaseOnStartup() {
  const createTableSQL = `
    CREATE TABLE IF NOT EXISTS inventories (
      id BIGSERIAL PRIMARY KEY,
      unit_id VARCHAR(255) UNIQUE NOT NULL,
      unit_name VARCHAR(255),
      auditor VARCHAR(255),
      data JSONB DEFAULT '{}',
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW()
    );

    CREATE INDEX IF NOT EXISTS idx_unit_id ON inventories(unit_id);
    CREATE INDEX IF NOT EXISTS idx_updated_at ON inventories(updated_at DESC);
    CREATE INDEX IF NOT EXISTS idx_unit_name ON inventories(unit_name);

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

    CREATE TABLE IF NOT EXISTS migrations (
      id VARCHAR(255) PRIMARY KEY,
      executed_at TIMESTAMP DEFAULT NOW()
    );
  `;

  const queries = createTableSQL.split(';').filter(q => q.trim());

  for (const query of queries) {
    if (query.trim()) {
      try {
        await pool.query(query);
      } catch (err) {
        // Ignore "already exists" errors - idempotent init
        if (!err.message.includes('already exists') && !err.message.includes('duplicate')) {
          console.warn('⚠️  Init warning:', err.message);
        }
      }
    }
  }

  console.log('✅ Database initialized');
}

// ── Start server ──
async function startServer() {
  try {
    console.log('🔄 Initializing database...');
    await initializeDatabaseOnStartup();
    console.log('✅ Database ready');
  } catch (err) {
    console.error('❌ Database initialization failed:', err.message);
    // Don't exit - let the app try to run anyway
    console.warn('⚠️  Continuing without database...');
  }

  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📊 Database: ${process.env.DATABASE_URL || 'Not configured'}`);
  });
}

startServer();

module.exports = { app, pool };
