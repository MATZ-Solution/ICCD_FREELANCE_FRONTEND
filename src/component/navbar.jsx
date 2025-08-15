import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Bell, Mail, Menu, X } from "lucide-react";
import { Search as SearchIcon, East as EastIcon } from "@mui/icons-material";
import logo from "../assets/ICCD-01.png";
import "../../src/css/navbar.css";

import useLogout from "../../hooks/useLogout";
import {
  navigation,
  navTabsFreelancerDashboard,
  navTabsClientDashboard,
  navTabsSuperAdminDashboard,
} from "../../constants/navbar_navigation";
import NotificationDropdown from "./NotificationDropdown";
import NotificationBell from "./notificationBell";
import { setUserType } from "../../redux/slices/userType";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const pathname = location.pathname;

  const notificationRef = useRef(null);
  const profileMenuRef = useRef(null);

  const [isOpen, setIsOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [isShowNot, setIsShowNot] = useState(false);
  const [search, setSearch] = useState("");

  const userDetails = useSelector((state) => state.user.userDetails);
  const client = userDetails;
  const freelancer = useSelector((state) => state.userProfile.userProfile);

  const logout = useLogout();

  // Helper to check active state
  const isActive = (path) => pathname === path;

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setIsShowNot(false);
      }
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => (document.body.style.overflow = "");
  }, [isOpen]);

  // Search param update
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      const params = new URLSearchParams(location.search);
      search ? params.set("query", search) : params.delete("query");
      navigate(`${location.pathname}?${params.toString()}`, { replace: true });
    }, 500);
    return () => clearTimeout(delayDebounce);
  }, [search, location.pathname, navigate]);

  const handleSwitchClient = () => {
    const isFreelancerPath = pathname.includes("/freelancer");
    const destination = isFreelancerPath ? "/client" : "/freelancer/dashboard";
    const userType = isFreelancerPath ? "client" : "freelancer";
    const id = isFreelancerPath ? client?.id : freelancer?.id;
    dispatch(setUserType({ id, type: userType }));
    navigate(destination);
    setShowProfileMenu(false);
  };

  const renderNavTabs = (tabs) =>
    tabs.map(({ name, path }, idx) => (
      <button
        key={idx}
        onClick={() => navigate(path)}
        className={`cursor-pointer px-3 py-2 text-sm font-medium rounded-md ${
          isActive(path)
            ? "text-cyan-500 bg-cyan-50"
            : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
        }`}
      >
        {name}
      </button>
    ));

  const renderProfileMenu = (type) => {
    const options =
      type === "freelancer"
        ? [
            { name: "Switch to Client", action: handleSwitchClient },
            { name: "View Profile", action: () => navigate("/freelancer/edit-profile") },
            { name: "Logout", action: logout },
          ]
        : [
            { name: "Switch to Freelancer", action: handleSwitchClient },
            { name: "Dashboard", action: () => navigate("/client/dashboard") },
            { name: "View Profile", action: () => navigate("/client/profile") },
            { name: "Order", action: () => navigate("/client/orders") },
            { name: "Logout", action: logout },
          ];

    return (
      <div className="px-3 border border-gray-300 absolute right-0 mt-2 w-52 bg-white rounded-md shadow-lg py-1 z-50">
        {options.map(({ name, action }, i) => (
          <button
            key={i}
            onClick={action}
            className="text-black block w-full text-left px-4 py-2 text-sm hover:bg-gray-50"
          >
            {name}
          </button>
        ))}
      </div>
    );
  };

  return (
    <header className="bg-white shadow fontFamily-montreal border-b border-b-[#c4c4c4]">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 flex justify-between items-center">
        {/* Logo */}
        <div className="w-20 h-20 md:w-24 md:h-24 cursor-pointer">
          <img src={logo} alt="logo" className="w-full h-full object-contain" />
        </div>

        {/* Mobile Menu Button */}
        <div className="show_nav_links_mobile">
          <button onClick={() => setIsOpen(!isOpen)} className="text-black focus:outline-none">
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Desktop Navigation */}
        {pathname.includes("/freelancer") ? (
          <nav className="ml-10 sm:flex space-x-1 hidden md:flex">
            {renderNavTabs(navTabsFreelancerDashboard)}
          </nav>
        ) : pathname.includes("/client/") ? (
          <nav className="ml-10 sm:flex space-x-1 hidden md:flex">
            {renderNavTabs(navTabsClientDashboard)}
          </nav>
        ) : pathname === "/client" ? (
          <nav className="ml-10 sm:flex space-x-1 gap-4 hidden md:flex">
            <div className="relative">
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="What services are you looking for today"
                className="rounded w-xl h-10 p-3 border border-gray-400"
              />
              <div className="absolute w-10 h-10 top-0 right-0 flex items-center justify-center bg-black">
                <SearchIcon className="text-white" />
              </div>
            </div>
            <button
              onClick={() => navigate(`/freelancer/dashboard`)}
              className="px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-50"
            >
              Switch to freelancer
            </button>
          </nav>
        ) : pathname.includes("/superadmin") ? (
          <nav className="ml-10 sm:flex space-x-1 hidden md:flex">
            {renderNavTabs(navTabsSuperAdminDashboard)}
          </nav>
        ) : (
          <nav className="show_nav_links_desktop space-x-6 items-center hidden md:flex">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-black font-semibold transition ${
                  isActive(item.href)
                    ? "text-cyan-500 border-b-2 border-cyan-500"
                    : "hover:text-[#15A9B2]"
                }`}
              >
                {item.name !== "Login" && item.name}
              </Link>
            ))}
          </nav>
        )}

        {/* Right Side */}
        {userDetails ? (
          <div className="flex items-center gap-2 relative">
            <div ref={notificationRef} className="relative">
              <NotificationBell isShowNot={isShowNot} setIsShowNot={setIsShowNot} />
              {isShowNot && <NotificationDropdown />}
            </div>

            <button
              onClick={() =>
                pathname.includes("client")
                  ? navigate("/client/messages")
                  : navigate("/freelancer/messages")
              }
              className="p-2 hover:bg-gray-100 rounded-md relative"
            >
              <Mail className="h-5 w-5 text-gray-600" />
            </button>

            <div ref={profileMenuRef} className="relative">
              <button
                onClick={() => setShowProfileMenu((prev) => !prev)}
                className="w-10 h-10 rounded-full flex justify-center items-center overflow-hidden border border-gray-300"
              >
                <img
                  src={
                    pathname.includes("freelancer")
                      ? freelancer?.fileUrl
                      : userDetails?.userImg
                  }
                  alt="User Profile"
                  className="w-full h-full object-cover"
                />
              </button>
              {showProfileMenu &&
                renderProfileMenu(pathname.includes("freelancer") ? "freelancer" : "client")}
            </div>
          </div>
        ) : (
          <div className="show_nav_links_desktop flex gap-4">
            <button
              onClick={() => navigate("/login")}
              className="px-4 py-2 text-black font-semibold rounded hover:text-[#15A9B2]"
            >
              Login
            </button>
            <button
              onClick={() => navigate("/login")}
              className="shadow-xl hidden md:flex items-center gap-3 px-4 py-2 bg-[#15A9B2] text-white rounded-full hover:bg-[#05929c] transition font-semibold"
            >
              <p>Get Started Now</p>
              <div className="rounded-full px-2 py-1 bg-[#60cfd6]">
                <EastIcon style={{ fontSize: 20 }} />
              </div>
            </button>
          </div>
        )}
      </div>

      {/* Mobile Menu */}
    {/* Mobile Menu */}
{/* Mobile Menu */}
{isOpen && (
  <div className="show_nav_links_mobile h-[100vh] px-4 py-6 space-y-6 flex flex-col bg-white shadow-2xl z-50 overflow-y-auto">
    
    {/* General Navigation Section */}
    {!pathname.includes("/client") && !pathname.includes("/freelancer") && (
      <div className="space-y-2">
        <h3 className="text-gray-500 uppercase text-xs font-semibold px-2">Menu</h3>
        {navigation.map((item) => (
          <button
            key={item.name}
            onClick={() => {
              navigate(item.href);
              setIsOpen(false);
            }}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 ${
              isActive(item.href)
                ? "bg-cyan-50 text-cyan-600 font-semibold shadow-lg"
                : "bg-gray-50 hover:bg-gray-100 text-gray-800"
            } hover:scale-105`}
          >
            <span>{item.name}</span>
            {/* Optional arrow icon */}
            <EastIcon className="text-gray-400" style={{ fontSize: 18 }} />
          </button>
        ))}
      </div>
    )}

    {/* Dashboard Section */}
    {(pathname.includes("/client") || pathname.includes("/freelancer")) && (
      <div className="space-y-2">
        <h3 className="text-gray-500 uppercase text-xs font-semibold px-2">Dashboard</h3>
        {(pathname.includes("/client") ? navTabsClientDashboard : navTabsFreelancerDashboard).map((item, idx) => (
          <button
            key={idx}
            onClick={() => {
              navigate(item.path);
              setIsOpen(false);
            }}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 ${
              isActive(item.path)
                ? "bg-cyan-50 text-cyan-600 font-semibold shadow-lg"
                : "bg-gray-50 hover:bg-gray-100 text-gray-800"
            } hover:scale-105`}
          >
            <span>{item.name}</span>
            <EastIcon className="text-gray-400" style={{ fontSize: 18 }} />
          </button>
        ))}
      </div>
    )}

    {/* Go to General Site */}
    {(pathname.includes("/client") || pathname.includes("/freelancer")) && (
      <button
        onClick={() => {
          navigate("/");
          setIsOpen(false);
        }}
        className="w-full mt-4 px-4 py-3 bg-gradient-to-r from-cyan-500 to-teal-500 text-white rounded-2xl shadow-xl hover:scale-105 transition-all font-semibold"
      >
        Go to General Site
      </button>
    )}

    {/* Sign Up */}
    {!pathname.includes("/client") &&
      !pathname.includes("/freelancer") &&
      !userDetails && (
        <button
          onClick={() => {
            navigate("/signup");
            setIsOpen(false);
          }}
          className="w-full mt-2 px-4 py-3 bg-gradient-to-r from-cyan-500 to-teal-500 text-white rounded-2xl shadow-xl hover:scale-105 transition-all font-semibold"
        >
          Sign Up
        </button>
      )}
  </div>
)}


    </header>
  );
}
