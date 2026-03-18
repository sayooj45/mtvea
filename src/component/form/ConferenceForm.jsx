import React, { useState } from 'react';
import logo from '../../assets/logo.png'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const ConferenceForm = () => {
  const [isReviewing, setIsReviewing] = useState(false);
  const [participants, setParticipants] = useState([]);

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
  setParticipants(prev => [...prev, formData]);
  setFormData(emptyForm);
};

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

 const handleReview = (e) => {
  e.preventDefault();

  const allParticipants = [...participants, formData];
  setParticipants(allParticipants);

  setIsReviewing(true);
  window.scrollTo(0, 0);
};



  const handleSubmit = async (e) => {
  e.preventDefault();

  console.log("Sending participants:", participants); 

  const hasStripePayment = participants.some(
    (p) =>
    p.paymentType === "Online" &&
    p.paymentMethod === "Credit Card (Stripe)"
    );

    const hasZellePayment = participants.some(
    (p) =>
    p.paymentType === "Online" &&
    p.paymentMethod === "Zelle"
    );

    if (hasStripePayment) {
      navigate("/payment-page", {
        state: { participants }
      });
      return;
    }
    if (hasZellePayment) {
      navigate("/zelle-payment", {
        state: { participants }
      });
      return;
    }

  try {

    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/registration`,
      {
        participants: participants
      },
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

    alert("Registration Submitted Successfully!");
    console.log("Server Response:", response.data);
    navigate('/')

  } catch (error) {

    console.error("Submission Error:", error);

    alert(
      error.response?.data?.message ||
      "Something went wrong while submitting."
    );

  }

};



  const labelClass = "block text-base font-bold text-gray-700 mb-1";
  const inputClass = "w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2.5 text-base border bg-white";
  const radioLabel = "flex items-center space-x-2 text-base cursor-pointer";


  const ReviewRow = ({ label, value }) => (
    <div className="flex justify-between border-b py-2 text-sm md:text-base">
      <span className="font-bold text-gray-600">{label}:</span>
      <span className="text-gray-900 font-medium">{value || 'N/A'}</span>
    </div>
  );

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
                  <option value="under-12">Under 10</option>
                  <option value="12-18">10–18</option>
                  <option value="above-18">Above 18</option>
                </select>

                <select name="gender" value={formData.gender} onChange={handleChange} className={inputClass} required>
                  <option value="">Gender</option>
                  <option>Male</option>
                  <option>Female</option>
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
                  placeholder="Dietary Restrictions"
                  className={inputClass}
                />

              </div>
            </section>

            {/* PAYMENT */}
            <section>
              <h2 className="text-lg font-semibold text-[#1B2B4B] border-b pb-2 mb-4">
                Payment Method
              </h2>

              <select name="paymentType" value={formData.paymentType} onChange={handleChange} className={inputClass}>
                <option value="">Select Payment Type</option>
                <option value="Online">Online</option>
                <option value="During Participation">During Participation</option>
              </select>

              {formData.paymentType === "Online" && (
                <select name="paymentMethod" value={formData.paymentMethod} onChange={handleChange} className={inputClass}>
                  <option value="">Select Method</option>
                  <option value="Zelle">Zelle</option>
                  <option value="Credit Card (Stripe)">Stripe</option>
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
                className="flex-1 bg-[#C49A3C] text-white py-3 rounded hover:opacity-90"
              >
                Review →
              </button>
            </div>

          </form>
        ) : (

          /* REVIEW SCREEN */
          <div className="space-y-6">
            {participants.map((p, i) => (
              <div key={i} className="border rounded-lg p-5">
                <h3 className="font-semibold text-[#1B2B4B] mb-3">
                  Participant {i + 1}
                </h3>

                <ReviewRow label="Name" value={`${p.firstName} ${p.lastName}`} />
                <ReviewRow label="Email" value={p.email} />
                <ReviewRow label="Phone" value={p.phone} />
                <ReviewRow label="Payment" value={`${p.paymentType} - ${p.paymentMethod}`} />
              </div>
            ))}

            <div className="flex gap-4">
              <button
                onClick={() => setIsReviewing(false)}
                className="flex-1 bg-gray-200 py-3 rounded"
              >
                Back
              </button>

              <button
                onClick={handleSubmit}
                className="flex-1 bg-green-600 text-white py-3 rounded"
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