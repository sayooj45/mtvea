import { useSearchParams } from "react-router-dom";

const SuccessPage = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");

  return (
    <div className="min-h-screen flex items-center justify-center ">
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
          Your payment has been successfully completed. Your registration is
          confirmed.
        </p>

        {/* Session ID (optional but useful) */}
        {sessionId && (
          <p className="text-sm text-gray-500 mb-6">
            Session ID: <span className="font-medium">{sessionId}</span>
          </p>
        )}

        {/* Button */}
        <button
          onClick={() => (window.location.href = "/")}
          className="w-full bg-[#1B2B4B] hover:bg-[#16233c] transition text-white py-3 rounded-lg font-medium"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default SuccessPage;
