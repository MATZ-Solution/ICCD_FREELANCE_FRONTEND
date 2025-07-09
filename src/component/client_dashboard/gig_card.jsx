import React, { useState } from "react";
import FavoriteIcon from '@mui/icons-material/Favorite';

const GigCard = ({
  image,
  title,
  author,
  level,
  rating,
  reviews,
  price,
  offersVideoConsultation,
  onClick
}) => {
  const [liked, setLiked] = useState(false);

  return (
    <div onClick={onClick} className="w-full h-full flex flex-col bg-white rounded-xl shadow-sm overflow-hidden  hover:shadow-lg transition relative">
      {/* Image with heart overlay */}
      <div className="relative">
        <img src={image} alt={title} className="w-full h-36 object-cover" />
        <button
          onClick={() => setLiked(!liked)}
          className="absolute top-2 right-2 p-1 rounded-ful  "
        >
          <FavoriteIcon
            size={24}
            className={liked ? "text-red-500 fill-red-500" : "text-white fill-gray-500  "}
          />
        </button>
      </div>

      <div className="p-4">
        <h3 className="text-sm text-gray-700 mb-1">{title}</h3>
        <p className="text-xs text-gray-500 mb-1">
          <span className="font-semibold">{author}</span> • {level}
        </p>
        {/* <p className="text-xs text-yellow-500 font-medium mb-1">
          ⭐ {rating} <span className="text-gray-400">({reviews})</span>
        </p>
        <p className="text-sm font-semibold mb-1">
          From PKR {price.toLocaleString()}
        </p> */}
        {/* {offersVideoConsultation && (
          <p className="text-[10px] text-green-600">
            🎥 Offers video consultations
          </p>
        )} */}
      </div>
    </div>
  );
};

export default GigCard;