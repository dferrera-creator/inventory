# PostgreSQL Database Setup Guide

## Quick Start

### Option 1: Automatic Initialization (Recommended)

The app automatically initializes the database on first server start:

```bash
npm run setup-db
npm start
```

**What happens:**
- Tables are created if they don't exist
- Indexes are created for optimal performance
- Triggers are set up for automatic timestamp updates
- App is ready to use

---

### Option 2: Manual SQL Initialization

Run the SQL script directly with `psql`:

```bash
psql -U your_postgres_user -d inventory_db -f init.sql
```

Or from within PostgreSQL CLI:

```sql
\i init.sql
```

---

## Database Structure

### Table: `inventories`

Stores all inventory, inspection, and onboarding records.

```sql
CREATE TABLE inventories (
  id BIGSERIAL PRIMARY KEY,                    -- Auto-incrementing ID
  unit_id VARCHAR(255) UNIQUE NOT NULL,        -- Property unit identifier
  unit_name VARCHAR(255),                      -- Property/unit name
  auditor VARCHAR(255),                        -- Inspector/auditor name
  data JSONB DEFAULT '{}',                     -- Full record data (JSON)
  created_at TIMESTAMP DEFAULT NOW(),          -- Creation timestamp
  updated_at TIMESTAMP DEFAULT NOW()           -- Last update timestamp
);
```

### Indexes

For fast queries:

```sql
CREATE INDEX idx_unit_id ON inventories(unit_id);
CREATE INDEX idx_updated_at ON inventories(updated_at DESC);
CREATE INDEX idx_unit_name ON inventories(unit_name);
CREATE INDEX idx_created_at ON inventories(created_at DESC);
```

### Auto-Update Trigger

Automatically updates `updated_at` when a record is modified:

```sql
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
```

### Migration Table

Tracks which migrations have been applied:

```sql
CREATE TABLE migrations (
  id VARCHAR(255) PRIMARY KEY,
  executed_at TIMESTAMP DEFAULT NOW()
);
```

---

## Environment Configuration

Set your database URL in `.env`:

```env
DATABASE_URL=postgresql://username:password@localhost:5432/inventory_db
NODE_ENV=development
PORT=3000
```

### Local PostgreSQL Example:
```env
DATABASE_URL=postgresql://postgres:password@localhost:5432/inventory_db
```

### Railway/Cloud PostgreSQL Example:
```env
DATABASE_URL=postgresql://user:pass@db.example.com:5432/inventory_prod
```

---

## Available NPM Commands

```bash
# Initialize database (creates tables and indexes)
npm run db:init

# Run migrations (if any)
npm run db:migrate

# Both init and migrate
npm run setup-db

# Start the server (auto-initializes on startup)
npm start

# Development mode with auto-reload
npm run dev
```

---

## Data Structure Examples

### Inventory Record
```json
{
  "unitId": "A101",
  "unitName": "Apartment 101",
  "auditor": "John Doe",
  "type": "inventory",
  "date": "2026-04-13",
  "rooms": [
    {
      "name": "Living Room",
      "items": [
        {
          "name": "Sofa",
          "status": true,
          "notes": "Good condition"
        }
      ]
    }
  ]
}
```

### Inspection Record
```json
{
  "unitId": "A101",
  "unitName": "Apartment 101",
  "auditor": "Jane Smith",
  "type": "inspection",
  "date": "2026-04-13",
  "rooms": [
    {
      "name": "Living Room",
      "items": [
        {
          "name": "Sofa",
          "status": false,
          "notes": "Needs repair"
        }
      ]
    }
  ],
  "versions": []
}
```

### Onboarding Record
```json
{
  "unitId": "A101",
  "unitName": "Apartment 101",
  "auditor": "Manager",
  "type": "onboarding",
  "date": "2026-04-13",
  "sections": [
    {
      "name": "Utilities",
      "groups": [
        {
          "name": "Electrical",
          "items": [
            {
              "name": "Circuit breaker panel",
              "status": true
            }
          ]
        }
      ]
    }
  ]
}
```

---

## Troubleshooting

### Database won't connect
```bash
# Test your DATABASE_URL is correct
psql $DATABASE_URL

# Check if PostgreSQL is running
psql --version
```

### Tables not created
```bash
# Force re-initialization
npm run setup-db
```

### Permission errors
```bash
# Make sure your PostgreSQL user has CREATE TABLE permissions
# Create a dedicated user if needed:
createuser -P inventory_user
createdb -O inventory_user inventory_db
```

---

## API Endpoints Using This Database

- `POST /api/inventory` - Save inventory/inspection/onboarding
- `GET /api/inventory` - List all inventories
- `GET /api/inventory/:unitId` - Get specific inventory
- `DELETE /api/inventory/:unitId` - Delete inventory
- `GET /api/records` - Get all records (for histórico)

All endpoints automatically use the PostgreSQL database defined in `DATABASE_URL`.
