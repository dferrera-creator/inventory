# Railway PostgreSQL Setup Guide

## Quick Start

This project is configured to run on Railway with PostgreSQL. Follow these steps to deploy:

### 1. Create Railway Account & Project
- Go to [railway.app](https://railway.app)
- Sign up / log in with GitHub
- Create a new project

### 2. Add PostgreSQL
- Click "Add Service" → "PostgreSQL"
- Railway creates a PostgreSQL instance automatically
- Copy the `DATABASE_URL` from the PostgreSQL service variables

### 3. Configure Environment Variables
In your Railway project dashboard:
1. Click your Node.js service (or create one)
2. Go to "Variables"
3. Add these variables:
   ```
   DATABASE_URL=<paste from PostgreSQL service>
   NODE_ENV=production
   PORT=3000
   ```

### 4. Connect GitHub Repository
1. Create a GitHub repository or use existing
2. In Railway: Click "Connect Repo" → Select your repo
3. Railway auto-deploys on push to main/master

### 5. Deploy Process
The `Procfile` automatically runs:
```
release: npm run build    # Initializes and migrates database
web: npm start            # Starts Express server
```

Railway will:
1. ✅ Install dependencies: `npm install`
2. ✅ Run build: `npm run build` (creates tables, runs migrations)
3. ✅ Start server: `npm start`

---

## What Gets Auto-Built

### Database Schema (Automatic)
The `npm run build` command (run by `Procfile` release phase):

1. **Creates `inventories` table:**
   - Auto-incrementing ID
   - Unique unit_id constraint
   - JSONB data column for flexible storage
   - Timestamps (created_at, updated_at)

2. **Creates Indexes:**
   - `idx_unit_id`: Fast unit lookups
   - `idx_updated_at`: Fast chronological sorting
   - `idx_unit_name`: Fast name searches

3. **Adds Trigger:**
   - Auto-updates `updated_at` on any record change

4. **Creates Migrations Table:**
   - Tracks which migrations have run
   - Prevents duplicate execution

---

## Local Development

### Prerequisites
```bash
node --version  # Should be 18+
npm --version
```

### Setup
```bash
# 1. Install dependencies
npm install

# 2. Create .env file
cp .env.example .env

# 3. Update DATABASE_URL in .env (for local PostgreSQL or Railway)
# DATABASE_URL=postgresql://user:password@localhost:5432/inventory_db

# 4. Initialize database
npm run db:init

# 5. Run migrations
npm run db:migrate

# 6. Start development server
npm run dev
```

### Full Build Command
```bash
npm run build  # Runs init + migrate + everything ready
npm start      # Runs Express server
```

---

## API Endpoints

### Health & Status
- `GET /health` - Server status
- `GET /api/db-health` - Database connection status

### Inventory Management
- `POST /api/inventory` - Save/update inventory
- `GET /api/inventory` - List all inventories
- `GET /api/inventory/:unitId` - Get specific inventory
- `DELETE /api/inventory/:unitId` - Delete inventory

### Records & History
- `GET /api/records` - Get all records with statistics

---

## Frontend Integration

### Option 1: Update HTML to Use New API Client
```html
<!-- Replace supabase.js with api-client.js -->
<script src="api-client.js"></script>
```

Then update calls from:
```javascript
// Old Supabase way
await saveInventory(doc);

// Still works with api-client.js!
await saveInventory(doc);  // Same interface, different backend
```

### Option 2: Direct API Calls
```javascript
const response = await fetch('/api/inventory', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(inventoryData),
});
```

---

## Monitoring & Logs

### View Logs in Railway
1. Open your project in Railway
2. Click "Logs" to see real-time server output
3. Check for errors during database initialization

### Test Endpoints
```bash
# In Railway, visit:
# https://your-app.railway.app/health
# https://your-app.railway.app/api/db-health
```

### Verify Database
```bash
# Run from Railway shell:
npm run db:init    # Re-initialize if needed
npm run db:migrate # Run all migrations
```

---

## Troubleshooting

### "Connection refused" on startup
- Verify `DATABASE_URL` is correct
- Check PostgreSQL service is running in Railway
- Wait 30 seconds for Railway to start services

### "Relation 'inventories' does not exist"
- Database wasn't initialized
- Run: `npm run build` manually
- Check logs for errors

### Migrations table doesn't exist
- Part of the auto-build process
- Run `npm run db:migrate` to create it

### Port already in use (local)
```bash
# Change port in .env
PORT=3001
npm start
```

---

## Files Overview

| File | Purpose |
|------|---------|
| `server.js` | Express.js server with API endpoints |
| `api-client.js` | Frontend API client (replaces Supabase) |
| `scripts/initDatabase.js` | Creates tables and indexes |
| `scripts/migrate.js` | Runs migrations (idempotent) |
| `Procfile` | Railway build/start commands |
| `railway.json` | Railway deployment config |
| `package.json` | Dependencies and scripts |
| `.env.example` | Environment variables template |

---

## Production Checklist

- [ ] DATABASE_URL configured in Railway
- [ ] NODE_ENV set to 'production'
- [ ] Server deployed and running
- [ ] Database initialized (check logs)
- [ ] API endpoints responding
- [ ] Frontend connected to new API

---

## Next Steps

1. **Push this branch** to GitHub
2. **Connect Railway** to your repository
3. **Verify deployment** - check logs
4. **Test API** - use health endpoints
5. **Update frontend** - use api-client.js or new endpoints
6. **Remove Supabase** - once fully migrated

---

## Support

For Railway issues: [Railway Docs](https://docs.railway.app)
For PostgreSQL help: [PostgreSQL Docs](https://www.postgresql.org/docs)
