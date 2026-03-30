import Navbar from "../component/nav/NavBar";
import Footer from "../component/footer/Footer";
import { useNavigate } from "react-router-dom";

const ErrorPage = ({
  code = "404",
  title = "Page Not Found",
  message = "The page you are looking for doesn’t exist or has been moved.",
}) => {
  const navigate = useNavigate();

  return (
    <div className="bg-[#FBF8F2] min-h-screen flex flex-col">
      <Navbar />

      {/* Divider */}
      <div className="w-full h-px bg-gray-300"></div>

      {/* Content */}
      <div className="flex flex-1 items-center justify-center px-6 py-16">
        <div className="text-center max-w-lg animate-fade-in">
          {/* Error Code */}
          <h1 className="text-[80px] md:text-[100px] font-bold text-[#C49A3C] leading-none">
            {code}
          </h1>

          {/* Title */}
          <h2 className="text-2xl md:text-3xl font-serif text-[#1B2B4B] mt-4">
            {title}
          </h2>

          {/* Message */}
          <p className="text-gray-600 mt-3 leading-6">{message}</p>

          {/* Buttons */}
          <div className="flex flex-col md:flex-row gap-4 mt-8 justify-center">
            <button
              onClick={() => navigate("/")}
              className="bg-[#1B2B4B] text-white px-6 py-3 rounded-lg hover:opacity-90 transition"
            >
              Go Home
            </button>

            <button
              onClick={() => window.location.reload()}
              className="border border-[#C49A3C] text-[#C49A3C] px-6 py-3 rounded-lg hover:bg-[#F9F3E3] transition"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ErrorPage;
