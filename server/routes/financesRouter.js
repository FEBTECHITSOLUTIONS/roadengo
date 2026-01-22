// routes/financesRouter.js
const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');
const Emergency = require('../models/Emergency');

// ✅ GET ALL COMPLETED BOOKINGS ONLY
router.get('/allbookings', async (req, res) => {
  try {
    // Fetch only COMPLETED appointments - sorted by completedAt (latest first)
    const appointments = await Appointment.find({ status: 'completed' })
      .populate('assignedMechanic', 'name email phone')
      .sort({ 
        completedAt: -1,  // Latest completed first
        createdAt: -1      // Then by creation date
      })
      .lean();
    
    // Fetch only COMPLETED emergencies - sorted by completedAt (latest first)
    const emergencies = await Emergency. find({ status: 'completed' })
      .populate('assignedMechanic', 'name email phone')
      .sort({ 
        completedAt: -1,  // Latest completed first
        createdAt: -1      // Then by creation date
      })
      .lean();
    
    console.log(`✅ Fetched ${appointments.length} completed appointments`);
    console.log(`✅ Fetched ${emergencies.length} completed emergencies`);
    
    res.status(200).json({
      success: true,
      data: {
        appointments,
        emergencies,
        total: appointments.length + emergencies. length
      }
    });
  } catch (error) {
    console.error('Error fetching completed bookings:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching bookings',
      error: error.message
    });
  }
});

module.exports = router;