// pages/AdminLogin.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { apiService } from "../routing/apiClient";

const AdminLogin = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  // Check if already logged in
  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (token) {
      console.log("Admin already logged in, redirecting to dashboard");
      navigate("/admin/dashboard", { replace: true });
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Basic validation
    if (!credentials.username.trim() || !credentials.password.trim()) {
      setError("Please fill in all fields");
      setIsLoading(false);
      return;
    }

    try {
      console.log("🔍 Attempting admin login with:", {
        username: credentials.username,
      });

      const response = await apiService.adminLogin(credentials);
      console.log("🔍 Login response received:", response);

      if (response && response.data) {
        const { token, admin } = response.data;

        if (token && admin) {
          // Store authentication data
          localStorage.setItem("adminToken", token);
          localStorage.setItem("adminData", JSON.stringify(admin));

          console.log("✅ Admin login successful, stored data");

          // Redirect to intended page or dashboard
          const from = location.state?.from?.pathname || "/admin/dashboard";
          navigate(from, { replace: true });
        } else {
          throw new Error(
            "Invalid response format - missing token or admin data"
          );
        }
      } else {
        throw new Error("Invalid response format");
      }
    } catch (error) {
      console.error("❌ Admin login error:", error);

      let errorMessage = "Login failed. Please try again.";

      if (error.response) {
        const status = error.response.status;
        const data = error.response.data;

        switch (status) {
          case 400:
            errorMessage = "Please provide valid username and password";
            break;
          case 401:
            errorMessage =
              "Invalid credentials. Please check your username and password.";
            break;
          case 403:
            errorMessage = "Access denied. Admin privileges required.";
            break;
          case 404:
            errorMessage = "Login service not found. Please contact support.";
            break;
          case 500:
            errorMessage = "Server error. Please try again later.";
            break;
          default:
            errorMessage = data?.message || `Server error (${status})`;
        }
      } else if (error.request) {
        errorMessage = "Network error. Please check your connection.";
      } else {
        errorMessage = error.message || "An unexpected error occurred.";
      }

      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setCredentials((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear error when user starts typing
    if (error) setError("");
  };

  const fillDemoCredentials = () => {
    setCredentials({
      username: "admin",
      password: "admin123",
    });
    setError("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="text-4xl mb-4">🏍️</div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Admin <span className="text-blue-600">Login</span>
            </h1>
            <p className="text-gray-600">Access your RoadEngo dashboard</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Username
              </label>
              <input
                type="text"
                required
                value={credentials.username}
                onChange={(e) => handleInputChange("username", e.target.value)}
                placeholder="Enter your username"
                disabled={isLoading}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 disabled:opacity-50"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                required
                value={credentials.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                placeholder="Enter your password"
                disabled={isLoading}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 disabled:opacity-50"
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-start">
                <div className="text-red-500 mr-2 mt-0.5">⚠️</div>
                <div className="flex-1">
                  <p className="text-red-600 text-sm">{error}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setError("")}
                  className="text-red-400 hover:text-red-600 ml-2"
                >
                  ×
                </button>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={
                isLoading || !credentials.username || !credentials.password
              }
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Signing In...
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          {/* Navigation */}
          <div className="mt-6 text-center">
            <button
              onClick={() => navigate("/")}
              disabled={isLoading}
              className="text-blue-600 hover:text-blue-800 font-medium transition-colors disabled:text-gray-400"
            >
              ← Back to Home
            </button>
          </div>

          {/* Additional Links */}
          <div className="mt-4 text-center">
            <p className="text-xs text-gray-500">
              Need mechanic access?{" "}
              <button
                onClick={() => navigate("/mechanic/login")}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Mechanic Login
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
