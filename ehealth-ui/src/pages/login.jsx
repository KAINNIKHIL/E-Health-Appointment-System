import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://e-health-appointment-system.onrender.com/auth/login", form);
      toast.success(res.data.message);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
      navigate("/home");
    } catch (err) {
      toast.error(err.response?.data?.message || "Error logging in");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen min-w-screen  bg-gradient-to-br from-blue-50 to-blue-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-2xl p-10 rounded-2xl w-full max-w-md space-y-6"
      >
        <h2 className="text-3xl font-extrabold text-center text-blue-700">
          Welcome Back
        </h2>
        <p className="text-center text-gray-500">Login to continue</p>

        <div className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded-lg bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded-lg bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold p-3 rounded-lg hover:bg-blue-700 transition"
        >
          Login
        </button>

        <p className="text-center text-gray-500">
          Don&apos;t have an account?{" "}
          <a href="/register" className="text-blue-600 hover:underline">
            Register
          </a>
        </p>
      </form>
    </div>
  );
}
