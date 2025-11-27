import { Sequelize } from "sequelize";
console.log(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  process.env.DB_HOST,
);
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "postgres",
    logging: false,
  }
);
export default sequelize;
