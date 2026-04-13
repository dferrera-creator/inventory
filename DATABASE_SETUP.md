# Database Setup Guide

## Quick Start

### Prerequisites
- PostgreSQL 12+ installed and running
- Node.js 18+ installed
- npm or yarn

### Step 1: Verify PostgreSQL is Running

Check if PostgreSQL is running on your system:

```bash
# macOS with Homebrew
brew services list

# Linux (systemctl)
sudo systemctl status postgresql

# Or test the connection directly
psql -U postgres -h localhost -c "SELECT NOW();"
```

### Step 2: Create Database (if needed)

```bash
# Connect to PostgreSQL as default user
psql -U postgres -h localhost

# In psql prompt, create the database:
CREATE DATABASE inventory_db;
\q
```

### Step 3: Configure Environment

The `.env` file has already been created with default settings:

```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/inventory_db
NODE_ENV=development
PORT=3000
```

**If your PostgreSQL uses different credentials, update the DATABASE_URL:**

```env
DATABASE_URL=postgresql://username:password@localhost:5432/inventory_db
```

### Step 4: Reset & Seed Database

Reset the database and populate it with test data:

```bash
npm run db:reset
```

This command will:
1. Drop existing `inventories` table (if it exists)
2. Create a new `inventories` table with proper schema
3. Create indexes for performance
4. Insert 3 sample records:
   - ✅ **Inventory**: Complete unit inspection with all rooms
   - ✅ **Inspection**: Follow-up inspection on the same unit
   - ✅ **Onboarding**: Detailed onboarding checklist

### Step 5: Start the Server

```bash
npm run dev
```

The server will start on `http://localhost:3000`

### Step 6: Test in Browser

1. Open http://localhost:3000
2. Click **"Histórico"** button
3. Login with credentials:
   - **Usuario**: `operaciones123`
   - **Contraseña**: `Delmar2026`
4. You should see 3 test records in the histórico

## Individual Commands

### Initialize Database Schema Only
```bash
npm run db:init
```
Creates the `inventories` table with proper structure.

### Seed with Test Data Only
```bash
npm run db:seed
```
Adds 3 sample records to the database.

### Full Reset (Drop and Recreate)
```bash
npm run db:reset
```
Equivalent to: `db:init && db:seed`

## Test Data Details

### 1. Inventory Record
- **Unit**: Departamento 101 - Piso 3
- **Auditor**: Juan García
- **Date**: 2026-04-10
- **Rooms**: Living, Kitchen, Bedroom, Bathroom
- **Items**: ~18 items across all rooms
- **Status**: All items marked as complete

### 2. Inspection Record
- **Unit**: Departamento 101 - Piso 3 (same as inventory)
- **Auditor**: María López
- **Date**: 2026-04-12 (2 days after inventory)
- **Status**: Most items OK, 1 damaged (mesita rayón), 1 needs repair (lavamanos)

### 3. Onboarding Record
- **Unit**: Departamento 201 - Piso 4
- **Auditor**: Carlos Rodríguez
- **Date**: 2026-04-08
- **Sections**: General Checklist, Kitchen, Bedroom, Bathroom
- **Items**: ~13 items with detailed setup notes

## Database Schema

```sql
CREATE TABLE inventories (
  id BIGSERIAL PRIMARY KEY,
  unit_id VARCHAR(255) UNIQUE NOT NULL,    -- Unique record identifier
  unit_name VARCHAR(255),                   -- Display name (e.g., "Apt 101")
  auditor VARCHAR(255),                     -- Person who created the record
  data JSONB DEFAULT '{}',                  -- Full record data (type, rooms, etc.)
  created_at TIMESTAMP DEFAULT NOW(),       -- Record creation time
  updated_at TIMESTAMP DEFAULT NOW()        -- Last update time
);

-- Indexes for fast queries
CREATE INDEX idx_unit_id ON inventories(unit_id);
CREATE INDEX idx_updated_at ON inventories(updated_at DESC);
CREATE INDEX idx_unit_name ON inventories(unit_name);
```

## Troubleshooting

### ❌ "Cannot connect to PostgreSQL"
- Verify PostgreSQL is running: `psql -U postgres -h localhost`
- Check DATABASE_URL in `.env` file
- Ensure database `inventory_db` exists

### ❌ "Database does not exist"
Create it manually:
```bash
psql -U postgres -h localhost -c "CREATE DATABASE inventory_db;"
```

### ❌ "Table already exists"
The init script safely drops and recreates the table. If you want to keep existing data:
- Remove the `DROP TABLE IF EXISTS inventories CASCADE;` line from `scripts/initDatabase.js`
- Or manually preserve data before running `npm run db:reset`

### ❌ "Port 3000 already in use"
Change PORT in `.env` or kill the process using that port

## Verifying the Setup

### Check Database Connection
```bash
# Test the database endpoint
curl http://localhost:3000/api/db-health
```

Should return: `{"status":"OK","timestamp":"..."}`

### Check Records
After starting the server, check the API:
```bash
curl http://localhost:3000/api/inventory
```

Should return all 3 records with full details.

## Adding More Test Data

To add additional test records, modify `scripts/seedDatabase.js`:

1. Create additional record objects (copy the sample structure)
2. Add more `pool.query()` calls for each record
3. Run `npm run db:seed` again

Or use the app's UI to create more records by:
1. Running an inventory or inspection
2. Clicking the "Guardar" button to save to database
3. New records will appear in "Histórico"

## Production Setup

For production deployment (e.g., Railway, Heroku):

1. Create PostgreSQL database on your hosting platform
2. Set `DATABASE_URL` environment variable to your remote database URL
3. Run `npm run db:reset` to initialize the production database
4. Deploy the application

Example Railway setup:
```bash
# Railway will provide DATABASE_URL automatically
# Just run the init command on first deploy
npm run db:init
```

---

Need help? Check the main README.md or review the app code in `server.js` and `api-client.js`.
