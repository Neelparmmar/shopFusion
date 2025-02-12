import React from "react";
import "./Quantity.css";
const Quantity = ({ quantity, setQuantity, stock, productID, cartPage }) => {
  return (
    <>
      <button
        className="quantity-input-button"
        disabled={quantity <= 1}
        onClick={() => {
          cartPage
            ? setQuantity(productID, "decrease")
            : setQuantity(quantity - 1);
        }}
      >
        -
      </button>
      <p className="quantity-input-count">{quantity}</p>
      <button
        className="quantity-input-button"
        disabled={quantity >= stock}
        onClick={() => {
          cartPage
            ? setQuantity(productID, "increase")
            : setQuantity(quantity + 1);
        }}
      >
        +
      </button>
    </>
  );
};

export default Quantity;
