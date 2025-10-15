// models/Mechanic.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const mechanicSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    minlength: [2, 'Name must be at least 2 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter valid email']
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    match: [/^[0-9]{10}$/, 'Phone number must be 10 digits']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters']
  },
  mechanicId: {
    type: String,
    required: true,
    unique: true
  },
  specialization: [{
    type: String,
    enum: ['bike-service', 'emergency-repair', 'doorstep-service', 'parts-replacement', 'maintenance', 'inspection'],
    required: [true, 'At least one specialization is required']
  }],
  experience: {
    type: Number,
    default: 0,
    min: [0, 'Experience cannot be negative']
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  totalRatings: {
    type: Number,
    default: 0
  },
  location: {
    city: {
      type: String,
      required: [true, 'City is required']
    },
    coordinates: {
      latitude: Number,
      longitude: Number
    }
  },
  availability: {
    type: String,
    enum: ['available', 'busy', 'offline'],
    default: 'available'
  },
  workingHours: {
    start: {
      type: String,
      default: '09:00'
    },
    end: {
      type: String,
      default: '18:00'
    }
  },
  currentLocation: {
    latitude: Number,
    longitude: Number,
    lastUpdated: {
      type: Date,
      default: Date.now
    }
  },
  assignedTasks: [{
    taskId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    taskType: {
      type: String,
      enum: ['appointment', 'emergency', 'inquiry'],
      required: true
    },
    assignedAt: {
      type: Date,
      default: Date.now
    },
    status: {
      type: String,
      enum: ['assigned', 'in-progress', 'completed', 'cancelled'],
      default: 'assigned'
    }
  }],
  completedTasks: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  },
  joinedDate: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Hash password before saving
mechanicSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  try {
    this.password = await bcrypt.hash(this.password, 12);
    next();
  } catch (error) {
    next(error);
  }
});

// Compare password method
mechanicSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Update rating method
mechanicSchema.methods.updateRating = function (newRating) {
  this.totalRatings += 1;
  this.rating = ((this.rating * (this.totalRatings - 1)) + newRating) / this.totalRatings;
  return this.save();
};

module.exports = mongoose.model('Mechanic', mechanicSchema);
