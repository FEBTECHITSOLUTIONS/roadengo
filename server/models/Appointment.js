const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String, required: true },
  bikeModel: { type: String, required: true },
  serviceType: { type: String, required: true },
  serviceDate: { type: Date, required: true },
  serviceTime: { type: String, required: true },
  additionalNotes: { type: String },
  serviceCategory: { type: String, enum: ['doorstep', 'emergency'], required: true },
  status: { 
    type: String, 
    enum: ['pending', 'confirmed', 'in-progress', 'completed', 'cancelled'], 
    default: 'pending' 
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Appointment', appointmentSchema);
