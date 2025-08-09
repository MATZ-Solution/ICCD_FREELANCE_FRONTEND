import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Bell, Mail, Menu, HelpCircle, X } from "lucide-react";
import { useRef } from "react"; // add this

import { Search as SearchIcon, East as EastIcon } from "@mui/icons-material";
import logo from "../assets/ICCD-01.png";
import "../../src/css/navbar.css";
import dp from "../assets/client_dashboard/clientdp.png";

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


  // close notification dropdown when clicking outside
 useEffect(() => {
    const handleClickOutside = (event) => {
      // Notification dropdown close
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setIsShowNot(false);
      }
      // Profile menu close
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target)
      ) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


  const [isOpen, setIsOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [isShowNot, setIsShowNot] = useState(false);
  const [search, setSearch] = useState("");
  const [messages, setMessages] = useState(5); // Ideally fetched from API

  const userDetails = useSelector((state) => state.user.userDetails);
  const client = userDetails;
  const freelancer = useSelector((state) => state.userProfile.userProfile);

  const logout = useLogout();

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

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
          pathname === path
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
            {
              name: "View Profile",
              action: () => navigate("/freelancer/edit-profile"),
            },
            // { name: "Settings", action: () => navigate("/settings") },
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
        <div
          // onClick={() => navigate("/")}
          className="w-20 h-20 md:w-24 md:h-24 cursor-pointer"
        >
          <img src={logo} alt="logo" className="w-full h-full object-contain" />
        </div>

        {/* Mobile Menu Button */}
        <div className="show_nav_links_mobile">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-black focus:outline-none"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Navigation Tabs for Desktop */}
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
                className="text-black font-semibold hover:text-[#15A9B2] transition"
              >
                {item.name !== "Login" && item.name}
                {!["Contact Us", "Login"].includes(item.name)}
              </Link>
            ))}
          </nav>
        )}

        {/* Right Side Section */}
        {userDetails ? (
          <div className="flex items-center gap-2 relative">
            <div ref={notificationRef} className="relative">
              <NotificationBell
                isShowNot={isShowNot}
                setIsShowNot={setIsShowNot}
              />
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
            {/* <HelpCircle className="h-5 w-5 text-gray-600 cursor-pointer" /> */}
          <div ref={profileMenuRef} className="relative">
              <button
                onClick={() => setShowProfileMenu((prev) => !prev)}
                className="w-10 h-10 rounded-full overflow-hidden border border-gray-300"
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
                renderProfileMenu(
                  pathname.includes("freelancer") ? "freelancer" : "client"
                )}
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

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="show_nav_links_mobile h-[80vh] px-4 pb-4 space-y-2 flex flex-col">
          {/* General navigation only if NOT client/freelancer pages */}
          {!pathname.includes("/client") &&
            !pathname.includes("/freelancer") &&
            navigation.map((item) => (
              <div
                key={item.name}
                className="flex items-center justify-between"
              >
                <button
                  onClick={() => {
                    navigate(item.href);
                    setIsOpen(false);
                  }}
                  className="text-black hover:text-blue-600 transition"
                >
                  {item.name}
                </button>
                {!["Contact Us", "Login"].includes(item.name)}
              </div>
            ))}

          {/* Client Dashboard Nav */}
          {pathname.includes("/client") &&
            navTabsClientDashboard.map((item, idx) => (
              <button
                key={idx}
                onClick={() => {
                  navigate(item.path);
                  setIsOpen(false);
                }}
                className={`text-left px-3 py-2 text-sm font-medium rounded-md ${
                  pathname === item.path
                    ? "text-cyan-500 bg-cyan-50"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                {item.name}
              </button>
            ))}

          {/* Freelancer Dashboard Nav */}
          {pathname.includes("/freelancer") &&
            navTabsFreelancerDashboard.map((item, idx) => (
              <button
                key={idx}
                onClick={() => {
                  navigate(item.path);
                  setIsOpen(false);
                }}
                className={`text-left px-3 py-2 text-sm font-medium rounded-md ${
                  pathname === item.path
                    ? "text-cyan-500 bg-cyan-50"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                {item.name}
              </button>
            ))}

          {/* Go to General Site Button */}
          {(pathname.includes("/client") ||
            pathname.includes("/freelancer")) && (
            <button
              onClick={() => {
                navigate("/");
                setIsOpen(false);
              }}
              className="w-full mt-4 px-4 py-2 bg-[#15A9B2] text-white rounded hover:bg-blue-700 transition"
            >
              Go to General Site
            </button>
          )}

          {/* Show signup button only on general page AND if user NOT logged in */}
          {!pathname.includes("/client") &&
            !pathname.includes("/freelancer") &&
            !userDetails && (
              <button
                onClick={() => {
                  navigate("/signup");
                  setIsOpen(false);
                }}
                className="w-full mt-2 px-4 py-2 bg-[#15A9B2] text-white rounded hover:bg-blue-700 transition"
              >
                Sign Up
              </button>
            )}
        </div>
      )}
    </header>
  );
}
