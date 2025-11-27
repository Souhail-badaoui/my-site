import { Sequelize, DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

import teamModel from "./Team.js";
import playerModel from "./Player.js";
import matchModel from "./Match.js";

const db = {};

db.Team = teamModel(sequelize, DataTypes);
db.Player = playerModel(sequelize, DataTypes);
db.Match = matchModel(sequelize, DataTypes);

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
