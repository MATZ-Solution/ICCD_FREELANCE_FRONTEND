import React, { useState, useMemo } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar
} from "recharts";

const OverviewChart = ({ 
  colorScheme = "purple", 
  height = 300,
  data = [], // Real data prop
  title = "Overview",
  valueKey = "value", // Key for the value in data objects
  labelKey = "label", // Key for the label in data objects
  chartType = "area", // area, line, or bar
  showPeriodSelector = true,
  customPeriods = ["Daily", "Weekly", "Monthly"]
}) => {
  const [period, setPeriod] = useState(customPeriods[0]);

  const styles = {
    purple: {
      stroke: "#7e3af2",
      fill: "rgba(126, 58, 242, 0.2)",
    },
    green: {
      stroke: "#2ecc71", 
      fill: "rgba(46, 204, 113, 0.2)",
    },
    blue: {
      stroke: "#3b82f6",
      fill: "rgba(59, 130, 246, 0.2)",
    },
    orange: {
      stroke: "#f97316",
      fill: "rgba(249, 115, 22, 0.2)",
    }
  };
  
  const selectedStyle = styles[colorScheme] || styles.purple;

  // Process real data based on period
  const processedData = useMemo(() => {
    if (!data || data.length === 0) return [];

    // If data is already in the right format, return it
    if (data.every(item => item[labelKey] && item[valueKey] !== undefined)) {
      return data;
    }

    // Group data by period if it's raw order/transaction data
    const now = new Date();
    let groupedData = [];

    switch (period) {
      case "Daily":
        // Last 7 days
        for (let i = 6; i >= 0; i--) {
          const date = new Date(now);
          date.setDate(date.getDate() - i);
          const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
          
          const dayData = data.filter(item => {
            const itemDate = new Date(item.created_at || item.date);
            return itemDate.toDateString() === date.toDateString();
          });

          groupedData.push({
            [labelKey]: dayName,
            [valueKey]: dayData.reduce((sum, item) => sum + (parseFloat(item.total_price || item.amount || item.value || 1)), 0)
          });
        }
        break;

      case "Weekly":
        // Last 8 weeks
        for (let i = 7; i >= 0; i--) {
          const weekStart = new Date(now);
          weekStart.setDate(weekStart.getDate() - (i * 7) - now.getDay());
          const weekEnd = new Date(weekStart);
          weekEnd.setDate(weekStart.getDate() + 6);

          const weekData = data.filter(item => {
            const itemDate = new Date(item.created_at || item.date);
            return itemDate >= weekStart && itemDate <= weekEnd;
          });

          groupedData.push({
            [labelKey]: `Week ${8-i}`,
            [valueKey]: weekData.reduce((sum, item) => sum + (parseFloat(item.total_price || item.amount || item.value || 1)), 0)
          });
        }
        break;

      case "Monthly":
        // Last 8 months
        for (let i = 7; i >= 0; i--) {
          const date = new Date(now);
          date.setMonth(date.getMonth() - i);
          const monthName = date.toLocaleDateString('en-US', { month: 'short' });

          const monthData = data.filter(item => {
            const itemDate = new Date(item.created_at || item.date);
            return itemDate.getMonth() === date.getMonth() && 
                   itemDate.getFullYear() === date.getFullYear();
          });

          groupedData.push({
            [labelKey]: monthName,
            [valueKey]: monthData.reduce((sum, item) => sum + (parseFloat(item.total_price || item.amount || item.value || 1)), 0)
          });
        }
        break;

      default:
        groupedData = data;
    }

    return groupedData;
  }, [data, period, labelKey, valueKey]);

  // Calculate max value for Y-axis
  const maxValue = useMemo(() => {
    if (processedData.length === 0) return 1000;
    const max = Math.max(...processedData.map(item => item[valueKey]));
    return Math.ceil(max / 100) * 100; // Round up to nearest 100
  }, [processedData, valueKey]);

  // Generate Y-axis ticks
  const yTicks = useMemo(() => {
    const tickCount = 5;
    const step = Math.ceil(maxValue / tickCount / 100) * 100;
    return Array.from({ length: tickCount + 1 }, (_, i) => i * step);
  }, [maxValue]);

  // Custom tooltip formatter
  const tooltipFormatter = (value, name) => {
    if (typeof value === 'number') {
      return value >= 1000 ? `${(value / 1000).toFixed(1)}k` : value.toString();
    }
    return value;
  };

  // Custom Y-axis formatter  
  const yAxisFormatter = (value) => {
    if (value >= 1000) {
      return `${(value / 1000).toFixed(0)}k`;
    }
    return value.toString();
  };

  // Render different chart types
  const renderChart = () => {
    const commonProps = {
      data: processedData,
      margin: { top: 10, right: 30, left: 0, bottom: 0 }
    };

    switch (chartType) {
      case "line":
        return (
          <LineChart {...commonProps}>
            <XAxis dataKey={labelKey} tick={{ fill: "#666", fontSize: 12 }} />
            <YAxis 
              ticks={yTicks}
              tickFormatter={yAxisFormatter}
              tick={{ fill: "#666", fontSize: 12 }}
            />
            <Tooltip 
              formatter={(value) => [tooltipFormatter(value), title]}
              labelStyle={{ color: "#333" }}
              contentStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                border: 'none',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
              }}
            />
            <Line
              type="monotone"
              dataKey={valueKey}
              stroke={selectedStyle.stroke}
              strokeWidth={3}
              dot={{ fill: selectedStyle.stroke, strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, fill: selectedStyle.stroke }}
            />
          </LineChart>
        );

      case "bar":
        return (
          <BarChart {...commonProps}>
            <XAxis dataKey={labelKey} tick={{ fill: "#666", fontSize: 12 }} />
            <YAxis 
              ticks={yTicks}
              tickFormatter={yAxisFormatter}
              tick={{ fill: "#666", fontSize: 12 }}
            />
            <Tooltip 
              formatter={(value) => [tooltipFormatter(value), title]}
              labelStyle={{ color: "#333" }}
              contentStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                border: 'none',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
              }}
            />
            <Bar 
              dataKey={valueKey} 
              fill={selectedStyle.stroke}
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        );

      default: // area chart
        return (
          <AreaChart {...commonProps}>
            <XAxis dataKey={labelKey} tick={{ fill: "#666", fontSize: 12 }} />
            <YAxis 
              ticks={yTicks}
              tickFormatter={yAxisFormatter}
              tick={{ fill: "#666", fontSize: 12 }}
            />
            <Tooltip 
              formatter={(value) => [tooltipFormatter(value), title]}
              labelStyle={{ color: "#333" }}
              contentStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                border: 'none',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
              }}
            />
            <Area
              type="monotone"
              dataKey={valueKey}
              stroke={selectedStyle.stroke}
              strokeWidth={3}
              fill={selectedStyle.fill}
            />
          </AreaChart>
        );
    }
  };

  return (
    <div style={{ width: "100%", height: height, position: "relative" }}>
      {/* Period Selector */}
      {showPeriodSelector && (
        <div
          style={{
            position: "absolute",
            top: 10,
            right: 10,
            display: "flex",
            gap: "8px",
            zIndex: 10,
          }}
        >
          {customPeriods.map((option) => (
            <button
              key={option}
              onClick={() => setPeriod(option)}
              style={{
                padding: "6px 12px",
                fontSize: "12px",
                cursor: "pointer",
                borderRadius: "6px",
                border:
                  period === option
                    ? `2px solid ${selectedStyle.stroke}`
                    : "1px solid #e5e7eb",
                backgroundColor: period === option ? selectedStyle.stroke : "#fff",
                color: period === option ? "#fff" : "#374151",
                fontWeight: period === option ? "600" : "normal",
                transition: "all 0.2s ease",
                boxShadow: period === option ? "0 2px 4px rgba(0,0,0,0.1)" : "none"
              }}
            >
              {option}
            </button>
          ))}
        </div>
      )}

      {/* Chart Title */}
      <div style={{ paddingBottom: "10px" }}>
        <h3 style={{ 
          fontSize: "16px", 
          fontWeight: "600", 
          color: "#374151",
          margin: 0
        }}>
          {title}
        </h3>
        <p style={{ 
          fontSize: "12px", 
          color: "#6b7280",
          margin: "2px 0 0 0"
        }}>
          {period} Overview
        </p>
      </div>

      {/* Chart Container */}
      <ResponsiveContainer>
        {processedData.length > 0 ? renderChart() : (
          <div style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            color: "#6b7280"
          }}>
            <div style={{ fontSize: "48px", marginBottom: "16px" }}>📈</div>
            <p style={{ fontSize: "14px", textAlign: "center" }}>
              No data available for {period.toLowerCase()} view
            </p>
          </div>
        )}
      </ResponsiveContainer>
    </div>
  );
};

export default OverviewChart;