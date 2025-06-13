
const SomethingWentWrong = () => {
  const handleRetry = () => {
    // Optional: Add your retry or navigation logic
    window.location.reload(); // simple page reload
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full text-center">
     
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Something Went Wrong</h1>
        <p className="text-gray-600 mb-6">
          We're sorry, but something went wrong. Please try again later or refresh the page.
        </p>
        {/* <button
          onClick={handleRetry}
          className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg transition-colors w-full sm:w-auto"
        >
          Try Again
        </button> */}
      </div>
    </div>
  );
};

export default SomethingWentWrong;
