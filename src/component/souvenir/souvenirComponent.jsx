import Navbar from "../nav/NavBar";
import Footer from "../footer/Footer";
import { useEffect, useState } from "react";

const premiumAds = [
  { name: "Back Cover Page", price: "$3,000" },
  { name: "Inside Front Cover", price: "$2,000" },
  { name: "Inside Back Cover", price: "$1,500" },
  { name: "Inside Platinum Full Page", price: "$1,000" },
  { name: "Inside Gold Full Page", price: "$750" },
];

const interiorAds = [
  { name: "Inside Full Page", price: "$500" },
  { name: "Inside Half Page", price: "$300" },
];

const SouvenirComponent = () => {
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
        <p className="text-white/40 text-xs mb-2">Home › Souvenir</p>
        <h1 className="text-white text-3xl md:text-5xl font-serif">
          Souvenir Advertisement
        </h1>
        <p className="text-white/50 text-sm mt-2">
          Support the Conference by placing your advertisement
        </p>
      </div>

      {/* CONTENT */}
      <div className="max-w-5xl mx-auto px-6 py-14 space-y-12">
        {/* Intro */}
        <section className="text-center max-w-2xl mx-auto">
          <p className="text-gray-600 text-md leading-7">
            We invite you to support our conference by placing an advertisement
            in our official souvenir. Below are the available advertisement
            options.
          </p>
        </section>

        {/* PREMIUM */}
        <section>
          <span className="bg-[#F9F3E3] text-[#C49A3C] text-xs px-3 py-1 uppercase">
            Premium Placements
          </span>

          <h2 className="text-2xl font-serif text-[#1B2B4B] mt-3 mb-6">
            Featured Advertisement Options
          </h2>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
            {premiumAds.map((item, i) => (
              <div
                key={i}
                className="bg-white border border-[#C49A3C]/20 rounded-lg p-5 
                hover:shadow-lg hover:-translate-y-1 transition duration-300"
              >
                <h3 className="text-lg font-semibold text-[#1B2B4B]">
                  {item.name}
                </h3>

                <p className="text-[#C49A3C] text-xl font-semibold mt-2">
                  {item.price}
                </p>

                <div className="w-8 h-[2px] bg-[#C49A3C] mt-3"></div>
              </div>
            ))}
          </div>
        </section>

        {/* INTERIOR */}
        <section>
          <span className="bg-[#F9F3E3] text-[#C49A3C] text-xs px-3 py-1 uppercase">
            Interior Placements
          </span>

          <h2 className="text-2xl font-serif text-[#1B2B4B] mt-3 mb-6">
            Standard Advertisement Options
          </h2>

          <div className="grid sm:grid-cols-2 gap-5 max-w-xl">
            {interiorAds.map((item, i) => (
              <div
                key={i}
                className="bg-white border border-[#C49A3C]/20 rounded-lg p-5 
                hover:shadow-md transition duration-300"
              >
                <h3 className="text-lg font-semibold text-[#1B2B4B]">
                  {item.name}
                </h3>

                <p className="text-[#C49A3C] text-xl font-semibold mt-2">
                  {item.price}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-[#1B2B4B] text-white rounded-lg p-6 text-center">
          <h3 className="text-lg font-serif mb-2">Submit Your Advertisement</h3>

          <p className="text-white/70 text-sm mb-4">
            Please send your advertisement in JPEG or PDF format to:
          </p>

          <p className="text-[#E8C97A] font-medium">mtvea2026@gmail.com</p>
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

export default SouvenirComponent;
