// src/components/Cart.tsx
import React from "react";
import useCart from "../hooks/useCart";

const CartPage: React.FC = () => {
  const { cart, increaseQuantity, decreaseQuantity, removeItem, clearCart } = useCart();

  return (
    <div>
      <h2>Shopping Cart</h2>
      {cart.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        cart.map((item) => (
          <div key={item.id} style={{ border: "1px solid #ccc", margin: "8px", padding: "8px" }}>
            <h3>{item.name}</h3>
            <p>Price: ${item.price}</p>
            <p>Quantity: {item.stock}</p>
            <button onClick={() => decreaseQuantity(item.id)} disabled={item.stock <= 1}>
              -
            </button>
            <button onClick={() => increaseQuantity(item.id)}>
              +
            </button>
            <button onClick={() => removeItem(item)}>Remove</button>
          </div>
        ))
      )}
      {cart.length > 0 && (
        <div>
          <button onClick={clearCart}>Clear Cart</button>
        </div>
      )}
    </div>
  );
};

export default CartPage;
