require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const User = require("./models/User");
const Food = require("./models/Foods");

const app = express();

// Middleware
app.use(cors()); // Lets your Next.js app talk to Express
app.use(express.json()); // Allows Express to read JSON sent from Next.js

// POST Route: Triggered when user submits the Next.js form
// Add this route in server.js
app.post("/api/users/check-email", async (req, res) => {
  try {
    const { email } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already registered" });
    }

    // Email is free to use!
    res.status(200).json({ message: "Email available" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

app.post("/api/users", async (req, res) => {
  try {
    const { email, password } = req.body;

    const newUser = new User({ email, password });
    await newUser.save(); // <-- THIS is what writes to MongoDB!

    res
      .status(201)
      .json({ message: "User saved successfully!", user: newUser });
  } catch (error) {
    res.status(500).json({ error: "Failed to save user" });
  }
});

// Connect to MongoDB Atlas first, then start the server on Port 4000
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB");
    app.listen(4000, () =>
      console.log("🚀 Backend server running on http://localhost:4000"),
    );
  })
  .catch((err) => console.error("❌ Database connection error:", err));
