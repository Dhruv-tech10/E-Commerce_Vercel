// src/Context/CartContext.jsx
import { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        const parsed = JSON.parse(savedCart);
        setCartItems(parsed);
        updateCartStats(parsed);
      } catch (e) {
        console.error('Error loading cart:', e);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
    updateCartStats(cartItems);
  }, [cartItems]);

  const updateCartStats = (items) => {
    const count = items.reduce((total, item) => total + item.quantity, 0);
    const total = items.reduce((sum, item) => sum + (item.offerPrice * item.quantity), 0);
    setCartCount(count);
    setCartTotal(total);
  };

  const addToCart = (product, quantity = 1, size = null) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(
        item => item.id === product.id && item.selectedSize === size
      );

      if (existingItem) {
        // Update quantity if item already exists
        return prevItems.map(item =>
          item.id === product.id && item.selectedSize === size
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        // Add new item
        return [...prevItems, { 
          ...product, 
          quantity, 
          selectedSize: size,
          addedAt: new Date().toISOString()
        }];
      }
    });

    // Show toast notification
    const toastEvent = new CustomEvent('showToast', {
      detail: {
        message: `${product.name} added to cart!`,
        type: 'success'
      }
    });
    window.dispatchEvent(toastEvent);
  };

  const removeFromCart = (productId, size = null) => {
    setCartItems(prevItems => {
      if (size) {
        return prevItems.filter(item => !(item.id === productId && item.selectedSize === size));
      }
      return prevItems.filter(item => item.id !== productId);
    });
  };

  const updateQuantity = (productId, newQuantity, size = null) => {
    if (newQuantity < 1) {
      removeFromCart(productId, size);
      return;
    }

    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId && item.selectedSize === size
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getCartTotal = () => {
    return cartItems.reduce((sum, item) => sum + (item.offerPrice * item.quantity), 0);
  };

  const getItemCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const isInCart = (productId, size = null) => {
    return cartItems.some(item => 
      item.id === productId && (size ? item.selectedSize === size : true)
    );
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      cartCount,
      cartTotal,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getCartTotal,
      getItemCount,
      isInCart
    }}>
      {children}
    </CartContext.Provider>
  );
};