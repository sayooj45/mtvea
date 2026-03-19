import Navbar from "../component/nav/NavBar";
import Footer from "../component/footer/Footer";
import ConferenceForm from "../component/form/ConferenceForm"

const RegistrationPage = () => {
  return (
    <div className="flex flex-col min-h-screen">

      <Navbar />
      <div className="w-full h-px bg-gray-300"></div>
      {/* Header */}
      <div className="bg-[#1B2B4B] text-white text-center py-10">
        <h1 className="text-3xl font-serif">
          Conference Registration
        </h1>
        <p className="text-white/60 text-sm mt-2">
          MTVEA XVIIIth National Conference 2026
        </p>
      </div>
      {/* PRICING BAR */}
<div className="bg-[#8C7420] text-white  overflow-hidden ">
  <div className="grid grid-cols-2 md:grid-cols-3 text-center">

    {/* Adults */}
    <div className="py-5 border-r border-white/20">
      <p className="text-xl font-serif">$150</p>
      <p className="text-xs uppercase tracking-wide text-white/70">
        Adults (18+)
      </p>
    </div>

    {/* Youth */}
    <div className="py-5 border-r border-white/20">
      <p className="text-xl font-serif">$100</p>
      <p className="text-xs uppercase tracking-wide text-white/70">
        Youth (10–18)
      </p>
    </div>

    {/* Free */}
    <div className="py-5 border-r border-white/20">
      <p className="text-xl font-serif">Free</p>
      <p className="text-xs uppercase tracking-wide text-white/70">
        Children (Under 10)
      </p>
    </div>


  </div>
</div>

      <div className="flex-1 bg-[#FBF8F2]">
        < ConferenceForm/>
      </div>

      <Footer />

    </div>
  );
};

export default RegistrationPage;