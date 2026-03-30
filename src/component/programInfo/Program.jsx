import Navbar from "../nav/NavBar";
import Footer from "../footer/Footer";
import { useNavigate } from "react-router-dom";

const Program = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-[#FBF8F2] text-[#1a1a1a]">
      <Navbar />

      <div className="w-full h-px bg-gray-300"></div>

      {/* HEADER */}
      <div className="bg-[#1B2B4B] text-center px-6 py-14">
        <p className="text-white/40 text-xs mb-2">Home › Program</p>
        <h1 className="text-white text-3xl md:text-5xl font-serif">
          Conference Information
        </h1>
        <p className="text-white/50 text-sm mt-2">
          MTVEA Diocesan Conference 2026
        </p>
      </div>

      {/* CONTENT */}
      <div className="max-w-4xl mx-auto px-6 py-14 space-y-12">
        {/* Greeting */}
        <section>
          <span className="bg-[#F9F3E3] text-[#C49A3C] text-sm px-3 py-1 uppercase">
            Welcome Message
          </span>

          <p className="text-gray-700 leading-7 mt-4">
            Greetings in the name of our Lord and Savior Jesus Christ.
          </p>

          <p className="text-gray-600 leading-7 mt-3">
            The Mar Thoma Voluntary Evangelists' Association (MTVEA) Southwest
            Center - A warmly invites you to join us for the upcoming MTVEA
            Diocesan Conference. It is our privilege to host this spiritually
            enriching gathering, and we earnestly look forward to your
            participation.
          </p>
        </section>

        {/* Date & Venue */}
        <section>
          <span className="bg-[#F9F3E3] text-[#C49A3C] text-sm px-3 py-1 uppercase">
            Date & Venue
          </span>

          <h2 className="text-xl font-serif text-[#1B2B4B] mt-3">
            August 20 – August 23, 2026
          </h2>

          <p className="text-gray-600 mt-2">
            The Mar Thoma Church of Dallas Farmers Branch
          </p>

          <p className="text-gray-600">
            11550 Luna Rd, Farmers Branch, TX 75234
          </p>
        </section>

        {/* Theme */}
        <section className="bg-[#1B2B4B] text-white text-center py-10 rounded-lg">
          <p className="text-[#E8C97A] text-sm uppercase tracking-widest">
            Conference Theme
          </p>

          <h3 className="text-xl md:text-2xl font-serif italic mt-2">
            "Come and See: The Divine Invite"
          </h3>

          <p className="text-white/50 text-sm mt-1">John 1:39, 46</p>
        </section>

        {/* Speakers */}
        <section>
          <span className="bg-[#F9F3E3] text-[#C49A3C] text-sm px-3 py-1 uppercase">
            Main Speakers
          </span>

          <div className="mt-4 space-y-3">
            <p className="text-gray-700">
              Rt. Rev. Dr. Abraham Mar Paulos Episcopa
            </p>

            <p className="text-gray-700">Rev. Dr. Mothy Varkey</p>
          </div>
        </section>

        {/* Highlights */}
        <section>
          <span className="bg-[#F9F3E3] text-[#C49A3C] text-sm px-3 py-1 uppercase">
            Highlights
          </span>

          <div className="grid sm:grid-cols-2 gap-4 mt-4">
            {[
              "Bible Studies",
              "Main Messages",
              "Group Discussions",
              "Intercessory Prayer",
              "Revival Meetings",
              "Fellowship",
              "Music Sessions",
              "Talent Evening",
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white border border-[#C49A3C]/20 p-4 rounded flex gap-2"
              >
                <div className="w-2 h-2 bg-[#C49A3C] mt-2"></div>
                <p className="text-sm text-gray-600">{item}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Fees */}
        <section className="bg-white border border-[#C49A3C]/20 p-6 rounded-lg">
          <span className="bg-[#F9F3E3] text-[#C49A3C] text-sm px-3 py-1 uppercase">
            Registration Details
          </span>

          <h3 className="text-xl font-serif text-[#1B2B4B] mt-4">
            Conference Fee
          </h3>

          <p className="text-[#C49A3C] text-2xl font-semibold mt-2">
            $150 Total
          </p>

          <p className="text-gray-600 mt-2">
            $50 Registration Fee (Non-refundable) + $100 Conference Fee
          </p>

          <p className="text-red-500 text-sm mt-3">
            Registration Deadline: August 1, 2026
          </p>
        </section>

        {/* CTA */}
        <section className="bg-[#1B2B4B] text-white p-6 rounded-lg text-center">
          <p className="text-white/80 mb-3">
            Please register early to help us with proper arrangements.
          </p>

          <button
            className="bg-[#C49A3C] px-6 py-2 rounded hover:scale-105 transition"
            onClick={() => {
              navigate("/registration");
            }}
          >
            Register Now
          </button>
        </section>

        {/* Closing */}
        <section className="text-gray-600 leading-7">
          <p>
            We humbly request that you keep the conference, the leadership,
            organizing committees, and all participants in your daily prayers.
            May God guide us to conduct this event successfully for His glory.
          </p>

          <div className="mt-6">
            <p className="font-semibold text-[#1B2B4B]">Yours in Christ,</p>

            <p className="mt-3">
              Rev. Abraham V. Samson <br />
              <span className="text-sm text-gray-500">
                Conference President · 214-886-4532
              </span>
            </p>

            <p className="mt-3">
              Mr. Shaji S. Ramapuram <br />
              <span className="text-sm text-gray-500">
                General Convenor · 972-261-4221
              </span>
            </p>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default Program;
