const mongoose = require('mongoose');

const inquirySchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String, required: true },
  message: { type: String },
  inquiryType: { 
    type: String, 
    enum: ['spare-parts', 'service', 'general'], 
    required: true 
  },
  cartItems: [{
    id: Number,
    name: String,
    price: String,
    brand: String,
    quantity: Number,
    category: String
  }],
  totalAmount: { type: Number, required: true },
  itemCount: { type: Number, required: true },
  status: { 
    type: String, 
    enum: ['pending', 'contacted', 'quoted', 'completed', 'cancelled'], 
    default: 'pending' 
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Inquiry', inquirySchema);
