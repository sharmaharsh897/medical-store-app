import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./PaymentPage.css";

const PaymentPage = () => {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("");

  const handlePaymentSuccess = () => {
    if (!paymentMethod) {
      alert("Please select a payment method!");
      return;
    }
    alert(`Payment successful via ${paymentMethod}!`);
    navigate("/"); // Redirect to homepage or order success page
  };

  return (
    <div className="paymentpage-container">
      <h2 className="payment-title">Payment Page</h2>
      <p className="payment-instruction">Select your payment method and proceed.</p>

      {/* Payment Method Selection */}
      <div className="payment-methods">
        <label className={`payment-option ${paymentMethod === "Cash on Delivery" ? "selected" : ""}`}>
          <input
            type="radio"
            name="payment"
            value="Cash on Delivery"
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          Cash on Delivery
        </label>

        <label className={`payment-option ${paymentMethod === "UPI" ? "selected" : ""}`}>
          <input
            type="radio"
            name="payment"
            value="UPI"
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          UPI (Google Pay, PhonePe, Paytm)
        </label>

        <label className={`payment-option ${paymentMethod === "Debit Card" ? "selected" : ""}`}>
          <input
            type="radio"
            name="payment"
            value="Debit Card"
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          Debit Card / Credit Card
        </label>
      </div>

      {/* Proceed to Payment Button */}
      <button className="pay-btn" onClick={handlePaymentSuccess}>
        Pay Now
      </button>
    </div>
  );
};

export default PaymentPage;
