import React, { useState } from "react";
import { memo } from 'react';
import { ArrowRight } from 'lucide-react';

const GigCard = ({
  image,
  title,
  author,
  created_at, // added created_at
  onClick = () => console.log('Card clicked'),
}) => {
  const [isHovered, setIsHovered] = useState(false);

  // Format date nicely
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div 
      onClick={onClick} 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group cursor-pointer w-full h-full flex flex-col bg-white rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-gray-200 hover:-translate-y-2"
    >
      {/* Image Section */}
      <div className="relative overflow-hidden">
        <img 
          src={image} 
          alt="gig preview" 
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110" 
        />
      </div>

      {/* Content Section */}
      <div className="p-5 flex-1 flex flex-col">
        {/* Author Section */}
        <div className="flex items-center gap-3 mb-3">
          <div className="relative">
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-gray-900 text-sm truncate">{author}</p>
            <p className="text-xs text-gray-500">Professional Seller</p>
          </div>
        </div>

        {/* Title */}
        <h3 className="font-bold text-gray-800 text-base leading-tight mb-4 flex-1 group-hover:text-blue-600 transition-colors">
          {title?.length > 60 ? title.slice(0, 60) + '...' : title}
        </h3>

        {/* Created Date Section */}
        <div className="flex items-center justify-between">
          {/* <div className="text-left"> */}
            {/* // <p className="text-xs text-gray-500 mb-1">Created at</p>
            // <p className="font-bold text-gray-900">
            //   {formatDate(created_at)}
            // </p> */}
          {/* </div> */}
          
          <button className={`flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-semibold text-sm transition-all duration-200 hover:from-blue-600 hover:to-blue-700 hover:shadow-lg ${
            isHovered ? 'translate-x-1' : ''
          }`}>
            <span>View Details</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default memo(GigCard);
