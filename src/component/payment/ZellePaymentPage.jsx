import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import QR from "../../assets/QR.png";
import Navbar from "../nav/NavBar";
import Footer from "../footer/Footer";

const ZellePaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const participants = location.state?.participants || [];

  const [transactionId, setTransactionId] = useState("");
  const [screenshot, setScreenshot] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!transactionId || !screenshot) {
      alert("Please provide BOTH Transaction ID and Screenshot");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("transactionId", transactionId);
      formData.append("participants", JSON.stringify(participants));
      formData.append("file", screenshot);

      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/zelle-payment`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Payment submitted successfully!");
      navigate("/");
    } catch (error) {
      console.error(error);
      alert("Error submitting payment");
    }

    setLoading(false);
  };

  return (
  <div className="min-h-screen bg-[#FBF8F2] flex flex-col">

    {/* Navbar */}
    <Navbar />

    {/* Main Content */}
    <div className="flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8 py-10">

      <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-6 sm:p-8 space-y-6">

        {/* Title */}
        <h2 className="text-xl sm:text-2xl font-bold text-center text-[#1B2B4B]">
          Zelle Payment
        </h2>

        {/* QR Section */}
        <div className="bg-blue-50 border border-blue-100 p-5 rounded-xl text-center space-y-4 flex flex-col items-center">

          <p className="text-sm sm:text-md font-semibold text-gray-700">
            Scan to Pay via Zelle
          </p>

          <img
            src={QR}
            alt="Zelle QR Code"
            className="w-32 h-32 sm:w-40 sm:h-40 md:w-44 md:h-44 p-2 bg-white rounded-xl shadow"
          />

          <p className="text-xs sm:text-sm text-gray-600 break-all">
            {import.meta.env.VITE_ZELLE_EMAIL}
          </p>

          <p className="text-xs text-gray-500">
            After payment, enter Transaction ID & upload screenshot
          </p>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-gray-300"></div>
          <span className="text-gray-500 text-xs sm:text-sm">
            Payment Proof
          </span>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

        {/* Transaction ID */}
        <div>
          <label className="block text-sm font-semibold mb-1">
            Transaction ID <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={transactionId}
            onChange={(e) => setTransactionId(e.target.value)}
            className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none text-sm"
            placeholder="Enter Zelle reference ID"
          />
        </div>

        {/* Screenshot Upload */}
        <div>
          <label className="block text-sm font-semibold mb-1">
            Upload Screenshot <span className="text-red-500">*</span>
          </label>
          <input
            type="file"
            onChange={(e) => setScreenshot(e.target.files[0])}
            className="w-full text-sm border border-gray-300 p-2 rounded-lg file:mr-3 file:py-1 file:px-3 file:border-0 file:rounded-md file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200"
          />
        </div>

        {/* Button */}
        <button
          onClick={handleSubmit}
          disabled={loading || !transactionId || !screenshot}
          className="w-full bg-[#1B2B4B] text-white py-3 rounded-xl font-semibold hover:bg-[#0f3170] transition-all duration-300 disabled:opacity-50"
        >
          {loading ? "Submitting..." : "Submit Payment Proof"}
        </button>

      </div>
    </div>

    {/* Footer */}
    <Footer />

  </div>

  );
};

export default ZellePaymentPage;