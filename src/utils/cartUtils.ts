// src/utils/cartUtils.ts

import { Product } from "../types/type";

export const updateStock = (products: Product[], id: number, amount: number): Product[] => {
  return products.map((p) =>
    p.id === id ? { ...p, stock: Math.max(0, p.stock + amount) } : p
  );
};

export const updateCart = (cart: Product[], products: Product[], id: number, amount: number): Product[] => {
  const existingItem = cart.find((item) => item.id === id);
  if (existingItem) {
    return cart.map((item) =>
      item.id === id ? { ...item, stock: item.stock + amount } : item
    );
  } else {
    const product = products.find((p) => p.id === id);
    if (!product || product.stock <= 0) return cart;
    return [...cart, { ...product, stock: 1 }];
  }
};
