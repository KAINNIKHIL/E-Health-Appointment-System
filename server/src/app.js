import express from "express";
import cors from "cors";
import authRoutes from "./routers/auth.router.js";
import userRoutes from "./routers/user.router.js";
import appointmentRoutes from "./routers/appointment.router.js";
import doctorAppointmentsRouter from "./routers/doctorAppointments.router.js";

const app = express();

app.use(cors({
  origin: "http://localhost:5173",   // tumhara frontend origin
  methods: ["GET", "POST","PATCH", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
}));

app.use(express.json());

app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/appointments", appointmentRoutes);
app.use("/doctor-appointments", doctorAppointmentsRouter);

export { app };
