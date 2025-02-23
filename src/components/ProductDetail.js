import React, { useState } from "react";
import "./ProductDetail.css";
import { AiFillMedicineBox } from "react-icons/ai";
function ProductDetail({ product }) {
    
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
    }, 600); // Match animation duration
  };

  if (!product) return null; // If no product selected, return nothing

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
