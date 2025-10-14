import { useState, memo, useMemo, useCallback } from "react";
import {
  Search,
  Users,
  Eye,
  Calendar,
  Mail,
  User,
  Filter,
  SortAsc,
  SortDesc,
  RefreshCw,
  ChevronDown,
  UserPlus,
  Settings,
  Activity,
  Shield,
  Clock,
  MailIcon,
} from "lucide-react";
import { useGetAllUsers } from "../../../api/client/superadmin";
import DataError from "./DataError";

const SORT_OPTIONS = [
  { value: "name", label: "Name" },
  { value: "email", label: "Email" },
  { value: "created_at", label: "Registration Date" },
  { value: "updated_at", label: "Last Update" },
];

const FILTER_OPTIONS = [
  { value: "all", label: "All Users" },
  { value: "recent", label: "Recent (Last 30 days)" },
  { value: "active", label: "Active Users" },
  { value: "inactive", label: "Inactive Users" },
];

function ManageUsers() {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("created_at");
  const [sortOrder, setSortOrder] = useState("desc");
  const [filterBy, setFilterBy] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState(new Set());

  const { data, isLoading, isError, refetch } = useGetAllUsers({ search });

  // Filter + sort logic
  const processedData = useMemo(() => {
    if (!data) return [];

    let filtered = [...data];
    const now = new Date();
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    switch (filterBy) {
      case "recent":
        filtered = filtered.filter(
          (user) => new Date(user.created_at) >= thirtyDaysAgo
        );
        break;
      case "active":
        filtered = filtered.filter(
          (user) => new Date(user.updated_at) >= thirtyDaysAgo
        );
        break;
      case "inactive":
        filtered = filtered.filter(
          (user) => new Date(user.updated_at) < thirtyDaysAgo
        );
        break;
    }

    filtered.sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];

      if (sortBy === "name" || sortBy === "email") {
        aValue = aValue?.toLowerCase() || "";
        bValue = bValue?.toLowerCase() || "";
      } else if (sortBy === "created_at" || sortBy === "updated_at") {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      }

      if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
      if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });

    return filtered;
  }, [data, search, sortBy, sortOrder, filterBy]);

  const handleSort = useCallback(
    (field) => {
      if (sortBy === field) {
        setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
      } else {
        setSortBy(field);
        setSortOrder("asc");
      }
    },
    [sortBy]
  );

  const handleSelectAll = useCallback(() => {
    if (selectedUsers.size === processedData.length) {
      setSelectedUsers(new Set());
    } else {
      setSelectedUsers(new Set(processedData.map((user) => user.id)));
    }
  }, [selectedUsers.size, processedData]);

  const handleSelectOne = (id) => {
    const newSet = new Set(selectedUsers);
    if (newSet.has(id)) {
      newSet.delete(id);
    } else {
      newSet.add(id);
    }
    setSelectedUsers(newSet);
  };

  const handleRefresh = useCallback(() => {
    refetch();
  }, [refetch]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getRelativeTime = (dateString) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInMs = now - date;
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInDays === 0) return "Today";
    if (diffInDays === 1) return "Yesterday";
    if (diffInDays < 7) return `${diffInDays} days ago`;
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
    if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} months ago`;
    return `${Math.floor(diffInDays / 365)} years ago`;
  };

  if (isLoading) return <DataError tag="Users" />;
  if (isError) return <DataError onclickfunction={handleRefresh} tag="Users" />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="px-4 sm:px-6 lg:px-8 py-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className=" p-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-6">
              <div className="flex items-center gap-4">
               <div className="p-4 bg-gradient-to-r from-[#3C9299] via-[#2DD4BF] to-[#3C9299] rounded-2xl shadow-lg shadow-blue-500/30">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-slate-800">
                    User Management
                  </h1>
                  <p className="text-slate-600 mt-1">
                    Manage and monitor all system users
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full sm:w-80 pl-10 pr-4 py-3 border border-slate-200 rounded-xl bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Search users..."
                  />
                </div>

                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className={`px-4 py-3 rounded-xl font-medium transition-all duration-200 flex items-center gap-2 ${
                    showFilters
                      ? "bg-blue-500 text-white"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  <Filter className="w-4 h-4" />
                  Filters
                </button>

                <button
                  onClick={handleRefresh}
                  className="px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-medium transition-colors duration-200 flex items-center gap-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  Refresh
                </button>
              </div>
            </div>

            {/* Filters Panel */}
            {showFilters && (
              <div className="border-t border-slate-200 pt-6 animate-in slide-in-from-top duration-300">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Sort */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Sort By
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {SORT_OPTIONS.map((option) => (
                        <button
                          key={option.value}
                          onClick={() => handleSort(option.value)}
                          className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-1 ${
                            sortBy === option.value
                              ? "bg-blue-500 text-white"
                              : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                          }`}
                        >
                          {option.label}
                          {sortBy === option.value &&
                            (sortOrder === "asc" ? (
                              <SortAsc className="w-3 h-3" />
                            ) : (
                              <SortDesc className="w-3 h-3" />
                            ))}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Filter */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Filter
                    </label>
                    <select
                      value={filterBy}
                      onChange={(e) => setFilterBy(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      {FILTER_OPTIONS.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Selection */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Selection
                    </label>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={handleSelectAll}
                        className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-sm font-medium transition-colors duration-200"
                      >
                        {selectedUsers.size === processedData.length
                          ? "Deselect All"
                          : "Select All"}
                      </button>
                      {selectedUsers.size > 0 && (
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                          {selectedUsers.size} selected
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Stats */}
            <div className="mt-6 pt-6 border-t border-slate-200">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-xl">
                  <div className="flex items-center gap-3">
                    <Users className="w-6 h-6 text-blue-600" />
                    <div>
                      <p className="text-xl font-bold text-blue-800">
                        {processedData.length}
                      </p>
                      <p className="text-blue-600 text-xs">Total Users</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-xl">
                  <div className="flex items-center gap-3">
                    <Activity className="w-6 h-6 text-green-600" />
                    <div>
                      <p className="text-xl font-bold text-green-800">
                        {
                          processedData.filter(
                            (user) =>
                              Math.floor(
                                (new Date() - new Date(user.updated_at)) /
                                  (1000 * 60 * 60 * 24)
                              ) <= 7
                          ).length
                        }
                      </p>
                      <p className="text-green-600 text-xs">Active This Week</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-4 rounded-xl">
                  <div className="flex items-center gap-3">
                    <UserPlus className="w-6 h-6 text-purple-600" />
                    <div>
                      <p className="text-xl font-bold text-purple-800">
                        {
                          processedData.filter(
                            (user) =>
                              Math.floor(
                                (new Date() - new Date(user.created_at)) /
                                  (1000 * 60 * 60 * 24)
                              ) <= 30
                          ).length
                        }
                      </p>
                      <p className="text-purple-600 text-xs">New This Month</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-4 rounded-xl">
                  <div className="flex items-center gap-3">
                    <Clock className="w-6 h-6 text-orange-600" />
                    <div>
                      <p className="text-sm font-medium text-orange-800">
                        Last Updated
                      </p>
                      <p className="text-orange-600 text-xs">
                        {new Date().toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-x-auto">
          {processedData.length > 0 ? (
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>          
                  <th
                    onClick={() => handleSort("name")}
                    className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider cursor-pointer"
                  >
                    Name
                  </th>
                  <th
                    onClick={() => handleSort("email")}
                    className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider cursor-pointer"
                  >
                    Email
                  </th>
                  <th
                    onClick={() => handleSort("created_at")}
                    className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider cursor-pointer"
                  >
                    Joined
                  </th>
                  <th
                    onClick={() => handleSort("updated_at")}
                    className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider cursor-pointer"
                  >
                    Last Active
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {processedData.map((user) => (
                  <tr key={user.id} className="hover:bg-slate-50">
                   
                    <td className="px-4 py-3 text-sm font-medium text-slate-800 flex items-center gap-2">
                      {user?.fileUrl ? (
                        <img
                          src={user.fileUrl}
                          alt={user.name}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center">
                          <User className="w-4 h-4 text-slate-500" />
                        </div>
                      )}
                      {user.name}
                    </td>
                
                      <td className="px-4 py-3 text-sm text-slate-600">
                      {user.email}
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-600">
                      {formatDate(user.created_at)}
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-600">
                      {getRelativeTime(user.updated_at)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="p-12 text-center">
              <Users className="w-16 h-16 text-slate-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-800 mb-2">
                No users found
              </h3>
              <p className="text-slate-600 mb-4">
                {search
                  ? `No users match "${search}"`
                  : "No users in the system yet"}
              </p>
              <button
                onClick={handleRefresh}
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl font-medium transition-colors duration-200"
              >
                Refresh
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default memo(ManageUsers);
