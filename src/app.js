// src/app.js (Essential Imports)

import express from "express";
import "dotenv/config"; 
import cors from 'cors';

// 1. Database connection instance
import { sequelize } from "./config/database.js";

// 2. 🚨 CRITICAL FIX: Import ALL models to register them with Sequelize
import Match from "./models/Match.js";
import Team from "./models/Team.js";
import Player from "./models/player.js";
import User from "./models/user.js"; // Assuming you have a User model for Auth

// --- ROUTES (Imported after models) ---
import authRoutes from './routes/authRoutes.js'; 
import teamRoutes from './routes/teamRoutes.js'; 
import playerRoutes from './routes/playerRoutes.js';
import matchRoutes from './routes/matchRoutes.js'; 

const app = express();
// ... middleware ...

// 3. sequelize.sync() now knows about the models
sequelize.sync({ alter: true })
    .then(() => console.log('Database synchronized.'))
    .catch(err => console.error('Database synchronization error:', err));

// ... route integration and server start ...
const PORT = process.env.PORT || 3000;

// CRITICAL: Launch the server and start listening for connections
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
