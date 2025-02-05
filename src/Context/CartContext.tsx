import React, { useState, createContext, useEffect } from "react";
import { CartContextType, CartProviderProps, Product } from "../types/type";
// import { updateCart, updateProduct } from "../utils/CartUtils";
import { addToCart, clearCart, decreaseQuantity, fetchCart, fetchProducts, increaseQuantity, removeItem } from "../service/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const CartContext = createContext<CartContextType>({
  products: [],
  cart: [],
  addToCart: () => {},
  increaseQuantity: () => {},
  decreaseQuantity: () => {},
  removeItem: () => {},
  clearCart: () => {},
});

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const queryClient = useQueryClient();
  const { data: products = [] } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  const { data : cart = []} = useQuery({
    queryKey: ['cart'],
    queryFn: fetchCart 
  });

  const addToCartMutation = useMutation({
    mutationFn: addToCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] }); 
      queryClient.invalidateQueries({ queryKey: ["products"] }); 
    },
  }); 

  
  const removeToCartMutation = useMutation({
    mutationFn:removeItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart']});
      queryClient.invalidateQueries({ queryKey: ["products"] }); 
    }
  })
  
  const increaseToCartMutation = useMutation({
    mutationFn:increaseQuantity,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      queryClient.invalidateQueries({queryKey: ['products']})
    }
  })

  const decreaseToCartMutation = useMutation({
    mutationFn:decreaseQuantity,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      queryClient.invalidateQueries({queryKey: ['products']})
    }
  })

  const clearCartMutation = useMutation({
    mutationFn:clearCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey : ['cart'] }),
      queryClient.invalidateQueries({ queryKey: ['products']})
    }
  })

  const handleAddToCart = (product: Product) => {
    if (product.stock > 0) {
      addToCartMutation.mutate(product);
    }
  };

  const handleRemoveToCart = (id:string) => {
    removeToCartMutation.mutate(id)
  }

  const handleIncreaseToQuantity = (id:string) => {
    increaseToCartMutation.mutate(id)
  }

  const handleDecreaseToQuantity = (id:string) => {
    decreaseToCartMutation.mutate(id)
  }
  const handleClearCart = () => {
    clearCartMutation.mutate()
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        products,
         addToCart: handleAddToCart,
        increaseQuantity: handleIncreaseToQuantity,
        decreaseQuantity: handleDecreaseToQuantity,
        removeItem: handleRemoveToCart,
        clearCart:handleClearCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};