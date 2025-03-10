import React, { useContext } from "react";
import { CartContext } from "../context/cartContext";
import "./Cart.css";

const Cart = () => {
  const { cart } = useContext(CartContext);

  return (
    <div className="cart-container">
      <h2 className="cart-title">Shopping Cart</h2>
      {cart.length === 0 ? (
        <p className="cart-empty">Your cart is empty</p>
      ) : (
        cart.map((item, index) => (
          <div key={index} className="cart-item">
            <img src={item.image} alt={item.name} />
            <div className="cart-item-info">
              <p className="cart-item-name">{item.name}</p>
              <p className="cart-item-price">₹{item.price}</p>
            </div>
            <button className="cart-remove-btn">Remove</button>
          </div>
        ))
      )}
      {cart.length > 0 && (
        <>
          <p className="cart-total">
            Total: ₹{cart.reduce((total, item) => total + item.price, 0)}
          </p>
          <button className="cart-checkout-btn">Checkout</button>
        </>
      )}
    </div>
  );
};

export default Cart;
