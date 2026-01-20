// server/models/ContactForm. js
const mongoose = require('mongoose');

const contactFormSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
    phone: {
    type: String,
    required: [true, 'Phone number is required'],
    validate: {
      validator: function(v) {
        // Remove +91, +, spaces, dashes, leading zeros
        const cleanPhone = v.replace(/^\+?91? /, '').replace(/[\s\-]/g, '').replace(/^0+/, '');
        return /^[0-9]{10}$/.test(cleanPhone);
      },
      message: 'Phone number must be 10 digits'
    },
    set:  function(v) {
      // Clean phone:  remove +91, +, spaces, dashes, leading zeros
      return v.replace(/^\+?91?/, '').replace(/[\s\-]/g, '').replace(/^0+/, '');
    }
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter valid email']
  },
  formType: {
    type: String,
    required: true,
    enum: ['general', 'service', 'emergency', 'feedback'],
    default: 'general'
  },
  message: {
    type: String,
    required: [true, 'Message is required'],
    maxlength: [1000, 'Message cannot exceed 1000 characters']
  },
  serviceType: {
    type: String,
    default: ''
  },
  vehicleModel: {
    type: String,
    default: ''
  },
  location: {
    type: String,
    default: ''
  },
  rating: {
    type: Number,
    min: 1,
    max:  5
  },
  preferredDateTime: {
  type:  String,
  default: ''
},
emergencyType: {
  type: String,
  default: ''
},
  status: {
    type: String,
    enum: ['pending', 'contacted', 'resolved', 'closed'],
    default: 'pending'
  },
  emailSent: {
    type:  Boolean,
    default: false
  },
  adminNotes: {
    type: String,
    default: ''
  }
}, {
  timestamps:  true
});

module.exports = mongoose.model('ContactForm', contactFormSchema);