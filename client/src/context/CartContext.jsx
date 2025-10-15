// context/CartContext.jsx
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
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('roadengo-cart');
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        setCartItems(Array.isArray(parsedCart) ? parsedCart : []);
        console.log('Cart loaded from localStorage:', parsedCart.length, 'items');
      }
    } catch (error) {
      console.error('Error loading cart from localStorage:', error);
      setCartItems([]);
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('roadengo-cart', JSON.stringify(cartItems));
      console.log('Cart saved to localStorage:', cartItems.length, 'items');
    } catch (error) {
      console.error('Error saving cart to localStorage:', error);
    }
  }, [cartItems]);

  const addToCart = (part, quantity = 1) => {
    setCartItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(item => item.id === part.id);
      
      if (existingItemIndex > -1) {
        // Item exists, update quantity
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + quantity
        };
        console.log('Updated existing item in cart:', part.name);
        return updatedItems;
      } else {
        // New item, add to cart
        console.log('Added new item to cart:', part.name);
        return [...prevItems, { ...part, quantity }];
      }
    });
  };

  const removeFromCart = (partId) => {
    setCartItems(prevItems => {
      const filteredItems = prevItems.filter(item => item.id !== partId);
      console.log('Removed item from cart:', partId);
      return filteredItems;
    });
  };

  const updateQuantity = (partId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(partId);
      return;
    }
    
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === partId 
          ? { ...item, quantity: Math.max(1, quantity) } 
          : item
      )
    );
    
    console.log('Updated quantity for item:', partId, 'to:', quantity);
  };

  const clearCart = () => {
    setCartItems([]);
    console.log('Cart cleared');
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => {
      try {
        const price = parseFloat(item.price.replace('₹', '').replace(',', '')) || 0;
        return total + (price * item.quantity);
      } catch (error) {
        console.error('Error calculating price for item:', item);
        return total;
      }
    }, 0);
  };

  const getCartItemsCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
    console.log('Cart toggled:', !isCartOpen);
  };

  const isItemInCart = (partId) => {
    return cartItems.some(item => item.id === partId);
  };

  const getItemQuantity = (partId) => {
    const item = cartItems.find(item => item.id === partId);
    return item ? item.quantity : 0;
  };

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartItemsCount,
    isCartOpen,
    toggleCart,
    isItemInCart,
    getItemQuantity
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
