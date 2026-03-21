import  Navbar  from "../nav/NavBar";
import  Footer  from "../footer/Footer";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="bg-[#FBF8F2] text-[#1a1a1a]">
      <Navbar />
<div className="w-full h-px bg-gray-300"></div>
      {/* Header */}
      <div className="bg-[#1B2B4B] text-center px-6 py-12">
        <p className="text-white/40 text-xs mb-2">Home › About</p>
        <h1 className="text-white text-3xl md:text-4xl font-serif">
          About the Conference
        </h1>
        <p className="text-white/50 text-sm mt-2">
          A century of faithful witness — and the journey continues
        </p>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">

        {/* Story */}
        <section className="mb-10">
          <span className="bg-[#F9F3E3] text-[#C49A3C] text-sm px-3 py-1 uppercase">
            Our Story
          </span>
          <h2 className="text-2xl font-serif text-[#1B2B4B] mt-3 mb-4">
            A Legacy of Evangelism Since 1924
          </h2>
          <p className="text-gray-600 text-md leading-7">
            The Mar Thoma Voluntary Evangelists’ Association (MTVEA) formed 1924 as a result of the spiritual renewal that followed the Reformation
             within the Church. This renewal created a deep desire among believers to share the Gospel of Jesus Christ. It was realized that evangelistic 
             responsibility could not be limited to a few full-time workers, but that every member of the Church, filled with the joy and assurance of salvation,
              is called to be Christ’s witness in daily life, regardless of profession or position. With the ardent support of Bishop Abraham Mar Thoma and the 
              encouragement of Titus II Mar Thoma Metropolitan, who sent a circular to all parishes promoting the formation of branches, the Association began its 
              organized ministry. Rev. C. P. Philipose Kassisa served as the first President, Sadhu Kochu Kunju as Secretary, and Kolakottu John Upadesi as 
              Traveling Secretary. The central objective of the Association is that every believer should be a living witness to Jesus Christ. Members meet 
              regularly in their parishes for fellowship, intercessory prayer, Bible study, and sharing of spiritual experiences. They actively participate in 
              Gospel outreach, assist in Sunday School and Youth Fellowship ministries, conduct cottage prayer me⁵etings, visit the sick and the needy, provide 
              spiritual encouragement and material support, and work toward reconciliation where relationships are broken. Through prayer, service, and faithful 
              witness, the Association continues to uphold the missionary calling of the Church in today’s world.
              The North American Diocese continues to strengthen and empower spiritual growth among believers, and as part of the diocesan activities, it is a 
              joy to organize the Diocesan Conference hosted by the Dallas Centre. It is a privilege for the Centre to host this conference under the theme 
              “Come and See: The Divine Invite  ( St. John 1 : 39 & 46 )” A warm welcome is extended to all to participate in the various sessions and activities 
              of the conference. May the Lord Almighty enable all to grow together in His Word and work together in His vineyard.
          </p>
        </section>

        {/* Mission */}
        <section className="mb-10">
          <span className="bg-[#F9F3E3] text-[#C49A3C] text-sm px-3 py-1 uppercase">
            Our Mission
          </span>
          <h2 className="text-2xl font-serif text-[#1B2B4B] mt-3 mb-4">
            Every Believer, a Living Witness
          </h2>

          <div className="grid md:grid-cols-2 gap-4 mt-4">
            {["Gospel outreach","Prayer meetings","Support needy","Reconciliation","Mission work","Serve all"].map((item,i)=> (
              <div key={i} className="bg-white border border-[#C49A3C]/20 p-4 rounded flex gap-2">
                <div className="w-2 h-2 bg-[#C49A3C] mt-2"></div>
                <p className="text-sm text-gray-600">{item}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Theme */}
        <div className="bg-[#1B2B4B] text-center text-white py-10 rounded-lg mb-10">
          <p className="text-[#E8C97A] text-sm uppercase tracking-widest">
            Conference Theme 2026
          </p>
          <h3 className="text-xl font-serif italic mt-2">
            "Come and See: The Divine Invite"
          </h3>
          <p className="text-white/40 text-sm mt-1">St. John 1:39 & 46</p>
        </div>

        {/* CTA */}
        <div className="bg-[#F9F3E3] border border-[#C49A3C]/20 p-6 rounded flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <p className="text-[#1B2B4B] font-medium">
              Ready to join us?
            </p>
            <span className="text-sm text-gray-600">
              Adults $150 · Under 18 $100 · Under 10 Free
            </span>
          </div>
          <Link to="/registration" className="bg-[#C49A3C] text-white px-5 py-2 rounded transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-[#C49A3C]/20">
            Register Now
          </Link>
        </div>
          </div>

      <Footer />
    </div>
  );
};

export default About;