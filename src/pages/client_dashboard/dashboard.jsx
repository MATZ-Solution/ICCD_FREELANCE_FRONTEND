import { useState } from "react";
import {
  Bell,
  Mail,
  HelpCircle,
  Star,
  TrendingUp,
  FileText,
  Users,
  Filter,
  X,
  Menu,
} from "lucide-react";
import DCard from "../../component/freelancer_dashboard/cards";
import logo from "../../assets/ICCD-01.png";
import dp from "../../assets/client_dashboard/clientdp.png";
import GigCard from "../../component/client_dashboard/gig_card";
import blog1 from "../../assets/client_dashboard/blog1.png";
import { useGetGigs } from "../../../api/client/gigs";
import { useNavigate } from "react-router-dom";
import useDebounce from "../../../hooks/useDebounce";
import { useSelector } from "react-redux";
import { useGetClientDashboardData } from "../../../api/client/clients";
import { SquarePen } from "lucide-react";
import AboutModal from "../../component/client_dashboard/aboutModal";
import ICCDLoader from "../../component/loader";

export default function ClientDashboard() {
  const [activeNavTab, setActiveNavTab] = useState("Dashboard");
  const [showVerificationAlert, setShowVerificationAlert] = useState(true);
  const [notifications, setNotifications] = useState(3);
  const [messages, setMessages] = useState(5);
  const [projectIsAvailable, setProjectIsAvailable] = useState(false);
  const [jobIsAvailable, setJobIsAvailable] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);


  const navTabs = ["Dashboard", "Orders", "Messages", "Jobs"];

  const handleNavigation = (tab) => {
    setActiveNavTab(tab);
    setShowMobileSidebar(false);
  };

  const toggleProjectAvailability = () =>
    setProjectIsAvailable((prev) => !prev);
  const toggleJobAvailability = () => setJobIsAvailable((prev) => !prev);


  const navigate = useNavigate()
  const { gigs, error, isLoading, isError } = useGetGigs()
  const userDetails = useSelector(state => state.user.userDetails)

  const { data: dashboardData, isSuccess: clientIsSucc, isPending: clientIsPend, isError: clientIsErr, isLoading: clientIsLoad } = useGetClientDashboardData()
  console.log("data: ", dashboardData)


  const [showAboutModal, setShowAboutModal] = useState(false)

 if (isError || error || clientIsErr) {
  console.log("Error details:", error, isError, clientIsErr);
  return <ICCDError message="Failed to load data. Please try again." />;
}

  if(isLoading || clientIsLoad || clientIsPend){
    return <ICCDLoader /> }
  return (
    <div className="min-h-screen px-4 bg-white">
      {/* Header */}

      {showAboutModal && (<AboutModal onClose={()=> setShowAboutModal(false)}/>)} 

      {showMobileSidebar && (
        <div
          onClick={() => setShowMobileSidebar(false)}
          className="fixed top-0 left-0 w-full h-full bg-black/20 backdrop-blur-sm z-40 cursor-pointer"
        />
      )}

      <div className=" flex flex-col sm:flex-row">
        {/* Sidebar */}
        <aside
          className={` ${showMobileSidebar ? "block" : "hidden"
            } fixed top-0 left-0 w-full sm:w-80 h-full bg-[#F8F8F8] lg:bg-white backdrop-blur-3xl p-4 sm:p-6 z-50 transition-all duration-700 lg:static lg:block lg:h-auto lg:w-70`}
        >
          <div className="bg-green-300flex justify-end mb-4 lg:hidden">
            <button onClick={() => setShowMobileSidebar(false)}>
              <X className="h-6 w-6 text-black" />
            </button>
          </div>

          <div className="relative mb-6 bg-[#F8F8F8] rounded-lg p-4">
            <div className="flex flex-col items-center gap-3">
              <img
                src={userDetails?.userImg}
                alt="Profilepic"
                className="w-16 h-16 rounded-full"
              />

              <div className="text-center">
                <h3 className="capitalize font-semibold text-sm">{userDetails.name}</h3>
                <p className="text-xs text-gray-500">{userDetails.email}</p>
              </div>
            </div>
          <div className="mt-2 mb-6 bg-[#F8F8F8] rounded-lg py-2">
            <div className="flex flex-col  gap-3">
              <div className="text-center">
                <h3 className=" capitalize font-semibold text-sm">About</h3>
                <p className="mt-1 text-xs text-gray-500">{userDetails?.about}</p>
              </div>
            </div>
          </div>
            <button className="cursor-pointer w-full mt-3 px-4 py-2 text-sm border border-[#01AEAD] rounded-md hover:bg-green-600 hover:text-white text-gray-700"
            onClick={()=> setShowAboutModal(true)}
            >
              Edit Profile
            </button>
          </div>



          <div className="mb-6 bg-[#F8F8F8] rounded-lg p-4">
            <h4 className="font-semibold mb-2 text-lg">Post a project brief</h4>
            <p className="text-xs text-gray-600 mb-4">
              Get tailored offers for your needs.
            </p>
            <button
              onClick={() => navigate('/client/post-project')}
              className={`cursor-pointer w-full px-4 py-2 text-sm rounded-md font-medium ${projectIsAvailable
                ? "bg-blue-500 hover:bg-blue-300 text-white"
                : "border border-[#01AEAD] hover:bg-green-600 hover:text-white text-gray-700"
                }`}
            >
              {projectIsAvailable ? "Project Posted" : "Post a Project"}
            </button>
            {projectIsAvailable && (
              <div className="mt-2 p-2 bg-green-50 border border-green-200 rounded-md">
                <p className="text-xs text-green-700">
                  ✓ You are currently available for new Projects
                </p>
              </div>
            )}
          </div>

          <div className="mb-6 bg-[#F8F8F8] rounded-lg p-4">
            <h4 className="font-semibold mb-2 text-lg">Post a Job</h4>
            <p className="text-xs text-gray-600 mb-4">
              Stay productive, anywhere you go.
            </p>
            <button
              onClick={() => navigate('/client/post-job')}
              className={`cursor-pointer w-full px-4 py-2 text-sm rounded-md font-medium ${jobIsAvailable
                ? "bg-red-500 hover:bg-blue-300 text-white"
                : "border border-[#01AEAD] hover:bg-green-600 hover:text-white text-gray-700"
                }`}
            >
              {jobIsAvailable ? "Job Posted" : "Post a Job"}
            </button>
            {jobIsAvailable && (
              <div className="mt-2 p-2 bg-green-50 border border-green-200 rounded-md">
                <p className="text-xs text-green-700">
                  ✓ You are currently available for new Jobs
                </p>
              </div>
            )}
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          <div className="mb-6">
            <h1 className="capitalize text-2xl font-bold mb-2">
              Welcome, {userDetails.name}
            </h1>
            <p className="text-xs text-gray-600 mb-4">
              Find important messages, tips, and links to helpful resources
              here.
            </p>

            {showVerificationAlert && (
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 bg-yellow-50 w-full rounded-lg p-4 relative">
                <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                  <span className="text-black text-xs font-bold">!</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold">
                    Verify your information
                  </p>
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
          <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <DCard
              title="Total Posted Projects"
              value={ dashboardData?.length > 0 ? dashboardData[0]?.totalPostedProject : 0}
              subtitle="58% higher than "
              month="Last Month"
              percentChange="58%"
              variant="purple"
              icon={<TrendingUp className="w-6 h-6" />}
            />
            <DCard
              title="Total Posted Jobs"
              value={ dashboardData?.length > 0 ? dashboardData[0]?.totalPostedJob : 0}
              subtitle="58% higher than "
              month="Last Month"
              percentChange="58%"
              variant="green"
              icon={<FileText className="w-6 h-6" />}
            />
            <DCard
              title="Total Orders"
              value={dashboardData?.length>0 ? dashboardData[0]?.totalOrder : 0}
              subtitle="58% higher than "
              month="Last Month"
              percentChange="58%"
              variant="blue"
              icon={<span className="text-2xl">📋</span>}
            />
          </div>

          <h1 className="font-semibold mb-3 text-xl">
            Based on what you might be looking for
          </h1>

          {/* Gig Cards Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6">
            {
              gigs?.map((data, index) => (
                <GigCard
                  key={index}
                  onClick={() => navigate(`/client/gigs/gigs_details/${data?.id}`)}
                  image={data?.fileUrls ? data?.fileUrls.split(',')[0] : ''}
                  title={data.title}
                  author={data.name}
                  level="Level 2++"
                  rating={4.7}
                  reviews={187}
                  price={2977}
                  offersVideoConsultation={true}
                />
              ))
            }
          </div>
        </main>
      </div>
    </div>
  );
}