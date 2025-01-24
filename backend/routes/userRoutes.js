const express = require("express");
const router = express.Router();
const { loginUser, googleLogin } = require("../controllers/userController");
const { changePassword } = require("../controllers/changePasswordController");
const authenticateToken = require("../middlewares/authMiddleware");

router.post("/login", loginUser);
router.post("/google-login", googleLogin);
router.put("/change-password", authenticateToken, changePassword);
module.exports = router;