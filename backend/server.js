const express = require("express");
const cors = require("cors");

const app = express();

// Allow requests from your frontend
app.use(
  cors({
    origin: "http://localhost:3000", // Replace with your frontend URL
    credentials: true, // Allow credentials (cookies, headers, etc.)
  })
);
app.use((req, res, next) => {
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin-allow-popups");
  res.setHeader("Cross-Origin-Embedder-Policy", "credentialless"); // Use `credentialless` instead
  next();
});
app.use(express.json()); // To parse JSON bodies

// Your existing routes
const userRoutes = require("./routes/userRoutes");
app.use("/api", userRoutes);

const ownerRoutes = require("./routes/ownerRoutes");
app.use("/api", ownerRoutes);

const registerRoutes = require("./routes/registerRoutes");
app.use("/api/register", registerRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
