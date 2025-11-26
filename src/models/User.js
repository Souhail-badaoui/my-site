import sequelize from "./register.js";
import { DataTypes } from "sequelize";

const User = sequelize.define(
  "canusers",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    username: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.STRING, allowNull: false, defaultValue: "user" }, // ← هذا مهم
  },
  {
    tableName: "canusers",
    timestamps: true,
  }
);

export default User;
