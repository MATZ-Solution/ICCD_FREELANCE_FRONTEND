import React, { useState, memo, useCallback } from "react";
import AccountSecurityStep from "../freelancer_profile/form4";
import { useNavigate } from "react-router-dom";

const Table = ({ title, tabs = [], data = [] }) => {
  const navigate = useNavigate();
  // Dynamically return status styles
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "paid":
        return "bg-green-500 text-white font-semibold";
      case "pending":
        return "bg-yellow-300 text-yellow-800";
      case "cancelled":
        return "bg-red-300 text-red-800";
      default:
        return "bg-gray-200 text-gray-700";
    }
  };

  const [activeTab, setActiveTab] = useState(tabs[0] || "All");

  const handleTabClick = useCallback((tab) => {
    setActiveTab(tab);
  }, []);

  const filteredData =
    activeTab === "All" ? data : data.filter((item) => item.type === activeTab);

  return (
    <div className="bg-white px-4 rounded-xl hover:shadow-lg transition-shadow duration-300 ease-in-out w-full mx-auto min-h-[300px]">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-semibold text-gray-800">{title}</h3>
        <button
          onClick={() => navigate("/freelancer/orders")}
          className="cursor-pointer text-xs text-cyan-600 hover:text-cyan-700 transition-colors"
          aria-label="View All Items"
        >
          View All →
        </button>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 bg-gray-100 rounded-lg p-1.5 mb-4">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => handleTabClick(tab)}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-400 ${
              activeTab === tab
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-600 hover:text-gray-900 hover:bg-white"
            }`}
            aria-pressed={activeTab === tab}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Data Rows */}
      <div className="space-y-3 max-h-64 overflow-y-auto pr-1 scroll-smooth">
        {filteredData.length > 0 ? (
          filteredData.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {/* Status Dot */}
              {/* <div
                className={`w-2 h-2 rounded-full shrink-0 ${
                  getStatusColor(item.status).split(' ')[0]
                }`}
                title={item.status}
              /> */}

              {/* Placeholder avatar */}
              <div className="w-8 h-8 bg-gray-300 rounded-full shrink-0">
                <img
                  src={item?.gigsImage?.split(",")[0]}
                  className="rounded-full h-8 w-8 "
                />
              </div>

              {/* Title and Package */}
              <div className="flex-1">
                <p className="text-xs capitalize font-medium text-gray-800 truncate">
                  {item.gigsTitle?.length > 50
                    ? item.gigsTitle.slice(0, 40) + "..."
                    : item.gigsTitle}
                </p>
                <span className="text-[10px] text-gray-500">
                  {new Date(item.created_at).toLocaleString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                    hour: "numeric",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </span>{" "}
              </div>

              {/* Price and Status Badge */}
              <div className="text-right">
                <p className="text-xs flex gap-1 flex-row font-semibold text-gray-800">
                  <span> PKR</span> {item.base_price}
                </p>

                <span
                  className={`inline-block mt-0.5 px-1.5 py-0.5 rounded text-xs font-medium ${getStatusColor(
                    item.status
                  )}`}
                >
                  {item.status}
                </span>
              </div>
            </div>
          ))
        ) : (
          <p className="text-xs text-gray-500 italic text-center py-4">
            No data available.
          </p>
        )}
      </div>
    </div>
  );
};

export default memo(Table);
