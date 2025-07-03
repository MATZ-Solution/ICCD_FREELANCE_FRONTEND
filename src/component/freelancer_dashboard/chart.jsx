export default function OverviewChart({ salesData, ordersData, height = 150, width = 400 }) {
  const generateChartPath = (data, height, width) => {
    const points = data.map((value, index) => {
      const x = (index / (data.length - 1)) * width
      const y = height - (value / Math.max(...data)) * (height * 0.7)
      return `${x},${y}`
    })
    return `M ${points.join(" L ")}`
  }

  return (
    <div className="h-48 bg-gray-50 rounded-lg flex items-center justify-center relative overflow-hidden">
      <svg className="w-full h-full absolute inset-0" viewBox={`0 0 ${width} ${height}`}>
        {/* Sales Line */}
        <path
          d={generateChartPath(salesData, height, width)}
          stroke="#8b5cf6"
          strokeWidth="3"
          fill="none"
        />
        <path
          d={`${generateChartPath(salesData, height, width)} L ${width} ${height} L 0 ${height} Z`}
          fill="rgba(139, 92, 246, 0.1)"
        />

        {/* Orders Line */}
        <path
          d={generateChartPath(ordersData, height, width)}
          stroke="#10b981"
          strokeWidth="3"
          fill="none"
        />
        <path
          d={`${generateChartPath(ordersData, height, width)} L ${width} ${height} L 0 ${height} Z`}
          fill="rgba(16, 185, 129, 0.1)"
        />

        {/* Sales Points */}
        {salesData.map((value, index) => {
          const x = (index / (salesData.length - 1)) * width
          const y = height - (value / Math.max(...salesData)) * (height * 0.7)
          return (
            <circle
              key={`sales-${index}`}
              cx={x}
              cy={y}
              r="4"
              fill="#8b5cf6"
              className="hover:r-6 transition-all cursor-pointer"
            />
          )
        })}
      </svg>
    </div>
  )
}