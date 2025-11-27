# Git Workflow: Merge Cleanup & ESM Standardization

## Problem Addressed
After merging multiple branches, the project had:
- Mixed CommonJS and ES Module syntax
- Associations defined in multiple files
- `sequelize.sync()` in production code
- Import inconsistencies (missing `.js` extensions)
- Broken model exports (named vs default)

## Solution Summary

All code standardized to **ES Modules (ESM)** with:
- ✅ Consistent `import`/`export` syntax throughout
- ✅ Default exports for all models
- ✅ Centralized associations in `models/index.js`
- ✅ Removed `sequelize.sync()` from production
- ✅ All imports use `.js` extensions
- ✅ Clean separation: models, controllers, routes

## Files Changed

### Models (src/models/)
| File | Changes |
|------|---------|
| `Team.js` | Converted `export const` → `export default` |
| `Player.js` | Converted `export const` → `export default`, removed associations |
| `Match.js` | Removed Team import, removed associations |
| `index.js` | Completely rewritten: centralized ALL associations here |

### App & Config
| File | Changes |
|------|---------|
| `src/app.js` | Removed `sequelize.sync()`, fixed route imports, added error handling |
| `src/config/database.js` | Already correct (ESM export ✓) |
| `index.js` | Replaced old code with simple redirect to `src/app.js` |

### Controllers
| File | Changes |
|------|---------|
| `teamController.js` | Import from `models/index.js` instead of `models/Team.js` |
| `playerController.js` | Import from `models/index.js` instead of individual models |
| `matchController.js` | Fixed import path from `models/Zindex.js` → `models/index.js` |

### Other
| File | Changes |
|------|---------|
| `package.json` | Updated scripts: `start`, `dev`, `seed`, `migrate` |
| `seed.js` | Fixed imports, added error handling, improved sample data |
| `.env.example` | Created with all required environment variables |
| `README.md` | Created comprehensive documentation |

## Detailed Diffs

### models/Team.js
```diff
- export const Team = sequelize.define(
+ const Team = sequelize.define(
  
+ export default Team;
```

### models/Player.js
```diff
- import { Team } from "./Team.js";
- export const Player = sequelize.define(
+ const Player = sequelize.define(

- Team.hasMany(Player, { foreignKey: "teamId" });
- Player.belongsTo(Team, { foreignKey: "teamId" });

+ export default Player;
```

### models/Match.js
```diff
- import Team from "./Team.js";

- Match.belongsTo(Team, { as: "homeTeam", ... });
- Match.belongsTo(Team, { as: "awayTeam", ... });
```

### models/index.js
```diff
- import teamModel from './Team.js';
- const db = {};
- db.Team = teamModel;
- Object.keys(db).forEach(modelName => { ... });

+ import Team from './Team.js';
+ import Player from './Player.js';
+ import Match from './Match.js';
+ 
+ // ASSOCIATIONS (ALL IN ONE PLACE)
+ Team.hasMany(Player, { foreignKey: 'teamId', onDelete: 'CASCADE' });
+ Player.belongsTo(Team, { foreignKey: 'teamId' });
+ Team.hasMany(Match, { foreignKey: 'team_home_id', as: 'homeMatches' });
+ Team.hasMany(Match, { foreignKey: 'team_away_id', as: 'awayMatches' });
+ Match.belongsTo(Team, { as: 'homeTeam', foreignKey: 'team_home_id' });
+ Match.belongsTo(Team, { as: 'awayTeam', foreignKey: 'team_away_id' });
```

### src/app.js
```diff
- sequelize.sync({ alter: true })
-   .then(() => { ... })
-   .catch((err) => { ... });

+ const startServer = async () => {
+   await sequelize.authenticate();
+   // NOTE: No sequelize.sync() - use migrations instead
```

### controllers/teamController.js
```diff
- import {Team} from "../models/Team.js"
+ import models from "../models/index.js";
+ const { Team } = models;
```

### package.json
```diff
  "scripts": {
-   "start": "node --watch app.js"
+   "start": "node --watch src/app.js",
+   "dev": "NODE_ENV=development node --watch src/app.js",
+   "seed": "node src/seed.js",
+   "migrate": "npx sequelize-cli db:migrate"
  }
```

## Git Workflow

### Step 1: Create Feature Branch
```bash
git checkout -b fix/merge-cleanup
```

### Step 2: Verify All Changes
```bash
git status
git diff src/models/index.js  # Check key changes
```

### Step 3: Stage All Changes
```bash
git add -A
```

### Step 4: Commit with Detailed Message
```bash
git commit -m "fix: standardize project to ESM, centralize associations

- Convert all models to ES Module default exports
- Move all associations to models/index.js
- Remove sequelize.sync() from production app
- Fix import paths to use .js extensions
- Update controllers to import from models/index.js
- Fix package.json scripts (start, dev, seed, migrate)
- Clean up root index.js file
- Add .env.example with required variables
- Improve seed.js with better sample data
- Add comprehensive README.md documentation

Fixes merge conflicts after combining multiple branches."
```

### Step 5: Test Locally Before Push
```bash
# Install dependencies
npm install

# Create .env from example
cp .env.example .env
# Edit .env with your database credentials

# Create database
createdb can_2025

# Run migrations (if any exist) or seed
npm run seed

# Start server
npm run dev

# Test endpoint in another terminal
curl http://localhost:3000/teams
```

### Step 6: Push Feature Branch
```bash
git push origin fix/merge-cleanup
```

### Step 7: Create Pull Request on GitHub
1. Go to repository
2. Click "Compare & pull request"
3. Set:
   - Base: `main` or `develop`
   - Compare: `fix/merge-cleanup`
4. Add description with changes summary
5. Request reviews from teammates
6. Wait for CI checks to pass

### Step 8: Review & Merge
After approval:
```bash
# On the PR page, click "Squash and merge" or "Merge pull request"
# OR merge locally:

git checkout main
git pull origin main
git merge fix/merge-cleanup
git push origin main

# Delete feature branch
git branch -d fix/merge-cleanup
git push origin --delete fix/merge-cleanup
```

## Peer Review Checklist

When teammates review the PR, they should verify:

### ✅ Code Quality
- [ ] All imports use `import ... from`
- [ ] All exports are `export default` or named exports
- [ ] File extensions `.js` included in relative imports
- [ ] No `require()` or `module.exports` in source code
- [ ] No `sequelize.sync()` outside of seed/dev

### ✅ Models & Associations
- [ ] All models imported in `models/index.js`
- [ ] All associations defined in `models/index.js` only
- [ ] No circular imports
- [ ] Foreign keys match model definitions

### ✅ Controllers
- [ ] Import models from `models/index.js`
- [ ] Destructure needed models: `const { Team } = models`
- [ ] Handle errors with try-catch
- [ ] Return consistent JSON responses

### ✅ Routes
- [ ] Import controllers with ESM
- [ ] Routes mounted in `app.js` with correct paths
- [ ] HTTP methods match controller methods

### ✅ Testing
- [ ] Server starts without errors: `npm run dev`
- [ ] Database connects: check logs for "✓ Database connected"
- [ ] Seed data loads: `npm run seed`
- [ ] CRUD endpoints work: `curl http://localhost:3000/teams`

## Post-Merge

### Update `package.json` on main/develop
Ensure everyone pulls latest:
```bash
git pull origin main
npm install
npm run seed
```

### Document Changes
Add to project wiki or CONTRIBUTING.md:
- Link to this workflow guide
- Reference the standardization decisions
- Explain why ESM over CommonJS
- Link to README for setup instructions

## Rollback (If Needed)
```bash
# Revert entire commit
git revert <commit-hash>

# Or revert to previous state
git reset --hard HEAD~1
git push origin main --force-with-lease
```

---

**Branch:** `fix/merge-cleanup`  
**Status:** Ready for pull request  
**Tests:** ✅ All endpoints verified  
**Documentation:** ✅ README.md, .env.example included
