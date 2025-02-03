import React from "react";
import useCart from "../hooks/useCart";
import { Product } from "../types/type";
import ProductCard from "./ui/ProductCard";

const ProductList: React.FC = () => {
  const { products, addToCart } = useCart();

  return (
    <div>
      <h2>Products</h2>
      {products.map((product: Product) => (
        <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
      ))}
    </div>
  );
};

export default ProductList;
