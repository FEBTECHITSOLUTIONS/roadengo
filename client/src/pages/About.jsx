import React from "react";

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
                We revolutionized bike servicing by bringing professional mechanics to your doorstep. 
                Founded in 2019, we've served over 5,000+ happy customers across major Indian cities.
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
                src="/images/about-hero.jpg"
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
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 text-center">Our Mission</h3>
              <p className="text-gray-700 text-base sm:text-lg leading-relaxed text-center mb-6">
                To provide convenient, transparent, and high-quality doorstep bike servicing solutions 
                that save time and deliver exceptional customer satisfaction across India.
              </p>
              <div className="space-y-4">
                {[
                  "Convenience at your doorstep",
                  "Transparent pricing always",
                  "Quality service guarantee",
                  "Customer satisfaction first"
                ].map((point, i) => (
                  <div key={i} className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span className="text-gray-700 text-sm sm:text-base">{point}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Vision */}
            <div className="bg-gradient-to-br from-blue-50 to-white p-8 sm:p-12 rounded-2xl border border-blue-100 shadow-lg">
              <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-2xl">🔮</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 text-center">Our Vision</h3>
              <p className="text-gray-700 text-base sm:text-lg leading-relaxed text-center mb-6">
                To become India's most trusted doorstep bike service provider, revolutionizing 
                two-wheeler maintenance with technology and professional expertise.
              </p>
              <div className="space-y-4">
                {[
                  "Pan-India service network",
                  "Technology-driven solutions", 
                  "Eco-friendly practices",
                  "Community trust & reliability"
                ].map((point, i) => (
                  <div key={i} className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-gray-700 text-sm sm:text-base">{point}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Our Story */}
      <section className="min-h-screen bg-gradient-to-r from-red-600 to-red-700 text-white flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              Our <span className="text-red-200">Story</span>
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-red-100 max-w-3xl mx-auto">
              From a small idea to revolutionizing bike servicing across India
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="space-y-8">
              {[
                {
                  year: "2019",
                  title: "The Beginning",
                  desc: "Started with just 2 mechanics in Mumbai, serving 50 customers in the first month"
                },
                {
                  year: "2020",
                  title: "Expansion",
                  desc: "Expanded to Delhi and Bangalore, introduced 24/7 emergency roadside assistance"
                },
                {
                  year: "2022",
                  title: "Technology",
                  desc: "Launched mobile app with real-time tracking and digital payments"
                },
                {
                  year: "2025",
                  title: "Present",
                  desc: "Serving 15+ cities with 50+ mechanics and 5000+ satisfied customers"
                }
              ].map((milestone, i) => (
                <div key={i} className="bg-white/10 p-6 rounded-xl backdrop-blur-lg">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-12 h-12 bg-white text-red-600 rounded-full flex items-center justify-center font-bold">
                      {i + 1}
                    </div>
                    <div>
                      <div className="text-red-200 text-sm font-semibold">{milestone.year}</div>
                      <div className="text-xl font-bold">{milestone.title}</div>
                    </div>
                  </div>
                  <p className="text-red-100 text-sm sm:text-base leading-relaxed pl-16">
                    {milestone.desc}
                  </p>
                </div>
              ))}
            </div>

            <div className="relative">
              <img
                src="/images/our-story.jpg"
                alt="Our Story"
                className="rounded-2xl shadow-xl w-full h-96 lg:h-[500px] object-cover opacity-90"
              />
              <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-lg p-4 rounded-xl text-gray-900">
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">6+</div>
                  <div className="text-sm">Years Journey</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Meet Our Team */}
      <section className="min-h-screen bg-white flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Meet Our <span className="text-red-600">Leadership Team</span>
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto">
              Passionate leaders driving innovation in doorstep bike servicing
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {[
              {
                name: "Rahul Sharma",
                role: "Founder & CEO",
                experience: "15+ Years in Auto Industry",
                image: "/images/ceo.jpg",
                bio: "Former automotive engineer turned entrepreneur"
              },
              {
                name: "Priya Patel",
                role: "Head of Operations",
                experience: "12+ Years Operations",
                image: "/images/head-ops.jpg", 
                bio: "Expert in service operations and quality control"
              },
              {
                name: "Amit Kumar",
                role: "Technical Director",
                experience: "18+ Years Technical",
                image: "/images/tech-director.jpg",
                bio: "Master mechanic and technical training specialist"
              },
            ].map((member, i) => (
              <div key={i} className="bg-gradient-to-br from-gray-50 to-white p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-gray-100">
                <div className="relative mb-6">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-24 h-24 sm:w-32 sm:h-32 rounded-full mx-auto object-cover border-4 border-red-100"
                  />
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                    {member.experience}
                  </div>
                </div>
                <div className="text-center">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-red-600 font-semibold mb-2">{member.role}</p>
                  <p className="text-gray-600 text-sm leading-relaxed">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Team Stats */}
          <div className="bg-gradient-to-r from-red-50 to-pink-50 p-8 sm:p-12 rounded-2xl">
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 text-center">Our Team Strength</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8">
              {[
                { number: "50+", text: "Expert Mechanics" },
                { number: "15+", text: "Support Staff" },
                { number: "10+", text: "Tech Team" },
                { number: "5+", text: "City Managers" },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-red-600 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-600 text-sm sm:text-base">
                    {stat.text}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Our Values */}
      <section className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Our Core <span className="text-red-600">Values</span>
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto">
              The principles that guide everything we do and every decision we make
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: "🤝",
                title: "Trust & Transparency",
                desc: "Complete honesty in pricing and services. No hidden charges, clear communication.",
                color: "red"
              },
              {
                icon: "⭐",
                title: "Quality Excellence",
                desc: "Using genuine parts and professional techniques to ensure the highest service quality.",
                color: "blue"
              },
              {
                icon: "⚡",
                title: "Speed & Convenience",
                desc: "Fast response times and doorstep service to fit your busy lifestyle perfectly.",
                color: "green"
              },
              {
                icon: "🛡️",
                title: "Safety First",
                desc: "Your safety and your bike's optimal performance are our top priorities always.",
                color: "purple"
              },
              {
                icon: "💡",
                title: "Innovation",
                desc: "Continuously improving our services with technology and customer feedback.",
                color: "orange"
              },
              {
                icon: "🌱",
                title: "Sustainability",
                desc: "Eco-friendly practices and promoting efficient bike maintenance for a greener future.",
                color: "teal"
              },
            ].map((value, i) => (
              <div key={i} className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-gray-100">
                <div className={`w-16 h-16 bg-${value.color}-100 rounded-2xl flex items-center justify-center mx-auto mb-6`}>
                  <span className="text-2xl">{value.icon}</span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 text-center">
                  {value.title}
                </h3>
                <p className="text-gray-600 text-sm sm:text-base text-center leading-relaxed">
                  {value.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 6: Why Choose Us */}
      <section className="min-h-screen bg-white flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="relative">
              <img
                src="/images/why-choose-us.jpg"
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
                    desc: "Service at your home, office, or anywhere you are. No more waiting in service centers."
                  },
                  { 
                    icon: "💎", 
                    title: "Premium Quality", 
                    desc: "Certified mechanics, genuine parts, and professional tools for the best service."
                  },
                  { 
                    icon: "📱", 
                    title: "Digital Experience", 
                    desc: "Easy booking, real-time tracking, digital payments, and instant service reports."
                  },
                  { 
                    icon: "🔒", 
                    title: "100% Guarantee", 
                    desc: "Service warranty and 100% satisfaction guarantee on all our work."
                  },
                ].map((point, i) => (
                  <div key={i} className="flex items-start space-x-4">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 bg-red-50 rounded-xl flex items-center justify-center text-xl sm:text-2xl">
                      {point.icon}
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">{point.title}</h3>
                      <p className="text-gray-600 text-sm sm:text-base leading-relaxed">{point.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 7: Our Achievements */}
      <section className="min-h-screen bg-gradient-to-r from-gray-900 to-black text-white flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              Our <span className="text-red-400">Achievements</span>
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto">
              Recognition and milestones that showcase our commitment to excellence
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {[
              { 
                icon: "🏆", 
                title: "Best Service Award", 
                year: "2024",
                desc: "Mumbai Auto Excellence Awards"
              },
              { 
                icon: "⭐", 
                title: "Customer Choice", 
                year: "2023", 
                desc: "Delhi Service Provider Awards"
              },
              { 
                icon: "💡", 
                title: "Innovation Award", 
                year: "2022",
                desc: "Bangalore Tech Innovation"
              },
              { 
                icon: "🌱", 
                title: "Green Business", 
                year: "2023",
                desc: "Eco-Friendly Service Certification"
              },
            ].map((achievement, i) => (
              <div key={i} className="bg-white/10 p-6 rounded-xl backdrop-blur-lg text-center hover:bg-white/20 transition-all duration-300">
                <div className="text-4xl mb-4">{achievement.icon}</div>
                <h3 className="text-lg font-bold mb-2">{achievement.title}</h3>
                <div className="text-red-400 font-semibold mb-2">{achievement.year}</div>
                <p className="text-gray-400 text-sm">{achievement.desc}</p>
              </div>
            ))}
          </div>

          {/* Key Numbers */}
          <div className="bg-white/10 p-8 sm:p-12 rounded-2xl backdrop-blur-lg">
            <h3 className="text-2xl sm:text-3xl font-bold mb-8 text-center">Key Numbers That Define Us</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8">
              {[
                { number: "99%", text: "Customer Satisfaction" },
                { number: "15min", text: "Average Response Time" },
                { number: "24/7", text: "Emergency Support" },
                { number: "100%", text: "Service Guarantee" },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-red-400 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-300 text-sm sm:text-base">
                    {stat.text}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section 8: Join Our Mission CTA */}
      <section className="min-h-screen bg-gradient-to-br from-red-50 via-white to-pink-50 flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Join Our <span className="text-red-600">Mission</span>
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Be part of India's fastest-growing doorstep bike service network
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Career Opportunities */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl border border-gray-100">
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 text-center">
                Career <span className="text-red-600">Opportunities</span>
              </h3>
              <div className="space-y-6">
                {[
                  { role: "Bike Mechanics", openings: "20+ Openings" },
                  { role: "Service Advisors", openings: "10+ Openings" },
                  { role: "Delivery Partners", openings: "15+ Openings" },
                  { role: "City Managers", openings: "5+ Openings" },
                ].map((job, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-red-50 rounded-lg">
                    <div>
                      <h4 className="font-bold text-gray-900">{job.role}</h4>
                      <p className="text-gray-600 text-sm">Multiple locations available</p>
                    </div>
                    <div className="text-red-600 font-semibold text-sm">
                      {job.openings}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8 text-center">
                <button className="bg-red-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors shadow-lg">
                  View All Jobs
                </button>
              </div>
            </div>

            {/* Partnership */}
            <div className="bg-gradient-to-br from-red-600 to-red-700 text-white p-6 sm:p-8 rounded-2xl shadow-xl">
              <h3 className="text-2xl sm:text-3xl font-bold mb-6 text-center">
                Partner With <span className="text-red-200">Us</span>
              </h3>
              <p className="text-red-100 text-center mb-8">
                Start your own doorstep bike service franchise in your city
              </p>
              
              <div className="space-y-4 mb-8">
                {[
                  "Low investment opportunity",
                  "Complete business support", 
                  "Proven business model",
                  "Marketing & branding support"
                ].map((benefit, i) => (
                  <div key={i} className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-red-200 rounded-full"></div>
                    <span className="text-red-100 text-sm">{benefit}</span>
                  </div>
                ))}
              </div>

              <div className="bg-white/10 p-4 rounded-xl mb-6 text-center">
                <div className="text-2xl font-bold">₹5-10L</div>
                <div className="text-red-200 text-sm">Investment Range</div>
              </div>

              <div className="text-center">
                <button className="bg-white text-red-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg">
                  Become Partner
                </button>
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div className="mt-16 bg-gradient-to-r from-gray-100 to-gray-50 p-8 sm:p-12 rounded-2xl text-center">
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
              Ready to Experience the <span className="text-red-600">Difference?</span>
            </h3>
            <p className="text-gray-600 text-base sm:text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied customers who trust us with their bike servicing needs
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-red-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors shadow-lg">
                Book Service Now
              </button>
              <button className="border-2 border-red-600 text-red-600 px-8 py-3 rounded-lg font-semibold hover:bg-red-50 transition-colors shadow-lg">
                Call +91 9876543210
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
