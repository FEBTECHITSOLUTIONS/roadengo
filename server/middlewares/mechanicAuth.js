// middlewares/mechanicAuth.js
const jwt = require('jsonwebtoken');
const Mechanic = require('../models/Mechanic');

const mechanicAuth = async (req, res, next) => {
  try {
    console.log('Mechanic auth middleware called for:', req.path);
    
    const authHeader = req.header('Authorization');
    if (!authHeader) {
      console.log('No Authorization header found');
      return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    const token = authHeader.replace('Bearer ', '');
    if (!token) {
      console.log('No token found after Bearer');
      return res.status(401).json({ message: 'Access denied. Invalid token format.' });
    }

    console.log('Verifying mechanic token...');
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    console.log('Mechanic token decoded:', decoded);
    
    const mechanic = await Mechanic.findById(decoded.mechanicId).select('-password');
    
    if (!mechanic) {
      console.log('Mechanic not found with ID:', decoded.mechanicId);
      return res.status(401).json({ message: 'Invalid token. Mechanic not found.' });
    }
    
    if (!mechanic.isActive) {
      console.log('Mechanic account is inactive');
      return res.status(401).json({ message: 'Account is inactive.' });
    }

    req.mechanic = mechanic;
    console.log('Mechanic auth successful for:', mechanic.name);
    next();
  } catch (error) {
    console.error('Mechanic auth middleware error:', error.message);
    
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Invalid token.' });
    } else if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expired.' });
    } else {
      return res.status(401).json({ message: 'Token verification failed.' });
    }
  }
};

module.exports = mechanicAuth;
