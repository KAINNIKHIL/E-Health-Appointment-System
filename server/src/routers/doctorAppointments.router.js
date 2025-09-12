import express from "express";
import Appointment from "../../models/appointment.model.js";
import User from "../../models/user.model.js";
import authMiddleware from "../../middlewares/auth.js";

const router = express.Router();

// Get all appointments for logged-in doctor
router.get("/", authMiddleware(), async (req, res) => {
  try {
    const doctor = req.user;

    if (doctor.role !== "doctor") {
      return res.status(403).json({ message: "Only doctors can view this" });
    }

    const appointments = await Appointment.findAll({
      where: { doctor_id: doctor.id },
      include: [
        { model: User, as: "patient", attributes: ["id", "name", "email"] },
      ],
      order: [["date", "ASC"], ["time", "ASC"]], // upcoming first
    });

    res.json(appointments);
  } catch (error) {
    console.error("Error fetching doctor appointments:", error);
    res.status(500).json({ message: "Server error" });
  }
});

//  Update appointment status (complete / cancel)
router.put("/:id/status", authMiddleware(), async (req, res) => {
  try {
    const doctor = req.user;
    const { id } = req.params;
    const { status } = req.body; 

    if (doctor.role !== "doctor") {
      return res.status(403).json({ message: "Only doctors can update status" });
    }

    const appointment = await Appointment.findOne({
      where: { id, doctor_id: doctor.id },
    });

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    appointment.status = status;
    await appointment.save();

    res.json({ message: "Status updated", appointment });
  } catch (error) {
    console.error("Error updating appointment:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
