import { useEffect, useState } from "react";
import banner1 from "../../assets/banners/banner1.png";
import banner2 from "../../assets/banners/banner2.jpg";
import banner3 from "../../assets/banners/banner3.jpg";
import mobileBanner1 from "../../assets/banners/mobileBanner1.png";
import mobileBanner2 from "../../assets/banners/mobileBanner2.png";
import mobileBanner3 from "../../assets/banners/mobileBanner3.png";
import speaker1 from "../../assets/speaker11.png";
import speaker2 from "../../assets/speaker2.jpeg";
import { useNavigate } from "react-router-dom";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";

const BannerSlider = () => {
  const [slide, setSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [lastInteraction, setLastInteraction] = useState(Date.now());

  const navigate = useNavigate();

  const slides = isMobile
    ? [mobileBanner1, mobileBanner2, mobileBanner3]
    : [banner1, banner2, banner3];

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
    <div className="relative min-h-[calc(100vh-100px)] overflow-hidden">
      {/* Background Slider */}
      {slides.map((img, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            slide === i ? "opacity-100 z-0" : "opacity-0"
          }`}
        >
          <img
            src={img}
            alt="banner"
            className="w-full h-full object-cover object-center"
          />
        </div>
      ))}

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1B2B4B]/40 to-[#1B2B4B]/60"></div>

      {/* Content */}
      <div className="absolute inset-0 text-white overflow-y-auto flex items-start md:items-center justify-center">
        {" "}
        {/* ---------------- SLIDE 1 ---------------- */}
        {slide === 0 && (
          <div
            className="flex flex-col justify-center pt-10 items-center text-center 
    min-h-[70vh] md:min-h-[80vh] 
    px-6 md:px-10 
    text-white max-w-3xl mx-auto"
          >
            {/* Organization */}
            <p
              className="uppercase tracking-[0.25em] text-[11px] sm:text-xs 
    text-yellow-400 mb-5 font-serif opacity-90"
            >
              Mar Thoma Voluntary Evangelists' Association
            </p>

            {/* Main Heading */}
            <h1
              className="text-3xl sm:text-4xl md:text-5xl 
    leading-[1.2] mb-4 font-serif font-semibold tracking-wide"
            >
              XVIIIth Diocesan Conference
            </h1>

            {/* Location */}
            <p
              className="text-lg sm:text-xl md:text-2xl 
    text-yellow-400 font-serif tracking-wide mb-4"
            >
              2026 · Dallas
            </p>

            {/* Divider (adds professionalism) */}
            <div className="w-16 h-[1px] bg-yellow-400/60 mb-5"></div>

            {/* Theme */}
            <p
              className="text-lg sm:text-xl md:text-2xl 
    italic font-serif text-white/90 mb-6 leading-relaxed"
            >
              “Come and See: The Divine Invite”
            </p>

            {/* Date */}
            <p
              className="text-base sm:text-lg 
    text-white/80 mb-5 tracking-wide"
            >
              August 20–23, 2026
            </p>

            {/* Venue */}
            <p
              className="text-sm sm:text-base 
    text-white/80 max-w-xl leading-relaxed mb-8"
            >
              Hosted by MTVEA Southwest · Center A <br />
              The Mar Thoma Church of Dallas, Farmers Branch
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <button
                onClick={() => navigate("/registration")}
                className="bg-yellow-500 px-6 py-3 rounded-md text-sm font-medium 
        transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-yellow-500/40"
              >
                Register Now
              </button>

              <button
                onClick={() => navigate("/about")}
                className="border border-white/40 px-6 py-3 rounded-md text-sm 
        transition-all duration-300 hover:bg-white hover:text-[#1B2B4B]"
              >
                Learn More
              </button>
            </div>
          </div>
        )}
        {/* ---------------- SLIDE 2 ---------------- */}
        {slide === 1 && (
          <div className="flex flex-col justify-center items-center w-full px-4 sm:px-6 md:px-10 pt-10 text-center ">
            {/* Top Text */}
            <p className="text-yellow-400 uppercase text-[10px] sm:text-xs md:text-sm tracking-widest mb-2">
              Join Us
            </p>

            {/* Heading */}
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif mb-2 leading-tight">
              Register for the Conference
            </h2>

            {/* ✅ Event Date (NEW) */}
            <p className="text-sm sm:text-base md:text-lg text-yellow-300 font-medium mb-3 tracking-wide">
              August 20 • 21 • 22 • 23
            </p>

            {/* Description */}
            <p className="text-white/80 text-sm sm:text-base md:text-lg mb-6 sm:mb-8 max-w-xl leading-relaxed">
              Open to all members of MTVEA, Sevika Sanghom, and Senior Citizen
              Fellowship
            </p>

            {/* Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 w-full max-w-6xl">
              {/* Adults */}
              <div className="group border border-yellow-500/30 rounded-xl p-5 sm:p-6 bg-[#1B2B4B]/60 backdrop-blur-md hover:scale-105 hover:border-yellow-400 transition duration-300 shadow-md">
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
              <div className="group border border-yellow-500/30 rounded-xl p-5 sm:p-6 bg-[#1B2B4B]/60 backdrop-blur-md hover:scale-105 hover:border-yellow-400 transition duration-300 shadow-md">
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
              <div className="group border border-yellow-500/30 rounded-xl p-5 sm:p-6 bg-[#1B2B4B]/60 backdrop-blur-md hover:scale-105 hover:border-green-400 transition duration-300 shadow-md">
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
              className="mt-8 relative overflow-hidden bg-yellow-500 px-6 sm:px-8 py-2.5 sm:py-3 rounded-md text-sm sm:text-base font-medium transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-yellow-500/40 w-full sm:w-auto"
            >
              Register Now →
            </button>
          </div>
        )}
        {/* ---------------- SLIDE 3 ---------------- */}
        {slide === 2 && (
          <div
            className="flex flex-col justify-center md:justify-center items-center text-center 
  px-4 sm:px-6 md:px-10 
 pt-10 sm:pt-12 md:pt-0 max-sm:mt-10
  w-full h-full 
  "
          >
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
            <div
              className="grid grid-cols-1 grid-xs-1 sm:grid-cols-2 gap-3 sm:gap-4 w-full max-w-[280px] xs:max-w-md sm:max-w-xl md:max-w-2xl 
  max-h-full  md:max-h-full"
            >
              {/* Speaker 1 */}
              <div
                onClick={() => navigate("/speakers")}
                className="group cursor-pointer bg-white/10 backdrop-blur-md rounded-xl overflow-hidden 
      border border-white/20 shadow-lg 
      transition duration-300 hover:scale-105 hover:shadow-xl"
              >
                <div className="w-full aspect-[4/4] sm:aspect-[4/3.5] md:aspect-[4/4] bg-[#1B2B4B] overflow-hidden ">
                  <img
                    src={speaker1}
                    alt="Rt. Rev. Dr. Abraham Mar Paulos Episcopa"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>

                <div className="p-2.5 sm:p-3 text-center">
                  <h4
                    className="text-sm sm:text-base md:text-lg font-semibold 
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
                <div className="w-full aspect-[4/4] sm:aspect-[4/3.7] md:aspect-[4/4] bg-[#1B2B4B] overflow-hidden">
                  <img
                    src={speaker2}
                    alt="Rev. Mothy Varkey"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>

                <div className="p-2.5 sm:p-3 text-center">
                  <h4
                    className="text-sm sm:text-base md:text-lg font-semibold 
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
