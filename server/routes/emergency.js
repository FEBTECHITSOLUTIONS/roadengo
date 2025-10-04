const express = require('express');
const router = express.Router();
const Emergency = require('../models/Emergency');

// Create emergency request
router.post('/', async (req, res) => {
  try {
    const emergency = new Emergency(req.body);
    await emergency.save();
    res.status(201).json({ 
      message: 'Emergency request submitted successfully', 
      emergency 
    });
  } catch (error) {
    res.status(400).json({ 
      message: 'Error submitting emergency request', 
      error: error.message 
    });
  }
});

// Get all emergency requests
router.get('/', async (req, res) => {
  try {
    const emergencies = await Emergency.find().sort({ requestTime: -1 });
    res.json(emergencies);
  } catch (error) {
    res.status(500).json({ 
      message: 'Error fetching emergency requests', 
      error: error.message 
    });
  }
});

// Update emergency status
router.patch('/:id', async (req, res) => {
  try {
    const emergency = await Emergency.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true }
    );
    res.json(emergency);
  } catch (error) {
    res.status(400).json({ 
      message: 'Error updating emergency request', 
      error: error.message 
    });
  }
});

module.exports = router;
