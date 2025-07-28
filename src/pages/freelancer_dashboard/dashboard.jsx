
import { useState } from "react";
import { Bell, Mail, HelpCircle, Star, TrendingUp, FileText, Users, Filter, X, Menu } from "lucide-react";
import OverviewChart from "../../component/freelancer_dashboard/overview";
import DCard from "../../component/freelancer_dashboard/cards";
import logo from "../../assets/ICCD-01.png";
import dp from "../../assets/client_dashboard/clientdp.png"
import Table from "../freelancer_gigs/table";
import PricingTable from "../../component/pricing_table";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useGetFreelancerProfile, useGetFreelDashboardData } from "../../../api/client/freelancer";
import { useEffect } from "react";
import { getUserProfile } from "../../../redux/slices/userProfileSlice";
import { useNavigate } from "react-router-dom";
import { setUserType } from "../../../redux/slices/userType";

export default function FreelancerDashboard() {
  const [activeNavTab, setActiveNavTab] = useState("Dashboard");
  const [activeTimeTab, setActiveTimeTab] = useState("1Day");
  const [showVerificationAlert, setShowVerificationAlert] = useState(true);
  const [notifications, setNotifications] = useState(3);
  const [messages, setMessages] = useState(5);
  const [isAvailable, setIsAvailable] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  const navigate = useNavigate()

  const orders = [
    { id: 1, name: "DONGYONG PENG", type: "Graphics", amount: 20, date: "6 May 2023", status: "active" },
    { id: 2, name: "GUL AHMED TEXTILE", type: "Website", amount: 60000, date: "6 May 2023", status: "completed" },
    { id: 3, name: "SARAH JOHNSON", type: "Graphics", amount: 150, date: "5 May 2023", status: "pending" },
    { id: 4, name: "Mohid Hussain", type: "Web", amount: 400, date: "23 july 2025", status: "completed" },

  ];

  const orderTabs = ["All", "Graphics", "Website"];

  const getStatusColor = (status) => ({
    active: "bg-green-500",
    completed: "bg-blue-500",
    pending: "bg-yellow-500"
  }[status]);
  const chartData = {
    "1Day": { sales: [120, 100, 140, 110, 160, 130, 150], orders: [80, 90, 110, 95, 120, 100, 115] },
    "5Days": { sales: [100, 120, 110, 140, 130, 160, 150], orders: [70, 85, 95, 105, 90, 110, 105] },
    "1Month": { sales: [80, 110, 90, 130, 120, 150, 140], orders: [60, 75, 85, 95, 80, 100, 95] },
    "6Months": { sales: [60, 90, 70, 110, 100, 130, 120], orders: [40, 55, 65, 75, 60, 80, 75] },
    "1Year": { sales: [40, 70, 50, 90, 80, 110, 100], orders: [20, 35, 45, 55, 40, 60, 55] },
    "MAX": { sales: [20, 50, 30, 70, 60, 90, 80], orders: [10, 25, 35, 45, 30, 50, 45] },
  };

  const timeTabs = ["1Day", "5Days", "1Month", "6Months", "1Year", "MAX"];

  const handleNavigation = (tab) => {
    setActiveNavTab(tab);
    setShowMobileSidebar(false);
  };

  const toggleAvailability = () => setIsAvailable(prev => !prev);
  const userDetails = useSelector(state => state.user.userDetails)
  console.log("userDetails: ", userDetails)

  const dispatch = useDispatch()
  const { data, isSuccess, isPending, isError, isLoading } = useGetFreelancerProfile()
  const { data: dashData, isError: dashDataIsErr, isLoading: dashDataIsLoad } = useGetFreelDashboardData()
  console.log("dashData: ", dashData)

  useEffect(() => {
    if (data && data.length > 0) {
      dispatch(getUserProfile(data[0]));
      dispatch(setUserType({ id: data[0]?.id, type: 'freelancer' }))
    }
  }, [data]);

  if (dashDataIsLoad) {
    return <p>Loading...</p>
  }

  return (
    <div className="min-h-screen px-4  sm:px-6  bg-white">
      {/* Header */}

      {showMobileSidebar && (
        <div
          onClick={() => setShowMobileSidebar(false)}
          className="fixed top-0 left-0 w-full h-full bg-black/20 backdrop-blur-sm z-40 cursor-pointer"
        />
      )}
      <div className="flex flex-col sm:flex-row">
        {/* Sidebar */}
        <aside
          className={`${showMobileSidebar ? "block" : "hidden"} fixed top-0 left-0 w-full sm:w-80 h-full bg-[#F8F8F8] lg:bg-white backdrop-blur-3xl p-4 sm:p-6 z-50 transition-all duration-700 lg:static lg:block lg:h-auto `}
        >
          <div className="flex justify-end mb-4 lg:hidden">
            <button onClick={() => setShowMobileSidebar(false)}>
              <X className="h-6 w-6 text-black" />
            </button>
          </div>

          <div className="mb-6 bg-[#F8F8F8] rounded-lg p-4">
            <div className="flex flex-col items-center gap-3">
              <img
                src={dp}
                alt="Profilepic"
                className="w-16 h-16 rounded-full"
              />
              <div className="text-center">
                <h3 className="capitalize font-semibold text-sm">{userDetails.name} </h3>
                <p className="text-xs text-gray-500">{userDetails.email}</p>
              </div>
            </div>
            <button className="w-full mt-4 px-4 py-2 text-sm border border-[#01AEAD] rounded-md hover:bg-gray-50 text-gray-700">
              View Profile
            </button>
          </div>

          <div className="mb-6  bg-[#F8F8F8] rounded-lg p-4 ">
            <h4 className="font-semibold mb-4 text-sm">Level Overview</h4>
            <div className="space-y-3 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-600">My level</span>
                <span className="font-medium">Level 2</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Success score</span>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />)}
                </div>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Rating</span>
                <span className="font-medium">5.0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Response rate</span>
                <span className="font-medium">30 Mins</span>
              </div>
            </div>
            <button className="w-full px-4 border border-[#01AEAD] py-2 text-sm  rounded-md hover:bg-gray-50 text-gray-700 mt-4">View Progress</button>
          </div>

          <div className="mb-6 bg-[#F8F8F8] rounded-lg p-4 ">
            <h4 className="font-semibold mb-2 text-lg ">Availability</h4>
            <p className="text-xs text-gray-600 mb-4">While unavailable, your Gigs are hidden and you will not receive new orders.</p>
            <button
              onClick={toggleAvailability}
              className={`w-full px-4 py-2 text-sm rounded-md font-medium ${isAvailable ? "bg-red-500 hover:bg-red-600  text-white" : "border border-[#01AEAD] hover:bg-green-600 hover:text-white text-gray-700"
                }`}
            >
              {isAvailable ? "Set as Unavailable" : "Set your availability"}
            </button>
            {isAvailable && (
              <div className="mt-2 p-2 bg-green-50 border border-green-200 rounded-md">
                <p className="text-xs text-green-700">✓ You are currently available for new orders</p>
              </div>
            )}
          </div>

          <div className="flex bg-[#F8F8F8] p-4 rounded-xl justify-between">
            <h4 className="font-semibold text-lg">Inbox</h4>
            <button onClick={() => navigate('/messages')} className="text-xs text-cyan-500 hover:text-cyan-600">View All</button>
          </div>

        </aside>
        {/* Main Content */}
        <main className="mt-10 flex-1 ">
          <div className="mb-6">
            <h1 className="capitalize text-2xl font-bold mb-2">Welcome,  {userDetails.name}</h1>
            <p className="text-xs text-gray-600 mb-4">
              Find important messages, tips, and links to helpful resources here.
            </p>

            {showVerificationAlert && (
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 bg-yellow-50 w-full rounded-lg p-4 relative">
                <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                  <span className="text-black text-xs font-bold">!</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold">Verify your information</p>
                  <p className="text-xs text-gray-600">
                    Stay compliant to continue working with EU clients
                  </p>
                </div>
                <div className="flex gap-2 mt-3 sm:mt-0">
                  <button className="px-4 py-2 text-sm bg-gray-800 hover:bg-gray-900 text-white rounded-md">
                    Verify
                  </button>
                  <button
                    onClick={() => setShowVerificationAlert(false)}
                    className="p-1 hover:bg-yellow-100 rounded-full"
                  >
                    <X className="w-4 h-4 text-gray-500" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Stats Cards */}
          <div className="grid sm:grid-cols-2 grid-cols-1 md:grid-cols-2  lg:grid-cols-3 gap-4 mb-6">
            {/* <DCard
              title="Total Earning"
              value="$29,098,00"
              bottomText="58% higher than Last Month "

              percentChange="+8.2%"
              variant="purple"
              icon={<TrendingUp className="w-6 h-6" />}
            /> */}
            {/* <DCard
              title="Total Orders"
              value="256"
              bottomText="58% higher than Last Month "

              percentChange="+12.5%"
              variant="green"
              icon={<FileText className="w-6 h-6" />}
            /> */}
            {/* <DCard
              title="Priority Orders"
              value="1098"
              bottomText="58% higher than Last Month"
              percentChange="+5.7%"
              variant="blue"
              icon={<span className="text-2xl">📋</span>}
            /> */}
            <DCard
              title="Total Gigs Added"
              value={dashData[0]?.totalGigsAdded}
              bottomText="48.7% You earned Last Month "
              variant="teal"
              icon={<span className="text-2xl">💼</span>}
            />
            <DCard
              title="Applied Job"
              value={dashData[0]?.totalAppliedJobs}
              bottomText="You Offered Last Month"
              variant="brown"
              icon={<FileText className="w-6 h-6" />}
            />
            <DCard
              title="Applied Projects"
              value={dashData[0]?.totalAppliedProject}
              bottomText="You earned Last Month"
              variant="indigo"
              icon={<Users className="w-6 h-6" />}
            />
          </div>

          {/* Bottom Section */}
          <div className="grid  grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Overview Chart */}
            <div className="bg-white rounded-xl  p-4 hover:shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-semibold">Overview</h3>
                <button className="text-xs text-cyan-500 hover:text-cyan-600">View All →</button>
              </div>
              <div className="flex flex-wrap gap-1 bg-gray-100 rounded-lg p-1 mb-4">
                {timeTabs.map(period => (
                  <button
                    key={period}
                    onClick={() => setActiveTimeTab(period)}
                    className={`px-2 py-1.5 text-xs font-medium rounded-md ${activeTimeTab === period ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900 hover:bg-white"
                      }`}
                  >
                    {period.replace(/(\d+)([A-Za-z]+)/, "$1 $2")}
                  </button>
                ))}
              </div>
              <button className="flex items-center gap-2 px-3 py-2 text-xs  rounded-md hover:bg-gray-50 mb-4">
                <Filter className="w-4 h-4" /> Filter by Date
              </button>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-purple-500 rounded-full" />
                  <span className="text-xs text-gray-600">Sales</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full" />
                  <span className="text-xs text-gray-600">New Orders</span>
                </div>
              </div>
              <OverviewChart height={200} salesData={chartData[activeTimeTab].sales} ordersData={chartData[activeTimeTab].orders} />
            </div>

            {/* Recent Orders */}
            <Table
              title="Recent Orders"
              tabs={orderTabs}
              data={orders}
              getStatusColor={getStatusColor}
            />
          </div>
        </main>
      </div>
    </div>
  );
}