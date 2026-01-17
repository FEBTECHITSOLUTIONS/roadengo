import React, { useState } from "react";

const Contact = () => {
  const [result, setResult] = useState("");
  const [activeTab, setActiveTab] = useState("general");

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending...");
    const formData = new FormData(event.target);
    formData.append("access_key", "YOUR_ACCESS_KEY_HERE");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    console.log(data);
    
    if (data.success) {
      setResult(
        "Message Sent Successfully! We'll contact you within 15 minutes."
      );
      event.target.reset();
    } else {
      console.log("Error", data);
      setResult(data.message);
    }
  };

  return (
    <div className="bg-gradient-to-br from-red-50 via-white to-pink-50">
      {/* Section 1: Contact Hero */}
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 via-white to-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <div className="text-center mb-12 sm:mb-16">
            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Get in <span className="text-red-600">Touch</span>
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-4xl mx-auto mb-8 leading-relaxed">
              Need bike service or have questions? We're here to help! Contact
              us 24/7 for emergency roadside assistance or book your doorstep
              service appointment.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {/* Quick Contact Cards */}
            {[
              {
                title: "24/7 Emergency",
                subtitle: "Immediate Assistance",
                contact: "+91 7900900744",
                description: "Roadside breakdown & emergency repairs",
                icon: "🚨",
                color: "red",
                buttonText: "Call Emergency",
              },
              {
                title: "General Support",
                subtitle: "Service Booking",
                contact: "+91 7900900744",
                description: "Regular service appointments & inquiries",
                icon: "📞",
                color: "blue",
                buttonText: "Call Support",
              },
              {
                title: "WhatsApp Chat",
                subtitle: "Quick Response",
                contact: "+91 7900900744",
                description: "Instant chat support & service updates",
                icon: "💬",
                color: "green",
                buttonText: "Start Chat",
              },
            ].map((contact, i) => (
              <div
                key={i}
                className={`bg-gradient-to-br from-${contact.color}-50 to-white p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-${contact.color}-100`}
              >
                <div
                  className={`w-16 h-16 bg-${contact.color}-600 rounded-2xl flex items-center justify-center mx-auto mb-6`}
                >
                  <span className="text-white text-2xl">{contact.icon}</span>
                </div>
                <div className="text-center">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1">
                    {contact.title}
                  </h3>
                  <p className={`text-${contact.color}-600 font-semibold mb-3`}>
                    {contact.subtitle}
                  </p>
                  <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
                    {contact.contact}
                  </div>
                  <p className="text-gray-600 text-sm mb-6">
                    {contact.description}
                  </p>
                  <a
                    href={
                      contact.color === "red"
                        ? `tel:${contact.contact}`
                        : contact.color === "green"
                        ? `https://wa.me/${contact.contact.replace(/[\s+-]/g, "")}`
                        : `tel:${contact.contact}`
                    }
                    target="_blank"
                    className={`block w-full bg-${contact.color}-600 text-white py-3 rounded-lg font-semibold hover:bg-${contact.color}-700 transition-colors text-center`}
                  >
                    {contact.buttonText}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 2: Contact Forms */}
      <section className="min-h-screen bg-white flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Send us a <span className="text-red-600">Message</span>
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto">
              Choose the right form for your inquiry to get faster, more
              personalized assistance
            </p>
          </div>

          {/* Form Tabs */}
          <div className="flex flex-wrap justify-center mb-8 gap-2">
            {[
              { id: "general", label: "General Inquiry", icon: "📝" },
              { id: "service", label: "Book Service", icon: "🔧" },
              { id: "emergency", label: "Roadside repair", icon: "🚨" },
              { id: "feedback", label: "Feedback", icon: "⭐" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 sm:px-6 py-3 rounded-lg font-semibold transition-colors ${
                  activeTab === tab.id
                    ? "bg-red-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <span>{tab.icon}</span>
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Contact Form */}
            <div className="bg-gradient-to-br from-gray-50 to-white p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                {activeTab === "general" && "General Inquiry Form"}
                {activeTab === "service" && "Book Service Form"}
                {activeTab === "emergency" && "Emergency Assistance Form"}
                {activeTab === "feedback" && "Feedback & Review Form"}
              </h3>

              <form onSubmit={onSubmit} className="space-y-4">
                <input
                  type="checkbox"
                  name="botcheck"
                  className="hidden"
                  style={{ display: "none" }}
                />

                <input
                  type="hidden"
                  name="subject"
                  value={`${
                    activeTab.charAt(0).toUpperCase() + activeTab.slice(1)
                  } Inquiry from Website`}
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 text-sm font-semibold mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100"
                      placeholder="Enter your name"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-semibold mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100"
                      placeholder="+91 9876543210"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-semibold mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100"
                    placeholder="your@email.com"
                  />
                </div>

                {/* Dynamic fields based on tab */}
                {activeTab === "service" && (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-gray-700 text-sm font-semibold mb-2">
                          Bike Brand
                        </label>
                        <select
                          name="bike_brand"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100"
                        >
                          <option value="">Select Brand</option>
                          <option value="Honda">Honda</option>
                          <option value="Hero">Hero</option>
                          <option value="Bajaj">Bajaj</option>
                          <option value="TVS">TVS</option>
                          <option value="Royal Enfield">Royal Enfield</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-gray-700 text-sm font-semibold mb-2">
                          Service Type
                        </label>
                        <select
                          name="service_type"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100"
                        >
                          <option value="">Select Service</option>
                          <option value="Regular Service">
                            Regular Service
                          </option>
                          <option value="Oil Change">Oil Change</option>
                          <option value="Brake Service">Brake Service</option>
                          <option value="Complete Checkup">
                            Complete Checkup
                          </option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-gray-700 text-sm font-semibold mb-2">
                        Preferred Date & Time
                      </label>
                      <input
                        type="datetime-local"
                        name="preferred_datetime"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100"
                      />
                    </div>
                  </>
                )}

                {activeTab === "emergency" && (
                  <div>
                    <label className="block text-gray-700 text-sm font-semibold mb-2">
                      Emergency Type
                    </label>
                    <select
                      name="emergency_type"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100"
                    >
                      <option value="">Select Emergency</option>
                      <option value="Breakdown">Bike Breakdown</option>
                      <option value="Accident">Accident</option>
                      <option value="Flat Tire">Flat Tire</option>
                      <option value="Battery Dead">Battery Dead</option>
                      <option value="Other">Other Emergency</option>
                    </select>
                  </div>
                )}

                {activeTab === "feedback" && (
                  <div>
                    <label className="block text-gray-700 text-sm font-semibold mb-2">
                      Rate Your Experience
                    </label>
                    <select
                      name="rating"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100"
                    >
                      <option value="">Select Rating</option>
                      <option value="5">⭐⭐⭐⭐⭐ Excellent</option>
                      <option value="4">⭐⭐⭐⭐ Good</option>
                      <option value="3">⭐⭐⭐ Average</option>
                      <option value="2">⭐⭐ Poor</option>
                      <option value="1">⭐ Very Poor</option>
                    </select>
                  </div>
                )}

                <div>
                  <label className="block text-gray-700 text-sm font-semibold mb-2">
                    {activeTab === "emergency"
                      ? "Location & Emergency Details *"
                      : "Message *"}
                  </label>
                  <textarea
                    name="message"
                    rows="4"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100"
                    placeholder={
                      activeTab === "emergency"
                        ? "Please provide your exact location and describe your emergency..."
                        : "Tell us how we can help you..."
                    }
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors shadow-lg hover:shadow-xl"
                >
                  {activeTab === "emergency"
                    ? "Send Emergency Request"
                    : "Send Message"}
                </button>
              </form>

              {result && (
                <div
                  className={`mt-4 text-center text-sm ${
                    result.includes("Successfully")
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {result}
                </div>
              )}
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div className="bg-gradient-to-br from-red-50 to-white p-6 sm:p-8 rounded-2xl shadow-lg border border-red-100">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Contact Information
                </h3>
                <div className="space-y-6">
                  {[
                    {
                      icon: "📍",
                      title: "Head Office",
                      details: [
                        'Lakshar road near sati kund',' uttarakhand 249408', 'India'
                      ],
                    },
                    {
                      icon: "📞",
                      title: "Phone Numbers",
                      details: [
                       7900900744
                      ],
                    },
                    {
                      icon: "📧",
                      title: "Email Addresses",
                      details: [
                        "support@roadengo.com"
                      ],
                    },
                    {
                      icon: "🕒",
                      title: "Business Hours",
                      details: [
                        "Regular Service: 8 AM - 8 PM",
                        "Emergency: 24/7 Available",
                        "Support: 8 AM - 10 PM",
                      ],
                    },
                  ].map((info, i) => (
                    <div key={i} className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                        <span className="text-xl">{info.icon}</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 mb-2">
                          {info.title}
                        </h4>
                        {info.details.map((detail, j) => (
                          <p key={j} className="text-gray-600 text-sm">
                            {detail}
                          </p>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Service Areas Map */}
    

    </div>
  );
};

export default Contact;
