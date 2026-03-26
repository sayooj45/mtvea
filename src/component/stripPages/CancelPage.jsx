const CancelPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className="bg-white p-8 rounded-2xl text-center max-w-md w-full shadow-2xl animate-fade-in">
        {/* Icon */}
        <div className="w-16 h-16 mx-auto flex items-center justify-center rounded-full bg-red-100 text-red-600 text-3xl mb-4">
          ✖
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-[#1B2B4B] mb-2">
          Payment Cancelled
        </h2>

        {/* Message */}
        <p className="text-gray-600 mb-6">
          Your payment was not completed. You can try again.
        </p>

        {/* Button */}
        <button
          onClick={() => (window.location.href = "/")}
          className="w-full bg-[#1B2B4B] hover:bg-[#16233c] transition text-white py-3 rounded-lg font-medium"
        >
          Try Again
        </button>
      </div>
    </div>
  );
};

export default CancelPage;
