import { useState } from "react";
import BannerSlider from "./BannerSlider";
import Navbar from "../nav/NavBar";
import Footer from "../footer/Footer";

function HomePage() {
  const [active, setActive] = useState("home");

  return (
    <div className="flex flex-col min-h-screen">

      <Navbar setActive={setActive} />

      <div className="flex-1">
        <BannerSlider setActive={setActive} />
      </div>

      <Footer />
    </div>
  );
}

export default HomePage;