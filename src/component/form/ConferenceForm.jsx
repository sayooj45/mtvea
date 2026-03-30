import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import QR from "../../assets/QR.png";

const ConferenceForm = () => {
  const API_URL = import.meta.env.VITE_API_URL;

  const [isReviewing, setIsReviewing] = useState(false);
  const [participants, setParticipants] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState("");
  const [isZelleStep, setIsZelleStep] = useState(false);
  const [transactionId, setTransactionId] = useState("");
  const [screenshot, setScreenshot] = useState(null);
  // const [zellePayment, setZellePayment] = useState(false);
  const [zelleId, setZelleId] = useState("");
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState("");
  const [preview, setPreview] = useState(null);

  const [editIndex, setEditIndex] = useState(null);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    gender: "",
    address: "",
    phone: "",
    email: "",
    parish: "",
    shirtSize: "",
    dietaryRestrictions: "",
    sponsorSouvenir: "",
    bookedHotel: "",
    needAssistance: "",
    needShuttle: "",
    arrivalFlightNumber: "",
    busDetails: "",
    arrivalFlightDate: "",
    arrivalFlightTime: "",
    departureFlightNumber: "",
    departureFlightDate: "",
    departureFlightTime: "",
    paymentType: "",
    paymentMethod: "",
  });

  const emptyForm = {
    firstName: "",
    lastName: "",
    age: "",
    gender: "",
    address: "",
    phone: "",
    email: "",
    parish: "",
    shirtSize: "",
    dietaryRestrictions: "",
    sponsorSouvenir: "",
    bookedHotel: "",
    needAssistance: "",
    needShuttle: "",
    arrivalFlightNumber: "",
    busDetails: "",
    arrivalFlightDate: "",
    arrivalFlightTime: "",
    departureFlightNumber: "",
    departureFlightDate: "",
    departureFlightTime: "",
    paymentType: "",
    paymentMethod: "",
  };

  const handleAddParticipant = () => {
    if (!formData.firstName || !formData.lastName) return;

    if (editIndex !== null) {
      // UPDATE existing participant
      const updated = [...participants];
      updated[editIndex] = formData;
      setParticipants(updated);
      setEditIndex(null);
    } else {
      // ADD new participant
      setParticipants((prev) => [...prev, formData]);
    }

    setFormData(emptyForm);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));

    if (
      name === "needShuttle" &&
      value === "No - I will arrange my own transportation"
    ) {
      setFormData((prev) => ({
        ...prev,
        needShuttle: value,
        arrivalFlightNumber: "",
        arrivalFlightTime: "",
        busDetails: "",
      }));
      return;
    }
  };

  const handleReview = (e) => {
    e.preventDefault();

    let newErrors = {};

    if (!formData.firstName) newErrors.firstName = "First name is required";
    if (!formData.lastName) newErrors.lastName = "Last name is required";
    if (!formData.email) newErrors.email = "Email is required";

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    if (editIndex !== null) {
      const updated = [...participants];
      updated[editIndex] = formData;
      setParticipants(updated);
      setEditIndex(null);
    } else {
      setParticipants((prev) => [...prev, formData]);
    }

    setFormData(emptyForm);
    setIsReviewing(true);
    window.scrollTo(0, 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    setSubmitError("");

    const singlePaymentMethod = participants.find(
      (p) => p.paymentMethod
    )?.paymentMethod;
    const singlePaymenttype = participants.find(
      (p) => p.paymentType
    )?.paymentType;

    const hasStripePayment = participants.some(
      (p) =>
        p.paymentType === "Online" && p.paymentMethod === "Credit Card (Stripe)"
    );
    const hasZellePayment = participants.some(
      (p) => p.paymentType === "Online" && p.paymentMethod === "Zelle"
    );

    if (hasStripePayment) {
      setIsLoading(true);
      // navigate("/payment-page", { state: { participants } });
      try {
        const cleanedParticipants = participants.map(
          ({ paymentType, paymentMethod, ...rest }) => rest
        );

        console.log("FINAL PAYLOAD:", {
          participants: cleanedParticipants,
          paymentType: singlePaymenttype,
          paymentMethod: singlePaymentMethod,
          zelle_id: "",
        });

        const response = await axios.post(
          `${API_URL}api/registration`,
          {
            participants: cleanedParticipants,
            paymentType: singlePaymenttype,
            paymentMethod: singlePaymentMethod,
            zelle_id: "",
          },
          { headers: { "Content-Type": "application/json" } }
        );

        console.log("Stripe Response:", response.data);

        if (response.data.url) {
          window.location.href = response.data.url;
          return;
        }

        setIsSubmitted(true);
        console.log("Server Response:", response.data);

        // setTimeout(() => {
        //   navigate("/");
        // }, 10000);
        // window.scrollTo(0, 0);
      } catch (error) {
        console.error("Submission Error:", error);
        setSubmitError(
          error.response?.data?.message ||
            "Something went wrong while submitting."
        );
      } finally {
        setIsLoading(false);
      }
      return;
    }

    if (hasZellePayment) {
      setIsLoading(false);
      setIsZelleStep(true);
      return;
    }

    try {
      const singlePaymentMethod = participants.find(
        (p) => p.paymentMethod
      )?.paymentMethod;
      const singlePaymenttype = participants.find(
        (p) => p.paymentType
      )?.paymentType;
      const cleanedParticipants = participants.map(
        ({ paymentType, paymentMethod, ...rest }) => rest
      );

      console.log(singlePaymentMethod);
      console.log(singlePaymenttype);
      console.log(cleanedParticipants);

      const response = await axios.post(
        `${API_URL}api/registration`,
        {
          participants: cleanedParticipants,
          paymentType: singlePaymenttype,
          paymentMethod: singlePaymentMethod,
          zelle_id: "",
        },
        { headers: { "Content-Type": "application/json" } }
      );

      setIsSubmitted(true);
      console.log("Server Response:", response.data);

      // setTimeout(() => {
      //   navigate("/");
      // }, 10000);
      window.scrollTo(0, 0);
    } catch (error) {
      console.error("Submission Error:", error);
      setSubmitError(
        error.response?.data?.message ||
          "Something went wrong while submitting."
      );
    } finally {
      setIsLoading(false);
    }
  };

  //zelle submit

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const zellePaymentSubmit = async () => {
    if (!transactionId || !screenshot) {
      alert("Provide both fields");
      return;
    }

    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("transactionId", transactionId);
      // formData.append("participants", JSON.stringify(participants));
      formData.append("screenshot", screenshot);

      for (let pair of formData.entries()) {
        console.log(pair[0], pair[1]);
      }

      const response = await axios.post(`${API_URL}api/zelle`, formData);

      console.log(response.data.success);
      console.log(response.data.paymentProofId);
      setZelleId(response.data.paymentProofId);
      // setIsSubmitted(true);
      setIsZelleStep(false);
      // setZellePayment(true);
      setMessage("Payment verified and go to submit the registration.");
      setMessageType("success");
    } catch (err) {
      // alert("Error submitting payment");
      console.log(err);
      setMessageType("error");
      setMessage(
        "Something went wrong while submitting your payment. Please try again."
      );
    }

    setIsLoading(false);
  };

  const zelleRegistration = async () => {
    try {
      const cleanedParticipants = participants.map(
        ({ paymentType, paymentMethod, ...rest }) => rest
      );
      console.log(cleanedParticipants, zelleId);

      const response = await axios.post(
        `${API_URL}api/registration`,
        {
          participants: cleanedParticipants,
          zelle_id: zelleId,
          paymentType: "Online",
          paymentMethod: "Zelle",
        },
        { headers: { "Content-Type": "application/json" } }
      );

      setIsSubmitted(true);
      console.log("Server Response:", response.data);

      // setTimeout(() => {
      //   navigate("/");
      // }, 10000);
      // window.scrollTo(0, 0);
    } catch (error) {
      console.error("Submission Error:", error);
      setSubmitError(
        error.response?.data?.message ||
          "Something went wrong while submitting."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const labelClass = "block text-base font-bold text-gray-700 mb-1";
  const inputClass = `
  w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm
  shadow-sm
  transition-all duration-200 ease-in-out
  hover:border-[#C49A3C]
  focus:outline-none focus:ring-2 focus:ring-[#1B2B4B] focus:border-[#1B2B4B]
`;

  const buttonPrimary = `
  flex-1 bg-[#C49A3C] text-white py-3 rounded-xl font-medium
  transition-all duration-200
  hover:scale-[1.02] hover:shadow-lg active:scale-[0.98]
`;

  const buttonSecondary = `
  flex-1 border border-[#C49A3C] text-[#C49A3C] py-3 rounded-xl font-medium
  transition-all duration-200
  hover:bg-[#F9F3E3] hover:shadow-sm
`;

  const radioLabel = "flex items-center space-x-2 text-base cursor-pointer";

  const ReviewRow = ({ label, value }) => (
    <div className="flex justify-between border-b py-2 text-sm md:text-base">
      <span className="font-bold text-gray-600">{label}:</span>
      <span className="text-gray-900 font-medium">{value || "N/A"}</span>
    </div>
  );

  const steps = [
    { id: 1, label: "DETAILS" },
    { id: 2, label: "REVIEW" },
    { id: 3, label: "PAYMENT" },
    { id: 4, label: "DONE" },
  ];

  const step = isSubmitted ? 4 : isZelleStep ? 3 : isReviewing ? 2 : 1;

  const getTotalAmount = () => {
    return participants.reduce((total, p) => {
      if (p.age === "under-10") return total + 0;
      if (p.age === "10-18") return total + 100;
      if (p.age === "above-18") return total + 150;
      return total;
    }, 0);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FBF8F2] px-4">
        <div className="bg-white p-10 rounded-2xl shadow-xl text-center max-w-md animate-fade-in">
          <div className="text-green-500 text-5xl mb-4">✔</div>

          <h2 className="text-2xl font-bold text-[#1B2B4B] mb-2">
            Registration Successful
          </h2>

          <p className="text-gray-600 mb-6">
            Your details have been submitted successfully. We will contact you
            soon.
          </p>

          <div className="bg-gray-100 rounded-lg p-4 mb-6 text-left text-sm">
            <p>
              <strong>Total Participants:</strong> {participants.length}
            </p>
            <p>
              <strong>Total Fee:</strong> ₹ {getTotalAmount()}
            </p>
          </div>

          <button
            onClick={() => {
              navigate("/");
              window.scrollTo(0, 0);
            }}
            className="w-full bg-[#1B2B4B] text-white py-3 rounded-lg hover:opacity-90"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  if (submitError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FBF8F2] px-4">
        <div className="bg-white p-10 rounded-2xl shadow-xl text-center max-w-md animate-fade-in">
          <div className="text-red-500 text-5xl mb-4">✖</div>

          <h2 className="text-2xl font-bold text-[#1B2B4B] mb-2">
            Submission Failed
          </h2>

          <p className="text-gray-600 mb-6">{submitError}</p>

          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 text-sm text-left">
            <p>
              <strong>Participants:</strong> {participants.length}
            </p>
            <p>
              <strong>Total Fee:</strong> ₹ {getTotalAmount()}
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setSubmitError("")}
              className="flex-1 bg-gray-200 py-3 rounded-lg hover:bg-gray-300"
            >
              Try Again
            </button>

            <button
              onClick={() => navigate("/")}
              className="flex-1 bg-[#1B2B4B] text-white py-3 rounded-lg hover:opacity-90"
            >
              Go Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FBF8F2] py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-center mb-10 px-4">
          <div className="w-full max-w-3xl grid grid-cols-4 items-center">
            {steps.map((s, index) => (
              <div
                key={s.id}
                className="flex items-center justify-center relative"
              >
                {/* Line LEFT */}
                {index !== 0 && (
                  <div className="absolute left-0 top-1/2 w-1/2 h-[2px] bg-gray-300">
                    <div
                      className={`h-[2px] ${
                        step > s.id - 1 ? "bg-[#C49A3C] w-full" : "w-0"
                      }`}
                    />
                  </div>
                )}

                {/* Line RIGHT */}
                {index !== steps.length - 1 && (
                  <div className="absolute right-0 top-1/2 w-1/2 h-[2px] bg-gray-300">
                    <div
                      className={`h-[2px] ${
                        step > s.id ? "bg-[#C49A3C] w-full" : "w-0"
                      }`}
                    />
                  </div>
                )}

                {/* Step Content */}
                <div className="z-10 flex flex-col items-center">
                  {/* Circle */}
                  <div
                    className={`w-8 h-8 md:w-9 md:h-9 flex items-center justify-center rounded-full text-xs md:text-sm font-semibold
            ${
              step === s.id
                ? "bg-[#1B2B4B] text-white"
                : step > s.id
                ? "bg-[#C49A3C] text-white"
                : "border border-gray-300 text-gray-400 bg-white"
            }`}
                  >
                    {s.id}
                  </div>

                  {/* Label */}
                  <span className="mt-2 text-xs md:text-sm text-gray-600 text-center">
                    {s.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FORM CARD */}
        <div className="bg-white rounded-b-xl shadow-md p-6 md:p-8">
          {!isReviewing ? (
            <form onSubmit={handleReview} className="space-y-8">
              {/* PERSONAL */}
              <section>
                <h2 className="text-lg font-semibold text-[#1B2B4B] border-b pb-2 mb-4">
                  Personal Information
                </h2>

                <div className="grid md:grid-cols-2 gap-4">
                  <input
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="First Name"
                    className={inputClass}
                    required
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.firstName}
                    </p>
                  )}
                  <input
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Last Name"
                    className={inputClass}
                    required
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.lastName}
                    </p>
                  )}

                  <select
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    className={inputClass}
                    required
                  >
                    <option value="">Select Age</option>
                    <option value="under-10">Under 10</option>
                    <option value="10-18">10–18</option>
                    <option value="above-18">Above 18</option>
                  </select>

                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className={inputClass}
                    required
                  >
                    <option value="">Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>

                  <input
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Phone"
                    className={inputClass}
                    required
                    maxLength={10}
                    inputMode="numeric"
                    pattern="[0-9]{10}"
                  />
                  <input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    className={inputClass}
                    required
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                  )}

                  <input
                    name="parish"
                    value={formData.parish}
                    onChange={handleChange}
                    placeholder="Parish Name"
                    className="md:col-span-2 border p-3 rounded"
                  />

                  <input
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Address"
                    className="md:col-span-2 border p-3 rounded"
                  />
                </div>
              </section>

              {/* PREFERENCES */}
              <section>
                <h2 className="text-lg font-semibold text-[#1B2B4B] border-b pb-2 mb-4">
                  Conference Preferences
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className={labelClass}>Shirt Size</label>
                    <div className="flex flex-wrap gap-3">
                      {[
                        "Adult S",
                        "Adult M",
                        "Adult L",
                        "Adult XL",
                        "Adult XXL",
                        "Youth S",
                        "Youth M",
                      ].map((size) => (
                        <button
                          type="button"
                          key={size}
                          onClick={() =>
                            setFormData((prev) => ({
                              ...prev,
                              shirtSize: size,
                            }))
                          }
                          className={`px-4 py-2 border rounded ${
                            formData.shirtSize === size
                              ? "bg-[#1B2B4B] text-white"
                              : "hover:border-yellow-500"
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>

                  <input
                    name="dietaryRestrictions"
                    value={formData.dietaryRestrictions}
                    onChange={handleChange}
                    placeholder="Dietary Restrictions (If not put N/A)"
                    className={inputClass}
                  />

                  <div>
                    <label className={labelClass}>Sponsor a Souvenir?</label>

                    <div className="flex gap-6 mt-2">
                      {["Yes", "No"].map((option) => (
                        <label
                          key={option}
                          className="flex items-center gap-2 cursor-pointer"
                        >
                          <input
                            type="radio"
                            name="sponsorSouvenir"
                            value={option}
                            checked={formData.sponsorSouvenir === option}
                            onChange={handleChange}
                            className="accent-[#1B2B4B]"
                          />
                          {option}
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              {/* Accommodation + Transportation */}
              <section>
                <h2 className="text-lg font-semibold text-[#1B2B4B] border-b pb-2 mb-4">
                  Accommodation + Transportation
                </h2>

                <div className="space-y-6 grid grid-cols-2">
                  {/* Hotel Booked */}
                  <div>
                    <label className={labelClass}>Hotel Booked?</label>
                    <div className="flex flex-wrap gap-4 mt-2">
                      {["Yes", "No"].map((option) => (
                        <label
                          key={option}
                          className="flex items-center gap-2 cursor-pointer"
                        >
                          <input
                            type="radio"
                            name="bookedHotel"
                            value={option}
                            checked={formData.bookedHotel === option}
                            onChange={handleChange}
                            className="accent-[#1B2B4B]"
                          />
                          {option}
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Assistance Required */}
                  <div>
                    <label className={labelClass}>Assistance Required?</label>
                    <div className="flex gap-4 mt-2">
                      {["Yes", "No"].map((option) => (
                        <label
                          key={option}
                          className="flex items-center gap-2 cursor-pointer"
                        >
                          <input
                            type="radio"
                            name="needAssistance"
                            value={option}
                            checked={formData.needAssistance === option}
                            onChange={handleChange}
                            className="accent-[#1B2B4B]"
                          />
                          {option}
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Shuttle Service */}
                  <div>
                    <label className={labelClass}>
                      Do you need airport/bus station shuttle service?
                    </label>
                    <div className="flex flex-col gap-2 mt-2">
                      {[
                        "Yes - Arrival only",
                        "Yes - Departure only",
                        "Yes - Both arrival and departure",
                        "No - I will arrange my own transportation",
                      ].map((option) => (
                        <label
                          key={option}
                          className="flex items-start gap-2 cursor-pointer"
                        >
                          <input
                            type="radio"
                            name="needShuttle"
                            value={option}
                            checked={formData.needShuttle === option}
                            onChange={handleChange}
                            className="accent-[#1B2B4B] mt-1"
                          />
                          <span>{option}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
                {formData.needShuttle === "Yes - Arrival only" ? (
                  <div className="mt-6">
                    <div className="bg-white border border-gray-200 rounded-2xl shadow-md p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-[#1B2B4B]">
                          Travel Information
                        </h3>
                        <span className="text-xs bg-[#1B2B4B]/10 text-[#1B2B4B] px-3 py-1 rounded-full">
                          Shuttle Details
                        </span>
                      </div>

                      <div className="grid md:grid-cols-2 gap-5">
                        <div className="space-y-1">
                          <label className="text-sm text-gray-500">
                            Flight Number
                          </label>
                          <input
                            type="text"
                            name="arrivalFlightNumber"
                            value={formData.arrivalFlightNumber}
                            onChange={handleChange}
                            placeholder="e.g. AI202"
                            className={`${inputClass} focus:ring-2 focus:ring-[#C49A3C]`}
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-sm text-gray-500">
                            Arrival Date
                          </label>
                          <input
                            type="date"
                            name="arrivalFlightDate"
                            value={formData.arrivalFlightDate}
                            min={new Date().toISOString().split("T")[0]}
                            onChange={handleChange}
                            className={`${inputClass} focus:ring-2 focus:ring-[#C49A3C]`}
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-sm text-gray-500">
                            Arrival Time
                          </label>
                          <input
                            type="time"
                            name="arrivalFlightTime"
                            value={formData.arrivalFlightTime}
                            onChange={handleChange}
                            className={`${inputClass} focus:ring-2 focus:ring-[#C49A3C]`}
                          />
                        </div>

                        <div className="space-y-1 md:col-span-2">
                          <label className="text-sm text-gray-500">
                            Bus Details
                          </label>
                          <input
                            type="text"
                            name="busDetails"
                            value={formData.busDetails}
                            onChange={handleChange}
                            placeholder="Optional"
                            className={`${inputClass} focus:ring-2 focus:ring-[#C49A3C]`}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ) : formData.needShuttle === "Yes - Departure only" ? (
                  <div className="mt-6">
                    <div className="bg-white border border-gray-200 rounded-2xl shadow-md p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-[#1B2B4B]">
                          Travel Information
                        </h3>
                        <span className="text-xs bg-[#1B2B4B]/10 text-[#1B2B4B] px-3 py-1 rounded-full">
                          Shuttle Details
                        </span>
                      </div>

                      <div className="grid md:grid-cols-2 gap-5">
                        <div className="space-y-1">
                          <label className="text-sm text-gray-500">
                            Flight Number
                          </label>
                          <input
                            type="text"
                            name="departureFlightNumber"
                            value={formData.departureFlightNumber}
                            onChange={handleChange}
                            placeholder="e.g. AI202"
                            className={`${inputClass} focus:ring-2 focus:ring-[#C49A3C]`}
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-sm text-gray-500">
                            Departure Date
                          </label>
                          <input
                            type="date"
                            name="departureFlightDate"
                            value={formData.departureFlightDate}
                            onChange={handleChange}
                            className={`${inputClass} focus:ring-2 focus:ring-[#C49A3C]`}
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-sm text-gray-500">
                            Departure Time
                          </label>
                          <input
                            type="time"
                            name="departureFlightTime"
                            value={formData.departureFlightTime}
                            onChange={handleChange}
                            className={`${inputClass} focus:ring-2 focus:ring-[#C49A3C]`}
                          />
                        </div>

                        <div className="space-y-1 md:col-span-2">
                          <label className="text-sm text-gray-500">
                            Bus Details
                          </label>
                          <input
                            type="text"
                            name="busDetails"
                            value={formData.busDetails}
                            onChange={handleChange}
                            placeholder="Optional"
                            className={`${inputClass} focus:ring-2 focus:ring-[#C49A3C]`}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ) : formData.needShuttle ===
                  "Yes - Both arrival and departure" ? (
                  <div className="mt-6 space-y-6">
                    {/* ARRIVAL */}
                    <div className="bg-white border border-gray-200 rounded-2xl shadow-md p-6 hover:shadow-lg transition">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-green-700">
                          Arrival Details
                        </h3>
                        <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full">
                          Incoming
                        </span>
                      </div>

                      <div className="grid md:grid-cols-2 gap-5">
                        <div className="space-y-1">
                          <label className="text-sm text-gray-500">
                            Flight Number
                          </label>
                          <input
                            type="text"
                            name="arrivalFlightNumber"
                            value={formData.arrivalFlightNumber}
                            onChange={handleChange}
                            className={`${inputClass} focus:ring-2 focus:ring-green-500`}
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-sm text-gray-500">
                            Arrival Date
                          </label>
                          <input
                            type="date"
                            name="arrivalFlightDate"
                            value={formData.arrivalFlightDate}
                            min={new Date().toISOString().split("T")[0]}
                            onChange={handleChange}
                            className={`${inputClass} focus:ring-2 focus:ring-green-500`}
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-sm text-gray-500">
                            Arrival Time
                          </label>
                          <input
                            type="time"
                            name="arrivalFlightTime"
                            value={formData.arrivalFlightTime}
                            onChange={handleChange}
                            className={`${inputClass} focus:ring-2 focus:ring-green-500`}
                          />
                        </div>
                      </div>
                    </div>

                    {/* DEPARTURE */}
                    <div className="bg-white border border-gray-200 rounded-2xl shadow-md p-6 hover:shadow-lg transition">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-red-600">
                          Departure Details
                        </h3>
                        <span className="text-xs bg-red-100 text-red-600 px-3 py-1 rounded-full">
                          Outgoing
                        </span>
                      </div>

                      <div className="grid md:grid-cols-2 gap-5">
                        <div className="space-y-1">
                          <label className="text-sm text-gray-500">
                            Flight Number
                          </label>
                          <input
                            type="text"
                            name="departureFlightNumber"
                            value={formData.departureFlightNumber}
                            onChange={handleChange}
                            className={`${inputClass} focus:ring-2 focus:ring-red-500`}
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-sm text-gray-500">
                            Departure Date
                          </label>
                          <input
                            type="date"
                            name="departureFlightDate"
                            value={formData.departureFlightDate}
                            min={new Date().toISOString().split("T")[0]}
                            onChange={handleChange}
                            className={`${inputClass} focus:ring-2 focus:ring-red-500`}
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-sm text-gray-500">
                            Departure Time
                          </label>
                          <input
                            type="time"
                            name="departureFlightTime"
                            value={formData.departureFlightTime}
                            onChange={handleChange}
                            className={`${inputClass} focus:ring-2 focus:ring-red-500`}
                          />
                        </div>
                      </div>
                    </div>

                    {/* COMMON BUS DETAILS */}
                    <div className="bg-white border border-gray-200 rounded-2xl shadow-md p-6 hover:shadow-lg transition">
                      <div className="space-y-1">
                        <label className="text-sm text-gray-500">
                          Bus Details (Arrival / Departure)
                        </label>
                        <input
                          type="text"
                          name="busDetails"
                          value={formData.busDetails}
                          onChange={handleChange}
                          className={`${inputClass} focus:ring-2 focus:ring-blue-500`}
                          placeholder="Enter bus info (if applicable)"
                        />
                      </div>
                    </div>
                  </div>
                ) : null}
              </section>

              {/* PAYMENT */}
              <section>
                <h2 className="text-lg font-semibold text-[#1B2B4B] border-b pb-2 mb-4">
                  Payment Method
                </h2>

                <select
                  name="paymentType"
                  value={formData.paymentType}
                  onChange={handleChange}
                  className={inputClass}
                >
                  <option value="">Select Payment Type</option>
                  <option value="Online">Online</option>
                  <option value="During participation">
                    During Participation
                  </option>
                </select>

                {formData.paymentType === "Online" && (
                  <select
                    name="paymentMethod"
                    value={formData.paymentMethod}
                    onChange={handleChange}
                    className={`${inputClass} mt-5`}
                  >
                    <option value="">Select Method</option>
                    <option value="Zelle">Zelle</option>
                    <option value="Credit Card (Stripe)">Credit Card</option>
                  </select>
                )}
                {formData.paymentType === "During participation" && (
                  <select
                    name="paymentMethod"
                    value={formData.paymentMethod}
                    onChange={handleChange}
                    className={`${inputClass} mt-5`}
                  >
                    <option value="">Select Method</option>
                    <option value="Cheque">Cheque</option>
                    <option value="Cash">Cash</option>
                  </select>
                )}
              </section>

              {/* BUTTONS */}
              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={handleAddParticipant}
                  className="flex-1 border border-[#C49A3C] text-[#C49A3C] py-3 rounded hover:bg-[#F9F3E3]"
                >
                  + Add Participant
                </button>

                <button
                  type="submit"
                  disabled={!formData.firstName}
                  className="flex-1 bg-[#C49A3C] text-white py-3 rounded disabled:opacity-50"
                >
                  Review →
                </button>
              </div>
            </form>
          ) : (
            /* REVIEW SCREEN */
            <div className="space-y-8">
              {participants.map((p, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
                >
                  {/* HEADER */}
                  <div className="bg-[#1B2B4B] text-white px-6 py-4 flex justify-between items-center">
                    <h3 className="text-lg font-semibold">
                      Participant {i + 1}
                    </h3>
                    <span className="bg-[#C49A3C] px-3 py-1 rounded-full text-sm font-medium">
                      {p.age === "under-10"
                        ? "Free"
                        : p.age === "10-18"
                        ? "₹100"
                        : "₹150"}
                    </span>
                  </div>

                  <div className="p-6 space-y-6">
                    {/* PERSONAL */}
                    <div>
                      <h4 className="text-md font-semibold text-gray-700 mb-3 border-b pb-1">
                        Personal Info
                      </h4>

                      <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <ReviewRow label="First Name" value={p.firstName} />
                        <ReviewRow label="Last Name" value={p.lastName} />
                        <ReviewRow label="Age" value={p.age} />
                        <ReviewRow label="Gender" value={p.gender} />
                        <ReviewRow label="Phone" value={p.phone} />
                        <ReviewRow label="Email" value={p.email} />
                        <ReviewRow label="Parish" value={p.parish} />
                        <ReviewRow label="Address" value={p.address} />
                      </div>
                    </div>

                    {/* PREFERENCES */}
                    <div>
                      <h4 className="text-md font-semibold text-gray-700 mb-3 border-b pb-1">
                        Preferences
                      </h4>

                      <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <ReviewRow label="Shirt Size" value={p.shirtSize} />
                        <ReviewRow
                          label="Dietary"
                          value={p.dietaryRestrictions}
                        />
                        <ReviewRow label="Sponsor" value={p.sponsorSouvenir} />
                      </div>
                    </div>

                    {/* TRAVEL */}
                    <div>
                      <h4 className="text-md font-semibold text-gray-700 mb-3 border-b pb-1">
                        Travel & Stay
                      </h4>

                      <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <ReviewRow label="Hotel" value={p.bookedHotel} />
                        <ReviewRow
                          label="Assistance"
                          value={p.needAssistance}
                        />
                        <ReviewRow label="Shuttle" value={p.needShuttle} />

                        {p.needShuttle === "Yes - Arrival only" ? (
                          <>
                            <ReviewRow
                              label="Flight"
                              value={p.arrivalFlightNumber}
                            />
                            <ReviewRow
                              label="Arrival Date"
                              value={p.arrivalFlightDate}
                            />
                            <ReviewRow
                              label="Arrival Time"
                              value={p.arrivalFlightTime}
                            />
                            <ReviewRow
                              label="Bus Details"
                              value={p.busDetails}
                            />
                          </>
                        ) : p.needShuttle === "Yes - Departure only" ? (
                          <>
                            <ReviewRow
                              label="Flight"
                              value={p.departureFlightNumber}
                            />
                            <ReviewRow
                              label="Departure Date"
                              value={p.departureFlightDate}
                            />
                            <ReviewRow
                              label="Departure Time"
                              value={p.departureFlightTime}
                            />
                            <ReviewRow
                              label="Bus Details"
                              value={p.busDetails}
                            />
                          </>
                        ) : p.needShuttle ===
                          "Yes - Both arrival and departure" ? (
                          <>
                            <ReviewRow
                              label="Arrival Flight"
                              value={p.arrivalFlightNumber}
                            />
                            <ReviewRow
                              label="Arrival Date"
                              value={p.arrivalFlightDate}
                            />
                            <ReviewRow
                              label="Arrival Time"
                              value={p.arrivalFlightTime}
                            />
                            <ReviewRow
                              label="Bus Details"
                              value={p.busDetails}
                            />
                            <ReviewRow
                              label="Departure Flight"
                              value={p.departureFlightNumber}
                            />
                            <ReviewRow
                              label="Departure Date"
                              value={p.departureFlightDate}
                            />
                            <ReviewRow
                              label="Departure Time"
                              value={p.departureFlightTime}
                            />
                            <ReviewRow
                              label="Departure Bus Details"
                              value={p.busDetails}
                            />
                          </>
                        ) : null}
                      </div>
                    </div>

                    {/* PAYMENT */}
                    <div>
                      <h4 className="text-md font-semibold text-gray-700 mb-3 border-b pb-1">
                        Payment
                      </h4>

                      <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <ReviewRow label="Type" value={p.paymentType} />
                        <ReviewRow label="Method" value={p.paymentMethod} />
                      </div>
                    </div>
                    <div className="bg-[#1B2B4B] text-white px-6 py-4 flex justify-between items-center">
                      <h3 className="text-lg font-semibold">
                        Participant {i + 1}
                      </h3>

                      <div className="flex gap-2">
                        {/* <span className="bg-[#C49A3C] px-3 py-1 rounded-full text-sm font-medium">
                          {p.age === "under-10"
                            ? "Free"
                            : p.age === "10-18"
                            ? "₹100"
                            : "₹150"}
                        </span> */}

                        <button
                          onClick={() => {
                            setFormData(p);
                            setEditIndex(i);
                            setIsReviewing(false);
                          }}
                          className="bg-[#C49A3C] px-3 py-1 rounded-full text-sm font-medium"
                        >
                          Edit
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* TOTAL SUMMARY */}
              <div className="bg-gradient-to-r from-[#1B2B4B] to-[#2e4a7d] text-white rounded-2xl shadow-lg p-6">
                <h4 className="text-lg font-semibold mb-4 border-b border-white/30 pb-2">
                  Summary
                </h4>

                <div className="flex justify-between text-base mb-2">
                  <span>Total Participants</span>
                  <span className="font-semibold">{participants.length}</span>
                </div>

                <div className="flex justify-between text-lg font-bold">
                  <span>Total Fee</span>
                  <span className="text-[#FFD700]">₹ {getTotalAmount()}</span>
                </div>
              </div>

              {/* ACTION BUTTONS */}
              <div className="flex gap-4 pt-2">
                <button
                  onClick={() => {
                    setIsReviewing(false);
                    setEditIndex(null);
                    setFormData(emptyForm);
                  }}
                  className="flex-1 bg-gray-200 py-3 rounded-xl hover:bg-gray-300 transition"
                >
                  Add More
                </button>

                <button
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="flex-1 bg-[#C49A3C] text-white py-3 rounded-xl hover:opacity-90 transition flex items-center justify-center"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Submitting...
                    </div>
                  ) : (
                    "Confirm & Submit"
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {isZelleStep && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center 
  bg-black/40 backdrop-blur-md px-3 sm:px-4"
        >
          <div
            className="w-full max-w-lg bg-white rounded-2xl shadow-2xl 
    p-4 sm:p-6 space-y-5 sm:space-y-6 animate-fade-in
    max-h-[90vh] overflow-y-auto"
          >
            {/* Title */}
            <h2 className="text-xl sm:text-2xl font-bold text-center text-[#1B2B4B]">
              Zelle Payment
            </h2>

            {/* QR Section */}
            <div className="text-center space-y-2 sm:space-y-3">
              <p className="font-semibold text-sm sm:text-base">Scan to Pay</p>

              <img
                src={QR}
                alt="QR"
                className="w-32 h-32 sm:w-40 sm:h-40 mx-auto bg-white p-2 rounded shadow"
              />

              <p className="text-xs sm:text-sm text-gray-600 break-all">
                {import.meta.env.VITE_ZELLE_EMAIL}
              </p>

              <p className="font-semibold text-[#1B2B4B] text-sm sm:text-base">
                Total: ₹ {getTotalAmount()}
              </p>
            </div>

            {/* Inputs */}
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Transaction ID"
                value={transactionId}
                onChange={(e) => setTransactionId(e.target.value)}
                className="w-full border p-2 sm:p-3 rounded text-sm sm:text-base"
              />

              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  setScreenshot(file);

                  if (file) {
                    setPreview(URL.createObjectURL(file));
                  }
                }}
                className="w-full border p-2 sm:p-3 rounded text-sm"
              />
            </div>

            {/* Preview */}
            {preview && (
              <div className="text-center">
                <p className="text-xs sm:text-sm text-gray-500 mb-2">Preview</p>
                <img
                  src={preview}
                  alt="preview"
                  className="w-32 sm:w-40 h-40 sm:h-56 object-cover mx-auto rounded shadow"
                />
              </div>
            )}

            {/* Buttons */}
            <div className="space-y-2">
              <button
                onClick={zellePaymentSubmit}
                className="w-full bg-[#1B2B4B] text-white py-2.5 sm:py-3 rounded text-sm sm:text-base"
              >
                {isLoading ? "Submitting..." : "Submit Payment"}
              </button>

              <button
                onClick={() => setIsZelleStep(false)}
                className="w-full text-gray-500 underline text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* zelle payment message */}
      {messageType === "success" && !isZelleStep && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50 px-4">
          <div className="bg-white p-8 rounded-2xl text-center max-w-md w-full shadow-2xl animate-fade-in">
            {/* Icon */}
            <div className="w-16 h-16 mx-auto flex items-center justify-center rounded-full bg-green-100 text-green-600 text-3xl mb-4">
              ✔
            </div>

            {/* Title */}
            <h2 className="text-2xl font-bold text-[#1B2B4B] mb-2">
              Payment Successful
            </h2>

            {/* Message */}
            <p className="text-gray-600 mb-4">
              Your payment has been successfully verified. Please complete your
              registration to confirm your participation.
            </p>

            {/* Payment ID */}
            <p className="text-sm text-gray-500 mb-6">
              Reference ID: <span className="font-medium">{zelleId}</span>
            </p>

            {/* Button */}
            <button
              onClick={zelleRegistration}
              className="w-full bg-[#1B2B4B] hover:bg-[#16233c] transition text-white py-3 rounded-lg font-medium"
            >
              {isLoading ? "submiting..." : "Complete Registration"}
            </button>
          </div>
        </div>
      )}

      {messageType === "error" && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50 px-4">
          <div className="bg-white p-8 rounded-2xl text-center max-w-md w-full shadow-2xl animate-fade-in">
            {/* Icon */}
            <div className="w-16 h-16 mx-auto flex items-center justify-center rounded-full bg-red-100 text-red-600 text-3xl mb-4">
              ✖
            </div>

            {/* Title */}
            <h2 className="text-2xl font-bold text-red-600 mb-2">
              Payment Failed
            </h2>

            {/* Message */}
            <p className="text-gray-600 mb-6">
              {message ||
                "We couldn’t verify your payment. Please check your details and try again."}
            </p>

            {/* Button */}
            <button
              onClick={() => setMessageType("")}
              className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg font-medium"
            >
              Try Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConferenceForm;
