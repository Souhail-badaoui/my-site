// index.js
import sequelize from "./src/models/register.js";
import User from "./src/models/User.js";

const start = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected!");

    await User.sync({ force: true });
    console.log("Users table created!");

    const newUser = await User.create({
      username: "youssef",
      email: "youssef@example.com",
      password: "123456",
    });

    console.log("New user added:", newUser.toJSON());
  } catch (error) {
    console.error("Error:", error);
  }
};

start();
