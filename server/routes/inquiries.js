// routes/inquiries.js
const express = require('express');
const router = express.Router();
const Inquiry = require('../models/Inquiry');
const authMiddleware = require('../middlewares/auth');

// Get all inquiries (Admin only)
router.get('/', authMiddleware, async (req, res) => {
  try {
    console.log('Fetching inquiries for admin:', req.admin.username);
    
    const { status, type, startDate, endDate } = req.query;
    let query = {};
    
    // Apply filters
    if (status) query.status = status;
    if (type) query.inquiryType = type;
    if (startDate || endDate) {
      query.createdAt = {};
      if (startDate) query.createdAt.$gte = new Date(startDate);
      if (endDate) query.createdAt.$lte = new Date(endDate);
    }
    
    const inquiries = await Inquiry.find(query)
      .populate('userId', 'name email phone')
      .populate('assignedTo', 'username email')
      .sort({ createdAt: -1 })
      .limit(100);
    
    console.log('Found inquiries:', inquiries.length);
    res.json(inquiries);
  } catch (error) {
    console.error('Error fetching inquiries:', error);
    res.status(500).json({ 
      message: 'Error fetching inquiries', 
      error: error.message 
    });
  }
});

// Get inquiry by ID
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const inquiry = await Inquiry.findById(req.params.id)
      .populate('userId', 'name email phone')
      .populate('assignedTo', 'username email');
    
    if (!inquiry) {
      return res.status(404).json({ message: 'Inquiry not found' });
    }
    
    res.json(inquiry);
  } catch (error) {
    console.error('Error fetching inquiry:', error);
    res.status(500).json({ 
      message: 'Error fetching inquiry', 
      error: error.message 
    });
  }
});

// Create new inquiry
router.post('/', async (req, res) => {
  try {
    console.log('Creating new inquiry:', req.body);
    
    const inquiryData = req.body;
    
    // Validate required fields
    const requiredFields = ['name', 'phone', 'email', 'address', 'cartItems', 'totalAmount', 'itemCount'];
    const missingFields = requiredFields.filter(field => {
      if (field === 'cartItems') {
        return !inquiryData[field] || !Array.isArray(inquiryData[field]) || inquiryData[field].length === 0;
      }
      return !inquiryData[field] || inquiryData[field].toString().trim() === '';
    });
    
    if (missingFields.length > 0) {
      return res.status(400).json({ 
        message: 'Missing required fields', 
        missingFields,
        received: {
          name: !!inquiryData.name,
          phone: !!inquiryData.phone,
          email: !!inquiryData.email,
          address: !!inquiryData.address,
          cartItems: inquiryData.cartItems?.length || 0,
          totalAmount: !!inquiryData.totalAmount,
          itemCount: !!inquiryData.itemCount
        }
      });
    }

    // Validate cart items
    if (!Array.isArray(inquiryData.cartItems) || inquiryData.cartItems.length === 0) {
      return res.status(400).json({ 
        message: 'Cart items are required and must be a non-empty array' 
      });
    }

    // Validate each cart item
    for (let i = 0; i < inquiryData.cartItems.length; i++) {
      const item = inquiryData.cartItems[i];
      const itemRequiredFields = ['id', 'name', 'brand', 'price', 'quantity'];
      const itemMissingFields = itemRequiredFields.filter(field => !item[field]);
      
      if (itemMissingFields.length > 0) {
        return res.status(400).json({ 
          message: `Invalid cart item at index ${i}`, 
          missingFields: itemMissingFields,
          item
        });
      }
    }

    // Create inquiry
    const inquiry = new Inquiry(inquiryData);
    await inquiry.save();
    
    console.log('Inquiry created successfully:', inquiry._id);
    
    // TODO: Send email notification to admin
    // TODO: Send confirmation email to customer
    
    res.status(201).json({
      message: 'Inquiry submitted successfully',
      inquiry: {
        _id: inquiry._id,
        name: inquiry.name,
        phone: inquiry.phone,
        email: inquiry.email,
        totalAmount: inquiry.totalAmount,
        itemCount: inquiry.itemCount,
        status: inquiry.status
      }
    });
  } catch (error) {
    console.error('Error creating inquiry:', error);
    
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ 
        message: 'Validation failed', 
        errors: validationErrors 
      });
    }
    
    res.status(500).json({ 
      message: 'Error creating inquiry', 
      error: error.message 
    });
  }
});

// Update inquiry
router.patch('/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    
    console.log('Updating inquiry:', id, updateData);
    
    // Remove undefined/null values
    Object.keys(updateData).forEach(key => {
      if (updateData[key] === undefined || updateData[key] === null) {
        delete updateData[key];
      }
    });
    
    // Add admin who is updating
    updateData.assignedTo = req.admin._id;
    
    const inquiry = await Inquiry.findByIdAndUpdate(
      id, 
      { ...updateData, updatedAt: new Date() }, 
      { new: true, runValidators: true }
    ).populate('assignedTo', 'username email');
    
    if (!inquiry) {
      return res.status(404).json({ message: 'Inquiry not found' });
    }
    
    console.log('Inquiry updated successfully');
    
    res.json({
      message: 'Inquiry updated successfully',
      inquiry
    });
  } catch (error) {
    console.error('Error updating inquiry:', error);
    
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ 
        message: 'Validation failed', 
        errors: validationErrors 
      });
    }
    
    res.status(500).json({ 
      message: 'Error updating inquiry', 
      error: error.message 
    });
  }
});

// Delete inquiry
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const inquiry = await Inquiry.findByIdAndDelete(req.params.id);
    
    if (!inquiry) {
      return res.status(404).json({ message: 'Inquiry not found' });
    }
    
    res.json({ message: 'Inquiry deleted successfully' });
  } catch (error) {
    console.error('Error deleting inquiry:', error);
    res.status(500).json({ 
      message: 'Error deleting inquiry', 
      error: error.message 
    });
  }
});

module.exports = router;
