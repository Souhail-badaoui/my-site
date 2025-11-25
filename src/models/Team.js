
import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Team = sequelize.define("Team", {
  name: { 
    type: DataTypes.STRING, 
    allowNull: false 
  },
  city: { 
    type: DataTypes.STRING, 
    allowNull: false 
  },
});

export default Team;
