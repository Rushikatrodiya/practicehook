// src/App.tsx
import React, { useState } from 'react';
import ProductList from './components/ProductList';
import CartPage from './components/CartPage';
import { CartProvider } from './Context/CartContext';

const App: React.FC = () => {
  const [isCartPage, setIsCartPage] = useState<boolean>(false);

  return (
    <CartProvider>
      <button onClick={() => setIsCartPage(!isCartPage)}>
        {isCartPage ? "Go to Main Page" : "Show Cart"}
      </button>
      {isCartPage ? <CartPage /> : <ProductList />}
    </CartProvider>
  );
};

export default App;
