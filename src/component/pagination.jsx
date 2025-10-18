import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}) {
  return (
    <div className="flex items-center justify-center mt-6">
      <div className="flex items-center justify-between bg-[#0E7D84] px-4 py-2 rounded-full shadow-md w-56">
        {/* Prev Button */}
        <button
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          className={`flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300
            ${currentPage === 1
              ? "bg-gray-200 text-black cursor-not-allowed"
              : "bg-white text-black hover:bg-black"
            }`}
        >
          <ChevronLeft size={16} />
        </button>

        {/* Page Info */}
        <span className="text-sm font-medium text-white">
          {currentPage} <span className="text-gray-200">of</span> {totalPages}
        </span>

        {/* Next Button */}
        <button
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className={`flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300 
            ${currentPage === totalPages
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-[#15A9B2] text-white hover:bg-[#129199]"
            }`}
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
