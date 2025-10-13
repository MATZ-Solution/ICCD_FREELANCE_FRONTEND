import { useState } from "react";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Home,
  ShoppingCart,
  Briefcase,
  Settings,
  LogOut,
  Users,
  FileText,
} from "lucide-react";

const AdminSidebar = ({ 
  collapsed, 
  onToggleCollapse, 
  showMobile, 
  onCloseMobile,
  activeItem = "Dashboard",
  onMenuItemClick,
  quickStats = null 
}) => {
  const menuItems = [
    { icon: Home, label: "Dashboard", path: "/admin/dashboard" },
    { icon: Users, label: "Users", path: "superadmin/manage-users" },
    { icon: ShoppingCart, label: "Freelancers", path: "/superadmin/Active-freelancers" },
    { icon: Briefcase, label: "Gigs", path: "/superadmin/manage-gigs" },
    { icon: FileText, label: "Projects", path: "/superadmin/manage-projects" },
    { icon: Settings, label: "Dispute", path: "/superadmin/manage-disputes" },
  ];

  const handleMenuClick = (item) => {
    if (onMenuItemClick) {
      onMenuItemClick(item);
    }
    if (onCloseMobile) {
      onCloseMobile();
    }
  };

  return (
    <aside
      className={`
        fixed top-0 left-0 h-screen bg-white border-r border-gray-200 z-50
        transition-all duration-300 ease-in-out
        ${collapsed ? "w-20" : "w-64"}
        ${showMobile ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0
      `}
    >
      {/* Sidebar Header */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200">
        {!collapsed && (
          <h2 className="text-xl font-bold bg-gradient-to-br from-[#47AAB3] to-[#1E4F52] bg-clip-text text-transparent">
            Admin Panel
          </h2>
        )}
        <button
          onClick={onToggleCollapse}
          className="hidden lg:flex p-2 hover:bg-gray-100 rounded-lg transition-colors ml-auto"
        >
          {collapsed ? (
            <ChevronRight className="w-5 h-5 text-gray-600" />
          ) : (
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          )}
        </button>
        <button
          onClick={onCloseMobile}
          className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      {/* Profile Section */}
      <div
        className={`p-4 border-b border-gray-200 ${
          collapsed ? "px-2" : ""
        }`}
      >
        <div
          className={`flex items-center ${
            collapsed ? "justify-center" : "space-x-3"
          }`}
        >
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#47AAB3] to-[#1E4F52] flex items-center justify-center text-white font-bold">
              A
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
          </div>
          {!collapsed && (
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
                onClick={() => handleMenuClick(item)}
                className={`
                  w-full flex items-center px-3 py-2.5 rounded-lg transition-all
                  ${
                    activeItem === item.label
                      ? "bg-gradient-to-r from-blue-50 to-purple-50 text-blue-600"
                      : "text-gray-600 hover:bg-gray-50"
                  }
                  ${collapsed ? "justify-center" : "space-x-3"}
                `}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                {!collapsed && (
                  <span className="text-sm font-medium">{item.label}</span>
                )}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Quick Stats Widget */}
      {!collapsed && quickStats && (
        <div className="p-4 border-t border-gray-200">
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-4 space-y-3">
            <h4 className="text-sm font-semibold text-gray-800">
              Quick Stats
            </h4>
            <div className="space-y-2">
              {quickStats.map((stat, index) => (
                <div key={index} className="flex items-center justify-between text-xs">
                  <span className="text-gray-600">{stat.label}</span>
                  <span className="font-bold text-gray-900">{stat.value}</span>
                </div>
              ))}
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
            ${collapsed ? "justify-center" : "space-x-3"}
          `}
        >
          <LogOut className="w-5 h-5" />
          {!collapsed && (
            <span className="text-sm font-medium">Logout</span>
          )}
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;