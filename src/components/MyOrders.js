import React, { useEffect, useState } from "react";
import axios from "axios";
import "./MyOrders.css";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchOrdersAndAddresses = async () => {
      try {
        const [ordersRes, addressesRes] = await Promise.all([
          axios.get("http://localhost:5000/api/my-orders", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("http://localhost:5000/api/addresses", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        const sorted = ordersRes.data.sort((a, b) =>
          sortOrder === "desc"
            ? new Date(b.created_at) - new Date(a.created_at)
            : new Date(a.created_at) - new Date(b.created_at)
        );

        setOrders(sorted);
        setAddresses(addressesRes.data);
      } catch (err) {
        console.error(" Error fetching orders or addresses:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrdersAndAddresses();
  }, [token, sortOrder]);

  //random comment1

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const defaultAddress = addresses.length > 0 ? addresses[0] : null;

  if (loading) return <div className="loading-spinner">Loading Orders...</div>;
  if (orders.length === 0) return <div>No orders found.</div>;

  return (
    <div className="my-orders-container">
      <div className="orders-header">
        <h2 className="orders-heading">My Orders</h2>
        <select
          className="sort-dropdown"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="desc">Latest First</option>
          <option value="asc">Oldest First</option>
        </select>
      </div>

      {orders.map((order, idx) => (
        <div
          key={idx}
          className="order-card"
          onClick={() => setSelectedOrder(order)}
        >
          <h4 className="order-code">Order Code: {order.order_code}</h4>
          <p className="order-info">
            Order date: {formatDate(order.created_at)}
          </p>
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
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3 className="modal-title">Order Summary</h3>

            <table className="modal-table">
              <tbody>
                <tr>
                  <th>Order Code</th>
                  <td>{selectedOrder.order_code}</td>
                </tr>
                <tr>
                  <th>Order Date</th>
                  <td>{formatDate(selectedOrder.created_at)}</td>
                </tr>
                <tr>
                  <th>Payment Method</th>
                  <td>{selectedOrder.payment_method}</td>
                </tr>
                <tr>
                  <th>Total Amount Paid</th>
                  <td>₹{selectedOrder.total_amount}</td>
                </tr>
                {defaultAddress && (
                  <tr>
                    <th>Address</th>
                    <td>
                      {defaultAddress.line1}, {defaultAddress.city},<br />
                      {defaultAddress.state} – {defaultAddress.pincode}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            <h4 className="items-heading">Ordered Items</h4>
            <table className="items-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Qty</th>
                  <th>Price (₹)</th>
                </tr>
              </thead>
              <tbody>
                {selectedOrder.items.map((item, i) => (
                  <tr key={i}>
                    <td>{item.product_name}</td>
                    <td>{item.quantity}</td>
                    <td>{item.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <button
              className="close-button"
              onClick={() => setSelectedOrder(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyOrders;
