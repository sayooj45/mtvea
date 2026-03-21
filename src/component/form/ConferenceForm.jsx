import React, { useState } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const ConferenceForm = () => {

  const API_URL = import.meta.env.VITE_API_URL;

  const [isReviewing, setIsReviewing] = useState(false);
  const [participants, setParticipants] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);



  const navigate = useNavigate()

  const [formData, setFormData] = useState({
  firstName: '', lastName: '', age: '', gender: '', address: '',
  phone: '', email: '', parish: '', shirtSize: '', dietaryRestrictions: '',
  sponsorSouvenir: '', bookedHotel: '', needAssistance:'',
  needShuttle:'', flightNumber:'', busDetails:'', arrivalDate:'', arrivalTime:'',
  paymentType:'',        
  paymentMethod:''       
});

  const emptyForm = {
  firstName: '', lastName: '', age: '', gender: '', address: '',
  phone: '', email: '', parish: '', shirtSize: '', dietaryRestrictions: '',
  sponsorSouvenir: '', bookedHotel: '', 
   needAssistance:'',needShuttle:'',flightNumber:'',busDetails:'',arrivalDate:'',arrivalTime:'',
  paymentType:'',
  paymentMethod:'',
  
};

const handleAddParticipant = () => {
  if (!formData.firstName || !formData.lastName) return;

  setParticipants(prev => [...prev, formData]);
  setFormData(emptyForm); 

};

const handleChange = (e) => {
  const { name, value } = e.target;

  setFormData(prev => ({ ...prev, [name]: value }));


  if (name === "needShuttle" && value === "No - I will arrange my own transportation") {
  setFormData(prev => ({
    ...prev,
    needShuttle: value,
    flightNumber: "",
    arrivalTime: "",
    busDetails: ""
  }));
  return;
}
};

const handleReview = (e) => {
  e.preventDefault();

  const isFormEmpty = !formData.firstName && !formData.lastName;

  const lastParticipant = participants[participants.length - 1];
  const isDuplicate =
    lastParticipant &&
    lastParticipant.firstName === formData.firstName &&
    lastParticipant.lastName === formData.lastName;

  if (!isFormEmpty && !isDuplicate) {
    setParticipants((prev) => [...prev, formData]);
    setFormData(emptyForm);
  }

  setIsReviewing(true); 

  window.scrollTo(0, 0);
};



const handleSubmit = async (e) => { 
  e.preventDefault(); 
  const hasStripePayment = participants.some( (p) => p.paymentType === "Online" && 
  p.paymentMethod === "Credit Card (Stripe)" );
   const hasZellePayment = participants.some( (p) => p.paymentType === "Online" && 
   p.paymentMethod === "Zelle" ); if (hasStripePayment) { navigate("/payment-page", 
    { state: { participants } }); return; } 
    if (hasZellePayment) { navigate("/zelle-payment", { state: { participants } }); 
    return; }
     try {
       console.log( participants); 
       const response = await axios.post(
         `${API_URL}api/registration`, 
         { 
          participants: participants 
        }, 
         {
           headers: { "Content-Type": "application/json" } 
          } ); 
          alert("Registration Submitted Successfully!");
          setIsSubmitted(true); 
          console.log("Server Response:", response.data); 
          navigate('/') 
        } 
        catch (error) {
           console.error("Submission Error:", error); 
           alert( error.response?.data?.message || "Something went wrong while submitting." ); } };



  const labelClass = "block text-base font-bold text-gray-700 mb-1";
  const inputClass = "w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2.5 text-base border bg-white";
  const radioLabel = "flex items-center space-x-2 text-base cursor-pointer";


  const ReviewRow = ({ label, value }) => (
    <div className="flex justify-between border-b py-2 text-sm md:text-base">
      <span className="font-bold text-gray-600">{label}:</span>
      <span className="text-gray-900 font-medium">{value || 'N/A'}</span>
    </div>
  );


    const steps = [
    { id: 1, label: "DETAILS" },
    { id: 2, label: "REVIEW" },
    { id: 3, label: "DONE" },
  ];

  const step = isSubmitted ? 3 : isReviewing ? 2 : 1;

  return (
  <div className="min-h-screen bg-[#FBF8F2] py-10 px-4">
    
    <div className="max-w-4xl mx-auto">
      

      {/* HEADER */}
      {/* <div className="bg-[#1B2B4B] text-center py-8 rounded-t-xl shadow-md">
        <img src={logo} className="w-20 mx-auto mb-4" />
        <h1 className="text-2xl md:text-3xl font-serif text-white">
          {isReviewing ? "Review Registration" : "Conference Registration"}
        </h1>
        <p className="text-white/60 text-sm mt-2">
          MTVEA XVIIIth National Conference 2026
        </p>
      </div> */}

<div className="flex justify-center mb-10 px-4">
  <div className="w-full max-w-3xl grid grid-cols-3 items-center">
    
    {steps.map((s, index) => (
      <div key={s.id} className="flex items-center justify-center relative">
        
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
                <input name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First Name" className={inputClass} required />
                <input name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last Name" className={inputClass} required />

                <select name="age" value={formData.age} onChange={handleChange} className={inputClass} required>
                  <option value="">Select Age</option>
                  <option value="under-10">Under 10</option>
                  <option value="10-18">10–18</option>
                  <option value="above-18">Above 18</option>
                </select>

                <select name="gender" value={formData.gender} onChange={handleChange} className={inputClass} required>
                  <option value="">Gender</option>
                  <option value='male'>Male</option>
                  <option value='female'>Female</option>
                </select>

                <input name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" className={inputClass} required />
                <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" className={inputClass} required />

                <input name="parish" value={formData.parish} onChange={handleChange} placeholder="Parish Name" className="md:col-span-2 border p-3 rounded" />

                <input name="address" value={formData.address} onChange={handleChange} placeholder="Address" className="md:col-span-2 border p-3 rounded" />
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
                    {['Adult S','Adult M','Adult L','Adult XL','Adult XXL','Youth S','Youth M'].map(size => (
                      <button
                        type="button"
                        key={size}
                        onClick={() => setFormData(prev => ({ ...prev, shirtSize: size }))}
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
          <label key={option} className="flex items-center gap-2 cursor-pointer">
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
          <label key={option} className="flex items-center gap-2 cursor-pointer">
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
          <label key={option} className="flex items-start gap-2 cursor-pointer">
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
      {(formData.needShuttle === "Yes - Arrival only" || 
      formData.needShuttle === "Yes - Departure only" || 
      formData.needShuttle === "Yes - Both arrival and departure" ) && (
  <div className="grid md:grid-cols-2 gap-4 mt-4 p-4 border rounded-lg bg-gray-50">
    
  <input
    type="text"
    name="flightNumber"
    value={formData.flightNumber}
    onChange={handleChange}
    placeholder="Flight Number"
    className={inputClass}
  />

  {/* Arrival Date */}
  <input
    type="date"
    name="arrivalDate"
    value={formData.arrivalDate}
    onChange={handleChange}
    className={inputClass}
  />

  {/* Arrival Time */}
  <input
    type="time"
    name="arrivalTime"
    value={formData.arrivalTime}
    onChange={handleChange}
    className={inputClass}
  />

  <input
    type="text"
    name="busDetails"
    value={formData.busDetails}
    onChange={handleChange}
    placeholder="Bus Details"
    className="md:col-span-2 border p-3 rounded"
  />

</div>
)}
</section>

            {/* PAYMENT */}
            <section>
              <h2 className="text-lg font-semibold text-[#1B2B4B] border-b pb-2 mb-4">
                Payment Method
              </h2>

              <select name="paymentType"  value={formData.paymentType} onChange={handleChange} className={inputClass}>
                <option value="">Select Payment Type</option>
                <option value="Online">Online</option>
                <option value="During participation">During Participation</option>
              </select>

              {(formData.paymentType === "Online") && (
                <select name="paymentMethod" value={formData.paymentMethod} onChange={handleChange} className={`${inputClass} mt-5`}>
                  <option value="">Select Method</option>
                  <option value="Zelle">Zelle</option>
                  <option value="Credit Card (Stripe)">Stripe</option>
                </select>
              )}
              {
                (formData.paymentType === "During participation" )&& (
                <select name="paymentMethod" value={formData.paymentMethod} onChange={handleChange} className={`${inputClass} mt-5`}>
                  <option value="">Select Method</option>
                  <option value="Cheque">Cheque</option>
                  <option value="Cash">Cash</option>
                </select>
              )
                
              }
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
          <div className="space-y-6">
  {participants.map((p, i) => (
    <div key={i} className="border rounded-xl p-6 shadow-sm bg-gray-50">
      
      <h3 className="text-lg font-semibold text-[#1B2B4B] mb-4 border-b pb-2">
        Participant {i + 1}
      </h3>

      {/* PERSONAL */}
      <div className="grid md:grid-cols-2 gap-3 mb-4">
        <ReviewRow label="First Name" value={p.firstName} />
        <ReviewRow label="Last Name" value={p.lastName} />
        <ReviewRow label="Age" value={p.age} />
        <ReviewRow label="Gender" value={p.gender} />
        <ReviewRow label="Phone" value={p.phone} />
        <ReviewRow label="Email" value={p.email} />
        <ReviewRow label="Parish" value={p.parish} />
        <ReviewRow label="Address" value={p.address} />
      </div>

      {/* PREFERENCES */}
{/* PREFERENCES */}
<div className="mb-4">
  <h4 className="font-semibold text-gray-700 mb-2">Preferences</h4>
  <div className="grid md:grid-cols-2 gap-3">
    <ReviewRow label="Shirt Size" value={p.shirtSize} />
    <ReviewRow label="Dietary" value={p.dietaryRestrictions} />
    <ReviewRow label="Sponsor Souvenir" value={p.sponsorSouvenir} />
  </div>
</div>

      {/* TRAVEL */}
      <div className="mb-4">
  <h4 className="font-semibold text-gray-700 mb-2">Travel & Accommodation</h4>
  
  <div className="grid md:grid-cols-2 gap-3">

    <ReviewRow label="Hotel Booked" value={p.bookedHotel} />

    <ReviewRow label="Need Assistance" value={p.needAssistance} />

    <ReviewRow label="Shuttle Service" value={p.needShuttle} />

    {/* Show only if shuttle is NOT "No..." */}
    {p.needShuttle !== "No - I will arrange my own transportation" && (
      <>
        <ReviewRow label="Flight Number" value={p.flightNumber} />
        <ReviewRow label="Arrival Time" value={p.arrivalDate} />
        <ReviewRow label="Arrival Time" value={p.arrivalTime} />
        <ReviewRow label="Bus Details" value={p.busDetails} />
      </>
    )}

  </div>
</div>

      {/* PAYMENT */}
      <div>
        <h4 className="font-semibold text-gray-700 mb-2">Payment</h4>
        <div className="grid md:grid-cols-2 gap-3">
          <ReviewRow label="Type" value={p.paymentType} />
          <ReviewRow label="Method" value={p.paymentMethod} />
        </div>
      </div>

    </div>
  ))}

  {/* ACTION BUTTONS */}
  <div className="flex gap-4 pt-4">
   <button
  onClick={() => {
    setIsReviewing(false);
    // Optional: if you want the form to be empty when they go back
    setFormData(emptyForm); 
  }}
  className="flex-1 bg-gray-200 py-3 rounded-lg hover:bg-gray-300 transition"
>
  Back / Add More
</button>

    <button
      onClick={handleSubmit}
      className="flex-1 bg-[#C49A3C] text-white py-3 rounded-lg hover:opacity-90 transition"
    >
      Confirm & Submit
    </button>
  </div>
</div>

        )}
      </div>
    </div>
  </div>
);
};

export default ConferenceForm;