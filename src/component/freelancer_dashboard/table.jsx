import React, { useState } from 'react';

const Table = ({ title, tabs, data, getStatusColor }) => {
  const [activeTab, setActiveTab] = useState(tabs?.[0] || "All");

  const filteredData =
    activeTab === "All"
      ? data
      : data.filter(item => item.type === activeTab);

  return (
    <div className="bg-[#F8F8F8]  rounded-xl p-4 hover:shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-semibold">{title}</h3>
        <button className="text-xs text-cyan-500 hover:text-cyan-600">
          View All →
        </button>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-1 bg-gray-100 rounded-lg p-1 mb-4">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-2 py-1.5 text-xs font-medium rounded-md ${
              activeTab === tab
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-600 hover:text-gray-900 hover:bg-white"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Data Rows */}
      <div className="space-y-4 max-h-64 overflow-y-auto">
        {filteredData.map(item => (
          <div
            key={item.id}
            className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100"
          >
            <div
              className={`w-2 h-2 rounded-full ${
                getStatusColor ? getStatusColor(item.status) : ""
              }`}
            />
            <div className="w-8 h-8 bg-gray-200 rounded-full" />
            <div className="flex-1">
              <p className="font-medium text-xs">{item.name}</p>
              <p className="text-xs text-gray-500">{item.description}</p>
            </div>
            <div className="text-right">
              <p className="font-semibold text-xs">${item.amount?.toLocaleString()}</p>
              <p className="text-xs text-gray-500">{item.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Table;