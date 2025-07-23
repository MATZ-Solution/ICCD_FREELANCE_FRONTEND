import React, { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const dataSets = {
  Daily: [
    { month: "Mon", value: 300 },
    { month: "Tue", value: 500 },
    { month: "Wed", value: 200 },
    { month: "Thu", value: 400 },
    { month: "Fri", value: 250 },
    { month: "Sat", value: 300 },
    { month: "Sun", value: 350 },
  ],
  Weekly: [
    { month: "Week 01", value: 800 },
    { month: "Week 02", value: 600 },
    { month: "Week 03", value: 900 },
    { month: "Week 04", value: 700 },
    { month: "Week 05", value: 500 },
    { month: "Week 06", value: 650 },
    { month: "Week 07", value: 450 },
    { month: "Week 08", value: 600 },
  ],
  Monthly: [
    { month: "April", value: 1000 },
    { month: "May", value: 800 },
    { month: "June", value: 600 },
    { month: "July", value: 400 },
    { month: "August", value: 700 },
    { month: "September", value: 600 },
    { month: "October", value: 200 },
    { month: "November", value: 600 },
  ],
};

const OverviewChart = ({ colorScheme = "purple"  , height }) => {
  const [period, setPeriod] = useState("Monthly");

  const styles = {
    purple: {
      stroke: "#7e3af2",
      fill: "rgba(126, 58, 242, 0.2)",
    },
    green: {
      stroke: "#2ecc71",
      fill: "rgba(46, 204, 113, 0.2)",
    },
  };
  const selectedStyle = styles[colorScheme] || styles.purple;

  const data = dataSets[period] || [];

  return (
    <div style={{ width: "100%", height: height, position: "relative" }}>
      <div
        style={{
          position: "absolute",
          top: 10,
          right: 10,
          display: "flex",
          gap: "10px",
          zIndex: 10,
        }}
      >
        {["Daily", "Weekly", "Monthly"].map((option) => (
          <button
            key={option}
            onClick={() => setPeriod(option)}
            style={{
              padding: "6px 12px",
              fontSize: "14px",
              cursor: "pointer",
              borderRadius: "5px",
              border:
                period === option
                  ? `2px solid ${selectedStyle.stroke}`
                  : "1px solid #ccc",
              backgroundColor: period === option ? selectedStyle.stroke : "#fff",
              color: period === option ? "#fff" : "#333",
              fontWeight: period === option ? "bold" : "normal",
              transition: "all 0.3s ease",
            }}
          >
            {option}
          </button>
        ))}
      </div>
      <ResponsiveContainer>
        <AreaChart data={data}>
          <XAxis dataKey="month" tick={{ fill: "#666" }} />
          <YAxis
            ticks={[1000, 800, 600, 400, 200]}
            tickFormatter={(value) => `${value}k`}
            tick={{ fill: "#666" }}
          />
          <Tooltip formatter={(value) => `${value}k`} labelStyle={{ color: "#333" }} />
          <Area
            type="monotone"
            dataKey="value"
            stroke={selectedStyle.stroke}
            strokeWidth={6}  // Thicker line here
            fill={selectedStyle.fill}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default OverviewChart;