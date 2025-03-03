import React, { useState, useContext } from "react";
import "./ProductDetail.css";
import { AiFillMedicineBox } from "react-icons/ai";
import { CartContext } from "../context/cartContext"; 

function ProductDetail({ product }) {
  const { addToCart } = useContext(CartContext); 
  const [ripple, setRipple] = useState(null);

  const handleButtonClick = (event) => {
    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    setRipple({ x, y, size });

    setTimeout(() => {
      setRipple(null);
    }, 600);

    addToCart(product);
  };

  if (!product) return null;

  return (
    <div className="product-detail">
      <img src={product.image} alt={product.name} className="product-image" />
      <div className="product-info">
        <h3>{product.name}</h3>
        <p>Price: ₹{product.price}</p>
        <button className="add-to-cart-button" onClick={handleButtonClick}>
          <AiFillMedicineBox className="cart-icon" />
          Add to Cart
          {ripple && (
            <span
              className="ripple"
              style={{
                left: ripple.x,
                top: ripple.y,
                width: ripple.size,
                height: ripple.size,
              }}
            ></span>
          )}
        </button>
      </div>
    </div>
  );
}

export default ProductDetail;
