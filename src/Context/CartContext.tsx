import React, { createContext } from "react";
import { CartContextType, CartProviderProps, Product } from "../types/type";
import { updateCart, updateProduct } from "../utils/cartUtils";
import { fetchCart, fetchProducts } from "../service/api";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const queryClient = useQueryClient();

  const { data: products = [] } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  const { data: cart = [] } = useQuery({
    queryKey: ["cart"],
    queryFn: fetchCart,
  });

  const modifyStock = (id: number, amount: number) => {
    queryClient.setQueryData<Product[]>(["products"], (prev = []) => updateProduct(prev, id, amount));
  };

  const modifyCart = (id: number, amount: number) => {
    queryClient.setQueryData<Product[]>(["cart"], (prev = []) => updateCart(prev, products, id, amount));
  };

  const addToCart = (product: Product) => {
    if (product.stock <= 0) return;
    modifyStock(product.id, -1);
    modifyCart(product.id, 1);
  };

  const increaseQuantity = (id: number) => {
    const product = products.find((p) => p.id === id);
    if (!product || product.stock <= 0) return;
    modifyStock(id, -1);
    modifyCart(id, 1);
  };

  const decreaseQuantity = (id: number) => {
    const cartItem = cart.find((item) => item.id === id);
    if (!cartItem || cartItem.stock <= 1) return;
    modifyStock(id, 1);
    modifyCart(id, -1);
  };

  const removeItem = (product: Product) => {
    queryClient.setQueryData<Product[]>(["cart"], (prev = []) => prev.filter((item) => item.id !== product.id));
    modifyStock(product.id, product.stock);
  };

  const clearCart = () => {
    queryClient.setQueryData<Product[]>(["products"], (prev = []) =>
      prev.map((product) => {
        const cartItem = cart.find((item) => item.id === product.id);
        return cartItem ? { ...product, stock: product.stock + cartItem.stock } : product;
      })
    );
    queryClient.setQueryData(["cart"], []);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        products,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeItem,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
