import React from "react";
import Hero from "../components/Hero";

const Home = () => {
  const services = [
    {
      icon: "ri-calendar-2-line",
      title: "Periodic Service",
      description: "Regular maintenance for optimal performance",
    },
    {
      icon: "ri-truck-line",
      title: "RSA Services",
      description: "Roadside assistance when you need it most",
    },

    {
      icon: "ri-settings-3-line",
      title: "Spare Parts",
      description: "Genuine parts for all bike models",
    },

    {
      icon: "ri-tools-line",
      title: "Engine Repair",
      description: "Expert engine diagnostics and repair",
    },
  ];

  return (
    <div className="bg-white">
      <Hero />

      {/* Section 2: Services */}
      <section className="bg-white py-16 md:py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-16 items-center">
            {/* Left Content - Mobile Mockup */}
            <div className="flex justify-center lg:justify-start order-2 lg:order-1">
              <div className="relative group">
                <div className="relative bg-white p-2 rounded-2xl shadow-2xl">
                  <img
                    src="/images/services.png"
                    className="rounded-xl max-w-full h-auto transform group-hover:scale-[1.02] transition-transform duration-300"
                    alt="Two-Wheeler Services"
                  />
                </div>
              </div>
            </div>

            {/* Right Content */}
            <div className="order-1 lg:order-2 space-y-8">
              {/* Header Section */}
              <div className="space-y-6">
                <div className="inline-flex items-center px-4 py-2 bg-red-50 rounded-full">
                  <span className="text-red-600 font-semibold text-sm">
                    🏠 At Your Doorstep
                  </span>
                </div>

                <h2 className="text-3xl md:text-4xl xl:text-5xl font-bold text-gray-900 leading-tight">
                  Two-Wheeler Services at{" "}
                  <span className="text-red-600 relative">
                    Home
                    <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-red-500 to-red-600 rounded-full"></div>
                  </span>
                </h2>

                <p className="text-gray-600 text-lg md:text-xl leading-relaxed max-w-2xl">
                  Get professional periodic bike service at your convenience.
                  From engine repair to battery replacement, wheel and tyre care
                  - we bring quality service to your doorstep at unbeatable
                  prices.
                </p>
              </div>

              {/* Services Grid */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                  <span className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center">
                    <span className="w-2 h-2 bg-white rounded-full"></span>
                  </span>
                  Our Services
                </h3>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                  {services.map((service, index) => (
                    <div key={index} className="group cursor-pointer">
                      <div className="bg-white rounded-xl p-4 md:p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100">
                        <div className="flex justify-center mb-3">
                          <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-red-50 to-red-100 rounded-xl flex items-center justify-center group-hover:from-red-600 group-hover:to-red-700 transition-all duration-300">
                            <i
                              className={`${service.icon} text-2xl md:text-3xl text-red-600 group-hover:text-white transition-colors duration-300`}
                            ></i>
                          </div>
                        </div>
                        <h4 className="font-semibold text-gray-900 text-sm md:text-base text-center leading-tight">
                          {service.title}
                        </h4>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: How it Works */}
      <section className="min-h-screen bg-gradient-to-r from-red-600 to-red-700 text-white flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              How It Works
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-red-100 max-w-2xl mx-auto">
              Simple 3-step process to get your bike serviced or repaired
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 relative">
            {[
              {
                step: "1",
                title: "Book Service",
                desc: "Login or Register and select required service",
                image: "/images/hero-img.png",
              },
              {
                step: "2",
                title: "Get Assistance",
                desc: "Mechanic arrives at your location",
                image: "/images/hero-img.png",
              },
              {
                step: "3",
                title: "Ride Safe",
                desc: "Pay digitally and continue your journey",
                image: "/images/hero-img.png",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white/10 p-6 sm:p-8 rounded-2xl backdrop-blur-lg relative"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-32 sm:h-40 object-cover rounded-xl mb-6 opacity-90"
                />
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white text-red-600 rounded-full flex items-center justify-center text-xl sm:text-2xl font-bold mx-auto mb-6 absolute -top-6 left-1/2 transform -translate-x-1/2 shadow-lg">
                  {item.step}
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-4 text-center mt-8">
                  {item.title}
                </h3>
                <p className="text-red-100 text-sm sm:text-base text-center leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}

            {/* Arrows (only show on md+ screens) */}
            <div className="hidden sm:block absolute top-20 left-1/3 w-12 h-0.5 bg-white"></div>
            <div className="hidden sm:block absolute top-20 right-1/3 w-12 h-0.5 bg-white"></div>
          </div>
        </div>
      </section>

      {/* Section 6: Testimonials */}
      <section className="min-h-screen bg-white flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              What Our <span className="text-red-600">Customers Say</span>
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto">
              Real feedback from satisfied customers who trust our doorstep bike
              service
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Priya Sharma",
                location: "Mumbai",
                rating: 5,
                comment:
                  "Amazing service! They came to my office and fixed my bike in 30 minutes. Very professional and transparent pricing.",
                image: "/images/customer-1.jpg",
              },
              {
                name: "Rohit Verma",
                location: "Delhi",
                rating: 5,
                comment:
                  "Called them for roadside assistance at 2 AM. They reached in 15 minutes and got my bike running. Highly recommend!",
                image: "/images/customer-2.jpg",
              },
              {
                name: "Anita Patel",
                location: "Bangalore",
                rating: 5,
                comment:
                  "Regular customer for 2 years. Always on time, genuine parts, and fair pricing. Best bike service in the city!",
                image: "/images/customer-3.jpg",
              },
            ].map((testimonial, i) => (
              <div
                key={i}
                className="bg-gradient-to-br from-red-50 to-white p-6 sm:p-8 rounded-2xl border border-red-100 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-bold text-gray-900">
                      {testimonial.name}
                    </h4>
                    <p className="text-gray-600 text-sm">
                      {testimonial.location}
                    </p>
                  </div>
                </div>
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-lg">
                      ★
                    </span>
                  ))}
                </div>
                <p className="text-gray-700 text-sm sm:text-base leading-relaxed italic">
                  "{testimonial.comment}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
