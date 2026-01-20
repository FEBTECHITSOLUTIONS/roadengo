import React from "react";
import { Link, useNavigate } from "react-router-dom"; // ADDED: useNavigate
import { FaInstagram, FaFacebook, FaYoutube, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  const navigate = useNavigate(); 

  // Function to handle delay and scroll
  const handleLinkClick = (e, path) => {
    e.preventDefault(); 
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setTimeout(() => {
      navigate(path);
    }, 200);
  };

  return (
    <footer className="bg-red-800 text-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          {/* Logo + About */}
          <div>
            <div className="flex items-center space-x-2 mb-4 overflow-hidden w-fit rounded-sm">
              <img src="/images/logo.jpeg" className="w-30" alt="Bike Service Logo" />
            </div>
            <p className="text-gray-200 text-sm leading-relaxed">
              24/7 bike emergency services, spare parts delivery, and
              professional roadside repair solutions you can trust.
            </p>
            {/* Social Media Links */}
            <div className="flex items-center gap-4 mt-4">
              <a
                href="https://www.instagram.com/roadengo?igsh=MXJvN211NWdwZGh0MA%3D%3D&utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-pink-500 transition-colors bg-white text-red-800 p-1.5 rounded-full"
              >
                <FaInstagram className="text-xl" />
              </a>
              <a
                href="https://www.facebook.com/share/1EJ7e62HsW/?mibextid=wwXIfr"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-600 transition-colors bg-white text-red-800 p-1.5 rounded-full"
              >
                <FaFacebook className="text-xl" />
              </a>
              <a
                href="https://youtube.com/@yourchannel"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-red-600 transition-colors bg-white text-red-800 p-1.5 rounded-full"
              >
                <FaYoutube className="text-xl" />
              </a>
              <a
                href="https://twitter.com/yourhandle"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-black transition-colors bg-white text-red-800 p-1.5 rounded-full"
              >
                <FaXTwitter className="text-xl" />
              </a>
            </div>
          </div>

          {/* Quick Links - UPDATED WITH 1 SEC DELAY */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">
              Quick Links
            </h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>
                <Link
                  onClick={(e) => handleLinkClick(e, "/services")}
                  className="hover:text-white transition-colors"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  onClick={(e) => handleLinkClick(e, "/about")}
                  className="hover:text-white transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  onClick={(e) => handleLinkClick(e, "/contact")}
                  className="hover:text-white transition-colors"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  onClick={(e) => handleLinkClick(e, "/terms-and-conditions")}
                  className="hover:text-white transition-colors"
                >
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link
                  onClick={(e) => handleLinkClick(e, "/privacy-policy")}
                  className="hover:text-white transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* For Professionals - UPDATED WITH 1 SEC DELAY */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">
              For Professionals
            </h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>
                <Link
                  to="/admin/login"
                  onClick={(e) => handleLinkClick(e, "/admin/login")}
                  className="hover:text-white transition-colors"
                >
                  Admin Login
                </Link>
              </li>
              <li>
                <Link
                  to="/mechanic/login"
                  onClick={(e) => handleLinkClick(e, "/mechanic/login")}
                  className="hover:text-white transition-colors"
                >
                  Mechanics Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">
              Contact Us
            </h3>
            <div className="space-y-4">
              
              {/* Phone */}
              <div className="flex items-center gap-3">
                <div className="bg-white p-1.5 rounded-md flex items-center justify-center">
                  <FaPhoneAlt className="text-red-800 text-sm" />
                </div>
                <a 
                  href="tel:+917900900744" 
                  className="text-gray-100 hover:text-white transition-colors text-sm font-medium"
                >
                  +91 7900900744
                </a>
              </div>

              {/* Email */}
              <div className="flex items-center gap-3">
                <div className="bg-white p-1.5 rounded-md flex items-center justify-center">
                  <FaEnvelope className="text-red-800 text-sm" />
                </div>
                <a 
                  href="mailto:support@roadengo.com" 
                  className="text-gray-100 hover:text-white transition-colors text-sm font-medium"
                >
                  support@roadengo.com
                </a>
              </div>

              {/* Address */}
              <div className="flex items-start gap-3">
                <div className="bg-white p-1.5 rounded-md flex items-center justify-center mt-0.5">
                  <FaMapMarkerAlt className="text-red-800 text-sm" />
                </div>
                <p className="text-gray-100 text-sm leading-relaxed font-medium">
                  Lakshar road near<br />
                  sati kund, Haridwar<br />
                  Uttarakhand 249408<br />
                  India
                </p>
              </div>

            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-red-700 mt-10 pt-6 text-center">
          <p className="text-gray-300 text-sm"> 
            © {new Date().getFullYear()} Roadengo. All rights reserved. 
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;