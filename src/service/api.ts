import axios from "axios";
import { Product } from "../types/type";

const BASE_URL = "http://localhost:5000";

// Fetch products
export const fetchProducts = async (): Promise<Product[]> => {
  const response = await axios.get(`${BASE_URL}/products`);
  return response.data;
};

// Fetch cart
export const fetchCart = async (): Promise<Product[]> => {
  const response = await axios.get(`${BASE_URL}/cart`);
  return response.data;
};

// Add item to cart (checks if item already exists)
export const addToCart = async (product: Product) => {
  // Fetch current cart data
  const { data: cart } = await axios.get(`${BASE_URL}/cart`);
  
  // Check if item already exists in cart
  const existingItem = cart.find((item: Product) => item.id === product.id);

  if (existingItem) {
    // If exists, update quantity
    await axios.put(`${BASE_URL}/cart/${existingItem.id}`, {
      ...existingItem,
      stock: existingItem.stock + 1, // Increase cart quantity
    });
  } else {
    // If not in cart, add a new item with quantity 1
    await axios.post(`${BASE_URL}/cart`, { ...product, stock: 1 });
  }

  // Reduce stock in products API
  await axios.put(`${BASE_URL}/products/${product.id}`, {
    ...product,
    stock: product.stock - 1, // Reduce available stock
  });
};

// Remove item from cart
export const removeCartItem = async (id: number) => {
  // Fetch current cart data
  const { data: cart } = await axios.get(`${BASE_URL}/cart`);
  const item = cart.find((p: Product) => p.id === id);

  if (!item) return;

  // Increase stock back to products
  const { data: product } = await axios.get(`${BASE_URL}/products/${id}`);
  await axios.put(`${BASE_URL}/products/${id}`, {
    ...product,
    stock: product.stock + item.stock, // Restore stock
  });

  // Remove item from cart
  await axios.delete(`${BASE_URL}/cart/${id}`);
};
