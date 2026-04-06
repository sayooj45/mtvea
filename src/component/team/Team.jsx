import Navbar from "../nav/NavBar";
import Footer from "../footer/Footer";
import { useEffect, useState } from "react";

const groupedTeams = [
  {
    group: "Leadership",
    sections: [
      {
        title: "Leadership",
        members: [
          { role: "President", name: "Rev. Abraham V. Samson" },
          { role: "General Convenor", name: "Mr. Shaji S Ramapuram" },
          { role: "Co-Convenor", name: "Mr. Philip Mathew" },
          { role: "Treasurer", name: "Dr. Shiji Philip" },
          { role: "Accountant", name: "Mrs. Suma Abraham" },
        ],
      },
    ],
  },
  {
    group: "Sub Committees",
    sections: [
      {
        title: "Program Committee",
        members: [
          { role: "Chairman", name: "Rev. Abraham V. Samson" },
          { role: "Members", name: "Rev. Varghese John, Mr. Sam Alex" },
        ],
      },
      {
        title: "Registration Committee",
        members: [
          { role: "Chairman", name: "Rev. Jeswin S John" },
          { role: "Convener", name: "Mr. Jacob Mathai" },
        ],
      },
      {
        title: "Reception Committee",
        members: [
          { role: "Chairman", name: "Mrs. Sneha Varghese" },
          { role: "Convener", name: "Mrs. Noel Kovoor" },
        ],
      },
    ],
  },
  {
    // group: "Support Committees",
    sections: [
      {
        title: "Souvenir Committee",
        members: [
          { role: "Chairman", name: "Rev. Rejin Raju" },
          { role: "Convener", name: "Prof. Soman George" },
        ],
      },
      {
        title: "Prayer Cell",
        members: [
          { role: "Chairman", name: "Rev. Jeswin S John" },
          { role: "Convener", name: "Mr. John Mathew" },
        ],
      },
      {
        title: "Accommodation Committee",
        members: [
          { role: "Chairman", name: "Rev. Robin Varghese" },
          { role: "Convener", name: "Mr. Easaw Maliakal" },
        ],
      },
      {
        title: "Transportation Committee",
        members: [
          { role: "Chairman", name: "Rev. Joseph Chacko / Rev. K. M. Mathew" },
          { role: "Convener", name: "Mr. Saji George" },
        ],
      },
      {
        title: "Food Committee",
        members: [
          {
            role: "Chairman",
            name: "Rev. Shibi Abraham / Rev. Justin Pappachan",
          },
          { role: "Convener", name: "Mr. Chacko Johnson" },
        ],
      },
      {
        title: "Choir Committee",
        members: [
          { role: "Chairman", name: "Rev. Robin Varghese" },
          { role: "Convener", name: "Mr. George Varghese" },
        ],
      },
      {
        title: "Publicity & Media",
        members: [
          {
            role: "Chairman",
            name: "Rev. Abraham Kuruvilla / Rev. Arun Varghese",
          },
          { role: "Convener", name: "Mr. Alex Koshy" },
        ],
      },
      {
        title: "Medical Committee",
        members: [
          { role: "Chairman", name: "Rev. Varghese John" },
          { role: "Convener", name: "Mrs. Biji Mathew" },
        ],
      },
      {
        title: "Web & Technical",
        members: [
          { role: "Chairman", name: "Dr. Shiji Philip" },
          { role: "Convener", name: "Rev. Abraham V. Samson" },
        ],
      },
    ],
  },
  {
    group: "Regional Team",
    sections: [
      {
        title: "MTVEA Southwest Region",
        members: [
          { role: "President", name: "Rev. Abraham V. Samson" },
          { role: "Vice President", name: "Mr. George Varghese" },
          { role: "Secretary", name: "Mr. Roby Chelagiri" },
          { role: "Treasurer", name: "Mr. Mathew Lukose" },
        ],
      },
    ],
  },
];

const LeadershipCard = ({ member }) => {
  const initials = member.name
    ?.split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className="bg-white border border-[#E6D8B5] rounded-xl p-6 text-center hover:shadow-md transition">
      <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-[#1B2B4B] flex items-center justify-center text-white font-semibold">
        {initials}
      </div>

      <p className="text-[11px] uppercase tracking-wide text-[#C49A3C] mb-1">
        {member.role}
      </p>

      <h3 className="text-[#1B2B4B] text-sm font-medium">{member.name}</h3>
    </div>
  );
};

const CommitteeCard = ({ section }) => (
  <div className="bg-white rounded-xl border border-[#E6D8B5] overflow-hidden shadow-sm hover:shadow-md transition">
    <div className="bg-[#1B2B4B] text-white px-5 py-3 font-semibold text-sm">
      {section.title}
    </div>

    <div className="p-5 space-y-4">
      {section.members.map((member, i) => (
        <div key={i}>
          <p className="text-[11px] uppercase text-[#C49A3C] tracking-wide">
            {member.role}
          </p>
          <p className="text-[#1B2B4B] text-sm font-medium">{member.name}</p>

          {i !== section.members.length - 1 && (
            <div className="w-full h-px bg-gray-200 mt-3"></div>
          )}
        </div>
      ))}
    </div>
  </div>
);

const RegionalTeamCard = ({ section }) => {
  return (
    <div className="bg-[#1B2B4B] text-white rounded-2xl px-6 py-6 md:px-10 md:py-8 shadow-md">
      {/* TITLE */}
      <h3 className="text-lg md:text-xl font-serif mb-4">{section.title}</h3>

      {/* DIVIDER */}
      <div className="w-full h-px bg-white/20 mb-6"></div>

      {/* MEMBERS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center md:text-left">
        {section.members.map((member, i) => (
          <div key={i}>
            {/* ROLE */}
            <p className="text-[10px] uppercase tracking-widest text-white/50 mb-1">
              {member.role}
            </p>

            {/* NAME */}
            <p className="text-[#E3B04B] text-sm md:text-base font-medium">
              {member.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

const Team = () => {
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
        <p className="text-white/40 text-xs mb-2">Home › Team</p>
        <h1 className="text-white text-3xl md:text-5xl font-serif">Our Team</h1>
        <p className="text-white/50 text-sm mt-2">
          2026 MTVEA Diocesan Conference Committee
        </p>
      </div>

      {/* CONTENT */}
      <div className="max-w-6xl mx-auto px-6 py-14 space-y-14">
        {groupedTeams.map((group, gIndex) => (
          <div key={gIndex}>
            {/* GROUP TITLE */}
            <h2 className="text-2xl md:text-3xl font-serif text-[#1B2B4B] mb-8 border-l-4 border-[#C49A3C] pl-4">
              {group.group}
            </h2>

            {/* CONDITIONAL UI */}
            {group.group === "Leadership" ? (
              group.sections.map((section, i) => (
                <div
                  key={i}
                  className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
                >
                  {section.members.map((member, idx) => (
                    <LeadershipCard key={idx} member={member} />
                  ))}
                </div>
              ))
            ) : group.group === "Regional Team" ? (
              <div className="">
                {group.sections.map((section, i) => (
                  <RegionalTeamCard key={i} section={section} />
                ))}
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {group.sections.map((section, i) => (
                  <CommitteeCard key={i} section={section} />
                ))}
              </div>
            )}
          </div>
        ))}
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

export default Team;
