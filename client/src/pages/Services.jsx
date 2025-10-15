// pages/Services.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Services = () => {
  const services = [
    {
      category: "Doorstep Services",
      description: "Professional bike service at your location",
      services: [
        {
          name: "General Service",
          description: "Complete bike checkup and maintenance",
          price: "₹499",
          duration: "45-60 mins",
          includes: ["Engine Oil Change", "Chain Cleaning", "Brake Check", "Basic Tune-up"]
        },
        {
          name: "Oil Change",
          description: "Premium quality engine oil replacement",
          price: "₹299",
          duration: "20-30 mins",
          includes: ["Engine Oil Drain", "New Oil Fill", "Oil Filter Check", "Engine Check"]
        },
        {
          name: "Brake Service",
          description: "Complete brake system inspection and service",
          price: "₹399",
          duration: "30-45 mins",
          includes: ["Brake Pad Check", "Brake Fluid Check", "Brake Cable Adjustment", "Safety Test"]
        },
        {
          name: "Chain Service",
          description: "Chain cleaning, lubrication and adjustment",
          price: "₹199",
          duration: "15-20 mins",
          includes: ["Chain Cleaning", "Chain Lubrication", "Chain Tension Check", "Sprocket Inspection"]
        }
      ]
    },
    {
      category: "Emergency Services",
      description: "24/7 roadside assistance for breakdowns",
      services: [
        {
          name: "Emergency Repair",
          description: "On-spot breakdown assistance",
          price: "₹199",
          duration: "30-60 mins",
          includes: ["Diagnosis", "Basic Repair", "Emergency Fix", "Towing (if needed)"]
        },
        {
          name: "Battery Service",
          description: "Battery jump start and replacement",
          price: "₹149",
          duration: "15-30 mins",
          includes: ["Battery Check", "Jump Start", "Battery Replacement", "Connection Check"]
        },
        {
          name: "Tire Repair",
          description: "Puncture repair and tire service",
          price: "₹99",
          duration: "20-30 mins",
          includes: ["Puncture Repair", "Tire Pressure Check", "Tire Inspection", "Safety Check"]
        },
        {
          name: "Fuel Service",
          description: "Emergency fuel delivery",
          price: "₹299",
          duration: "15-20 mins",
          includes: ["Fuel Delivery", "Tank Check", "Fuel System Check", "Emergency Assistance"]
        }
      ]
    },
    {
      category: "Specialized Services",
      description: "Advanced bike maintenance and repairs",
      services: [
        {
          name: "Complete Overhaul",
          description: "Comprehensive bike restoration",
          price: "₹1999",
          duration: "2-3 hours",
          includes: ["Complete Disassembly", "Part Cleaning", "Part Replacement", "Reassembly & Testing"]
        },
        {
          name: "Engine Service",
          description: "Advanced engine maintenance",
          price: "₹899",
          duration: "60-90 mins",
          includes: ["Engine Diagnosis", "Internal Cleaning", "Part Adjustment", "Performance Test"]
        },
        {
          name: "Electrical Service",
          description: "Complete electrical system check",
          price: "₹599",
          duration: "45-60 mins",
          includes: ["Wiring Check", "Light Service", "Horn Check", "Battery System"]
        },
        {
          name: "Suspension Service",
          description: "Front and rear suspension maintenance",
          price: "₹799",
          duration: "60-75 mins",
          includes: ["Shock Absorber Check", "Fork Oil Change", "Suspension Adjustment", "Ride Test"]
        }
      ]
    }
  ];

  const whyChooseUs = [
    {
      icon: "🏠",
      title: "Doorstep Service",
      description: "We come to your location - home, office, or anywhere in the city"
    },
    {
      icon: "⚡",
      title: "Quick Response",
      description: "15-minute response time for emergency services"
    },
    {
      icon: "🔧",
      title: "Expert Mechanics",
      description: "Certified professionals with years of experience"
    },
    {
      icon: "💯",
      title: "Quality Guarantee",
      description: "100% satisfaction guarantee on all services"
    },
    {
      icon: "💰",
      title: "Transparent Pricing",
      description: "No hidden charges, upfront pricing for all services"
    },
    {
      icon: "🕒",
      title: "24/7 Available",
      description: "Emergency services available round the clock"
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Our <span className="text-blue-200">Services</span>
          </h1>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Professional bike service and maintenance with doorstep convenience and emergency support
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/booking"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Book Service Now
            </Link>
            <a
              href="tel:+919876543210"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
            >
              Emergency: +91 9876543210
            </a>
          </div>
        </div>
      </section>

      {/* Services List */}
      {services.map((category, categoryIndex) => (
        <section key={categoryIndex} className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                {category.category}
              </h2>
              <p className="text-lg text-gray-600">
                {category.description}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {category.services.map((service, serviceIndex) => (
                <div
                  key={serviceIndex}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
                >
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                          {service.name}
                        </h3>
                        <p className="text-gray-600 mb-2">
                          {service.description}
                        </p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span>⏱️ {service.duration}</span>
                          <span className="text-2xl font-bold text-blue-600">
                            {service.price}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 mb-2">Includes:</h4>
                      <ul className="space-y-1">
                        {service.includes.map((item, index) => (
                          <li key={index} className="text-sm text-gray-600 flex items-center">
                            <span className="text-green-500 mr-2">✓</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex gap-3">
                      <Link
                        to="/booking"
                        className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg text-center font-semibold hover:bg-blue-700 transition-colors"
                      >
                        Book Now
                      </Link>
                      <button className="flex-1 border-2 border-blue-600 text-blue-600 py-2 px-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
                        Learn More
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* Why Choose Us */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose Our Services?
            </h2>
            <p className="text-lg text-gray-600">
              We provide the best bike service experience with professional care
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {whyChooseUs.map((feature, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-2xl hover:bg-gray-50 transition-colors"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-lg text-gray-600">
              Simple 4-step process to get your bike serviced
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: "1",
                title: "Book Service",
                description: "Choose your service and book online or call us",
                icon: "📱"
              },
              {
                step: "2",
                title: "Schedule Time",
                description: "Select convenient date and time for service",
                icon: "📅"
              },
              {
                step: "3",
                title: "Mechanic Arrives",
                description: "Our expert mechanic reaches your location",
                icon: "🔧"
              },
              {
                step: "4",
                title: "Service Complete",
                description: "Quality service completed with satisfaction guarantee",
                icon: "✅"
              }
            ].map((step, index) => (
              <div key={index} className="text-center">
                <div className="bg-blue-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {step.step}
                </div>
                <div className="text-4xl mb-4">{step.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Service Your Bike?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Book your service now and get professional care for your bike
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/booking"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Book Service Now
            </Link>
            <a
              href="tel:+919876543210"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
            >
              Call: +91 9876543210
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
