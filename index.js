dotenv.config();
import sequelize from "./src/models/register.js";
import User from "./src/models/User.js";
import bcrypt from "bcrypt";
import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { authMiddleware } from "./src/middlewares/authMiddleware.js";
import { roleMiddleware } from "./src/middlewares/roleMiddleware.js";

const app = express();
app.use(express.json());

const PORT = process.env.APP_PORT || 5000;

const start = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected!");

    await User.sync({ alter: true });
    console.log("Users table synced!");

    app.listen(PORT, () =>
      console.log(`Server running at http://localhost:${PORT}`)
    );
  } catch (err) {
    console.error("Error starting server:", err);
  }
};

start();

app.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      role: "user",
    });

    res.json({ message: "User registered", user: newUser.username });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) return res.status(404).json({ error: "User not found" });

    const compare = await bcrypt.compare(password, user.password);

    if (!compare) return res.status(400).json({ error: "Invalid password" });

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ message: "Login successful", token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/profile", authMiddleware, (req, res) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ error: "Token missing" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = User.findByPk(decoded.id, {
      attributes: { exclude: ["password"] },
    });
    res.json({ user: req.user });
  } catch (error) {
    res.status(403).json({ error: "Invalid token" });
  }
});

app.get("/admin", authMiddleware, roleMiddleware("admin"), (req, res) => {
  res.json({ message: "Welcome Admin!" });
});
