import React, { useState } from "react";

const EmergencyAssistance = ({ onBack }) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    location: "",
    issueDescription: "",
    bikeModel: "",
    urgencyLevel: "medium"
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const emergencyData = {
      ...formData,
      serviceCategory: "emergency",
      status: "urgent",
      requestTime: new Date()
    };

    try {
      const response = await fetch('http://localhost:5000/api/emergency', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emergencyData)
      });

      if (response.ok) {
        alert('Emergency request submitted! We will contact you within 5 minutes.');
        onBack();
      } else {
        alert('Failed to submit request. Please call our emergency number.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error submitting request. Please call directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-red-50 via-white to-orange-50 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <button
          onClick={onBack}
          className="mb-6 flex items-center text-red-600 hover:text-red-800 font-semibold"
        >
          ← Back to Services
        </button>

        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">🚨</div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Emergency <span className="text-red-600">Assistance</span>
            </h1>
            <p className="text-lg text-gray-600">
              Need immediate help? Fill this form and we'll reach you ASAP
            </p>
          </div>

          {/* Emergency Contact Banner */}
          <div className="bg-red-600 text-white p-6 rounded-2xl mb-8 text-center">
            <h3 className="text-2xl font-bold mb-2">For Immediate Help Call</h3>
            <a 
              href="tel:+919876543210"
              className="text-4xl font-bold hover:text-red-200 transition-colors"
            >
              +91 9876543210
            </a>
            <p className="mt-2 text-red-100">Available 24/7</p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Emergency Request Form
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-lg"
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  required
                  pattern="[0-9]{10}"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-lg"
                />
              </div>

              <textarea
                placeholder="Current Location (Be as specific as possible)"
                required
                rows="3"
                value={formData.location}
                onChange={(e) => setFormData({...formData, location: e.target.value})}
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-lg"
              />

              <input
                type="text"
                placeholder="Bike Model"
                required
                value={formData.bikeModel}
                onChange={(e) => setFormData({...formData, bikeModel: e.target.value})}
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-lg"
              />

              <div>
                <label className="block text-lg font-semibold text-gray-700 mb-2">
                  Urgency Level
                </label>
                <select
                  value={formData.urgencyLevel}
                  onChange={(e) => setFormData({...formData, urgencyLevel: e.target.value})}
                  className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-lg"
                >
                  <option value="low">Low - Can wait 1-2 hours</option>
                  <option value="medium">Medium - Need help within 30 minutes</option>
                  <option value="high">High - Immediate assistance required</option>
                </select>
              </div>

              <textarea
                placeholder="Describe the issue in detail"
                required
                rows="4"
                value={formData.issueDescription}
                onChange={(e) => setFormData({...formData, issueDescription: e.target.value})}
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-lg"
              />

              <div className="bg-red-50 p-6 rounded-lg border border-red-200">
                <h4 className="font-semibold text-red-900 mb-3 text-lg">Request Summary</h4>
                <div className="space-y-2 text-red-800">
                  <p><strong>Name:</strong> {formData.name || "Not provided"}</p>
                  <p><strong>Phone:</strong> {formData.phone || "Not provided"}</p>
                  <p><strong>Urgency:</strong> {formData.urgencyLevel.toUpperCase()}</p>
                  <p><strong>Bike:</strong> {formData.bikeModel || "Not provided"}</p>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-red-600 text-white py-4 rounded-lg font-semibold text-lg hover:bg-red-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Submitting Request..." : "Submit Emergency Request"}
              </button>
            </form>

            <div className="mt-6 text-center text-gray-600">
              <p>Expected response time: <strong>5-15 minutes</strong></p>
              <p className="text-sm mt-2">
                If this is a life-threatening emergency, please call 108 immediately
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmergencyAssistance;
