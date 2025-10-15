// context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check authentication status on app load
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const adminToken = localStorage.getItem('adminToken');
      const mechanicToken = localStorage.getItem('mechanicToken');
      const adminData = localStorage.getItem('adminData');
      const mechanicData = localStorage.getItem('mechanicData');
      
      if (adminToken && adminData) {
        try {
          const parsedAdminData = JSON.parse(adminData);
          setUser({ ...parsedAdminData, userType: 'admin' });
          setIsAuthenticated(true);
          console.log('✅ Admin authenticated from localStorage');
        } catch (parseError) {
          console.error('Error parsing admin data:', parseError);
          await logout();
        }
      } else if (mechanicToken && mechanicData) {
        try {
          const parsedMechanicData = JSON.parse(mechanicData);
          setUser({ ...parsedMechanicData, userType: 'mechanic' });
          setIsAuthenticated(true);
          console.log('✅ Mechanic authenticated from localStorage');
        } catch (parseError) {
          console.error('Error parsing mechanic data:', parseError);
          await logout();
        }
      } else {
        console.log('❌ No authentication tokens found');
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error('Auth check error:', error);
      await logout();
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials, userType = 'admin') => {
    try {
      setLoading(true);
      
      const endpoint = userType === 'admin' 
        ? 'http://localhost:5000/api/auth/login' 
        : 'http://localhost:5000/api/mechanics/login';
      
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials)
      });

      const data = await response.json();

      if (response.ok && data) {
        const token = data.token;
        const userData = data.admin || data.mechanic || data.user;
        
        if (token && userData) {
          // Store tokens and user data
          if (userType === 'admin') {
            localStorage.setItem('adminToken', token);
            localStorage.setItem('adminData', JSON.stringify(userData));
          } else {
            localStorage.setItem('mechanicToken', token);
            localStorage.setItem('mechanicData', JSON.stringify(userData));
          }
          
          setUser({ ...userData, userType });
          setIsAuthenticated(true);
          
          console.log(`✅ ${userType} login successful`);
          return { success: true, user: userData, userType };
        } else {
          throw new Error('Invalid response format - missing token or user data');
        }
      } else {
        throw new Error(data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      return { 
        success: false, 
        message: error.message || 'Login failed. Please try again.' 
      };
    } finally {
      setLoading(false);
    }
  };

  const logout = async (userType = null) => {
    try {
      // Clear all storage
      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminData');
      localStorage.removeItem('mechanicToken');
      localStorage.removeItem('mechanicData');
      
      // Clear state
      setUser(null);
      setIsAuthenticated(false);
      
      console.log('✅ Logged out successfully');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    logout,
    checkAuthStatus
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
