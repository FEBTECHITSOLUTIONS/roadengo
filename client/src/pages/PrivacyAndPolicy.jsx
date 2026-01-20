import React from "react";
import { Link } from "react-router-dom";

const PrivacyPolicy = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl overflow-hidden">
        
        {/* Header Section */}
        <div className="bg-red-800 text-white p-6 sm:p-10 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold uppercase tracking-wide">
            Privacy Policy
          </h1>
          <p className="mt-2 text-red-100 text-sm sm:text-base">
            Your privacy is important to us. Here is how we handle your data.
          </p>
        </div>

        {/* Content Section */}
        <div className="p-6 sm:p-10 space-y-8 text-gray-700 leading-relaxed">
          
          {/* Section 1 */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3 flex items-center">
              <span className="bg-red-100 text-red-800 text-sm font-bold px-2 py-1 rounded mr-3">1</span>
              Introduction
            </h2>
            <p>
              Welcome to <strong>Roadengo</strong>. We value the trust you place in us and recognize the importance of secure transactions and information privacy. This Privacy Policy describes how Roadengo collects, uses, shares, and protects your personal information.
            </p>
          </section>

          <hr className="border-gray-200" />

          {/* Section 2 */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3 flex items-center">
              <span className="bg-red-100 text-red-800 text-sm font-bold px-2 py-1 rounded mr-3">2</span>
              Information We Collect
            </h2>
            <p className="mb-2">We collect the following types of information to provide our services:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Personal Information:</strong> Name, phone number, email address, and physical address provided during booking or registration.</li>
              <li><strong>Vehicle Information:</strong> Bike model, vehicle number, and service history.</li>
              <li><strong>Location Data:</strong> Real-time geographical location to provide accurate roadside assistance and doorstep services.</li>
            </ul>
          </section>

          <hr className="border-gray-200" />

          {/* Section 3 */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3 flex items-center">
              <span className="bg-red-100 text-red-800 text-sm font-bold px-2 py-1 rounded mr-3">3</span>
              How We Use Your Information
            </h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>To connect you with nearby mechanics and service providers.</li>
              <li>To process your service requests and payments.</li>
              <li>To communicate with you regarding booking updates, offers, and support.</li>
              <li>To improve our platform, services, and user experience.</li>
            </ul>
          </section>

          <hr className="border-gray-200" />

          {/* Section 4 */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3 flex items-center">
              <span className="bg-red-100 text-red-800 text-sm font-bold px-2 py-1 rounded mr-3">4</span>
              Sharing of Information
            </h2>
            <p>
              We do not sell your personal data. However, we may share your information with:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-2">
              <li><strong>Service Partners:</strong> Mechanics and workshops assigned to your booking to fulfill the service.</li>
              <li><strong>Legal Authorities:</strong> If required by law or to protect the rights and safety of Roadengo and its users.</li>
            </ul>
          </section>

          <hr className="border-gray-200" />

          {/* Section 5 */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3 flex items-center">
              <span className="bg-red-100 text-red-800 text-sm font-bold px-2 py-1 rounded mr-3">5</span>
              Data Security
            </h2>
            <p>
              We implement appropriate technical and organizational security measures to protect your data from unauthorized access, loss, or misuse. However, no internet transmission is completely secure, and we cannot guarantee absolute security.
            </p>
          </section>

          <hr className="border-gray-200" />

          {/* Section 6 */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3 flex items-center">
              <span className="bg-red-100 text-red-800 text-sm font-bold px-2 py-1 rounded mr-3">6</span>
              Updates to This Policy
            </h2>
            <p>
              We may update this Privacy Policy from time to time. Any changes will be posted on this page, and your continued use of the service constitutes acceptance of the modified terms.
            </p>
          </section>

          <hr className="border-gray-200" />

          {/* Section 7 */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3 flex items-center">
              <span className="bg-red-100 text-red-800 text-sm font-bold px-2 py-1 rounded mr-3">7</span>
              Contact Us
            </h2>
            <p className="mb-2">
              If you have any questions or concerns regarding this Privacy Policy, please contact us at:
            </p>
            <p className="font-medium text-gray-900">
              📧 support@roadengo.com <br />
              📞 +91 7900900744
            </p>
          </section>

        </div>

        {/* Footer / Back Button */}
        <div className="bg-gray-100 p-6 flex justify-center">
          <Link 
            to="/" 
            className="bg-red-800 hover:bg-red-900 text-white font-semibold py-3 px-8 rounded-lg shadow-md transition-all transform hover:scale-105"
          >
            Back to Home
          </Link>
        </div>

      </div>
    </div>
  );
};

export default PrivacyPolicy;