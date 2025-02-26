import React, { createContext, useState } from "react";

export const CartContext = createContext(); // ✅ Create Context

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]); // ✅ Ensure cart is always an array

  const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
}
