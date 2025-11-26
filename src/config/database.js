// src/config/database.js

import { Sequelize } from "sequelize";

<<<<<<< HEAD
export const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect:"postgres",
    logging: false,
  }
);
=======
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
>>>>>>> 9c8c7134d262a048c2c57cfba52a726b409ea16d
