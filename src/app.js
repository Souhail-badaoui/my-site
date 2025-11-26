import "dotenv/config";
import express from "express";
import { sequelize } from "./config/database.js";
import "./models/Team.js"; 
import "./models/Player.js";

const app = express();
app.use(express.json());

const PORT = 3000;


sequelize.sync({ alter: true })
  .then(() => {
    console.log("Tables created successfully!");
  })
  .catch((err) => {
    console.log("Error creating tables:", err);
  });

app.get("/", (req , res) => {
  res.send("CAN API running...");
});

app.listen(PORT, () => {
  console.log("Server running on port 3000");
});
