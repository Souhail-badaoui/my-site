
import { Sequelize } from "sequelize";

// --- START TEMPORARY LOGGING ---
console.log("--- DB Connection Diagnostics ---");
console.log(`DB_NAME: ${process.env.DB_NAME}`);
console.log(`DB_USER: ${process.env.DB_USER}`);
console.log(`DB_HOST: ${process.env.DB_HOST}:${process.env.DB_PORT}`);
console.log("---------------------------------");


export const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS, 
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect:"postgres",
    logging: console.log,
  }
);
