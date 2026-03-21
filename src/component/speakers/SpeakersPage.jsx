import React, { useState } from "react";
import Navbar from "../nav/NavBar";
import Footer from "../footer/Footer";
import speake1Video from '../../assets/speaker1.mp4'
import speaker1 from "../../assets/speaker1.png";
import speaker2 from "../../assets/speaker2.jpeg";
import { FaPlay } from "react-icons/fa";
import { Link } from "react-router-dom";

/* ✅ Reusable Speaker Card */
const SpeakerCard = ({ speaker, index }) => {
  const [expanded, setExpanded] = useState(false);
  const [showVideo, setShowVideo] = useState(false);

  const shortText =
    speaker.description.length > 300
      ? speaker.description.slice(0, 300) + "..."
      : speaker.description;

  return (
    <div
      className={`flex flex-col md:flex-row items-center gap-12 ${
        index % 2 !== 0 ? "md:flex-row-reverse" : ""
      }`}
    >
      {/* IMAGE */}
  
<div className="w-full md:w-full overflow-hidden rounded-2xl shadow-lg relative">

  {!showVideo ? (   // ✅ FIXED HERE
    <>
      <img
        src={speaker.image}
        alt={speaker.name}
        className="w-full h-[360px] md:h-[500px] object-cover"
      />

      {speaker.video && (
<button
  onClick={() => setShowVideo(true)}
  className="absolute inset-0 flex items-center justify-center group"
>
  <div className="relative flex items-center justify-center">
    
    {/* Glow Ring */}
    <span className="absolute inline-flex h-20 w-20 rounded-full bg-white/20 blur-xl group-hover:scale-110 transition"></span>

    {/* Main Button */}
<div className="backdrop-blur-md bg-white/30 border border-white/40 text-white rounded-full h-16 w-16 flex items-center justify-center shadow-xl group-hover:scale-110 transition">
  <FaPlay className="ml-1" />
</div>

  </div>
</button>
      )}
    </>
  ) : (
    <video
      src={speaker.video}
      controls
      autoPlay
      className="w-full h-[360px] md:h-[500px] object-cover"
    />
  )}

</div>


      {/* TEXT */}
      <div className="w-full md:w-1/2 max-w-xl">
        <span className="text-[#C49A3C] text-sm uppercase tracking-widest">
          {speaker.role}
        </span>

        <h2 className="text-2xl md:text-3xl font-serif text-[#1B2B4B] mt-3 leading-snug">
          {speaker.name}
        </h2>

        <div className="w-12 h-[2px] bg-[#C49A3C] my-4"></div>

        <p className="text-gray-600 leading-7 text-md md:text-base whitespace-pre-line text-justify">
          {expanded ? speaker.description : shortText}
        </p>

        {/* Read More */}
        {speaker.description.length > 300 && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="mt-3 text-[#C49A3C] text-md font-medium hover:underline"
          >
            {expanded ? "Show Less" : "Read More"}
          </button>
        )}
      </div>
    </div>
  );
};

const SpeakersPage = () => {
  const speakers = [
    {
      name: "Rt. Rev. Dr. Abraham Mar Paulos Episcopa",
      role: "Speaker",
      image: speaker1,
      video: speake1Video,
      description: `Rt. Rev. Dr. Abraham Mar Paulos Episcopa is a respected spiritual leader known for his inspiring preaching and deep theological understanding. 

He has been actively involved in pastoral ministry, leadership development, and spiritual guidance across various communities. His messages emphasize faith, service, and a life rooted in Christ. 

Through his ministry, he continues to inspire believers to grow spiritually and actively participate in the mission of the Church.`
    },
    {
      name: "Rev. Mothy Varkey",
      role: "Speaker",
      image: speaker2,
      description: `Mothy Varkey Achen is an ordained priest of the Mar Thoma Church and a distinguished New Testament theologian. He serves as a columnist for various newspapers and is a highly sought-after speaker. 

A prolific writer, he has authored 26 books in both English and Malayalam and regularly presents ‘Subhashitham’ for All India Radio (AIR). His talks often go viral for their depth, clarity, and relevance.

He holds a PhD in New Testament Studies from Murdoch University (Australia), along with M.Th. and B.D. degrees from Mar Thoma Theological Seminary, and a B.Sc. in Physics from Mahatma Gandhi University, Kerala. 

A member of the Society for New Testament Studies (SNTS), he has influenced generations of church leaders and continues to inspire through writing, podcasts, and global speaking engagements. 

Currently, he serves as the Vicar of Punalur St Thomas Mar Thoma Church.`
    }
  ];

  return (
    <div className="bg-[#FBF8F2] text-[#1a1a1a]">
      <Navbar />
      <div className="w-full h-px bg-gray-300"></div>

      {/* HERO */}
      <div className="bg-[#1B2B4B] text-center px-6 py-16">
        <p className="text-white/40 text-xs mb-2">Home › Speakers</p>
        <h1 className="text-white text-4xl md:text-5xl font-serif">
          Meet Our Speakers
        </h1>
        <p className="text-white/60 text-sm mt-3 max-w-xl mx-auto">
          Inspiring voices bringing wisdom, faith, and transformation to this
          year’s conference
        </p>
      </div>

      {/* SPEAKERS */}
      <div className="max-w-6xl mx-auto px-6 py-16 space-y-24">
        {speakers.map((speaker, index) => (
          <SpeakerCard key={index} speaker={speaker} index={index} />
        ))}
      </div>

      {/* CTA */}
      <div className="bg-[#F9F3E3] border-t border-[#C49A3C]/20 py-12 text-center">
        <h3 className="text-[#1B2B4B] text-xl font-serif">
          Don’t miss these powerful sessions
        </h3>
        <p className="text-gray-600 text-sm mt-2 mb-4">
          Be part of a life-changing experience
        </p>
        <Link
          to="/registration"
          className="bg-[#C49A3C] text-white px-6 py-3 rounded-lg hover:scale-105 transition"
        >
          Register Now
        </Link>
      </div>

      <Footer />
    </div>
  );
};

export default SpeakersPage;