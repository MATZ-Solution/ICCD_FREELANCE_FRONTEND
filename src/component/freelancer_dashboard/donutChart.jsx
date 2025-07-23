import React, { useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor="middle"
      dominantBaseline="central"
      fontSize={12}
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const DonutChartCard = ({
  title,
  dataPerMonth,
  totalCount,
  colorList,
  centerLabelSize = "text-3xl",
  centerLabelSubtext = "",
  topBg = "bg-indigo-700",
  innerRadius = 50, 
}) => {
  const months = Object.keys(dataPerMonth);
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentMonth = months[currentIndex];
  const data = dataPerMonth[currentMonth];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + months.length) % months.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % months.length);
  };

  return (
    <div className="w-full  p-4 rounded-xl shadow bg-[#F8F8F8]">
      <div className={`text-center ${topBg} text-white py-2 rounded-t-md`}>
        <h2 className="text-md font-semibold">{title}</h2>
      </div>

      <div className="flex justify-between items-center py-2 text-sm px-2">
        <button onClick={handlePrev} className="hover:opacity-70">◀</button>
        <span className="font-medium text-gray-600">{currentMonth}</span>
        <button onClick={handleNext} className="hover:opacity-70">▶</button>
      </div>

      <div className="relative h-52">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={innerRadius} // ✅ used here
              outerRadius={75}
              labelLine={false}
              label={renderCustomizedLabel}
              dataKey="value"
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={colorList[index % colorList.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>

        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <div className={`font-bold text-gray-800 ${centerLabelSize}`}>
            {totalCount}
          </div>
          {centerLabelSubtext && (
            <div className="text-sm text-gray-500">{centerLabelSubtext}</div>
          )}
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-1 px-4 text-sm">
        {data.map((entry, index) => (
          <div key={index} className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span
                className="inline-block w-3 h-3 rounded-full"
                style={{ backgroundColor: colorList[index] }}
              ></span>
              <span>{entry.name}</span>
            </div>
            <span>{entry.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DonutChartCard;