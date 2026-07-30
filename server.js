// server.js

const User = require("./models/User");
const Food = require("./models/Food");

const newUser = new User({
  email: "test@example.com",
  password: "hashedpw123",
});
await newUser.save();

const newFood = new Food({
  foodName: "Buuz",
  price: 8000,
  ingredients: "Mutton, onion, flour",
});
await newFood.save();

// Find one
const user = await User.findOne({ email: "test@example.com" });

// Find all foods
const allFoods = await Food.find();

// Find by ID, and auto-fill the related category (per the "ref" from Part 4)
const food = await Food.findById("652a1f...").populate("category");

require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");

const app = express();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ Connection failed:", err));

app.listen(3000, () => console.log("Server running on port 3000"));
