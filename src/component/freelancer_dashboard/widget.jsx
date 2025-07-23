import React from 'react';

const Widgets = ({
  heading,
  subheading1,
  price1,
  subheading2,
  price2,
  subheading3,
  price3,
  subheading4,
  rating,
  widget,
}) => {
  return (
    <div className="p-2">
      <div className="
        lg:w-[200px] 
        h-[370px] 
        
        border 
        bg-[#F8F8F8] 
        rounded-xl 
        shadow 
        flex 
        flex-col 
        items-center 
        justify-center 
        p-4
      ">
        <h1 className="text-lg font-bold mb-4 text-center">
          {heading}
        </h1>

        <div className="space-y-3 w-full text-center">
          <div className="flex flex-col">
            <h2 className="text-gray-500 text-sm">{subheading1}</h2>
            <h1 className="text-xl font-semibold">{price1}</h1>
          </div>

          <div className="flex flex-col">
            <h2 className="text-gray-500 text-sm">{subheading2}</h2>
            <h1 className="text-xl font-semibold">{price2}</h1>
          </div>

          {widget && (
            <h1 className="text-sm text-[#9F9F9F]">{widget}</h1>
          )}

          <div className="flex flex-col">
            <h2 className="text-gray-500 text-sm">{subheading3}</h2>
            <h1 className="text-xl font-semibold">{price3}</h1>
          </div>

          <div className="flex flex-col">
            <h2 className="text-gray-500 text-sm">{subheading4}</h2>
            <h1 className="text-xl font-semibold">{rating}</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Widgets;