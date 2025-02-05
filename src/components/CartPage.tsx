// src/components/Cart.tsx
import React from "react";
import useCart from "../hooks/useCart"
// import Card from "../ui/Card";
import { Product } from "../types/type";
import Button from "./ui/Button";
import Card from "./ui/Card";
// import Button from "../ui/Button";

const CartPage: React.FC = () => {
  const { cart,clearCart} = useCart();

  return (
    <div>
      <h2>Shopping Cart</h2>
      {cart.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        cart.map((item:Product) => (
          <Card type={"cartlist"} product={item}  key={item.id}/>
        ))
      )}
      {cart.length > 0 && (
        <div>
            <Button action={clearCart}>Clear Cart</Button>
        </div>
      )}
    </div>
  );
};

export default CartPage;