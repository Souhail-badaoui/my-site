// src/models/match.js

import { DataTypes } from "sequelize";
import {sequelize} from "../config/database.js";
import Team from "./Team.js"; // Import the Team Model

const Match = sequelize.define("Match", {
    // --- MATCH FIELDS ---
    match_date: { 
        type: DataTypes.DATE, 
        allowNull: false 
    },
    stadium: { // Renamed from 'location' to match ERD
        type: DataTypes.STRING, 
        allowNull: false 
    },
    score_home: { // Renamed from 'scoreA' to match ERD
        type: DataTypes.INTEGER, 
        defaultValue: 0 
    },
    score_away: { // Renamed from 'scoreB' to match ERD
        type: DataTypes.INTEGER, 
        defaultValue: 0 
    },
    status: { // ADDED: Required for tracking the tournament flow
        type: DataTypes.ENUM('scheduled', 'live', 'finished'),
        defaultValue: 'scheduled'
    },
    
    // --- FOREIGN KEY FIELDS (Must be defined explicitly here) ---
    team_home_id: { // Renamed from 'teamAId'
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Teams', // References the 'Teams' table
            key: 'id',
        },
    },
    team_away_id: { // Renamed from 'teamBId'
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Teams', // References the 'Teams' table
            key: 'id',
        },
    }
});

// --- ASSOCIATIONS (Linking the foreign keys to the Team model) ---
// Note: These associations must be called AFTER both Match and Team models are defined.
Match.belongsTo(Team, { 
    as: "homeTeam", // Alias for eager loading
    foreignKey: "team_home_id" 
});

Match.belongsTo(Team, { 
    as: "awayTeam", // Alias for eager loading
    foreignKey: "team_away_id" 
});

export default Match;