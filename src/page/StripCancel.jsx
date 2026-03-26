import React from "react";
import CancelPage from "../component/stripPages/CancelPage";

const StripCancel = () => {
  return (
    <div
      className="bg-[#FBF8F2] p-8 rounded-2xl 
  text-center  w-full shadow-2xl border border-white/30 
  animate-[fadeIn_0.4s_ease-out]"
    >
      <CancelPage />
    </div>
  );
};

export default StripCancel;
