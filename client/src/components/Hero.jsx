import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 via-white to-pink-50 py-10 sm:py-14 lg:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl w-full mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left space-y-8 order-1 lg:order-1">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 bg-red-100 rounded-full text-red-700 font-medium text-sm">
              <i className="ri-shield-check-line mr-2"></i>
              Trusted by 10,000+ Riders
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Professional <br />
              <span className="text-red-600 relative">
                Bike Services
                <svg
                  className="absolute -bottom-2 left-0 w-full h-3 text-red-200"
                  viewBox="0 0 100 12"
                  fill="currentColor"
                >
                  <path d="M0 8c30-4 70-4 100 0v4H0z" />
                </svg>
              </span>{" "}
              <br />
              At Your Doorstep
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-light">
              Expert mechanics, genuine parts, and transparent pricing. 
              <span className="font-medium text-gray-800"> Available 24/7 for all your two & three-wheeler needs.</span>
            </p>


           

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-6">
              <Link
                to="/emergency-assistance"
                className="group bg-red-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-red-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center gap-3 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-red-700 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <i className="ri-phone-fill text-xl relative z-10"></i>
                <span className="relative z-10">Roadside repair</span>
              </Link>
              
              <Link
                to="/doorstep-service"
                className="border-2 border-red-600 text-red-600 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-red-600 hover:text-white transition-all duration-300 flex items-center justify-center gap-3 group"
              >
                <i className="ri-calendar-2-line text-xl group-hover:scale-110 transition-transform duration-300"></i>
                Routine service
              </Link>
            </div>

           
          </div>

          {/* Right Image */}
          <div className="order-2 lg:order-2 flex justify-center relative">
            <div className="relative">
              <img
                src="/images/hero-img.png"
                alt="Professional Bike Service - Expert mechanic working on motorcycle"
                className="w-full max-w-sm sm:max-w-md lg:max-w-full h-auto object-cover rounded-3xl shadow-2xl"
              />
              
              {/* Floating Service Badge */}
              <div className="absolute -top-4 -right-4 bg-white rounded-2xl p-4 shadow-xl border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <div>
                    <div className="text-sm font-semibold text-gray-900">Available Now</div>
                    <div className="text-xs text-gray-600">Ready to assist</div>
                  </div>
                </div>
              </div>

              {/* Floating Rating Badge */}
              <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl p-4 shadow-xl border border-gray-100">
                <div className="flex items-center gap-2">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <i key={i} className="ri-star-fill text-sm"></i>
                    ))}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-900">4.8</div>
                    <div className="text-xs text-gray-600">2.5k+ reviews</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
