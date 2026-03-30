import { useEffect, useState } from "react";
import banner1 from "../../assets/banners/banner1.png";
import banner2 from "../../assets/banners/banner2.jpg";
import banner3 from "../../assets/banners/banner3.jpg";
import speaker1 from "../../assets/speaker11.png";
import speaker2 from "../../assets/speaker2.jpeg";
import { useNavigate } from "react-router-dom";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";

const BannerSlider = () => {
  const [slide, setSlide] = useState(0);
  const [lastInteraction, setLastInteraction] = useState(Date.now());

  const navigate = useNavigate();

  const slides = [banner1, banner2, banner3];

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();

      if (now - lastInteraction >= 15000) {
        setSlide((prev) => (prev + 1) % slides.length);
      }
    }, 15000);

    return () => clearInterval(interval);
  }, [lastInteraction, slides.length]);

  const nextSlide = () => {
    setSlide((prev) => (prev + 1) % slides.length);
    setLastInteraction(Date.now());
  };

  const prevSlide = () => {
    setSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setLastInteraction(Date.now());
  };

  return (
    <div className="relative h-[calc(100vh-100px)] overflow-hidden">
      {/* Background Slider */}
      {slides.map((img, i) => (
        <div
          key={i}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
            slide === i ? "opacity-100 z-0" : "opacity-0"
          }`}
          style={{ backgroundImage: `url(${img})` }}
        />
      ))}

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1B2B4B]/40 to-[#1B2B4B]/60"></div>

      {/* Content */}
      <div className="absolute inset-0 text-white overflow-y-auto flex items-center justify-center">
        {/* ---------------- SLIDE 1 ---------------- */}
        {slide === 0 && (
          <div className="flex flex-col justify-center items-center text-center min-h-screen px-4 sm:px-6 md:px-10 lg:px-16 py-10 text-white">
            {/* Organization Name */}
            <p
              className="uppercase tracking-widest text-yellow-400 text-sm sm:text-base md:text-lg lg:text-xl font-semibold mb-3"
              style={{ textShadow: "2px 2px 6px rgba(0,0,0,0.6)" }}
            >
              Mar Thoma Voluntary Evangelists' Association (MTVEA)
            </p>

            {/* Main Heading */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif leading-snug mb-4">
              XVIIIth Diocesan Conference <br />
              <span className="italic text-yellow-300 block mt-1">
                2026 - Dallas
              </span>
            </h1>

            {/* Theme */}
            <p className="italic text-yellow-300 mb-2 text-lg sm:text-xl md:text-2xl">
              "Come and See: The Divine Invite"
            </p>

            {/* Verse */}
            <p className="text-sm sm:text-base md:text-lg mb-4 opacity-90">
              St. John 1:39 & 46
            </p>

            {/* Host + Venue */}
            <div className="space-y-2 text-sm sm:text-base md:text-lg max-w-2xl leading-relaxed mb-6">
              <p>Hosted by MTVEA Southwest - Center A</p>
              <p>
                Venue: The Mar Thoma Church of Dallas Farmers Branch, 11550 Luna
                Rd, Farmers Branch, Texas - 75234
              </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <button
                onClick={() => navigate("/registration")}
                className="relative overflow-hidden bg-yellow-500 px-6 py-3 rounded-md text-sm sm:text-base font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-yellow-500/40 w-full sm:w-auto"
              >
                <span className="relative z-10">Register Now</span>
                <span className="absolute inset-0 bg-white/20 opacity-0 hover:opacity-100 transition duration-300"></span>
              </button>

              <button
                onClick={() => navigate("/about")}
                className="relative overflow-hidden border border-white px-6 py-3 rounded-md text-sm sm:text-base transition-all duration-300 hover:bg-white hover:text-[#1B2B4B] hover:scale-105 hover:shadow-lg w-full sm:w-auto"
              >
                Learn More
              </button>
            </div>
          </div>
        )}

        {/* ---------------- SLIDE 2 ---------------- */}
        {slide === 1 && (
          <div className="flex flex-col justify-center items-center w-full px-4 sm:px-6 md:px-10 py-10 text-center ">
            {/* Top Text */}
            <p className="text-yellow-400 uppercase text-[10px] sm:text-xs md:text-sm tracking-widest mb-2">
              Join Us
            </p>

            {/* Heading */}
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif mb-3 leading-tight">
              Register for the Conference
            </h2>

            {/* Description */}
            <p className="text-white/80 text-sm sm:text-base md:text-lg mb-6 sm:mb-8 max-w-xl leading-relaxed">
              Open to all members of MTVEA, Sevika Sanghom, and Senior Citizen
              Fellowship
            </p>

            {/* Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 w-full max-w-6xl">
              {/* Adults */}
              <div
                className="group border border-yellow-500/30 rounded-xl p-5 sm:p-6 bg-[#1B2B4B]/60 backdrop-blur-md 
    hover:scale-105 hover:border-yellow-400 transition duration-300 shadow-md"
              >
                <p className="text-xs uppercase text-white/60 mb-2">Adults</p>

                <h3 className="text-2xl sm:text-3xl text-yellow-400 font-serif">
                  $150
                </h3>

                <p className="text-xs sm:text-sm text-white/60 mt-2">
                  $50 Registration + $100 Conference Fee
                </p>

                <div className="mt-3 text-[10px] sm:text-xs bg-white/10 px-3 py-1 rounded-full inline-block">
                  18 years and above
                </div>
              </div>

              {/* Youth */}
              <div
                className="group border border-yellow-500/30 rounded-xl p-5 sm:p-6 bg-[#1B2B4B]/60 backdrop-blur-md 
    hover:scale-105 hover:border-yellow-400 transition duration-300 shadow-md"
              >
                <p className="text-xs uppercase text-white/60 mb-2">Youth</p>

                <h3 className="text-2xl sm:text-3xl text-yellow-400 font-serif">
                  $100
                </h3>

                <p className="text-xs sm:text-sm text-white/60 mt-2">
                  $50 Registration + $50 Conference Fee
                </p>

                <div className="mt-3 text-[10px] sm:text-xs bg-white/10 px-3 py-1 rounded-full inline-block">
                  Under 18 years
                </div>
              </div>

              {/* Children */}
              <div
                className="group border border-yellow-500/30 rounded-xl p-5 sm:p-6 bg-[#1B2B4B]/60 backdrop-blur-md 
    hover:scale-105 hover:border-green-400 transition duration-300 shadow-md"
              >
                <p className="text-xs uppercase text-white/60 mb-2">Children</p>

                <h3 className="text-2xl sm:text-3xl text-green-400 font-serif">
                  Free
                </h3>

                <p className="text-xs sm:text-sm text-white/60 mt-2">
                  No registration fee
                </p>

                <div className="mt-3 text-[10px] sm:text-xs bg-white/10 px-3 py-1 rounded-full inline-block">
                  Under 10 years
                </div>
              </div>
            </div>

            {/* Button */}
            <button
              onClick={() => navigate("/registration")}
              className="mt-8 relative overflow-hidden bg-yellow-500 px-6 sm:px-8 py-2.5 sm:py-3 rounded-md 
    text-sm sm:text-base font-medium transition-all duration-300 
    hover:scale-105 hover:shadow-xl hover:shadow-yellow-500/40 w-full sm:w-auto"
            >
              Register Now →
            </button>
          </div>
        )}

        {/* ---------------- SLIDE 3 ---------------- */}
        {slide === 2 && (
          <div className="flex flex-col justify-center items-center text-center px-4 sm:px-6 md:px-10 py-10 w-full pt-[150px] sm:pt-[120px] md:pt-[140px]">
            {" "}
            {/* Heading */}
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif mb-3 text-yellow-400 leading-snug ">
              Come and See : The Divine Invite
            </h2>
            {/* Description */}
            <p className="text-white/80 max-w-xl mb-6 sm:mb-8 text-sm sm:text-base md:text-lg leading-relaxed">
              Join us for a blessed gathering of worship, prayer, and the Word
              of God, with inspiring messages from our honored guest speakers.
            </p>
            {/* Speakers Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 w-full max-w-xs sm:max-w-2xl md:max-w-3xl">
              {/* Speaker 1 */}
              <div
                onClick={() => navigate("/speakers")}
                className="group cursor-pointer bg-white/10 backdrop-blur-md rounded-xl overflow-hidden 
      border border-white/20 shadow-lg 
      transition duration-300 hover:scale-105 hover:shadow-xl"
              >
                <div className="w-full aspect-[4/4.2] bg-[#1B2B4B] overflow-hidden">
                  <img
                    src={speaker1}
                    alt="Rt. Rev. Dr. Abraham Mar Paulos Episcopa"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>

                <div className="p-3 sm:p-4 text-center">
                  <h4
                    className="text-base sm:text-lg md:text-xl font-semibold 
        hover:text-yellow-400 transition-colors duration-200 
        underline-offset-4 hover:underline decoration-yellow-400/50"
                  >
                    Rt. Rev. Dr. Abraham Mar Paulos Episcopa
                  </h4>

                  <p className="text-[10px] sm:text-xs uppercase tracking-widest opacity-50 mt-1 group-hover:opacity-100 transition-opacity">
                    View Profile
                  </p>
                </div>
              </div>

              {/* Speaker 2 */}
              <div
                onClick={() => navigate("/speakers")}
                className="group cursor-pointer bg-white/10 backdrop-blur-md rounded-xl overflow-hidden 
      border border-white/20 shadow-lg 
      transition duration-300 hover:scale-105 hover:shadow-xl"
              >
                <div className="w-full aspect-[4/4.2] bg-[#1B2B4B] overflow-hidden">
                  <img
                    src={speaker2}
                    alt="Rev. Mothy Varkey"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>

                <div className="p-3 sm:p-4 text-center">
                  <h4
                    className="text-base sm:text-lg md:text-xl font-semibold 
        hover:text-yellow-400 transition-colors duration-200 
        underline-offset-4 hover:underline decoration-yellow-400/50"
                  >
                    Rev. Mothy Varkey
                  </h4>

                  <p className="text-[10px] sm:text-xs uppercase tracking-widest opacity-50 mt-1 group-hover:opacity-100 transition-opacity">
                    View Profile
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Left Arrow */}
      <button
        onClick={prevSlide}
        className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 z-50 
  bg-white/20 hover:bg-white/40 backdrop-blur-md 
  text-white p-2 md:p-3 rounded-full transition duration-300"
      >
        <IoChevronBack size={24} />
      </button>

      {/* Right Arrow */}
      <button
        onClick={nextSlide}
        className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 z-50 
  bg-white/20 hover:bg-white/40 backdrop-blur-md 
  text-white p-2 md:p-3 rounded-full transition duration-300"
      >
        <IoChevronForward size={24} />
      </button>
    </div>
  );
};

export default BannerSlider;
