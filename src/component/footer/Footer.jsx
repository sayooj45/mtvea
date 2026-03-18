import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#0d1220] text-center py-6 px-4">
      <h2 className="text-[#E8C97A] font-serif text-sm font-semibold">
        MTVEA XVIIIth National Conference 2026
      </h2>
      <p className="text-white/40 text-xs mt-1">
        Mar Thoma Voluntary Evangelists' Association · North American Diocese
      </p>
      <p className="text-white/30 text-xs mt-1">mtveanationalconf.org</p>

      <div className="flex justify-center gap-2 mt-3 text-xs text-white/40 ">
        <Link to="/privacy-policy" className="hover:underline hover:text-white/60">Privacy Policy</Link>
        <span>·</span>
        <Link to="/terms-of-service" className="hover:underline hover:text-white/60">Terms</Link>
      </div>

      <p className="text-white/20 text-[10px] mt-2">
        © 2026 MTVEA National Conference
      </p>
    </footer>
  );
};

export default Footer;