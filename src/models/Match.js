
import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import Team from "./Team.js";

const Match = sequelize.define("Match", {
  date: { 
    type: DataTypes.DATE, 
    allowNull: false 
  },
  location: { 
    type: DataTypes.STRING, 
    allowNull: false 
  },
  scoreA: { 
    type: DataTypes.INTEGER, 
    defaultValue: 0 
  },
  scoreB: { 
    type: DataTypes.INTEGER, 
    defaultValue: 0 
  },
});


Match.belongsTo(Team, { as: "teamA", foreignKey: "teamAId" });
Match.belongsTo(Team, { as: "teamB", foreignKey: "teamBId" });

export default Match;
