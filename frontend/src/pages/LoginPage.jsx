import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

import { loginUser } from "../api/authApi";
import { useAuth } from "../context/AuthContext";

function LoginPage() {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  function handleChange(event) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      setLoading(true);

      const response = await loginUser(formData);

      // Store token + user info
      login(
        response.access_token,
        response.user
      );
      toast.success("Login successful! Welcome back 👋");

      navigate("/dashboard");
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.detail ||
          "Login failed."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 dark:bg-slate-950 transition-colors">

      <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-xl p-10">

        <h1 className="text-4xl font-bold text-center text-slate-800 dark:text-white">
          Login
        </h1>

        <p className="text-center text-gray-500 dark:text-gray-400 mt-3 mb-8">
          Welcome back to HireLens AI
        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-4 rounded-xl border dark:bg-slate-800 dark:text-white"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-4 rounded-xl border dark:bg-slate-800 dark:text-white"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-bold transition disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

        <p className="text-center mt-6 text-gray-600 dark:text-gray-400">
          Don't have an account?

          <Link
            to="/register"
            className="text-blue-600 font-semibold ml-2"
          >
            Register
          </Link>
        </p>

        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-8">
          Developed by{" "}
          <span className="font-semibold text-blue-600">
            Praveen Seeri
          </span>
        </p>

      </div>

    </div>
  );
}

export default LoginPage;