const mongoose = require('mongoose');

const emergencySchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  location: { type: String, required: true },
  bikeModel: { type: String, required: true },
  issueDescription: { type: String, required: true },
  urgencyLevel: { 
    type: String, 
    enum: ['low', 'medium', 'high'], 
    default: 'medium' 
  },
  serviceCategory: { type: String, default: 'emergency' },
  status: { 
    type: String, 
    enum: ['urgent', 'assigned', 'in-progress', 'resolved'], 
    default: 'urgent' 
  },
  requestTime: { type: Date, default: Date.now },
  resolvedAt: { type: Date }
});

module.exports = mongoose.model('Emergency', emergencySchema);
