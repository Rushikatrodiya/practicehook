import {  Product  } from "../types/type";

import useCart from "../hooks/useCart";
import Card from "./ui/Card";
// import Card from "../ui/Card";

const ProductList: React.FC = () => {
  const { products } = useCart()
  return (
    <div>
      <h2>Products</h2>
      {products.map((product: Product) => (
        <Card product={product}  key={product.id} type="product"/>
      ))}
    </div>
  );
};

export default ProductList;