import React from "react";
import Button from "./Button";
import { Product } from "../../types/type";

type ProductCardProps = {
  product: Product;
  inCart?: boolean; // Flag to differentiate between cart and product list
  onAddToCart?: (product: Product) => void;
  onIncrease?: (id: number) => void;
  onDecrease?: (id: number) => void;
  onRemove?: (product: Product) => void;
};

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  inCart = false,
  onAddToCart,
  onIncrease,
  onDecrease,
  onRemove,
}) => {
  return (
    <div style={{ border: "1px solid #ccc", margin: "8px", padding: "8px", borderRadius: "5px" }}>
      <h3>{product.name}</h3>
      <p>Price: ${product.price}</p>
      <p>{inCart ? `Quantity: ${product.stock}` : `Available Stock: ${product.stock}`}</p>

      {inCart ? (
        <>
          <Button onClick={() => onDecrease?.(product.id)} disabled={product.stock <= 1}>
            -
          </Button>
          <Button onClick={() => onIncrease?.(product.id)}>+</Button>
          <Button onClick={() => onRemove?.(product.id)}>Remove</Button>
        </>
      ) : (
        <Button onClick={() => onAddToCart?.(product)} disabled={product.stock === 0}>
          Add to Cart
        </Button>
      )}
    </div>
  );
};

export default ProductCard;
