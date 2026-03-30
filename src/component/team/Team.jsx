import Navbar from "../nav/NavBar";
import Footer from "../footer/Footer";

const groupedTeams = [
  {
    group: "Leadership",
    sections: [
      {
        title: "Leadership",
        highlight: true,
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
    group: "Core Committees",
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
    group: "Support Committees",
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
          { role: "Member", name: "Tom" },
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

const Team = () => {
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
      <div className="max-w-6xl mx-auto px-6 py-14 space-y-16">
        {groupedTeams.map((group, gIndex) => (
          <div key={gIndex}>
            {/* GROUP TITLE */}
            <h2 className="text-2xl md:text-3xl font-serif text-[#1B2B4B] mb-8 border-l-4 border-[#C49A3C] pl-4">
              {group.group}
            </h2>

            <div className="space-y-12">
              {group.sections.map((section, index) => (
                <section key={index}>
                  {/* SECTION HEADER */}
                  <div className="mb-6">
                    <span className="bg-[#F9F3E3] text-[#C49A3C] text-xs px-3 py-1 uppercase tracking-wide">
                      Committee
                    </span>

                    <h3 className="text-xl md:text-2xl font-serif text-[#1B2B4B] mt-3">
                      {section.title}
                    </h3>
                  </div>

                  {/* CARDS */}
                  <div
                    className={`grid gap-4 sm:gap-6 
              ${
                section.highlight
                  ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3"
                  : "grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3"
              }`}
                  >
                    {section.members.map((member, i) => (
                      <div
                        key={i}
                        className={`group bg-white border rounded-lg p-5 transition-all duration-300 
                  hover:shadow-lg hover:-translate-y-1
                  ${
                    section.highlight
                      ? "border-[#C49A3C]/40 bg-[#FFFDF7]"
                      : "border-[#C49A3C]/20"
                  }`}
                      >
                        <p className="text-xs uppercase text-gray-500 mb-2">
                          {member.role}
                        </p>

                        {member.name && (
                          <h3 className="text-lg font-semibold text-[#1B2B4B] group-hover:text-[#C49A3C] transition">
                            {member.name}
                          </h3>
                        )}

                        <div className="w-8 h-[2px] bg-[#C49A3C] mt-3"></div>
                      </div>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </div>
        ))}
      </div>

      <Footer />
    </div>
  );
};

export default Team;
