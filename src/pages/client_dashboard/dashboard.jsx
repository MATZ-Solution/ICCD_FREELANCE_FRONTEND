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

  return (
    <div className="min-h-screen px-4 bg-white">
      {/* Header */}
      <header className="bg-white ml-4 px-4 py-3 sm:px-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <img
              src={logo}
              alt="Logo"
              className="w-16 h-16"
            />
            <button
              className="lg:hidden"
              onClick={() => setShowMobileSidebar(!showMobileSidebar)}
            >
              <Menu className="h-6 w-6 text-gray-600" />
            </button>
            <nav className=" ml-10 sm:flex space-x-1">
              {navTabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => handleNavigation(tab)}
                  className={`px-3 py-2 text-sm font-medium rounded-md ${
                    activeNavTab === tab
                      ? "text-cyan-500 bg-cyan-50"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setNotifications(0)}
              className="p-2 hover:bg-gray-100 rounded-md relative"
            >
              <Bell className="h-5 w-5 text-gray-600" />
              {notifications > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {notifications}
                </span>
              )}
            </button>
            <button
              onClick={() => setMessages(0)}
              className="p-2 hover:bg-gray-100 rounded-md relative"
            >
              <Mail className="h-5 w-5 text-gray-600" />
              {messages > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {messages}
                </span>
              )}
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-md">
              <HelpCircle className="h-5 w-5 text-gray-600" />
            </button>
            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                aria-haspopup="true"
                aria-expanded={showProfileMenu}
                className="w-8 h-8 bg-cover bg-center rounded-full"
                style={{ backgroundImage: `url(${dp})` }}
              />
              {/* Active green dot */}
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></span>

              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                  {["View Profile", "Settings", "Logout"].map((action) => (
                    <button
                      key={action}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      {action}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {showMobileSidebar && (
        <div
          onClick={() => setShowMobileSidebar(false)}
          className="fixed top-0 left-0 w-full h-full bg-black/20 backdrop-blur-sm z-40 cursor-pointer"
        />
      )}

      <div className="flex flex-col sm:flex-row">
        {/* Sidebar */}
        <aside
          className={`${
            showMobileSidebar ? "block" : "hidden"
          } fixed top-0 left-0 w-full sm:w-80 h-full bg-[#F8F8F8] lg:bg-white backdrop-blur-3xl p-4 sm:p-6 z-50 transition-all duration-700 lg:static lg:block lg:h-auto lg:w-auto`}
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
                <h3 className="font-semibold text-sm">Shohaib Nayyar</h3>
                <p className="text-xs text-gray-500">@butt997</p>
              </div>
            </div>
            <button className="w-full mt-4 px-4 py-2 text-sm border border-[#01AEAD] rounded-md hover:bg-gray-50 text-gray-700">
              View Profile
            </button>
          </div>

          <div className="mb-6 bg-[#F8F8F8] rounded-lg p-4">
            <h4 className="font-semibold mb-2 text-lg">Post a project brief</h4>
            <p className="text-xs text-gray-600 mb-4">
              Get tailored offers for your needs.
            </p>
            <button
              onClick={toggleProjectAvailability}
              className={`w-full px-4 py-2 text-sm rounded-md font-medium ${
                projectIsAvailable
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
              onClick={toggleJobAvailability}
              className={`w-full px-4 py-2 text-sm rounded-md font-medium ${
                jobIsAvailable
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
            <h1 className="text-2xl font-bold mb-2">
              Welcome, Shoaib Nayyar
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <DCard
              title="Total Projects"
              value="$50,000"
              subtitle="58% higher than "
              month="Last Month"
              percentChange="58%"
              variant="purple"
              icon={<TrendingUp className="w-6 h-6" />}
            />
            <DCard
              title="Total Jobs"
              value="256"
              subtitle="58% higher than "
              month="Last Month"
              percentChange="58%"
              variant="green"
              icon={<FileText className="w-6 h-6" />}
            />
            <DCard
              title="Priority Orders"
              value="1098"
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
            <GigCard
              image={blog1}
              title="I will create figma UI UX design for website mockup"
              author="Saba Akbar"
              level="Level 2++"
              rating={4.7}
              reviews={187}
              price={2977}
              offersVideoConsultation={true}
            />
            <GigCard
              image={blog1}
              title="I will design, redesign, and develop a responsive wordpress..."
              author="Swapnil Halder"
              level="Level 1++"
              rating={5.0}
              reviews={39}
              price={5953}
              offersVideoConsultation={false}
            />
            <GigCard
              image={blog1}
              title="I will do figma UI UX design for figma website, mobile app..."
              author="Visual Voyage"
              level="Level 1++"
              rating={4.8}
              reviews={30}
              price={2977}
              offersVideoConsultation={false}
            />
            <GigCard
              image={blog1}
              title="I will do responsive wordpress website design and develop..."
              author="Muhammad I"
              level="Level 1++"
              rating={5.0}
              reviews={209}
              price={29810}
              offersVideoConsultation={true}
            />
          </div>
        </main>
      </div>
    </div>
  );
}