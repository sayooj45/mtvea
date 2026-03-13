import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { IoLocation } from "react-icons/io5";
import { MdDateRange } from "react-icons/md";

// import banner1 from "../../assets/banners/banner1.png";
import banner2 from "../../assets/banners/banner2.png";
import banner3 from "../../assets/banners/banner3.png";
import banner24 from "../../assets/banners/banner24.jpg";
import banner25 from "../../assets/banners/banner25.jpg";
import banner26 from "../../assets/banners/banner26.jpg";
import banner27 from "../../assets/banners/banner27.jpg";
import banner8 from "../../assets/banners/banner8.jpeg";
import banner28 from "../../assets/banners/banner28.jpg";
import banner10 from "../../assets/banners/banner10.jpg";
import banner23 from "../../assets/banners/banner23.jpg";
import banner17 from "../../assets/banners/banner17.jpg";
import banner13 from "../../assets/banners/banner13.jpg";
import banner14 from "../../assets/banners/banner14.jpg";
import banner16 from "../../assets/banners/banner16.jpg";
import speaker1 from "../../assets/speaker1.png"
import speaker2 from "../../assets/speaker2.jpg"

export default function BannerSlider() {

  const [current, setCurrent] = useState(0);
  
  const totalSlides = 4;
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setCurrent((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
  //   }, 5000);
  //   return () => clearInterval(interval);
  // }, []);

  return (

    <div className="relative w-full min-h-screen overflow-hidden ">

      {/* Slides */}
      <div
        className="flex transition-transform duration-700 ease-in-out h-full"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >

        {/* SLIDE 1 */}
        <div className="relative min-w-full min-h-screen flex">

          <img
            src={banner8}
            alt="Conference Banner"
            className="absolute inset-0 w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-black/40"></div>

          <div className="relative z-10 flex items-end w-full overflow-y-auto">

            <div className="pb-20 px-6 md:px-16 text-white max-w-5xl">

              <h1 className="text-xl sm:text-2xl md:text-4xl font-bold mb-3">
                Mar Thoma Voluntary Evangelists' Association
                <br className="hidden md:block" />
                Diocesan XVIII Conference 2026
              </h1>

              <p className="text-sm md:text-lg italic text-gray-200 mb-4">
                Come and See: The Divine Invite (St. John 1:39 & 46)
              </p>

              <div className="flex flex-wrap gap-4 items-center mb-6">

                <div className="flex items-center">
                  <IoLocation className="mr-2" />
                  Mar Thoma Event Center, Dallas TX
                </div>

                <span className="hidden md:inline text-gray-400">|</span>

                <div className="flex items-center">
                  <MdDateRange className="mr-2" />
                  August 20 - 23, 2026
                </div>

              </div>

              <button className="px-6 md:px-10 py-3 md:py-4 bg-white/10 backdrop-blur-md border border-white/30 rounded-md hover:bg-white hover:text-black transition">
                Learn More
              </button>

            </div>

          </div>
        </div>

        {/* SLIDE 2 */}
        <div className="relative min-w-full min-h-screen flex">

          <img
            src={banner24}
            alt="Registration Banner"
            className="absolute inset-0 w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-black/50"></div>

          <div className="relative z-10 flex items-end w-full overflow-y-auto">

            <div className="pb-20 px-6 md:px-16 text-white">

              <h1 className="text-xl md:text-4xl font-bold mb-6">
                Registration & Pricing
              </h1>

              <div className="flex flex-col md:flex-row gap-4 md:gap-6">

                <div className="bg-white/10 backdrop-blur-md border border-white/30 rounded-md px-4 py-3 md:px-6 md:py-5 w-full md:w-[280px]">
                  <p className="text-xs md:text-sm uppercase tracking-wider">Individual</p>
                  <h2 className="text-2xl md:text-3xl font-bold">$175</h2>
                  <hr className="border-white/40 my-2"/>
                  <p className="text-xs opacity-80">(Registration $50 + Fee $125)</p>
                </div>

                <div className="bg-white/10 backdrop-blur-md border border-white/30 rounded-md px-4 py-3 md:px-6 md:py-5 w-full md:w-[280px]">
                  <p className="text-xs md:text-sm uppercase tracking-wider">Kids (12-18)</p>
                  <h2 className="text-2xl md:text-3xl font-bold">$125</h2>
                  <hr className="border-white/40 my-2"/>
                  <p className="text-xs opacity-80">(Registration $50 + Fee $75)</p>
                </div>

                <div className="bg-white/10 backdrop-blur-md border border-white/30 rounded-md px-4 py-3 md:px-6 md:py-5 w-full md:w-[280px]">
                  <p className="text-xs md:text-sm uppercase tracking-wider">Kids under 12</p>
                  <h2 className="text-2xl md:text-3xl font-bold">FREE</h2>
                  <hr className="border-white/40 my-2"/>
                  <p className="text-xs opacity-80">No Other Charges</p>
                </div>

              </div>

              <Link
                to="/registration"
                className="inline-block mt-8 px-8 md:px-10 py-3 md:py-4 bg-white/10 backdrop-blur-md border border-white/30 rounded-md hover:bg-white hover:text-black transition"
              >
                Register Now
              </Link>

            </div>

          </div>
        </div>

        {/* SLIDE 3 */}
        <div className="relative min-w-full min-h-screen flex">

          <img
            src={banner27}
            alt="Accommodation Banner"
            className="absolute inset-0 w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-black/40"></div>

          <div className="relative z-10 flex items-end w-full overflow-y-auto">

            <div className="pb-20 px-6 md:px-16 text-white max-w-3xl">

              <h1 className="text-2xl md:text-4xl font-bold mb-4">
                Accommodation & Stay
              </h1>

              <p className="text-sm md:text-lg mb-6">
                Comfortable accommodation options will be available for
                conference participants. Plan your stay and enjoy fellowship
                and sessions.
              </p>

              <button className="px-6 md:px-10 py-3 md:py-4 bg-white/10 backdrop-blur-md border border-white/30 rounded-md hover:bg-white hover:text-black transition">
                Book Accommodation
              </button>

            </div>

          </div>
        </div>

        {/* SLIDE 4 */}
        <div className="relative min-w-full min-h-screen flex">

          <img
            src={banner28}
            alt="Accommodation Banner"
            className="absolute inset-0 w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-black/40"></div>

          <div className="relative z-10 flex items-end w-full overflow-y-auto justify-between">

            <div className="pb-20 px-6 md:px-16 text-white max-w-3xl">

              <h1 className="text-2xl md:text-4xl font-bold mb-4">
                Come and See: The Divine Invite
              </h1>

              <p className="text-sm md:text-lg mb-6">
                Join us for a blessed gathering of worship, prayer, and the Word of God, with inspiring messages from our honored guest speakers.
              </p>

              <button className="px-6 md:px-10 py-3 md:py-4 bg-white/10 backdrop-blur-md border border-white/30 rounded-md hover:bg-white hover:text-black transition">
                Learn More
              </button>

            </div>

            <div className="pb-20 px-6 md:px-16 flex flex-col items-center gap-6">

  {/* Speaker 1 */}
  <div className="bg-white rounded-xl shadow-lg overflow-hidden w-[220px] md:w-[260px] p-2">

    <div className="w-full h-[250px]">
      <img
        src={speaker1}
        alt="speaker image"
        className="w-full h-full object-cover rounded-xl"
      />
    </div>

    <h1 className="text-black text-sm md:text-base font-semibold p-4 text-center">
      Rt. Rev. Dr. Abraham Mar Paulos Episcopa
    </h1>

  </div>

  {/* Speaker 2 */}
  <div className="bg-white rounded-xl shadow-lg overflow-hidden w-[220px] md:w-[260px] p-2">

    <div className="w-full h-[250px]">
      <img
        src={speaker2}
        alt="speaker image"
        className="w-full h-full object-cover rounded-xl"
      />
    </div>

    <h1 className="text-black text-sm md:text-base font-semibold p-4 text-center">
      Rev. Mothy Varkey
    </h1>

  </div>

</div>
            

          </div>
        </div>

      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">

        <button
          onClick={() => setCurrent(0)}
          className={`w-3 h-3 rounded-full ${current === 0 ? "bg-white" : "bg-white/50"}`}
        />

        <button
          onClick={() => setCurrent(1)}
          className={`w-3 h-3 rounded-full ${current === 1 ? "bg-white" : "bg-white/50"}`}
        />

        <button
          onClick={() => setCurrent(2)}
          className={`w-3 h-3 rounded-full ${current === 2 ? "bg-white" : "bg-white/50"}`}
        />

        <button
          onClick={() => setCurrent(3)}
          className={`w-3 h-3 rounded-full ${current === 3 ? "bg-white" : "bg-white/50"}`}
        />

      </div>

    </div>
  );
}