const db = require("../config/dbConfig");// your MySQL connection pool

const placeOrder = async (req, res) => {
  try {
const { userId, customerName, phoneNumber, paymentMethod, totalAmount, cart } = req.body;

    if (!userId || !paymentMethod || !totalAmount || !Array.isArray(cart)) {
      return res.status(400).json({ message: "Missing order data" });
    }

    // Step 1: Generate custom order_code like MED-1001
    const [lastOrder] = await db.query("SELECT order_code FROM orders ORDER BY id DESC LIMIT 1");
    let orderNumber = 1000;

    if (lastOrder.length > 0) {
      const lastCode = lastOrder[0].order_code;
      const lastNumber = parseInt(lastCode?.split("-")[1]);
      if (!isNaN(lastNumber)) orderNumber = lastNumber + 1;
    }

    const orderCode = `MED-${orderNumber}`;

    // Step 2: Insert into `orders`
    await db.query(
  "INSERT INTO orders (order_code, user_id, customer_name, phone_number, payment_method, total_amount) VALUES (?, ?, ?, ?, ?, ?)",
  [orderCode, userId, customerName, phoneNumber, paymentMethod, totalAmount]
);

    // Step 3: Insert into `order_items`
    for (const item of cart) {
      await db.query(
        "INSERT INTO order_items (order_id, product_name, quantity, price) VALUES (?, ?, ?, ?)",
        [orderCode, item.name, item.quantity, item.price]
      );
    }

    console.log("📦 New Order Received:", {
      paymentMethod,
      totalAmount,
      cart
    });

    // ✅ Step 4: Return orderCode to frontend
    res.status(201).json({ message: "Order placed successfully", orderCode });
  } catch (err) {
    console.error("❌ Failed to place order:", err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

// orderController.js
const getUserOrders = async (req, res) => {
  try {
    const userId = req.user.id; // assuming token middleware sets req.user
    const [orders] = await db.query("SELECT * FROM orders WHERE user_id = ?", [userId]);

    const results = [];

    for (const order of orders) {
      const [items] = await db.query("SELECT * FROM order_items WHERE order_id = ?", [order.order_code]);
      results.push({ ...order, items });
    }

    res.json(results);
  } catch (err) {
    console.error("❌ Failed to fetch orders:", err);
    res.status(500).json({ message: "Something went wrong while fetching orders" });
  }
};

module.exports = { placeOrder, getUserOrders };
