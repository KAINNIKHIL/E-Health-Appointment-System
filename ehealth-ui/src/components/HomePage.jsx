import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const role = localStorage.getItem("role");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/", { replace: true });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Navbar */}
      <nav className="bg-blue-700 text-white px-12 py-4 flex justify-between items-center shadow-md">
        <h1 className="text-3xl font-extrabold tracking-wide">E-Health</h1>
        <div className="flex items-center space-x-8 text-lg font-medium">
          <Link
            to="/home"
            className="text-white hover:text-gray-200 transition-colors duration-200"
          >
            Home
          </Link>

          {role === "patient" && (
            <>
              <Link
                to="/book"
                className="text-white hover:text-gray-200 transition-colors duration-200"
              >
                Book Appointment
              </Link>
              <Link
                to="/my-appointments"
                className="text-white hover:text-gray-200 transition-colors duration-200"
              >
                My Appointments
              </Link>
            </>
          )}

          {role === "doctor" && (
            <Link
              to="/doctor-appointments"
              className="text-white hover:text-gray-200 transition-colors duration-200"
            >
              Booked Appointments
            </Link>
          )}

          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600 shadow-md transition duration-200"
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center text-center py-32 px-24 bg-gradient-to-r from-blue-50 to-blue-100">
        <h2 className="text-5xl font-extrabold text-blue-800 mb-6">
          Welcome to E-Health
        </h2>
        <p className="text-gray-700 max-w-3xl mb-16 text-xl">
          {role === "patient"
            ? "Book your doctor appointments online and manage them easily."
            : "View and manage appointments booked by patients."}
        </p>

        {/* Role-based Options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 w-full max-w-6xl">
          {role === "patient" && (
            <>
              <Link
                to="/book"
                className="flex flex-col items-center justify-center bg-white border border-blue-200 shadow-xl rounded-3xl p-12 text-blue-700 font-semibold hover:bg-blue-50 hover:scale-105 transition transform duration-300"
              >
                <span className="text-5xl mb-4">📅</span>
                Book Appointment
              </Link>

              <Link
                to="/my-appointments"
                className="flex flex-col items-center justify-center bg-white border border-blue-200 shadow-xl rounded-3xl p-12 text-blue-700 font-semibold hover:bg-blue-50 hover:scale-105 transition transform duration-300"
              >
                <span className="text-5xl mb-4">📖</span>
                View My Appointments
              </Link>
            </>
          )}

          {role === "doctor" && (
            <Link
              to="/doctor-appointments"
              className="flex flex-col items-center justify-center bg-white border border-blue-200 shadow-xl rounded-3xl p-12 text-blue-700 font-semibold hover:bg-blue-50 hover:scale-105 transition transform duration-300"
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
