// middlewares/auth.js
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

const authMiddleware = async (req, res, next) => {
  try {
    // console.log('Auth middleware called for:', req.path);
    
    const authHeader = req.header('Authorization') || req.cookies;
    // console.log(authHeader, 'authHeader cookie');
    
    if (!authHeader) {
      console.log('No Authorization header found');
      return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    const token = authHeader.replace('Bearer ', '');
    if (!token) {
      // console.log('No token found after Bearer');
      return res.status(401).json({ message: 'Access denied. Invalid token format.' });
    }

    // console.log('Verifying token...');
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    console.log('Token decoded:', decoded);
    
    const admin = await Admin.findById(decoded.adminId).select('-password');
    
    if (!admin) {
      console.log('Admin not found with ID:', decoded.adminId);
      return res.status(401).json({ message: 'Invalid token. Admin not found.' });
    }
    
    if (!admin.isActive) {
      console.log('Admin account is inactive');
      return res.status(401).json({ message: 'Account is inactive.' });
    }

    req.admin = admin;
    // console.log('Auth successful for admin:', admin.username);
    next();
  } catch (error) {
    console.error('Auth middleware error:', error.message);
    
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Invalid token.' });
    } else if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expired.' });
    } else {
      return res.status(401).json({ message: `Token verification failed. ${token}` });
    }
  }
};

module.exports = authMiddleware;
