import axios from "axios";
import { Product } from "../types/type";

const BASE_URL = "http://localhost:5000";

export const fetchProducts = async (): Promise<Product[]> => {
  const response = await axios.get(`${BASE_URL}/products`);
  return response.data;
};

export const fetchCart = async (): Promise<Product[]> => {
  const response = await axios.get(`${BASE_URL}/cart`);
  return response.data;
};
