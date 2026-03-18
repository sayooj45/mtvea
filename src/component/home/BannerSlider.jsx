import { useEffect, useState } from "react";
import banner1 from "../../assets/banners/banner1.webp";
import banner2 from "../../assets/banners/banner2.jpeg";
import banner3 from "../../assets/banners/banner3.jpg";
import speaker1 from "../../assets/speaker1.png";
import speaker2 from "../../assets/speaker2.jpg";
import { useNavigate } from "react-router-dom";

const BannerSlider = ({ setActive }) => {
  const [slide, setSlide] = useState(0);
  const [lastInteraction, setLastInteraction] = useState(Date.now());

  const navigate = useNavigate()

  const slides = [banner1, banner2, banner3];

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();

      if (now - lastInteraction >= 5000) {
        setSlide((prev) => (prev + 1) % slides.length);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [lastInteraction, slides.length]);

  return (
    <div className="relative h-[calc(100vh-70px)] min-h-[600px] overflow-hidden">

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
      <div className="absolute inset-0 bg-gradient-to-b from-[#1B2B4B]/50 to-[#1B2B4B]/90"></div>

      {/* Content */}
      <div className="absolute inset-0 text-white overflow-y-auto">

        {/* ---------------- SLIDE 1 ---------------- */}
        {slide === 0 && (
          <div className="flex flex-col justify-center items-center text-center h-full px-4">

            <p className="uppercase tracking-widest text-yellow-400 text-xs mb-3">
              Mar Thoma Voluntary Evangelists' Association
            </p>

            <h1 className="text-4xl md:text-5xl font-serif mb-3">
              National Conference <br />
              <span className="italic text-yellow-300">2026</span>
            </h1>

            <p className="italic text-yellow-300 mb-2">
              "Come and See: The Divine Invite"
            </p>

            <p className="text-sm opacity-70 mb-6">
              St. John 1:39 & 46
            </p>

            <div className="flex flex-wrap justify-center gap-3">

              <button
                onClick={() => navigate("/registration")}
                className="relative overflow-hidden bg-yellow-500 px-6 py-2 rounded text-sm font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-yellow-500/40"
              >
                <span className="relative z-10">Register Now</span>
                <span className="absolute inset-0 bg-white/20 opacity-0 hover:opacity-100 transition duration-300"></span>
              </button>

              <button
                onClick={() => navigate("/about")}
                className="relative overflow-hidden border border-white px-6 py-2 rounded text-sm transition-all duration-300 hover:bg-white hover:text-[#1B2B4B] hover:scale-105 hover:shadow-lg"
              >
                Learn More
              </button>

            </div>
          </div>
        )}

        {/* ---------------- SLIDE 2 ---------------- */}
        {slide === 1 && (
          <div className="flex flex-col justify-center items-center h-full px-4 text-center min-h-full">

            <p className="text-yellow-400 uppercase text-xs tracking-widest mb-2">
              Join Us
            </p>

            <h2 className="text-3xl md:text-4xl font-serif mb-2">
              Register for the Conference
            </h2>

            <p className="text-white/70 text-sm mb-8">
              Open to all members of MTVEA, Sevika Sanghom, and Senior Citizen Fellowship
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-4xl">

              <div className="border border-yellow-500/30 rounded-lg p-6 bg-[#1B2B4B]/60 backdrop-blur">
                <p className="text-xs uppercase text-white/60 mb-2">Adults</p>
                <h3 className="text-3xl text-yellow-400 font-serif">$150</h3>
                <p className="text-xs text-white/60 mt-2">
                  $50 Registration + $100 Conference Fee
                </p>
                <div className="mt-3 text-xs bg-white/10 px-3 py-1 rounded-full inline-block">
                  18 years and above
                </div>
              </div>

              <div className="border border-yellow-500/30 rounded-lg p-6 bg-[#1B2B4B]/60 backdrop-blur">
                <p className="text-xs uppercase text-white/60 mb-2">Youth</p>
                <h3 className="text-3xl text-yellow-400 font-serif">$100</h3>
                <p className="text-xs text-white/60 mt-2">
                  $50 Registration + $50 Conference Fee
                </p>
                <div className="mt-3 text-xs bg-white/10 px-3 py-1 rounded-full inline-block">
                  Under 18 years
                </div>
              </div>

              <div className="border border-yellow-500/30 rounded-lg p-6 bg-[#1B2B4B]/60 backdrop-blur">
                <p className="text-xs uppercase text-white/60 mb-2">Children</p>
                <h3 className="text-3xl text-green-400 font-serif">Free</h3>
                <p className="text-xs text-white/60 mt-2">
                  No registration fee
                </p>
                <div className="mt-3 text-xs bg-white/10 px-3 py-1 rounded-full inline-block">
                  Under 10 years
                </div>
              </div>

            </div>

            <button
              onClick={() => navigate("/registration")}
              className="mt-8 relative overflow-hidden bg-yellow-500 px-8 py-3 rounded text-sm font-medium transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-yellow-500/40"
            >
              Register Now →
            </button>

            <p className="text-xs text-white/50 mt-3">
              Registration deadline:{" "}
              <span className="text-yellow-400">March 9, 2026</span>
            </p>

          </div>
        )}

        {/* ---------------- SLIDE 3 ---------------- */}
        {slide === 2 && (
          <div className="flex flex-col justify-center items-center h-full text-center px-4 min-h-full">

            <h2 className="text-3xl md:text-5xl font-serif mb-3">
              Come and See:
              <br />
              <span className="italic text-yellow-300">The Divine Invite</span>
            </h2>

            <p className="text-white/70 max-w-xl mb-6 text-sm md:text-base">
              Join us for a blessed gathering of worship, prayer, and the Word of God,
              with inspiring messages from our honored guest speakers.
            </p>

            <button
              onClick={() => navigate("/about")}
              className="mb-10 border border-white px-6 py-2 rounded text-sm transition-all duration-300 hover:bg-white hover:text-[#1B2B4B] hover:scale-105 hover:shadow-lg"
            >
              Learn More
            </button>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl w-full">

              <div className="bg-white/10 backdrop-blur-md rounded-xl overflow-hidden border border-white/20 shadow-lg hover:scale-105 transition duration-300">
                <img
                  src={speaker1}
                  alt="Speaker 1"
                  className="w-full h-48 object-fit"
                />
                <div className="p-3 text-center">
                  <h4 className="text-lg font-semibold">
                    Rt. Rev. Dr. Abraam Mar Paulos Episcopa
                  </h4>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-xl overflow-hidden border border-white/20 shadow-lg hover:scale-105 transition duration-300">
                <img
                  src={speaker2}
                  alt="Speaker 2"
                  className="w-full h-48 object-fit"
                />
                <div className="p-3 text-center">
                  <h4 className="text-lg font-semibold">
                    Rev. Mothy Varkey
                  </h4>
                </div>
              </div>

            </div>

          </div>
        )}

      </div>

      {/* Dots */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, i) => (
          <div
            key={i}
            onClick={() => {
              setSlide(i);
              setLastInteraction(Date.now());
            }}
            className={`w-2 h-2 rounded-full cursor-pointer ${
              slide === i ? "bg-yellow-400" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default BannerSlider;