import React, { useState } from "react";
import axios from "axios";
import { IoMdEyeOff,IoIosEye } from "react-icons/io";
import { useNavigate } from "react-router-dom";
const ResetPassword = () => {


  const [newPassword,setNewPassword] = useState("")
  const [confirmPassword,setConfirmPassword] = useState("")
  const [message,setMessage] = useState("")
  const [loading,setLoading] = useState(false)
    const [showNewPassword,setShowNewPassword] = useState(false)
    const [showConfirmPassword,setShowConfirmPassword] = useState(false)

  const navigate =useNavigate()



  const handleSubmit = async (e) => {

    e.preventDefault()

    if(newPassword !== confirmPassword){
      setMessage("New password and confirm password do not match")
      return
    }

    try{

      setLoading(true)

      // const token = localStorage.getItem("token")

      const res = await axios.put(
        "https://mtveanationalconference-backend.vercel.app/api/auth/reset-password",
        {
          email,
          currentPassword,
          newPassword
        },
        {
          // headers:{
          //   Authorization: token
          // }
        }
      )

      setMessage(res.data.message || "Password updated successfully")
      navigate('/login')
      

    }catch(error){

      setMessage(
        error.response?.data?.message ||
        "Failed to reset password"
      )

    }finally{
      setLoading(false)
    }

  }

  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">

        <div className="flex flex-col items-center mb-8">
            <img src='/logo.png' alt="logo"  className="w-50 h-50 object-contain"/>
            <h2 className="text-2xl font-bold text-center mb-6">
                Reset Password
            </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">

          <div className="relative">
            <input
            type={showNewPassword? "text":"password"}
            placeholder="New Password"
            value={newPassword}
            onChange={(e)=>setNewPassword(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-600"
            required
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl">
            {
              showNewPassword ? 
                <button type="button" onClick={()=>{setShowNewPassword(!showNewPassword)}}><IoMdEyeOff /></button> : 
                <button type="button" onClick={()=>{setShowNewPassword(!showNewPassword)}}><IoIosEye /></button>
            }
            </div>
          </div>

          <div className="relative">
            <input
            type={showConfirmPassword? "text":"password"}
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e)=>setConfirmPassword(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-600"
            required
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl">
            {
              showConfirmPassword ? 
                <button type="button" onClick={()=>{setShowConfirmPassword(!showConfirmPassword)}}><IoMdEyeOff /></button> : 
                <button type="button" onClick={()=>{setShowConfirmPassword(!showConfirmPassword)}}><IoIosEye /></button>
            }
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg"
          >
            {loading ?(
                <div className="flex justify-center items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Updating...
                </div>
            ) : "Update Password"}
          </button>

        </form>

        {message && (
          <p className="text-center text-sm mt-4 text-red-600">
            {message}
          </p>
        )}

      </div>

    </div>

  );
};

export default ResetPassword;