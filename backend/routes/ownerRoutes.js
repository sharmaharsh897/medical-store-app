// routes/ownerRoutes.js
const express = require("express");
const router = express.Router();
const { loginAdmin } = require("../controllers/ownerController");

router.post("/owner-login", loginAdmin); // Ensure this matches the frontend request
module.exports = router;