// components/MyOrders.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./MyOrders.css";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/my-orders", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(res.data);
      } catch (err) {
        console.error("❌ Error fetching orders:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <div className="loading-spinner">Loading Orders...</div>;

  if (orders.length === 0) return <div>No orders found.</div>;

  // MyOrders.js
//comment added
return (
  <div className="my-orders-container">
    <h2 className="orders-heading">My Orders</h2>
    {orders.map((order, idx) => (
      <div key={idx} className="order-card">
        <h4 className="order-code">Order Code: {order.order_code}</h4>
        <p className="order-info">Payment: {order.payment_method}</p>
        <p className="order-info">Total: ₹{order.total_amount}</p>
        <div>
          <div className="order-items-title">Items:</div>
          <ul className="order-items-list">
            {order.items.map((item, i) => (
              <li key={i} className="order-item">
                {item.product_name} x {item.quantity} – ₹{item.price}
              </li>
            ))}
          </ul>
        </div>
      </div>
    ))}
  </div>
);
}

export default MyOrders;
