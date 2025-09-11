import Navbar from "./Navbar";
import { Link } from "react-router-dom";

export default function HomePage() {
  const role = localStorage.getItem("role");

  return (
    <div className="min-h-screen w-full bg-gradient-to-r from-blue-50 to-blue-100 flex flex-col items-center ">
      {/* Navbar */}
     <Navbar />

      {/* Hero Section */}
      <div className="flex flex-col items-center  justify-center text-center py-24 px-6 md:px-12 flex-1 w-full max-w-screen-lg">
        <h2 className="text-4xl md:text-5xl font-extrabold text-blue-800 mb-6">
          Welcome to E-Health
        </h2>
        <p className="text-gray-700 max-w-3xl mb-16 text-lg md:text-xl">
          {role === "patient"
            ? "Book your doctor appointments online and manage them easily."
            : "View and manage appointments booked by patients."}
        </p>

        {/* Role-based Options */}
        <div
          className={`grid gap-10 w-full max-w-6xl ${
            role === "patient"
              ? "sm:grid-cols-2 md:grid-cols-3"
              : "sm:grid-cols-1"
          }`}
        >
          {role === "patient" && (
            <>
              <Link
                to="/book"
                className="flex flex-col items-center justify-center bg-white border border-blue-200 shadow-xl rounded-3xl p-10 md:p-12 text-blue-700 font-semibold hover:bg-blue-50 hover:scale-105 transition transform duration-300"
              >
                <span className="text-5xl mb-4">📅</span>
                Book Appointment
              </Link>

              <Link
                to="/my-appointments"
                className="flex flex-col items-center justify-center bg-white border border-blue-200 shadow-xl rounded-3xl p-10 md:p-12 text-blue-700 font-semibold hover:bg-blue-50 hover:scale-105 transition transform duration-300"
              >
                <span className="text-5xl mb-4">📖</span>
                View My Appointments
              </Link>
            </>
          )}

          {role === "doctor" && (
            <Link
              to="/doctor-appointments"
              className="flex flex-col items-center justify-center bg-white border border-blue-200 shadow-xl rounded-3xl p-10 md:p-12 text-blue-700 font-semibold hover:bg-blue-50 hover:scale-105 transition transform duration-300"
            >
              <span className="text-5xl mb-4">📋</span>
              View Booked Appointments
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
