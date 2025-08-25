import { RefreshCw } from "lucide-react";
import React from "react";

const DataError = ({ onclickfunction, tag }) => {
  return (
    <div>
      {" "}
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto">
          <div className="bg-gradient-to-r from-red-100 to-red-50 rounded-2xl p-6 mx-auto w-24 h-24 flex items-center justify-center mb-6 shadow-lg">
            <RefreshCw className="w-10 h-10 text-red-500" />
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-3">
            Failed to load {tag}
          </h3>
          <p className="text-slate-600 mb-6 leading-relaxed">
            There was an error loading the freelancer data. Please try again.
          </p>
          <button
            onClick={onclickfunction}
            className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            Try Again
          </button>
        </div>
      </div>
    </div>
  );
};

export default DataError;
