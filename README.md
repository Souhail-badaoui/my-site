# CAN_2025 - Tournament API

A Node.js + Express + Sequelize REST API for managing African Cup of Nations (CAN) 2025 tournament data.

## Project Structure

```
src/
├── app.js                    # Express server entry point
├── seed.js                   # Database seeding script
├── config/
│   └── database.js          # Sequelize configuration
├── models/
│   ├── index.js             # Central model imports & associations
│   ├── Team.js              # Team model
│   ├── Player.js            # Player model
│   └── Match.js             # Match model
├── controllers/
│   ├── teamController.js    # Team CRUD logic
│   ├── playerController.js  # Player CRUD logic
│   └── matchController.js   # Match CRUD logic
├── routes/
│   ├── teamRoutes.js        # Team endpoints
│   ├── playerRoutes.js      # Player endpoints
│   └── matchRoutes.js       # Match endpoints
├── middlewares/
│   ├── authMiddleware.js    # Authentication
│   ├── roleMiddleware.js    # Authorization (admin)
│   ├── validation.js        # Input validation
│   └── errorHandler.js      # Global error handling
└── utils/
    └── helpers.js           # Utility functions
```

## Prerequisites

- Node.js 16+ 
- PostgreSQL 12+
- npm or yarn

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Setup Environment Variables

Copy `.env.example` to `.env` and update with your database credentials:

```bash
cp .env.example .env
```
### -.env-

### 3. Create Database

Create a PostgreSQL database named `can_2025`:

```bash
createdb can_2025
```

Or use PostgreSQL client:
```sql
CREATE DATABASE can_2025;
```

### 4. Run Migrations

```bash
npm run migrate
```

If migrations don't exist, use seed to create and populate tables:

```bash
npm run seed
```

This will create 2 teams (Morocco, Senegal) and 6 players with test data.

### 5. Start Server

**Development (with auto-reload):**
```bash
npm run dev
```

**Production:**
```bash
npm start
```

Server runs on `http://localhost:3000`

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start production server with watch mode |
| `npm run dev` | Start development server (NODE_ENV=development) |
| `npm run seed` | Seed database with sample data (2 teams, 6 players) |
| `npm run migrate` | Run pending migrations (sequelize-cli) |
| `npm run migrate:undo` | Undo last migration |

## API Endpoints

### Teams
- `GET /teams` - List all teams
- `GET /teams/:id` - Get team by ID (includes associated players)
- `POST /teams` - Create team
- `PUT /teams/:id` - Update team
- `DELETE /teams/:id` - Delete team

**Example POST /teams:**
```json
{
  "name": "Egypt",
  "coach": "Shawky Gharib",
  "group": "B",
  "ranking": 5
}
```

### Players
- `GET /players` - List all players (includes team info)
- `GET /players/:id` - Get player by ID (includes team info)
- `POST /players` - Create player
- `PUT /players/:id` - Update player
- `DELETE /players/:id` - Delete player

**Example POST /players:**
```json
{
  "name": "Salah Fathy",
  "position": "CB",
  "number": 4,
  "age": 28,
  "teamId": 1
}
```

### Matches
- `GET /matches` - List all matches (sorted by date)
- `GET /matches/:id` - Get match by ID (includes team info)
- `POST /matches` - Create match (admin only)
- `PUT /matches/:id` - Update match (admin only)
- `DELETE /matches/:id` - Delete match (admin only)

**Example POST /matches:**
```json
{
  "team_home_id": 1,
  "team_away_id": 2,
  "match_date": "2025-01-15T18:00:00Z",
  "stadium": "Cairo International Stadium",
  "score_home": 0,
  "score_away": 0,
  "status": "scheduled"
}
```

## Database Models

### Team
- `id` (Integer, PK)
- `name` (String, required)
- `coach` (String, optional)
- `group` (String, required)
- `ranking` (Integer, optional)
- `createdAt` (Timestamp)
- `updatedAt` (Timestamp)

**Associations:**
- One team has many players
- One team can be home/away team in many matches

### Player
- `id` (Integer, PK)
- `name` (String, required)
- `position` (String, required)
- `number` (Integer, required)
- `age` (Integer, optional)
- `teamId` (Integer, FK to Team)
- `createdAt` (Timestamp)
- `updatedAt` (Timestamp)

**Associations:**
- Many players belong to one team

### Match
- `id` (Integer, PK)
- `team_home_id` (Integer, FK to Team, required)
- `team_away_id` (Integer, FK to Team, required)
- `match_date` (Date, required)
- `stadium` (String, required)
- `score_home` (Integer, default: 0)
- `score_away` (Integer, default: 0)
- `status` (ENUM: 'scheduled', 'live', 'finished', default: 'scheduled')
- `createdAt` (Timestamp)
- `updatedAt` (Timestamp)

**Associations:**
- Match belongs to home team (Team as 'homeTeam')
- Match belongs to away team (Team as 'awayTeam')

## Project Standards

### ESM (ES Modules)
All files use ES Module syntax:
- `import` instead of `require`
- `export default` or named exports
- File extensions must include `.js` in imports: `import Model from './Model.js'`

### Model Organization
- All associations defined in `src/models/index.js`
- Individual models in separate files
- Central export: `import models from './models/index.js'`

### Database
- No `sequelize.sync()` in production
- Use migrations for schema changes
- `sequelize.sync()` only in dev/seed with `force: true`

### Controllers
- Controllers import models from `src/models/index.js`
- Handle HTTP logic only (no business logic in routes)
- Consistent error handling

## Testing Endpoints

### Test with cURL

```bash
# Get all teams
curl http://localhost:3000/teams

# Create a team
curl -X POST http://localhost:3000/teams \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Nigeria",
    "coach": "José Peseiro",
    "group": "C",
    "ranking": 3
  }'

# Get team with ID 1
curl http://localhost:3000/teams/1

# Create a player
curl -X POST http://localhost:3000/players \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Emmanuel Nwankwo",
    "position": "ST",
    "number": 9,
    "age": 30,
    "teamId": 1
  }'

# Get all matches
curl http://localhost:3000/matches
```

### Test with Postman

1. Import endpoint collection or manually create requests
2. Set base URL: `http://localhost:3000`
3. Try CRUD operations on `/teams`, `/players`, `/matches`

## Troubleshooting

### Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:5432
```
- Check PostgreSQL is running: `sudo service postgresql start`
- Verify `.env` database credentials
- Ensure database `can_2025` exists

### Migration Errors
```
sequelize-cli not found
```
```bash
npm install --save-dev sequelize-cli
```

### Port Already in Use
```
Error: listen EADDRINUSE :::3000
```
- Change `APP_PORT` in `.env`
- Or kill process: `lsof -i :3000` then `kill -9 <PID>`

## Development Notes

### Adding a New Model
1. Create `src/models/NewModel.js`
2. Define model with `sequelize.define()`
3. Import in `src/models/index.js`
4. Define associations in `models/index.js`
5. Create controller in `src/controllers/`
6. Create routes in `src/routes/`
7. Mount routes in `src/app.js`

### Database Migrations
To create a migration (if you have sequelize-cli set up):
```bash
npx sequelize-cli migration:generate --name add-column-to-teams
```

Then run:
```bash
npm run migrate
```

## Git Workflow for Fixes

Create a feature branch for fixes:
```bash
git checkout -b fix/merge-cleanup
git add .
git commit -m "fix: standardize to ESM, centralize associations, remove sequelize.sync from production"
git push origin fix/merge-cleanup
```

Create a pull request and merge after review.

## License

ISC

## Support

For issues or questions, open a GitHub issue or contact the team.
