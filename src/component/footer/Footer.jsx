import React from "react";
import { Link } from "react-router-dom";
import { FiPhone, FiMail } from "react-icons/fi";

const Footer = () => {
  return (
    <footer className="bg-[#0d1220] text-center py-8 px-4">

      {/* Title */}
      <h2 className="text-[#E8C97A] font-serif text-sm font-semibold">
        MTVEA XVIIIth National Conference 2026
      </h2>

      <p className="text-white/40 text-xs mt-1">
        Renaissance Dallas North Hotel,
        1590 Lyndon B Johnson Freeway,
        Dallas, TX, 75234
      </p>

      {/* Contact Info */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-3 mt-4 text-xs text-white/50">
        
        <div className="flex items-center gap-2 hover:text-white/70 hover:underline cursor-pointer">
          <FiPhone className="text-[#C49A3C]" />
          <span>214-442-2142</span>
        </div>

        <div className="hidden md:block text-white/20">|</div>

        <div className="flex items-center gap-2 hover:text-white/70 hover:underline cursor-pointer">
          <FiMail className="text-[#C49A3C]" />
          <span>info@mtveanationalconf.org</span>
        </div>

      </div>

      {/* Website */}
      <p className="text-white/30 text-xs mt-3 hover:text-white/70 hover:underline cursor-pointer">
        mtveanationalconf.org
      </p>

      {/* Links */}
      <div className="flex justify-center gap-2 mt-4 text-xs text-white/40">
        <Link
          to="/privacy-policy"
          className="hover:underline hover:text-white/70 transition cursor-pointer"
        >
          Privacy Policy
        </Link>
        <span>·</span>
        <Link
          to="/terms-of-service"
          className="hover:underline hover:text-white/70 transition cursor-pointer"
        >
          Terms
        </Link>
      </div>

      {/* Copyright */}
      <p className="text-white/20 text-[10px] mt-3">
        © 2026 MTVEA National Conference
      </p>

    </footer>
  );
};

export default Footer;