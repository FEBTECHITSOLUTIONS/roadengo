import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import CartModal from "../components/CartModal";

const SpareParts = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const { addToCart, getCartItemsCount, isCartOpen, toggleCart } = useCart();

  // Categories and spare parts data (same as before)
  const categories = [
    { id: "all", name: "All Parts", icon: "ri-tools-line" },
    { id: "engine", name: "Engine Parts", icon: "ri-settings-3-line" },
    { id: "electrical", name: "Electrical", icon: "ri-flashlight-line" },
    { id: "brake", name: "Brake System", icon: "ri-forbid-2-line" },
    { id: "body", name: "Body Parts", icon: "ri-shield-line" },
    { id: "wheels", name: "Wheels & Tyres", icon: "ri-tire-line" },
    { id: "accessories", name: "Accessories", icon: "ri-add-box-line" },
  ];

  const spareParts = [
    // Same spare parts array as before
    {
      id: 1,
      name: "Brake Pads",
      category: "brake",
      price: "₹450",
      originalPrice: "₹650",
      image: "/images/brake-pads.jpg",
      brand: "Honda",
      inStock: true,
      rating: 4.5,
      installation: "Free",
    },
    {
      id: 1,
      name: "Brake Pads",
      category: "brake",
      price: "₹850",
      originalPrice: "₹650",
      image: "/images/brake-pads.jpg",
      brand: "Honda",
      inStock: true,
      rating: 4.5,
      installation: "Free",
    },
    // ... rest of the parts
  ];

  const filteredParts = spareParts.filter((part) => {
    const matchesCategory = selectedCategory === "all" || part.category === selectedCategory;
    const matchesSearch = part.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         part.brand.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleAddToCart = (part) => {
    if (part.inStock) {
      addToCart(part);
      // Show success message
      alert(`${part.name} added to cart!`);
    }
  };

  return (
    <div className="bg-gradient-to-br from-red-50 via-white to-pink-50">
      {/* Fixed Cart Button */}
      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={toggleCart}
          className="bg-red-600 hover:bg-red-700 text-white p-4 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110"
        >
          <i className="ri-shopping-cart-line text-xl">Cart</i>
          {getCartItemsCount() > 0 && (
            <span className="absolute -top-2 -right-2 bg-yellow-500 text-black text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
              {getCartItemsCount()}
            </span>
          )}
        </button>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-red-600 to-red-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Genuine <span className="text-red-200">Spare Parts</span>
          </h1>
          <p className="text-xl text-red-100 mb-8 max-w-3xl mx-auto">
            Original equipment quality parts for all bike models with free doorstep installation
          </p>
          
          <div className="max-w-md mx-auto relative">
            <input
              type="text"
              placeholder="Search parts, brand or model..."
              className="w-full px-6 py-4 rounded-full text-gray-900 font-medium text-lg focus:outline-none focus:ring-4 focus:ring-red-300"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="absolute right-2 top-2 bg-red-600 text-white p-3 rounded-full hover:bg-red-700">
              <i className="ri-search-line text-lg"></i>
            </button>
          </div>
        </div>
      </section>

      {/* Categories Filter */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap gap-4 justify-center">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  selectedCategory === category.id
                    ? "bg-red-600 text-white shadow-lg"
                    : "bg-gray-100 text-gray-700 hover:bg-red-50 hover:text-red-600"
                }`}
              >
                <i className={`${category.icon} text-lg`}></i>
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Parts Grid */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            {selectedCategory === "all" ? "All Spare Parts" : `${categories.find(c => c.id === selectedCategory)?.name}`}
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredParts.map((part) => (
              <div key={part.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                {/* Part Image */}
                <div className="relative h-48 bg-gray-100">
                  <img
                    src={part.image}
                    alt={part.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = `httpss://via.placeholder.com/300x200/f3f4f6/374151?text=${encodeURIComponent(part.name)}`;
                    }}
                  />
                  {!part.inStock && (
                    <div className="absolute top-2 left-2 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      Out of Stock
                    </div>
                  )}
                  {part.originalPrice && (
                    <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded text-sm font-semibold">
                      {Math.round(((parseInt(part.originalPrice.slice(1)) - parseInt(part.price.slice(1))) / parseInt(part.originalPrice.slice(1))) * 100)}% OFF
                    </div>
                  )}
                </div>

                {/* Part Details */}
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-gray-900">{part.name}</h3>
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                      {part.brand}
                    </span>
                  </div>
                  
                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className={`text-sm ${
                          i < Math.floor(part.rating) ? "text-yellow-400" : "text-gray-300"
                        }`}
                      >
                        ★
                      </span>
                    ))}
                    <span className="text-sm text-gray-600 ml-1">({part.rating})</span>
                  </div>

                  {/* Price */}
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-2xl font-bold text-red-600">{part.price}</span>
                    {part.originalPrice && (
                      <span className="text-sm text-gray-500 line-through">
                        {part.originalPrice}
                      </span>
                    )}
                  </div>

                  {/* Installation */}
                  <div className="flex items-center gap-2 mb-4">
                    <i className="ri-tools-line text-red-600"></i>
                    <span className="text-sm text-gray-600">
                      Installation: {part.installation === "Free" ? 
                        <span className="text-green-600 font-semibold">Free</span> : 
                        <span className="font-semibold">{part.installation}</span>
                      }
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-2">
                    <button 
                      disabled={!part.inStock}
                      onClick={() => handleAddToCart(part)}
                      className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                        part.inStock
                          ? "bg-red-600 hover:bg-red-700 text-white"
                          : "bg-gray-200 text-gray-500 cursor-not-allowed"
                      }`}
                    >
                      {part.inStock ? "Add to Cart" : "Out of Stock"}
                    </button>
                    <button className="w-full border-2 border-red-600 text-red-600 hover:bg-red-50 py-3 rounded-lg font-semibold transition-colors">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cart Modal */}
      {isCartOpen && <CartModal />}

      {/* Rest of the sections remain the same */}
      {/* ... */}
    </div>
  );
};

export default SpareParts;
