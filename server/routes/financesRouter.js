const express = require("express")
const financesRouter = express.Router()

const Appointment = require("../models/Appointment");
const Emergency = require("../models/Emergency");

// GET ALL APPOINTMENTS WITH OPTIONAL FILTER
financesRouter.get("/allbookings", async (req, res) => {
  try {
    console.log("Route hit: /allbookings");

    const { status } = req.query;
    const filter = {};
filter.status = 'completed'
      console.log("Filtering by status:", filter);

    const appointments = (await Appointment.find(filter).populate("assignedMechanic" , 'name phone').lean());
    const emergencies = (await Emergency.find(filter).populate("assignedMechanic" , 'name phone').lean())
    // console.log("Appointments fetched:", appointments.length);
    console.log('all appointment' , appointments);
    
    res.status(200).json({
      success: true,
      count: appointments.length,
      data:{
        appointments:appointments,
        emergencies:emergencies
      },
    });
  } catch (error) {
    console.error("Error fetching appointments:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch appointments",
      error: error.message,
    });
  }
});

module.exports = financesRouter