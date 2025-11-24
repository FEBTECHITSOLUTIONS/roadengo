// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser')
require('dotenv').config();

const app = express();
app.use(cookieParser())
// Middleware Configuration
app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:5173',
    'https://roadengo.vercel.app'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
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
const financesRouter = require('./routes/financesRouter.js');

// Use Routes
app.use('/api/auth', authRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/emergency', emergencyRoutes);
app.use('/api/inquiries', inquiryRoutes);
app.use('/api/mechanics', mechanicRoutes);
app.use('/api/mechanic-dashboard', mechanicDashboardRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/finances' , financesRouter)



// Global Error Handler
app.use((err, req, res, next) => {
  console.error('❌ Server Error:', err.stack);
  res.status(500).json({ 
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});



const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📡 API URL: http://localhost:${PORT}/api`);
  console.log(`🏥 Health Check: http://localhost:${PORT}/api/health`);
});

module.exports = app;
