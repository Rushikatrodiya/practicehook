import React, { createContext } from "react";
import { CartContextType, CartProviderProps, Product } from "../types/type";
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

  // Modify product stock directly within the CartProvider
  const modifyStock = (id: number, amount: number) => {
    queryClient.setQueryData<Product[]>(["products"], (prev = []) =>
      prev.map((p) =>
        p.id === id ? { ...p, stock: Math.max(0, p.stock + amount) } : p
      )
    );
  };

  // Modify cart directly within the CartProvider
  const modifyCart = (id: number, amount: number) => {
    queryClient.setQueryData<Product[]>(["cart"], (prev = []) => {
      const existingItem = prev.find((item) => item.id === id);
      if (existingItem) {
        return prev.map((item) =>
          item.id === id ? { ...item, stock: item.stock + amount } : item
        );
      } else {
        const product = products.find((p) => p.id === id);
        if (!product || product.stock <= 0) return prev;
        return [...prev, { ...product, stock: 1 }];
      }
    });
  };

  const addToCart = (product: Product) => {
    if (product.stock <= 0) return;
    modifyStock(product.id, -1); // Decrease product stock
    modifyCart(product.id, 1); // Add to cart
  };

  const increaseQuantity = (id: number) => {
    const product = products.find((p) => p.id === id);
    if (!product || product.stock <= 0) return;
    modifyStock(id, -1); // Decrease product stock
    modifyCart(id, 1); // Increase cart quantity
  };

  const decreaseQuantity = (id: number) => {
    const cartItem = cart.find((item) => item.id === id);
    if (!cartItem || cartItem.stock <= 1) return;
    modifyStock(id, 1); // Increase product stock
    modifyCart(id, -1); // Decrease cart quantity
  };

  const removeItem = (product: Product) => {
    queryClient.setQueryData<Product[]>(["cart"], (prev = []) =>
      prev.filter((item) => item.id !== product.id)
    );
    modifyStock(product.id, product.stock); // Restore product stock
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
