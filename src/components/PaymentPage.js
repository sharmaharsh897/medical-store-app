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
  const [step, setStep] = useState(1);          // ← NEW: 1 = summary, 2 = payment
  const [paymentMethod, setPaymentMethod] = useState(""); // keeps chosen pay-mode

  // Price calculations (unchanged)
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const sgst = parseFloat((subtotal * 0.12).toFixed(2));
  const cgst = parseFloat((subtotal * 0.12).toFixed(2));
  const deliveryCharge = 0;
  const grandTotal = (subtotal + sgst + cgst + deliveryCharge).toFixed(2);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }

        const profileRes = await axios.get("http://localhost:5000/api/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const addressRes = await axios.get("/api/addresses", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const address = addressRes.data[0];
        const fullAddress = address
          ? `${address.line1}, ${address.line2}, ${address.city}, ${address.state} - ${address.pincode}`
          : "N/A";

        setUserDetails({
          name: profileRes.data.name || "",
          address: fullAddress,
          phone_number: profileRes.data.phone || "N/A",
        });
      } catch (err) {
        console.error(err);
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };
    fetchUserDetails();
  }, [navigate]);

  const placeOrder = () => {
    if (!paymentMethod) {
      alert("Choose a payment option first!");
      return;
    }
    alert(`Order placed successfully via ${paymentMethod}!`);
    setCart([]);
    navigate("/");
  };

  if (loading) return <div className="confirm-loader"></div>;

  return (
    <div className="confirm-page">

      {/* ── Step bar ─────────────────────────────────────── */}
      <div className="steps-bar">
  <span
    className={`step-dot ${step === 1 ? "active" : ""}`}
    onClick={() => setStep(1)}
    title="Order Summary"
    style={{ cursor: "pointer" }}
  >
    1
  </span>
  <span className="step-line"></span>
  <span
    className={`step-dot ${step === 2 ? "active" : ""}`}
    onClick={() => setStep(2)}
    title="Payment"
    style={{ cursor: "pointer" }}
  >
    2
  </span>
</div>

      {/* ── STEP 1 : Order summary ───────────────────────── */}
      {step === 1 && (
        <>
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
            <div className="price-item"><span>Item Total</span><span>₹{subtotal.toFixed(2)}</span></div>
            <div className="price-item"><span>SGST (12%)</span><span>₹{sgst}</span></div>
            <div className="price-item"><span>CGST (12%)</span><span>₹{cgst}</span></div>
            <div className="price-item">
              <span>Delivery</span>
              <span><s>₹40</s> <span className="free-delivery">Free</span></span>
            </div>
            <div className="price-item total">
              <strong>Total Amount</strong><strong>₹{grandTotal}</strong>
            </div>
          </div>

          {/* Continue button → Step 2 */}
          <button className="place-order-btn" onClick={() => setStep(2)}>
            Continue
          </button>
        </>
      )}

      {/* ── STEP 2 : Payment options ─────────────────────── */}
      {step === 2 && (
        <div className="confirm-section payment-section">
          <h3>Select Payment Method</h3>

          {/* UPI */}
          <details className="pay-accordion">
            <summary>UPI</summary>
            <label><input type="radio" name="pay" value="Paytm"
                   onChange={(e)=>setPaymentMethod(e.target.value)}/> Paytm</label>
            <label><input type="radio" name="pay" value="Google Pay"
                   onChange={(e)=>setPaymentMethod(e.target.value)}/> GPay</label>
            <label><input type="radio" name="pay" value="PhonePe"
                   onChange={(e)=>setPaymentMethod(e.target.value)}/> PhonePe</label>
          </details>

          {/* Card */}
          <details className="pay-accordion">
            <summary>Credit / Debit / ATM Card</summary>
            <div className="card-fields">
              <input placeholder="Card number" />
              <input placeholder="Valid thru (MM/YY)" />
              <input placeholder="CVV" type="password" />
              <label>
                <input type="radio" name="pay" value="Card"
                       onChange={(e)=>setPaymentMethod(e.target.value)}/> Use this card
              </label>
            </div>
          </details>

          {/* Net-Banking */}
          <details className="pay-accordion">
            <summary>Net Banking</summary>
            <select onChange={(e)=>setPaymentMethod(`Net Banking (${e.target.value})`)}>
              <option>Select Bank</option>
              <option>HDFC Bank</option>
              <option>SBI</option>
              <option>ICICI</option>
              <option>Axis</option>
            </select>
          </details>

          {/* Wallet */}
          <details className="pay-accordion">
            <summary>Wallet</summary>
            <label><input type="radio" name="pay" value="Amazon Pay"
                   onChange={(e)=>setPaymentMethod(e.target.value)}/> Amazon Pay</label>
            <label><input type="radio" name="pay" value="Mobikwik"
                   onChange={(e)=>setPaymentMethod(e.target.value)}/> Mobikwik</label>
          </details>

          {/* Gift Card */}
          <details className="pay-accordion">
            <summary>Have a Gift Card?</summary>
            <input placeholder="Enter gift card code" />
          </details>

          {/* Cash on Delivery */}
          <details className="pay-accordion">
            <summary>Cash on Delivery</summary>
            <label>
              <input type="radio" name="pay" value="Cash on Delivery"
                     onChange={(e)=>setPaymentMethod(e.target.value)}/> Pay ₹{grandTotal} on delivery
            </label>
          </details>

          {/* Final place order */}
          <button className="place-order-btn" onClick={placeOrder}>
            Place Order
          </button>
        </div>
      )}
    </div>
  );
};

export default PaymentPage;
