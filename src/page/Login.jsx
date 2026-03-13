import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoMdEyeOff,IoIosEye } from "react-icons/io";
import { MdOutlineEmail } from "react-icons/md";
import axios from 'axios'

const Login = () => {

    const navigate = useNavigate()

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword,setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false);


const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await axios.post(
      
      "http://10.10.45.94:5000/api/auth/login",
      {
        email: email,
        password: password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log(response.data);

    localStorage.setItem("token", response.data.token);
    navigate("/adminDashboard");

  } catch (error) {
    console.error(error);

    setError(
      error.response?.data?.message ||
      "Invalid email or password. Please try again."
    );
    
  }
  finally {
    setLoading(false);
  }
};

  const togglePassword =()=>{
    setShowPassword(!showPassword)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">

      <div className="bg-white w-full max-w-md rounded-2xl shadow-lg p-8">

        {/* Logo */}
        <div className="flex justify-center mb-8">
          <img src="/logo.png" 
          alt="logo" 
          className="w-50 h-50 object-contain"/>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Email */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Email
            </label>

            <div className="relative">
              <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-red-400"
              required
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl">
              <MdOutlineEmail/>
            </div>
            </div>
            
          </div>

          {/* Password */}
          <div >
            <label className="block text-gray-700 font-medium mb-2">
              Password
            </label>

            <div className="relative">
              <input
              type={showPassword? "text":"password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-red-400"
              required
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl">
              {
                showPassword ? 
                <button type="button" onClick={togglePassword}><IoMdEyeOff /></button> : 
                <button type="button" onClick={togglePassword}><IoIosEye /></button>
              }
            </div>
            </div>
            
          </div>
          {error && (
            <div className="bg-red-100 text-red-600 text-sm p-3 rounded-lg">
                {error}
            </div>
            )}

          {/* Button */}
          <div className="flex justify-center pt-2">
            <button
              type="submit"
              className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-lg shadow-md transition"
              disabled={loading}
              
            >
              {loading ? (
                <div className="flex items-center gap-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Signing in...
                </div>
              ) : (
                "Submit"
              )}
            </button>
          </div>

        </form>

      </div>

    </div>
  );
};

export default Login;