// routes/auth.js
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

// Admin Login
router.post('/login', async (req, res) => {
  try {
    console.log('Login attempt:', req.body);
    const { username, password } = req.body;

    // Validation
    if (!username || !password) {
      return res.status(400).json({ 
        message: 'Username and password are required',
        received: { username: !!username, password: !!password }
      });
    }

    // Find admin by username or email
    const admin = await Admin.findOne({ 
      $or: [
        { username: username.toLowerCase() }, 
        { email: username.toLowerCase() }
      ],
      isActive: true 
    });

    console.log('Admin found:', admin ? admin.username : 'Not found');

    if (!admin) {
      return res.status(401).json({ 
        message: 'Invalid credentials. Please check your username and password.' 
      });
    }

    // Check password
    const isPasswordValid = await admin.comparePassword(password);
    console.log('Password valid:', isPasswordValid);
    
    if (!isPasswordValid) {
      return res.status(401).json({ 
        message: 'Invalid credentials. Please check your username and password.' 
      });
    }

    // Update last login
    admin.lastLogin = new Date();
    await admin.save();

    // Generate JWT token
    const token = jwt.sign(
      { 
        adminId: admin._id, 
        username: admin.username,
        role: admin.role 
      },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    console.log('Login successful for:', admin.username);
    const option = {
       httpOnly:true,
        secure:false,
        expires:new Date(Date.now() + 24*60*60*1000),
        sameSite:'strict',
    }
    res
    .cookie('accessToken' , token , option)
    .json({
      message: 'Login successful',
      token,
      admin: {
        id: admin._id,
        username: admin.username,
        email: admin.email,
        role: admin.role,
        lastLogin: admin.lastLogin
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ 
      message: 'Error during login', 
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error' 
    });
  }
});

// Create Admin (Development only)
router.post('/create-admin', async (req, res) => {
  try {
    if (process.env.NODE_ENV === 'production') {
      return res.status(403).json({ message: 'Admin creation disabled in production' });
    }

    const { username, email, password } = req.body;

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ 
      $or: [{ username }, { email }] 
    });

    if (existingAdmin) {
      return res.status(400).json({ message: 'Admin with this username or email already exists' });
    }

    const admin = new Admin({
      username: username || 'admin',
      email: email || 'admin@roadengo.com',
      password: password || 'admin123'
    });

    await admin.save();
    
    res.status(201).json({ 
      message: 'Admin created successfully',
      admin: {
        username: admin.username,
        email: admin.email
      }
    });
  } catch (error) {
    console.error('Admin creation error:', error);
    res.status(500).json({ 
      message: 'Error creating admin', 
      error: error.message 
    });
  }
});

// Logout
router.post('/logout', (req, res) => {
  res.json({ message: 'Logged out successfully' });
});

module.exports = router;
