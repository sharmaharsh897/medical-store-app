import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { CartContext } from "../context/cartContext";
import "./PaymentPage.css";

const PaymentPage = () => {
  const navigate = useNavigate();
  const { cart, setCart } = useContext(CartContext);

  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  // Price calculations
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const sgst = parseFloat((subtotal * 0.12).toFixed(2));
  const cgst = parseFloat((subtotal * 0.12).toFixed(2));
  const deliveryCharge = 0;
  const grandTotal = (subtotal + sgst + cgst + deliveryCharge).toFixed(2);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem("token");

        const profileRes = await axios.get("http://localhost:5000/api/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const addressRes = await axios.get("/api/addresses", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const profileData = profileRes.data;

        const address = addressRes.data[0];
        const fullAddress = address
          ? `${address.line1}, ${address.line2}, ${address.city}, ${address.state} - ${address.pincode}`
          : "N/A";
        const phone_number = profileData.phone || "N/A";

        setUserDetails({
          name: profileRes.data.name || "",
          address: fullAddress,
          phone_number: phone_number,
        });
      } catch (error) {
        console.error("Error fetching user details:", error);
        alert("Session expired or invalid user. Please login again.");
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [navigate]);

  const placeOrder = () => {
    alert("Order placed successfully!");
    setCart([]);
    navigate("/");
  };

  if (loading) {
    return <div className="confirm-loader">Loading...</div>;
  }

  return (
    <div className="confirm-page">
      <div className="confirm-section user-info">
        <h3>Delivering to:</h3>
        <p><strong>{userDetails.name}</strong></p>
        <p>{userDetails.phone_number}</p>
        <p>
  {userDetails.address && userDetails.address !== "N/A"
    ? userDetails.address
    : <i>No address in database</i>}
</p>
      </div>

      <div className="confirm-section products-section">
        <h3>Items in your Order:</h3>
        {cart.map((item) => (
          <div key={item.id} className="product-card">
            <img src={item.image} alt={item.name} />
            <div className="product-info">
              <h4>{item.name}</h4>
              <p>Qty: {item.quantity}</p>
              <p>Price: ₹{(item.price * item.quantity).toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="confirm-section price-summary">
        <h3>Price Details</h3>
        <div className="price-item">
          <span>Item Total</span>
          <span>₹{subtotal.toFixed(2)}</span>
        </div>
        <div className="price-item">
          <span>SGST (12%)</span>
          <span>₹{sgst}</span>
        </div>
        <div className="price-item">
          <span>CGST (12%)</span>
          <span>₹{cgst}</span>
        </div>
        <div className="price-item">
          <span>Delivery</span>
          <span><s>₹40</s> <span className="free-delivery">Free</span></span>
        </div>
        <div className="price-item total">
          <strong>Total Amount</strong>
          <strong>₹{grandTotal}</strong>
        </div>
      </div>

      <button className="place-order-btn" onClick={placeOrder}>
        Place Order
      </button>
    </div>
  );
};

export default PaymentPage;
