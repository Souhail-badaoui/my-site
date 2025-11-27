

import { DataTypes } from "sequelize";
import {sequelize} from "../config/database.js";
import Team from "./Team.js"; 

const Match = sequelize.define("Match", {
    
    match_date: { 
        type: DataTypes.DATE, 
        allowNull: false 
    },
    stadium: { 
        type: DataTypes.STRING, 
        allowNull: false 
    },
    score_home: { 
        type: DataTypes.INTEGER, 
        defaultValue: 0 
    },
    score_away: { 
        type: DataTypes.INTEGER, 
        defaultValue: 0 
    },
    status: { 
        type: DataTypes.ENUM('scheduled', 'live', 'finished'),
        defaultValue: 'scheduled'
    },
    
    
    team_home_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Teams', 
            key: 'id',
        },
    },
    team_away_id: { 
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Teams', 
            key: 'id',
        },
    }
});


Match.belongsTo(Team, { 
    as: "homeTeam", 
    foreignKey: "team_home_id" 
});

Match.belongsTo(Team, { 
    as: "awayTeam", 
    foreignKey: "team_away_id" 
});

export default Match;
