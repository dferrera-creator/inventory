// ══════════════════════════════════════════
// DEPLOYMENT INITIALIZATION SCRIPT
// Runs on Railway startup to ensure database is ready
// ══════════════════════════════════════════

const { Pool } = require('pg');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function checkAndInitialize() {
  try {
    console.log('🚀 Railway Deployment Initialization');
    console.log('═══════════════════════════════════════════════\n');

    // Check if tables exist
    const tablesQuery = `
      SELECT EXISTS(
        SELECT 1 FROM information_schema.tables
        WHERE table_name = 'inventories'
      ) as exists;
    `;

    const result = await pool.query(tablesQuery);
    const tableExists = result.rows[0].exists;

    if (!tableExists) {
      console.log('📊 Initializing database schema...');

      const initSql = fs.readFileSync(
        path.join(__dirname, '../init.sql'),
        'utf8'
      );

      // Split and execute each query
      const queries = initSql.split(';').filter(q => q.trim());
      for (const query of queries) {
        if (query.trim()) {
          await pool.query(query);
        }
      }
      console.log('✅ Database schema created\n');

      // Seed test data if not in production
      if (process.env.NODE_ENV !== 'production') {
        console.log('🌱 Seeding test data...');

        // Read and require the seed script
        const seedScript = require('./seedDatabase.js');
        console.log('✅ Test data seeded\n');
      }
    } else {
      console.log('✅ Database tables already exist\n');
    }

    console.log('═══════════════════════════════════════════════');
    console.log('✨ Initialization complete. Server starting...\n');

  } catch (err) {
    console.error('❌ Initialization error:', err.message);
    // Don't exit - let the server start anyway
  } finally {
    await pool.end();
  }
}

// Run initialization then start server
checkAndInitialize().then(() => {
  // Start the actual server
  require('../server.js');
}).catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
