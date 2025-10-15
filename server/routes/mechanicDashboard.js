// routes/mechanicDashboard.js
const express = require('express');
const router = express.Router();
const Mechanic = require('../models/Mechanic');
const Appointment = require('../models/Appointment');
const Emergency = require('../models/Emergency');
const mechanicAuth = require('../middlewares/mechanicAuth');

// Get Mechanic Dashboard Stats
router.get('/stats', mechanicAuth, async (req, res) => {
  try {
    console.log('Fetching dashboard stats for mechanic:', req.mechanic.mechanicId);
    
    const mechanicId = req.mechanic._id;
    
    // Initialize counters
    let stats = {
      totalAssigned: 0,
      completed: 0,
      inProgress: 0,
      pending: 0,
      rating: 0,
      completedTasks: 0,
      availability: 'available'
    };

    try {
      // Count appointments
      const appointmentCounts = await Promise.all([
        Appointment.countDocuments({ assignedMechanic: mechanicId }),
        Appointment.countDocuments({ assignedMechanic: mechanicId, status: 'completed' }),
        Appointment.countDocuments({ assignedMechanic: mechanicId, status: 'in-progress' }),
        Appointment.countDocuments({ assignedMechanic: mechanicId, status: 'confirmed' })
      ]);

      // Count emergencies
      const emergencyCounts = await Promise.all([
        Emergency.countDocuments({ assignedMechanic: mechanicId }),
        Emergency.countDocuments({ assignedMechanic: mechanicId, status: 'completed' }),
        Emergency.countDocuments({ assignedMechanic: mechanicId, status: 'in-progress' }),
        Emergency.countDocuments({ assignedMechanic: mechanicId, status: 'assigned' })
      ]);

      // Calculate totals
      stats.totalAssigned = appointmentCounts[0] + emergencyCounts[0];
      stats.completed = appointmentCounts[1] + emergencyCounts[1];
      stats.inProgress = appointmentCounts[2] + emergencyCounts[2];
      stats.pending = appointmentCounts[3] + emergencyCounts[3];

    } catch (countError) {
      console.error('Error counting tasks:', countError);
      // Continue with default values
    }

    // Get mechanic details
    const mechanic = await Mechanic.findById(mechanicId).select('-password');
    if (mechanic) {
      stats.rating = mechanic.rating || 0;
      stats.completedTasks = mechanic.completedTasks || 0;
      stats.availability = mechanic.availability || 'available';
    }

    console.log('Dashboard stats calculated:', stats);
    res.json(stats);
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    res.status(500).json({ 
      message: 'Error fetching dashboard stats', 
      error: error.message
    });
  }
});

// Get Assigned Tasks
router.get('/tasks', mechanicAuth, async (req, res) => {
  try {
    console.log('Fetching tasks for mechanic:', req.mechanic.mechanicId);
    
    const mechanicId = req.mechanic._id;
    const { status, type, limit = 50 } = req.query;
    
    let appointmentQuery = { assignedMechanic: mechanicId };
    let emergencyQuery = { assignedMechanic: mechanicId };
    
    // Apply status filter
    if (status) {
      if (status === 'pending') {
        appointmentQuery.status = 'confirmed';
        emergencyQuery.status = 'assigned';
      } else {
        appointmentQuery.status = status;
        emergencyQuery.status = status;
      }
    }

    let tasks = [];

    try {
      // Fetch appointments
      if (!type || type === 'appointment') {
        const appointments = await Appointment.find(appointmentQuery)
          .populate('userId', 'name phone email')
          .sort({ serviceDate: 1, serviceTime: 1 })
          .limit(parseInt(limit));

        const appointmentTasks = appointments.map(apt => ({
          ...apt.toObject(),
          taskType: 'appointment'
        }));

        tasks = [...tasks, ...appointmentTasks];
      }

      // Fetch emergencies
      if (!type || type === 'emergency') {
        const emergencies = await Emergency.find(emergencyQuery)
          .populate('userId', 'name phone email')
          .sort({ priority: -1, createdAt: -1 })
          .limit(parseInt(limit));

        const emergencyTasks = emergencies.map(emg => ({
          ...emg.toObject(),
          taskType: 'emergency'
        }));

        tasks = [...tasks, ...emergencyTasks];
      }

      // Sort combined tasks by priority and date
      tasks.sort((a, b) => {
        // Emergency tasks first
        if (a.taskType === 'emergency' && b.taskType === 'appointment') return -1;
        if (a.taskType === 'appointment' && b.taskType === 'emergency') return 1;
        
        // Then by urgency/priority
        if (a.urgencyLevel && b.urgencyLevel) {
          const priorityOrder = { 'critical': 4, 'high': 3, 'medium': 2, 'low': 1 };
          return (priorityOrder[b.urgencyLevel] || 0) - (priorityOrder[a.urgencyLevel] || 0);
        }
        
        // Finally by date
        const dateA = new Date(a.serviceDate || a.createdAt);
        const dateB = new Date(b.serviceDate || b.createdAt);
        return dateA - dateB;
      });

    } catch (fetchError) {
      console.error('Error fetching task details:', fetchError);
      return res.status(500).json({ 
        message: 'Error fetching task details', 
        error: fetchError.message 
      });
    }

    console.log(`Found ${tasks.length} tasks for mechanic`);
    res.json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ 
      message: 'Error fetching tasks', 
      error: error.message 
    });
  }
});

// Update Task Status
router.patch('/tasks/:taskId/status', mechanicAuth, async (req, res) => {
  try {
    const { taskId } = req.params;
    const { status, taskType, notes } = req.body;
    const mechanicId = req.mechanic._id;

    console.log('Updating task status:', { taskId, status, taskType, mechanicId });

    // Validation
    if (!status || !taskType) {
      return res.status(400).json({ 
        message: 'Status and taskType are required' 
      });
    }

    if (!['appointment', 'emergency'].includes(taskType)) {
      return res.status(400).json({ 
        message: 'Invalid taskType. Must be appointment or emergency' 
      });
    }

    const validStatuses = ['assigned', 'confirmed', 'in-progress', 'completed', 'cancelled'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ 
        message: 'Invalid status. Must be one of: ' + validStatuses.join(', ') 
      });
    }

    // Update task
    let task;
    let TaskModel = taskType === 'appointment' ? Appointment : Emergency;
    
    try {
      task = await TaskModel.findOneAndUpdate(
        { _id: taskId, assignedMechanic: mechanicId },
        { 
          status, 
          mechanicNotes: notes || '',
          updatedAt: new Date()
        },
        { new: true, runValidators: true }
      ).populate('userId', 'name phone email');

      if (!task) {
        return res.status(404).json({ 
          message: 'Task not found or not assigned to you' 
        });
      }

    } catch (updateError) {
      console.error('Error updating task:', updateError);
      return res.status(500).json({ 
        message: 'Error updating task', 
        error: updateError.message 
      });
    }

    // Update mechanic's task list and stats
    try {
      const mechanic = await Mechanic.findById(mechanicId);
      
      if (mechanic) {
        // Update assigned task status
        const assignedTask = mechanic.assignedTasks.find(
          t => t.taskId.toString() === taskId
        );
        
        if (assignedTask) {
          assignedTask.status = status;
        }

        // If task is completed, increment completed tasks and check availability
        if (status === 'completed') {
          mechanic.completedTasks = (mechanic.completedTasks || 0) + 1;
          
          // Check if mechanic has other active tasks
          const activeTasks = await Promise.all([
            Appointment.countDocuments({ 
              assignedMechanic: mechanicId, 
              status: { $in: ['confirmed', 'in-progress'] }
            }),
            Emergency.countDocuments({ 
              assignedMechanic: mechanicId, 
              status: { $in: ['assigned', 'in-progress'] }
            })
          ]);
          
          const totalActiveTasks = activeTasks[0] + activeTasks[1];
          
          // If no active tasks, make mechanic available
          if (totalActiveTasks === 0) {
            mechanic.availability = 'available';
          }
        }
        
        await mechanic.save();
      }
    } catch (mechanicError) {
      console.error('Error updating mechanic stats:', mechanicError);
      // Don't fail the request if mechanic update fails
    }

    console.log('Task status updated successfully');

    res.json({
      message: 'Task status updated successfully',
      task: {
        _id: task._id,
        status: task.status,
        taskType,
        mechanicNotes: task.mechanicNotes,
        updatedAt: task.updatedAt
      }
    });
  } catch (error) {
    console.error('Error updating task status:', error);
    res.status(500).json({ 
      message: 'Error updating task status', 
      error: error.message 
    });
  }
});

// Update Mechanic Location
router.post('/location', mechanicAuth, async (req, res) => {
  try {
    const { latitude, longitude } = req.body;
    const mechanicId = req.mechanic._id;

    // Validation
    if (!latitude || !longitude) {
      return res.status(400).json({ 
        message: 'Latitude and longitude are required' 
      });
    }

    if (typeof latitude !== 'number' || typeof longitude !== 'number') {
      return res.status(400).json({ 
        message: 'Latitude and longitude must be numbers' 
      });
    }

    // Validate coordinate ranges
    if (latitude < -90 || latitude > 90) {
      return res.status(400).json({ 
        message: 'Latitude must be between -90 and 90' 
      });
    }

    if (longitude < -180 || longitude > 180) {
      return res.status(400).json({ 
        message: 'Longitude must be between -180 and 180' 
      });
    }

    await Mechanic.findByIdAndUpdate(mechanicId, {
      currentLocation: {
        latitude,
        longitude,
        lastUpdated: new Date()
      }
    });

    console.log('Location updated for mechanic:', req.mechanic.mechanicId);

    res.json({ 
      message: 'Location updated successfully',
      location: {
        latitude,
        longitude,
        lastUpdated: new Date()
      }
    });
  } catch (error) {
    console.error('Error updating location:', error);
    res.status(500).json({ 
      message: 'Error updating location', 
      error: error.message 
    });
  }
});

// Get Route Information
router.get('/route/:taskId', mechanicAuth, async (req, res) => {
  try {
    const { taskId } = req.params;
    const { taskType } = req.query;
    
    if (!taskType || !['appointment', 'emergency'].includes(taskType)) {
      return res.status(400).json({ 
        message: 'Valid taskType query parameter is required (appointment or emergency)' 
      });
    }

    // Find the task
    let task;
    if (taskType === 'appointment') {
      task = await Appointment.findById(taskId).populate('userId', 'name phone email');
    } else {
      task = await Emergency.findById(taskId).populate('userId', 'name phone email');
    }

    if (!task) {
      return res.status(404).json({ message: `${taskType} not found` });
    }

    // Verify task is assigned to this mechanic
    if (task.assignedMechanic.toString() !== req.mechanic._id.toString()) {
      return res.status(403).json({ 
        message: 'This task is not assigned to you' 
      });
    }

    // Get mechanic's current location
    const mechanic = await Mechanic.findById(req.mechanic._id);
    
    // Prepare route information
    const routeInfo = {
      from: {
        latitude: mechanic.currentLocation?.latitude || null,
        longitude: mechanic.currentLocation?.longitude || null,
        lastUpdated: mechanic.currentLocation?.lastUpdated || null
      },
      to: {
        address: task.address || task.location,
        coordinates: task.coordinates || null
      },
      customerInfo: {
        name: task.userId?.name || task.name,
        phone: task.userId?.phone || task.phone,
        email: task.userId?.email || task.email || null
      },
      taskInfo: {
        id: task._id,
        type: taskType,
        status: task.status,
        serviceType: task.serviceType || null,
        issueDescription: task.issueDescription || null,
        urgencyLevel: task.urgencyLevel || null,
        serviceDate: task.serviceDate || null,
        serviceTime: task.serviceTime || null
      }
    };

    res.json(routeInfo);
  } catch (error) {
    console.error('Error getting route info:', error);
    res.status(500).json({ 
      message: 'Error getting route information', 
      error: error.message 
    });
  }
});

// Update Availability
router.patch('/availability', mechanicAuth, async (req, res) => {
  try {
    const { availability } = req.body;
    const mechanicId = req.mechanic._id;

    if (!availability || !['available', 'busy', 'offline'].includes(availability)) {
      return res.status(400).json({ 
        message: 'Valid availability status is required (available, busy, offline)' 
      });
    }

    const mechanic = await Mechanic.findByIdAndUpdate(
      mechanicId,
      { availability, updatedAt: new Date() },
      { new: true }
    ).select('-password');

    console.log('Availability updated for mechanic:', req.mechanic.mechanicId, 'to:', availability);

    res.json({
      message: 'Availability updated successfully',
      mechanic: {
        id: mechanic._id,
        name: mechanic.name,
        availability: mechanic.availability
      }
    });
  } catch (error) {
    console.error('Error updating availability:', error);
    res.status(500).json({ 
      message: 'Error updating availability', 
      error: error.message 
    });
  }
});

module.exports = router;
