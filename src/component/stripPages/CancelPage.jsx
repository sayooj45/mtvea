const CancelPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-red-50">
      <div className="bg-white p-8 rounded-xl shadow-lg text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">
          Payment Cancelled ❌
        </h1>
        <p className="text-gray-600">
          Your payment was not completed. You can try again.
        </p>
      </div>
    </div>
  );
};

export default CancelPage;
