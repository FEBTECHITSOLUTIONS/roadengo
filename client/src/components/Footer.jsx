import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          {/* Logo + About */}
          <div>
            <div className="flex items-center space-x-2 mb-4 h-10 overflow-hidden w-fit rounded-sm">
           <img src="/images/logo.jpeg" className="w-20 " alt="Bike Service Logo" />
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              24/7 bike emergency services, spare parts delivery, and
              professional roadside repair solutions you can trust.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/services"
                  className="hover:text-white transition-colors"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="hover:text-white transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-white transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* For Professionals */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">
              For Professionals
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/admin/login"
                  className="hover:text-white transition-colors"
                >
                  Admin Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Emergency Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">
              Emergency Contact
            </h3>
            <div className="bg-red-600 text-white p-4 rounded-xl shadow-md">
              <p className="text-sm font-medium">24/7 Emergency Hotline</p>
              <p className="text-xl font-bold">+91 9876543210</p>
            </div>
            <div className="flex items-center gap-4 mt-4">
              <a
                href="httpss://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-green-400 transition-colors"
              >
                <i className="ri-whatsapp-fill text-2xl"></i>
              </a>
              <a
                href="tel:+919876543210"
                className="hover:text-blue-400 transition-colors"
              >
                <i className="ri-phone-fill text-2xl"></i>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-10 pt-6 text-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} BikeService. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
