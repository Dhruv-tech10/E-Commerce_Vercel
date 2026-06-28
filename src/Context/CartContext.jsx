import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
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
        updateTotals(parsed);
      } catch (e) {
        console.error('Error loading cart:', e);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
    updateTotals(cartItems);
  }, [cartItems]);

  // Update totals function
  const updateTotals = (items) => {
    const count = items.reduce((sum, item) => sum + item.quantity, 0);
    const total = items.reduce((sum, item) => {
      const price = item.offerPrice || item.price || 0;
      return sum + price * item.quantity;
    }, 0);
    setCartCount(count);
    setCartTotal(total);
  };

  // Add to cart - Universal function
  const addToCart = (product, quantity = 1, selectedSize = null) => {
    if (!product) {
      console.error('Product is required to add to cart');
      return;
    }

    // Ensure quantity is a positive number
    const qty = Math.max(1, parseInt(quantity) || 1);
    
    // Get size - if product has sizes and no size selected, use first size
    let size = selectedSize;
    if (!size && product.sizes && Array.isArray(product.sizes) && product.sizes.length > 0) {
      size = product.sizes[0];
    }

    const itemKey = size ? `${product.id}-${size}` : product.id;

    setCartItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(
        item => (size ? `${item.id}-${item.selectedSize}` : item.id) === itemKey
      );

      let updatedItems;
      if (existingItemIndex !== -1) {
        updatedItems = [...prevItems];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + qty
        };
      } else {
        const newItem = {
          ...product,
          quantity: qty,
          selectedSize: size,
          price: product.offerPrice || product.price
        };
        updatedItems = [...prevItems, newItem];
      }
      
      updateTotals(updatedItems);
      return updatedItems;
    });

    // Show toast notification
    window.dispatchEvent(new CustomEvent('showToast', {
      detail: {
        message: `${product.name || 'Product'} added to cart!`,
        type: 'success'
      }
    }));
  };

  // Remove from cart
  const removeFromCart = (id, size = null) => {
    setCartItems(prevItems => {
      let updatedItems;
      if (size) {
        updatedItems = prevItems.filter(item => !(item.id === id && item.selectedSize === size));
      } else {
        updatedItems = prevItems.filter(item => item.id !== id);
      }
      updateTotals(updatedItems);
      return updatedItems;
    });
  };

  // Update quantity
  const updateQuantity = (id, quantity, size = null) => {
    if (quantity <= 0) {
      removeFromCart(id, size);
      return;
    }

    setCartItems(prevItems => {
      const updatedItems = prevItems.map(item => {
        if (size) {
          if (item.id === id && item.selectedSize === size) {
            return { ...item, quantity };
          }
        } else if (item.id === id) {
          return { ...item, quantity };
        }
        return item;
      });
      updateTotals(updatedItems);
      return updatedItems;
    });
  };

  // Clear cart
  const clearCart = () => {
    setCartItems([]);
    setCartCount(0);
    setCartTotal(0);
    localStorage.removeItem('cart');
  };

  // Check if item is in cart
  const isInCart = (id, size = null) => {
    if (size) {
      return cartItems.some(item => item.id === id && item.selectedSize === size);
    }
    return cartItems.some(item => item.id === id);
  };

  // Get total items count
  const getItemCount = () => {
    return cartCount;
  };

  // Get cart total
  const getCartTotal = () => {
    return cartTotal;
  };

  // Get item quantity for specific product
  const getItemQuantity = (id, size = null) => {
    const item = cartItems.find(item => {
      if (size) {
        return item.id === id && item.selectedSize === size;
      }
      return item.id === id;
    });
    return item ? item.quantity : 0;
  };

  // Force update cart (for sync)
  const refreshCart = () => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        const parsed = JSON.parse(savedCart);
        setCartItems(parsed);
        updateTotals(parsed);
      } catch (e) {
        console.error('Error refreshing cart:', e);
      }
    }
  };

  const value = {
    cartItems,
    cartCount,
    cartTotal,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    isInCart,
    getItemCount,
    getCartTotal,
    getItemQuantity,
    refreshCart,
    setCartItems
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};