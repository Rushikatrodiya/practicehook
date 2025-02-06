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

export const addToCart = async (product: Product) => {
  const { data: cart } = await axios.get(`${BASE_URL}/cart`);

  const existingItem = cart.find((item: Product) => item.id === product.id);

  if (existingItem) {
    await axios.put(`${BASE_URL}/cart/${existingItem.id}`, {
      ...existingItem,
      stock: existingItem.stock + 1,
    });
  } else {
    await axios.post(`${BASE_URL}/cart`, { ...product, stock: 1 });
  }

  await axios.put(`${BASE_URL}/products/${product.id}`, {
    ...product,
    stock: product.stock - 1,
  });
};

export const removeItem = async(id:string) => {
  const { data: cart } = await axios.get(`${BASE_URL}/cart`);
  const item = cart.find((p: Product) => p.id === id);

  if (!item) return;

  const { data: product } = await axios.get(`${BASE_URL}/products/${id}`);
  await axios.put(`${BASE_URL}/products/${id}`, {
    ...product,
    stock: product.stock + item.stock, 
  });

  await axios.delete(`${BASE_URL}/cart/${id}`);
}

export const increaseQuantity = async (id:string) => {
  const { data : cart} = await axios.get(`${BASE_URL}/cart`);
  const item = cart.find((p:Product) => p.id === id);
  const { data: product } = await axios.get(`${BASE_URL}/products/${id}`);
  if (!product || product.stock <= 0) return;
  console.log(item);
  
  if(item){
    await axios.put(`${BASE_URL}/cart/${id}`, {
      ...item,
      stock: item.stock + 1,
    });
  }

  await axios.put(`${BASE_URL}/products/${id}`, {
    ...product,
    stock: product.stock - 1,
  });
}

export const decreaseQuantity = async (id: string) => {
  const { data: cart } = await axios.get(`${BASE_URL}/cart`);
  const item = cart.find((p: Product) => p.id === id);

  if (!item || item.stock <= 1) return;

  await axios.put(`${BASE_URL}/cart/${id}`, {
    ...item,
    stock: item.stock - 1,
  });

  const { data: product } = await axios.get(`${BASE_URL}/products/${id}`);

  await axios.put(`${BASE_URL}/products/${id}`, {
    ...product,
    stock: product.stock + 1,
  });
};

export const clearCart = async () => {
  const { data: cart } = await axios.get(`${BASE_URL}/cart`);
  
  await Promise.all(
    cart.map(async (item: Product) => {
      const product = await axios.get(`${BASE_URL}/products/${item.id}`);
      await axios.put(`${BASE_URL}/products/${item.id}`, {
        ...product.data,
        stock: product.data.stock + item.stock,
      });
      await axios.delete(`${BASE_URL}/cart/${item.id}`);
    })
  );

  console.log("Cart cleared successfully!");
};



