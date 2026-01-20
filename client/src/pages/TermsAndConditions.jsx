import React from "react";
import { Link } from "react-router-dom";

const TermsAndConditions = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl overflow-hidden">
        
        {/* Header Section */}
        <div className="bg-red-800 text-white p-6 sm:p-10 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold uppercase tracking-wide">
            Terms & Conditions
          </h1>
          <p className="mt-2 text-red-100 text-sm sm:text-base">
            Please read these terms carefully before using Roadengo services.
          </p>
        </div>

        {/* Content Section */}
        <div className="p-6 sm:p-10 space-y-8 text-gray-700 leading-relaxed">
          
          {/* Section 1 */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3 flex items-center">
              <span className="bg-red-100 text-red-800 text-sm font-bold px-2 py-1 rounded mr-3">1</span>
              Service Scope
            </h2>
            <p className="mb-2">
              Roadengo is an on-demand vehicle service platform providing roadside assistance, repair, servicing, and emergency support for two-wheelers and three-wheelers.
            </p>
            <p>
              All services are subject to availability, location, and mechanic capacity.
            </p>
          </section>

          <hr className="border-gray-200" />

          {/* Section 2 */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3 flex items-center">
              <span className="bg-red-100 text-red-800 text-sm font-bold px-2 py-1 rounded mr-3">2</span>
              Booking & Confirmation
            </h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Service bookings can be made through our website, app, WhatsApp, or phone call.</li>
              <li>A service is considered valid only after booking confirmation.</li>
              <li>Response time may vary depending on traffic, weather, and location conditions.</li>
            </ul>
          </section>

          <hr className="border-gray-200" />

          {/* Section 3 */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3 flex items-center">
              <span className="bg-red-100 text-red-800 text-sm font-bold px-2 py-1 rounded mr-3">3</span>
              Pricing & Payment
            </h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Service charges depend on vehicle type, issue, location, and service category.</li>
              <li>Inspection charges and repair charges may be separate.</li>
              <li>Cost of spare parts is not included unless clearly mentioned.</li>
              <li>Payments can be made via cash, UPI, or online modes.</li>
              <li>Once the service has started, payments are non-refundable.</li>
            </ul>
          </section>

          <hr className="border-gray-200" />

          {/* Section 4 */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3 flex items-center">
              <span className="bg-red-100 text-red-800 text-sm font-bold px-2 py-1 rounded mr-3">4</span>
              Cancellation & Rescheduling
            </h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Cancellations are allowed before service initiation.</li>
              <li>If the mechanic has been dispatched, a visiting charge may apply.</li>
              <li>Incorrect location details or customer unavailability may result in additional charges.</li>
            </ul>
          </section>

          <hr className="border-gray-200" />

          {/* Section 5 */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3 flex items-center">
              <span className="bg-red-100 text-red-800 text-sm font-bold px-2 py-1 rounded mr-3">5</span>
              Customer Responsibilities
            </h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Customers must provide accurate vehicle details and problem descriptions.</li>
              <li>Customers are responsible for ensuring valid vehicle ownership and documents.</li>
              <li>The presence of the customer or an authorized person is required during service.</li>
            </ul>
          </section>

          <hr className="border-gray-200" />

          {/* Section 6 */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3 flex items-center">
              <span className="bg-red-100 text-red-800 text-sm font-bold px-2 py-1 rounded mr-3">6</span>
              Warranty & Liability
            </h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Roadengo does not provide repair warranties; any warranty (if applicable) is offered by the mechanic or spare part supplier.</li>
              <li>Roadengo shall not be liable for indirect losses, delays, accidents, or future vehicle damage.</li>
              <li>Responsibility for pre-existing or old vehicle conditions lies with the customer.</li>
            </ul>
          </section>

          <hr className="border-gray-200" />

          {/* Section 7 */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3 flex items-center">
              <span className="bg-red-100 text-red-800 text-sm font-bold px-2 py-1 rounded mr-3">7</span>
              Spare Parts
            </h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Spare parts may be genuine or aftermarket, depending on availability.</li>
              <li>Warranty on spare parts (if any) is provided by the manufacturer or seller, not by Roadengo.</li>
            </ul>
          </section>

          <hr className="border-gray-200" />

          {/* Section 8 */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3 flex items-center">
              <span className="bg-red-100 text-red-800 text-sm font-bold px-2 py-1 rounded mr-3">8</span>
              Safety & Conduct
            </h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Customers are expected to maintain respectful behavior with service personnel.</li>
              <li>Any abuse, threat, or misconduct may lead to immediate service cancellation without refund.</li>
            </ul>
          </section>

          <hr className="border-gray-200" />

          {/* Section 9 */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3 flex items-center">
              <span className="bg-red-100 text-red-800 text-sm font-bold px-2 py-1 rounded mr-3">9</span>
              Service Denial
            </h2>
            <p className="mb-2">Roadengo reserves the right to deny or cancel service in cases including but not limited to:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Unsafe or inaccessible locations.</li>
              <li>Vehicles involved in illegal activities.</li>
              <li>Non-cooperative customer behavior.</li>
              <li>Payment-related disputes or issues.</li>
            </ul>
          </section>

          <hr className="border-gray-200" />

          {/* Section 10 */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3 flex items-center">
              <span className="bg-red-100 text-red-800 text-sm font-bold px-2 py-1 rounded mr-3">10</span>
              Modification of Terms
            </h2>
            <p className="mb-2">
              Roadengo reserves the right to modify these Terms & Conditions at any time without prior notice.
            </p>
            <p>
              Updated terms will be applicable once published on the website or app.
            </p>
          </section>

          <hr className="border-gray-200" />

          {/* Section 11 */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3 flex items-center">
              <span className="bg-red-100 text-red-800 text-sm font-bold px-2 py-1 rounded mr-3">11</span>
              Governing Law & Jurisdiction
            </h2>
            <p>
              All disputes shall be governed by the laws of India and subject to the jurisdiction of local courts.
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

export default TermsAndConditions;