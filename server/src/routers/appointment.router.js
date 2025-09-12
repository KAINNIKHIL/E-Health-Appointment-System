import express from "express";
import Appointment from "../../models/appointment.model.js";
import authMiddleware from "../../middlewares/auth.js"; 
import User from "../../models/user.model.js";
import { sendEmail } from "../../utils/email.js";

const router = express.Router();

// Create new appointment
router.post("/", authMiddleware(), async (req, res) => {
  try {
    const { doctor_id, date, time, reason } = req.body;
    const appointment = await Appointment.create({
      doctor_id: doctor_id || null,
      patient_id: req.user.id,
      date,
      time,
      reason,
      status: "booked",
    });
      const doctor = await User.findByPk(doctor_id);
      const patient = await User.findByPk(req.user.id);
      
    if (doctor?.email) {
      await sendEmail(
        doctor.email,
        "New Appointment Booked",
        `Dear ${doctor.name},\n\nYou have a new appointment on ${date} at ${time} with patient ${patient.name}.`
      );
    }

     
    if (patient?.email) {
      await sendEmail(
        patient.email,
        "Appointment Confirmation",
        `Dear ${patient.name},\n\nYour appointment with Dr. ${doctor.name} has been booked for ${date} at ${time}.`
      );
    }


    res.status(201).json({ message: "Appointment booked", appointment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error booking appointment", error: error.message });
  }

  
});

// Get appointments for a user
router.get("/", authMiddleware(), async (req, res) => {
  try {
    const appointments = await Appointment.findAll({
      where: { patient_id: req.user.id },
      include: [{ model: User, as: "doctor", attributes: ["id", "name", "specialization", "email"] }],
    });

     const today = new Date();
    for (let appt of appointments) {
      const apptDate = new Date(appt.date);

      if (apptDate < today && appt.status === "booked") {
        appt.status = "completed";
        await appt.save();
      }
    }
    res.json(appointments);
  } catch (error) {
     console.error("Fetch appointments error:", error);
    res.status(500).json({ message: "Error fetching appointments", error: error.message });
  }
});

// Cancel appointment
router.patch("/:id/cancel", authMiddleware(), async (req, res) => {
  try {
    const { id } = req.params;

    // Find appointment
    const appointment = await Appointment.findByPk(id);

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    // Update status
    appointment.status = "cancelled";
    await appointment.save();

    res.json({ message: "Appointment cancelled successfully", appointment });
  } catch (error) {
    console.error("Cancel Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
