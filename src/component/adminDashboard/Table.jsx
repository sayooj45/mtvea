import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { IoIosLogOut } from "react-icons/io";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const Table = () => {

 const data = [

{
firstName: "John",
lastName: "Mathew",
age: "Above 18",
gender: "Male",
address: "Kochi",
phone: "9876543210",
email: "john@email.com",
parish: "St Mary's",
shirtSize: "Adult L",
dietaryRestrictions: "None",
sponsorSouvenir: "Yes",
bookedHotel: "Yes",
needsTransport: "Yes",
needAssistance: "No",
needShuttle: "Arrival Only",
flightNumber: "Indigo 6E234",
busDetails: "",
arrivalDate: "2026-04-02",
arrivalTime: "10:30",
paymentMethod: "Online"
},

{
firstName: "Anna",
lastName: "Jose",
age: "Above 18",
gender: "Female",
address: "Trivandrum",
phone: "9999999999",
email: "anna@email.com",
parish: "St George Church",
shirtSize: "Adult M",
dietaryRestrictions: "Veg",
sponsorSouvenir: "No",
bookedHotel: "Yes",
needsTransport: "No",
needAssistance: "No",
needShuttle: "No – I will arrange my own transportation",
flightNumber: "",
busDetails: "KSRTC Super Fast",
arrivalDate: "2026-04-02",
arrivalTime: "09:00",
paymentMethod: "Online"
},

{
firstName: "Paul",
lastName: "Thomas",
age: "Above 18",
gender: "Male",
address: "Kottayam",
phone: "8888888888",
email: "paul@email.com",
parish: "St Peter Parish",
shirtSize: "Adult XL",
dietaryRestrictions: "Non Veg",
sponsorSouvenir: "Yes",
bookedHotel: "No",
needsTransport: "Yes",
needAssistance: "Yes",
needShuttle: "Yes – Both arrival and departure",
flightNumber: "Air India AI532",
busDetails: "",
arrivalDate: "2026-04-01",
arrivalTime: "18:45",
paymentMethod: "During Participation"
}

];

   const [search, setSearch] = useState("");

  const filteredData = data.filter((item) =>
  item.firstName.toLowerCase().includes(search.toLowerCase()) ||
  item.lastName.toLowerCase().includes(search.toLowerCase())
);

  const rowsPerPage = 2;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentData = filteredData.slice(startIndex, startIndex + rowsPerPage);


  const downloadExcel = () => {

    const exportData = filteredData.map((item) => ({
    "First Name": item.firstName,
    "Last Name": item.lastName,
    Age: item.age,
    Gender: item.gender,
    Address: item.address,
    "Phone Number": item.phone,
    "Email Address": item.email,
    "Parish Name": item.parish,
    "Shirt Size": item.shirt,
    "Dietary Restrictions": item.diet,
    "Sponsor a souvenir page": item.sponsor,
    "Hotel booked": item.hotel,
    "Need airport transport": item.transport,
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Applications");

  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
  });

  const dataFile = new Blob([excelBuffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
  });

  saveAs(dataFile, "Applications.xlsx");
};

 

  return (
    <div className=" min-h-screen p-4 md:p-6">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">

        <div className="flex items-center gap-3">

        <img
            src="/logo.png"
            alt="logo"
            className="w-10 h-10 object-contain"
        />

        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            Applications
        </h1>

        </div>

        <div className="flex items-center gap-3">

          {/* Download Button */}
          <button className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg text-sm font-medium shadow transition"
          onClick={downloadExcel}>
            Download Excel
          </button>

          {/* Search */}
          <div className="flex items-center bg-white border border-gray-300 rounded-lg px-3 py-2 shadow-sm">
            <CiSearch className="text-gray-400 text-xl mr-2" />
            <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) => {
                    setSearch(e.target.value);
                    setCurrentPage(1); // reset pagination when searching
                }}
                className="outline-none text-sm w-32 md:w-40"
                />
          </div>

          {/* Logout */}
          <button className="text-red-500 text-2xl hover:scale-110 transition">
            <IoIosLogOut />
          </button>

        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200">

        <div className="overflow-x-auto">

          <table className="min-w-[1200px] w-full text-sm text-left">

            {/* Header */}
            <thead className="bg-gray-900 text-white uppercase text-xs sticky top-0">
              <tr>
                <th className="px-4 py-3">First Name</th>
                <th className="px-4 py-3">Last Name</th>
                <th className="px-4 py-3">Age</th>
                <th className="px-4 py-3">Gender</th>
                <th className="px-4 py-3">Address</th>
                <th className="px-4 py-3">Phone</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Parish</th>
                <th className="px-4 py-3">Shirt Size</th> 
                <th className="px-4 py-3">Dietary</th>
                <th className="px-4 py-3">Sponsor</th>

                <th className="px-4 py-3">Hotel</th>
                <th className="px-4 py-3">Transport</th>
                <th className="px-4 py-3">Assistance</th>

                <th className="px-4 py-3">Shuttle</th>
                <th className="px-4 py-3">Flight</th>
                <th className="px-4 py-3">Bus</th>
                <th className="px-4 py-3">Arrival Date</th>
                <th className="px-4 py-3">Arrival Time</th>

                <th className="px-4 py-3">Payment</th>

              </tr>
            </thead>

            {/* Body */}
        <tbody className="divide-y">

          {currentData.map((item,index)=>(
          <tr key={index} className="hover:bg-gray-50">

            <td className="px-4 py-3">{item.firstName}</td>
            <td className="px-4 py-3">{item.lastName}</td>
            <td className="px-4 py-3">{item.age}</td>
            <td className="px-4 py-3">{item.gender}</td>
            <td className="px-4 py-3">{item.address}</td>
            <td className="px-4 py-3">{item.phone}</td>
            <td className="px-4 py-3 text-blue-600">{item.email}</td>
            <td className="px-4 py-3">{item.parish}</td>

            <td className="px-4 py-3">{item.shirtSize}</td>
            <td className="px-4 py-3">{item.dietaryRestrictions}</td>
            <td className="px-4 py-3">{item.sponsorSouvenir}</td>

            <td className="px-4 py-3">{item.bookedHotel}</td>
            <td className="px-4 py-3">{item.needsTransport}</td>
            <td className="px-4 py-3">{item.needAssistance}</td>

            <td className="px-4 py-3">{item.needShuttle}</td>
            <td className="px-4 py-3">{item.flightNumber}</td>
            <td className="px-4 py-3">{item.busDetails}</td>
            <td className="px-4 py-3">{item.arrivalDate}</td>
            <td className="px-4 py-3">{item.arrivalTime}</td>

            <td className="px-4 py-3 font-semibold">{item.paymentMethod}</td>

          </tr>
          ))}
          {currentData.length === 0 && (
                <tr>
                    <td colSpan="13" className="text-center py-6 text-gray-500">
                    No results found
                    </td>
                </tr>
          )}

        </tbody>

      </table>



        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between p-4 border-t bg-gray-50">

        <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition
            ${
                currentPage === 1
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-red-500 text-white hover:bg-red-600 shadow"
            }`}
        >
            Previous
        </button>

        <div className="text-sm font-semibold text-gray-700">
            Page <span className="text-red-500">{currentPage}</span> of{" "}
            <span className="text-gray-900">{totalPages}</span>
        </div>

        <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition
            ${
                currentPage === totalPages
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-red-500 text-white hover:bg-red-600 shadow"
            }`}
        >
            Next
        </button>

        </div>

      </div>
    </div>
  );
};

export default Table;