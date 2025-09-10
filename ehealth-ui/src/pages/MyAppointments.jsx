import { useEffect, useState } from "react";
import axios from "axios";

export default function MyAppointments() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:8000/appointments", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAppointments(res.data);
      } catch (err) {
        console.error(err);
        alert("Error fetching appointments");
      }
    };

    fetchAppointments();
  }, []);

  // Helper for formatting date nicely
  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-IN", {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const formatTime = (timeStr) => {
    const [hours, minutes] = timeStr.split(":");
    const date = new Date();
    date.setHours(hours, minutes);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-6">
      <h2 className="text-3xl font-extrabold text-center text-blue-700 mb-8">
        My Appointments
      </h2>

      {appointments.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">
          No appointments booked yet.
        </p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {appointments.map((a) => (
            <div
              key={a.id}
              className="bg-white p-5 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col space-y-3"
            >
              <div className="flex justify-between items-center">
                <div className="text-lg font-semibold text-gray-800">
                  Dr. {a.doctor?.name}
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    a.status === "booked"
                      ? "bg-blue-100 text-blue-700"
                      : a.status === "completed"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {a.status.toUpperCase()}
                </span>
              </div>

              <div className="text-gray-600 space-y-1">
                <div>
                  <strong>Specialization:</strong> {a.doctor?.specialization}
                </div>
                <div>
                  <strong>Date:</strong> {formatDate(a.date)}
                </div>
                <div>
                  <strong>Time:</strong> {formatTime(a.time)}
                </div>
                {a.reason && (
                  <div>
                    <strong>Reason:</strong> {a.reason}
                  </div>
                )}
              </div>

              <button className="self-end bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition-colors">
                View Details
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
