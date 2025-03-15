import React, { useContext } from "react";
import { CartContext } from "../context/cartContext";
import "./Cart.css";

const Cart = () => {
  const { cart, setCart, removeFromCart } = useContext(CartContext);

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

  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const sgst = (subtotal * 0.12).toFixed(2);
  const cgst = (subtotal * 0.12).toFixed(2);
  const grandTotal = (subtotal * 1.24).toFixed(2);

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
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item, index) => (
              <tr key={item.id}>
                <td>
                  {index + 1}
                </td>
                <td>
                  <img src={item.image} alt={item.name} className="cart-item-img" />
                </td>
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
                <td>
                  ₹{(item.price * item.quantity).toFixed(2)}
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
          <button className="cart-checkout-btn">Checkout</button>
        </div>
      )}
    </div>
  );
};

export default Cart;
