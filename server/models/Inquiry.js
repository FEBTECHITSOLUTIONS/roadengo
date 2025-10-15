// models/Inquiry.js
const mongoose = require('mongoose');

const inquirySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    match: [/^[0-9]{10}$/, 'Phone number must be 10 digits']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter valid email']
  },
  address: {
    type: String,
    required: [true, 'Address is required'],
    minlength: [10, 'Please provide complete address']
  },
  message: {
    type: String,
    maxlength: [1000, 'Message cannot exceed 1000 characters'],
    default: ''
  },
  cartItems: [{
    id: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    brand: {
      type: String,
      required: true
    },
    price: {
      type: String,
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: [1, 'Quantity must be at least 1']
    },
    image: String
  }],
  totalAmount: {
    type: Number,
    required: [true, 'Total amount is required'],
    min: [0, 'Total amount cannot be negative']
  },
  itemCount: {
    type: Number,
    required: [true, 'Item count is required'],
    min: [1, 'At least one item is required']
  },
  inquiryType: {
    type: String,
    enum: ['spare-parts', 'service', 'consultation', 'quote'],
    default: 'spare-parts'
  },
  status: {
    type: String,
    enum: ['pending', 'contacted', 'quoted', 'completed', 'cancelled'],
    default: 'pending'
  },
  priority: {
    type: String,
    enum: ['low', 'normal', 'high'],
    default: 'normal'
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin'
  },
  quotedPrice: {
    type: Number,
    default: null
  },
  notes: {
    type: String,
    maxlength: [1000, 'Notes cannot exceed 1000 characters'],
    default: ''
  },
  followUpDate: {
    type: Date,
    default: null
  },
  expectedDelivery: {
    type: Date,
    default: null
  }
}, {
  timestamps: true
});

// Index for efficient queries
inquirySchema.index({ status: 1, createdAt: -1 });
inquirySchema.index({ userId: 1 });
inquirySchema.index({ inquiryType: 1 });

module.exports = mongoose.model('Inquiry', inquirySchema);
