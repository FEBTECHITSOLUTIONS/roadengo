// models/Emergency.js
const mongoose = require('mongoose');

const emergencySchema = new mongoose.Schema({
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
  location: {
    type: String,
    required: [true, 'Location is required'],
    minlength: [10, 'Please provide detailed location with landmarks']
  },
  bikeModel: {
    type: String,
    required: [true, 'Bike model is required']
  },
  issueDescription: {
    type: String,
    required: [true, 'Issue description is required'],
    minlength: [10, 'Please provide detailed description of the issue']
  },

  status: {
    type: String,
    enum: ['pending', 'assigned', 'in-progress', 'completed', 'cancelled'],
    default: 'pending'
  },
  priority: {
    type: Number,
    default: function() {
      const priorityMap = { low: 1, medium: 2, high: 3, critical: 4 };
      return priorityMap[this.urgencyLevel] || 2;
    }
  },
  assignedMechanic: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Mechanic',
    default: null
  },
  mechanicNotes: {
    type: String,
    maxlength: [1000, 'Mechanic notes cannot exceed 1000 characters'],
    default: ''
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  serviceCategory: {
    type: String,
    default: 'emergency'
  },
  coordinates: {
    latitude: Number,
    longitude: Number
  },
  estimatedArrival: {
    type: Date,
    default: null
  },
  actualArrival: {
    type: Date,
    default: null
  },
  resolutionTime: {
    type: Number, // in minutes
    default: null
  },
  cost: {
    type: Number,
    default: 0
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'cash-on-service'],
    default: 'pending'
  },
  images: [{
    url: String,
    description: String,
    uploadedAt: {
      type: Date,
      default: Date.now
    }
  }],
  rating: {
    type: Number,
    min: 1,
    max: 5,
    default: null
  },
  feedback: {
    type: String,
    maxlength: [500, 'Feedback cannot exceed 500 characters'],
    default: ''
  }
}, {
  timestamps: true
});

// Index for efficient queries
emergencySchema.index({ urgencyLevel: -1, createdAt: -1 });
emergencySchema.index({ assignedMechanic: 1, status: 1 });
emergencySchema.index({ coordinates: '2dsphere' });

// Pre-save middleware to set priority
emergencySchema.pre('save', function(next) {
  const priorityMap = { low: 1, medium: 2, high: 3, critical: 4 };
  this.priority = priorityMap[this.urgencyLevel] || 2;
  next();
});

module.exports = mongoose.model('Emergency', emergencySchema);
