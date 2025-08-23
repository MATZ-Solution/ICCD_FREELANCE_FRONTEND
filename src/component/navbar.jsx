import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Bell, Mail, Menu, X, User, LogOut } from "lucide-react";
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

// Separate components for better organization
const Logo = ({ navigate }) => (
  <div
    className="w-20 h-20 md:w-24 md:h-24 cursor-pointer"
    onClick={() => navigate("/")}
    role="button"
    tabIndex={0}
    onKeyPress={(e) => e.key === 'Enter' && navigate("/")}
    aria-label="Go to homepage"
  >
    <img src={logo} alt="ICCD Logo" className="w-full h-full object-contain" />
  </div>
);

const MobileMenuButton = ({ isOpen, setIsOpen }) => (
  <div className="show_nav_links_mobile">
    <button
      onClick={() => setIsOpen(!isOpen)}
      className="text-black focus:outline-none focus:ring-2 focus:ring-cyan-500 rounded-md p-1"
      aria-label={isOpen ? "Close menu" : "Open menu"}
      aria-expanded={isOpen}
    >
      {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
    </button>
  </div>
);

const SearchBar = ({ search, setSearch }) => (
  <div className="relative">
    <input
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      placeholder="What services are you looking for today"
      className="rounded w-xl h-10 p-3 pr-12 border border-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
      aria-label="Search for services"
    />
    <div className="absolute w-10 h-10 top-0 right-0 flex items-center justify-center bg-black rounded-r">
      <SearchIcon className="text-white" aria-hidden="true" />
    </div>
  </div>
);

const NavTabs = ({ tabs, isActive, navigate }) =>
  tabs.map(({ name, path }, idx) => (
    <button
      key={idx}
      onClick={() => navigate(path)}
      className={`cursor-pointer px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
        isActive(path)
          ? "text-cyan-500 bg-cyan-50"
          : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
      }`}
      aria-current={isActive(path) ? "page" : undefined}
    >
      {name}
    </button>
  ));

const ProfileImage = ({ src, alt }) => (
  <div className="w-10 h-10 rounded-full flex justify-center items-center overflow-hidden border border-black">
    {src ? (
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
      />
    ) : (
      <User aria-hidden="true" />
    )}
  </div>
);

const ProfileMenu = ({ type, options }) => (
  <div 
    className="px-3 border border-gray-300 absolute right-0 mt-2 w-52 bg-white rounded-md shadow-lg py-1 z-50"
    role="menu"
    aria-label="Profile menu"
  >
    {options.map(({ name, action }, i) => (
      <button
        key={i}
        onClick={action}
        className="text-black block w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors duration-200"
        role="menuitem"
      >
        {name}
      </button>
    ))}
  </div>
);

const MobileNavItem = ({ item, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 ${
      isActive
        ? "bg-cyan-50 text-cyan-600 font-semibold shadow-lg"
        : "bg-gray-50 hover:bg-gray-100 text-gray-800"
    } hover:scale-105`}
    aria-current={isActive ? "page" : undefined}
  >
    <span>{item.name || item}</span>
    <EastIcon
      className="text-gray-400"
      style={{ fontSize: 18 }}
      aria-hidden="true"
    />
  </button>
);

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

  // Determine current user type and navigation tabs
  const getCurrentUserType = () => {
    if (pathname.includes("/freelancer")) return "freelancer";
    if (pathname.includes("/client")) return "client";
    if (pathname.includes("/superadmin")) return "super-admin";
    return "guest";
  };

  const getNavigationTabs = () => {
    const userType = getCurrentUserType();
    switch (userType) {
      case "freelancer":
        return navTabsFreelancerDashboard;
      case "client":
        return navTabsClientDashboard;
      case "super-admin":
        return navTabsSuperAdminDashboard;
      default:
        return [];
    }
  };

  const getProfileMenuOptions = (type) => {
    const baseOptions = {
      freelancer: [
        { name: "Switch to Client", action: handleSwitchClient },
        { name: "View Profile", action: () => navigate("/freelancer/edit-profile") },
        { name: "Logout", action: logout },
      ],
      client: [
        { name: "Switch to Freelancer", action: handleSwitchClient },
        { name: "Dashboard", action: () => navigate("/client/dashboard") },
        { name: "View Profile", action: () => navigate("/client/profile") },
        { name: "Order", action: () => navigate("/client/orders") },
        { name: "Logout", action: logout },
      ],
      "super-admin": [
        { name: "Admin Dashboard", action: () => navigate("/admin/dashboard") },
        { name: "Manage Users", action: () => navigate("/admin/users") },
        { name: "Manage Jobs", action: () => navigate("/admin/jobs") },
        { name: "Site Settings", action: () => navigate("/admin/settings") },
        { name: "Logout", action: logout },
      ],
    };
    return baseOptions[type] || [];
  };

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setIsShowNot(false);
      }
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target)
      ) {
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

  // Search param update with debounce
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      const params = new URLSearchParams(location.search);
      search ? params.set("query", search) : params.delete("query");
      navigate(`${location.pathname}?${params.toString()}`, { replace: true });
    }, 500);
    return () => clearTimeout(delayDebounce);
  }, [search, location.pathname, navigate]);

  // Handle escape key to close mobile menu
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        setIsOpen(false);
        setShowProfileMenu(false);
        setIsShowNot(false);
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  const handleSwitchClient = () => {
    const isFreelancerPath = pathname.includes("/freelancer");
    const destination = isFreelancerPath ? "/client" : "/freelancer/dashboard";
    const userType = isFreelancerPath ? "client" : "freelancer";
    const id = isFreelancerPath ? client?.id : freelancer?.id;
    dispatch(setUserType({ id, type: userType }));
    navigate(destination);
    setShowProfileMenu(false);
  };

  const userType = getCurrentUserType();
  const navigationTabs = getNavigationTabs();
  const profileMenuOptions = getProfileMenuOptions(userType);

  const getProfileImageSrc = () => {
    if (pathname.includes("freelancer") && freelancer?.fileUrl) {
      return freelancer.fileUrl;
    }
    if (pathname.includes("client") && userDetails?.userImg) {
      return userDetails.userImg;
    }
    return null;
  };

  return (
    <header
      className="bg-black/1 border border-white/20 rounded-2xl shadow-lg"
      role="banner"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-12 flex justify-between items-center">
        {/* Logo */}
        <Logo navigate={navigate} />

        {/* Mobile Menu Button */}
        <MobileMenuButton isOpen={isOpen} setIsOpen={setIsOpen} />

        {/* Desktop Navigation */}
        <nav className="ml-10 sm:flex space-x-1 hidden md:flex" role="navigation">
          {userType === "freelancer" || userType === "super-admin" ? (
            <NavTabs tabs={navigationTabs} isActive={isActive} navigate={navigate} />
          ) : userType === "client" && pathname !== "/client" ? (
            <NavTabs tabs={navigationTabs} isActive={isActive} navigate={navigate} />
          ) : pathname === "/client" ? (
            <div className="flex space-x-1 gap-4 items-center">
              <SearchBar search={search} setSearch={setSearch} />
              <button
                onClick={() => navigate(`/freelancer/dashboard`)}
                className="px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors duration-200"
              >
                Switch to freelancer
              </button>
            </div>
          ) : (
            <div className="show_nav_links_desktop space-x-6 items-center">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`text-black font-semibold transition-colors duration-200 ${
                    isActive(item.href)
                      ? "text-cyan-500 border-b-2 border-cyan-500"
                      : "hover:text-[#15A9B2]"
                  }`}
                  aria-current={isActive(item.href) ? "page" : undefined}
                >
                  {item.name !== "Login" && item.name}
                </Link>
              ))}
            </div>
          )}
        </nav>

        {/* Right Side Actions */}
        {userDetails ? (
          <div className="flex items-center gap-2 relative">
            {/* Notifications */}
            <div ref={notificationRef} className="relative">
              <NotificationBell
                isShowNot={isShowNot}
                setIsShowNot={setIsShowNot}
              />
              {isShowNot && <NotificationDropdown />}
            </div>

            {/* Messages */}
            <button
              onClick={() =>
                pathname.includes("client")
                  ? navigate("/client/messages")
                  : navigate("/freelancer/messages")
              }
              className="p-2 hover:bg-gray-100 rounded-md relative transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              aria-label="View messages"
            >
              <Mail className="h-5 w-5 text-gray-600" />
            </button>

            {/* Profile Menu */}
            <div ref={profileMenuRef} className="relative">
              <button
                onClick={() => setShowProfileMenu((prev) => !prev)}
                className="focus:outline-none focus:ring-2 focus:ring-cyan-500 rounded-full"
                aria-label="Open profile menu"
                aria-expanded={showProfileMenu}
                aria-haspopup="menu"
              >
                <ProfileImage
                  src={getProfileImageSrc()}
                  alt="User profile"
                />
              </button>
              {showProfileMenu && (
                <ProfileMenu type={userType} options={profileMenuOptions} />
              )}
            </div>
          </div>
        ) : pathname.includes("/superadmin") ? (
          <button
            onClick={logout}
            className="px-4 py-2 text-black font-semibold rounded hover:text-[#15A9B2] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            aria-label="Logout"
          >
            <LogOut />
          </button>
        ) : (
          <div className="show_nav_links_desktop flex gap-4">
            <button
              onClick={() => navigate("/login")}
              className="px-4 py-2 text-black font-semibold rounded hover:text-[#15A9B2] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            >
              Login
            </button>
            <button
              onClick={() => navigate("/signup")}
              className="shadow-xl hidden md:flex items-center gap-3 px-4 py-2 bg-[#15A9B2] text-white rounded-full hover:bg-[#05929c] transition-all duration-200 font-semibold focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
            >
              <span>Get Started Now</span>
              <div className="rounded-full px-2 py-1 bg-[#60cfd6]">
                <EastIcon style={{ fontSize: 20 }} />
              </div>
            </button>
          </div>
        )}
      </div>
      {/* Mobile Menu */}
      {isOpen && (
        <div 
          className="show_nav_links_mobile h-[100vh] px-4 py-6 space-y-6 flex flex-col bg-white shadow-2xl z-50 overflow-y-auto"
          role="dialog"
          aria-label="Mobile navigation menu"
        >
          {/* Navigation Items */}
          {userType === "guest" && (
            <div className="space-y-2">
              <h3 className="text-gray-500 uppercase text-xs font-semibold px-2">
                Menu
              </h3>
              {navigation.map((item) => (
                <MobileNavItem
                  key={item.name}
                  item={item}
                  isActive={isActive(item.href)}
                  onClick={() => {
                    navigate(item.href);
                    setIsOpen(false);
                  }}
                />
              ))}
            </div>
          )}

          {/* Dashboard Navigation */}
          {userType !== "guest" && (
            <div className="space-y-2">
              <h3 className="text-gray-500 uppercase text-xs font-semibold px-2">
                Dashboard
              </h3>
              {navigationTabs.map((item, idx) => (
                <MobileNavItem
                  key={idx}
                  item={item}
                  isActive={isActive(item.path)}
                  onClick={() => {
                    navigate(item.path);
                    setIsOpen(false);
                  }}
                />
              ))}
            </div>
          )}

          {/* Action Buttons */}
          {userType !== "guest" && (
            <button
              onClick={() => {
                navigate("/");
                setIsOpen(false);
              }}
              className="w-full mt-4 px-4 py-3 bg-gradient-to-r from-cyan-500 to-teal-500 text-white rounded-2xl shadow-xl hover:scale-105 transition-all font-semibold focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
            >
              Go to General Site
            </button>
          )}

          {userType === "guest" && !userDetails && (
            <button
              onClick={() => {
                navigate("/signup");
                setIsOpen(false);
              }}
              className="w-full mt-2 px-4 py-3 bg-gradient-to-r from-cyan-500 to-teal-500 text-white rounded-2xl shadow-xl hover:scale-105 transition-all font-semibold focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
            >
              Sign Up
            </button>
          )}
        </div>
      )}
    </header>
  );
}