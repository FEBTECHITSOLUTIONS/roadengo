import React, { useState, useEffect } from "react";
import { apiService, SERVICE_TYPES } from "../routing/apiClient";

const DoorstepService = ({ onBack }) => {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [availableSlots, setAvailableSlots] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [currentStep, setCurrentStep] = useState(1);
  const [showVehiclePopup, setShowVehiclePopup] = useState(false);
  const [showModelPopup, setShowModelPopup] = useState(false);
  const [apiError, setApiError] = useState(null); // API error state
  const [isOfflineMode, setIsOfflineMode] = useState(false); // Offline mode
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    bikeModel: "",
    vehicleType: "",
    vehicleModel: "",
    serviceType: "",
    additionalNotes: ""
  });

  // Vehicle types with models
  const vehicleTypes = {
    "2-wheeler": {
      name: "2-Wheeler",
      icon: "🏍️",
      models: [
        "Honda Activa 6G", "TVS Jupiter", "Bajaj Pulsar 150", "Hero Splendor Plus",
        "Royal Enfield Classic 350", "KTM Duke 200", "Yamaha FZ-S", "Suzuki Gixxer",
        "Hero Xtreme 160R", "Bajaj Dominar 400", "Honda CB Shine", "TVS Apache RTR 160",
        "Hero Passion Pro", "Bajaj Platina 110", "Honda Unicorn 160", "Yamaha MT-15",
        "TVS Ntorq 125", "Hero Maestro Edge", "Honda Dio", "Suzuki Access 125",
        "Bajaj Chetak Electric", "Ather 450X", "TVS iQube Electric", "Hero Electric Optima",
        "Other (Please specify in notes)"
      ]
    },
    "3-wheeler": {
      name: "3-Wheeler", 
      icon: "🛺",
      models: [
        "Bajaj RE Compact", "Mahindra Treo", "TVS King", "Piaggio Ape Auto",
        "Bajaj Maxima C", "Force Trax Cruiser", "Mahindra Alfa Plus", "TVS King Deluxe",
        "Bajaj Qute", "Mahindra Jeeto", "Piaggio Ape City", "Force Motors Minidor",
        "Mahindra Treo Zor", "Bajaj Qute Electric", "Piaggio Ape E-City", "TVS King Electric",
        "Other (Please specify in notes)"
      ]
    }
  };

  // Default time slots - fallback when API fails
  const defaultTimeSlots = [
    "09:00", "10:00", "11:00", "12:00", 
    "14:00", "15:00", "16:00", "17:00", "18:00"
  ];

  const serviceTypes = [
    { value: SERVICE_TYPES.GENERAL_SERVICE, label: "General Service", icon: "🔧", desc: "Complete vehicle checkup" },
    { value: SERVICE_TYPES.OIL_CHANGE, label: "Oil Change", icon: "🛢️", desc: "Engine oil replacement" },
    { value: SERVICE_TYPES.BRAKE_SERVICE, label: "Brake Service", icon: "🛑", desc: "Brake pads & fluid check" },
    { value: SERVICE_TYPES.CHAIN_CLEANING, label: "Chain Cleaning", icon: "⛓️", desc: "Chain lubrication & cleaning" },
    { value: SERVICE_TYPES.COMPLETE_OVERHAUL, label: "Complete Overhaul", icon: "🔄", desc: "Full vehicle restoration" },
    { value: SERVICE_TYPES.MAINTENANCE, label: "Regular Maintenance", icon: "⚙️", desc: "Routine maintenance" },
    { value: SERVICE_TYPES.INSPECTION, label: "Inspection", icon: "🔍", desc: "Safety inspection" }
  ];

  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  const getMaxDate = () => {
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 30);
    return maxDate.toISOString().split('T')[0];
  };

  useEffect(() => {
    if (selectedDate) {
      fetchAvailableSlots(selectedDate);
    }
  }, [selectedDate]);

  // Enhanced error handling for API calls
  const fetchAvailableSlots = async (date) => {
    try {
      setApiError(null); // Clear previous errors
      
      // Check if apiService exists and has the method
      if (!apiService || typeof apiService.getAvailableSlots !== 'function') {
        console.warn('API service not available, using default slots');
        setAvailableSlots(defaultTimeSlots);
        setIsOfflineMode(true);
        return;
      }

      const response = await apiService.getAvailableSlots(date);
      
      if (response && response.data && response.data.slots) {
        setAvailableSlots(response.data.slots);
        setIsOfflineMode(false);
      } else {
        // API returned but no slots data
        console.warn('API returned empty slots, using default');
        setAvailableSlots(defaultTimeSlots);
        setIsOfflineMode(true);
      }
    } catch (error) {
      console.error('Error fetching available slots:', error);
      
      // Enhanced error handling based on error type
      if (error.code === 'NETWORK_ERROR' || error.message?.includes('Network Error')) {
        setApiError('🌐 Network connection issue. Using offline mode.');
        setIsOfflineMode(true);
      } else if (error.response?.status === 500) {
        setApiError('⚠️ Server temporarily unavailable. Using default slots.');
        setIsOfflineMode(true);
      } else if (error.response?.status === 404) {
        setApiError('📅 Slot data not found. Using default availability.');
        setIsOfflineMode(true);
      } else {
        setApiError('⚠️ Unable to load live slots. Using default times.');
        setIsOfflineMode(true);
      }
      
      // Always provide fallback slots
      setAvailableSlots(defaultTimeSlots);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name too short";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone required";
    } else if (!/^[0-9]{10}$/.test(formData.phone)) {
      newErrors.phone = "Invalid phone number";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Address required";
    } else if (formData.address.trim().length < 10) {
      newErrors.address = "Address too short";
    }

    if (!formData.vehicleType || !formData.vehicleModel) {
      newErrors.bikeModel = "Vehicle type and model required";
    }

    if (!formData.serviceType) {
      newErrors.serviceType = "Service type required";
    }

    if (!selectedDate) {
      newErrors.date = "Date required";
    }

    if (!selectedTime) {
      newErrors.time = "Time slot required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ""
      }));
    }
  };

  const handleVehicleTypeSelect = (type) => {
    setFormData(prev => ({
      ...prev,
      vehicleType: type,
      vehicleModel: "",
      bikeModel: `${vehicleTypes[type].name}`
    }));
    setShowVehiclePopup(false);
    
    if (errors.bikeModel) {
      setErrors(prev => ({ ...prev, bikeModel: "" }));
    }
  };

  const handleVehicleModelSelect = (model) => {
    setFormData(prev => ({
      ...prev,
      vehicleModel: model,
      bikeModel: `${vehicleTypes[prev.vehicleType].name} - ${model}`
    }));
    setShowModelPopup(false);
    
    if (errors.bikeModel) {
      setErrors(prev => ({ ...prev, bikeModel: "" }));
    }
  };

  // Enhanced submit with better error handling
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    const appointmentData = {
      ...formData,
      serviceDate: selectedDate,
      serviceTime: selectedTime,
      serviceCategory: "doorstep",
      status: "pending",
      requestTime: new Date().toISOString(),
      isOfflineBooking: isOfflineMode // Flag for offline bookings
    };

    try {
      // Check if API service is available
      if (!apiService || typeof apiService.createAppointment !== 'function') {
        // Offline mode - store locally and show success
        localStorage.setItem('pendingBooking', JSON.stringify(appointmentData));
        setSuccessMessage(`✅ Booking saved locally!
        
📱 Your appointment will be confirmed once we're back online.
📅 Date: ${selectedDate}
🕒 Time: ${selectedTime}
🔧 Service: ${serviceTypes.find(s => s.value === formData.serviceType)?.label}

📞 We'll call you for confirmation within 2 hours.`);
        
        resetForm();
        return;
      }

      const response = await apiService.createAppointment(appointmentData);
      
      if (response && response.data) {
        setSuccessMessage(`✅ Appointment booked successfully!
        
🆔 Booking ID: ${response.data._id || Math.random().toString(36).substr(2, 9)}
📅 Date: ${selectedDate}
🕒 Time: ${selectedTime}
🔧 Service: ${serviceTypes.find(s => s.value === formData.serviceType)?.label}

📞 We'll call you 30 minutes before your appointment.`);
        
        resetForm();
      }
    } catch (error) {
      console.error('Appointment booking error:', error);
      
      // Enhanced error handling for different scenarios
      let errorMessage = '';
      
      if (error.code === 'NETWORK_ERROR' || error.message?.includes('Network Error')) {
        // Network error - save locally
        localStorage.setItem('pendingBooking', JSON.stringify(appointmentData));
        setSuccessMessage(`📱 Booking saved offline!
        
⚠️ Network connection issue detected.
📅 Date: ${selectedDate}
🕒 Time: ${selectedTime}

📞 We'll confirm your appointment once connection is restored.`);
        resetForm();
        return;
      } else if (error.response) {
        switch (error.response.status) {
          case 400:
            errorMessage = '❌ Invalid booking data. Please check all fields.';
            break;
          case 409:
            errorMessage = '⏰ Selected time slot is no longer available. Please choose another time.';
            setSelectedTime(""); // Clear selected time
            break;
          case 500:
            errorMessage = '🔧 Server temporarily unavailable. Your booking has been saved and we\'ll confirm it shortly.';
            // Save locally as backup
            localStorage.setItem('pendingBooking', JSON.stringify(appointmentData));
            break;
          default:
            errorMessage = '⚠️ Booking failed. Please try again or call us directly.';
        }
      } else {
        errorMessage = '🌐 Connection error. Booking saved locally for confirmation.';
        localStorage.setItem('pendingBooking', JSON.stringify(appointmentData));
      }
      
      alert(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      phone: "",
      email: "",
      address: "",
      bikeModel: "",
      vehicleType: "",
      vehicleModel: "",
      serviceType: "",
      additionalNotes: ""
    });
    setSelectedDate("");
    setSelectedTime("");
    setCurrentStep(1);

    setTimeout(() => {
      onBack();
    }, 4000);
  };

  const nextStep = () => {
    if (currentStep === 1 && formData.name && formData.phone && formData.email) {
      setCurrentStep(2);
    } else if (currentStep === 2 && formData.address && formData.vehicleType && formData.vehicleModel && formData.serviceType) {
      setCurrentStep(3);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Vehicle Type Popup
  const VehicleTypePopup = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full max-h-[80vh] overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-gray-900">Select Vehicle Type</h3>
            <button
              onClick={() => setShowVehiclePopup(false)}
              className="text-gray-500 hover:text-gray-700 text-2xl"
            >
              ×
            </button>
          </div>
        </div>
        <div className="p-4 space-y-3 max-h-96 overflow-y-auto">
          {Object.entries(vehicleTypes).map(([key, type]) => (
            <button
              key={key}
              onClick={() => handleVehicleTypeSelect(key)}
              className="w-full p-4 border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all text-left"
            >
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{type.icon}</span>
                <div>
                  <div className="font-semibold text-gray-900">{type.name}</div>
                  <div className="text-sm text-gray-600">{type.models.length} models available</div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  // Vehicle Model Popup
  const VehicleModelPopup = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full max-h-[80vh] overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-gray-900">
              Select {vehicleTypes[formData.vehicleType]?.name} Model
            </h3>
            <button
              onClick={() => setShowModelPopup(false)}
              className="text-gray-500 hover:text-gray-700 text-2xl"
            >
              ×
            </button>
          </div>
        </div>
        <div className="p-4 space-y-2 max-h-96 overflow-y-auto">
          {vehicleTypes[formData.vehicleType]?.models.map((model) => (
            <button
              key={model}
              onClick={() => handleVehicleModelSelect(model)}
              className="w-full p-3 text-left border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all"
            >
              <div className="font-medium text-gray-900">{model}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  // Success screen
  if (successMessage) {
    return (
      <div className="bg-gradient-to-br from-green-50 via-white to-emerald-50 min-h-screen flex items-center justify-center p-4">
        <div className="max-w-md mx-auto bg-white p-6 rounded-xl shadow-lg text-center">
          <div className="text-4xl mb-3">✅</div>
          <h2 className="text-xl font-bold text-green-800 mb-3">Booking Confirmed!</h2>
          <div className="bg-green-50 p-3 rounded-lg mb-4">
            <pre className="text-xs text-green-700 whitespace-pre-wrap">{successMessage}</pre>
          </div>
          <p className="text-gray-600 text-sm mb-3">Redirecting back...</p>
          <button
            onClick={onBack}
            className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm"
          >
            Back to Services
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-indigo-50 min-h-screen">
      <div className="px-4 py-6 sm:px-6 sm:py-8 md:px-8 lg:container lg:mx-auto">
        <button
          onClick={onBack}
          className="mb-4 flex items-center text-blue-600 hover:text-blue-800 font-semibold transition-colors text-sm"
          disabled={isSubmitting}
        >
          ← Back to Services
        </button>

        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <div className="text-4xl mb-4">🏠</div>
            <h1 className="text-2xl font-bold text-gray-900 mb-3 leading-tight sm:text-3xl lg:text-4xl">
              <span className="text-blue-600">Doorstep Service</span>
            </h1>
            <p className="text-sm text-gray-600 leading-relaxed sm:text-base">
              We'll come to your location
            </p>
            
            {/* API Status Indicator */}
            {isOfflineMode && (
              <div className="mt-3 bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                <p className="text-yellow-800 text-xs">
                  📱 Offline Mode: Bookings will be confirmed manually
                </p>
              </div>
            )}
            
            {apiError && (
              <div className="mt-3 bg-blue-50 border border-blue-200 rounded-lg p-3">
                <p className="text-blue-800 text-xs">{apiError}</p>
              </div>
            )}
          </div>

          {/* Progress Steps */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center space-x-2">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                    currentStep >= step ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                  }`}>
                    {step}
                  </div>
                  {step < 3 && (
                    <div className={`w-8 h-0.5 ${currentStep > step ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow-lg">
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Step 1: Personal Info */}
              {currentStep === 1 && (
                <div className="space-y-5">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                    👤 Personal Information
                  </h3>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <input
                        type="text"
                        placeholder="Full Name *"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className={`w-full p-4 border-2 rounded-xl text-sm ${
                          errors.name ? 'border-red-500 bg-red-50' : 'border-gray-300'
                        }`}
                      />
                      {errors.name && <p className="text-red-600 text-xs mt-1">{errors.name}</p>}
                    </div>

                    <div>
                      <input
                        type="tel"
                        placeholder="Phone *"
                        maxLength="10"
                        value={formData.phone}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, '');
                          handleInputChange('phone', value);
                        }}
                        className={`w-full p-4 border-2 rounded-xl text-sm ${
                          errors.phone ? 'border-red-500 bg-red-50' : 'border-gray-300'
                        }`}
                      />
                      {errors.phone && <p className="text-red-600 text-xs mt-1">{errors.phone}</p>}
                    </div>
                  </div>

                  <div>
                    <input
                      type="email"
                      placeholder="Email Address *"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className={`w-full p-4 border-2 rounded-xl text-sm ${
                        errors.email ? 'border-red-500 bg-red-50' : 'border-gray-300'
                      }`}
                    />
                    {errors.email && <p className="text-red-600 text-xs mt-1">{errors.email}</p>}
                  </div>

                  <button
                    type="button"
                    onClick={nextStep}
                    disabled={!formData.name || !formData.phone || !formData.email}
                    className="w-full bg-blue-600 text-white py-4 rounded-xl font-semibold hover:bg-blue-700 disabled:bg-gray-400 transition-all transform active:scale-95 text-base"
                  >
                    Next: Service Details →
                  </button>
                </div>
              )}

              {/* Step 2: Service Details */}
              {currentStep === 2 && (
                <div className="space-y-5">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                    🔧 Service Details
                  </h3>

                  <div>
                    <textarea
                      placeholder="Complete Address (Include landmarks) *"
                      rows="3"
                      value={formData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      className={`w-full p-4 border-2 rounded-xl text-sm ${
                        errors.address ? 'border-red-500 bg-red-50' : 'border-gray-300'
                      }`}
                    />
                    {errors.address && <p className="text-red-600 text-xs mt-1">{errors.address}</p>}
                  </div>

                  {/* Vehicle Type & Model Selection */}
                  <div>
                    <label className="block font-semibold text-sm mb-2">
                      Vehicle Type & Model *
                    </label>
                    <div className="space-y-3">
                      <button
                        type="button"
                        onClick={() => setShowVehiclePopup(true)}
                        disabled={isSubmitting}
                        className={`w-full p-4 border-2 rounded-xl text-left transition-all text-sm ${
                          formData.vehicleType
                            ? "border-green-500 bg-green-50"
                            : errors.bikeModel
                            ? "border-red-500 bg-red-50"
                            : "border-gray-300 hover:border-blue-300"
                        }`}
                      >
                        {formData.vehicleType ? (
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <span className="text-xl">
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

                      {formData.vehicleType && (
                        <button
                          type="button"
                          onClick={() => setShowModelPopup(true)}
                          disabled={isSubmitting}
                          className={`w-full p-4 border-2 rounded-xl text-left transition-all text-sm ${
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

                  <div>
                    <p className="text-sm font-semibold mb-3">Select Service Type *</p>
                    <div className="grid grid-cols-1 gap-3 max-h-64 overflow-y-auto">
                      {serviceTypes.map((service) => (
                        <div
                          key={service.value}
                          onClick={() => handleInputChange('serviceType', service.value)}
                          className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${
                            formData.serviceType === service.value
                              ? 'border-blue-500 bg-blue-50'
                              : 'border-gray-200 hover:border-blue-300'
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            <span className="text-lg">{service.icon}</span>
                            <div>
                              <p className="font-semibold text-sm">{service.label}</p>
                              <p className="text-xs text-gray-600">{service.desc}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    {errors.serviceType && <p className="text-red-600 text-xs mt-1">{errors.serviceType}</p>}
                  </div>

                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={prevStep}
                      className="flex-1 bg-gray-200 text-gray-700 py-4 rounded-xl font-semibold hover:bg-gray-300 transition-all transform active:scale-95 text-base"
                    >
                      ← Back
                    </button>
                    <button
                      type="button"
                      onClick={nextStep}
                      disabled={!formData.address || !formData.vehicleType || !formData.vehicleModel || !formData.serviceType}
                      className="flex-1 bg-blue-600 text-white py-4 rounded-xl font-semibold hover:bg-blue-700 disabled:bg-gray-400 transition-all transform active:scale-95 text-base"
                    >
                      Next: Date & Time →
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Date & Time */}
              {currentStep === 3 && (
                <div className="space-y-5">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                    📅 Select Date & Time
                  </h3>

                  <div>
                    <label className="block text-sm font-semibold mb-2">Select Date *</label>
                    <input
                      type="date"
                      min={getTodayDate()}
                      max={getMaxDate()}
                      value={selectedDate}
                      onChange={(e) => {
                        setSelectedDate(e.target.value);
                        setSelectedTime("");
                        if (errors.date) {
                          setErrors(prev => ({ ...prev, date: "" }));
                        }
                      }}
                      className={`w-full p-4 border-2 rounded-xl text-sm ${
                        errors.date ? 'border-red-500 bg-red-50' : 'border-gray-300'
                      }`}
                    />
                    {errors.date && <p className="text-red-600 text-xs mt-1">{errors.date}</p>}
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-sm font-semibold">Available Time Slots</p>
                      {isOfflineMode && (
                        <span className="text-xs text-yellow-600 bg-yellow-100 px-2 py-1 rounded">
                          Default Times
                        </span>
                      )}
                    </div>
                    {selectedDate ? (
                      <div className="grid grid-cols-3 gap-3">
                        {availableSlots.map((time) => (
                          <button
                            key={time}
                            type="button"
                            onClick={() => {
                              setSelectedTime(time);
                              if (errors.time) {
                                setErrors(prev => ({ ...prev, time: "" }));
                              }
                            }}
                            className={`p-3 rounded-xl border-2 transition-all text-sm font-medium ${
                              selectedTime === time
                                ? "bg-blue-600 text-white border-blue-600"
                                : "bg-gray-50 text-gray-700 border-gray-200 hover:border-blue-300"
                            }`}
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500 text-center py-8 text-sm">
                        Please select a date first
                      </p>
                    )}
                    {errors.time && <p className="text-red-600 text-xs mt-1">{errors.time}</p>}
                  </div>

                  <div>
                    <textarea
                      placeholder="Additional Notes (Optional)"
                      rows="3"
                      value={formData.additionalNotes}
                      onChange={(e) => handleInputChange('additionalNotes', e.target.value)}
                      className="w-full p-4 border-2 border-gray-300 rounded-xl text-sm"
                    />
                  </div>

                  {/* Booking Summary */}
                  <div className="bg-blue-50 p-4 rounded-xl border-2 border-blue-200">
                    <h4 className="font-semibold text-blue-900 mb-3 text-sm">📋 Booking Summary</h4>
                    <div className="space-y-1 text-blue-800 text-xs">
                      <p><strong>Name:</strong> {formData.name}</p>
                      <p><strong>Phone:</strong> {formData.phone}</p>
                      <p><strong>Vehicle:</strong> {formData.bikeModel}</p>
                      <p><strong>Date:</strong> {selectedDate}</p>
                      <p><strong>Time:</strong> {selectedTime}</p>
                      <p><strong>Service:</strong> {
                        serviceTypes.find(s => s.value === formData.serviceType)?.label
                      }</p>
                      {isOfflineMode && (
                        <p className="text-yellow-700 font-medium">⚡ Offline booking - manual confirmation</p>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={prevStep}
                      className="flex-1 bg-gray-200 text-gray-700 py-4 rounded-xl font-semibold hover:bg-gray-300 transition-all transform active:scale-95 text-base"
                    >
                      ← Back
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting || !selectedDate || !selectedTime}
                      className="flex-1 bg-blue-600 text-white py-4 rounded-xl font-semibold hover:bg-blue-700 disabled:bg-gray-400 transition-all transform active:scale-95 text-base flex items-center justify-center"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Booking...
                        </>
                      ) : (
                        '📅 Book Appointment'
                      )}
                    </button>
                  </div>
                </div>
              )}
            </form>

            <div className="mt-6 text-center">
              <div className="bg-gray-50 p-4 rounded-xl">
                <p className="text-xs text-gray-600 mb-1">
                  <strong>📞 Confirmation:</strong> We'll call you {isOfflineMode ? 'within 2 hours' : '30 minutes before'}
                </p>
                <p className="text-xs text-gray-600">
                  <strong>🕒 Duration:</strong> Typically 45-90 minutes
                </p>
                {isOfflineMode && (
                  <p className="text-xs text-yellow-600 mt-1">
                    <strong>📱 Offline Mode:</strong> Booking will be manually processed
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Vehicle Type Popup */}
      {showVehiclePopup && <VehicleTypePopup />}

      {/* Vehicle Model Popup */}
      {showModelPopup && <VehicleModelPopup />}
    </div>
  );
};

export default DoorstepService;
