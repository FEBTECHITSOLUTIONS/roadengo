const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');
const Emergency = require('../models/Emergency');
const authMiddleware = require('../middlewares/auth');

// Get dashboard stats
router.get('/dashboard', authMiddleware, async (req, res) => {
  try {
    const appointmentCount = await Appointment.countDocuments();
    const emergencyCount = await Emergency.countDocuments();
    const pendingAppointments = await Appointment.countDocuments({ status: 'pending' });
    const urgentEmergencies = await Emergency.countDocuments({ urgencyLevel: 'high' });

    res.json({
      appointments: appointmentCount,
      emergencies: emergencyCount,
      pending: pendingAppointments,
      urgent: urgentEmergencies
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching dashboard data', error: error.message });
  }
});

module.exports = router;
