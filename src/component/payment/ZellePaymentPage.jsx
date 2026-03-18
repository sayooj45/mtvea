import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const ZellePaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const participants = location.state?.participants || [];

  const [transactionId, setTransactionId] = useState("");
  const [screenshot, setScreenshot] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!transactionId && !screenshot) {
      alert("Please provide Transaction ID or upload screenshot");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();

      formData.append("transactionId", transactionId);
      formData.append("participants", JSON.stringify(participants));

      if (screenshot) {
        formData.append("file", screenshot);
      }

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
  <div className="min-h-screen flex justify-center items-center bg-gray-100 p-6">
    <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-lg space-y-6">

      <h2 className="text-2xl font-bold text-center text-blue-800">
        Zelle Payment
      </h2>

      {/* Instructions */}
      <div className="bg-blue-50 border border-blue-200 p-5 rounded-xl text-center space-y-2">
        <p className="text-md font-semibold text-gray-700">
          Send your payment via Zelle to
        </p>

        <p className="text-xl font-bold text-blue-900">
          {import.meta.env.VITE_ZELLE_EMAIL || "zelle@email.com"}
        </p>

        <p className="text-sm text-gray-500">
          After payment, provide either Transaction ID OR upload screenshot
        </p>
      </div>

      {/* Divider */}
      <div className="flex items-center gap-3">
        <div className="flex-1 h-px bg-gray-300"></div>
        <span className="text-gray-500 text-sm">Payment Proof</span>
        <div className="flex-1 h-px bg-gray-300"></div>
      </div>

      {/* Transaction ID */}
      <div>
        <label className="block font-semibold mb-1">
          Transaction ID
        </label>
        <input
          type="text"
          value={transactionId}
          onChange={(e) => setTransactionId(e.target.value)}
          className="w-full border p-2.5 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
          placeholder="Enter Zelle reference ID"
        />
      </div>

      {/* OR Text */}
      <div className="text-center text-gray-500 text-sm">OR</div>

      {/* Screenshot Upload */}
      <div>
        <label className="block font-semibold mb-1">
          Upload Screenshot
        </label>
        <input
          type="file"
          onChange={(e) => setScreenshot(e.target.files[0])}
          className="w-full border p-2 rounded-lg"
        />
      </div>

      {/* Button */}
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition"
      >
        {loading ? "Submitting..." : "Submit Payment Proof"}
      </button>

    </div>
  </div>
);

};

export default ZellePaymentPage;