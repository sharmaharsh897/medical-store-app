const express = require("express");
const cors = require("cors");

const app = express();

// Enable CORS
app.use(cors({ origin: "http://localhost:3000" }));

// Middleware to parse JSON
app.use(express.json());

// Import routes
const userRoutes = require("./routes/userRoutes");
app.use("/api", userRoutes);

module.exports = app; // Make sure you export the app
