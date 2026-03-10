import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { IoIosLogOut } from "react-icons/io";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const Table = () => {

  const data = [
    { firstName: "John", lastName: "Mathew", age: 28, gender: "Male", address: "Kochi", phone: "9876543210", email: "john@email.com", parish: "St. Mary's", shirt: "L", diet: "Veg", sponsor: "Yes", hotel: "No", transport: "Yes" },
    { firstName: "Anna", lastName: "Jose", age: 24, gender: "Female", address: "Trivandrum", phone: "9999999999", email: "anna@email.com", parish: "St. George", shirt: "M", diet: "Non Veg", sponsor: "No", hotel: "Yes", transport: "No" },
    { firstName: "Paul", lastName: "Thomas", age: 32, gender: "Male", address: "Kottayam", phone: "8888888888", email: "paul@email.com", parish: "St. Peter", shirt: "XL", diet: "Veg", sponsor: "Yes", hotel: "Yes", transport: "Yes" },
    { firstName: "Mary", lastName: "Joseph", age: 27, gender: "Female", address: "Kochi", phone: "7777777777", email: "mary@email.com", parish: "St. Mary's", shirt: "S", diet: "Veg", sponsor: "No", hotel: "No", transport: "Yes" },
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
                <th className="px-4 py-3 font-semibold tracking-wide">First Name</th>
                <th className="px-4 py-3 font-semibold tracking-wide">Last Name</th>
                <th className="px-4 py-3 font-semibold tracking-wide">Age</th>
                <th className="px-4 py-3 font-semibold tracking-wide">Gender</th>
                <th className="px-4 py-3 font-semibold tracking-wide">Address</th>
                <th className="px-4 py-3 font-semibold tracking-wide">Phone</th>
                <th className="px-4 py-3 font-semibold tracking-wide">Email</th>
                <th className="px-4 py-3 font-semibold tracking-wide">Parish</th>
                <th className="px-4 py-3 font-semibold tracking-wide">Shirt</th>
                <th className="px-4 py-3 font-semibold tracking-wide">Diet</th>
                <th className="px-4 py-3 font-semibold tracking-wide">Sponsor</th>
                <th className="px-4 py-3 font-semibold tracking-wide">Hotel</th>
                <th className="px-4 py-3 font-semibold tracking-wide">Transport</th>
              </tr>
            </thead>

            {/* Body */}
            <tbody className="divide-y">

              {currentData.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50 transition">

                  <td className="px-4 py-3 font-medium text-gray-800">{item.firstName}</td>
                  <td className="px-4 py-3">{item.lastName}</td>
                  <td className="px-4 py-3">{item.age}</td>
                  <td className="px-4 py-3">{item.gender}</td>
                  <td className="px-4 py-3">{item.address}</td>
                  <td className="px-4 py-3">{item.phone}</td>
                  <td className="px-4 py-3 text-blue-600">{item.email}</td>
                  <td className="px-4 py-3">{item.parish}</td>
                  <td className="px-4 py-3">{item.shirt}</td>
                  <td className="px-4 py-3">{item.diet}</td>

                  {/* Status badges */}
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      item.sponsor === "Yes"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-600"
                    }`}>
                      {item.sponsor}
                    </span>
                  </td>

                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      item.hotel === "Yes"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-600"
                    }`}>
                      {item.hotel}
                    </span>
                  </td>

                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      item.transport === "Yes"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-gray-100 text-gray-600"
                    }`}>
                      {item.transport}
                    </span>
                  </td>

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