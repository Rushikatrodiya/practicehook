import React, { createContext } from "react";
import { CartContextType, CartProviderProps, Product } from "../types/type";
import { addToCart, clearCart, decreaseQuantity, fetchCart, fetchProducts, increaseQuantity, removeItem } from "../service/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// Context with default values
export const CartContext = createContext<CartContextType>({
  products: [],
  cart: [],
  addToCart: () => {},
  increaseQuantity: () => {},
  decreaseQuantity: () => {},
  removeItem: () => {},
  clearCart: () => {},
});

// Custom hook for creating mutations
const useCartMutation = (mutationFn: (arg: any) => Promise<any>) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  // Fetch queries
  const { data: products = [] } = useQuery({ queryKey: ["products"], queryFn: fetchProducts });
  const { data: cart = [] } = useQuery({ queryKey: ["cart"], queryFn: fetchCart });

  // Mutations using the custom hook
  const addToCartMutation = useCartMutation(addToCart);
  const removeItemMutation = useCartMutation(removeItem);
  const increaseQuantityMutation = useCartMutation(increaseQuantity);
  const decreaseQuantityMutation = useCartMutation(decreaseQuantity);
  const clearCartMutation = useCartMutation(clearCart);

  return (
    <CartContext.Provider
      value={{
        cart,
        products,
        addToCart: (product: Product) => product.stock > 0 && addToCartMutation.mutate(product),
        increaseQuantity: (id: string) => increaseQuantityMutation.mutate(id),
        decreaseQuantity: (id: string) => decreaseQuantityMutation.mutate(id),
        removeItem: (id: string) => removeItemMutation.mutate(id),
        clearCart: () => clearCartMutation.mutate(undefined),
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
