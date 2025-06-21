const express = require("express");
const router = express.Router();
const { placeOrder, getUserOrders } = require("../controllers/orderController");
const authenticateToken = require("../middlewares/authMiddleware");

router.post("/place-order", placeOrder);
router.get("/my-orders", authenticateToken, getUserOrders); // 👈 New route

module.exports = router;