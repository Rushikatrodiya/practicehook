import React, { createContext, useContext } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchCart, fetchProducts, addToCart, removeCartItem } from "../service/api";
import { CartContextType, CartProviderProps, Product } from "../types/type";

export const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const queryClient = useQueryClient();

  // Fetch products
  const { data: products = [] } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  // Fetch cart
  const { data: cart = [] } = useQuery({
    queryKey: ["cart"],
    queryFn: fetchCart,
  });

  // Mutation to add item to cart
  const addToCartMutation = useMutation({
    mutationFn: addToCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] }); // Refresh cart data
      queryClient.invalidateQueries({ queryKey: ["products"] }); // Refresh products stock
    },
  });

  // Mutation to remove item from cart
  const removeItemMutation = useMutation({
    mutationFn: removeCartItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  // Function to handle adding item to cart
  const handleAddToCart = (product: Product) => {
    if (product.stock > 0) {
      addToCartMutation.mutate(product);
    }
  };

  // Function to handle removing an item from cart
  const handleRemoveItem = (id: number) => {
    removeItemMutation.mutate(id);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        products,
        addToCart: handleAddToCart,
        removeItem: handleRemoveItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// // Hook to use cart context
// export const useCart = () => {
//   const context = useContext(CartContext);
//   if (!context) {
//     throw new Error("useCart must be used within a CartProvider");
//   }
//   return context;
// };
