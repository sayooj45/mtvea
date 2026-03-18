import React, { useState } from "react";
import axios from "axios";
import { MdOutlineEmail } from "react-icons/md";

const ForgotPassword = () => {

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    try {

      const response = await axios.post(
        "https://mtveanationalconference-backend.vercel.app/api/auth/forgot-password",
        { email }
      );

      setMessage(response.data.message || "Reset link sent to your email");

    } catch (error) {

      setMessage(
        error.response?.data?.message || "Something went wrong"
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">

      <div className="bg-white w-full max-w-md rounded-2xl shadow-lg p-8">

        {/* Logo */}
        <div className="flex justify-center mb-8">
          <img
            src="/logo.png"
            alt="logo"
            className="w-40 object-contain"
          />
        </div>

        <h2 className="text-center text-2xl font-bold text-gray-700 mb-6">
          Forgot Password
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Email */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Enter your email
            </label>

            <div className="relative">

              <input
                type="email"
                placeholder="Enter registered email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-red-400"
                required
              />

              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl">
                <MdOutlineEmail />
              </div>

            </div>
          </div>

          {/* Message */}
          {message && (
            <div className="bg-blue-100 text-blue-700 text-sm p-3 rounded-lg">
              {message}
            </div>
          )}

          {/* Button */}
          <div className="flex justify-center">

            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg shadow-md transition"
            >

              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Sending...
                </div>
              ) : (
                "Send Reset Link"
              )}

            </button>

          </div>

        </form>

      </div>

    </div>
  );
};

export default ForgotPassword;