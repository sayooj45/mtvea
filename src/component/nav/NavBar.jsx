import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";

const Navbar = () => {

  const [menuOpen, setMenuOpen] = useState(false);

  const scrollToSection = (id) => {
    setMenuOpen(false);

    const section = document.getElementById(id);

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-gray-100 shadow-md z-50">

      <div className="max-w-7xl  px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <div className="flex ">
          <img src={logo} alt="Logo" className="h-16 md:h-20 w-auto" />
        </div>

        {/* Desktop Menu */}
        <ul className="hidden 
            md:flex space-x-12 text-gray-700 font-medium absolute left-1/2 -translate-x-1/2">

          <li>
            <Link
              to="/registration"
              className="hover:text-blue-600 transition"
            >
              Registration
            </Link>
          </li>

           <li>
            <Link
              to="/"
              className="hover:text-blue-600 transition"
            >
              Speakers
            </Link>
          </li>

          <li
            onClick={() => scrollToSection("accommodation")}
            className="cursor-pointer hover:text-blue-600 transition"
          >
            Accommodation
          </li>

          <li
            onClick={() => scrollToSection("logistics")}
            className="cursor-pointer hover:text-blue-600 transition"
          >
            Logistics
          </li>

        </ul>

        {/* Mobile menu button */}
        <div
          className="md:hidden text-2xl cursor-pointer"
          onClick={() => setMenuOpen(true)}
        >
          <GiHamburgerMenu />
        </div>

      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-72 bg-white shadow-lg transform transition-transform duration-300 ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >

        <div className="flex justify-end p-6 text-3xl cursor-pointer">
          <IoClose onClick={() => setMenuOpen(false)} />
        </div>

        <ul className="flex flex-col items-center space-y-8 text-lg font-medium text-gray-700 mt-10">

          <li>
            <Link
              to="/registration"
              onClick={() => setMenuOpen(false)}
              className="hover:text-blue-600 transition"
            >
              Registration
            </Link>
          </li>

          <li>
            <Link
              to="/"
              onClick={() => setMenuOpen(false)}
              className="hover:text-blue-600 transition"
            >
              Speakers
            </Link>
          </li>

          <li
            onClick={() => scrollToSection("accommodation")}
            className="cursor-pointer hover:text-blue-600"
          >
            Accommodation
          </li>

          <li
            onClick={() => scrollToSection("logistics")}
            className="cursor-pointer hover:text-blue-600"
          >
            Logistics
          </li>

        </ul>

      </div>

    </nav>
  );
};

export default Navbar;