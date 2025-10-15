// routing/apiClient.js - VITE COMPATIBLE VERSION
import axios from 'axios';

// Base URL Configuration - FIXED FOR VITE
const BASE_URL = import.meta.env.VITE_API_URL || 'https://roadengo.parrotconsult.com/api';

// Create Axios Instance
const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor
apiClient.interceptors.request.use(
  (config) => {
    console.log('🔄 API Request:', config.method?.toUpperCase(), config.url);
    
    const adminToken = localStorage.getItem('adminToken');
    const mechanicToken = localStorage.getItem('mechanicToken');
    
    // Add appropriate token based on route
    if (config.url?.includes('/admin') || 
        config.url?.includes('/appointments') || 
        config.url?.includes('/emergencies') || 
        config.url?.includes('/inquiries') ||
        config.url?.includes('/mechanics')) {
      if (adminToken) {
        config.headers.Authorization = `Bearer ${adminToken}`;
      }
    }
    else if (config.url?.includes('/mechanic-dashboard')) {
      if (mechanicToken) {
        config.headers.Authorization = `Bearer ${mechanicToken}`;
      }
    }
    else {
      const token = adminToken || mechanicToken;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    
    return config;
  },
  (error) => {
    console.error('❌ Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Response Interceptor - FIXED NO AUTO LOGOUT FOR ASSIGNMENT ERRORS
apiClient.interceptors.response.use(
  (response) => {
    console.log('✅ API Response:', response.status, response.config.url);
    return response;
  },
  (error) => {
    console.error('❌ API Error:', {
      status: error.response?.status,
      url: error.config?.url,
      message: error.response?.data?.message || error.message
    });
    
    // Handle 401 errors appropriately - NO AUTO LOGOUT FOR ASSIGNMENT ERRORS
    if (error.response?.status === 401) {
      const currentUrl = error.config?.url;
      
      // Only logout for authentication-related 401s, not assignment failures
      const isAuthenticationError = currentUrl?.includes('/auth/') || 
                                   currentUrl?.includes('/dashboard') ||
                                   currentUrl?.includes('/stats') ||
                                   currentUrl?.includes('/login');
      
      if (isAuthenticationError) {
        console.log('🔐 Authentication error detected, clearing tokens');
        
        // Clear tokens
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminData');
        localStorage.removeItem('mechanicToken');
        localStorage.removeItem('mechanicData');
        
        // Redirect to appropriate login page
        setTimeout(() => {
          if (currentUrl?.includes('/mechanic')) {
            window.location.href = '/mechanic/login';
          } else {
            window.location.href = '/admin/login';
          }
        }, 1000);
      } else {
        console.log('⚠️ Non-authentication 401 error (like assignment failure), not redirecting');
      }
    }
    
    return Promise.reject(error);
  }
);

// API Endpoints
export const API_ENDPOINTS = {
  // Health Check
  HEALTH: '/health',
  
  // Authentication
  ADMIN_LOGIN: '/auth/login',
  CREATE_ADMIN: '/auth/create-admin',
  LOGOUT: '/auth/logout',
  
  // Admin Dashboard
  ADMIN_DASHBOARD: '/admin/dashboard',
  ADMIN_METRICS: '/admin/metrics',
  ADMIN_ACTIVITIES: '/admin/recent-activities',
  
  // Appointments
  APPOINTMENTS: '/appointments',
  APPOINTMENT_BY_ID: (id) => `/appointments/${id}`,
  CREATE_APPOINTMENT: '/appointments',
  AVAILABLE_SLOTS: '/appointments/available-slots',
  
  // Emergency Services
  EMERGENCY: '/emergency',
  EMERGENCY_BY_ID: (id) => `/emergency/${id}`,
  CREATE_EMERGENCY: '/emergency',
  
  // Inquiries
  INQUIRIES: '/inquiries',
  INQUIRY_BY_ID: (id) => `/inquiries/${id}`,
  CREATE_INQUIRY: '/inquiries',
  
  // Mechanics
  MECHANICS: '/mechanics',
  MECHANIC_LOGIN: '/mechanics/login',
  MECHANIC_REGISTER: '/mechanics/register',
  AVAILABLE_MECHANICS: '/mechanics/available',
  ASSIGN_TASK: '/mechanics/assign-task',
  
  // Mechanic Dashboard
  MECHANIC_DASHBOARD: '/mechanic-dashboard/stats',
  MECHANIC_TASKS: '/mechanic-dashboard/tasks',
  UPDATE_TASK_STATUS: (taskId) => `/mechanic-dashboard/tasks/${taskId}/status`,
  UPDATE_MECHANIC_LOCATION: '/mechanic-dashboard/location',
  GET_ROUTE_INFO: (taskId) => `/mechanic-dashboard/route/${taskId}`,
  UPDATE_AVAILABILITY: '/mechanic-dashboard/availability',
};

// API Service Functions
export const apiService = {
  // Health Check
  healthCheck: () => apiClient.get(API_ENDPOINTS.HEALTH),
  
  // Authentication
  adminLogin: (credentials) => apiClient.post(API_ENDPOINTS.ADMIN_LOGIN, credentials),
  createAdmin: (adminData) => apiClient.post(API_ENDPOINTS.CREATE_ADMIN, adminData),
  logout: () => apiClient.post(API_ENDPOINTS.LOGOUT),
  
  // Appointments
  getAppointments: (params) => apiClient.get(API_ENDPOINTS.APPOINTMENTS, { params }),
  getAppointmentById: (id) => apiClient.get(API_ENDPOINTS.APPOINTMENT_BY_ID(id)),
  createAppointment: (data) => apiClient.post(API_ENDPOINTS.CREATE_APPOINTMENT, data),
  updateAppointment: (id, data) => apiClient.patch(API_ENDPOINTS.APPOINTMENT_BY_ID(id), data),
  deleteAppointment: (id) => apiClient.delete(API_ENDPOINTS.APPOINTMENT_BY_ID(id)),
  getAvailableSlots: (date) => apiClient.get(`${API_ENDPOINTS.AVAILABLE_SLOTS}?date=${date}`),
  
  // Emergency Services
  getEmergencies: (params) => apiClient.get(API_ENDPOINTS.EMERGENCY, { params }),
  getEmergencyById: (id) => apiClient.get(API_ENDPOINTS.EMERGENCY_BY_ID(id)),
  createEmergency: (data) => apiClient.post(API_ENDPOINTS.CREATE_EMERGENCY, data),
  updateEmergency: (id, data) => apiClient.patch(API_ENDPOINTS.EMERGENCY_BY_ID(id), data),
  deleteEmergency: (id) => apiClient.delete(API_ENDPOINTS.EMERGENCY_BY_ID(id)),
  
  // Inquiries
  getInquiries: (params) => apiClient.get(API_ENDPOINTS.INQUIRIES, { params }),
  getInquiryById: (id) => apiClient.get(API_ENDPOINTS.INQUIRY_BY_ID(id)),
  createInquiry: (data) => apiClient.post(API_ENDPOINTS.CREATE_INQUIRY, data),
  updateInquiry: (id, data) => apiClient.patch(API_ENDPOINTS.INQUIRY_BY_ID(id), data),
  deleteInquiry: (id) => apiClient.delete(API_ENDPOINTS.INQUIRY_BY_ID(id)),
  
  // Dashboard Stats
  getDashboardStats: (params) => apiClient.get(API_ENDPOINTS.ADMIN_DASHBOARD, { params }),
  getAdminMetrics: (params) => apiClient.get(API_ENDPOINTS.ADMIN_METRICS, { params }),
  getRecentActivities: (params) => apiClient.get(API_ENDPOINTS.ADMIN_ACTIVITIES, { params }),
  
  // Mechanic Management (Admin)
  getMechanics: (params) => apiClient.get(API_ENDPOINTS.MECHANICS, { params }),
  registerMechanic: (data) => apiClient.post(API_ENDPOINTS.MECHANIC_REGISTER, data),
  getAvailableMechanics: (params) => apiClient.get(API_ENDPOINTS.AVAILABLE_MECHANICS, { params }),
  assignTask: (data) => apiClient.post(API_ENDPOINTS.ASSIGN_TASK, data),
  updateMechanic: (id, data) => apiClient.patch(`${API_ENDPOINTS.MECHANICS}/${id}`, data),
  deleteMechanic: (id) => apiClient.delete(`${API_ENDPOINTS.MECHANICS}/${id}`),
  
  // Mechanic Authentication
  mechanicLogin: (credentials) => apiClient.post(API_ENDPOINTS.MECHANIC_LOGIN, credentials),
  
  // Mechanic Dashboard
  getMechanicDashboard: () => apiClient.get(API_ENDPOINTS.MECHANIC_DASHBOARD),
  getMechanicTasks: (params) => apiClient.get(API_ENDPOINTS.MECHANIC_TASKS, { params }),
  updateTaskStatus: (taskId, data) => apiClient.patch(API_ENDPOINTS.UPDATE_TASK_STATUS(taskId), data),
  updateMechanicLocation: (data) => apiClient.post(API_ENDPOINTS.UPDATE_MECHANIC_LOCATION, data),
  getRouteInfo: (taskId, taskType) => apiClient.get(`${API_ENDPOINTS.GET_ROUTE_INFO(taskId)}?taskType=${taskType}`),
  updateAvailability: (data) => apiClient.patch(API_ENDPOINTS.UPDATE_AVAILABILITY, data),
};

// Status Constants
export const STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  IN_PROGRESS: 'in-progress',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
  CONTACTED: 'contacted',
  QUOTED: 'quoted',
  ASSIGNED: 'assigned',
};

// Urgency Levels
export const URGENCY_LEVELS = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  CRITICAL: 'critical',
};

// Service Types
export const SERVICE_TYPES = {
  BIKE_SERVICE: 'bike-service',
  EMERGENCY_REPAIR: 'emergency-repair',
  DOORSTEP_SERVICE: 'doorstep-service',
  PARTS_REPLACEMENT: 'parts-replacement',
  MAINTENANCE: 'maintenance',
  INSPECTION: 'inspection',
  GENERAL_SERVICE: 'general-service',
  OIL_CHANGE: 'oil-change',
  BRAKE_SERVICE: 'brake-service',
  CHAIN_CLEANING: 'chain-cleaning',
  COMPLETE_OVERHAUL: 'complete-overhaul',
};

// Mechanic Availability Status
export const MECHANIC_STATUS = {
  AVAILABLE: 'available',
  BUSY: 'busy',
  OFFLINE: 'offline',
};

// Task Types
export const TASK_TYPES = {
  APPOINTMENT: 'appointment',
  EMERGENCY: 'emergency',
  INQUIRY: 'inquiry',
};

// Order Status
export const ORDER_STATUS = {
  PLACED: 'placed',
  PROCESSING: 'processing',
  CONFIRMED: 'confirmed',
  SHIPPED: 'shipped',
  OUT_FOR_DELIVERY: 'out-for-delivery',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled',
  RETURNED: 'returned',
};

// Payment Status
export const PAYMENT_STATUS = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  COMPLETED: 'completed',
  FAILED: 'failed',
  REFUNDED: 'refunded',
  CANCELLED: 'cancelled',
};

// User Roles
export const USER_ROLES = {
  ADMIN: 'admin',
  MANAGER: 'manager',
  CUSTOMER: 'customer',
  MECHANIC: 'mechanic',
  SUPPORT: 'support',
};

// HTTP Status Codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};

export default apiClient;
