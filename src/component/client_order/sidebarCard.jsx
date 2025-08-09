import React, { memo, useState } from "react";
import OrderOptions from "./OrderOptions";

const SidebarCard = ({
  price,
  description,
  deliverytime,
  Revisions,
  title,
  type,
  packagesJson // this is the string from DB e.g. {"concepts":"2","react_web_app":false,...}
}) => {
  const [showOrderOptions, setShowOrderOptions] = useState(false);

  // Parse the JSON from DB into a usable object
  let parsedFeatures = {};
  try {
    parsedFeatures = JSON.parse(packagesJson || "{}");
  } catch (err) {
    console.error("Invalid package JSON:", err);
  }

  return (
    <div className="p-4 sm:p-6 bg-white rounded-lg shadow-md">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
        <p className="text-lg capitalize font-semibold">{type}</p>
        <h3 className="font-semibold text-xl text-gray-900">PKR {price}</h3>
      </div>

      {/* Title & Description */}
      <p className="text-lg capitalize font-semibold">{title}</p>
      <p className="text-sm capitalize text-gray-700 mt-4 mb-6">{description}</p>

      {/* Delivery & Revisions */}
      <div className="flex flex-col sm:flex-row sm:space-x-6 space-y-2 sm:space-y-0 mb-4">
        <div className="flex items-center space-x-2">
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-sm text-gray-700">{deliverytime} day delivery</span>
        </div>
        <div className="flex items-center space-x-2">
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          <span className="text-sm text-gray-700">{Revisions} Revisions</span>
        </div>
      </div>

      {/* Dynamic Features from DB */}
      <div className="space-y-2 mb-6">
        {Object.entries(parsedFeatures).map(([key, value], index) => (
          <FeatureItem
            key={index}
            label={formatLabel(key, value)}
            available={value === true || value === "1"}
          />
        ))}
      </div>

      <OrderOptions isOpen={showOrderOptions} onClose={() => setShowOrderOptions(false)} />
    </div>
  );
};

// Format key names for display
const formatLabel = (key, value) => {
  // Replace underscores with spaces & capitalize words
  let label = key.replace(/_/g, " ");
  label = label.charAt(0).toUpperCase() + label.slice(1);

  // If it's a numeric field like concepts, show the number
  if (!isNaN(value) && value !== true && value !== false) {
    label = `${value} ${label}`;
  }

  return label;
};

const FeatureItem = ({ label, available }) => (
  <div className="flex items-center space-x-2">
    <div className={`w-4 h-4 rounded-full flex items-center justify-center ${available ? "bg-black" : "bg-gray-300"}`}>
      {available ? (
        <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 8 8">
          <path d="M6.564.75l-3.59 3.612-1.538-1.55L0 4.26l2.974 2.99L8 2.193z" />
        </svg>
      ) : (
        <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 8 8">
          <path d="M1 1l6 6M1 7l6-6" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      )}
    </div>
    <span className="text-sm text-gray-700">{label}</span>
  </div>
);

export default memo(SidebarCard);
