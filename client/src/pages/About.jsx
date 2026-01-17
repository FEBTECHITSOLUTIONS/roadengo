import React from "react";
import { FaUserCircle } from "react-icons/fa";

const About = () => {
  return (
    <div className="bg-gradient-to-br from-red-50 via-white to-pink-50">
      {/* Section 1: Hero About */}
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 via-white to-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                About <span className="text-red-600">Our Journey</span>
              </h1>
              <p className="text-base sm:text-lg lg:text-xl text-gray-600 mb-8 leading-relaxed">
                We revolutionized bike servicing by bringing professional
                mechanics to your doorstep. Founded in 2019, we've served over
                5,000+ happy customers across major Indian cities.
              </p>
              <div className="grid grid-cols-2 gap-6 sm:gap-8">
                {[
                  { number: "2019", text: "Founded" },
                  { number: "5000+", text: "Services Done" },
                  { number: "15+", text: "Cities" },
                  { number: "50+", text: "Expert Mechanics" },
                ].map((item, i) => (
                  <div key={i} className="text-center lg:text-left">
                    <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-red-600 mb-2">
                      {item.number}
                    </div>
                    <div className="text-gray-600 text-sm sm:text-base">
                      {item.text}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <img
                src="/images/hero-img.png"
                alt="About Our Company"
                className="rounded-2xl shadow-xl w-full h-96 lg:h-[500px] object-cover"
              />
              <div className="absolute -bottom-6 -right-6 bg-red-600 text-white px-6 sm:px-8 py-4 sm:py-6 rounded-2xl shadow-lg">
                <div className="text-xl sm:text-2xl font-bold">6+ Years</div>
                <div className="text-sm sm:text-base">Experience</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Our Mission & Vision */}
      <section className="min-h-screen bg-white flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Our Mission & <span className="text-red-600">Vision</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Mission */}
            <div className="bg-gradient-to-br from-red-50 to-white p-8 sm:p-12 rounded-2xl border border-red-100 shadow-lg">
              <div className="w-16 h-16 bg-red-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-2xl">🎯</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 text-center">
                Our Mission
              </h3>
              <p className="text-gray-700 text-base sm:text-lg leading-relaxed text-center mb-6">
                To provide convenient, transparent, and high-quality doorstep
                bike servicing solutions that save time and deliver exceptional
                customer satisfaction across India.
              </p>
              <div className="space-y-4">
                {[
                  "Convenience at your doorstep",
                  "Transparent pricing always",
                  "Quality service guarantee",
                  "Customer satisfaction first",
                ].map((point, i) => (
                  <div key={i} className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span className="text-gray-700 text-sm sm:text-base">
                      {point}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Vision */}
            <div className="bg-gradient-to-br from-blue-50 to-white p-8 sm:p-12 rounded-2xl border border-blue-100 shadow-lg">
              <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-2xl">🔮</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 text-center">
                Our Vision
              </h3>
              <p className="text-gray-700 text-base sm:text-lg leading-relaxed text-center mb-6">
                To become India's most trusted doorstep bike service provider,
                revolutionizing two-wheeler maintenance with technology and
                professional expertise.
              </p>
              <div className="space-y-4">
                {[
                  "Pan-India service network",
                  "Technology-driven solutions",
                  "Eco-friendly practices",
                  "Community trust & reliability",
                ].map((point, i) => (
                  <div key={i} className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-gray-700 text-sm sm:text-base">
                      {point}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

     {/* Section 4: Founder & Director */}
<section className="min-h-screen bg-white flex items-center">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
    <div className="text-center mb-12 sm:mb-16">
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
        Founder & Director – <span className="text-red-600">Govind Saini</span>
      </h2>
      <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto">
        A young visionary entrepreneur redefining Road Side Assistance for India
      </p>
    </div>

    <div className="flex flex-col items-center">
      <div className="bg-gradient-to-br from-gray-50 to-white p-6 sm:p-10 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 max-w-3xl">
        
        {/* Image */}
        <div className="relative mb-6 flex justify-center">
          <FaUserCircle className="text-gray-500 text-9xl sm:text-[10rem] lg:text-[12rem] " />
          <div className="absolute -bottom-2 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
            7+ Years Experience
          </div>
        </div>

        {/* Content */}
        <div className="text-center">
          <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            Govind Saini
          </h3>
          <p className="text-red-600 font-semibold mb-4">
            Founder & Director – Roadengo RSA
          </p>

          <p className="text-gray-700 text-base sm:text-lg leading-relaxed mb-4">
            Govind Saini, a 27-year-old dynamic entrepreneur, founded Roadengo Road Side Assistance after gaining
            7 years of strong experience in automobile service, sales, marketing, and customer support. His deep
            industry knowledge and young vision inspired him to build a fast, reliable, and professional on-road
            assistance network for two- and three-wheelers.
          </p>

          <p className="text-gray-700 text-base sm:text-lg leading-relaxed mb-4">
            Under his leadership, Roadengo RSA provides 24×7 emergency support, including on-spot repair, tyre and
            battery services, towing, and EV diagnostics. His belief is clear: whenever a customer faces any vehicle
            problem, the first name they should remember is <strong>Roadengo</strong>.
          </p>

          <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
            With a mission to create India’s most trusted RSA ecosystem, Govind Saini is driving Roadengo toward 
            rapid expansion, better technology, and a reputation for unmatched reliability — anytime, anywhere.
          </p>
        </div>
      </div>
    </div>
  </div>
</section>


      {/* Section 6: Why Choose Us */}
      <section className="min-h-screen bg-white flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="relative">
              <img
                src="/images/booking.png"
                alt="Why Choose Us"
                className="rounded-2xl shadow-xl w-full h-96 lg:h-[500px] object-cover"
              />
              <div className="absolute -top-6 -right-6 bg-red-600 text-white px-6 sm:px-8 py-4 sm:py-6 rounded-2xl shadow-lg">
                <div className="text-2xl sm:text-3xl font-bold">4.9/5</div>
                <div className="text-sm sm:text-base">Customer Rating</div>
              </div>
            </div>

            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Why Choose <span className="text-red-600">Us?</span>
              </h2>
              <p className="text-base sm:text-lg lg:text-xl text-gray-600 mb-8 leading-relaxed">
                We've revolutionized bike servicing by combining convenience,
                quality, and transparency in everything we do.
              </p>

              <div className="space-y-6">
                {[
                  {
                    icon: "🏠",
                    title: "Doorstep Convenience",
                    desc: "Service at your home, office, or anywhere you are. No more waiting in service centers.",
                  },
                  {
                    icon: "💎",
                    title: "Premium Quality",
                    desc: "Certified mechanics, genuine parts, and professional tools for the best service.",
                  },
                  {
                    icon: "📱",
                    title: "Digital Experience",
                    desc: "Easy booking, real-time tracking, digital payments, and instant service reports.",
                  },
                  {
                    icon: "🔒",
                    title: "100% Guarantee",
                    desc: "Service warranty and 100% satisfaction guarantee on all our work.",
                  },
                ].map((point, i) => (
                  <div key={i} className="flex items-start space-x-4">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 bg-red-50 rounded-xl flex items-center justify-center text-xl sm:text-2xl">
                      {point.icon}
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                        {point.title}
                      </h3>
                      <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                        {point.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
