import { useState, useMemo } from "react";
import {
  X,
  TrendingUp,
  FileText,
  Users,
  Activity,
  DollarSign,
  BarChart3,
  Eye,
  Settings,
  Bell,
} from "lucide-react";
import OverviewChart from "../../component/freelancer_dashboard/overview";
import DCard from "../../component/freelancer_dashboard/cards";
import dp from "../../assets/admin.png";
import Table from "../freelancer_gigs/table";
import DonutChartCard from "../../component/freelancer_dashboard/donutChart";
import Widgets from "../../component/freelancer_dashboard/widget";
import { useSelector } from "react-redux";

import {
  useGetAllUsers,
  useGetAllFreelancers,
  useGetAllGigs,
  useGetAllProjects,
} from "../../../api/client/superadmin";
import { useGetAllOrderByAdmin } from "../../../api/client/order";

const SuperAdminDashboard = () => {
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);

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

  // Calculate real data for orders donut chart
  const ordersData = useMemo(() => {
    if (!orders || orders.length === 0) return {};

    const statusCounts = orders.reduce((acc, order) => {
      const status = order.status || "unknown";
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    }, {});

    const currentMonth = new Date().toLocaleString("default", {
      month: "long",
      year: "numeric",
    });

    return {
      [currentMonth]: [
        { name: "Paid", value: statusCounts.paid || 0 },
        { name: "Pending", value: statusCounts.pending || 0 },
        { name: "Canceled", value: statusCounts.canceled || 0 },
        {
          name: "Disputed",
          value:
            orders.filter((order) => order.isDisputed === "true").length || 0,
        },
      ],
    };
  }, [orders]);

  const orderTabs = ["All"]

  // Calculate real data for earnings donut chart
  const earningsData = useMemo(() => {
    if (!orders || orders.length === 0) return {};

    const currentMonth = new Date().toLocaleString("default", {
      month: "long",
      year: "numeric",
    });

    const earnings = orders.reduce(
      (acc, order) => {
        const amount = parseFloat(order.total_price) || 0;

        if (order.status === "paid") {
          acc.active += amount;
        } else if (order.status === "canceled") {
          acc.canceled += amount;
        } else {
          acc.pending += amount;
        }
        return acc;
      },
      { active: 0, canceled: 0, pending: 0 }
    );

    return {
      [currentMonth]: [
        { name: "Active Payments", value: earnings.active },
        { name: "Canceled Payments", value: earnings.canceled },
        { name: "Pending Payments", value: earnings.pending },
      ],
    };
  }, [orders]);

  // Calculate total earnings
  const totalEarnings = useMemo(() => {
    return orders.reduce((total, order) => {
      if (order.status === "paid") {
        return total + (parseFloat(order.total_price) || 0);
      }
      return total;
    }, 0);
  }, [orders]);

  // Calculate this month's earnings
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

  // Calculate average order value
  const averageOrderValue = useMemo(() => {
    const paidOrders = orders.filter((order) => order.status === "paid");
    if (paidOrders.length === 0) return 0;

    const totalValue = paidOrders.reduce(
      (sum, order) => sum + (parseFloat(order.total_price) || 0),
      0
    );
    return totalValue / paidOrders.length;
  }, [orders]);

  // Calculate active freelancers percentage
  const activeFreelancersPercentage = useMemo(() => {
    if (!freelancers || freelancers.length === 0) return "0%";

    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const activeFreelancerIds = new Set(
      orders
        .filter((order) => new Date(order.created_at) >= thirtyDaysAgo)
        .map((order) => order.freelancer_id)
    );

    const activePercentage =
      (activeFreelancerIds.size / freelancers.length) * 100;
    return `${activePercentage.toFixed(1)}%`;
  }, [freelancers, orders]);

  const ordersColors = ["#4e6cff", "#4ecc7d", "#f99247", "#ef4444"];
  const earningsColors = ["#fcd34d", "#3b82f6", "#4ade80"];

  const getStatusColor = (status) =>
    ({
      paid: "bg-green-500",
      completed: "bg-blue-500",
      pending: "bg-yellow-500",
      canceled: "bg-red-500",
      active: "bg-green-500",
    }[status] || "bg-gray-500");

  const userDetails = useSelector((state) => state.user.userDetails);

  // Show loading state
  if (
    usersLoading ||
    freelancersLoading ||
    gigsLoading ||
    projectsLoading ||
    ordersLoading
  ) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-slate-100">
        <div className="text-center space-y-4">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-slate-200 rounded-full animate-spin border-t-blue-500 mx-auto"></div>
            <div className="absolute inset-0 w-12 h-12 border-2 border-slate-100 rounded-full animate-ping m-auto"></div>
          </div>
          <div className="space-y-2">
            <p className="text-slate-700 font-medium">Loading dashboard</p>
            <p className="text-slate-500 text-sm">Fetching your analytics...</p>
          </div>
        </div>
      </div>
    );
  }

  // Show error state
  if (
    usersError ||
    freelancersError ||
    gigsError ||
    projectsError ||
    ordersError
  ) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-200 via-white to-indigo-200/70">
        <div className="text-center space-y-6 max-w-md mx-auto p-8">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto">
            <X className="w-10 h-10 text-red-500" />
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-slate-800">
              Something went wrong
            </h3>
            <p className="text-slate-600">
              We couldn't load your dashboard data. Please try again.
            </p>
          </div>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 font-medium shadow-lg"
          >
            Retry Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-200 via-white to-indigo-200/70">
      {/* Mobile sidebar overlay */}
      {showMobileSidebar && (
        <div
          onClick={() => setShowMobileSidebar(false)}
          className="fixed inset-0 bg-black/30 backdrop-blur-md z-40 lg:hidden"
        />
      )}

      <div className="flex">
        {/* Modern Sidebar */}
        <aside
          className={`${
            showMobileSidebar ? "translate-x-0" : "-translate-x-full"
          } fixed top-0 left-0 w-80 h-screen bg-gradient-to-br from-slate-200 via-white to-indigo-200/70
backdrop-blur-xl border-r border-slate-200/50 p-6 z-50 transition-transform duration-300 ease-out lg:translate-x-0 lg:static lg:block shadow-2xl lg:shadow-none`}
        >
          {/* Close button for mobile */}
          <div className="flex justify-between items-center mb-8 lg:justify-center">
            <div className="lg:hidden" />
            <h2 className="text-xl font-bold bg-gradient-to-r from-[#043A53] via-[#065f73] to-[#3C939D] bg-clip-text text-transparent">
              Admin Panel
            </h2>
            <button
              onClick={() => setShowMobileSidebar(false)}
              className="lg:hidden p-2 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <X className="h-5 w-5 text-slate-500" />
            </button>
          </div>

          {/* Profile Card */}
          <div className="bg-gradient-to-r from-[#043A53] via-[#065f73] to-[#3C939D] rounded-2xl p-6 mb-8 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>

            <div className="relative z-10 flex flex-col items-center text-center space-y-4">
              <div className="relative">
                <img
                  src={dp}
                  alt="Profile"
                  className="w-20 h-20 rounded-full border-4 border-white/20 shadow-xl"
                />
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-400 rounded-full border-2 border-white"></div>
              </div>
              <div>
                <h3 className="text-lg font-bold">
                  {userDetails?.name || "Admin User"}
                </h3>
                <p className="text-blue-100 text-sm">
                  @{userDetails?.username || "admin"}
                </p>
                <div className="mt-2 px-3 py-1 bg-white/20 rounded-full text-xs font-medium">
                  Super Administrator
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Analytics Widget */}
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl border border-slate-200/50 p-6 shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-slate-800">
                Sales Analytics
              </h3>
              <div className="p-2 bg-gradient-to-r from-[#043A53] via-[#065f73] to-[#3C939D] rounded-lg">
                <BarChart3 className="w-4 h-4 text-white" />
              </div>
            </div>

            <div className="space-y-6">
              {[
                {
                  label: "Monthly Revenue",
                  value: `$${thisMonthEarnings.toLocaleString()}`,
                  icon: DollarSign,
                  color: "text-white",
                  bg: "bg-gradient-to-r from-[#043A53] via-[#065f73] to-[#3C939D] text-white ",
                },
                {
                  label: "Total Orders",
                  value: orders.length.toString(),
                  icon: FileText,
                  color: "text-white",
                  bg: "bg-gradient-to-r from-[#043A53] via-[#065f73] to-[#3C939D]",
                },
                {
                  label: "Avg Order Value",
                  value: `$${averageOrderValue.toFixed(2)}`,
                  icon: TrendingUp,
                  color: "text-white",
                  bg: "bg-gradient-to-r from-[#043A53] via-[#065f73] to-[#3C939D]",
                },
                {
                  label: "Active Rate",
                  value: activeFreelancersPercentage,
                  icon: Activity,
                  color: "text-white",
                  bg: "bg-gradient-to-r from-[#043A53] via-[#065f73] to-[#3C939D]  ",
                },
              ].map((item, index) => (
                <div key={index} className="group">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div
                        className={`p-2 ${item.bg} rounded-xl group-hover:scale-110 transition-transform duration-200`}
                      >
                        <item.icon
                          className={`w-4 h-4 bg-gradient-to-r ${item.color} bg-clip-text text-transparent`}
                        />
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 font-medium">
                          {item.label}
                        </p>
                        <p className="text-lg font-bold text-slate-800">
                          {item.value}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 lg:ml-0">
          {/* Modern Header */}
          <div className="sticky top-0 z-30 bg-gradient-to-br from-slate-200 via-white to-indigo-200/70 backdrop-blur-xl border-b border-slate-200/50">
            <div className="px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setShowMobileSidebar(true)}
                    className="lg:hidden p-2 hover:bg-slate-100 rounded-xl transition-colors"
                  >
                    <div className="space-y-1">
                      <div className="w-5 h-0.5 bg-slate-600 rounded-full"></div>
                      <div className="w-3 h-0.5 bg-slate-400 rounded-full"></div>
                      <div className="w-4 h-0.5 bg-slate-500 rounded-full"></div>
                    </div>
                  </button>
                  <div>
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                      Welcome back, {userDetails?.name || "Admin"}
                    </h1>
                    <p className="text-slate-500 text-sm">
                      Here's what's happening with your platform today
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 space-y-8">
            {/* Enhanced Alert */}

            {/* Enhanced Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
              {[
                {
                  title: "Total Users",
                  value: users.length || 0,
                  description: "Registered users",
                  change: "+8.2%",
                  icon: Users,
                  gradient: "from-blue-500 to-cyan-500",
                  bgGradient: "from-blue-50 to-cyan-50",
                  borderGradient: "from-blue-200 to-cyan-200",
                },
                {
                  title: "Total Orders",
                  value: orders.length || 0,
                  description: `${
                    orders.filter((o) => o.status === "paid").length
                  } completed`,
                  change: "+12.5%",
                  icon: FileText,
                  gradient: "from-green-500 to-emerald-500",
                  bgGradient: "from-green-50 to-emerald-50",
                  borderGradient: "from-green-200 to-emerald-200",
                },
                {
                  title: "Active Gigs",
                  value: gigs.length || 0,
                  description: `${freelancers.length} freelancers`,
                  change: "+5.7%",
                  icon: BarChart3,
                  gradient: "from-purple-500 to-pink-500",
                  bgGradient: "from-purple-50 to-pink-50",
                  borderGradient: "from-purple-200 to-pink-200",
                },
                {
                  title: "Revenue",
                  value: `$${Math.round(totalEarnings).toLocaleString()}`,
                  description: "Total earnings",
                  change: "+18.3%",
                  icon: DollarSign,
                  gradient: "from-orange-500 to-red-500",
                  bgGradient: "from-orange-50 to-red-50",
                  borderGradient: "from-orange-200 to-red-200",
                },
              ].map((card, index) => (
                <div
                  key={index}
                  className={`group bg-gradient-to-br ${card.bgGradient}  border-gradient-to-r ${card.borderGradient} rounded-xl p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer relative overflow-hidden`}
                >
                  <div className="absolute top-0 right-0 w-20 h-20 bg-white/30 rounded-full -translate-y-10 translate-x-10 group-hover:scale-150 transition-transform duration-500"></div>

                  <div className="relative space-y-4">
                    <div className="flex items-center justify-between">
                      <div
                        className={`p-3 bg-gradient-to-r ${card.gradient} rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300`}
                      >
                        <card.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="text-right">
                        <div className="text-xs font-semibold text-green-600 bg-green-100 px-2 py-1 rounded-full">
                          {card.change}
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm font-semibold text-slate-600 uppercase tracking-wide">
                        {card.title}
                      </h3>
                      <p className="text-3xl font-bold text-slate-800 mt-1">
                        {card.value}
                      </p>
                      <p className="text-sm text-slate-500 mt-1">
                        {card.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              {/* Overview Charts with enhanced styling */}
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-slate-200/50 p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-bold text-slate-800">
                      Orders Analytics
                    </h3>
                    <p className="text-slate-500 text-sm">
                      Track your order performance
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-gradient-to-r from-[#043A53] via-[#065f73] to-[#3C939D] rounded-full"></div>
                    <span className="text-sm text-slate-600">Live Data</span>
                  </div>
                </div>
                <OverviewChart
                  height={280}
                  data={orders}
                  title=""
                  colorScheme="purple"
                  chartType="area"
                />
              </div>

              <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-slate-200/50 p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-bold text-slate-800">
                      Revenue Trends
                    </h3>
                    <p className="text-slate-500 text-sm">
                      Monitor earnings growth
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-slate-600">Live Data</span>
                  </div>
                </div>
                <OverviewChart
                  height={280}
                  data={orders}
                  title=""
                  colorScheme="green"
                  chartType="line"
                />
              </div>
            </div>

            {/* Bottom Section - Donut Charts + Table */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Orders Status Donut */}

              {/* Earnings Donut */}
              <div className="bg-white/70 flex flex-row backdrop-blur-sm rounded-2xl border border-slate-200/50 shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
                {/* <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-slate-200/50 shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"> */}
                <DonutChartCard
                  title="Orders Status"
                  dataPerMonth={ordersData}
                  totalCount={orders.length}
                  colorList={ordersColors}
                  centerLabelSubtext="Orders"
                  topBg="bg-gradient-to-r from-slate-600 to-slate-700"
                />
                {/* </div> */}
                <DonutChartCard
                  title="Revenue Distribution"
                  dataPerMonth={earningsData}
                  totalCount={Math.round(totalEarnings)}
                  colorList={earningsColors}
                  centerLabelSubtext="USD"
                  topBg="bg-gradient-to-r from-purple-600 to-indigo-600"
                  innerRadius={60}
                />
              </div>

              {/* Recent Orders Table */}
              <div className="bg-white/70 h-[50vh] p-2 py-4 backdrop-blur-sm rounded-2xl border border-slate-200/50 shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">

                  <Table
                    title="All Active Orders"
                    tabs={orderTabs}
                    data={orders} // Show 8 recent orders
                    getStatusColor={getStatusColor}
                  />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
