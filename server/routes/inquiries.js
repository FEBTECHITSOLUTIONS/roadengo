const express = require('express');
const router = express.Router();
const Inquiry = require('../models/Inquiry');

// Create new inquiry
router.post('/', async (req, res) => {
  try {
    const inquiry = new Inquiry(req.body);
    await inquiry.save();
    res.status(201).json({ 
      message: 'Inquiry submitted successfully', 
      inquiry 
    });
  } catch (error) {
    res.status(400).json({ 
      message: 'Error submitting inquiry', 
      error: error.message 
    });
  }
});

// Get all inquiries
router.get('/', async (req, res) => {
  try {
    const inquiries = await Inquiry.find().sort({ createdAt: -1 });
    res.json(inquiries);
  } catch (error) {
    res.status(500).json({ 
      message: 'Error fetching inquiries', 
      error: error.message 
    });
  }
});

// Update inquiry status
router.patch('/:id', async (req, res) => {
  try {
    const inquiry = await Inquiry.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: new Date() },
      { new: true }
    );
    res.json(inquiry);
  } catch (error) {
    res.status(400).json({ 
      message: 'Error updating inquiry', 
      error: error.message 
    });
  }
});

module.exports = router;
