import { ReactNode } from "react";

export type Product = {
  id: number;
  name: string;
  price: number;
  stock: number;
};
 // Cart items are the same as products, but with quantity

// Type the context value for better type-checking
export type CartContextType = {
  cart: Product[];
  products: Product[];
  addToCart: (product: Product) => void;
  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;
  removeItem: (product: Product) => void;
  clearCart: () => void;
}

export type  CartProviderProps = {
  children: ReactNode;
}