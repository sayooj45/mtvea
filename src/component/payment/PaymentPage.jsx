import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useLocation } from "react-router-dom";
import PaymentForm from "./PaymentForm";
import Navbar from "../nav/NavBar";
import Footer from "../footer/Footer";

const stripePromise = loadStripe(
  "pk_test_51T7aIFCoEBhma3nFbXyksIpXQXF1ZRRjsjDtVk22urXt2PZyJjvAxOmFIC7eR4yUakb4ejIuuQAVoH5Bq2A01VpD00g7ZTdu3W"
);

const PaymentPage = () => {
  const location = useLocation();
  const participants = location.state?.participants || [];

  return (
    <div className="flex flex-col min-h-screen bg-[#FBF8F2]">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-grow flex justify-center items-center p-4">
        <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg w-full max-w-lg">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-6">
            Conference Payment
          </h2>

          <Elements stripe={stripePromise}>
            <PaymentForm participants={participants} />
          </Elements>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default PaymentPage;