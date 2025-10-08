import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar.jsx";

const statusColors = {
  booked: "bg-indigo-100 text-indigo-700 border border-indigo-300",
  completed: "bg-emerald-100 text-emerald-700 border border-emerald-300",
  cancelled: "bg-rose-100 text-rose-700 border border-rose-300",
};

const DoctorAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("https://e-health-appointment-system.onrender.com/doctor-appointments", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAppointments(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  // Filter + search logic
  const filteredAppointments = appointments.filter((appt) => {
    const matchesSearch = appt.patient.name
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesFilter =
      filter === "all" ? true : appt.status.toLowerCase() === filter;
    return matchesSearch && matchesFilter;
  });

  if (loading)
    return (
      <div className="flex justify-center items-center h-60">
        <div className="w-10 h-10 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );

  if (!appointments.length)
    return (
      <div className="flex justify-center items-center h-60">
        <div className="bg-white shadow-md rounded-xl p-6 text-center max-w-md">
          <p className="text-gray-600 text-lg font-medium">
            No appointments found.
          </p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-blue-100">
      <Navbar />
      <div className="p-6 max-w-6xl mx-auto mt-6">
        <h2 className="text-3xl font-bold mb-6 text-blue-700 flex items-center gap-2">
          📅 My Appointments
        </h2>

       
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
          <input
            type="text"
            placeholder="Search patient..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full sm:w-1/2 px-4 py-2 border text-blue-900 border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400"
          />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 text-blue-900"
          >
            <option value="all">All Status</option>
            <option value="booked">Booked</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead className="bg-gradient-to-r from-blue-200 to-blue-300 text-blue-900 text-left">
                <tr>
                  <th className="py-3 px-4 font-semibold ">Patient Name</th>
                  <th className="py-3 px-4 font-semibold">Email</th>
                  <th className="py-3 px-4 font-semibold">Date</th>
                  <th className="py-3 px-4 font-semibold">Time</th>
                  <th className="py-3 px-4 font-semibold text-center">
                    Status
                  </th>
                  <th className="py-3 px-4 font-semibold text-center">
                    Reason
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredAppointments.length ? (
                  filteredAppointments.map((appt, idx) => (
                    <tr
                      key={appt.id}
                      className={`${
                        idx % 2 === 0 ? "bg-gray-50" : "bg-white"
                      } hover:bg-blue-50 transition`}
                    >
                      <td className="py-3 px-4 text-blue-900">{appt.patient.name}</td>
                      <td className="py-3 px-4 text-blue-900">{appt.patient.email}</td>
                      <td className="py-3 px-4 text-blue-900">{appt.date}</td>
                      <td className="py-3 px-4 text-blue-900">{appt.time}</td>
                      <td className="py-3 px-4 text-center">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-semibold shadow-sm capitalize ${statusColors[appt.status]}`}
                        >
                          {appt.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-blue-900">{appt.reason|| "No reason provided"}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="5"
                      className="text-center py-6 text-gray-500 font-medium"
                    >
                      No results match your search/filter.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorAppointments;
