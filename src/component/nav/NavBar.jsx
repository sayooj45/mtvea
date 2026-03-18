import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const navItems = [
    { name: "home", path: "/" },
    { name: "about", path: "/about" },
    { name: "speakers", path: "/speakers" },
    { name: "register", path: "/registration" },
    // { name: "contact", path: "/contact" },
  ];

  return (
    <nav className="bg-[#1B2B4B] text-white h-[80px] md:h-[100px] flex items-center justify-between px-6 shadow-md relative z-50">

      {/* Logo */}
      <NavLink to="/">
        <img src="/logo.png" alt="logo" className="h-20 cursor-pointer" />
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
        <button onClick={() => setOpen(!open)}>☰</button>
      </div>

      {/* Mobile Drawer */}
      {open && (
        <div className="absolute top-[80px] md:top-[100px] left-0 w-full bg-[#1B2B4B] flex flex-col p-4 gap-4 md:hidden z-50">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
  `uppercase text-sm pb-2 relative transition-all duration-200
  ${isActive ? "text-yellow-400" : "text-white"}
  
  after:content-[''] after:block after:h-[2px] after:bg-yellow-400 
  ${isActive ? "after:w-full" : "after:w-0"}
  
  active:scale-95 active:text-yellow-300`
}
            >
              {item.name}
            </NavLink>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;