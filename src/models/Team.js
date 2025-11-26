import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

export const Team = sequelize.define("Team", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  coach: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  group: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ranking: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
}, {
  tableName: "teams",
  timestamps: true,
});
