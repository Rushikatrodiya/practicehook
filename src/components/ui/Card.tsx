import { FC } from "react";
// import useCart from "../hooks/useCart";
// import { CardComponent } from "../types/type";
import Button from "./Button";
import { CardComponent } from "../../types/type";
import useCart from "../../hooks/useCart";

const Card: FC<CardComponent> = ({ product, type }) => {
  // const {  increaseQuantity, decreaseQuantity, removeItem, addToCart } = useCart();
  const { addToCart ,removeItem , increaseQuantity ,decreaseQuantity } = useCart();

  return (
    <div style={{ border: "1px solid #ccc", margin: "8px", padding: "8px" }}>
      <h3>{product.name}</h3>
      <p>Price: ${product.price}</p>
      <p>Available Stock: {product.stock}</p>

      {type === "cartlist" ? (
        <>
          <Button action={() => decreaseQuantity(product.id)}>-</Button>
          <Button action={() => increaseQuantity(product.id)}>+</Button>
          <Button action={() => removeItem(product.id)}>Remove</Button>{" "}
        </>
      ) : (
        <Button action={() => addToCart(product)}>Add to Cart</Button>
      )}

      {/* <Button action={() => addToCart(product)}>Add to Cart</Button> */}
    </div>
  );
};

export default Card;