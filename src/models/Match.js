const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Team = require("./Team");

const Match = sequelize.define("Match", {
  date: { type: DataTypes.DATE, allowNull: false,  },
  location: { type: DataTypes.STRING, allowNull: false },
  scoreA: { type: DataTypes.INTEGER, defaultValue: 0 },
  scoreB: { type: DataTypes.INTEGER, defaultValue: 0 },
},);

Match.belongsTo(Team, { as: "teamA", foreignKey: "teamAId" });
Match.belongsTo(Team, { as: "teamB", foreignKey: "teamBId" });

module.exports = Match;
