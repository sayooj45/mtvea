import Navbar from "../component/nav/NavBar";
import Footer from "../component/footer/Footer";
import { useEffect, useState } from "react";

const PrivacyPolicy = () => {
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
        <p className="text-white/40 text-xs mb-2">Home › Privacy Policy</p>
        <h1 className="text-white text-3xl md:text-5xl font-serif">
          Privacy Policy
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
          This Privacy Policy explains how we collect, use, and protect personal
          data related to Conference registration and use of this website.
        </p>

        {/* Sections */}
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-[#1B2B4B] mb-2">
              Data Collected
            </h3>
            <p>
              We may collect registration details such as name, church, role,
              email address, phone number, and billing information. We may also
              collect technical data including IP address, device information,
              cookies, and any communications you send to us.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-[#1B2B4B] mb-2">
              Purpose of Data Use
            </h3>
            <p>
              Your data is used to process registrations and payments,
              communicate important event information, and operate and improve
              the website experience.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-[#1B2B4B] mb-2">
              Data Sharing
            </h3>
            <p>
              We may share your information with trusted service providers who
              assist in processing registrations, payments, and website
              operations on our behalf.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-[#1B2B4B] mb-2">
              Data Retention
            </h3>
            <p>
              Personal data is retained only for as long as necessary to fulfill
              the purposes of the Conference and to comply with legal
              obligations.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-[#1B2B4B] mb-2">
              Data Security
            </h3>
            <p>
              We implement reasonable safeguards to protect your personal data.
              However, no method of transmission or storage is completely
              secure, and absolute security cannot be guaranteed.
            </p>
          </div>

          {/* Contact */}
          <div className="bg-[#1B2B4B] text-center text-white py-10 px-6 rounded-lg mt-10">
            {/* Title */}
            <p className="text-[#E8C97A] text-sm uppercase tracking-widest">
              Contact for Privacy Requests
            </p>

            {/* Organization */}
            <h3 className="text-lg md:text-xl font-serif mt-2">
              Mar Thoma Voluntary Evangelists Association
            </h3>

            <p className="text-white/60 text-sm mt-1">
              Diocese of North America
            </p>

            {/* Divider */}
            <div className="w-16 h-[2px] bg-[#E8C97A] mx-auto my-4"></div>

            {/* Contact Info */}
            <div className="space-y-2 text-sm md:text-base">
              <p>
                📧{" "}
                <span className="text-[#E8C97A] font-medium">
                  mtvea2026@gmail.com
                </span>
              </p>
              <p>
                📞{" "}
                <span className="text-[#E8C97A] font-medium">972-261-4221</span>
              </p>
            </div>
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

export default PrivacyPolicy;
