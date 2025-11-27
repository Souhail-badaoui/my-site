import express from "express";
import  teamRoutes from "./src/routes/teamRoutes.js";
import playerRoutes from "./src/routes/playerRoutes.js"
import matchRoutes from "./src/routes/matchRoutes.js"

const app = express();

import "dotenv/config"
import {sequelize} from "./src/config/database.js"
// body parser
app.use(express.json());

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
