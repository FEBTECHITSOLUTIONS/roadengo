// components/FloatingCartButton.jsx
import React from "react";
import { useCart } from "../context/CartContext";

const FloatingCartButton = () => {
  const { getCartItemsCount, toggleCart } = useCart();

  return (
    <>
      {/* Floating Cart Button - Bottom Right Corner */}
      <div className="fixed bottom-6 left-6 z-50">
        <button
          onClick={toggleCart}
          className="relative bg-red-600 text-white p-2 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-110 active:scale-95 focus:outline-none focus:ring-4 focus:ring-red-300/50 group"
          aria-label={`Shopping cart with ${getCartItemsCount()} items`}
        >
          {/* Cart Icon */}
          <i className="ri-shopping-bag-4-fill text-4xl transition-transform duration-300 group-hover:rotate-12"></i>
          
          {/* Cart Badge */}
          {getCartItemsCount() > 0 && (
            <div className="absolute -top-2 -right-2 bg-yellow-400 text-black text-sm font-bold rounded-full min-w-[24px] h-6 flex items-center justify-center px-2 shadow-lg border-2 border-white animate-bounce">
              {getCartItemsCount() > 99 ? '99+' : getCartItemsCount()}
            </div>
          )}
          
          {/* Pulse Ring Animation */}
          {getCartItemsCount() > 0 && (
            <div className="absolute inset-0 rounded-full border-2 border-red-400 animate-ping opacity-30"></div>
          )}
          
          {/* Hover Ripple Effect */}
          <div className="absolute inset-0 rounded-full bg-white opacity-0 scale-0 transition-all duration-300 group-active:opacity-20 group-active:scale-100"></div>
        </button>
      </div>
    </>
  );
};

export default FloatingCartButton;
