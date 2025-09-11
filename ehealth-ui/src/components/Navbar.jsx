import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Navbar() {
  const role = localStorage.getItem("role");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    toast.success("Logged out successfully!");
    navigate("/", { replace: true });
  };

  return (
    <nav className="bg-blue-700 px-12 py-4 flex justify-between items-center min-w-screen shadow-md">
      <h1 className="text-3xl font-extrabold tracking-wide text-white">
        E-Health
      </h1>

      <div className="flex items-center space-x-8 text-lg font-medium ">
        <Link
          to="/home"
          className="text-white hover:text-yellow-300 transition-colors duration-200"
        >
          Home
        </Link>

        {role === "patient" && (
          <>
            <Link
              to="/book"
              className="text-white hover:text-yellow-300 transition-colors duration-200"
            >
              Book Appointment
            </Link>
            <Link
              to="/my-appointments"
              className="text-white hover:text-yellow-300 transition-colors duration-200"
            >
              My Appointments
            </Link>
          </>
        )}

        {role === "doctor" && (
          <Link
            to="/doctor-appointments"
            className="text-white hover:text-yellow-300 transition-colors duration-200"
          >
            Booked Appointments
          </Link>
        )}

        <button
          onClick={handleLogout}
          className="bg-black text-white px-5 py-2 rounded-lg hover:bg-gray-800 shadow-md transition duration-200"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
