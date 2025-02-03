import React from "react";
import useCart from "../hooks/useCart";
import ProductCard from "./ui/ProductCard";

const CartPage: React.FC = () => {
  const { cart, increaseQuantity, decreaseQuantity, removeItem, clearCart } = useCart();

  return (
    <div>
      <h2>Shopping Cart</h2>
      {cart.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        cart.map((item) => (
          <ProductCard
            key={item.id}
            product={item}
            inCart={true}
            onIncrease={increaseQuantity}
            onDecrease={decreaseQuantity}
            onRemove={removeItem}
          />
        ))
      )}
      {cart.length > 0 && <button onClick={clearCart}>Clear Cart</button>}
    </div>
  );
};

export default CartPage;
