// routes/emergency.js
const express = require('express');
const router = express.Router();
const Emergency = require('../models/Emergency');
const authMiddleware = require('../middlewares/auth');

// Get all emergencies (Admin only)
router.get('/', authMiddleware, async (req, res) => {
  try {
    console.log('Fetching emergencies for admin:', req.admin.username);
    
    const { status, urgency, startDate, endDate } = req.query;
    let query = {};
    
    // Apply filters
    if (status) query.status = status;
    if (urgency) query.urgencyLevel = urgency;
    if (startDate || endDate) {
      query.createdAt = {};
      if (startDate) query.createdAt.$gte = new Date(startDate);
      if (endDate) query.createdAt.$lte = new Date(endDate);
    }
    
    const emergencies = await Emergency.find(query)
      .populate('assignedMechanic', 'name email phone mechanicId availability')
      .populate('userId', 'name email phone')
      .sort({ priority: -1, createdAt: -1 }) // High priority first
      .limit(100);
    
    console.log('Found emergencies:', emergencies.length);
    res.json(emergencies);
  } catch (error) {
    console.error('Error fetching emergencies:', error);
    res.status(500).json({ 
      message: 'Error fetching emergencies', 
      error: error.message 
    });
  }
});

// Get emergency by ID
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const emergency = await Emergency.findById(req.params.id)
      .populate('assignedMechanic', 'name email phone mechanicId')
      .populate('userId', 'name email phone');
    
    if (!emergency) {
      return res.status(404).json({ message: 'Emergency request not found' });
    }
    
    res.json(emergency);
  } catch (error) {
    console.error('Error fetching emergency:', error);
    res.status(500).json({ 
      message: 'Error fetching emergency', 
      error: error.message 
    });
  }
});

// Create new emergency
router.post('/', async (req, res) => {
  try {
    console.log('Creating new emergency:', req.body);
    
    const emergencyData = req.body;
    
    // Validate required fields
    const requiredFields = ['name', 'phone', 'location', 'bikeModel', 'issueDescription'];
    const missingFields = requiredFields.filter(field => !emergencyData[field] || emergencyData[field].toString().trim() === '');
    
    if (missingFields.length > 0) {
      return res.status(400).json({ 
        message: 'Missing required fields', 
        missingFields,
        received: emergencyData
      });
    }

    // Create emergency
    const emergency = new Emergency(emergencyData);
    await emergency.save();
    
    console.log('Emergency created successfully:', emergency._id);
    
    // TODO: Send notifications to available mechanics based on urgency
    // TODO: Send SMS/Email to customer with request ID
    
    res.status(201).json({
      message: 'Emergency request created successfully',
      emergency: {
        _id: emergency._id,
        name: emergency.name,
        phone: emergency.phone,
        urgencyLevel: emergency.urgencyLevel,
        status: emergency.status,
        priority: emergency.priority
      }
    });
  } catch (error) {
    console.error('Error creating emergency:', error);
    
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ 
        message: 'Validation failed', 
        errors: validationErrors 
      });
    }
    
    res.status(500).json({ 
      message: 'Error creating emergency request', 
      error: error.message 
    });
  }
});

// Update emergency
router.patch('/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    
    console.log('Updating emergency:', id, updateData);
    
    // Remove undefined/null values
    Object.keys(updateData).forEach(key => {
      if (updateData[key] === undefined || updateData[key] === null) {
        delete updateData[key];
      }
    });
    
    const emergency = await Emergency.findByIdAndUpdate(
      id, 
      { ...updateData, updatedAt: new Date() }, 
      { new: true, runValidators: true }
    ).populate('assignedMechanic', 'name email phone');
    
    if (!emergency) {
      return res.status(404).json({ message: 'Emergency request not found' });
    }
    
    console.log('Emergency updated successfully');
    
    res.json({
      message: 'Emergency request updated successfully',
      emergency
    });
  } catch (error) {
    console.error('Error updating emergency:', error);
    
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ 
        message: 'Validation failed', 
        errors: validationErrors 
      });
    }
    
    res.status(500).json({ 
      message: 'Error updating emergency request', 
      error: error.message 
    });
  }
});

// Delete emergency
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const emergency = await Emergency.findByIdAndDelete(req.params.id);
    
    if (!emergency) {
      return res.status(404).json({ message: 'Emergency request not found' });
    }
    
    res.json({ message: 'Emergency request deleted successfully' });
  } catch (error) {
    console.error('Error deleting emergency:', error);
    res.status(500).json({ 
      message: 'Error deleting emergency request', 
      error: error.message 
    });
  }
});

module.exports = router;
