// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();

// Middleware Configuration
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:5173'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// MongoDB Connection
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://satyaasingh001_db_user:mnXZCIGwc9g2vrJ2@roadengo.4zhnfav.mongodb.net/?retryWrites=true&w=majority&appName=Roadengo', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    
    // Create default admin if doesn't exist
    const Admin = require('./models/Admin');
    const existingAdmin = await Admin.findOne({ username: 'admin' });
    if (!existingAdmin) {
      const defaultAdmin = new Admin({
        username: 'admin',
        email: 'admin@roadengo.com',
        password: 'admin123'
      });
      await defaultAdmin.save();
      console.log('✅ Default admin created (admin/admin123)');
    }
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
};

connectDB();

// Import Routes
const authRoutes = require('./routes/auth');
const appointmentRoutes = require('./routes/appointments');
const emergencyRoutes = require('./routes/emergency');
const inquiryRoutes = require('./routes/inquiries');
const mechanicRoutes = require('./routes/mechanics');
const mechanicDashboardRoutes = require('./routes/mechanicDashboard');
const adminRoutes = require('./routes/admin');

// Use Routes
app.use('/api/auth', authRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/emergency', emergencyRoutes);
app.use('/api/inquiries', inquiryRoutes);
app.use('/api/mechanics', mechanicRoutes);
app.use('/api/mechanic-dashboard', mechanicDashboardRoutes);
app.use('/api/admin', adminRoutes);

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: '🏍️ RoadEngo API is running!',
    timestamp: new Date().toISOString(),
    endpoints: {
      auth: '/api/auth',
      appointments: '/api/appointments',
      emergency: '/api/emergency',
      inquiries: '/api/inquiries',
      mechanics: '/api/mechanics',
      mechanicDashboard: '/api/mechanic-dashboard',
      admin: '/api/admin'
    }
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('❌ Server Error:', err.stack);
  res.status(500).json({ 
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

// 404 Handler
app.use('*', (req, res) => {
  res.status(404).json({ 
    message: `Route ${req.originalUrl} not found`,
    availableRoutes: ['/api/health', '/api/auth', '/api/appointments', '/api/emergency', '/api/inquiries', '/api/mechanics', '/api/admin']
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📡 API URL: http://localhost:${PORT}/api`);
  console.log(`🏥 Health Check: http://localhost:${PORT}/api/health`);
  console.log(`👨‍💼 Default Admin: admin/admin123`);
});

module.exports = app;
