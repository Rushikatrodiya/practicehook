import { useContext } from "react";
import { CartContext } from "../Context/CartContext";

const useCart = () => {
  const context = useContext(CartContext);
  return context;
};

export default useCart;