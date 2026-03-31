import Navbar from "../component/nav/NavBar";
import Footer from "../component/footer/Footer";
import { useEffect, useState } from "react";

const TermsAndConditions = () => {
  const [showTop, setShowTop] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowTop(true);
      } else {
        setShowTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <div className="bg-[#FBF8F2] text-[#1a1a1a] min-h-screen">
      <Navbar />

      <div className="w-full h-px bg-gray-300"></div>

      {/* HERO */}
      <div className="bg-[#1B2B4B] text-center px-6 py-14">
        <p className="text-white/40 text-xs mb-2">Home › Terms & Conditions</p>
        <h1 className="text-white text-3xl md:text-5xl font-serif">
          Terms & Conditions
        </h1>
        <p className="text-white/50 text-sm mt-2">
          Mar Thoma Voluntary Evangelists Association Diocesan Conference
        </p>
      </div>

      {/* CONTENT */}
      <div className="max-w-4xl mx-auto px-6 py-14 space-y-8 leading-7">
        {/* Effective Date */}
        <p className="text-sm text-gray-500">Effective Date: March 30, 2026</p>

        {/* Intro */}
        <p>
          Welcome to the Mar Thoma Voluntary Evangelists Association — Diocese
          of North America Conference website. By using this site and
          registering for the Conference, you agree to the following Terms &
          Conditions.
        </p>

        {/* Sections */}
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-[#1B2B4B] mb-2">
              Registration
            </h3>
            <p>
              All attendees must register through the official website and
              provide accurate and complete information.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-[#1B2B4B] mb-2">
              Fees & Payment
            </h3>
            <p>
              Conference fees are displayed in USD and must be paid using the
              available payment methods on the website. Participants are
              responsible for any applicable transaction fees or taxes.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-[#1B2B4B] mb-2">
              Cancellations & Refunds
            </h3>
            <p>
              Refund and transfer policies are provided on the website. All
              requests must be submitted via email to{" "}
              <span className="text-[#C49A3C] font-medium">
                mtvea2026@gmail.com
              </span>
              .
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-[#1B2B4B] mb-2">
              Health & Safety
            </h3>
            <p>
              All attendees are required to comply with venue rules and any
              applicable public health guidelines in effect at the time of the
              Conference.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-[#1B2B4B] mb-2">
              Contact Information
            </h3>
            <p>For registration-related inquiries, please contact us:</p>
            <p className="mt-2">
              📧 Email:{" "}
              <span className="text-[#C49A3C] font-medium">
                mtvea2026@gmail.com
              </span>
              <br />
              📞 Phone:{" "}
              <span className="text-[#C49A3C] font-medium">972-261-4221</span>
            </p>
          </div>
        </div>
      </div>

      {showTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 group"
        >
          {/* Glow */}
          <span className="absolute inset-0 rounded-full bg-[#1B2B4B]/40 blur-xl opacity-70 group-hover:opacity-100 transition"></span>

          {/* Button */}
          <div
            className="relative flex items-center justify-center w-12 h-12 rounded-full 
      bg-[#1B2B4B] text-white shadow-xl backdrop-blur-md 
      border border-white/20 
      group-hover:scale-110 transition-all duration-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 group-hover:-translate-y-1 transition"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 15l7-7 7 7"
              />
            </svg>
          </div>
        </button>
      )}

      <Footer />
    </div>
  );
};

export default TermsAndConditions;
