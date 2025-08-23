import { Users, ShoppingCart, DollarSign } from "lucide-react";

export default function DCard({
  title = "Default Title",
  value = "0",
  icon = null,
  border = "",
  gradient= ""
  }
) {

  return (

      <div className={`bg-white ${border} rounded-2xl shadow-sm hover:shadow-lg hover:scale-[1.02] transition-all duration-300 p-6 flex items-center justify-between`}>
        {/* Left Section */}
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <h3 className="text-3xl font-bold text-gray-900 tracking-tight">{value}</h3>
        </div>
        {/* Right Icon Bubble */}
        <div className={`p-4 rounded-xl bg-gradient-to-tr ${gradient} text-white shadow-md`}>
         {icon}
        </div>
      </div>
  );
}
