// routes/mechanics.js
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Mechanic = require('../models/Mechanic');
const Appointment = require('../models/Appointment');
const Emergency = require('../models/Emergency');
const authMiddleware = require('../middlewares/auth');

// Generate unique mechanic ID
const generateMechanicId = () => {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substr(2, 5);
  return `MECH-${timestamp}-${random}`.toUpperCase();
};

// Mechanic Registration (Admin only)
router.post('/register', authMiddleware, async (req, res) => {
  try {
    console.log('Registering new mechanic:', req.body);
    
    const { name, email, phone, password, specialization, experience, location } = req.body;
    
    // Validate required fields
    const requiredFields = ['name', 'email', 'phone', 'password', 'specialization'];
    const missingFields = requiredFields.filter(field => !req.body[field]);
    
    if (missingFields.length > 0) {
      return res.status(400).json({ 
        message: 'Missing required fields', 
        missingFields 
      });
    }

    // Check if mechanic already exists
    const existingMechanic = await Mechanic.findOne({ 
      $or: [{ email }, { phone }] 
    });
    
    if (existingMechanic) {
      return res.status(400).json({ 
        message: 'Mechanic with this email or phone already exists' 
      });
    }

    // Generate unique mechanic ID
    const mechanicId = generateMechanicId();

    // Create mechanic
    const mechanic = new Mechanic({
      name,
      email,
      phone,
      password,
      mechanicId,
      specialization: Array.isArray(specialization) ? specialization : [specialization],
      experience: parseInt(experience) || 0,
      location: location || { city: '' }
    });

    await mechanic.save();
    
    console.log('Mechanic registered successfully:', mechanicId);
    
    res.status(201).json({
      message: 'Mechanic registered successfully',
      mechanic: {
        id: mechanic._id,
        name: mechanic.name,
        email: mechanic.email,
        phone: mechanic.phone,
        mechanicId: mechanic.mechanicId,
        specialization: mechanic.specialization,
        experience: mechanic.experience
      }
    });
  } catch (error) {
    console.error('Error registering mechanic:', error);
    
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ 
        message: 'Validation failed', 
        errors: validationErrors 
      });
    }
    
    res.status(500).json({ 
      message: 'Error registering mechanic', 
      error: error.message 
    });
  }
});

// Mechanic Login
router.post('/login', async (req, res) => {
  try {
    console.log('Mechanic login attempt:', req.body);
    
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({ 
        message: 'Email and password are required' 
      });
    }

    // Find mechanic
    const mechanic = await Mechanic.findOne({ 
      email: email.toLowerCase(), 
      isActive: true 
    });

    if (!mechanic) {
      return res.status(401).json({ 
        message: 'Invalid credentials. Please check your email and password.' 
      });
    }

    // Check password
    const isPasswordValid = await mechanic.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ 
        message: 'Invalid credentials. Please check your email and password.' 
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { 
        mechanicId: mechanic._id, 
        email: mechanic.email,
        mechanicIdString: mechanic.mechanicId
      },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    console.log('Mechanic login successful:', mechanic.mechanicId);

    res.json({
      message: 'Login successful',
      token,
      mechanic: {
        id: mechanic._id,
        name: mechanic.name,
        email: mechanic.email,
        phone: mechanic.phone,
        mechanicId: mechanic.mechanicId,
        specialization: mechanic.specialization,
        availability: mechanic.availability,
        rating: mechanic.rating,
        completedTasks: mechanic.completedTasks
      }
    });
  } catch (error) {
    console.error('Mechanic login error:', error);
    res.status(500).json({ 
      message: 'Error during login', 
      error: error.message 
    });
  }
});

// Get All Mechanics (Admin only)
router.get('/', authMiddleware, async (req, res) => {
  try {
    console.log('Fetching mechanics for admin:', req.admin.username);
    
    const { availability, specialization, city } = req.query;
    let query = { isActive: true };
    
    // Apply filters
    if (availability) query.availability = availability;
    if (specialization) query.specialization = { $in: [specialization] };
    if (city) query['location.city'] = new RegExp(city, 'i');
    
    const mechanics = await Mechanic.find(query)
      .select('-password')
      .sort({ createdAt: -1 });
    
    console.log('Found mechanics:', mechanics.length);
    res.json(mechanics);
  } catch (error) {
    console.error('Error fetching mechanics:', error);
    res.status(500).json({ 
      message: 'Error fetching mechanics', 
      error: error.message 
    });
  }
});

// Get Available Mechanics for Assignment
router.get('/available', authMiddleware, async (req, res) => {
  try {
    const { specialization, city } = req.query;
    
    let query = { 
      availability: 'available', 
      isActive: true 
    };
    
    if (specialization) {
      query.specialization = { $in: [specialization] };
    }
    

    if (city) {
      query['location.city'] = new RegExp(city, 'i');
    }

    const mechanics = await Mechanic.find(query)
      .select('-password')
      .sort({ rating: -1, experience: -1, completedTasks: -1 });
    
    console.log('Available mechanics found:', mechanics.length);
    res.json(mechanics);
  } catch (error) {
    console.error('Error fetching available mechanics:', error);
    res.status(500).json({ 
      message: 'Error fetching available mechanics', 
      error: error.message 
    });
  }
});

// Assign Task to Mechanic (Admin only)
router.post('/assign-task', authMiddleware, async (req, res) => {
  try {
    const { mechanicId, taskId, taskType } = req.body;

    console.log('Assignment request received:', { mechanicId, taskId, taskType });

    // Validation
    if (!mechanicId || !taskId || !taskType) {
      return res.status(400).json({ 
        message: 'Missing required fields: mechanicId, taskId, and taskType are required' 
      });
    }

    if (!['appointment', 'emergency', 'inquiry'].includes(taskType)) {
      return res.status(400).json({ 
        message: 'Invalid taskType. Must be: appointment, emergency, or inquiry' 
      });
    }

    // Find mechanic
    const mechanic = await Mechanic.findById(mechanicId);
    if (!mechanic) {
      return res.status(404).json({ message: 'Mechanic not found' });
    }

    if (!mechanic.isActive) {
      return res.status(400).json({ message: 'Mechanic account is inactive' });
    }

    // Check if mechanic is available
    if (mechanic.availability !== 'available') {
      return res.status(400).json({ 
        message: `Mechanic is currently ${mechanic.availability}. Please choose another mechanic.` 
      });
    }

    // Check if task is already assigned
    const existingAssignment = mechanic.assignedTasks.find(
      task => task.taskId.toString() === taskId && task.status !== 'completed'
    );

    if (existingAssignment) {
      return res.status(400).json({ 
        message: 'This task is already assigned to this mechanic' 
      });
    }

    // Verify task exists and is not already assigned
    let task;
    let taskModel;
    
    if (taskType === 'appointment') {
      taskModel = Appointment;
      task = await Appointment.findById(taskId);
    } else if (taskType === 'emergency') {
      taskModel = Emergency;
      task = await Emergency.findById(taskId);
    }

    if (!task) {
      return res.status(404).json({ message: `${taskType} not found` });
    }

    if (task.assignedMechanic) {
      return res.status(400).json({ 
        message: `This ${taskType} is already assigned to another mechanic` 
      });
    }

    // Start database transaction (simplified approach)
    try {
      // Add task to mechanic's assigned tasks
      mechanic.assignedTasks.push({
        taskId,
        taskType,
        status: 'assigned'
      });

      // Update mechanic availability to busy
      mechanic.availability = 'busy';
      await mechanic.save();

      // Update the original task with assigned mechanic
      const updateData = {
        assignedMechanic: mechanicId,
        status: taskType === 'appointment' ? 'confirmed' : 'assigned',
        updatedAt: new Date()
      };

      await taskModel.findByIdAndUpdate(taskId, updateData);

      console.log('Task assignment successful');

      res.json({
        message: 'Task assigned successfully',
        assignment: {
          mechanic: {
            id: mechanic._id,
            name: mechanic.name,
            mechanicId: mechanic.mechanicId
          },
          task: {
            id: task._id,
            type: taskType,
            status: updateData.status
          }
        }
      });
    } catch (assignmentError) {
      console.error('Assignment transaction failed:', assignmentError);
      
      // Rollback mechanic changes if task update failed
      try {
        mechanic.assignedTasks.pop();
        mechanic.availability = 'available';
        await mechanic.save();
      } catch (rollbackError) {
        console.error('Rollback failed:', rollbackError);
      }
      
      throw assignmentError;
    }
  } catch (error) {
    console.error('Error assigning task:', error);
    res.status(500).json({ 
      message: 'Error assigning task', 
      error: error.message 
    });
  }
});

// Update mechanic details (Admin only)
router.patch('/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    
    // Remove sensitive fields
    delete updateData.password;
    delete updateData.mechanicId;
    
    const mechanic = await Mechanic.findByIdAndUpdate(
      id, 
      { ...updateData, updatedAt: new Date() }, 
      { new: true, runValidators: true }
    ).select('-password');
    
    if (!mechanic) {
      return res.status(404).json({ message: 'Mechanic not found' });
    }
    
    res.json({
      message: 'Mechanic updated successfully',
      mechanic
    });
  } catch (error) {
    console.error('Error updating mechanic:', error);
    res.status(500).json({ 
      message: 'Error updating mechanic', 
      error: error.message 
    });
  }
});

// Delete/Deactivate mechanic (Admin only)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const mechanic = await Mechanic.findByIdAndUpdate(
      req.params.id,
      { isActive: false, availability: 'offline' },
      { new: true }
    ).select('-password');
    
    if (!mechanic) {
      return res.status(404).json({ message: 'Mechanic not found' });
    }
    
    res.json({ 
      message: 'Mechanic deactivated successfully',
      mechanic
    });
  } catch (error) {
    console.error('Error deactivating mechanic:', error);
    res.status(500).json({ 
      message: 'Error deactivating mechanic', 
      error: error.message 
    });
  }
});

module.exports = router;
