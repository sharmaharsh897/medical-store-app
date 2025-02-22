import React from "react";
import "./ProductDetail.css";

function ProductDetail({ product }) {
  if (!product) return null;

  return (
    <div className="product-detail">
      <img src={product.image} alt={product.name} className="product-image" />
      <div className="product-info">
        <h3>{product.name}</h3>
        <p>₹{product.price}</p>
        <button className="add-to-cart">Add to Cart</button>
      </div>
    </div>
  );
}

export default ProductDetail;
