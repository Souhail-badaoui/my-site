// src/models/index.js

import { Sequelize, DataTypes } from 'sequelize';

// 1. Import the already-initialized connection instance (the fix for the error)
import { sequelize } from '../config/database.js'; 

// 2. Import all your Model definitions (assuming these files exist and are correct)
import userModel from './user.js';
import teamModel from './Team.js';
import playerModel from './player.js';
import matchModel from './Match.js'; 

const db = {};


db.Team = teamModel; 
db.Player = playerModel; 
db.Match = matchModel; 



Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize; 
db.Sequelize = Sequelize;

export default db; 