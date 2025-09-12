import { DataTypes } from "sequelize";
import { sequelize } from "../db/index.js";
import User from "./user.model.js";

const appointment = sequelize.define("Appointment", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  time: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM("booked", "cancelled", "completed"),
    defaultValue: "booked",
  },
   reason: {   
    type: DataTypes.STRING,
    allowNull: true,
  }
}, {
  timestamps: true, 
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
   
});

// Relations
User.hasMany(appointment, { foreignKey: "patient_id", as: "appointments" });
User.hasMany(appointment, { foreignKey: "doctor_id", as: "doctorAppointments" });

appointment.belongsTo(User, { foreignKey: "patient_id", as: "patient" });
appointment.belongsTo(User, { foreignKey: "doctor_id", as: "doctor" });

export default appointment;
