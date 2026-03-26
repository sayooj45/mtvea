import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { IoIosLogOut } from "react-icons/io";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import axios from "axios";

const Table = () => {
  const API_URL = import.meta.env.VITE_API_URL;

  const [data, setData] = useState([]);

  const [search, setSearch] = useState("");

  const filteredData = data.filter(
    (item) =>
      item.firstName.toLowerCase().includes(search.toLowerCase()) ||
      item.lastName.toLowerCase().includes(search.toLowerCase())
  );

  const rowsPerPage = 10;
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
      Phone: item.phone,
      Email: item.email,

      Shuttle: item.needShuttle,

      "Arrival Flight": item.arrivalFlightNumber,
      "Arrival Date": item.arrivalFlightDate
        ? new Date(item.arrivalFlightDate).toLocaleDateString()
        : "",
      "Arrival Time": item.arrivalFlightTime,

      "Departure Flight": item.departureFlightNumber,
      "Departure Date": item.departureFlightDate
        ? new Date(item.departureFlightDate).toLocaleDateString()
        : "",
      "Departure Time": item.departureFlightTime,

      "Bus Details": item.busDetails,
      Hotel: item.bookedHotel,
      Assistance: item.needAssistance,

      "Payment Type": item.paymentType,
      Method: item.paymentMethod,
      Status: item.paymentStatus,

      Created: new Date(item.createdAt).toLocaleString(),
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

  useEffect(() => {
    const fetchParticipants = async () => {
      try {
        const token = localStorage.getItem("token");

        console.log("Token:", token);

        const response = await axios.get(`${API_URL}api/registrations`, {
          headers: {
            Authorization: token,
          },
        });

        console.log(response.data);
        setData(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error.response?.data || error);
      }
    };

    fetchParticipants();
  }, []);

  const getStatusStyles = (status) => {
    switch (status) {
      case "paid":
        return "bg-green-300 text-green-700 border border-green-300  ";
      case "pending":
        return "bg-yellow-100 text-yellow-700 border border-yellow-300 cursor-pointer hover:bg-yellow-200";
      case "failed":
        return "bg-red-100 text-red-700 border border-red-300 hover:bg-red-200";
      default:
        return "bg-gray-100 text-gray-600 border border-gray-300 hover:bg-gray-200";
    }
  };

  const formatStatus = (status) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  return (
    <div className=" min-h-screen p-4 md:p-6 ">
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
          <button
            className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg text-sm font-medium shadow transition"
            onClick={downloadExcel}
          >
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
        <div className="overflow-x-auto overflow-y-auto max-h-[calc(100vh-200px)]">
          <table className="min-w-[1200px] w-full text-sm text-left">
            {/* Header */}
            <thead className="bg-gray-900 text-white uppercase text-xs sticky top-0">
              <tr>
                <th className="px-4 py-3">First Name</th>
                <th className="px-4 py-3">Last Name</th>
                <th className="px-4 py-3">Age</th>
                <th className="px-4 py-3">Gender</th>
                <th className="px-4 py-3">Phone</th>
                <th className="px-4 py-3">Email</th>

                <th className="px-4 py-3">Shuttle</th>

                {/* ARRIVAL */}
                <th className="px-4 py-3">Arrival Flight</th>
                <th className="px-4 py-3">Arrival Date</th>
                <th className="px-4 py-3">Arrival Time</th>

                {/* DEPARTURE */}
                <th className="px-4 py-3">Departure Flight</th>
                <th className="px-4 py-3">Departure Date</th>
                <th className="px-4 py-3">Departure Time</th>

                {/* OTHER */}
                <th className="px-4 py-3">Bus</th>
                <th className="px-4 py-3">Hotel</th>
                <th className="px-4 py-3">Assistance</th>

                {/* PAYMENT */}
                <th className="px-4 py-3">Payment Type</th>
                <th className="px-4 py-3">Method</th>
                <th className="px-4 py-3">Status</th>

                {/* META */}
                <th>Created</th>
              </tr>
            </thead>

            {/* Body */}
            <tbody className="divide-y">
              {currentData.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50 font-medium">
                  <td className="px-4 py-3">{item.firstName}</td>
                  <td className="px-4 py-3">{item.lastName}</td>
                  <td className="px-4 py-3">{item.age}</td>
                  <td className="px-4 py-3">{item.gender}</td>
                  <td className="px-4 py-3">{item.phone}</td>
                  <td className="px-4 py-3 text-blue-600">{item.email}</td>

                  <td className="px-4 py-3">{item.needShuttle}</td>

                  {/* ARRIVAL */}
                  <td className="px-4 py-3">
                    {item.arrivalFlightNumber || "-"}
                  </td>
                  <td className="px-4 py-3">
                    {item.arrivalFlightDate
                      ? new Date(item.arrivalFlightDate).toLocaleDateString()
                      : "-"}
                  </td>
                  <td className="px-4 py-3">{item.arrivalFlightTime || "-"}</td>

                  {/* DEPARTURE */}
                  <td className="px-4 py-3">
                    {item.departureFlightNumber || "-"}
                  </td>
                  <td className="px-4 py-3">
                    {item.departureFlightDate
                      ? new Date(item.departureFlightDate).toLocaleDateString()
                      : "-"}
                  </td>
                  <td className="px-4 py-3">
                    {item.departureFlightTime || "-"}
                  </td>

                  {/* OTHER */}
                  <td className="px-4 py-3">{item.busDetails || "-"}</td>
                  <td className="px-4 py-3">{item.bookedHotel}</td>
                  <td className="px-4 py-3">{item.needAssistance}</td>

                  {/* PAYMENT */}
                  <td className="px-4 py-3">{item.paymentType}</td>
                  <td className="px-4 py-3">{item.paymentMethod}</td>
                  <td className="px-4 py-3">
                    <button
                      className={`px-4 py-1.5 rounded-full text-sm font-medium capitalize tracking-wide transition-all duration-200 ${getStatusStyles(
                        item.paymentStatus
                      )}`}
                    >
                      {formatStatus(item.paymentStatus)}
                    </button>
                  </td>

                  {/* META */}
                  <td className="px-4 py-3">
                    {new Date(item.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))}

              {currentData.length === 0 && (
                <tr>
                  <td colSpan="20" className="text-center py-6 text-gray-500">
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
