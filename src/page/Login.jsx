import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoMdEyeOff, IoIosEye } from "react-icons/io";
import { MdOutlineEmail } from "react-icons/md";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        `${API_URL}api/auth/login`,
        { email, password },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      localStorage.setItem("token", response.data.token);
      navigate("/adminDashboard");
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Invalid email or password. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const togglePassword = () => setShowPassword(!showPassword);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FBF8F2] px-4 py-10">

      {/* Card */}
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-6 sm:p-8 space-y-6">

        {/* Logo */}
        <div className="flex justify-center">
          <img
            src="/logo.png"
            alt="logo"
            className="w-28 sm:w-32 object-contain"
          />
        </div>

        {/* Title */}
        <h2 className="text-center text-xl sm:text-2xl font-bold text-[#1B2B4B]">
          Admin Login
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold mb-1 text-gray-700">
              Email
            </label>

            <div className="relative">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 outline-none text-sm focus:ring-2 focus:ring-[#1B2B4B]/40"
                required
              />

              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg">
                <MdOutlineEmail />
              </div>
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-semibold mb-1 text-gray-700">
              Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 outline-none text-sm focus:ring-2 focus:ring-[#1B2B4B]/40"
                required
              />

              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg">
                <button type="button" onClick={togglePassword}>
                  {showPassword ? <IoMdEyeOff /> : <IoIosEye />}
                </button>
              </div>
            </div>
          </div>

          {/* Forgot Password */}
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => navigate("/forgot-password")}
              className="text-xs sm:text-sm text-[#1B2B4B] hover:underline"
            >
              Forgot Password?
            </button>
          </div>

          {/* Error */}
          {error && (
            <div className="bg-red-100 text-red-600 text-sm p-3 rounded-lg">
              {error}
            </div>
          )}

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#1B2B4B] hover:bg-[#0f3170] text-white py-2.5 rounded-xl font-semibold transition-all duration-300 disabled:opacity-50"
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Signing in...
              </div>
            ) : (
              "Sign In"
            )}
          </button>

        </form>
      </div>
    </div>
  );
};

export default Login;