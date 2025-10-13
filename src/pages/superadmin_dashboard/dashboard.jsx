import { useState, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  X,
  TrendingUp,
  FileText,
  Users,
  Activity,
  DollarSign,
  BarChart3,
  Menu,
  ChevronLeft,
  ChevronRight,
  Home,
  ShoppingCart,
  Briefcase,
  Settings,
  LogOut,
  AlertCircle,
  UserCheck,
  AlertTriangle,
} from "lucide-react";
import {
  useGetAllUsers,
  useGetAllFreelancers,
  useGetAllGigs,
  useGetAllProjects,
} from "../../../api/client/superadmin";
import { useGetAllOrderByAdmin } from "../../../api/client/order";
import OverviewChart from "../../component/freelancer_dashboard/overview";
const SuperAdminDashboard = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);

  // API Calls
  const {
    data: users = [],
    isLoading: usersLoading,
    isError: usersError,
  } = useGetAllUsers();

  const {
    data: freelancers = [],
    isLoading: freelancersLoading,
    isError: freelancersError,
  } = useGetAllFreelancers();

  const {
    data: gigs = [],
    isLoading: gigsLoading,
    isError: gigsError,
  } = useGetAllGigs();

  const {
    data: projects = [],
    isLoading: projectsLoading,
    isError: projectsError,
  } = useGetAllProjects();

  const {
    data: orders = [],
    isLoading: ordersLoading,
    isError: ordersError,
  } = useGetAllOrderByAdmin();

  // Calculate metrics
  const totalEarnings = useMemo(() => {
    return orders.reduce((total, order) => {
      if (order.status === "paid") {
        return total + (parseFloat(order.total_price) || 0);
      }
      return total;
    }, 0);
  }, [orders]);

  const thisMonthEarnings = useMemo(() => {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    return orders.reduce((total, order) => {
      const orderDate = new Date(order.created_at);
      if (
        orderDate.getMonth() === currentMonth &&
        orderDate.getFullYear() === currentYear &&
        order.status === "paid"
      ) {
        return total + (parseFloat(order.total_price) || 0);
      }
      return total;
    }, 0);
  }, [orders]);

  const averageOrderValue = useMemo(() => {
    const paidOrders = orders.filter((order) => order.status === "paid");
    if (paidOrders.length === 0) return 0;
    const totalValue = paidOrders.reduce(
      (sum, order) => sum + (parseFloat(order.total_price) || 0),
      0
    );
    return totalValue / paidOrders.length;
  }, [orders]);

  const menuItems = [
    { icon: Home, label: "Dashboard", active: true },
    { icon: Users, label: "Users", active: false },
    { icon: ShoppingCart, label: "Orders", active: false },
    { icon: Briefcase, label: "Gigs", active: false },
    { icon: FileText, label: "Projects", active: false },
    { icon: Settings, label: "Settings", active: false },
  ];

  // Loading State
  if (
    usersLoading ||
    freelancersLoading ||
    gigsLoading ||
    projectsLoading ||
    ordersLoading
  ) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center space-y-4">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-gray-200 rounded-full animate-spin border-t-blue-500 mx-auto"></div>
          </div>
          <div className="space-y-2">
            <p className="text-gray-700 font-medium">Loading dashboard</p>
            <p className="text-gray-500 text-sm">Fetching your analytics...</p>
          </div>
        </div>
      </div>
    );
  }

  // Error State
  if (
    usersError ||
    freelancersError ||
    gigsError ||
    projectsError ||
    ordersError
  ) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center space-y-6 max-w-md mx-auto p-8">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto">
            <AlertCircle className="w-10 h-10 text-red-500" />
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-gray-800">
              Something went wrong
            </h3>
            <p className="text-gray-600">
              We couldn't load your dashboard data. Please try again.
            </p>
          </div>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Retry Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Overlay */}
      {showMobileSidebar && (
        <div
          onClick={() => setShowMobileSidebar(false)}
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-screen bg-white border-r border-gray-200 z-50
          transition-all duration-300 ease-in-out
          ${sidebarCollapsed ? "w-20" : "w-64"}
          ${showMobileSidebar ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >
        {/* Sidebar Header */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200">
          {!sidebarCollapsed && (
            <h2 className="text-xl font-bold bg-gradient-to-br from-[#47AAB3] to-[#1E4F52] bg-clip-text text-transparent">
              Admin Panel
            </h2>
          )}
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="hidden lg:flex p-2 hover:bg-gray-100 rounded-lg transition-colors ml-auto"
          >
            {sidebarCollapsed ? (
              <ChevronRight className="w-5 h-5 text-gray-600" />
            ) : (
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            )}
          </button>
          <button
            onClick={() => setShowMobileSidebar(false)}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Profile Section */}
        <div
          className={`p-4 border-b border-gray-200 ${
            sidebarCollapsed ? "px-2" : ""
          }`}
        >
          <div
            className={`flex items-center ${
              sidebarCollapsed ? "justify-center" : "space-x-3"
            }`}
          >
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#47AAB3] to-[#1E4F52] flex items-center justify-center text-white font-bold">
                A
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
            </div>
            {!sidebarCollapsed && (
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-gray-900 truncate">
                  Admin User
                </h3>
                <p className="text-xs text-gray-500 truncate">@admin</p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 p-2 overflow-y-auto">
          <ul className="space-y-1">
            {menuItems.map((item, index) => (
              <li key={index}>
                <button
                  className={`
                    w-full flex items-center px-3 py-2.5 rounded-lg transition-all
                    ${
                      item.active
                        ? "bg-gradient-to-r from-blue-50 to-purple-50 text-blue-600"
                        : "text-gray-600 hover:bg-gray-50"
                    }
                    ${sidebarCollapsed ? "justify-center" : "space-x-3"}
                  `}
                >
                  <item.icon className="w-5 h-5 flex-shrink-0" />
                  {!sidebarCollapsed && (
                    <span className="text-sm font-medium">{item.label}</span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Analytics Widget (only when expanded) */}
        {!sidebarCollapsed && (
          <div className="p-4 border-t border-gray-200">
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-4 space-y-3">
              <h4 className="text-sm font-semibold text-gray-800">
                Quick Stats
              </h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-600">Monthly</span>
                  <span className="font-bold text-gray-900">
                    ${thisMonthEarnings.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-600">Orders</span>
                  <span className="font-bold text-gray-900">
                    {orders.length}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-600">Avg Value</span>
                  <span className="font-bold text-gray-900">
                    ${averageOrderValue.toFixed(0)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Logout Button */}
        <div className="p-4 border-t border-gray-200">
          <button
            className={`
              w-full flex items-center px-3 py-2.5 rounded-lg
              text-red-600 hover:bg-red-50 transition-all
              ${sidebarCollapsed ? "justify-center" : "space-x-3"}
            `}
          >
            <LogOut className="w-5 h-5" />
            {!sidebarCollapsed && (
              <span className="text-sm font-medium">Logout</span>
            )}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main
        className={`transition-all duration-300 ${
          sidebarCollapsed ? "lg:ml-20" : "lg:ml-64"
        }`}
      >
        {/* Header */}
        <header className="h-16 bg-white border-b border-gray-200 sticky top-0 z-30">
          <div className="h-full px-6 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowMobileSidebar(true)}
                className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
              >
                <Menu className="w-6 h-6 text-gray-600" />
              </button>
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  Welcome back, Admin
                </h1>
                <p className="text-sm text-gray-500">
                  Here's what's happening today
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Total Users",
                value: users.length || 0,
                change: "+8.2%",
                icon: Users,
                color: "blue",
                description: "Registered users",
              },
              {
                title: "Total Orders",
                value: orders.length || 0,
                change: "+12.5%",
                icon: ShoppingCart,
                color: "green",
                description: `${
                  orders.filter((o) => o.status === "paid").length
                } completed`,
              },
              {
                title: "Active Gigs",
                value: gigs.length || 0,
                change: "+5.7%",
                icon: Briefcase,
                color: "purple",
                description: `${freelancers.length} freelancers`,
              },
              {
                title: "Revenue",
                value: `${Math.round(totalEarnings).toLocaleString()}`,
                change: "+18.3%",
                icon: DollarSign,
                color: "orange",
                description: "Total earnings",
              },
            ].map((card, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 bg-${card.color}-100 rounded-lg`}>
                    <card.icon className={`w-6 h-6 text-${card.color}-600`} />
                  </div>
                  <span className="text-xs font-semibold text-green-600 bg-green-100 px-2 py-1 rounded-full">
                    {card.change}
                  </span>
                </div>
                <h3 className="text-sm font-medium text-gray-600">
                  {card.title}
                </h3>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {card.value}
                </p>
                <p className="text-xs text-gray-500 mt-1">{card.description}</p>
              </div>
            ))}
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Orders Analytics
              </h3>
              <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                <OverviewChart
                  height={280}
                  data={orders}
                  title=""
                  colorScheme="purple"
                  chartType="area"
                />{" "}
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Revenue Trends
              </h3>
              <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                <OverviewChart
                  height={280}
                  data={orders}
                  title=""
                  colorScheme="green"
                  chartType="line"
                />{" "}
              </div>
            </div>
          </div>

          {/* Recent Orders Table */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-bold text-gray-900">Recent Orders</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Order ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {orders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-900">
                        #{order.id}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            order.status === "paid"
                              ? "bg-green-100 text-green-800"
                              : order.status === "pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        ${order.total_price}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {new Date(order.created_at).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SuperAdminDashboard;
