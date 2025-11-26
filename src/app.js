import express from "express";
const app = express();
import "dotenv/config"
import {sequelize} from "./config/database.js"
// body parser
app.use(express.json());

// ROUTES

/*
const teamRoutes = require("./routes/teamRoutes");
const playerRoutes = require("./routes/playerRoutes");
const matchRoutes = require("./routes/matchRoutes");
app.use("/teams", teamRoutes);
app.use("/players", playerRoutes);
app.use("/matches", matchRoutes);
*/


sequelize.sync({ alter: true });

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
