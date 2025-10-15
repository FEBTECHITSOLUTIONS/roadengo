// pages/AdminDashboard.jsx - COMPLETE BACKEND COMPATIBLE VERSION WITH AUTO-UPDATE (POLLING + VISIBILITY)
import React, { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { apiService, STATUS } from "../routing/apiClient";

const AdminDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [emergencies, setEmergencies] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [mechanics, setMechanics] = useState([]);
  const [activeTab, setActiveTab] = useState("appointments");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [showCreateMechanicModal, setShowCreateMechanicModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [stats, setStats] = useState({
    appointments: 0,
    emergencies: 0,
    inquiries: 0,
    pending: 0,
    mechanics: {
      total: 0,
      available: 0,
      busy: 0,
    },
  });

  const [newMechanic, setNewMechanic] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    specialization: [],
    experience: 0,
    location: {
      city: "",
    },
  });

  const navigate = useNavigate();

  // Stable fetch wrappers to use in polling/visibility handlers
  const fetchMechanics = useCallback(async () => {
    try {
      const response = await apiService.getMechanics();
      setMechanics(response.data || []);
      console.log("Mechanics fetched:", response.data?.length || 0);
    } catch (error) {
      console.error("Error fetching mechanics:", error);
      setMechanics([]);
    }
  }, []);

  const fetchAppointments = useCallback(async () => {
    try {
      const response = await apiService.getAppointments();
      setAppointments(response.data || []);
      console.log("Appointments fetched:", response.data?.length || 0);
    } catch (error) {
      console.error("Error fetching appointments:", error);
      setAppointments([]);
    }
  }, []);

  const fetchEmergencies = useCallback(async () => {
    try {
      const response = await apiService.getEmergencies();
      setEmergencies(response.data || []);
      console.log("Emergencies fetched:", response.data?.length || 0);
    } catch (error) {
      console.error("Error fetching emergencies:", error);
      setEmergencies([]);
    }
  }, []);

  const fetchInquiries = useCallback(async () => {
    try {
      const response = await apiService.getInquiries();
      setInquiries(response.data || []);
      console.log("Inquiries fetched:", response.data?.length || 0);
    } catch (error) {
      console.error("Error fetching inquiries:", error);
      setInquiries([]);
    }
  }, []);

  const fetchStats = useCallback(async () => {
    try {
      const response = await apiService.getDashboardStats();
      if (response.data) {
        setStats(response.data);
        console.log("Stats fetched:", response.data);
      }
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  }, []);

  const fetchAllData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      await Promise.all([
        fetchAppointments(),
        fetchEmergencies(),
        fetchInquiries(),
        fetchMechanics(),
        fetchStats(),
      ]);
    } catch (err) {
      console.error("Dashboard data loading error:", err);
      setError("Error loading dashboard data. Please refresh the page.");
    } finally {
      setLoading(false);
    }
  }, [fetchAppointments, fetchEmergencies, fetchInquiries, fetchMechanics, fetchStats]);

  // On mount: auth check + initial fetch
  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      console.log("No admin token found, redirecting to login");
      navigate("/admin/login");
      return;
    }
    fetchAllData();
  }, [navigate, fetchAllData]);

  // Auto-Update: Polling every 30s (pauses when tab hidden using visibility handler below)
  const POLL_MS = 30000;
  const intervalRef = useRef(null);
  const visibilityRef = useRef(document.visibilityState);

  const startPolling = useCallback(() => {
    if (intervalRef.current) return;
    intervalRef.current = setInterval(() => {
      console.log("Auto-updating dashboard data (polling)...");
      fetchAllData();
    }, POLL_MS);
  }, [fetchAllData]);

  const stopPolling = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  useEffect(() => {
    // Start immediately
    startPolling();

    const onVisibilityChange = () => {
      const state = document.visibilityState;
      visibilityRef.current = state;

      if (state === "visible") {
        // Immediate refresh when user returns
        console.log("Tab visible: immediate refresh");
        fetchAllData();
        startPolling();
      } else {
        // Pause polling when hidden
        console.log("Tab hidden: pause polling");
        stopPolling();
      }
    };

    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      stopPolling();
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, [startPolling, stopPolling, fetchAllData]);

  // Create New Mechanic - ENHANCED WITH VALIDATION
  const handleCreateMechanic = async (e) => {
    e.preventDefault();

    // Validation
    if (
      !newMechanic.name ||
      !newMechanic.email ||
      !newMechanic.phone ||
      !newMechanic.password
    ) {
      setError("Please fill in all required fields");
      return;
    }

    const isArray = Array.isArray(newMechanic.specialization);
    const specializationValid = isArray
      ? newMechanic.specialization.length > 0
      : Boolean(newMechanic.specialization);

    if (!specializationValid) {
      setError("Please select at least one specialization");
      return;
    }

    try {
      setLoading(true);
      // Normalize specialization to array for backend consistency
      const payload = {
        ...newMechanic,
        specialization: isArray
          ? newMechanic.specialization
          : [newMechanic.specialization],
      };
      await apiService.registerMechanic(payload);
      await fetchMechanics();
      setShowCreateMechanicModal(false);
      setNewMechanic({
        name: "",
        email: "",
        phone: "",
        password: "",
        specialization: [],
        experience: 0,
        location: { city: "" },
      });
      alert("✅ Mechanic created successfully!");
    } catch (error) {
      console.error("Error creating mechanic:", error);
      setError(
        `Failed to create mechanic: ${
          error.response?.data?.message || error.message
        }`
      );
    } finally {
      setLoading(false);
    }
  };

  // Assign Task to Mechanic - FIXED VERSION
  const handleAssignTask = async (mechanicId) => {
    try {
      setLoading(true);
      setError(null);

      console.log("Assigning task:", {
        mechanicId,
        taskId: selectedTask._id,
        taskType: selectedTask.taskType,
      });

      const result = await apiService.assignTask({
        mechanicId,
        taskId: selectedTask._id,
        taskType: selectedTask.taskType,
      });

      console.log("Assignment result:", result);

      alert("✅ Task assigned successfully!");
      await fetchAllData();
      setShowAssignModal(false);
      setSelectedTask(null);
    } catch (error) {
      console.error("Error assigning task:", error);
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to assign task";
      setError(`Assignment failed: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  const updateAppointmentStatus = async (id, status) => {
    try {
      setLoading(true);
      await apiService.updateAppointment(id, { status });
      await fetchAppointments();
      await fetchStats();
    } catch (error) {
      console.error("Error updating appointment:", error);
      setError("Failed to update appointment status");
    } finally {
      setLoading(false);
    }
  };

  const updateInquiryStatus = async (id, status) => {
    try {
      setLoading(true);
      await apiService.updateInquiry(id, { status });
      await fetchInquiries();
      await fetchStats();
    } catch (error) {
      console.error("Error updating inquiry:", error);
      setError("Failed to update inquiry status");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminData");
    navigate("/admin/login");
  };

  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleDateString("en-IN");
    } catch {
      return "Invalid Date";
    }
  };

  const formatDateTime = (dateString) => {
    try {
      return new Date(dateString).toLocaleString("en-IN");
    } catch {
      return "Invalid Date";
    }
  };

  // Enhanced Assign Modal Component
  const EnhancedAssignModal = () => {
    if (!showAssignModal || !selectedTask) return null;

    const getFilteredMechanics = () => {
      return mechanics
        .filter((mechanic) => {
          if (mechanic.availability !== "available") return false;

          const requiredSpecializations =
            selectedTask.taskType === "appointment"
              ? ["doorstep-service"]
              : ["emergency-repair"];

          const hasRequiredSkill = mechanic.specialization?.some((spec) =>
            requiredSpecializations.includes(spec)
          );

          return hasRequiredSkill;
        })
        .sort((a, b) => {
          if (b.rating !== a.rating) return (b.rating || 0) - (a.rating || 0);
          return (b.experience || 0) - (a.experience || 0);
        });
    };

    const filteredMechanics = getFilteredMechanics();

    return (
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
        <div className="relative top-20 mx-auto p-5 border w-5/6 max-w-4xl shadow-lg rounded-md bg-white">
          <div className="mt-3">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-medium text-gray-900">
                Assign Mechanic to Task
              </h3>
              <button
                onClick={() => {
                  setShowAssignModal(false);
                  setSelectedTask(null);
                  setError(null);
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Task Details Card */}
            <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-gray-900 mb-2">Task Details</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Type:</span>{" "}
                    {selectedTask.taskType?.toUpperCase()}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Service:</span>{" "}
                    {selectedTask.taskType === "appointment"
                      ? selectedTask.serviceType
                      : selectedTask.issueDescription}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Customer:</span>{" "}
                    {selectedTask.name}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Phone:</span>{" "}
                    {selectedTask.phone}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Location:</span>{" "}
                    {selectedTask.address || selectedTask.location}
                  </p>
                </div>
              </div>
            </div>

            {/* Error Display */}
            {error && (
              <div className="mb-4 bg-red-50 border border-red-200 rounded-lg p-3 flex items-start">
                <div className="text-red-500 mr-2 mt-0.5">⚠️</div>
                <div className="flex-1">
                  <p className="text-red-600 text-sm">{error}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setError(null)}
                  className="text-red-400 hover:text-red-600 ml-2"
                >
                  ×
                </button>
              </div>
            )}

            {/* Available Mechanics Grid */}
            <div className="mb-4">
              <h4 className="font-medium text-gray-900 mb-3">
                Available Mechanics ({filteredMechanics.length})
              </h4>

              {filteredMechanics.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-96 overflow-y-auto">
                  {filteredMechanics.map((mechanic) => (
                    <div
                      key={mechanic._id}
                      className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 hover:shadow-md cursor-pointer transition-all duration-200"
                      onClick={() => handleAssignTask(mechanic._id)}
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex-1">
                          <h5 className="font-semibold text-gray-900">
                            {mechanic.name}
                          </h5>
                          <p className="text-sm text-gray-600">
                            {mechanic.email}
                          </p>
                          <p className="text-sm text-gray-500">
                            {mechanic.phone}
                          </p>
                        </div>
                        <div className="flex flex-col items-end">
                          <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800 mb-1">
                            AVAILABLE
                          </span>
                          <div className="flex items-center">
                            <span className="text-yellow-400 text-sm">⭐</span>
                            <span className="ml-1 text-sm text-gray-600">
                              {mechanic.rating || 0}/5
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="mb-3">
                        <p className="text-sm text-gray-600 mb-1">
                          <span className="font-medium">Experience:</span>{" "}
                          {mechanic.experience} years
                        </p>
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">Location:</span>{" "}
                          {mechanic.location?.city}
                        </p>
                      </div>

                      <div className="mb-3">
                        <p className="text-sm text-gray-600 mb-1 font-medium">
                          Specializations:
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {mechanic.specialization?.map((spec, index) => (
                            <span
                              key={index}
                              className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800"
                            >
                              {spec.replace("-", " ")}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="text-sm text-gray-600">
                        <p>
                          Active Tasks:{" "}
                          {mechanic.assignedTasks?.filter(
                            (t) =>
                              t.status === "assigned" ||
                              t.status === "in-progress"
                          ).length || 0}
                        </p>
                        <p>Completed: {mechanic.completedTasks || 0}</p>
                      </div>

                      <div className="mt-3 pt-3 border-t border-gray-200">
                        <button
                          disabled={loading}
                          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md text-sm font-medium transition-colors disabled:opacity-50"
                        >
                          {loading ? "Assigning..." : "Assign This Mechanic"}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 bg-gray-50 rounded-lg">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 4 0z"
                    />
                  </svg>
                  <h3 className="mt-2 text-sm font-medium text-gray-900">
                    No Available Mechanics
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    No mechanics are currently available with the required
                    skills for this task.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Loading State
  if (loading && appointments.length === 0 && emergencies.length === 0) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-lg text-gray-600">Loading Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">🏍️ RoadEngo Admin</h1>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setActiveTab("mechanics")}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              Manage Mechanics
            </button>
            <button
              onClick={() => setShowCreateMechanicModal(true)}
              className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
            >
              Add Mechanic
            </button>
            <button
              onClick={() => navigate("/")}
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              View Website
            </button>
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 flex justify-between items-center">
            <span>{error}</span>
            <button
              onClick={() => setError(null)}
              className="text-red-500 hover:text-red-700"
            >
              ×
            </button>
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-600 mb-2">Appointments</h3>
            <p className="text-3xl font-bold text-blue-600">{appointments.length}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-600 mb-2">Emergency Requests</h3>
            <p className="text-3xl font-bold text-red-600">{emergencies.length}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-600 mb-2">Cart Inquiries</h3>
            <p className="text-3xl font-bold text-green-600">{inquiries.length}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-600 mb-2">Total Mechanics</h3>
            <p className="text-3xl font-bold text-purple-600">{mechanics.length}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-600 mb-2">Available Mechanics</h3>
            <p className="text-3xl font-bold text-green-600">
              {mechanics.filter((m) => m.availability === "available").length}
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <nav className="flex space-x-4">
            <button
              onClick={() => setActiveTab("appointments")}
              className={`px-6 py-3 rounded-lg font-semibold ${
                activeTab === "appointments"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              Appointments ({appointments.length})
            </button>
            <button
              onClick={() => setActiveTab("emergencies")}
              className={`px-6 py-3 rounded-lg font-semibold ${
                activeTab === "emergencies"
                  ? "bg-red-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              Emergencies ({emergencies.length})
            </button>
            <button
              onClick={() => setActiveTab("inquiries")}
              className={`px-6 py-3 rounded-lg font-semibold ${
                activeTab === "inquiries"
                  ? "bg-green-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              Cart Inquiries ({inquiries.length})
            </button>
            <button
              onClick={() => setActiveTab("mechanics")}
              className={`px-6 py-3 rounded-lg font-semibold ${
                activeTab === "mechanics"
                  ? "bg-purple-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              Mechanics ({mechanics.length})
            </button>
          </nav>
        </div>

        {/* Loading Indicator for Updates */}
        {loading && (
          <div className="fixed top-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg z-50">
            Updating...
          </div>
        )}

        {/* Mechanics Tab */}
        {activeTab === "mechanics" && (
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Mechanic Details
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Specialization
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Experience
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Availability
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tasks
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Rating
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {mechanics.map((mechanic) => (
                    <tr key={mechanic._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="font-semibold text-gray-900">
                            {mechanic.name}
                          </div>
                          <div className="text-sm text-gray-600">
                            {mechanic.email}
                          </div>
                          <div className="text-sm text-gray-500">
                            {mechanic.phone}
                          </div>
                          <div className="text-xs text-gray-400">
                            ID: {mechanic.mechanicId}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1">
                          {mechanic.specialization?.map((spec, index) => (
                            <span
                              key={index}
                              className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800"
                            >
                              {spec.replace("-", " ")}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {mechanic.experience} years
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            mechanic.availability === "available"
                              ? "bg-green-100 text-green-800"
                              : mechanic.availability === "busy"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {mechanic.availability?.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          Active:{" "}
                          {mechanic.assignedTasks?.filter(
                            (t) =>
                              t.status === "assigned" ||
                              t.status === "in-progress"
                          ).length || 0}
                        </div>
                        <div className="text-sm text-gray-500">
                          Completed: {mechanic.completedTasks || 0}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <span className="text-yellow-400">⭐</span>
                          <span className="ml-1 text-sm text-gray-900">
                            {mechanic.rating || 0}/5
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {mechanics.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No mechanics found. Create one to get started.
              </div>
            )}
          </div>
        )}

        {/* Appointments Tab */}
        {activeTab === "appointments" && (
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Service Details
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date & Time
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Assigned Mechanic
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {appointments.map((appointment) => (
                    <tr key={appointment._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="font-semibold text-gray-900">
                            {appointment.name}
                          </div>
                          <div className="text-sm text-gray-600">
                            {appointment.phone}
                          </div>
                          <div className="text-sm text-gray-500">
                            {appointment.email}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <div className="font-medium text-gray-900">
                            {appointment.serviceType}
                          </div>
                          <div className="text-sm text-gray-600">
                            {appointment.bikeModel}
                          </div>
                          <div className="text-sm text-gray-500 truncate max-w-xs">
                            {appointment.address}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {formatDate(appointment.serviceDate)}
                          </div>
                          <div className="text-sm text-gray-600">
                            {appointment.serviceTime}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            appointment.status === STATUS.PENDING
                              ? "bg-yellow-100 text-yellow-800"
                              : appointment.status === STATUS.CONFIRMED
                              ? "bg-blue-100 text-blue-800"
                              : appointment.status === STATUS.IN_PROGRESS
                              ? "bg-purple-100 text-purple-800"
                              : appointment.status === STATUS.COMPLETED
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {appointment.status?.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {appointment.assignedMechanic ? (
                          <div className="text-sm">
                            <div className="font-medium text-gray-900">
                              {mechanics.find(
                                (m) => m._id === appointment.assignedMechanic
                              )?.name || "Unknown"}
                            </div>
                            <div className="text-gray-500">Assigned</div>
                          </div>
                        ) : (
                          <span className="text-sm text-gray-500">
                            Not Assigned
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex flex-col space-y-2">
                          <select
                            value={appointment.status}
                            onChange={(e) =>
                              updateAppointmentStatus(
                                appointment._id,
                                e.target.value
                              )
                            }
                            disabled={loading}
                            className="border border-gray-300 rounded px-2 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
                          >
                            <option value={STATUS.PENDING}>Pending</option>
                            <option value={STATUS.CONFIRMED}>Confirmed</option>
                            <option value={STATUS.IN_PROGRESS}>
                              In Progress
                            </option>
                            <option value={STATUS.COMPLETED}>Completed</option>
                            <option value={STATUS.CANCELLED}>Cancelled</option>
                          </select>
                          {!appointment.assignedMechanic && (
                            <button
                              onClick={() => {
                                setSelectedTask({
                                  ...appointment,
                                  taskType: "appointment",
                                });
                                setShowAssignModal(true);
                                setError(null);
                              }}
                              disabled={loading}
                              className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded text-xs disabled:opacity-50"
                            >
                              Assign Mechanic
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {appointments.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No appointments found
              </div>
            )}
          </div>
        )}

        {/* Emergencies Tab */}
        {activeTab === "emergencies" && (
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Issue Details
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Location
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Assigned Mechanic
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {emergencies.map((emergency) => (
                    <tr key={emergency._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="font-semibold text-gray-900">
                            {emergency.name}
                          </div>
                          <div className="text-sm text-gray-600">
                            {emergency.phone}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <div className="font-medium text-gray-900">
                            {emergency.bikeModel}
                          </div>
                          <div className="text-sm text-gray-600 max-w-xs truncate">
                            {emergency.issueDescription}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900 max-w-xs truncate">
                          {emergency.location}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {emergency.assignedMechanic ? (
                          <div className="text-sm">
                            <div className="font-medium text-gray-900">
                              {mechanics.find(
                                (m) => m._id === emergency.assignedMechanic
                              )?.name || "Unknown"}
                            </div>
                            <div className="text-gray-500">Assigned</div>
                          </div>
                        ) : (
                          <span className="text-sm text-gray-500">
                            Not Assigned
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {!emergency.assignedMechanic && (
                          <button
                            onClick={() => {
                              setSelectedTask({
                                ...emergency,
                                taskType: "emergency",
                              });
                              setShowAssignModal(true);
                              setError(null);
                            }}
                            disabled={loading}
                            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-xs disabled:opacity-50"
                          >
                            Assign Mechanic
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {emergencies.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No emergency requests found
              </div>
            )}
          </div>
        )}

        {/* Cart Inquiries Tab */}
        {activeTab === "inquiries" && (
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Cart Items
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {inquiries.map((inquiry) => (
                    <tr key={inquiry._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="font-semibold text-gray-900">
                            {inquiry.name}
                          </div>
                          <div className="text-sm text-gray-600">
                            {inquiry.phone}
                          </div>
                          <div className="text-sm text-gray-500">
                            {inquiry.email}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="max-w-xs">
                          <div className="text-sm font-medium text-gray-900 mb-1">
                            {inquiry.itemCount} items
                          </div>
                          <div className="text-xs text-gray-600 space-y-1">
                            {inquiry.cartItems &&
                              inquiry.cartItems
                                .slice(0, 3)
                                .map((item, index) => (
                                  <div
                                    key={index}
                                    className="flex justify-between"
                                  >
                                    <span className="truncate mr-2">
                                      {item.name}
                                    </span>
                                    <span>x{item.quantity}</span>
                                  </div>
                                ))}
                            {inquiry.cartItems &&
                              inquiry.cartItems.length > 3 && (
                                <div className="text-gray-500">
                                  +{inquiry.cartItems.length - 3} more items...
                                </div>
                              )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-lg font-bold text-green-600">
                          ₹{inquiry.totalAmount}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            inquiry.status === STATUS.PENDING
                              ? "bg-yellow-100 text-yellow-800"
                              : inquiry.status === STATUS.CONTACTED
                              ? "bg-blue-100 text-blue-800"
                              : inquiry.status === STATUS.QUOTED
                              ? "bg-purple-100 text-purple-800"
                              : inquiry.status === STATUS.COMPLETED
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {inquiry.status?.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatDateTime(inquiry.createdAt)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex flex-col space-y-1">
                          <select
                            value={inquiry.status}
                            onChange={(e) =>
                              updateInquiryStatus(inquiry._id, e.target.value)
                            }
                            disabled={loading}
                            className="border border-gray-300 rounded px-2 py-1 text-xs focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:opacity-50"
                          >
                            <option value={STATUS.PENDING}>Pending</option>
                            <option value={STATUS.CONTACTED}>Contacted</option>
                            <option value={STATUS.QUOTED}>Quoted</option>
                            <option value={STATUS.COMPLETED}>Completed</option>
                            <option value={STATUS.CANCELLED}>Cancelled</option>
                          </select>
                          <button
                            onClick={() => {
                              const details = `
Customer: ${inquiry.name}
Phone: ${inquiry.phone}
Email: ${inquiry.email}
Address: ${inquiry.address}
${inquiry.message ? "Message: " + inquiry.message : ""}
Cart Items:
${
  inquiry.cartItems
    ?.map(
      (item) =>
        `- ${item.name} (${item.brand}) x${item.quantity} = ${item.price}`
    )
    .join("\n") || "No items"
}
Total: ₹${inquiry.totalAmount}
                              `.trim();
                              alert(details);
                            }}
                            className="text-xs text-blue-600 hover:text-blue-800 font-medium"
                          >
                            View Details
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {inquiries.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No cart inquiries found
              </div>
            )}
          </div>
        )}
      </div>

      {/* Create Mechanic Modal */}
      {showCreateMechanicModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-10 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Create New Mechanic
              </h3>
              <form onSubmit={handleCreateMechanic}>
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={newMechanic.name}
                        onChange={(e) =>
                          setNewMechanic({
                            ...newMechanic,
                            name: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter mechanic name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={newMechanic.email}
                        onChange={(e) =>
                          setNewMechanic({
                            ...newMechanic,
                            email: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter email address"
                      />
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone *
                      </label>
                      <input
                        type="tel"
                        required
                        pattern="[0-9]{10}"
                        maxLength="10"
                        value={newMechanic.phone}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, "");
                          setNewMechanic({ ...newMechanic, phone: value });
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter 10-digit phone number"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Password *
                      </label>
                      <input
                        type="password"
                        required
                        minLength="6"
                        value={newMechanic.password}
                        onChange={(e) =>
                          setNewMechanic({
                            ...newMechanic,
                            password: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter password (min 6 characters)"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Specialization *
                    </label>
                    <select
                      required
                      value={
                        Array.isArray(newMechanic.specialization)
                          ? newMechanic.specialization[0] || ""
                          : newMechanic.specialization || ""
                      }
                      onChange={(e) =>
                        setNewMechanic({
                          ...newMechanic,
                          specialization: e.target.value
                            ? [e.target.value]
                            : [],
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">-- Choose an option --</option>
                      <option value="emergency-repair">Emergency Repair</option>
                      <option value="doorstep-service">Doorstep Service</option>
                    </select>
                    <p className="text-xs text-gray-500 mt-1">
                      Selected:{" "}
                      {Array.isArray(newMechanic.specialization)
                        ? newMechanic.specialization.join(", ") || "None"
                        : newMechanic.specialization || "None"}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Experience (years)
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="50"
                      value={newMechanic.experience}
                      onChange={(e) =>
                        setNewMechanic({
                          ...newMechanic,
                          experience: parseInt(e.target.value) || 0,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Years of experience"
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        City
                      </label>
                      <input
                        type="text"
                        value={newMechanic.location.city}
                        onChange={(e) =>
                          setNewMechanic({
                            ...newMechanic,
                            location: {
                              ...newMechanic.location,
                              city: e.target.value,
                            },
                          })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="City"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex justify-end space-x-3 mt-6">
                  <button
                    type="button"
                    onClick={() => setShowCreateMechanicModal(false)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-md hover:bg-purple-700 disabled:opacity-50 transition-colors"
                  >
                    {loading ? "Creating..." : "Create Mechanic"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Enhanced Assign Modal */}
      <EnhancedAssignModal />
    </div>
  );
};

export default AdminDashboard;
