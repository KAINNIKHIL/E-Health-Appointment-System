import { DataTypes } from "sequelize";
import { sequelize } from "../db/index.js";

const user = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM("patient", "doctor", "admin"),
    defaultValue: "patient",
  },
  specialization: {
    type: DataTypes.STRING, // only for doctors
    allowNull: true,
  },
}, {
  timestamps: true,
});

export default user;
