import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar.jsx";
import toast from "react-hot-toast";

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

  const handleCancel = async (id) => {

  try {
    const token = localStorage.getItem("token");
    await axios.patch(
      `http://localhost:8000/appointments/${id}/cancel`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    setAppointments((prev) =>
      prev.map((a) =>
        a.id === id ? { ...a, status: "cancelled" } : a
      )
    );
    toast.success("Appointment cancelled successfully!");
  } catch (err) {
    console.error(err);
    toast.error("Failed to cancel appointment");
  }
};


  
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


  const capitalize = (str) =>
    str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

  
  const today = new Date();
  const upcoming = appointments.filter(
    (a) => new Date(a.date) >= today
  );
  const past = appointments.filter((a) => new Date(a.date) < today);

  return (
    <div className="min-h-screen w-full bg-gradient-to-r from-blue-50 to-blue-100 flex flex-col">
      
      <Navbar />

      <div className="flex-1 p-6">
        <h2 className="text-3xl font-extrabold text-center text-blue-700 mb-8">
          My Appointments
        </h2>

        {appointments.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">
            No appointments booked yet.
          </p>
        ) : (
          <div className="max-w-5xl mx-auto space-y-10">
            {/* Upcoming */}
            {upcoming.length > 0 && (
              <section>
                <h3 className="text-2xl font-bold text-green-700 mb-4">
                  Upcoming
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {upcoming.map((a) => (
                    <div
                      key={a.id}
                      className="bg-white p-5 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col space-y-3"
                    >
                      <div className="flex justify-between items-center">
                        <div className="text-lg font-semibold text-gray-800">
                          Dr. {capitalize(a.doctor?.name)}
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
                          {capitalize(a.status)}
                        </span>
                      </div>

                      <div className="text-gray-600 space-y-1">
                        <div>
                          <strong>Specialization:</strong>{" "}
                          {capitalize(a.doctor?.specialization)}
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
                      {a.status === "booked" && (
                      <div className="flex justify-between mt-3">
                      <button
                        onClick={() => handleCancel(a.id)}
                        className="bg-black  text-white px-3 py-1 rounded-lg hover:bg-gray-800 shadow-sm transition"
                      >
                        Cancel
                      </button>

                     
                    </div>)}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Past */}
            {past.length > 0 && (
              <section>
                <h3 className="text-2xl font-bold text-gray-700 mb-4">Past</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {past.map((a) => (
                    <div
                      key={a.id}
                      className="bg-white p-5 rounded-2xl shadow-md flex flex-col space-y-3"
                    >
                      <div className="flex justify-between items-center">
                        <div className="text-lg font-semibold text-gray-800">
                          Dr. {a.doctor?.name}
                        </div>
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                            a.status === "completed"
                              ?"bg-green-100 text-green-700":"bg-red-100 text-red-700"
                              
                          }`}
                        >
                          {capitalize(a.status)}
                        </span>
                      </div>

                      <div className="text-gray-600 space-y-1">
                        <div>
                          <strong>Specialization:</strong>{" "}
                          {a.doctor?.specialization}
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
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
