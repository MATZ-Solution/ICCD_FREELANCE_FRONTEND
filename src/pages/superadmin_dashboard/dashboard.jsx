
import { useState } from "react";
import { Bell, Mail, HelpCircle, Star, TrendingUp, FileText, Users, Filter, X, Menu } from "lucide-react";
import OverviewChart from "../../component/freelancer_dashboard/overview";
import DCard from "../../component/freelancer_dashboard/cards";
import dp from "../../assets/admin.png"
import Table from "../freelancer_gigs/table";
import PricingTable from "../../component/pricing_table";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useGetFreelancerProfile } from "../../../api/client/freelancer";
import { useEffect } from "react";
import { getUserProfile } from "../../../redux/slices/userProfileSlice";
import DonutChartCard from "../../component/freelancer_dashboard/donutChart";
import Widgets from "../../component/freelancer_dashboard/widget";



const SuperAdminDashboard = () => {
    const [activeNavTab, setActiveNavTab] = useState("Dashboard");
  const [activeTimeTab, setActiveTimeTab] = useState("1Day");
  const [showVerificationAlert, setShowVerificationAlert] = useState(true);
  const [notifications, setNotifications] = useState(3);
  const [messages, setMessages] = useState(5);
  const [isAvailable, setIsAvailable] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);

  const orders = [
    { id: 1, name: "DONGYONG PENG", type: "Graphics", amount: 20, date: "6 May 2023", status: "active" },
    { id: 2, name: "GUL AHMED TEXTILE", type: "Website", amount: 60000, date: "6 May 2023", status: "completed" },
    { id: 3, name: "SARAH JOHNSON", type: "Graphics", amount: 150, date: "5 May 2023", status: "pending" },
    { id: 4, name: "Mohid Hussain", type: "Web", amount: 400, date: "23 july 2025", status: "completed" },

  ];
    const ordersData = {
    "March 2023": [
      { name: "Pending", value: 60 },
      { name: "Active", value: 20 },
      { name: "Canceled", value: 20 },
    ],
  };

//   const orders = [
//     { id: 1, name: "Property No:1", description: "RUETEX GMBH", type: "Paid", amount: 20, date: "2023-01-05", status: "active" },
//     { id: 2, name: "Property No: 2", description: "RUETEX GMBH", type: "Pending", amount: 60000, date: "2024-01-05", status: "completed" },
//     { id: 3, name: "Property No:3", description: "RUETEX GMBH", type: "Paid", amount: 150, date: "2024-01-05", status: "pending" },
//   ];


  const ordersColors = ["#4e6cff", "#4ecc7d", "#f99247"];

  const earningsData = {
    "March 2023": [
      { name: "Active Payments", value: 60 },
      { name: "Canceled Payments", value: 60 },
      { name: "Pending Payments", value: 20 },
    ],
  };

  const earningsColors = ["#fcd34d", "#3b82f6", "#4ade80"];

  const orderTabs = ["All", "Graphics", "Website"];

  const getStatusColor = (status) => ({
    active: "bg-green-500",
    completed: "bg-blue-500",
    pending: "bg-yellow-500"
  }[status]);



  const toggleAvailability = () => setIsAvailable(prev => !prev);
  const userDetails = useSelector(state => state.user.userDetails)
  console.log("userDetails: ", userDetails)

//   const dispatch = useDispatch()
//   const { data, isSuccess, isPending, isError, isLoading } = useGetFreelancerProfile()

//   useEffect(() => {
//     if (data && data.length > 0) {
//       dispatch(getUserProfile(data[0]));
//     }
//   }, [data]);

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
                <h3 className="capitalize font-semibold text-sm"> Talha Shiekh </h3>
                <p className="text-xs text-gray-500">@sheikh997</p>
              </div>
            </div>
            <button className="w-full mt-4 px-4 py-2 text-sm border border-[#01AEAD] rounded-md hover:bg-gray-50 text-gray-700">
              View Profile
            </button>
          </div>

          <div>
            <Widgets
            heading="Sales Analytics"
            subheading1="Earned This Month"
            price1="$156,00"
            subheading2="Orders Created"
            price2="$69"
            subheading3="Average Selling Price"
            price3="$15"
            subheading4="Positive Rating"
            rating="99%"
        />
          </div>

         


        </aside>
        {/* Main Content */}
        <main className="mt-10 flex-1 ">
          <div className="mb-6">
            <h1 className="capitalize text-2xl font-bold mb-2">Welcome, Talha Shiekh  </h1>
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
            <DCard
              title="Total Earning"
              value="$29,098,00"
              bottomText="58% higher than Last Month "

              percentChange="+8.2%"
              variant="purple"
              icon={<TrendingUp className="w-6 h-6" />}
            />
            <DCard
              title="Total Active Orders"
              value="256"
              bottomText="58% higher than Last Month "

              percentChange="+12.5%"
              variant="green"
              icon={<FileText className="w-6 h-6" />}
            />
            <DCard
              title="Priority Orders"
              value="1098"
              bottomText="58% higher than Last Month"
              percentChange="+5.7%"
              variant="blue"
              icon={<span className="text-2xl">📋</span>}
            />
       
          </div>

          {/* Bottom Section */}
          <div className="grid  grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Overview Chart */}
              {/* Overview Charts */}
        <div className="bg-[#F8F8F8] rounded-2xl p-4">
          <OverviewChart height={300}  period="Monthly" colorScheme="purple" />
        </div>
        <div className="bg-[#F8F8F8] rounded-2xl p-4">
          <OverviewChart height={300} period="Weekly" colorScheme="green" />
        </div>

          </div>

         


             {/* Donut Charts + Table */}
                  <div className="grid grid-cols-1  md:grid-cols-2  lg:grid-cols-3 gap-6 mb-6 items-center">
                    <DonutChartCard
                      title="Orders"
                      dataPerMonth={ordersData}
                      totalCount={45}
                      colorList={ordersColors}
                      centerLabelSubtext="Orders"
                      topBg="bg-[#5C6B9C]"
                    />
            
                    <DonutChartCard
                      title="Earnings"
                      dataPerMonth={earningsData}
                      totalCount={25}
                      colorList={earningsColors}
                      centerLabelSubtext="Orders"
                      topBg="bg-[#6F42C1]"
                      innerRadius={60}
                    />
            
                    <div className="mb-6">
                      <Table
                        title="Recent Orders"
                        tabs={orderTabs}
                        data={orders}
                        getStatusColor={getStatusColor}
                      />
                    </div>
                  </div>
        </main>
      </div>
    </div>
  );

}

export default SuperAdminDashboard