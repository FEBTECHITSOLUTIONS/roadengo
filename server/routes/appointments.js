// routes/appointments.js
const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');
const authMiddleware = require('../middlewares/auth');

// Get all appointments (Admin only)
router.get('/', authMiddleware, async (req, res) => {
  try {
    console.log('Fetching appointments for admin:', req.admin.username);
    
    const { status, startDate, endDate, mechanic } = req.query;
    let query = {};
    
    // Apply filters
    if (status) query.status = status;
    if (mechanic) query.assignedMechanic = mechanic;
    if (startDate || endDate) {
      query.serviceDate = {};
      if (startDate) query.serviceDate.$gte = new Date(startDate);
      if (endDate) query.serviceDate.$lte = new Date(endDate);
    }
    
    const appointments = await Appointment.find(query)
      .populate('assignedMechanic', 'name email phone mechanicId availability')
      .populate('userId', 'name email phone')
      .sort({ createdAt: -1 })
      .limit(100); // Limit for performance
    
    console.log('Found appointments:', appointments.length);
    res.json(appointments);
  } catch (error) {
    console.error('Error fetching appointments:', error);
    res.status(500).json({ 
      message: 'Error fetching appointments', 
      error: error.message 
    });
  }
});

// Get appointment by ID
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id)
      .populate('assignedMechanic', 'name email phone mechanicId')
      .populate('userId', 'name email phone');
    
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    
    res.json(appointment);
  } catch (error) {
    console.error('Error fetching appointment:', error);
    res.status(500).json({ 
      message: 'Error fetching appointment', 
      error: error.message 
    });
  }
});

// Create new appointment
router.post('/', async (req, res) => {
  try {
    console.log('Creating new appointment:', req.body);
    
    const appointmentData = req.body;
    
    // Validate required fields
    const requiredFields = ['name', 'phone', 'email', 'address', 'bikeModel', 'serviceType', 'serviceDate', 'serviceTime'];
    const missingFields = requiredFields.filter(field => !appointmentData[field] || appointmentData[field].toString().trim() === '');
    
    if (missingFields.length > 0) {
      return res.status(400).json({ 
        message: 'Missing required fields', 
        missingFields,
        received: appointmentData
      });
    }

    // Check if slot is available
    const existingAppointment = await Appointment.findOne({
      serviceDate: new Date(appointmentData.serviceDate),
      serviceTime: appointmentData.serviceTime,
      status: { $nin: ['cancelled'] }
    });

    if (existingAppointment) {
      return res.status(409).json({ 
        message: 'This time slot is already booked. Please choose another time.',
        conflictingAppointment: {
          date: existingAppointment.serviceDate,
          time: existingAppointment.serviceTime
        }
      });
    }

    // Create appointment
    const appointment = new Appointment(appointmentData);
    await appointment.save();
    
    console.log('Appointment created successfully:', appointment._id);
    
    res.status(201).json({
      message: 'Appointment created successfully',
      appointment: {
        _id: appointment._id,
        name: appointment.name,
        phone: appointment.phone,
        serviceDate: appointment.serviceDate,
        serviceTime: appointment.serviceTime,
        serviceType: appointment.serviceType,
        status: appointment.status
      }
    });
  } catch (error) {
    console.error('Error creating appointment:', error);
    
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ 
        message: 'Validation failed', 
        errors: validationErrors 
      });
    }
    
    res.status(500).json({ 
      message: 'Error creating appointment', 
      error: error.message 
    });
  }
});

// Update appointment
router.patch('/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    
    console.log('Updating appointment:', id, updateData);
    
    // Remove undefined/null values
    Object.keys(updateData).forEach(key => {
      if (updateData[key] === undefined || updateData[key] === null) {
        delete updateData[key];
      }
    });
    
    const appointment = await Appointment.findByIdAndUpdate(
      id, 
      { ...updateData, updatedAt: new Date() }, 
      { new: true, runValidators: true }
    ).populate('assignedMechanic', 'name email phone');
    
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    
    console.log('Appointment updated successfully');
    
    res.json({
      message: 'Appointment updated successfully',
      appointment
    });
  } catch (error) {
    console.error('Error updating appointment:', error);
    
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ 
        message: 'Validation failed', 
        errors: validationErrors 
      });
    }
    
    res.status(500).json({ 
      message: 'Error updating appointment', 
      error: error.message 
    });
  }
});

// Delete appointment
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndDelete(req.params.id);
    
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    
    res.json({ message: 'Appointment deleted successfully' });
  } catch (error) {
    console.error('Error deleting appointment:', error);
    res.status(500).json({ 
      message: 'Error deleting appointment', 
      error: error.message 
    });
  }
});

// Get available slots for a date
router.get('/available-slots', async (req, res) => {
  try {
    const { date } = req.query;
    
    if (!date) {
      return res.status(400).json({ message: 'Date parameter is required' });
    }
    
    // Validate date format
    const selectedDate = new Date(date);
    if (isNaN(selectedDate.getTime())) {
      return res.status(400).json({ message: 'Invalid date format' });
    }
    
    // Check if date is not in the past
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (selectedDate.getTime() < today.getTime()) {
      return res.status(400).json({ message: 'Cannot book appointments for past dates' });
    }
    
    console.log('Checking available slots for date:', date);
    
    // Default time slots
    const defaultSlots = [
      '09:00', '10:00', '11:00', '12:00', 
      '14:00', '15:00', '16:00', '17:00', '18:00'
    ];
    
    // Find booked slots for the date
    const bookedAppointments = await Appointment.find({
      serviceDate: {
        $gte: new Date(selectedDate.setHours(0, 0, 0, 0)),
        $lt: new Date(selectedDate.setHours(23, 59, 59, 999))
      },
      status: { $nin: ['cancelled'] }
    }).select('serviceTime status');
    
    const bookedSlots = bookedAppointments.map(apt => apt.serviceTime);
    const availableSlots = defaultSlots.filter(slot => !bookedSlots.includes(slot));
    
    console.log('Available slots:', availableSlots);
    
    res.json({
      date,
      totalSlots: defaultSlots.length,
      availableSlots: availableSlots,
      bookedSlots: bookedSlots,
      availableCount: availableSlots.length
    });
  } catch (error) {
    console.error('Error fetching available slots:', error);
    res.status(500).json({ 
      message: 'Error fetching available slots', 
      error: error.message 
    });
  }
});

module.exports = router;
