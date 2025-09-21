import { useState, memo } from "react";
import { ArrowRight } from "lucide-react";

const GigCard = ({ image, title, author, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group cursor-pointer w-full h-full flex flex-col bg-white/90 backdrop-blur-md rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:-translate-y-2"
    >
      {/* Image Section */}
      <div className="relative overflow-hidden">
        <img
          src={image}
          alt="gig preview"
          className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      </div>

      {/* Content Section */}
      <div className="p-5 flex-1 flex flex-col">
        {/* Author Section */}
        <div className="flex items-center gap-3 mb-3">
          <div className="relative w-9 h-9 rounded-full bg-gradient-to-r from-[#44A4AD] via-[#2E7A81] to-[#1C4C50] flex items-center justify-center text-white font-bold shadow-md">
            {author?.[0] || "A"}
            <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white"></div>
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-gray-900 text-sm truncate">
              {author}
            </p>
            <p className="text-xs text-gray-500">Professional Seller</p>
          </div>
        </div>

        {/* Title */}
        <h3 className="font-bold text-gray-800 text-base leading-tight mb-4 flex-1 group-hover:text-[#2E7A81] transition-colors">
          {title?.length > 60 ? title.slice(0, 60) + "..." : title}
        </h3>

        {/* View Button (Teal Gradient) */}
        <button
          className={`flex items-center justify-center gap-2 px-5 py-2.5 text-white rounded-xl font-medium text-sm transition-all duration-200 bg-gradient-to-r from-[#44A4AD] via-[#2E7A81] to-[#1C4C50] hover:opacity-90 hover:shadow-lg ${
            isHovered ? "translate-x-1" : ""
          }`}
        >
          <span>View Details</span>
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default memo(GigCard);
