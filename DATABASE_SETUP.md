# PostgreSQL Database Setup Guide

## Overview
This project uses PostgreSQL on Railway with automatic database initialization and migrations.

## Local Development

### Prerequisites
- Node.js 18+
- PostgreSQL installed locally (or Railway PostgreSQL connection string)

### Setup Steps

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment:**
   Create a `.env` file (copy from `.env.example`):
   ```env
   DATABASE_URL=postgresql://user:password@localhost:5432/inventory_db
   NODE_ENV=development
   PORT=3000
   ```

3. **Initialize database:**
   ```bash
   npm run db:init
   ```

4. **Run migrations:**
   ```bash
   npm run db:migrate
   ```

5. **Start server:**
   ```bash
   npm run dev
   ```

### Complete build (db + migrations + start):
```bash
npm run build
npm start
```

---

## Railway Deployment

### Step 1: Set Up Railway PostgreSQL
1. Create a new Railway project
2. Add a PostgreSQL plugin
3. Copy the `DATABASE_URL` from the PostgreSQL plugin settings

### Step 2: Configure Environment Variables
In Railway dashboard, add:
- `DATABASE_URL`: Your Railway PostgreSQL connection string
- `NODE_ENV`: `production`
- `PORT`: `3000` (Railway assigns this automatically)

### Step 3: Deploy
1. Connect your GitHub repository to Railway
2. Railway will:
   - Build the project with `npm install`
   - Run `npm run build` (which calls db:init and db:migrate)
   - Start with `npm start`

### Step 4: Verify
- Check logs in Railway dashboard
- Test health endpoint: `GET /health`
- Test database: `GET /api/db-health`

---

## Database Schema

### Tables
- **inventories**: Stores all inventory/inspection records
  - `id`: Auto-incrementing primary key
  - `unit_id`: Unique identifier for the unit
  - `unit_name`: Name of the unit
  - `auditor`: Person who conducted the audit
  - `data`: JSONB field for flexible data storage
  - `created_at`: Timestamp of creation
  - `updated_at`: Auto-updated timestamp

### Indexes
- `idx_unit_id`: Fast lookups by unit ID
- `idx_updated_at`: Fast sorting by date
- `idx_unit_name`: Fast searches by unit name

### Triggers
- `update_inventories_updated_at`: Automatically updates `updated_at` on row changes

---

## Auto-Build Process

The database auto-builds through:

1. **npm run db:init**: Creates tables and indexes
2. **npm run db:migrate**: Runs all migrations in order
3. **Procfile**: Railway executes `release: npm run build` before starting the app
4. **railway.json**: Deployment configuration

---

## API Endpoints

- `GET /health` - Server health check
- `GET /api/db-health` - Database connection check
- `POST /api/inventory` - Save inventory
- `GET /api/inventory` - List all inventories
- `GET /api/inventory/:unitId` - Get single inventory
- `DELETE /api/inventory/:unitId` - Delete inventory
- `GET /api/records` - Get all records with statistics

---

## Migration System

Migrations are tracked in the `migrations` table. Each migration:
- Has a unique ID
- Runs only once (prevents duplicate execution)
- Is logged with execution timestamp

To add a new migration:
1. Add a new object to the `migrations` array in `scripts/migrate.js`
2. Define `id` and `up` SQL
3. Run `npm run db:migrate`

---

## Troubleshooting

### Database connection fails
- Check `DATABASE_URL` is correct
- Verify PostgreSQL is running
- Ensure port 5432 is accessible

### Migrations don't run
- Check `migrations` table exists
- Verify database permissions
- Check logs in Railway dashboard

### Tables not created
- Run `npm run db:init` manually
- Check database user has CREATE privilege
- Verify DATABASE_URL format

---

## Next Steps

1. Replace Supabase integration with PostgreSQL endpoints in `app.js`
2. Point frontend to `http://localhost:3000/api` (or Railway URL)
3. Update API calls in `supabase.js` or replace with fetch calls to Express endpoints
