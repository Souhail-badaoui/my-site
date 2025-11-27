import sequelize from "./Register.js";
import { DataTypes } from "sequelize";

const User = sequelize.define("can-users", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    username: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
<<<<<<< HEAD:src/models/User.js
    role: { type: DataTypes.STRING, allowNull: false, defaultValue: "user" }
=======
    role: { type: DataTypes.STRING, allowNull: false, defaultValue: "user" },
>>>>>>> 1102cad0ce047465d710e480ffa36846fec77cfd:backend/src/models/User.js
  },
  {
    tableName: "can-users",
    timestamps: true,
  }
);

export default User;
