import React, { useEffect } from "react";
import { CheckCircle } from "lucide-react";

const SuccessModal = ({ message , onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      if (onClose) onClose();
    }, 2000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-sm text-center animate-fadeIn">
        <div className="flex justify-center mb-4">
          <CheckCircle className="text-green-500 w-12 h-12" />
        </div>
        <h3 className="text-2xl font-bold text-[#1C4C50] mb-2">
          Thank You!
        </h3>
        <p className="text-gray-600 mb-4">{message}</p>
        <button
          onClick={onClose}
          className="mt-2 px-6 py-2 bg-gradient-to-r from-[#44A4AD] to-[#1C4C50] text-white rounded-xl font-semibold hover:opacity-90 transition-all duration-300"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default SuccessModal;
