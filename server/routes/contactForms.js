// server/routes/contactForms.js
const express = require('express');
const router = express. Router();
const ContactForm = require('../models/ContactForm');
const { sendContactFormEmailToAdmin, sendCustomerConfirmationEmail } = require('../utils/emailService');
const authMiddleware = require('../middlewares/auth');

// Get all contact forms (Admin only)
router.get('/', authMiddleware, async (req, res) => {
  try {
    const { status, formType } = req.query;
    let query = {};
    
    if (status) query.status = status;
    if (formType) query.formType = formType;
    
    const contactForms = await ContactForm.find(query)
      .sort({ createdAt: -1 })
      .limit(100);
    
    res.json(contactForms);
  } catch (error) {
    console.error('Error fetching contact forms:', error);
    res.status(500).json({ message: 'Error fetching contact forms' });
  }
});

// Create new contact form (Public)
router.post('/', async (req, res) => {
  try {
    const { name, phone, email, formType, message, serviceType, vehicleModel, location, rating, preferredDateTime, emergencyType } = req.body;
    
    // Validate required fields
    if (!name || !phone || ! email || !formType || !message) {
      return res.status(400).json({ 
        message: 'Missing required fields',
        required: ['name', 'phone', 'email', 'formType', 'message']
      });
    }

    // Create contact form
const contactForm = new ContactForm({
  name,
  phone,
  email,
  formType,
  message,
  serviceType,
  vehicleModel,
  location,
  rating,
  preferredDateTime,
  emergencyType
});

    await contactForm.save();
    console.log('✅ Contact form saved:', contactForm._id);

    // Send email to admin
const adminEmailResult = await sendContactFormEmailToAdmin({
  name,
  phone,
  email,
  formType:  formType.charAt(0).toUpperCase() + formType.slice(1) + ' Inquiry',
  message,
  serviceType,
  vehicleModel,
  location,
  rating,
  preferredDateTime,
  emergencyType
});

    if (adminEmailResult.success) {
      contactForm.emailSent = true;
      await contactForm.save();
    }

      // Send confirmation to customer
    await sendCustomerConfirmationEmail({
      to: email,
      name,
      formType: formType.charAt(0).toUpperCase() + formType.slice(1) + ' Inquiry',
      message,
      serviceType,
      vehicleModel,
      location,
      rating,
      preferredDateTime:  req.body.preferredDateTime || '',
      emergencyType: req. body.emergencyType || ''
    });

    res.status(201).json({
      message: 'Contact form submitted successfully!  We will contact you within 15 minutes.',
      contactForm: {
        _id: contactForm._id,
        name: contactForm.name,
        formType: contactForm.formType
      }
    });
  } catch (error) {
    console.error('Error creating contact form:', error);
    res.status(500).json({ message: 'Error submitting contact form' });
  }
});

// Update contact form status (Admin only)
router.patch('/:id', authMiddleware, async (req, res) => {
  try {
    const { status, adminNotes } = req.body;
    const contactForm = await ContactForm.findByIdAndUpdate(
      req. params.id,
      { status, adminNotes },
      { new: true }
    );

    if (!contactForm) {
      return res.status(404).json({ message: 'Contact form not found' });
    }

    res.json({ message: 'Contact form updated', contactForm });
  } catch (error) {
    console.error('Error updating contact form:', error);
    res.status(500).json({ message: 'Error updating contact form' });
  }
});

module.exports = router;