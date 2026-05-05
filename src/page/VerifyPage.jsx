import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../component/nav/NavBar";
import Footer from "../component/footer/Footer";
import ErrorPage from "./ErrorPage";
import axios from "axios";

import { useNavigate } from "react-router-dom";
import { IoMdEyeOff, IoIosEye } from "react-icons/io";
import { MdOutlineEmail } from "react-icons/md";

const VerifyPage = () => {
  const [isAdmin, setIsAdmin] = useState(false);

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [pageError, setPageError] = useState(false);
  const togglePassword = () => setShowPassword(!showPassword);
  const [checkInError, setCheckInError] = useState();

  const API_URL = import.meta.env.VITE_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoginLoading(true);

    try {
      const response = await axios.post(
        `${API_URL}api/auth/login`,
        { email, password },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      localStorage.setItem("token", response.data.token);
      setIsAdmin(true);
      window.location.reload();
    } catch (error) {
      setLoginError(
        error.response?.data?.message ||
          "Invalid email or password. Please try again."
      );
    } finally {
      setLoginLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setIsAdmin(true);
  }, []);

  //qr
  const { id } = useParams();

  // const [loading, setLoading] = useState(true);
  const [participant, setParticipant] = useState(null);
  // const [error, setError] = useState(false);

  useEffect(() => {
    console.log("VerifyPage mounted", id);

    const fetchParticipant = async () => {
      try {
        console.log("Calling API...");

        const res = await axios.get(`${API_URL}api/verify/${id}`);

        console.log("API response:", res.data);

        const data = res.data;

        if (!data.success) {
          setPageError(true);
        } else {
          setParticipant(data.data.participant);
        }
      } catch (err) {
        console.log("API ERROR:", err);
        setPageError(true);
      } finally {
        setPageLoading(false);
      }
    };

    fetchParticipant();
  }, [id]);

  // 🔄 Loading UI
  if (pageLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FBF8F2]">
        <p className="text-lg text-gray-600">Verifying QR Code...</p>
      </div>
    );
  }
  const token = localStorage.getItem("token");
  const handleCheckIn = async () => {
    try {
      console.log(id);

      const response = await axios.patch(
        `${API_URL}api/check-In`,
        { id },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log(response);
      setParticipant((prev) => ({
        ...prev,
        checkIn: true,
      }));
    } catch (error) {
      console.log(error);
      setCheckInError("Invalid participant ID");
    }
  };

  // ❌ Error UI (reuse your page)
  if (pageError) {
    return (
      <ErrorPage
        code="Invalid"
        title="Invalid QR Code"
        message="This QR code is not valid or participant not found."
      />
    );
  }

  // ✅ Success UI
  return (
    <>
      {isAdmin ? (
        <div className="bg-[#FBF8F2] min-h-screen flex flex-col">
          <Navbar />
          <div className="w-full h-px bg-gray-300"></div>
          <div className="flex flex-1 items-center justify-center px-4 sm:px-6 py-10 sm:py-16">
            <div className="bg-white shadow-xl rounded-xl p-5 sm:p-8 max-w-3xl w-full">
              <h1 className="text-2xl sm:text-3xl font-serif text-[#1B2B4B] mb-6 text-center">
                Participant Verified ✅
              </h1>
              {/* GRID */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700 text-sm sm:text-base">
                {/* BASIC DETAILS */}
                <p>
                  <strong>Name:</strong> {participant.firstName}
                  {participant.lastName}
                </p>
                <p>
                  <strong>Email:</strong> {participant.email}
                </p>
                <p>
                  <strong>Phone:</strong> {participant.phone}
                </p>
                <p>
                  <strong>Gender:</strong> {participant.gender}
                </p>
                <p>
                  <strong>Age Group:</strong> {participant.age}
                </p>
                <p>
                  <strong>Parish:</strong> {participant.parish}
                </p>
                <p className="sm:col-span-2">
                  <strong>Address:</strong> {participant.address}
                </p>
                {/* OPTIONAL */}
                {participant.dietaryRestrictions && (
                  <p className="sm:col-span-2">
                    <strong>Dietary Restrictions:</strong>
                    {participant.dietaryRestrictions}
                  </p>
                )}
                <p>
                  <strong>Sponsor Souvenir:</strong>
                  {participant.sponsorSouvenir}
                </p>
                <p>
                  <strong>Booked Hotel:</strong> {participant.bookedHotel}
                </p>
                {/* HOTEL DETAILS */}
                {participant.hotelName && (
                  <>
                    <p>
                      <strong>Hotel Name:</strong> {participant.hotelName}
                    </p>
                    <p>
                      <strong>Guests:</strong> {participant.hotelGuests}
                    </p>
                    <p>
                      <strong>Check-in:</strong>
                      {new Date(participant.checkInDate).toLocaleDateString()}
                    </p>
                    <p>
                      <strong>Check-out:</strong>
                      {new Date(participant.checkOutDate).toLocaleDateString()}
                    </p>
                    {participant.hotelNotes && (
                      <p className="sm:col-span-2">
                        <strong>Hotel Notes:</strong> {participant.hotelNotes}
                      </p>
                    )}
                  </>
                )}
                {/* ASSISTANCE */}
                <p>
                  <strong>Need Assistance:</strong> {participant.needAssistance}
                </p>
              </div>
              {/* DIVIDER */} <hr className="my-6" /> {/* PAYMENT */}
              <div className="space-y-3 text-sm sm:text-base">
                <p>
                  <strong>Payment Status:</strong>
                  <span
                    className={`ml-2 px-3 py-1 rounded-full text-xs sm:text-sm ${
                      participant.paymentStatus === "paid"
                        ? "bg-green-100 text-green-700"
                        : participant.paymentStatus === "failed"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {participant.paymentStatus}
                  </span>
                </p>
                <p>
                  <strong>Payment Type:</strong> {participant.paymentType}
                </p>
                <p>
                  <strong>Payment Method:</strong> {participant.paymentMethod}
                </p>
              </div>
              <hr className="my-6" /> {/* TRANSPORT */}
              <div className="space-y-3 text-sm sm:text-base">
                <p>
                  <strong>Shuttle:</strong> {participant.needShuttle}
                </p>
                {/* ARRIVAL */}
                {participant.arrivalFlightNumber && (
                  <>
                    <p>
                      <strong>Arrival Flight:</strong>
                      {participant.arrivalFlightNumber}
                    </p>
                    <p>
                      <strong>Arrival Date:</strong>
                      {new Date(
                        participant.arrivalFlightDate
                      ).toLocaleDateString()}
                    </p>
                    <p>
                      <strong>Arrival Time:</strong>
                      {participant.arrivalFlightTime}
                    </p>
                    <p>
                      <strong>Pickup Airport:</strong>
                      {participant.pickupAirport}
                    </p>
                  </>
                )}
                {/* DEPARTURE */}
                {participant.departureFlightNumber && (
                  <>
                    <p>
                      <strong>Departure Flight:</strong>
                      {participant.departureFlightNumber}
                    </p>
                    <p>
                      <strong>Departure Date:</strong>
                      {new Date(
                        participant.departureFlightDate
                      ).toLocaleDateString()}
                    </p>
                    <p>
                      <strong>Departure Time:</strong>
                      {participant.departureFlightTime}
                    </p>
                  </>
                )}
                {/* BUS */}
                {participant.busDetails && (
                  <p>
                    <strong>Bus Details:</strong> {participant.busDetails}
                  </p>
                )}
              </div>
              {/* CHECK-IN BUTTON */}
              <div className="mt-8 flex justify-end  ">
                <button
                  onClick={handleCheckIn}
                  disabled={participant.checkIn}
                  className={`px-5 py-2.5 rounded-xl font-semibold text-sm transition-all shadow cursor-pointer
            ${
              participant.checkIn
                ? "bg-green-100 text-green-700 cursor-not-allowed"
                : "bg-[#1B2B4B] text-white hover:bg-[#14213b]"
            }`}
                >
                  {participant.checkIn ? "Checked In ✓" : "Check In"}
                </button>
              </div>
              {checkInError && (
                <div className="mt-4 bg-red-100 text-red-600 px-4 py-3 rounded-xl text-sm">
                  {checkInError}
                </div>
              )}
            </div>
          </div>
          <Footer />
        </div>
      ) : (
        <div className="min-h-screen flex items-center justify-center bg-[#FBF8F2] px-4 py-10">
          {/* Card */}
          <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-6 sm:p-8 space-y-6">
            {/* Logo */}
            <div className="flex justify-center">
              <img
                src="/logo.png"
                alt="logo"
                className="w-28 sm:w-32 object-contain"
              />
            </div>

            {/* Title */}
            <h2 className="text-center text-xl sm:text-2xl font-bold text-[#1B2B4B]">
              Admin Login
            </h2>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <div>
                <label className="block text-sm font-semibold mb-1 text-gray-700">
                  Email
                </label>

                <div className="relative">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 outline-none text-sm focus:ring-2 focus:ring-[#1B2B4B]/40"
                    required
                  />

                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg">
                    <MdOutlineEmail />
                  </div>
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-semibold mb-1 text-gray-700">
                  Password
                </label>

                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 outline-none text-sm focus:ring-2 focus:ring-[#1B2B4B]/40"
                    required
                  />

                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg">
                    <button type="button" onClick={togglePassword}>
                      {showPassword ? <IoMdEyeOff /> : <IoIosEye />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Error */}
              {loginError && (
                <div className="bg-red-100 text-red-600 text-sm p-3 rounded-lg">
                  {error}
                </div>
              )}

              {/* Button */}
              <button
                type="submit"
                disabled={loginLoading}
                className="w-full bg-[#1B2B4B] hover:bg-[#0f3170] text-white py-2.5 rounded-xl font-semibold transition-all duration-300 disabled:opacity-50"
              >
                {loginLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Signing in...
                  </div>
                ) : (
                  "Sign In"
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default VerifyPage;
