const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Team = require("./Team");

const Player = sequelize.define("Player", {
  name: { type: DataTypes.STRING, allowNull: false },
  position: { type: DataTypes.STRING },
});

Player.belongsTo(Team);
Team.hasMany(Player);

module.exports = Player;
