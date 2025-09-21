import React from "react";
import { useFreelancerAverageRating } from "../../api/client/review";
// import ICCDLoader from "../../component/loader";

export default function StarRating({ freelancerId }) {
  const { averageRating, totalReviews, isLoading } = useFreelancerAverageRating(freelancerId);

//   if (isLoading) return <ICCDLoader />;

  const ratingValue = Number(averageRating) ;

  return (
    <div className="flex  items-center gap-1">
      {Array.from({ length: 5 }).map((_, starIndex) => (
        <svg
          key={starIndex}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill={starIndex < ratingValue ? "gold" : "lightgray"}
          className="w-4 h-4"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.2 3.674a1 1 0 00.95.69h3.862c.969 0 1.371 1.24.588 1.81l-3.125 2.27a1 1 0 00-.364 1.118l1.2 3.674c.3.921-.755 1.688-1.54 1.118L10 13.347l-3.125 2.27c-.785.57-1.84-.197-1.54-1.118l1.2-3.674a1 1 0 00-.364-1.118L3.046 9.101c-.783-.57-.38-1.81.588-1.81h3.862a1 1 0 00.95-.69l1.2-3.674z" />
        </svg>
      ))}
      <span className="text-xs text-gray-600 ml-2">
        {ratingValue.toFixed(1)} ({totalReviews})
      </span>
   
      
    </div>
  );
}
