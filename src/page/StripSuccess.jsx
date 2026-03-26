import React from "react";
import SuccessPage from "../component/stripPages/SuccessPage";
import Navbar from "../component/nav/NavBar";
import Footer from "../component/footer/Footer";

const StripSuccess = () => {
  return (
    <div
      className="bg-[#FBF8F2] p-8 rounded-2xl 
  text-center  w-full shadow-2xl border border-white/30 
  animate-[fadeIn_0.4s_ease-out]"
    >
      {" "}
      {/* <Navbar />/ */}
      <SuccessPage />
      {/* <Footer /> */}
    </div>
  );
};

export default StripSuccess;
