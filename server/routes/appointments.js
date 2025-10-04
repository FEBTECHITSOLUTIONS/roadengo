const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');

// Create new appointment
router.post('/', async (req, res) => {
  try {
    const appointment = new Appointment(req.body);
    await appointment.save();
    res.status(201).json({ 
      message: 'Appointment booked successfully', 
      appointment 
    });
  } catch (error) {
    res.status(400).json({ 
      message: 'Error booking appointment', 
      error: error.message 
    });
  }
});

// Get all appointments
router.get('/', async (req, res) => {
  try {
    const appointments = await Appointment.find().sort({ createdAt: -1 });
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ 
      message: 'Error fetching appointments', 
      error: error.message 
    });
  }
});

// Update appointment status
router.patch('/:id', async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: new Date() },
      { new: true }
    );
    res.json(appointment);
  } catch (error) {
    res.status(400).json({ 
      message: 'Error updating appointment', 
      error: error.message 
    });
  }
});

module.exports = router;
