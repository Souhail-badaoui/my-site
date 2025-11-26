<<<<<<< HEAD
=======
// Note: We assume 'db' is your index file exporting all models, 
// and that you are destructuring the needed models directly from it.
import db from '../models/index.js'; 

// Destructure the necessary models and Sequelize instance/Op object
const { Match, Team, Sequelize } = db; 
const { Op } = Sequelize; // Get the Sequelize Operators for complex queries

// Helper for Eager Loading Teams in Read operations
const includeTeams = [
    { model: Team, as: 'homeTeam', attributes: ['id', 'name', 'flag_url'] },
    { model: Team, as: 'awayTeam', attributes: ['id', 'name', 'flag_url'] }
];

// --- 1. CREATE Match (Admin Only) ---
export const createMatch = async (req, res) => {
    try {
        const { team_home_id, team_away_id } = req.body;

        // Validation Check 1: Teams cannot be the same
        if (team_home_id === team_away_id) {
            return res.status(400).json({ message: "Home and Away teams must be different." });
        }
        
        // Validation Check 2: Check if teams exist (optional but recommended)
        const homeTeam = await Team.findByPk(team_home_id);
        const awayTeam = await Team.findByPk(team_away_id);
        if (!homeTeam || !awayTeam) {
            return res.status(404).json({ message: "One or both teams not found." });
        }

        const match = await Match.create(req.body);
        res.status(201).json({ message: "Match created successfully", match });
    } catch (err) {
        // Handle Sequelize validation or foreign key errors
        res.status(400).json({ error: "Could not create match.", details: err.message });
    }
};

// --- 2. READ All Matches (Public) ---
export const getMatches = async (req, res) => {
    try {
        // Eager load team names and flags for display
        const matches = await Match.findAll({
            include: includeTeams, 
            order: [['match_date', 'ASC']] // Order by date for schedule view
        });
        res.status(200).json(matches);
    } catch (err) {
        res.status(500).json({ error: "Failed to retrieve matches.", details: err.message });
    }
};

// --- 3. READ Match by ID (Public) ---
export const getMatch = async (req, res) => {
    try {
        const match = await Match.findByPk(req.params.id, {
            include: includeTeams // Eager load the teams
        });

        if (!match) {
            // Send 404 if the resource isn't found
            return res.status(404).json({ message: "Match not found." });
        }

        res.status(200).json(match);
    } catch (err) {
        res.status(500).json({ error: "Failed to retrieve match details.", details: err.message });
    }
};

// --- 4. UPDATE Match (Admin Only) ---
export const updateMatch = async (req, res) => {
    try {
        const [updatedRows] = await Match.update(req.body, { 
            where: { id: req.params.id }
        });

        if (updatedRows === 0) {
            return res.status(404).json({ message: "Match not found or no valid data provided for update." });
        }

        // Fetch the updated match to return it, including team names
        const updatedMatch = await Match.findByPk(req.params.id, { include: includeTeams });
        res.status(200).json({ message: "Match updated successfully.", match: updatedMatch });

    } catch (err) {
        res.status(400).json({ error: "Failed to update match.", details: err.message });
    }
};

// --- 5. DELETE Match (Admin Only) ---
export const deleteMatch = async (req, res) => {
    try {
        const deletedRows = await Match.destroy({ 
            where: { id: req.params.id }
        });

        if (deletedRows === 0) {
             return res.status(404).json({ message: "Match not found to delete." });
        }

        res.status(200).json({ message: "Match deleted successfully." });
    } catch (err) {
        res.status(500).json({ error: "Failed to delete match.", details: err.message });
    }
};

// Export all functions for use in routes
export default {
    createMatch,
    getMatches,
    getMatch,
    updateMatch,
    deleteMatch
};
>>>>>>> 9c8c7134d262a048c2c57cfba52a726b409ea16d
