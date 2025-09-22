const express = require("express");
const cors = require("cors");

const app = express();

// CORS whitelist
const allowedOrigins = [
  "http://localhost:3000", 
  "https://sharmaharsh897.github.io"
];

// Apply CORS
app.use(cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true); // allow non-browser requests
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = "The CORS policy for this site does not allow access from the specified Origin.";
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true
}));

// Handle preflight OPTIONS requests
app.options("*", cors({
  origin: allowedOrigins,
  credentials: true
}));

// JSON parser
app.use(express.json());

// ===== ROUTES =====
// Keep your imports and mounts exactly as before
const userRoutes = require("./routes/userRoutes");
app.use("/api", userRoutes);

const ownerRoutes = require("./routes/ownerRoutes");
app.use("/api", ownerRoutes);

const registerRoutes = require("./routes/registerRoutes");
app.use("/api/register", registerRoutes);

const addressRoutes = require("./routes/addressRoutes");
app.use("/api/addresses", addressRoutes);

const orderRoutes = require("./routes/orderRoutes");
app.use("/api", orderRoutes);

const geminiRoutes = require("./routes/geminiRoutes");
app.use("/api/gemini", geminiRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
