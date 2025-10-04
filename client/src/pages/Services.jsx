import React, { useState } from "react";

const Services = () => {
  const [activeTab, setActiveTab] = useState("regular");

  return (
    <div className="bg-gradient-to-br from-red-50 via-white to-pink-50">
      {/* Section 1: Hero Services */}
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 via-white to-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <div className="text-center mb-12 sm:mb-16">
            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Professional <span className="text-red-600">Bike Services</span>
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-4xl mx-auto mb-8 leading-relaxed">
              Comprehensive two-wheeler care at your doorstep. From routine maintenance to emergency repairs, 
              we provide expert solutions for all bike brands and models.
            </p>
          </div>

          {/* Service Categories */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {[
              { 
                title: "Regular Service", 
                icon: "🔧", 
                desc: "Periodic maintenance & health checkup",
                price: "₹399 onwards",
                color: "red"
              },
              { 
                title: "Emergency Repair", 
                icon: "🚨", 
                desc: "24/7 roadside assistance & breakdown",
                price: "₹250 onwards", 
                color: "orange"
              },
              { 
                title: "Engine Care", 
                icon: "⚙️", 
                desc: "Complete engine overhaul & diagnostics",
                price: "₹850 onwards",
                color: "blue"
              },
              { 
                title: "Specialized Care", 
                icon: "🏍️", 
                desc: "Sports bike & premium motorcycle service",
                price: "₹599 onwards",
                color: "purple"
              },
            ].map((service, i) => (
              <div
                key={i}
                className={`bg-gradient-to-br from-${service.color}-50 to-white p-6 sm:p-8 rounded-2xl border border-${service.color}-100 hover:shadow-xl transition-all duration-300 transform hover:scale-105 text-center`}
              >
                <div className={`w-16 h-16 sm:w-20 sm:h-20 bg-${service.color}-600 rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                  <span className="text-white text-2xl sm:text-3xl">{service.icon}</span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600 text-sm sm:text-base mb-4 leading-relaxed">{service.desc}</p>
                <div className={`text-${service.color}-600 font-bold text-lg`}>{service.price}</div>
              </div>
            ))}
          </div>

          {/* Quick Stats */}
          <div className="mt-16 bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-100">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 text-center">
              {[
                { number: "15min", text: "Response Time" },
                { number: "All Brands", text: "Supported" },
                { number: "Genuine Parts", text: "Only" },
                { number: "10 Days", text: "Warranty" },
              ].map((stat, i) => (
                <div key={i}>
                  <div className="text-xl sm:text-2xl font-bold text-red-600 mb-1">{stat.number}</div>
                  <div className="text-gray-600 text-sm sm:text-base">{stat.text}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Service Packages */}
      <section className="min-h-screen bg-white flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Service <span className="text-red-600">Packages</span>
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto">
              Choose from our comprehensive service packages designed for different bike categories
            </p>
          </div>

          {/* Package Tabs */}
          <div className="flex flex-wrap justify-center mb-12 gap-2">
            {[
              { id: "regular", label: "Regular Service" },
              { id: "premium", label: "Premium Care" },
              { id: "emergency", label: "Emergency" },
              { id: "annual", label: "AMC Package" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                  activeTab === tab.id
                    ? "bg-red-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Package Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {activeTab === "regular" && (
              <>
                {[
                  {
                    title: "Basic Service (100-180cc)",
                    price: "₹399",
                    duration: "45-60 minutes",
                    image: "/images/basic-service.jpg",
                    features: [
                      "Air Filter Cleaning",
                      "Spark Plug Cleaning",
                      "Chain Lubrication",
                      "Brake Check & Adjustment",
                      "Tyre Pressure Check",
                      "Complete Bike Wash",
                      "Nut & Bolt Tightening",
                      "Minor Adjustments"
                    ]
                  },
                  {
                    title: "Standard Service (Above 180cc)",
                    price: "₹499",
                    duration: "60-90 minutes", 
                    image: "/images/standard-service.jpg",
                    features: [
                      "All Basic Service Items",
                      "Carburetor Cleaning",
                      "Clutch Cable Adjustment",
                      "Accelerator Cable Check",
                      "Disc Brake Oil Top-up",
                      "Mirror Adjustment",
                      "Complete Diagnostics",
                      "Service Report"
                    ]
                  },
                  {
                    title: "Royal Enfield Service",
                    price: "₹599",
                    duration: "90-120 minutes",
                    image: "/images/royal-enfield-service.jpg",
                    features: [
                      "All Standard Service Items",
                      "Engine Oil Check/Change",
                      "Advanced Diagnostics",
                      "Electrical System Check",
                      "Chrome Care & Polishing",
                      "Specialized RE Tools",
                      "Expert RE Mechanic",
                      "Extended Warranty"
                    ]
                  }
                ].map((pkg, i) => (
                  <div key={i} className="bg-gradient-to-br from-gray-50 to-white p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
                    <img src={pkg.image} alt={pkg.title} className="w-full h-32 sm:h-40 object-cover rounded-xl mb-6" />
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">{pkg.title}</h3>
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-2xl font-bold text-red-600">{pkg.price}</div>
                      <div className="text-gray-600 text-sm">{pkg.duration}</div>
                    </div>
                    <div className="space-y-2">
                      {pkg.features.map((feature, j) => (
                        <div key={j} className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-gray-700 text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                    <button className="w-full mt-6 bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors">
                      Book Now
                    </button>
                  </div>
                ))}
              </>
            )}

            {activeTab === "premium" && (
              <>
                {[
                  {
                    title: "Premium Care Package",
                    price: "₹899",
                    duration: "2-3 hours",
                    image: "/images/premium-care.jpg",
                    features: [
                      "Complete Service Checklist",
                      "Engine Oil Change (Included)",
                      "Advanced Diagnostics",
                      "Performance Tuning",
                      "Premium Wash & Polish",
                      "Electrical System Check",
                      "Suspension Check",
                      "30 Days Warranty"
                    ]
                  },
                  {
                    title: "Sports Bike Specialized",
                    price: "₹1299",
                    duration: "3-4 hours",
                    image: "/images/sports-bike-service.jpg",
                    features: [
                      "All Premium Care Items",
                      "Performance Optimization",
                      "Racing Grade Tools",
                      "Specialized Sports Parts",
                      "Track-Ready Setup",
                      "Expert Sports Mechanic",
                      "Dyno Performance Report",
                      "45 Days Warranty"
                    ]
                  },
                  {
                    title: "Complete Overhaul",
                    price: "₹1899",
                    duration: "4-6 hours",
                    image: "/images/complete-overhaul.jpg",
                    features: [
                      "Full Engine Overhaul",
                      "All Parts Inspection",
                      "Complete Rebuild",
                      "New Gaskets & Seals",
                      "Performance Enhancement",
                      "Quality Assurance",
                      "Detailed Report",
                      "60 Days Warranty"
                    ]
                  }
                ].map((pkg, i) => (
                  <div key={i} className="bg-gradient-to-br from-blue-50 to-white p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-blue-100">
                    <img src={pkg.image} alt={pkg.title} className="w-full h-32 sm:h-40 object-cover rounded-xl mb-6" />
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">{pkg.title}</h3>
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-2xl font-bold text-blue-600">{pkg.price}</div>
                      <div className="text-gray-600 text-sm">{pkg.duration}</div>
                    </div>
                    <div className="space-y-2">
                      {pkg.features.map((feature, j) => (
                        <div key={j} className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <span className="text-gray-700 text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                    <button className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                      Book Now
                    </button>
                  </div>
                ))}
              </>
            )}

            {activeTab === "emergency" && (
              <>
                {[
                  {
                    title: "Roadside Assistance",
                    price: "₹250",
                    duration: "15-30 minutes",
                    image: "/images/roadside-assistance.jpg",
                    features: [
                      "24/7 Available",
                      "Quick Response",
                      "Basic Troubleshooting",
                      "Jump Start Service",
                      "Fuel Delivery",
                      "Minor Repairs",
                      "Emergency Towing",
                      "Expert Guidance"
                    ]
                  },
                  {
                    title: "Breakdown Service",
                    price: "₹450",
                    duration: "30-60 minutes",
                    image: "/images/breakdown-service.jpg",
                    features: [
                      "All Roadside Items",
                      "Advanced Diagnostics",
                      "On-spot Repairs",
                      "Spare Parts Available",
                      "Battery Replacement",
                      "Electrical Fixes",
                      "Brake Adjustments",
                      "Safety Priority"
                    ]
                  },
                  {
                    title: "Accident Recovery",
                    price: "₹899",
                    duration: "1-2 hours",
                    image: "/images/accident-recovery.jpg",
                    features: [
                      "Accident Site Service",
                      "Damage Assessment",
                      "Insurance Support",
                      "Towing Service",
                      "Emergency Repairs",
                      "Documentation Help",
                      "Recovery Assistance",
                      "Insurance Claim"
                    ]
                  }
                ].map((pkg, i) => (
                  <div key={i} className="bg-gradient-to-br from-orange-50 to-white p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-orange-100">
                    <img src={pkg.image} alt={pkg.title} className="w-full h-32 sm:h-40 object-cover rounded-xl mb-6" />
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">{pkg.title}</h3>
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-2xl font-bold text-orange-600">{pkg.price}</div>
                      <div className="text-gray-600 text-sm">{pkg.duration}</div>
                    </div>
                    <div className="space-y-2">
                      {pkg.features.map((feature, j) => (
                        <div key={j} className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                          <span className="text-gray-700 text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                    <button className="w-full mt-6 bg-orange-600 text-white py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors">
                      Call Emergency
                    </button>
                  </div>
                ))}
              </>
            )}

            {activeTab === "annual" && (
              <>
                {[
                  {
                    title: "Basic AMC",
                    price: "₹2999/year",
                    duration: "4 Services",
                    image: "/images/basic-amc.jpg",
                    features: [
                      "4 Regular Services",
                      "Free Pickup & Drop",
                      "Priority Booking",
                      "Discounted Repairs",
                      "24/7 Support",
                      "Genuine Parts",
                      "Service Records",
                      "Cost Savings 30%"
                    ]
                  },
                  {
                    title: "Premium AMC",
                    price: "₹4999/year",
                    duration: "6 Services",
                    image: "/images/premium-amc.jpg",
                    features: [
                      "6 Premium Services",
                      "Engine Oil Included",
                      "Free Emergency Calls",
                      "Performance Reports",
                      "VIP Treatment",
                      "Extended Warranty",
                      "Insurance Support",
                      "Cost Savings 40%"
                    ]
                  },
                  {
                    title: "Complete Care AMC",
                    price: "₹7999/year",
                    duration: "Unlimited",
                    image: "/images/complete-amc.jpg",
                    features: [
                      "Unlimited Services",
                      "All Consumables Free",
                      "Accident Coverage",
                      "Premium Support",
                      "Dedicated Mechanic",
                      "Annual Health Report",
                      "Insurance Renewal",
                      "Cost Savings 50%"
                    ]
                  }
                ].map((pkg, i) => (
                  <div key={i} className="bg-gradient-to-br from-green-50 to-white p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-green-100">
                    <img src={pkg.image} alt={pkg.title} className="w-full h-32 sm:h-40 object-cover rounded-xl mb-6" />
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">{pkg.title}</h3>
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-2xl font-bold text-green-600">{pkg.price}</div>
                      <div className="text-gray-600 text-sm">{pkg.duration}</div>
                    </div>
                    <div className="space-y-2">
                      {pkg.features.map((feature, j) => (
                        <div key={j} className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-gray-700 text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                    <button className="w-full mt-6 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors">
                      Subscribe Now
                    </button>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      </section>

      {/* Section 3: Detailed Service List */}
      <section className="min-h-screen bg-gradient-to-r from-red-600 to-red-700 text-white flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              Complete Service <span className="text-red-200">Checklist</span>
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-red-100 max-w-3xl mx-auto">
              Every bike service includes these comprehensive checks and maintenance items
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                category: "Engine Care",
                icon: "⚙️",
                items: [
                  "Engine Oil Check/Change",
                  "Air Filter Cleaning",
                  "Spark Plug Inspection",
                  "Carburetor Cleaning",
                  "Engine Diagnostics",
                  "Performance Testing"
                ]
              },
              {
                category: "Braking System", 
                icon: "🛑",
                items: [
                  "Brake Pad/Shoe Check",
                  "Brake Oil Top-up",
                  "Disc Brake Cleaning",
                  "Brake Cable Adjustment",
                  "Master Cylinder Check",
                  "Safety Testing"
                ]
              },
              {
                category: "Drive System",
                icon: "⛓️",
                items: [
                  "Chain Lubrication",
                  "Sprocket Inspection",
                  "Chain Tension Adjust",
                  "Clutch Cable Setting",
                  "Gear Operation Check",
                  "Drive Performance"
                ]
              },
              {
                category: "Electrical System",
                icon: "⚡",
                items: [
                  "Battery Check/Charge",
                  "Light System Check",
                  "Horn Testing",
                  "Indicator Function",
                  "Wiring Inspection",
                  "Charging System"
                ]
              },
              {
                category: "Suspension & Steering",
                icon: "🔧",
                items: [
                  "Front Fork Inspection",
                  "Rear Shock Check",
                  "Steering Bearing",
                  "Wheel Alignment",
                  "Handle Adjustment",
                  "Stability Testing"
                ]
              },
              {
                category: "General Maintenance",
                icon: "🧽",
                items: [
                  "Tyre Pressure Check",
                  "Complete Bike Wash",
                  "Nut Bolt Tightening",
                  "Mirror Adjustment",
                  "Speedometer Check",
                  "Overall Inspection"
                ]
              }
            ].map((service, i) => (
              <div key={i} className="bg-white/10 p-6 sm:p-8 rounded-2xl backdrop-blur-lg">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mr-4">
                    <span className="text-2xl">{service.icon}</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold">{service.category}</h3>
                </div>
                <div className="space-y-3">
                  {service.items.map((item, j) => (
                    <div key={j} className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-red-200 rounded-full"></div>
                      <span className="text-red-100 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: Supported Brands */}
      <section className="min-h-screen bg-white flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Supported <span className="text-red-600">Brands</span>
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto">
              We service all major motorcycle and scooter brands with expertise and genuine parts
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 sm:gap-8 mb-16">
            {[
              { name: "Honda", logo: "/images/honda-logo.jpg", models: "50+ Models" },
              { name: "Hero", logo: "/images/hero-logo.jpg", models: "40+ Models" },
              { name: "Bajaj", logo: "/images/bajaj-logo.jpg", models: "35+ Models" },
              { name: "TVS", logo: "/images/tvs-logo.jpg", models: "30+ Models" },
              { name: "Yamaha", logo: "/images/yamaha-logo.jpg", models: "25+ Models" },
              { name: "Suzuki", logo: "/images/suzuki-logo.jpg", models: "20+ Models" },
              { name: "Royal Enfield", logo: "/images/re-logo.jpg", models: "15+ Models" },
              { name: "KTM", logo: "/images/ktm-logo.jpg", models: "12+ Models" },
              { name: "Vespa", logo: "/images/vespa-logo.jpg", models: "10+ Models" },
              { name: "Aprilia", logo: "/images/aprilia-logo.jpg", models: "8+ Models" },
              { name: "Ducati", logo: "/images/ducati-logo.jpg", models: "5+ Models" },
              { name: "Kawasaki", logo: "/images/kawasaki-logo.jpg", models: "5+ Models" },
            ].map((brand, i) => (
              <div key={i} className="bg-gradient-to-br from-gray-50 to-white p-4 sm:p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-center border border-gray-100">
                <img src={brand.logo} alt={brand.name} className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-3 object-contain" />
                <h3 className="font-bold text-gray-900 mb-1">{brand.name}</h3>
                <p className="text-gray-600 text-xs sm:text-sm">{brand.models}</p>
              </div>
            ))}
          </div>

          {/* Special Features */}
          <div className="bg-gradient-to-r from-red-50 to-pink-50 p-8 sm:p-12 rounded-2xl">
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 text-center">
              Why Choose Our <span className="text-red-600">Services?</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {[
                { icon: "🎯", title: "Expert Mechanics", desc: "Certified professionals for all brands" },
                { icon: "🔧", title: "Genuine Parts", desc: "Original manufacturer parts only" },
                { icon: "📱", title: "Digital Reports", desc: "Complete service report via app" },
                { icon: "🛡️", title: "Service Warranty", desc: "10-day guarantee on all work" },
              ].map((feature, i) => (
                <div key={i} className="text-center">
                  <div className="w-16 h-16 bg-red-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">{feature.icon}</span>
                  </div>
                  <h4 className="font-bold text-gray-900 mb-2">{feature.title}</h4>
                  <p className="text-gray-600 text-sm">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Service Areas & Availability */}
      <section className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Service Areas & <span className="text-red-600">Availability</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8">We Service Across</h3>
              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  { city: "Mumbai", areas: "15+ Areas", available: true },
                  { city: "Delhi NCR", areas: "12+ Areas", available: true },
                  { city: "Bangalore", areas: "10+ Areas", available: true },
                  { city: "Pune", areas: "8+ Areas", available: true },
                  { city: "Hyderabad", areas: "6+ Areas", available: true },
                  { city: "Chennai", areas: "5+ Areas", available: true },
                  { city: "Kolkata", areas: "Coming Soon", available: false },
                  { city: "Ahmedabad", areas: "Coming Soon", available: false },
                ].map((location, i) => (
                  <div key={i} className={`p-4 rounded-xl ${location.available ? 'bg-green-50 border border-green-200' : 'bg-gray-50 border border-gray-200'}`}>
                    <h4 className="font-bold text-gray-900 mb-1">{location.city}</h4>
                    <p className={`text-sm ${location.available ? 'text-green-600' : 'text-gray-500'}`}>
                      {location.areas}
                    </p>
                  </div>
                ))}
              </div>

              <div className="bg-red-600 text-white p-6 rounded-xl">
                <h4 className="font-bold text-lg mb-2">24/7 Emergency Service</h4>
                <p className="text-red-100 text-sm mb-4">Available in all service areas for breakdowns and accidents</p>
                <div className="text-2xl font-bold">+91 9876543210</div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Service Hours</h3>
                <div className="space-y-4">
                  {[
                    { service: "Regular Service", time: "8:00 AM - 8:00 PM", days: "Mon - Sat" },
                    { service: "Emergency Service", time: "24/7 Available", days: "All Days" },
                    { service: "Pickup & Drop", time: "9:00 AM - 7:00 PM", days: "Mon - Sun" },
                    { service: "Customer Support", time: "8:00 AM - 10:00 PM", days: "All Days" },
                  ].map((schedule, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-semibold text-gray-900">{schedule.service}</h4>
                        <p className="text-gray-600 text-sm">{schedule.days}</p>
                      </div>
                      <div className="text-red-600 font-semibold text-sm">
                        {schedule.time}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 sm:p-8 rounded-2xl">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Booking Options</h3>
                <div className="space-y-3">
                  {[
                    { method: "📱 Mobile App", desc: "Download our app for quick booking" },
                    { method: "💻 Website", desc: "Book online at our website" },
                    { method: "📞 Phone Call", desc: "Call +91 9876543210 to book" },
                    { method: "💬 WhatsApp", desc: "Message us on WhatsApp" },
                  ].map((option, i) => (
                    <div key={i} className="flex items-center space-x-3">
                      <span className="text-lg">{option.method.split(' ')[0]}</span>
                      <div>
                        <span className="font-semibold text-gray-900">{option.method.split(' ').slice(1).join(' ')}</span>
                        <p className="text-gray-600 text-sm">{option.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: Pricing & Payment */}
      <section className="min-h-screen bg-white flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Transparent <span className="text-red-600">Pricing</span>
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto">
              No hidden charges, upfront pricing for all services. Pay only for what you need.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Pricing Table */}
            <div className="bg-gradient-to-br from-gray-50 to-white p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Service Pricing Guide</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 font-semibold text-gray-900">Service Type</th>
                      <th className="text-center py-3 font-semibold text-gray-900">100-180cc</th>
                      <th className="text-center py-3 font-semibold text-gray-900">Above 180cc</th>
                    </tr>
                  </thead>
                  <tbody className="space-y-2">
                    {[
                      { service: "Regular Service", small: "₹399", large: "₹499" },
                      { service: "Oil Change", small: "₹150", large: "₹200" },
                      { service: "Brake Service", small: "₹100", large: "₹150" },
                      { service: "Chain Service", small: "₹80", large: "₹120" },
                      { service: "Battery Service", small: "₹100", large: "₹150" },
                      { service: "Tire Service", small: "₹120", large: "₹180" },
                      { service: "Emergency Visit", small: "₹250", large: "₹250" },
                    ].map((item, i) => (
                      <tr key={i} className="border-b border-gray-100">
                        <td className="py-3 text-gray-700">{item.service}</td>
                        <td className="py-3 text-center font-semibold text-red-600">{item.small}</td>
                        <td className="py-3 text-center font-semibold text-red-600">{item.large}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-gray-500 mt-4">*Prices exclude engine oil and spare parts</p>
            </div>

            {/* Payment Options */}
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-green-50 to-green-100 p-6 sm:p-8 rounded-2xl">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Payment Methods</h3>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { method: "💳 Credit Card", available: true },
                    { method: "💰 Debit Card", available: true },
                    { method: "📱 UPI Payment", available: true },
                    { method: "💸 Digital Wallet", available: true },
                    { method: "💵 Cash Payment", available: true },
                    { method: "🏦 Net Banking", available: true },
                  ].map((payment, i) => (
                    <div key={i} className="flex items-center space-x-2 p-3 bg-white rounded-lg">
                      <span className="text-lg">{payment.method.split(' ')[0]}</span>
                      <span className="text-gray-900 font-medium">{payment.method.split(' ').slice(1).join(' ')}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 sm:p-8 rounded-2xl">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Cost Saving Tips</h3>
                <div className="space-y-3">
                  {[
                    { tip: "Book AMC Package", savings: "Save up to 40%" },
                    { tip: "Regular Maintenance", savings: "Avoid costly repairs" },
                    { tip: "Group Services", savings: "Bundle discount 15%" },
                    { tip: "Referral Program", savings: "Get ₹200 cashback" },
                  ].map((tip, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-white rounded-lg">
                      <span className="text-gray-900">{tip.tip}</span>
                      <span className="text-green-600 font-semibold text-sm">{tip.savings}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-red-600 text-white p-6 rounded-xl">
                <h3 className="text-xl font-bold mb-4">Special Offers</h3>
                <div className="space-y-2">
                  <p className="text-red-100">🎉 First Service: 20% OFF</p>
                  <p className="text-red-100">🔄 Refer Friends: ₹200 cashback</p>
                  <p className="text-red-100">📅 Monthly AMC: 30% savings</p>
                  <p className="text-red-100">⚡ Emergency Free: Above ₹500 service</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 7: Quality Assurance */}
      <section className="min-h-screen bg-gradient-to-r from-gray-900 to-black text-white flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              Quality <span className="text-red-400">Assurance</span>
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto">
              Your bike's safety and performance are our top priorities with guaranteed quality service
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {[
              {
                title: "10 Days Warranty",
                icon: "🛡️",
                desc: "All services covered with comprehensive warranty",
                features: ["Service guarantee", "Parts warranty", "Labor warranty", "No cost revision"]
              },
              {
                title: "Certified Mechanics",
                icon: "👨‍🔧", 
                desc: "Expert technicians with proper training and certification",
                features: ["Brand certified", "5+ years experience", "Continuous training", "Background verified"]
              },
              {
                title: "Genuine Parts Only",
                icon: "⚙️",
                desc: "Original manufacturer parts for all repairs and replacements",
                features: ["OEM parts", "Authorized dealers", "Quality tested", "Full authenticity"]
              },
            ].map((quality, i) => (
              <div key={i} className="bg-white/10 p-6 sm:p-8 rounded-2xl backdrop-blur-lg">
                <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl">{quality.icon}</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold mb-4 text-center">{quality.title}</h3>
                <p className="text-gray-300 text-center mb-6 leading-relaxed">{quality.desc}</p>
                <div className="space-y-2">
                  {quality.features.map((feature, j) => (
                    <div key={j} className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Quality Metrics */}
          <div className="bg-white/10 p-8 sm:p-12 rounded-2xl backdrop-blur-lg">
            <h3 className="text-2xl sm:text-3xl font-bold mb-8 text-center">Our Quality Metrics</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8">
              {[
                { number: "99.5%", text: "Service Success Rate" },
                { number: "4.9/5", text: "Average Rating" },
                { number: "<0.1%", text: "Complaint Rate" },
                { number: "100%", text: "Satisfaction Guarantee" },
              ].map((metric, i) => (
                <div key={i} className="text-center">
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-red-400 mb-2">
                    {metric.number}
                  </div>
                  <div className="text-gray-300 text-sm sm:text-base">
                    {metric.text}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section 8: Book Service CTA */}
      <section className="min-h-screen bg-gradient-to-br from-red-50 via-white to-pink-50 flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Ready to Book Your <span className="text-red-600">Service?</span>
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Get professional bike service at your doorstep. Quick, convenient, and reliable.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Quick Booking */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Quick Service Booking</h3>
              <form className="space-y-4">
                <div>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500">
                    <option value="">Select Service Type</option>
                    <option value="regular">Regular Service</option>
                    <option value="emergency">Emergency Repair</option>
                    <option value="premium">Premium Care</option>
                    <option value="amc">AMC Package</option>
                  </select>
                </div>
                <div>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500">
                    <option value="">Select Bike Brand</option>
                    <option value="honda">Honda</option>
                    <option value="hero">Hero</option>
                    <option value="bajaj">Bajaj</option>
                    <option value="tvs">TVS</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <input
                    type="tel"
                    placeholder="Your Phone Number"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Your Location"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
                  />
                </div>
                <button className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors">
                  Book Service Now
                </button>
              </form>
            </div>

            {/* Contact Options */}
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-red-600 to-red-700 text-white p-6 sm:p-8 rounded-2xl">
                <h3 className="text-2xl font-bold mb-6">Emergency? Call Now!</h3>
                <div className="text-3xl sm:text-4xl font-bold mb-4">+91 9876543210</div>
                <p className="text-red-100 mb-6">24/7 available for breakdowns and emergencies</p>
                <button className="bg-white text-red-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                  Call Emergency
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { platform: "WhatsApp", icon: "💬", action: "Chat with us" },
                  { platform: "Mobile App", icon: "📱", action: "Download app" },
                  { platform: "Email", icon: "📧", action: "Send inquiry" },
                  { platform: "Live Chat", icon: "💭", action: "Start chat" },
                ].map((contact, i) => (
                  <div key={i} className="bg-white p-4 rounded-xl shadow-lg border border-gray-100 text-center hover:shadow-xl transition-all duration-300">
                    <div className="text-2xl mb-2">{contact.icon}</div>
                    <h4 className="font-bold text-gray-900 mb-1">{contact.platform}</h4>
                    <p className="text-gray-600 text-sm">{contact.action}</p>
                  </div>
                ))}
              </div>

              <div className="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-xl">
                <h4 className="font-bold text-gray-900 mb-4">Why Book With Us?</h4>
                <div className="space-y-2">
                  {[
                    "✅ 15 minute response time",
                    "✅ Transparent pricing",
                    "✅ 10 days service warranty",
                    "✅ Genuine parts only",
                    "✅ Expert certified mechanics"
                  ].map((benefit, i) => (
                    <p key={i} className="text-gray-700 text-sm">{benefit}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
