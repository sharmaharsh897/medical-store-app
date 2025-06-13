import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { CartContext } from "../context/cartContext";
import "./Cart.css";

const Cart = () => {
  const { cart, setCart, removeFromCart } = useContext(CartContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState("");
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const navigate = useNavigate(); // Hook for navigation

  const openModal = (image) => {
    setModalImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalImage("");
  };

  const openCheckoutModal = () => {
    setIsCheckoutModalOpen(true);
  };

  const closeCheckoutModal = () => {
    setIsCheckoutModalOpen(false);
  };

  // Navigate to the payment page
  const proceedToPayment = () => {
    setIsCheckoutModalOpen(false);
    navigate("/payment"); // Redirect to Payment Page
  };

  const increaseQuantity = (item) => {
    setCart((prevCart) =>
      prevCart.map((cartItem) =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      )
    );
  };

  const decreaseQuantity = (item) => {
    setCart((prevCart) =>
      prevCart.map((cartItem) =>
        cartItem.id === item.id && cartItem.quantity > 1
          ? { ...cartItem, quantity: cartItem.quantity - 1 }
          : cartItem
      )
    );
  };

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const sgst = (subtotal * 0.12).toFixed(2);
  const cgst = (subtotal * 0.12).toFixed(2);
  const grandTotal = (subtotal * 1.24).toFixed(2);

  console.log("Cart Details:");
cart.forEach((item, index) => {
  console.log(`Item ${index + 1}:`, {
    name: item.name,
    quantity: item.quantity,
    price: item.price,
    total: (item.price * item.quantity).toFixed(2),
  });
});

console.log("Cart Summary:", {
  subtotal: subtotal.toFixed(2),
  cgst,
  sgst,
  grandTotal
});

  return (
    <div className="cart-container">
      <h2 className="cart-title">Cart</h2>
      {cart.length === 0 ? (
        <p className="cart-empty">Your cart is empty</p>
      ) : (
        <table className="cart-table">
          <thead>
            <tr>
              <th>S. No.</th>
              <th>Image</th>
              <th>Product Name</th>
              <th>Quantity</th>
              <th>Price (₹)</th>
              <th>Total (₹)</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>
                  <button className="cart-item-btn" onClick={() => openModal(item.image)}>
                    <img src={item.image} alt={item.name} className="cart-item-img" />
                  </button>
                </td>
                {isModalOpen && (
                  <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                      <img src={modalImage} alt="Preview" className="modal-img" />
                      <button className="close-btn" onClick={closeModal}>&times;</button>
                    </div>
                  </div>
                )}
                <td>{item.name}</td>
                <td>
                  <button onClick={() => decreaseQuantity(item)}>-</button>
                  <span className="cart-quantity">{item.quantity}</span>
                  <button onClick={() => increaseQuantity(item)}>+</button>
                </td>
                <td>₹{item.price}</td>
                <td>₹{(item.price * item.quantity).toFixed(2)}</td>
                <td>
                  <button className="cart-remove-btn" onClick={() => removeFromCart(item)}>
                    Remove
                  </button>
                </td>
                
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {cart.length > 0 && (
        <div className="cart-summary">
          <p><strong>CGST (12%):</strong> ₹{cgst}</p>
          <p><strong>SGST (12%):</strong> ₹{sgst}</p>
          <p><strong>Grand Total:</strong> ₹{grandTotal}</p>
          <button className="cart-checkout-btn" onClick={openCheckoutModal}>
            Checkout
          </button>
        </div>
      )}

      {/* Checkout Confirmation Modal */}
      {isCheckoutModalOpen && (
        <div className="modal-overlay" onClick={closeCheckoutModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Confirm Checkout</h3>
            <p>Are you sure you want to proceed to payment?</p>
            <div className="modal-buttons">
              <button className="confirm-btn" onClick={proceedToPayment}>
                Proceed to Payment
              </button>
              <button className="cancel-btn" onClick={closeCheckoutModal}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
