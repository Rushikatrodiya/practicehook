// src/components/ProductList.tsx
import React from "react";
import useCart from "../hooks/useCart";
import { Product } from "../types/type";

const ProductList: React.FC = () => {
  const { products, addToCart } = useCart();

  return (
    <div>
      <h2>Products</h2>
      {products.map((product: Product) => (
        <div key={product.id} style={{ border: "1px solid #ccc", margin: "8px", padding: "8px" }}>
          <h3>{product.name}</h3>
          <p>Price: ${product.price}</p>
          <p>Available Stock: {product.stock}</p>
          <button onClick={() => addToCart(product)} disabled={product.stock === 0}>
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
