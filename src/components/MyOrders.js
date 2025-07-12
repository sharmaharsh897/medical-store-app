import React, { useEffect, useState } from "react";
import axios from "axios";
import "./MyOrders.css";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);

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

  return (
    <div className="my-orders-container">
      <h2 className="orders-heading">My Orders</h2>
      {orders.map((order, idx) => (
        <div
          key={idx}
          className="order-card"
          onClick={() => setSelectedOrder(order)}
        >
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

      {selectedOrder && (
        <div className="modal-overlay" onClick={() => setSelectedOrder(null)}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <h3>Order Code: {selectedOrder.order_code}</h3>
            <p>Order Date: {new Date(selectedOrder.order_date).toLocaleDateString()}</p>
            <p>Payment Method: {selectedOrder.payment_method}</p>
            <p>Total Amount: ₹{selectedOrder.total_amount}</p>
            <p>Delivery Address: {selectedOrder.delivery_address}</p>
            <div className="order-items-title">Items:</div>
            <ul className="order-items-list">
              {selectedOrder.items.map((item, i) => (
                <li key={i} className="order-item">
                  {item.product_name} x {item.quantity} – ₹{item.price}
                </li>
              ))}
            </ul>
            <button className="close-button" onClick={() => setSelectedOrder(null)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyOrders;
