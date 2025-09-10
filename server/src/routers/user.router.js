// routers/user.router.js
import express from "express";
import User from "../../models/user.model.js";

const router = express.Router();

router.get("/doctors", async (req, res) => {
  try {
    const doctors = await User.findAll({
      where: { role: "doctor" },
      attributes: ["id", "name", "specialization"],
    });
    res.json(doctors);
  } catch (error) {
    res.status(500).json({ message: "Error fetching doctors", error: error.message });
  }
});

export default router;
