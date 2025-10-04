import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <>
      {/* Section 1: Hero Section with Image */}
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 via-white to-pink-50 py-12 lg:py-20">
        <div className="max-w-7xl mx-auto ">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-left order-2 lg:order-1">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Doorstep Bike Service &<br />
                <span className="text-red-600">Roadside Assistance</span>
              </h1>

              <p className="text-base sm:text-lg lg:text-xl text-gray-600 mb-8 max-w-3xl mx-auto lg:mx-0 leading-relaxed">
                Two & three-wheeler experts at your home or on the road.
                Transparent pricing, genuine parts, and quick response.
              </p>

              {/* Features List */}
              <div className="mb-8 space-y-3">
                <div className="flex items-center justify-center lg:justify-start gap-3">
                  <div className="">
                    <i className="ri-check-line text-red-600 text-lg"></i>
                  </div>
                  <span className="text-gray-700 font-medium">
                    Genuine Spare Parts
                  </span>
                </div>
                <div className="flex items-center justify-center lg:justify-start gap-3">
                  <div className="">
                    <i className="ri-check-line text-red-600 text-lg"></i>
                  </div>
                  <span className="text-gray-700 font-medium">
                    Expert Mechanics
                  </span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
                <Link
                  to="/booking"
                  className="bg-red-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-base sm:text-lg font-semibold hover:bg-red-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center gap-2"
                >
                  <i className="ri-calendar-2-line text-xl"></i>
                  Book Service
                </Link>
                <Link
                  to="/contact"
                  className="border-2 border-red-600 text-red-600 px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-base sm:text-lg font-semibold hover:bg-red-600 hover:text-white transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <i className="ri-phone-line text-xl"></i>
                  Call Now
                </Link>
              </div>
            </div>

            {/* Right Side - Image */}
            <div className="order-1 lg:order-2">
              <div className="relative">
                {/* Main Image Container */}
                <div className="relative ">
                  <img
                    src="/images/hero-img.png"
                    alt="Professional Bike Service - Mechanic working on motorcycle"
                    className="w-full h-[400px] sm:h-[500px] lg:h-[600px] object-cover rounded-2xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
