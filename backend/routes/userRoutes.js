const express = require("express");
const router = express.Router();
const { loginUser, googleLogin } = require("../controllers/userController");
const { changePassword } = require("../controllers/changePasswordController");
const authenticateToken = require("../middlewares/authMiddleware");
const { getProfile } = require("../controllers/userController");

router.post("/login", loginUser);
router.post("/google-login", googleLogin);
router.put("/change-password", authenticateToken, changePassword);
router.get("/profile", authenticateToken, getProfile);
module.exports = router;