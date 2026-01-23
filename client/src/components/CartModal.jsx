// components/CartModal.jsx
import React, { useState } from "react";
import { useCart } from "../context/CartContext";

const CartModal = () => {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    toggleCart,
    isCartOpen,
  } = useCart();

  const [showInquiryForm, setShowInquiryForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [inquiryData, setInquiryData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    message: "",
  });

  // Fixed inquiry submission with better error handling
  const handleSubmitInquiry = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const inquiryPayload = {
      ...inquiryData,
      cartItems: cartItems,
      totalAmount: getCartTotal(),
      itemCount: cartItems.length,
      inquiryType: "spare-parts",
      status: "pending",
      createdAt: new Date(),
    };

    try {
      // Use local API endpoint
      const response = await fetch(`${import.meta.env.VITE_API_URL}/inquiries`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inquiryPayload),
      });

      if (response.ok) {
        alert("✅ Inquiry submitted successfully! We will contact you within 24 hours.");
        clearCart();
        setShowInquiryForm(false);
        toggleCart();
        setInquiryData({
          name: "",
          phone: "",
          email: "",
          address: "",
          message: "",
        });
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to submit inquiry");
      }
    } catch (error) {
      console.error("Error submitting inquiry:", error);
      alert(`❌ Error submitting inquiry: ${error.message}. Please try again.`);
    } finally {
      setSubmitting(false);
    }
  };

  if (!isCartOpen) return null;

  if (showInquiryForm) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl max-w-2xl w-full max-h-screen overflow-y-auto">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Submit Inquiry</h2>
              <button
                onClick={() => setShowInquiryForm(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
                disabled={submitting}
              >
                <i className="ri-close-line text-2xl"></i>
              </button>
            </div>

            <form onSubmit={handleSubmitInquiry} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Full Name"
                  required
                  value={inquiryData.name}
                  onChange={(e) =>
                    setInquiryData({ ...inquiryData, name: e.target.value })
                  }
                  disabled={submitting}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent disabled:opacity-50"
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  required
                  pattern="[0-9]{10}"
                  maxLength="10"
                  value={inquiryData.phone}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, '');
                    setInquiryData({ ...inquiryData, phone: value });
                  }}
                  disabled={submitting}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent disabled:opacity-50"
                />
              </div>

              <input
                type="email"
                placeholder="Email Address"
                required
                value={inquiryData.email}
                onChange={(e) =>
                  setInquiryData({ ...inquiryData, email: e.target.value })
                }
                disabled={submitting}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent disabled:opacity-50"
              />

              <textarea
                placeholder="Complete Address"
                required
                rows="3"
                minLength="10"
                value={inquiryData.address}
                onChange={(e) =>
                  setInquiryData({ ...inquiryData, address: e.target.value })
                }
                disabled={submitting}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent disabled:opacity-50"
              />

              <textarea
                placeholder="Additional Message (Optional)"
                rows="3"
                value={inquiryData.message}
                onChange={(e) =>
                  setInquiryData({ ...inquiryData, message: e.target.value })
                }
                disabled={submitting}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent disabled:opacity-50"
              />

              <div className="bg-red-50 p-4 rounded-lg border border-red-100">
                <h4 className="font-semibold text-red-900 mb-2">Order Summary</h4>
                <div className="space-y-2 text-sm">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex justify-between">
                      <span>{item.name} x {item.quantity}</span>
                      <span>₹{(parseFloat(item.price.replace('₹', '')) * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                  <div className="border-t pt-2 font-semibold text-red-900">
                    <div className="flex justify-between">
                      <span>Total Amount:</span>
                      <span>₹{getCartTotal().toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setShowInquiryForm(false)}
                  disabled={submitting}
                  className="flex-1 border-2 border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors disabled:opacity-50"
                >
                  Back to Cart
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors disabled:opacity-50 flex items-center justify-center"
                >
                  {submitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Submitting...
                    </>
                  ) : (
                    "Submit Inquiry"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-screen overflow-hidden">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-900">
            Shopping Cart ({cartItems.length} items)
          </h2>
          <button
            onClick={toggleCart}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <i className="ri-close-line text-2xl"></i>
          </button>
        </div>

        <div className="p-6 max-h-96 overflow-y-auto">
          {cartItems.length === 0 ? (
            <div className="text-center py-8">
              <i className="ri-shopping-cart-line text-4xl text-gray-300 mb-4"></i>
              <p className="text-gray-500">Your cart is empty</p>
              <button
                onClick={toggleCart}
                className="mt-4 text-red-600 hover:text-red-800 font-medium"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded"
                    onError={(e) => {
                      e.target.src = `https://via.placeholder.com/64x64/f3f4f6/374151?text=${encodeURIComponent(
                        item.name.charAt(0)
                      )}`;
                    }}
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{item.name}</h3>
                    <p className="text-sm text-gray-600">{item.brand}</p>
                    <p className="text-red-600 font-semibold">{item.price}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full hover:bg-gray-300 transition-colors"
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <span className="w-8 text-center font-semibold">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full hover:bg-gray-300 transition-colors"
                    >
                      +
                    </button>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="ml-2 text-red-600 hover:text-red-800 transition-colors"
                    >
                      <i className="ri-delete-bin-line"></i>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="border-t p-6">
            <div className="flex justify-between items-center mb-4">
              <span className="text-xl font-bold">
                Total: ₹{getCartTotal().toFixed(2)}
              </span>
              <button
                onClick={clearCart}
                className="text-sm text-red-600 hover:text-red-800 transition-colors"
              >
                Clear Cart
              </button>
            </div>
            <div className="flex gap-4">
              <button
                onClick={toggleCart}
                className="flex-1 border-2 border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                Continue Shopping
              </button>
              <button
                onClick={() => setShowInquiryForm(true)}
                className="flex-1 bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
              >
                Send Inquiry
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartModal;
