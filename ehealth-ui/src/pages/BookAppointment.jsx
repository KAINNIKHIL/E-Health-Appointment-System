import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar.jsx";
import toast from "react-hot-toast";

export default function BookAppointment() {
  const [doctors, setDoctors] = useState([]);
  const [form, setForm] = useState({
    doctor_id: "",
    date: "",
    time: "",
    reason: "",
  });

  useEffect(() => {
    // Fetch all doctors
    axios.get("https://e-health-appointment-system.onrender.com/users/doctors").then((res) => {
      setDoctors(res.data);
    });
  }, []);

  const capitalize = (str) =>
    str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post("https://e-health-appointment-system.onrender.com/appointments", form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success(res.data.message);
      setForm({ doctor_id: "", date: "", time: "", reason: "" });
    } catch (err) {
      toast.error(err.response?.data?.message || "Error booking appointment");
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-r from-blue-50 to-blue-100 flex flex-col">

      <Navbar />

      <div className="flex flex-1 items-center justify-center px-4">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-xl p-8 rounded-xl w-full max-w-md space-y-4"
        >
          <h2 className="text-2xl font-bold text-center text-blue-700">
            Book Appointment
          </h2>

          <select
            name="doctor_id"
            value={form.doctor_id}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          >
            <option value="">Select Doctor</option>
            {doctors.map((d) => (
              <option key={d.id} value={d.id}>
                {capitalize(d.name)} ({capitalize(d.specialization)})
              </option>
            ))}
          </select>

          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />

          <input
            type="time"
            name="time"
            value={form.time}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />

          <textarea
            name="reason"
            value={form.reason}
            onChange={handleChange}
            placeholder="Reason for appointment (optional)"
            className="w-full border resize-none p-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Book Now
          </button>
        </form>
      </div>
    </div>
  );
}
