import express from "express";
import { sequelize } from "./config/database.js";
import  teamRoutes from "./routes/teamRoutes.js";
import playerRoutes from "./routes/playerRoutes.js"
import matchRoutes from "./routes/matchRoutes.js"

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

sequelize.sync({ alter: true })
  .then(() => {
    console.log("Tables created successfully!");
  })
  .catch((err) => {
    console.log("Error creating tables:", err);
  });

app.use("/teams" , teamRoutes)
app.use("/player" , playerRoutes)
app.use("/match" , matchRoutes)

app.get("/", (req , res) => {
  res.send("CAN API running...");
});

app.listen(PORT, () => {
  console.log("Server running on port 3000");
});
