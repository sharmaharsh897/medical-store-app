const express = require("express");
const router = express.Router();
const { loginUser, googleLogin } = require("../controllers/userController");

router.post("/login", loginUser);
router.post("/google-login", googleLogin);
module.exports = router;