const express = require("express");
const cors = require("cors");

const app = express();

// Enable CORS
app.use(cors({
  origin: ["http://localhost:3000", "https://sharmaharsh897.github.io"],
  credentials: true,
}));

// Middleware to parse JSON
app.use(express.json());

// Import routes
const userRoutes = require("./routes/userRoutes");
app.use("/api", userRoutes);

// app.js
const ownerRoutes = require("./routes/ownerRoutes");
app.use("/api", ownerRoutes); // This mounts the routes under /api

// Registration Route (newly added)
const registerRoutes = require('./routes/registerRoutes'); // registration routes
app.use('/api/register', registerRoutes);

const addressRoutes = require("./routes/addressRoutes");
app.use("/api/addresses", addressRoutes);

const orderRoutes = require("./routes/orderRoutes"); // Import your order routes
app.use("/api", orderRoutes); // Mount the order routes under /api

const geminiRoutes = require("./routes/geminiRoutes");
app.use("/api/gemini", geminiRoutes);

module.exports = app; // Make sure you export the app
