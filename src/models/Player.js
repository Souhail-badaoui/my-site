
import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import Team from "./Team.js";

const Player = sequelize.define("Player", {
  name: { 
    type: DataTypes.STRING, 
    allowNull: false 
  },
  position: { 
    type: DataTypes.STRING 
  },
});


Player.belongsTo(Team);
Team.hasMany(Player);

export default Player;
