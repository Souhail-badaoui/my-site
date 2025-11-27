 
import { Sequelize } from "sequelize";
const { Op } = Sequelize; 
import "../models/index.js";

import Match from "../models/Match.js"
import Team from "../models/Team.js"

const includeTeams = [
    { model: Team, as: 'homeTeam', attributes: ['id', 'name'] },
    { model: Team, as: 'awayTeam', attributes: ['id', 'name'] }
];

export const createMatch = async (req, res) => {
    try {
        const { team_home_id, team_away_id } = req.body;

        if (team_home_id === team_away_id) {
            return res.status(400).json({ message: "Home and Away teams must be different." });
        }
        
        const homeTeam = await Team.findByPk(team_home_id);
        const awayTeam = await Team.findByPk(team_away_id);
        if (!homeTeam || !awayTeam) {
            return res.status(404).json({ message: "One or both teams not found." });
        }

        const match = await Match.create(req.body);
        res.status(201).json({ message: "Match created successfully", match });
    } catch (err) {
        res.status(400).json({ error: "Could not create match.", details: err.message });
    }
};
export const getMatches = async (req, res) => {
    try {
        const matches = await Match.findAll({
            include: includeTeams, 
            order: [['match_date', 'ASC']] 
        });
        res.status(200).json(matches);
    } catch (err) {
        res.status(500).json({ error: "Failed to retrieve matches.", details: err.message });
    }
};

export const getMatch = async (req, res) => {
    try {
        const match = await Match.findByPk(req.params.id, {
            include: includeTeams
        });

        if (!match) {
            return res.status(404).json({ message: "Match not found." });
        }

        res.status(200).json(match);
    } catch (err) {
        res.status(500).json({ error: "Failed to retrieve match details.", details: err.message });
    }
};

export const updateMatch = async (req, res) => {
    try {
        const [updatedRows] = await Match.update(req.body, { 
            where: { id: req.params.id }
        });

        if (updatedRows === 0) {
            return res.status(404).json({ message: "Match not found or no valid data provided for update." });
        }
    const updatedMatch = await Match.findByPk(req.params.id, { include: includeTeams });
        res.status(200).json({ message: "Match updated successfully.", match: updatedMatch });

    } catch (err) {
        res.status(400).json({ error: "Failed to update match.", details: err.message });
    }
};

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
