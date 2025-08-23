import { useState, memo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Search, Users, Eye, Calendar, Mail, User } from "lucide-react";

import { useGetAllUsers } from "../../../api/client/superadmin";

function ManageUsers() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const { data, isLoading, isError, } = useGetAllUsers({ search });
  // Mock implementation - replace with your actual hook


  const handleView = (id) => {
    navigate(`/superadmin/user/${id}`);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-xl mb-2">⚠️</div>
          <p className="text-gray-600">Failed to fetch users</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
              {/* Title with icon */}
              <div className="flex items-center gap-3">
                <div className="p-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">
                    User Management
                  </h1>
                  <p className="text-slate-600 mt-1">Manage and view all system users</p>
                </div>
              </div>

              {/* Search Bar */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="block w-full sm:w-80 pl-12 pr-4 py-3 border border-slate-300 rounded-xl 
                           bg-white placeholder-slate-400 focus:outline-none focus:ring-2 
                           focus:ring-blue-500 focus:border-transparent transition-all duration-200
                           shadow-sm hover:shadow-md"
                  placeholder="Search users by name or email..."
                />
              </div>
            </div>

            {/* Stats Bar */}
            <div className="mt-6 pt-6 border-t border-slate-200">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-600">
                  {data?.length > 0 ? `${data.length} users found` : 'No users found'}
                </span>
                <span className="text-slate-500">
                  Last updated: {new Date().toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Users Grid */}
        <div className="space-y-4">
          {data?.length > 0 ? (
            data.map((user) => (
              <div
                key={user.id}
                className="bg-white rounded-xl shadow-sm border border-slate-200 
                         hover:shadow-md hover:border-blue-200 transition-all duration-300 
                         transform hover:-translate-y-1 overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                    {/* Profile Section */}
                    <div className="flex items-center gap-4 lg:w-1/4">
                      <div className="relative">
                        {user?.fileUrl ? (
                          <img
                            src={user.fileUrl}
                            alt={`${user.name}'s profile`}
                            className="w-16 h-16 rounded-full object-cover ring-4 ring-blue-50"
                            onError={(e) => {
                              e.target.style.display = 'none';
                              e.target.nextSibling.style.display = 'flex';
                            }}
                          />
                        ) : null}
                        <div 
                          className={`w-16 h-16 rounded-full bg-gradient-to-r from-blue-100 to-blue-200 
                                   flex items-center justify-center ${user?.fileUrl ? 'hidden' : 'flex'}`}
                        >
                          <User className="w-8 h-8 text-blue-600" />
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-400 rounded-full border-2 border-white"></div>
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-lg font-semibold text-slate-800 truncate">
                          {user.name}
                        </h3>
                        <p className="text-slate-600 text-sm flex items-center gap-1 mt-1">
                          <Mail className="w-4 h-4" />
                          {user.email}
                        </p>
                      </div>
                    </div>

                    {/* Info Grid */}
                    <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                      {/* Registration Date */}
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-slate-500">
                          <Calendar className="w-4 h-4" />
                          <span className="text-sm font-medium">Registered</span>
                        </div>
                        <p className="text-slate-800 font-semibold">
                          {formatDate(user.created_at)}
                        </p>
                      </div>

                      {/* Last Update */}
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-slate-500">
                          <Calendar className="w-4 h-4" />
                          <span className="text-sm font-medium">Last Update</span>
                        </div>
                        <p className="text-slate-800 font-semibold">
                          {formatDate(user.updated_at)}
                        </p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="lg:w-auto">
                      <button
                        onClick={() => handleView(user.id)}
                        className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-blue-600 
                                 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-3 
                                 rounded-xl font-semibold transition-all duration-200 
                                 transform hover:scale-105 shadow-sm hover:shadow-md
                                 flex items-center justify-center gap-2 min-w-[120px]"
                      >
                        <Eye className="w-4 h-4" />
                        View Details
                      </button>
                    </div>
                  </div>
                </div>

                {/* Progress bar at bottom */}
                <div className="h-1 bg-gradient-to-r from-blue-500 to-blue-600 opacity-20"></div>
              </div>
            ))
          ) : (
            // Empty State
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-12">
              <div className="text-center">
                <div className="mx-auto w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                  <Users className="w-12 h-12 text-slate-400" />
                </div>
                <h3 className="text-xl font-semibold text-slate-800 mb-2">No users found</h3>
                <p className="text-slate-600 mb-6">
                  {search 
                    ? `No users match your search for "${search}"`
                    : "There are no users in the system yet"
                  }
                </p>
                {search && (
                  <button
                    onClick={() => setSearch("")}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg 
                             font-medium transition-colors duration-200"
                  >
                    Clear Search
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default memo(ManageUsers);
