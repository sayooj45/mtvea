import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);

  const handleClose = () => {
    setClosing(true);

    setTimeout(() => {
      setOpen(false);
      setClosing(false);
    }, 300); // match animation duration
  };

  const navItems = [
    { name: "home", path: "/" },
    { name: "about", path: "/about" },
    { name: "speakers", path: "/speakers" },
    { name: "register", path: "/registration" },
    { name: "our team", path: "/team" },
    { name: "souvenir", path: "/souvenir" },
    { name: "accommodation", path: "/accommodation" },
    { name: "program-Information", path: "/program-Information" },
  ];

  return (
    <nav className="bg-[#1B2B4B] text-white h-[80px] md:h-[100px] flex items-center justify-between px-6 shadow-md relative z-50">
      {/* Logo */}
      <NavLink to="/">
        <div className=" mt-[70px]  md:mt-[120px]  bg-white rounded-full md:h-[150px] md:w-[150px] h-[75px] w-[75px] flex items-center justify-center  overflow-visible z-50">
          <img
            src="/logo.png"
            alt="logo"
            className="md:h-[200px] md:w-[200px] w-[100px] h-[100px] max-w-none object-cover cursor-pointer "
          />
        </div>
      </NavLink>

      {/* Desktop */}
      <div className="hidden md:flex gap-6">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `uppercase text-xs tracking-wider relative pb-1 
              ${isActive ? "text-yellow-400" : "text-white"}
              
              after:content-[''] after:absolute after:left-0 after:bottom-0 
              after:h-[2px] after:w-0 after:bg-yellow-400 
              after:transition-all after:duration-300
              
              hover:after:w-full
              
              ${isActive ? "after:w-full" : ""}`
            }
          >
            {item.name}
          </NavLink>
        ))}
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <button onClick={() => setOpen(!open)}>
          <span className="text-2xl">☰</span>
        </button>
      </div>

      {/* Mobile Drawer */}
      {open && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
            onClick={handleClose}
          />

          {/* Drawer */}
          <div
            className={`fixed top-0 right-0 h-full w-[80%] max-w-sm 
  bg-[#1B2B4B] z-50 shadow-2xl 
  flex flex-col p-6 gap-6
  ${closing ? "animate-slideOut" : "animate-slideIn"}`}
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="text-white text-2xl self-end mb-4"
            >
              ✕
            </button>

            {/* Nav Items */}
            <div className="flex flex-col gap-5">
              {navItems.map((item, i) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  onClick={handleClose}
                  className={({ isActive }) =>
                    `text-lg font-medium capitalize tracking-wide 
              transition-all duration-300 
              ${isActive ? "text-yellow-400 translate-x-2" : "text-white/80"}
              hover:text-yellow-400 hover:translate-x-2`
                  }
                  style={{
                    transitionDelay: `${i * 50}ms`,
                  }}
                >
                  {item.name}
                </NavLink>
              ))}
            </div>

            {/* Bottom CTA */}
            {/* <div className="mt-auto">
              <button
                onClick={() => {
                  setOpen(false);
                  navigate("/registration");
                }}
                className="w-full bg-yellow-500 py-3 rounded-md text-sm font-medium 
          hover:shadow-lg hover:shadow-yellow-500/40 transition"
              >
                Register Now
              </button>
            </div> */}
          </div>
        </>
      )}
    </nav>
  );
};

export default Navbar;
