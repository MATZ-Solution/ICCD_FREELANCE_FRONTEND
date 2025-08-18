import { Users, ShoppingCart, DollarSign } from "lucide-react";

export default function TestingComponents() {
  const stats = [
    { 
      title: "Users", 
      value: "1,250", 
      icon: Users, 
      change: "+12%", 
      border: "border-l-6 border-indigo-500",
      gradient: "from-indigo-500 to-purple-500"
    },
    { 
      title: "Sales", 
      value: "340", 
      icon: ShoppingCart, 
      change: "+8%", 
      border: "border-l-6 border-green-500",
      gradient: "from-green-500 to-emerald-500"
    },
    { 
      title: "Revenue", 
      value: "$12,450", 
      icon: DollarSign, 
      change: "+5%", 
      border: "border-l-6 border-amber-500",
      gradient: "from-amber-500 to-orange-500"
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
      {stats.map((stat, i) => (
        <div 
          key={i}
          className={`bg-white ${stat.border} rounded-2xl shadow-sm hover:shadow-lg hover:scale-[1.02] transition-all duration-300 p-6 flex items-center justify-between`}
        >
          {/* Left Section */}
          <div>
            <p className="text-sm font-medium text-gray-500">{stat.title}</p>
            <h3 className="text-3xl font-bold text-gray-900 tracking-tight">{stat.value}</h3>
            <p className="text-xs text-green-600 font-semibold mt-2">{stat.change} from last month</p>
          </div>
          
          {/* Right Icon Bubble */}
          <div className={`p-4 rounded-xl bg-gradient-to-tr ${stat.gradient} text-white shadow-md`}>
            <stat.icon className="w-6 h-6" />
          </div>
        </div>
      ))}
    </div>
  );
}
