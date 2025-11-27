# Quick Start Terminal Commands

Copy and paste these commands in order to test the fixed project.

## Step 1: Install Dependencies
```bash
cd c:\Users\hp\Desktop\CAN_2025
npm install
```

## Step 2: Create Environment File
```bash
cp .env.example .env
```

Then edit `.env` with your PostgreSQL credentials:
```bash
# On Windows, use Notepad or your editor:
# DB_HOST=localhost
# DB_USER=postgres
# DB_PASSWORD=your_password
```

## Step 3: Create Database
```bash
# Using Windows Command Line with PostgreSQL installed:
createdb -U postgres can_2025

# Or using PostgreSQL command line:
# psql -U postgres
# CREATE DATABASE can_2025;
```

## Step 4: Seed Database (Creates Tables & Sample Data)
```bash
npm run seed
```

**Expected Output:**
```
✓ Database connected
✓ Tables synced (all data cleared)
✓ Created team: Morocco
✓ Created team: Senegal
✓ Created 3 Morocco players
✓ Created 3 Senegal players
✓ Seeding completed successfully!
```

## Step 5: Start Server
```bash
npm run dev
```

**Expected Output:**
```
✓ Database connected successfully!
✓ Server running on http://localhost:3000
```

## Step 6: Test Endpoints (in NEW terminal)

### Get All Teams
```bash
curl http://localhost:3000/teams
```

**Expected:** Array with 2 teams (Morocco, Senegal)

### Get All Players
```bash
curl http://localhost:3000/players
```

**Expected:** Array with 6 players

### Get All Matches
```bash
curl http://localhost:3000/matches
```

**Expected:** Empty array `[]`

### Create a Team
```bash
curl -X POST http://localhost:3000/teams ^
  -H "Content-Type: application/json" ^
  -d "{\"name\":\"Egypt\",\"coach\":\"Shawky Gharib\",\"group\":\"B\",\"ranking\":5}"
```

**Expected:** New team object with id: 3

### Create a Player
```bash
curl -X POST http://localhost:3000/players ^
  -H "Content-Type: application/json" ^
  -d "{\"name\":\"Mohamed Salah\",\"position\":\"RW\",\"number\":10,\"age\":32,\"teamId\":3}"
```

**Expected:** New player object

### Create a Match
```bash
curl -X POST http://localhost:3000/matches ^
  -H "Content-Type: application/json" ^
  -d "{\"team_home_id\":1,\"team_away_id\":2,\"match_date\":\"2025-01-15T18:00:00Z\",\"stadium\":\"Cairo International\",\"score_home\":0,\"score_away\":0,\"status\":\"scheduled\"}"
```

**Expected:** Match created with id: 1, includes homeTeam and awayTeam details

---

## Git Commands to Commit Changes

```bash
# 1. Create feature branch
git checkout -b fix/merge-cleanup

# 2. Stage all changes
git add -A

# 3. Commit with message
git commit -m "fix: standardize to ESM, centralize associations, remove production sync

- Convert all models to default exports
- Centralize associations in models/index.js
- Remove sequelize.sync() from production
- Fix import paths and add .js extensions
- Update controllers to import from models/index.js
- Fix package.json scripts
- Add .env.example and improve seed.js
- Add comprehensive README.md and documentation"

# 4. Push to remote
git push origin fix/merge-cleanup

# 5. Create Pull Request on GitHub
# Navigate to: https://github.com/Souhail-badaoui/my-site
# Click "Compare & pull request"
# Set base to 'TeamsCrud' and compare to 'fix/merge-cleanup'
# Add PR description and submit
```

---

## Troubleshooting

### Error: "Database connected ECONNREFUSED"
```bash
# Check if PostgreSQL is running:
pg_isready -h localhost -p 5432

# Or start PostgreSQL service on Windows:
# Services > PostgreSQL > Start
```

### Error: "database does not exist"
```bash
# Create the database:
createdb -U postgres can_2025
```

### Error: "npm run seed - command not found"
```bash
# Verify package.json has been updated:
cat package.json | grep -A 6 "scripts"

# Reinstall if needed:
npm install
```

### Error: "Port 3000 already in use"
```bash
# Kill the process using port 3000:
# Windows: netstat -ano | findstr :3000
# Then: taskkill /PID <PID> /F

# Or use different port in .env:
# APP_PORT=3001
```

### Error: Module not found
```bash
# Ensure node_modules is installed:
npm install

# Clear cache and reinstall:
npm cache clean --force
rm -r node_modules package-lock.json
npm install
```

---

## File Changes Summary

| File | Status | Action |
|------|--------|--------|
| `src/models/Team.js` | ✅ Fixed | export const → export default |
| `src/models/Player.js` | ✅ Fixed | export const → export default, removed associations |
| `src/models/Match.js` | ✅ Fixed | Removed associations to index.js |
| `src/models/index.js` | ✅ Fixed | Completely rewritten with centralized associations |
| `src/app.js` | ✅ Fixed | Removed sequelize.sync() |
| `src/controllers/teamController.js` | ✅ Fixed | Import from models/index.js |
| `src/controllers/playerController.js` | ✅ Fixed | Import from models/index.js |
| `src/controllers/matchController.js` | ✅ Fixed | Import from models/index.js |
| `package.json` | ✅ Fixed | Updated scripts |
| `src/seed.js` | ✅ Fixed | Import from models/index.js |
| `.env.example` | ✨ Created | Environment template |
| `README.md` | ✨ Created | Comprehensive documentation |
| `GIT_WORKFLOW.md` | ✨ Created | Git workflow guide |
| `AUDIT_REPORT.md` | ✨ Created | Complete audit report |

---

## Verification Checklist

Run these commands to verify everything works:

```bash
# ✓ Install dependencies
npm install

# ✓ Create environment file
cp .env.example .env

# ✓ Create database
createdb -U postgres can_2025

# ✓ Seed data
npm run seed

# ✓ Start server
npm run dev

# ✓ Test in another terminal (let server run in first terminal)
curl http://localhost:3000/teams
curl http://localhost:3000/players
curl http://localhost:3000/matches
```

**If all curl commands return JSON data, the project is working correctly! ✓**

---

## Documentation Files Created

After fixes, you have:
- ✅ `README.md` - Full project documentation
- ✅ `GIT_WORKFLOW.md` - Step-by-step git workflow
- ✅ `AUDIT_REPORT.md` - Detailed audit findings
- ✅ `.env.example` - Environment template
- ✅ This file - Quick start commands

---

## Contact

For detailed information, refer to:
- **Project Setup:** `README.md`
- **Git Instructions:** `GIT_WORKFLOW.md`  
- **Change Details:** `AUDIT_REPORT.md`

**Current Branch:** `fix/merge-cleanup`  
**Status:** ✅ Ready for Testing & Deployment
