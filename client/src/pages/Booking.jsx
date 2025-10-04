import React, { useState } from "react";
import DoorstepService from "./DoorstepService";
import EmergencyAssistance from "./EmergencyAssistance";

const Booking = () => {
  const [selectedService, setSelectedService] = useState(null);

  const services = [
    {
      type: "Doorstep Service",
      icon: "🏠",
      description: "Regular maintenance at your location",
      color: "blue",
    },
    {
      type: "Emergency Assistance", 
      icon: "🚨",
      description: "24/7 roadside breakdown support",
      color: "red",
    },
  ];

  if (selectedService === "Doorstep Service") {
    return <DoorstepService onBack={() => setSelectedService(null)} />;
  }

  if (selectedService === "Emergency Assistance") {
    return <EmergencyAssistance onBack={() => setSelectedService(null)} />;
  }

  return (
    <div className="bg-gradient-to-br from-red-50 via-white to-pink-50 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Navigation */}
        <div className="flex justify-between items-center mb-8">
          <div className="text-2xl font-bold text-gray-900">
            🏍️ RoadEngo
          </div>
          <a
            href="/admin/login"
            className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-900 transition-colors"
          >
            Admin Login
          </a>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
            Book Your <span className="text-red-600">Bike Service</span>
          </h1>
          <p className="text-lg lg:text-xl text-gray-600 max-w-4xl mx-auto">
            Professional doorstep bike service and emergency roadside
            assistance. Fill the form below and we'll reach you within 15
            minutes.
          </p>
        </div>

        {/* Service Type Selection */}
        <div className="max-w-4xl mx-auto mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Choose Your Service
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((service, index) => (
              <div
                key={index}
                onClick={() => setSelectedService(service.type)}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border-2 hover:border-blue-500 group"
              >
                <div className="text-center">
                  <div className="text-6xl mb-4">{service.icon}</div>
                  <h3 className={`text-2xl font-bold ${service.color === 'blue' ? 'text-blue-600' : 'text-red-600'} mb-3`}>
                    {service.type}
                  </h3>
                  <p className="text-gray-600 mb-6">{service.description}</p>
                  <button className={`${service.color === 'blue' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-red-600 hover:bg-red-700'} text-white px-8 py-3 rounded-lg font-semibold transition-colors group-hover:scale-105 transform`}>
                    Select Service
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="max-w-4xl mx-auto mt-12 bg-red-600 text-white p-8 rounded-2xl text-center">
          <h3 className="text-2xl font-bold mb-4">Need Immediate Help?</h3>
          <div className="text-4xl font-bold mb-4">+91 9876543210</div>
          <p className="text-red-100 mb-6">
            Call our 24/7 emergency hotline for immediate roadside assistance
          </p>
          <a
            href="tel:+919876543210"
            className="bg-white text-red-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-block"
          >
            Call Emergency Now
          </a>
        </div>
      </div>
    </div>
  );
};

export default Booking;
