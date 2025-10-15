import React, { useState } from "react";
import DoorstepService from "./DoorstepService";
import EmergencyAssistance from "./EmergencyAssistance";

const Booking = () => {
  const [selectedService, setSelectedService] = useState(null);

  const services = [
    {
      type: "Emergency Assistance",
      icon: "🚨",
      description: "24/7 roadside breakdown support",
      subText: "Immediate help • 15 mins response • Available 24/7",
      color: "red",
      features: ["Instant response", "Roadside repair", "GPS tracking"],
    },
    {
      type: "Doorstep Service",
      icon: "🏠",
      description: "Regular maintenance at your location",
      subText: "Schedule service • 45-90 mins • Advance booking",
      color: "blue",
      features: ["Scheduled service", "Complete maintenance", "Expert mechanics"],
    },
  ];

  if (selectedService === "Doorstep Service") {
    return <DoorstepService onBack={() => setSelectedService(null)} />;
  }

  if (selectedService === "Emergency Assistance") {
    return <EmergencyAssistance onBack={() => setSelectedService(null)} />;
  }

  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-red-50 min-h-screen">
      {/* Mobile-optimized container */}
      <div className="px-4 py-6 sm:px-6 sm:py-8 md:px-8 lg:container lg:mx-auto">
        
        {/* Hero Section - Mobile Optimized */}
        <div className="text-center mb-8">
          <div className="text-4xl mb-4">🔧⚡</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-3 leading-tight sm:text-3xl lg:text-4xl">
            Book Your <span className="text-blue-600">Bike Service</span>
          </h1>
          <p className="text-sm text-gray-600 leading-relaxed sm:text-base lg:text-lg lg:max-w-2xl lg:mx-auto">
            Professional doorstep service and emergency assistance. Quick response guaranteed.
          </p>
        </div>

        {/* Service Selection - Mobile First */}
        <div className="mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-6 text-center sm:text-xl">
            Choose Your Service Type
          </h2>
          
          {/* Mobile: Full width cards with better spacing */}
          <div className="space-y-4 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-6 lg:max-w-4xl lg:mx-auto">
            {services.map((service, index) => (
              <div
                key={index}
                onClick={() => setSelectedService(service.type)}
                className="bg-white p-5 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-100 hover:border-blue-300 active:scale-[0.98]"
              >
                {/* Mobile-first layout */}
                <div className="text-center mb-4">
                  <div className="text-4xl mb-3">{service.icon}</div>
                  <h3 className={`text-xl font-bold mb-2 ${
                    service.color === "blue" ? "text-blue-600" : "text-red-600"
                  }`}>
                    {service.type}
                  </h3>
                  <p className="text-gray-600 text-sm mb-2 leading-relaxed">
                    {service.description}
                  </p>
                  <p className="text-xs text-gray-500 mb-4">
                    {service.subText}
                  </p>
                </div>

                {/* Features - Mobile optimized */}
                <div className="space-y-2 mb-5">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="text-sm text-gray-600 flex items-center justify-center">
                      <span className="text-green-500 mr-2 text-base">✓</span>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Large touch-friendly button */}
                <button className={`w-full ${
                  service.color === "blue"
                    ? "bg-blue-600 hover:bg-blue-700 active:bg-blue-800"
                    : "bg-red-600 hover:bg-red-700 active:bg-red-800"
                } text-white py-4 px-6 rounded-xl font-semibold transition-all transform active:scale-95 text-base shadow-md`}>
                  Select {service.type.split(" ")[0]}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Emergency Contact - Mobile Optimized */}
        <div className="bg-gradient-to-r from-red-500 to-red-600 text-white p-6 rounded-2xl text-center shadow-xl mb-8">
          <div className="text-3xl mb-3">🚨</div>
          <h3 className="text-xl font-bold mb-2">Emergency Hotline</h3>
          <div className="text-2xl font-bold mb-2 tracking-wide">+91 9876543210</div>
          <p className="text-red-100 text-sm mb-4 opacity-90">
            24/7 immediate roadside assistance
          </p>
          <a
            href="tel:+919876543210"
            className="inline-flex items-center justify-center bg-white text-red-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 active:bg-gray-200 transition-all transform active:scale-95 text-base shadow-md w-full sm:w-auto"
          >
            <span className="text-lg mr-2">📞</span>
            Call Now
          </a>
        </div>

        {/* How it Works - Mobile Simplified */}
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <h3 className="text-lg font-bold text-gray-900 mb-6 text-center">
            How It Works
          </h3>
          
          {/* Mobile: Vertical flow, Desktop: Horizontal */}
          <div className="space-y-6 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-6">
            {[
              { step: "1", title: "Book Service", desc: "Select service type", icon: "📱" },
              { step: "2", title: "We Reach You", desc: "Mechanic arrives", icon: "🏍️" },
              { step: "3", title: "Service Done", desc: "Pay after service", icon: "✅" }
            ].map((item, index) => (
              <div key={index} className="flex items-center sm:flex-col sm:text-center">
                {/* Mobile: Side by side, Desktop: Stacked */}
                <div className="flex-shrink-0 mr-4 sm:mr-0 sm:mb-3">
                  <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-lg font-bold shadow-md">
                    {item.step}
                  </div>
                </div>
                <div className="flex-1 sm:flex-none">
                  <div className="text-base font-semibold text-gray-900 mb-1">
                    {item.title}
                  </div>
                  <div className="text-sm text-gray-600">
                    {item.desc}
                  </div>
                </div>
                {/* Mobile connector line */}
                {index < 2 && (
                  <div className="hidden sm:block absolute left-1/2 transform -translate-x-1/2 w-px h-8 bg-gray-300 mt-16"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
