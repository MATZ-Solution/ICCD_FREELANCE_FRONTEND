import { Users, ShoppingCart, DollarSign } from "lucide-react";

export default function DCard({
  title = "Default Title",
  value = "0",
  change = "+0%", // Example of statistic change
  icon = null,
  gradient = "from-indigo-400 via-purple-400 to-pink-400",
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl p-6 flex flex-col justify-between
      bg-gradient-to-r from-[#3a6d85] via-[#065f73] to-[#3C939D] shadow-md hover:shadow-xl transition-transform duration-300 hover:scale-[1.03]`}
    >
      {/* Left Section */}
      <div className="flex items-center   justify-between">
        <div>
          <p className="text-sm  mb-4 font-medium text-white">{title}</p>
          <h3 className="text-3xl font-bold text-white tracking-tight">{value}</h3>
          {/* {change && (
            <span
              className={`text-sm font-medium mt-1 ${
                change.includes("+") ? "text-green-500" : "text-red-500"
              }`}
            >
              {change}
            </span>
          )} */}
        </div>

        {/* Right Icon Bubble */}
        <div
          className={`p-4 rounded-xl bg-gradient-to-tr ${gradient} text-white 
          shadow-md transition-all duration-300`}
        >
          {icon}
        </div>
      </div>

      {/* Static Glowing Ball */}
      <div className="absolute top-10 right-10 w-24 h-24 bg-gradient-to-tr from-purple-300 to-pink-300 rounded-full opacity-20 pointer-events-none" />

      {/* Subtle Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-transparent opacity-20 pointer-events-none rounded-2xl" />
    </div>
  );
}
