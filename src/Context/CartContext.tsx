import React, { useState, createContext, useEffect } from 'react';
import { CartContextType, CartProviderProps, Product } from '../types/type';
import { updateCart , updateProduct} from '../utils/cartUtils';
import { fetchProducts } from '../service/api';


 export const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cart, setCart] = useState<Product[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
 
  useEffect(() => {
    const loadProducts = async () => {
      const data = await fetchProducts();
      setProducts(data);
    };
    loadProducts();
  }, []);
  

  const modifyStock = (id: number, amount: number) => {
    setProducts((prev) => updateProduct(prev, id, amount));
  };

  const modifyCart = (id: number, amount: number) => {
    setCart((prev) => updateCart(prev, products, id, amount));
  };

  const addToCart = (product: Product) => {
    if (product.stock <= 0) return;
    modifyStock(product.id, -1);
    modifyCart(product.id, 1);
  };

  const increaseQuantity = (id: number) => {
    const product = products.find((p) => p.id === id);
    if (!product || product.stock <= 0) return;
    modifyStock(id, -1);
    modifyCart(id, 1);
  };

  const decreaseQuantity = (id: number) => {
    const cartItem = cart.find((item) => item.id === id);
    if (!cartItem || cartItem.stock <= 1) return;
    modifyStock(id, 1);
    modifyCart(id, -1);
  };

  const removeItem = (product: Product) => {
    setCart((prev) => prev.filter((item) => item.id !== product.id));
    modifyStock(product.id, product.stock);
  };

  const clearCart = () => {
    setProducts((prev) =>
      prev.map((product) => {
        const cartItem = cart.find((item) => item.id === product.id);
        return cartItem ? { ...product, stock: product.stock + cartItem.stock } : product;
      })
    );
    setCart([]);
  };

  
  return (
    <CartContext.Provider
      value={{
        cart,
        products,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeItem,
        clearCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
