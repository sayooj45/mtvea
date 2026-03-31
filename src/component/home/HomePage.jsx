import { useState } from "react";
import BannerSlider from "./BannerSlider";
import Navbar from "../nav/NavBar";
import Footer from "../footer/Footer";

function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <div className="flex-1">
        <BannerSlider />
      </div>

      <Footer />
    </div>
  );
}

export default HomePage;
