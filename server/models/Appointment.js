// models/Appointment.js
const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
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
  bikeModel: {
    type: String,
    required: [true, 'Bike model is required']
  },
  serviceType: {
    type: String,
    required: [true, 'Service type is required'],
    enum: {
      values: ['general-service', 'oil-change', 'brake-service', 'chain-cleaning', 'complete-overhaul', 'maintenance', 'inspection'],
      message: 'Please select a valid service type'
    }
  },
  serviceDate: {
    type: Date,
    required: [true, 'Service date is required'],
    validate: {
      validator: function(date) {
        return date >= new Date().setHours(0, 0, 0, 0);
      },
      message: 'Service date cannot be in the past'
    }
  },
  serviceTime: {
    type: String,
    required: [true, 'Service time is required'],
    match: [/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Please provide valid time format (HH:MM)']
  },
  additionalNotes: {
    type: String,
    maxlength: [500, 'Notes cannot exceed 500 characters'],
    default: ''
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'in-progress', 'completed', 'cancelled'],
    default: 'pending'
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
    default: 'doorstep'
  },
  estimatedDuration: {
    type: Number, // in minutes
    default: 60
  },
  actualDuration: {
    type: Number, // in minutes
    default: null
  },
  cost: {
    type: Number,
    default: 0
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'refunded'],
    default: 'pending'
  },
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
appointmentSchema.index({ serviceDate: 1, serviceTime: 1 });
appointmentSchema.index({ assignedMechanic: 1, status: 1 });
appointmentSchema.index({ userId: 1 });

module.exports = mongoose.model('Appointment', appointmentSchema);
