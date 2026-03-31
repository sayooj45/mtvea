import Navbar from "../nav/NavBar";
import Footer from "../footer/Footer";
import { useEffect, useState } from "react";

const AccommodationComponent = () => {
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
    <div className="bg-[#FBF8F2] text-[#1a1a1a]">
      <Navbar />

      <div className="w-full h-px bg-gray-300"></div>

      {/* HEADER */}
      <div className="bg-[#1B2B4B] text-center px-6 py-14">
        <p className="text-white/40 text-xs mb-2">Home › Hotel</p>
        <h1 className="text-white text-3xl md:text-5xl font-serif">
          Hotel Information
        </h1>
        <p className="text-white/50 text-sm mt-2">
          Stay comfortably during the conference
        </p>
      </div>

      {/* CONTENT */}
      <div className="max-w-4xl mx-auto px-6 py-14 space-y-10">
        {/* Intro */}
        <section>
          <span className="bg-[#F9F3E3] text-[#C49A3C] text-sm px-3 py-1 uppercase">
            Accommodation
          </span>

          <h2 className="text-2xl font-serif text-[#1B2B4B] mt-3 mb-4">
            Renaissance Dallas North Hotel
          </h2>

          <p className="text-gray-600 leading-7">
            Hotel accommodations for the conference are available at the
            Renaissance Dallas North Hotel, located at:
          </p>

          <p className="mt-3 text-[#1B2B4B] font-medium">
            1590 Lyndon B Johnson Freeway, Dallas, TX, 75234
          </p>
        </section>

        {/* Pricing Card */}
        <section className="bg-white border border-[#C49A3C]/20 rounded-lg p-6 shadow-sm">
          <h3 className="text-xl font-serif text-[#1B2B4B] mb-3">
            Special Group Rate
          </h3>

          <p className="text-gray-600 mb-3">
            Participants can take advantage of a special group discount rate:
          </p>

          <p className="text-2xl font-semibold text-[#C49A3C]">
            $100 + tax / night
          </p>

          <div className="mt-4 text-sm text-gray-600">Use discount code:</div>

          <div className="inline-block mt-2 bg-[#1B2B4B] text-white px-4 py-1 rounded">
            MTC
          </div>
        </section>

        {/* Booking Instructions */}
        <section>
          <span className="bg-[#F9F3E3] text-[#C49A3C] text-sm px-3 py-1 uppercase">
            Reservation
          </span>

          <h3 className="text-xl font-serif text-[#1B2B4B] mt-3 mb-4">
            How to Book
          </h3>

          <p className="text-gray-600 leading-7 mb-4">
            To secure your reservation and ensure you receive the discounted
            rate, please contact the hotel directly.
          </p>

          <div className="bg-[#1B2B4B] text-white p-5 rounded-lg flex flex-col sm:flex-row justify-between items-center gap-4">
            <div>
              <p className="text-white/70 text-sm">Call Hotel</p>
              <p className="text-lg font-semibold">214-442-2142</p>
            </div>

            <a
              href="tel:2144422142"
              className="bg-[#C49A3C] text-white px-5 py-2 rounded transition hover:scale-105"
            >
              Call Now
            </a>
          </div>
        </section>
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

export default AccommodationComponent;
