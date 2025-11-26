// index.js
import sequelize from "./src/models/register.js";
import User from "./src/models/User.js";
import bcrypt, { hash } from "bcrypt";
import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const app = express();
app.use(express.json());
const PORT = process.env.DATABASE_PORT || 5000;

app.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
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
    if (user) return res.status(400).json({ error: "User not found" });
    const comapre = await bcrypt.compare(password, user.password);
    if (!comapre) return res.status(400).json({ error: "Invalid password" });
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ message: "Login successful", token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/profile", async (res, req) => {
  const authHeader = req.header["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Token missing" });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(decoded.id, {
      attributes: { exclude: ["password"] },
    });
    res.json({ user });
  } catch (error) {
    res.status(403).json({ error: "Invalid token" });
  }
});

const start = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected!");
    await User.sync({ alter: true });
    app.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT}`)
    );
  } catch (err) {
    console.error("Error starting server:", err);
  }
};

start();
