import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Custom Prev Arrow using Lucide
const PrevArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 hover:bg-white p-2 rounded-full shadow-md"
  >
    <ChevronLeft className="w-5 h-5 text-gray-800" />
  </button>
);

// Custom Next Arrow using Lucide
const NextArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 hover:bg-white p-2 rounded-full shadow-md"
  >
    <ChevronRight className="w-5 h-5 text-gray-800" />
  </button>
);

const GigCarousel = ({ images }) => {
  if (!images || images.length === 0) return null;

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <div className="relative aspect-video rounded-lg bg-gray-100 overflow-hidden">
      <Slider {...settings}>
        {images.map((url, index) => (
          <div key={index}>
            <img
              src={url}
              alt={`gig ${index}`}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default GigCarousel;
