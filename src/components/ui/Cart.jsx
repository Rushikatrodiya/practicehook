import React from "react";
import Button from "./Button";

const Cart = ({ product, handleclick, handleIncrease, handleDecrease, handleRemove, type }) => {
  return (
    <div
      style={{
        border: "1px solid black",
        padding: "10px",
        margin: "10px",
        background: "yellow",
      }}
    >
      <h3>{product.name}</h3>
      <p>Price: {product.price}</p>
      <p>Stock: {product.stock}</p>

      {type === "cartlist" ? (
        <>
          <Button btntext="+" handlebutton={() => handleIncrease(product.id)} />
          <Button btntext="-" handlebutton={() => handleDecrease(product.id)} />
          <Button btntext="Remove" handlebutton={() => handleRemove(product)} />
        </>
      ) : (
        <Button btntext="Add to cart" handlebutton={() => handleclick(product)} />
      )}
    </div>
  );
};

export default Cart;
