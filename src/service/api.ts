import axios from "axios";
import { Product } from "../types/type";

const BASE_URL = "http://127.0.0.1:5000";

// Fetch all products
export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const response = await axios.get(`${BASE_URL}/products`);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

// Fetch cart items
export const fetchCartItems = async (): Promise<Product[]> => {
  try {
    const response = await axios.get(`${BASE_URL}/cart`);
    return response.data;
  } catch (error) {
    console.error("Error fetching cart items:", error);
    return [];
  }
};
