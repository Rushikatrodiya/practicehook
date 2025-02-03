import axios from "axios";

import { Product } from "../types/type";

const BASE_URL = "http://localhost:5000";

export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const response = await axios.get(`${BASE_URL}/products`);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};