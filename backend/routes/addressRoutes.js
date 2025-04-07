const express = require("express");
const router = express.Router();
const addressController = require("../controllers/addressController");
const authenticateToken = require("../middlewares/authMiddleware"); // your auth middleware

router.use(authenticateToken); // all routes below need auth

router.get("/", addressController.getAddresses);
router.post("/", addressController.addAddress);
router.put("/:id", addressController.updateAddress);
router.delete("/:id", addressController.deleteAddress);

module.exports = router;
