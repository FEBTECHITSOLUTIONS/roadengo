// routes/admin.js
const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');
const Emergency = require('../models/Emergency');
const Inquiry = require('../models/Inquiry');
const Mechanic = require('../models/Mechanic');
const User = require('../models/User');
const authMiddleware = require('../middlewares/auth');

// Get Dashboard Statistics
router.get('/dashboard', authMiddleware, async (req, res) => {
  try {
    console.log('Fetching dashboard stats for admin:', req.admin.username);
    
    // Get date range for filtering (last 30 days by default)
    const { startDate, endDate } = req.query;
    let dateFilter = {};
    
    if (startDate || endDate) {
      dateFilter.createdAt = {};
      if (startDate) dateFilter.createdAt.$gte = new Date(startDate);
      if (endDate) dateFilter.createdAt.$lte = new Date(endDate);
    }

    try {
      // Get basic counts
      const [
        totalAppointments,
        totalEmergencies,
        totalInquiries,
        totalMechanics,
        totalUsers
      ] = await Promise.all([
        Appointment.countDocuments(dateFilter),
        Emergency.countDocuments(dateFilter),
        Inquiry.countDocuments(dateFilter),
        Mechanic.countDocuments({ isActive: true }),
        User.countDocuments({ isActive: true })
      ]);

      // Get status-based counts
      const [
        pendingAppointments,
        confirmedAppointments,
        inProgressAppointments,
        completedAppointments,
        cancelledAppointments
      ] = await Promise.all([
        Appointment.countDocuments({ ...dateFilter, status: 'pending' }),
        Appointment.countDocuments({ ...dateFilter, status: 'confirmed' }),
        Appointment.countDocuments({ ...dateFilter, status: 'in-progress' }),
        Appointment.countDocuments({ ...dateFilter, status: 'completed' }),
        Appointment.countDocuments({ ...dateFilter, status: 'cancelled' })
      ]);

      // Get emergency counts by urgency
      const [
        lowUrgencyEmergencies,
        mediumUrgencyEmergencies,
        highUrgencyEmergencies,
        criticalUrgencyEmergencies
      ] = await Promise.all([
        Emergency.countDocuments({ ...dateFilter, urgencyLevel: 'low' }),
        Emergency.countDocuments({ ...dateFilter, urgencyLevel: 'medium' }),
        Emergency.countDocuments({ ...dateFilter, urgencyLevel: 'high' }),
        Emergency.countDocuments({ ...dateFilter, urgencyLevel: 'critical' })
      ]);

      // Get inquiry status counts
      const [
        pendingInquiries,
        contactedInquiries,
        quotedInquiries,
        completedInquiries
      ] = await Promise.all([
        Inquiry.countDocuments({ ...dateFilter, status: 'pending' }),
        Inquiry.countDocuments({ ...dateFilter, status: 'contacted' }),
        Inquiry.countDocuments({ ...dateFilter, status: 'quoted' }),
        Inquiry.countDocuments({ ...dateFilter, status: 'completed' })
      ]);

      // Get mechanic availability counts
      const [
        availableMechanics,
        busyMechanics,
        offlineMechanics
      ] = await Promise.all([
        Mechanic.countDocuments({ isActive: true, availability: 'available' }),
        Mechanic.countDocuments({ isActive: true, availability: 'busy' }),
        Mechanic.countDocuments({ isActive: true, availability: 'offline' })
      ]);

      // Calculate totals for quick reference
      const totalActiveRequests = pendingAppointments + confirmedAppointments + inProgressAppointments;
      const urgentCases = highUrgencyEmergencies + criticalUrgencyEmergencies;
      
      // Revenue calculations (if needed)
      const completedAppointmentsWithCost = await Appointment.find({ 
        ...dateFilter, 
        status: 'completed',
        cost: { $gt: 0 }
      }).select('cost');
      
      const totalRevenue = completedAppointmentsWithCost.reduce((sum, apt) => sum + (apt.cost || 0), 0);

      const dashboardStats = {
        // Overview
        appointments: totalAppointments,
        emergencies: totalEmergencies,
        inquiries: totalInquiries,
        mechanics: totalMechanics,
        users: totalUsers,
        
        // Quick stats for cards
        pending: pendingAppointments,
        urgent: urgentCases,
        totalActiveRequests,
        totalRevenue,
        
        // Detailed breakdowns
        appointmentStats: {
          total: totalAppointments,
          pending: pendingAppointments,
          confirmed: confirmedAppointments,
          inProgress: inProgressAppointments,
          completed: completedAppointments,
          cancelled: cancelledAppointments
        },
        
        emergencyStats: {
          total: totalEmergencies,
          low: lowUrgencyEmergencies,
          medium: mediumUrgencyEmergencies,
          high: highUrgencyEmergencies,
          critical: criticalUrgencyEmergencies
        },
        
        inquiryStats: {
          total: totalInquiries,
          pending: pendingInquiries,
          contacted: contactedInquiries,
          quoted: quotedInquiries,
          completed: completedInquiries
        },
        
        mechanicStats: {
          total: totalMechanics,
          available: availableMechanics,
          busy: busyMechanics,
          offline: offlineMechanics
        },
        
        // Performance metrics
        completionRate: totalAppointments > 0 ? ((completedAppointments / totalAppointments) * 100).toFixed(1) : 0,
        averageResponseTime: null, // Can be calculated based on timestamps
        customerSatisfaction: null // Can be calculated from ratings
      };

      console.log('Dashboard stats calculated successfully');
      res.json(dashboardStats);
      
    } catch (statsError) {
      console.error('Error calculating dashboard stats:', statsError);
      
      // Return basic stats if detailed calculation fails
      const basicStats = {
        appointments: await Appointment.countDocuments().catch(() => 0),
        emergencies: await Emergency.countDocuments().catch(() => 0),
        inquiries: await Inquiry.countDocuments().catch(() => 0),
        pending: await Appointment.countDocuments({ status: 'pending' }).catch(() => 0),
        urgent: await Emergency.countDocuments({ urgencyLevel: { $in: ['high', 'critical'] } }).catch(() => 0),
        mechanics: {
          total: await Mechanic.countDocuments({ isActive: true }).catch(() => 0),
          available: await Mechanic.countDocuments({ availability: 'available' }).catch(() => 0),
          busy: await Mechanic.countDocuments({ availability: 'busy' }).catch(() => 0)
        }
      };
      
      res.json(basicStats);
    }
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    res.status(500).json({ 
      message: 'Error fetching dashboard data', 
      error: error.message 
    });
  }
});

// Get Recent Activities
router.get('/recent-activities', authMiddleware, async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 20;
    
    // Get recent appointments
    const recentAppointments = await Appointment.find()
      .populate('assignedMechanic', 'name mechanicId')
      .sort({ updatedAt: -1 })
      .limit(Math.floor(limit / 3))
      .select('name status serviceType updatedAt assignedMechanic');
    
    // Get recent emergencies
    const recentEmergencies = await Emergency.find()
      .populate('assignedMechanic', 'name mechanicId')
      .sort({ updatedAt: -1 })
      .limit(Math.floor(limit / 3))
      .select('name status urgencyLevel updatedAt assignedMechanic');
    
    // Get recent inquiries
    const recentInquiries = await Inquiry.find()
      .sort({ updatedAt: -1 })
      .limit(Math.floor(limit / 3))
      .select('name status totalAmount updatedAt');
    
    // Combine and format activities
    const activities = [
      ...recentAppointments.map(apt => ({
        id: apt._id,
        type: 'appointment',
        title: `Appointment - ${apt.serviceType}`,
        customer: apt.name,
        status: apt.status,
        mechanic: apt.assignedMechanic?.name || null,
        timestamp: apt.updatedAt
      })),
      ...recentEmergencies.map(emg => ({
        id: emg._id,
        type: 'emergency',
        title: `Emergency - ${emg.urgencyLevel} priority`,
        customer: emg.name,
        status: emg.status,
        mechanic: emg.assignedMechanic?.name || null,
        timestamp: emg.updatedAt
      })),
      ...recentInquiries.map(inq => ({
        id: inq._id,
        type: 'inquiry',
        title: `Inquiry - ₹${inq.totalAmount}`,
        customer: inq.name,
        status: inq.status,
        mechanic: null,
        timestamp: inq.updatedAt
      }))
    ];
    
    // Sort by timestamp and limit
    activities.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    
    res.json(activities.slice(0, limit));
  } catch (error) {
    console.error('Error fetching recent activities:', error);
    res.status(500).json({ 
      message: 'Error fetching recent activities', 
      error: error.message 
    });
  }
});

// Get Performance Metrics
router.get('/metrics', authMiddleware, async (req, res) => {
  try {
    const { period = '30' } = req.query; // days
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - parseInt(period));
    
    const dateFilter = { createdAt: { $gte: startDate } };
    
    // Calculate various metrics
    const [
      totalBookings,
      completedBookings,
      totalRevenue,
      averageRating,
      responseTime
    ] = await Promise.all([
      Appointment.countDocuments(dateFilter),
      Appointment.countDocuments({ ...dateFilter, status: 'completed' }),
      Appointment.aggregate([
        { $match: { ...dateFilter, status: 'completed' } },
        { $group: { _id: null, total: { $sum: '$cost' } } }
      ]),
      Appointment.aggregate([
        { $match: { ...dateFilter, rating: { $exists: true, $ne: null } } },
        { $group: { _id: null, avg: { $avg: '$rating' } } }
      ]),
      // Calculate average response time for emergencies
      Emergency.aggregate([
        { 
          $match: { 
            ...dateFilter, 
            actualArrival: { $exists: true },
            createdAt: { $exists: true }
          } 
        },
        {
          $project: {
            responseTime: {
              $divide: [
                { $subtract: ['$actualArrival', '$createdAt'] },
                60000 // Convert to minutes
              ]
            }
          }
        },
        { $group: { _id: null, avg: { $avg: '$responseTime' } } }
      ])
    ]);
    
    const metrics = {
      period: `${period} days`,
      totalBookings,
      completedBookings,
      completionRate: totalBookings > 0 ? ((completedBookings / totalBookings) * 100).toFixed(1) : 0,
      totalRevenue: totalRevenue[0]?.total || 0,
      averageRating: averageRating[0]?.avg ? averageRating[0].avg.toFixed(1) : null,
      averageResponseTime: responseTime[0]?.avg ? Math.round(responseTime[0].avg) : null
    };
    
    res.json(metrics);
  } catch (error) {
    console.error('Error fetching metrics:', error);
    res.status(500).json({ 
      message: 'Error fetching performance metrics', 
      error: error.message 
    });
  }
});

module.exports = router;
