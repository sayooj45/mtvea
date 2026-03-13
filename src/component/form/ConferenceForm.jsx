import React, { useState } from 'react';
import logo from '../../assets/logo.png'
const ConferenceForm = () => {
  const [isReviewing, setIsReviewing] = useState(false);
  const [participants, setParticipants] = useState([]);

  const [formData, setFormData] = useState({
    firstName: '', lastName: '', age: '', gender: '', address: '',
    phone: '', email: '', parish: '', shirtSize: '', dietaryRestrictions: '',
    sponsorSouvenir: '', bookedHotel: '', needsTransport: '',needAssistance:'',
    needShuttle:'',flightNumber:'',busDetails:'',arrivalDate:'',arrivalTime:'', paymentMethod: '',
  });

  const emptyForm = {
  firstName: '', lastName: '', age: '', gender: '', address: '',
  phone: '', email: '', parish: '', shirtSize: '', dietaryRestrictions: '',
  sponsorSouvenir: '', bookedHotel: '', needsTransport: '',
  paymentMethod: '', needAssistance:'',needShuttle:'',flightNumber:'',busDetails:'',arrivalDate:'',arrivalTime:'',
  
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

//   const handleSubmit = async (e) => {
//   e.preventDefault();

//   try {

//     const response = await axios.post(
//       "http://:5000/api/registration",
//       {
//         participants: participants
//       },
//       {
//         headers: {
//           "Content-Type": "application/json"
//         }
//       }
//     );

//     alert("Registration Submitted Successfully!");
//     console.log("Server Response:", response.data);

//   } catch (error) {

//     console.error("Submission Error:", error);

//     alert(
//       error.response?.data?.message ||
//       "Something went wrong while submitting."
//     );

//   }
// };

  const handleSubmit = (e) => { 
    e.preventDefault(); alert("Registration Submitted Successfully!");
     console.log("Final Registration Data:", formData); 
  };

  const labelClass = "block text-base font-bold text-gray-700 mb-1";
  const inputClass = "w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2.5 text-base border bg-white";
  const radioLabel = "flex items-center space-x-2 text-base cursor-pointer";

  // Helper component for the review summary rows
  const ReviewRow = ({ label, value }) => (
    <div className="flex justify-between border-b py-2 text-sm md:text-base">
      <span className="font-bold text-gray-600">{label}:</span>
      <span className="text-gray-900 font-medium">{value || 'N/A'}</span>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg border border-gray-200">
        
        {/* Header */}
        <div className="bg-blue-800 p-6 text-center rounded-t-lg flex-col items-center flex gap-6">
          <img src={logo} alt="logo" 
          className='w-20 h-20'/>
          <h1 className="text-2xl font-bold text-white uppercase tracking-wide">
            {isReviewing ? "Review Registration" : "MTVEA National Conference Registration"}
          </h1>
        </div>

        {!isReviewing ? (
          /* --- EDITING MODE --- */
          <form onSubmit={handleReview} className="p-8 space-y-8">
            
            {/* 1. Personal Info */}
            <section>
              <h2 className="text-xl font-bold text-blue-800 border-b pb-2 mb-5">Personal Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div><label className={labelClass}>First Name *</label><input required name="firstName" value={formData.firstName} onChange={handleChange} className={inputClass} /></div>
                <div><label className={labelClass}>Last Name *</label><input required name="lastName" value={formData.lastName} onChange={handleChange} className={inputClass} /></div>
                <div>
                  <label className={labelClass}>Gender *</label>
                  <select required name="age" value={formData.age} onChange={handleChange} className={inputClass}>
                    <option value="">Select</option>
                    <option value="under-12">Under 12</option>
                    <option value="12-18">12-18</option>
                    <option value="above-18">Above 18</option>
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Gender *</label>
                  <select required name="gender" value={formData.gender} onChange={handleChange} className={inputClass}>
                    <option value="">Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
                <div className="md:col-span-2"><label className={labelClass}>Address *</label><input required name="address" value={formData.address} onChange={handleChange} className={inputClass} /></div>
                <div><label className={labelClass}>Phone Number *</label><input required type="tel" name="phone" value={formData.phone} onChange={handleChange} className={inputClass} /></div>
                <div><label className={labelClass}>Email Address *</label><input required type="email" name="email" value={formData.email} onChange={handleChange} className={inputClass} /></div>
                <div className="md:col-span-2"><label className={labelClass}>Parish Name *</label><input required name="parish" value={formData.parish} onChange={handleChange} className={inputClass} /></div>
              </div>
            </section>

            {/* 2. Preferences */}
            <section>
              <h2 className="text-xl font-bold text-blue-800 border-b pb-2 mb-5">Conference Preferences</h2>
              <div className="space-y-5">
                <div>
                  <label className={labelClass}>Shirt Size *</label>
                  <div className="flex flex-wrap gap-4 mt-2">
                    {['Adult S', 'Adult M', 'Adult L', 'Adult XL', 'Adult XXL', 'Youth S', 'Youth M'].map(size => (
                      <label key={size} className={radioLabel}>
                        <input type="radio" name="shirtSize" value={size} checked={formData.shirtSize === size} onChange={handleChange} className="w-4 h-4 text-blue-600" required />
                        <span>{size}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <label className={labelClass}>Dietary Restrictions (If none put N/A)</label>
                  <input name="dietaryRestrictions" value={formData.dietaryRestrictions} placeholder="e.g. None" onChange={handleChange} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Sponsor a souvenir page?</label>
                  <div className="flex space-x-6 mt-1">
                    {['Yes', 'No'].map(opt => (
                      <label key={opt} className={radioLabel}>
                        <input type="radio" name="sponsorSouvenir" value={opt} checked={formData.sponsorSouvenir === opt} onChange={handleChange} className="w-4 h-4" />
                        <span>{opt}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* 3. Logistics (All fields included) */}
            <section>
              <h2 className="text-xl font-bold text-blue-800 border-b pb-2 mb-5">Accommodations + Transportation</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 ">
                <div>
                  <label className={labelClass}>Hotel booked?</label>
                  <div className="flex space-x-4 mt-1">
                    {['Yes', 'No'].map(opt => (
                      <label key={opt} className={radioLabel}>
                        <input type="radio" name="bookedHotel" value={opt} checked={formData.bookedHotel === opt} onChange={handleChange} className="w-4 h-4" />
                        <span>{opt}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <label className={labelClass}>Need transport to Airport?</label>
                  <div className="flex space-x-4 mt-1">
                    {['Yes', 'No'].map(opt => (
                      <label key={opt} className={radioLabel}>
                        <input type="radio" name="needsTransport" value={opt} checked={formData.needsTransport === opt} onChange={handleChange} className="w-4 h-4" />
                        <span>{opt}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <label className={labelClass}>Assistance Required?</label>
                  <div className="flex space-x-4 mt-1">
                    {['Yes', 'No'].map(opt => (
                      <label key={opt} className={radioLabel}>
                        <input type="radio" name="needAssistance" value={opt} checked={formData.needAssistance === opt} onChange={handleChange} className="w-4 h-4" />
                        <span>{opt}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div className="md:col-span-3">
                    <label className={labelClass}>Do you need airport/bus station shuttle service?</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">

                    {[
                      "Yes – Arrival only",
                      "Yes – Departure only",
                      "Yes – Both arrival and departure",
                      "No – I will arrange my own transportation",
                    ].map((opt) => (
                    <label key={opt} className={radioLabel}>
                      <input type="radio" name="needShuttle" value={opt} checked={formData.needShuttle === opt} onChange={handleChange} className="w-4 h-4"/>
                      <span>{opt}</span>
                    </label>
                    ))}

                    </div>
                </div>
              </div>
              {
                (formData.needShuttle === "Yes – Arrival only" ||
                formData.needShuttle === "Yes – Departure only" ||
                formData.needShuttle === "Yes – Both arrival and departure") && (

              <div className="mt-6 border rounded-lg p-5 bg-gray-50">

              <h3 className="text-lg font-semibold text-blue-800 mb-4">
                Travel / Shuttle Details
              </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              <div>
                <label className={labelClass}>Flight Number</label>
                <input
                name="flightNumber"
                value={formData.flightNumber}
                onChange={handleChange}
                placeholder="Eg: Indigo 6E234"
                className={inputClass}
                />
              </div>

              <div>
              <label className={labelClass}>Bus Details</label>
              <input
              name="busDetails"
              value={formData.busDetails}
              onChange={handleChange}
              placeholder="Eg: KSRTC / Bus No"
              className={inputClass}
              />
              </div>

              <div>
                <label className={labelClass}>Arrival Date</label>
                <input
                type="date"
                name="arrivalDate"
                value={formData.arrivalDate}
                onChange={handleChange}
                className={inputClass}
                />
              </div>

            <div>
              <label className={labelClass}>Arrival Time</label>
              <input
              type="time"
              name="arrivalTime"
              value={formData.arrivalTime}
              onChange={handleChange}
              className={inputClass}
              />
            </div>

          </div>

        </div>
        )}

            </section>

            {/* 4. Payment */}
            <section>
              <h2 className="text-xl font-bold text-blue-800 border-b pb-2 mb-5">Payment Method</h2>
              <div className="flex flex-col sm:flex-row gap-6">
                {['Online', 'During Participation'].map(method => (
                  <label key={method} className={radioLabel}>
                    <input required type="radio" name="paymentMethod" value={method} checked={formData.paymentMethod === method} onChange={handleChange} className="w-5 h-5 text-blue-600" />
                    <span className="font-medium text-lg">{method}</span>
                  </label>
                ))}
              </div>
            </section>

            <div className="flex gap-4">
              <button
                type="button"
                onClick={handleAddParticipant}
                className="flex-1 bg-gray-600 text-white font-bold py-4 rounded-md hover:bg-gray-700 transition text-lg"
              >
                Add Another Participant
              </button>

              <button
                type="submit"
                className="flex-1 bg-blue-800 text-white font-bold py-4 rounded-md hover:bg-blue-900 transition shadow-lg text-lg uppercase"
              >
                Review Information
              </button>
            </div>

          </form>
        ) : (
          /* --- REVIEW MODE (Cross-checked Summary) --- */
          <div className="p-8 space-y-8">
            {participants.map((participant,index)=>(
              <div>
            <div>
              <h3 className="text-lg font-bold text-blue-800 border-b pb-2 mb-3">Personal & Contact</h3>
              <ReviewRow label="Full Name" value={`${participant.firstName} ${participant.lastName}`} />
              <ReviewRow label="Age / Gender" value={`${participant.age} / ${participant.gender}`} />
              <ReviewRow label="Email" value={participant.email} />
              <ReviewRow label="Phone" value={participant.phone} />
              <ReviewRow label="Address" value={participant.address} />
              <ReviewRow label="Parish" value={participant.parish} />
            </div>

            <div>
              <h3 className="text-lg font-bold text-blue-800 border-b pb-2 mb-3">Preferences</h3>
              <ReviewRow label="Shirt Size" value={participant.shirtSize} />
              <ReviewRow label="Dietary Restrictions" value={participant.dietaryRestrictions} />
              <ReviewRow label="Sponsor Souvenir" value={participant.sponsorSouvenir} />
            </div>

            <div>
              <h3 className="text-lg font-bold text-blue-800 border-b pb-2 mb-3">Logistics & Flight Info</h3>
              <ReviewRow label="Hotel Booked" value={participant.bookedHotel} />
              <ReviewRow label="Needs Transport" value={participant.needsTransport} />
              <ReviewRow label="Needs Assistance" value={participant.needAssistance} />
              <ReviewRow label="Needs Shuttle" value={participant.needShuttle} />
              <ReviewRow label="Flight Number" value={participant.flightNumber} />
              <ReviewRow label="Bus Details" value={participant.busDetails} />
              <ReviewRow label="Arrival Date" value={participant.arrivalDate} />
              <ReviewRow label="Arrival Time" value={participant.arrivalTime} />
            </div>

            <div>
              <h3 className="text-lg font-bold text-blue-800 border-b pb-2 mb-3">Final Selection</h3>
              <ReviewRow label="Payment Method" value={participant.paymentMethod} />
            </div>
            </div>
            ))}

            <div className="flex flex-col md:flex-row gap-4 pt-4">
              <button onClick={() => setIsReviewing(false)} className="flex-1 bg-gray-200 text-gray-800 font-bold py-4 rounded-md hover:bg-gray-300 transition text-lg">
                Go Back & Edit
              </button>
              <button onClick={handleSubmit} className="flex-1 bg-green-600 text-white font-bold py-4 rounded-md hover:bg-green-700 transition shadow-md text-lg">
                Confirm & Submit
              </button>
            </div>
            
          </div>
        )}
      </div>
    </div>
  );
};

export default ConferenceForm;