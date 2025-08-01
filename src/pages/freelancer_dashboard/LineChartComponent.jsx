import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from 'recharts';

const LineChartComponent = ({ data = [] }) => {
  // Sort by date
  const sortedData = [...data].sort((a, b) =>
    new Date(a.created_at) - new Date(b.created_at)
  );

  // Convert to chart format
  const chartData = sortedData.map(item => ({
    date: new Date(item.created_at).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
    }),
    price: item.base_price,
  }));

  return (
    <div className="w-full h-80 mt-6 bg-white rounded-xl p-4 shadow">
      <h3 className="text-sm font-semibold text-gray-700 mb-4">Earnings Over Time</h3>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line  type="monotone" dataKey="price" stroke="#06b6d4" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineChartComponent;
