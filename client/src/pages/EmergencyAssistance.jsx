// pages/EmergencyAssistance.jsx - MOBILE RESPONSIVE COMPACT VERSION
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiService } from "../routing/apiClient";

const EmergencyAssistance = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    location: "",
    issueDescription: "",
    vehicleType: "",
    vehicleModel: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFetchingLocation, setIsFetchingLocation] = useState(false);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  // ✅ Popup States
  const [showVehiclePopup, setShowVehiclePopup] = useState(false);
  const [showModelPopup, setShowModelPopup] = useState(false);

  // ✅ Vehicle Types
  const vehicleTypes = {
    "2-wheeler": {
      name: "2-Wheeler",
      icon: "🏍️",
      models: [
        "Honda Activa",
        "Hero Splendor",
        "Royal Enfield Classic",
        "Yamaha FZ",
        "Bajaj Pulsar",
        "TVS Apache",
        "KTM Duke",
        "Suzuki Access",
        "Other",
      ],
    },
    "3-wheeler": {
      name: "3-Wheeler",
      icon: "🛺",
      models: [
        "Auto Rickshaw",
        "Bajaj RE",
        "Mahindra Alfa",
        "Piaggio Ape",
        "TVS King",
        "Force Trax",
        "Tempo Traveller",
        "Other",
      ],
    },
  };

  // Build address string from Nominatim response
  const formatAddressFromNominatim = (data) => {
    if (!data) return "";
    const a = data.address || {};
    const parts = [];

    if (a.house_number) parts.push(a.house_number);
    if (a.road) parts.push(a.road);
    if (a.neighbourhood) parts.push(a.neighbourhood);
    if (a.suburb) parts.push(a.suburb);
    if (a.city || a.town || a.village)
      parts.push(a.city || a.town || a.village);
    if (a.state_district) parts.push(a.state_district);
    if (a.state) parts.push(a.state);
    if (a.postcode) parts.push(a.postcode);
    if (a.country) parts.push(a.country);

    return parts.join(", ") || data.display_name || "";
  };

  // ✅ GPS Location function
  const fetchCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("❌ Geolocation not supported");
      return;
    }

    setIsFetchingLocation(true);

    const options = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 60000,
    };

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude, accuracy } = position.coords;

          const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1&zoom=18`;
          const response = await fetch(url, {
            headers: { Accept: "application/json" },
          });

          if (!response.ok) throw new Error(`HTTP ${response.status}`);

          const data = await response.json();
          const mainAddress =
            formatAddressFromNominatim(data) || "Address not found";

          const finalLocation = `${mainAddress}

📍 ${latitude.toFixed(6)}, ${longitude.toFixed(6)}
🎯 ${accuracy ? `${Math.round(accuracy)}m` : "Unknown"}`;

          setFormData((prev) => ({ ...prev, location: finalLocation }));
          alert(
            `📍 Location detected! Accuracy: ${
              accuracy ? Math.round(accuracy) + "m" : "Unknown"
            }`
          );
        } catch (err) {
          console.error("Geocoding failed:", err);
          const { latitude, longitude, accuracy } = position.coords;

          const fallback = `📍 ${latitude.toFixed(6)}, ${longitude.toFixed(6)}
🎯 ${accuracy ? `${Math.round(accuracy)}m` : "Unknown"}
⚠️ Address lookup failed`;

          setFormData((prev) => ({ ...prev, location: fallback }));
          alert("⚠️ Got coordinates but couldn't fetch address");
        } finally {
          setIsFetchingLocation(false);
        }
      },
      (error) => {
        console.error("Geolocation error:", error);
        let msg = "⚠️ Unable to fetch location";
        if (error.code === error.PERMISSION_DENIED) {
          msg = "⚠️ Location permission denied";
        } else if (error.code === error.POSITION_UNAVAILABLE) {
          msg = "⚠️ Location unavailable";
        } else if (error.code === error.TIMEOUT) {
          msg = "⏳ Location request timed out";
        }
        alert(msg);
        setIsFetchingLocation(false);
      },
      options
    );
  };

  // ✅ Handle Vehicle Type Selection
  const handleVehicleTypeSelect = (type) => {
    setFormData((prev) => ({ ...prev, vehicleType: type, vehicleModel: "" }));
    setShowVehiclePopup(false);
    setShowModelPopup(true);
    if (errors.bikeModel) setErrors((prev) => ({ ...prev, bikeModel: "" }));
  };

  // ✅ Handle Vehicle Model Selection
  const handleVehicleModelSelect = (model) => {
    setFormData((prev) => ({ ...prev, vehicleModel: model }));
    setShowModelPopup(false);
    if (errors.bikeModel) setErrors((prev) => ({ ...prev, bikeModel: "" }));
  };

  // ✅ Validation
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name required";
    else if (formData.name.trim().length < 2) newErrors.name = "Name too short";

    if (!formData.phone.trim()) newErrors.phone = "Phone required";
    else if (!/^[0-9]{10}$/.test(formData.phone.replace(/\D/g, "")))
      newErrors.phone = "Invalid phone number";

    if (!formData.location.trim()) newErrors.location = "Location required";
    else if (formData.location.trim().length < 10)
      newErrors.location = "Location too short";

    if (!formData.vehicleType) newErrors.bikeModel = "Vehicle type required";
    else if (!formData.vehicleModel.trim())
      newErrors.bikeModel = "Vehicle model required";

    if (!formData.issueDescription.trim())
      newErrors.issueDescription = "Issue description required";
    else if (formData.issueDescription.trim().length < 10)
      newErrors.issueDescription = "Description too short";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  // ✅ Submit function
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      alert("Please fill all required fields correctly");
      return;
    }

    setIsSubmitting(true);
    setSuccessMessage("");

    const emergencyData = {
      name: formData.name.trim(),
      phone: formData.phone.replace(/\D/g, ""),
      location: formData.location.trim(),
      bikeModel: `${vehicleTypes[formData.vehicleType]?.name} - ${
        formData.vehicleModel
      }`,
      issueDescription: formData.issueDescription.trim(),
    };

    try {
      const response = await apiService.createEmergency(emergencyData);
      if (response && response.data) {
        const emergency = response.data.emergency || response.data;
        setSuccessMessage(`✅ Emergency request submitted!
Request ID: ${emergency._id || "ER" + Date.now()}
Vehicle: ${vehicleTypes[formData.vehicleType].name} - ${formData.vehicleModel}
📞 We will contact you soon.`);

        setFormData({
          name: "",
          phone: "",
          location: "",
          issueDescription: "",
          vehicleType: "",
          vehicleModel: "",
        });

        setTimeout(() => navigate("/"), 4000);
      }
    } catch (error) {
      console.error("Emergency request error:", error);
      alert("❌ Failed to submit. Please try again or call +91 9876543210");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => navigate("/booking");

  // ✅ Compact Vehicle Type Popup
  const VehicleTypePopup = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl p-4 w-full max-w-sm relative">
        <button
          onClick={() => setShowVehiclePopup(false)}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-lg w-8 h-8 flex items-center justify-center"
        >
          ✕
        </button>

        <h3 className="text-lg font-bold text-center mb-4">
          Select Vehicle Type
        </h3>

        <div className="space-y-3">
          {Object.entries(vehicleTypes).map(([key, vehicle]) => (
            <div
              key={key}
              onClick={() => handleVehicleTypeSelect(key)}
              className="p-3 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all"
            >
              <div className="flex items-center space-x-3">
                <div className="text-2xl">{vehicle.icon}</div>
                <div>
                  <h4 className="font-semibold">{vehicle.name}</h4>
                  <p className="text-gray-600 text-xs">Tap to select</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // ✅ Compact Vehicle Model Popup
  const VehicleModelPopup = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl p-4 w-full max-w-sm relative max-h-80 overflow-y-auto">
        <button
          onClick={() => setShowModelPopup(false)}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-lg w-8 h-8 flex items-center justify-center"
        >
          ✕
        </button>

        <h3 className="text-lg font-bold text-center mb-4">
          Select{" "}
          {formData.vehicleType ? vehicleTypes[formData.vehicleType].name : ""}{" "}
          Model
        </h3>

        <div className="space-y-2">
          {formData.vehicleType &&
            vehicleTypes[formData.vehicleType].models.map((model) => (
              <div
                key={model}
                onClick={() => handleVehicleModelSelect(model)}
                className="p-2 border border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{model}</span>
                  <span className="text-blue-600 text-sm">→</span>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );

  // Success screen
  if (successMessage) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-green-50 p-4">
        <div className="bg-white p-6 rounded-xl shadow-xl text-center w-full max-w-md">
          <div className="text-4xl mb-3 animate-bounce">✅</div>
          <h2 className="text-xl font-bold text-green-800 mb-3">
            Request Submitted!
          </h2>
          <pre className="text-green-700 text-sm whitespace-pre-wrap mb-4">
            {successMessage}
          </pre>
          <button
            onClick={() => navigate("/")}
            className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-red-50 via-white to-orange-50 min-h-screen">
      <div className="container mx-auto px-3 py-4 sm:px-4 sm:py-6">
        <button
          onClick={handleBack}
          className="mb-4 flex items-center text-red-600 hover:text-red-800 font-semibold text-sm"
          disabled={isSubmitting}
        >
          ← Back to Services
        </button>

        <div className="max-w-lg mx-auto bg-white p-4 sm:p-6 rounded-xl shadow-lg">
          <div className="text-center mb-4">
            <h1 className="text-xl sm:text-2xl font-bold text-red-600">
              🚨 Emergency Assistance
            </h1>
            <p className="text-gray-600 text-sm">
              Need help? Fill this form quickly
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name + Phone in one line */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-sm mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className={`w-full p-3 border rounded-lg text-sm ${
                    errors.name ? "border-red-500 bg-red-50" : "border-gray-300"
                  }`}
                  disabled={isSubmitting}
                />
                {errors.name && (
                  <p className="text-red-600 text-xs mt-1">{errors.name}</p>
                )}
              </div>
              <div>
                <label className="block font-semibold text-sm mb-1">
                  Phone *
                </label>
                <input
                  type="tel"
                  placeholder="10-digit number"
                  value={formData.phone}
                  onChange={(e) =>
                    handleInputChange(
                      "phone",
                      e.target.value.replace(/\D/g, "")
                    )
                  }
                  className={`w-full p-3 border rounded-lg text-sm ${
                    errors.phone
                      ? "border-red-500 bg-red-50"
                      : "border-gray-300"
                  }`}
                  maxLength="10"
                  disabled={isSubmitting}
                />
                {errors.phone && (
                  <p className="text-red-600 text-xs mt-1">{errors.phone}</p>
                )}
              </div>
            </div>

        

            {/* Location */}
            <div>
              <label className="block font-semibold text-sm mb-1">
                Current Location *
              </label>
              <textarea
                rows="2"
                placeholder="Enter location or use GPS"
                value={formData.location}
                onChange={(e) => handleInputChange("location", e.target.value)}
                className={`w-full p-3 border rounded-lg text-sm ${
                  errors.location
                    ? "border-red-500 bg-red-50"
                    : "border-gray-300"
                }`}
                disabled={isSubmitting || isFetchingLocation}
              />
              {errors.location && (
                <p className="text-red-600 text-xs mt-1">{errors.location}</p>
              )}
              <button
                type="button"
                onClick={fetchCurrentLocation}
                disabled={isFetchingLocation || isSubmitting}
                className="mt-2 w-full flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition text-sm"
              >
                {isFetchingLocation ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Getting Location...
                  </>
                ) : (
                  <>📍 Use GPS Location</>
                )}
              </button>
            </div>

            {/* Vehicle Selection */}
            <div>
              <label className="block font-semibold text-sm mb-1">
                Vehicle Type & Model *
              </label>
              <div className="space-y-2">
                {/* Vehicle Type Button */}
                <button
                  type="button"
                  onClick={() => setShowVehiclePopup(true)}
                  disabled={isSubmitting}
                  className={`w-full p-3 border-2 rounded-lg text-left transition-all text-sm ${
                    formData.vehicleType
                      ? "border-green-500 bg-green-50"
                      : errors.bikeModel
                      ? "border-red-500 bg-red-50"
                      : "border-gray-300 hover:border-blue-300"
                  }`}
                >
                  {formData.vehicleType ? (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg">
                          {vehicleTypes[formData.vehicleType].icon}
                        </span>
                        <span className="font-medium">
                          {vehicleTypes[formData.vehicleType].name}
                        </span>
                      </div>
                      <span className="text-blue-600 text-xs">Change</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between text-gray-500">
                      <span>Select Vehicle Type</span>
                      <span>→</span>
                    </div>
                  )}
                </button>

                {/* Vehicle Model Button */}
                {formData.vehicleType && (
                  <button
                    type="button"
                    onClick={() => setShowModelPopup(true)}
                    disabled={isSubmitting}
                    className={`w-full p-3 border-2 rounded-lg text-left transition-all text-sm ${
                      formData.vehicleModel
                        ? "border-green-500 bg-green-50"
                        : errors.bikeModel
                        ? "border-red-500 bg-red-50"
                        : "border-gray-300 hover:border-blue-300"
                    }`}
                  >
                    {formData.vehicleModel ? (
                      <div className="flex items-center justify-between">
                        <span className="font-medium">
                          {formData.vehicleModel}
                        </span>
                        <span className="text-blue-600 text-xs">Change</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between text-gray-500">
                        <span>
                          Select {vehicleTypes[formData.vehicleType].name} Model
                        </span>
                        <span>→</span>
                      </div>
                    )}
                  </button>
                )}
              </div>
              {errors.bikeModel && (
                <p className="text-red-600 text-xs mt-1">{errors.bikeModel}</p>
              )}
            </div>

            {/* Issue Description */}
            <div>
              <label className="block font-semibold text-sm mb-1">
                Issue Description *
              </label>
              <textarea
                rows="3"
                placeholder="Describe the problem..."
                value={formData.issueDescription}
                onChange={(e) =>
                  handleInputChange("issueDescription", e.target.value)
                }
                className={`w-full p-3 border rounded-lg text-sm ${
                  errors.issueDescription
                    ? "border-red-500 bg-red-50"
                    : "border-gray-300"
                }`}
                disabled={isSubmitting}
              />
              {errors.issueDescription && (
                <p className="text-red-600 text-xs mt-1">
                  {errors.issueDescription}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-red-600 text-white py-3 rounded-lg font-bold text-sm hover:bg-red-700 transition-all"
            >
              {isSubmitting ? "Submitting..." : "🚨 Submit Emergency Request"}
            </button>
          </form>
        </div>
      </div>

      {/* Popups */}
      {showVehiclePopup && <VehicleTypePopup />}
      {showModelPopup && <VehicleModelPopup />}
    </div>
  );
};

export default EmergencyAssistance;
