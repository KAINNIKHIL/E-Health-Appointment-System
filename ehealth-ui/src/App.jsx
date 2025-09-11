import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/register.jsx";
import Login from "./pages/login.jsx";
import HomePage from "./components/HomePage";
import BookAppointment from "./pages/BookAppointment.jsx";
import MyAppointments from "./pages/MyAppointments.jsx";
import DoctorAppointments from "./pages/DoctorAppointments.jsx";
import { Toaster } from "react-hot-toast";

function App() {
  return (
  <>
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Login />} />
        <Route path="/book" element={<BookAppointment />} />
        <Route path="/my-appointments" element={<MyAppointments />} />
        <Route path="/doctor-appointments" element={<DoctorAppointments />} />
      </Routes>
    </BrowserRouter>
    <Toaster position="top-right" reverseOrder={false} />
  </>
  );
}

export default App;
