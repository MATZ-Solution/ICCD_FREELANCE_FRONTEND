import { useState, memo, useMemo, useCallback } from "react";
import {
  Search,
  Users,
  Mail,
  User,
  MapPin,
  Clock,
  RefreshCw,
} from "lucide-react";
import { useGetAllFreelancers } from "../../../api/client/superadmin";
import DataLoader from "./DataLoader";
import DataError from "./DataError";

const ManageFreelancers = () => {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("created_at");
  const [sortOrder, setSortOrder] = useState("desc");
  const [statusFilter, setStatusFilter] = useState("all");

  const {
    data: freelancers = [],
    isLoading,
    isError,
    refetch,
  } = useGetAllFreelancers();


  console.log(freelancers)
  const formatDate = useCallback((dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }, []);

  const getRelativeTime = useCallback((dateString) => {
    if (!dateString) return "N/A";
    const now = new Date();
    const date = new Date(dateString);
    const diffDays = Math.ceil(Math.abs(now - date) / (1000 * 60 * 60 * 24));
    if (diffDays === 1) return "1 day ago";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
    return `${Math.floor(diffDays / 365)} years ago`;
  }, []);

  const filteredAndSortedFreelancers = useMemo(() => {
    let filtered = freelancers.filter((f) => {
      const fullName = `${f.firstName} ${f.lastName}`.toLowerCase();
      const matchesSearch =
        fullName.includes(search.toLowerCase()) ||
        (f.email || "").toLowerCase().includes(search.toLowerCase()) ||
        (f.skills || "").toLowerCase().includes(search.toLowerCase()) ||
        (f.location || "").toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter === "all" || f.status === statusFilter;
      return matchesSearch && matchesStatus;
    });

    filtered.sort((a, b) => {
      let aValue =
        sortBy === "name" ? `${a.firstName} ${a.lastName}` : a[sortBy];
      let bValue =
        sortBy === "name" ? `${b.firstName} ${b.lastName}` : b[sortBy];
      if (typeof aValue === "string") {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }
      return sortOrder === "asc"
        ? aValue > bValue
          ? 1
          : -1
        : aValue < bValue
        ? 1
        : -1;
    });

    return filtered;
  }, [freelancers, search, statusFilter, sortBy, sortOrder]);

  console.log(filteredAndSortedFreelancers)

  if (isLoading) return <DataLoader tag="Freelancer" />;

  if (isError) return <DataError onclickfunction={refetch} tag="Freelancers" />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="px-4 sm:px-6 lg:px-8 py-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 bg-white/70 backdrop-blur-sm rounded-xl shadow-xl border border-white/20 p-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between ">
            <div className="flex items-center gap-6">
              <div className="p-3 bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-600 rounded-2xl shadow-lg">
                <Users className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                  Freelancer Management
                </h1>
                <p className="text-slate-600 mt-2 text-lg">
                  Manage and view all freelancers •{" "}
                  <span className="font-semibold text-blue-600">
                    {freelancers.length} total
                  </span>
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={refetch}
                className="p-3 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                title="Refresh data"
              >
                <RefreshCw className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Search & Filters */}
          <div className="mt-8 pt-8 border-t border-slate-200/60 flex flex-col lg:flex-row gap-6">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                <Search className="h-6 w-6 font-extrabold text-black" />
              </div>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="block w-full pl-14 pr-6 py-4 border border-slate-200 rounded-2xl bg-white/80 backdrop-blur-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 shadow-lg hover:shadow-xl text-lg"
                placeholder="Search by name, email, skillss, or location..."
              />
            </div>

            <div className="flex flex-wrap gap-4">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-6 py-4 border border-slate-200 rounded-2xl bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-lg hover:shadow-xl transition-all duration-200 font-medium"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="busy">Busy</option>
                <option value="inactive">Inactive</option>
              </select>

              <select
                value={`${sortBy}-${sortOrder}`}
                onChange={(e) => {
                  const [field, order] = e.target.value.split("-");
                  setSortBy(field);
                  setSortOrder(order);
                }}
                className="px-6 py-4 border border-slate-200 rounded-2xl bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-lg hover:shadow-xl transition-all duration-200 font-medium"
              >
                <option value="created_at-desc">Newest First</option>
                <option value="created_at-asc">Oldest First</option>
                <option value="name-asc">Name A-Z</option>
                <option value="name-desc">Name Z-A</option>
                <option value="rating-desc">Highest Rated</option>
                <option value="rating-asc">Lowest Rated</option>
              </select>
            </div>
          </div>
        </div>

        {/* Freelancers Grid */}
        <div className="space-y-6">
          {freelancers.length > 0 ? (
            freelancers.map((freelancer) => {
              return (
                <div
                  key={freelancer.id}
                  className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 hover:shadow-2xl hover:border-blue-200/50 transition-all duration-500 transform hover:-translate-y-2 overflow-hidden group"
                >
                  <div className="p-8 flex flex-col xl:flex-row xl:items-center gap-8">
                    {/* Profile */}
                    <div className="flex items-center gap-6 xl:w-1/3">
                      <div className="relative">
                        {freelancer?.fileUrl ? (
                          <img
                            src={freelancer.fileUrl}
                            alt={`${freelancer.firstName} ${freelancer.lastName}`}
                            className="w-20 h-20 rounded-2xl object-cover ring-4 ring-white shadow-lg" />
                        ) : (
                          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-100 via-blue-200 to-indigo-200 flex items-center justify-center shadow-lg">
                            <User className="w-10 h-10 text-blue-600" />
                          </div>
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-bold text-slate-800 truncate">
                            {freelancer.firstName} {freelancer.lastName}
                          </h3>
                        </div>
                        <p className="text-slate-600 font-medium flex items-center gap-2 mb-2">
                          <Mail className="w-4 h-4" />
                          {freelancer.email || "N/A"}
                        </p>
                        {freelancer.location && (
                          <p className="text-slate-600 font-medium flex items-center gap-2 mb-3">
                            <MapPin className="w-4 h-4" />
                            {freelancer.location}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Info Grid */}
                    <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      <div className="space-y-3">
                        <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                          skills
                        </div>
                        <p className="text-slate-800 font-semibold text-sm leading-relaxed">
                          {freelancer.skills || "N/A"}
                        </p>
                      </div>
                      <div className="space-y-3">
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Level
              </div>
              <p className="text-slate-800 font-bold text-lg">
                {freelancer.about_tagline || "No Tagline Provided"}
              </p>
            </div>
                      <div className="space-y-3">
                        <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                          Member Since
                        </div>
                        <p className="text-slate-800 font-bold">
                          {formatDate(freelancer.created_at)}
                        </p>
                        <p className="text-xs text-slate-500 flex items-center gap-1 font-medium">
                          <Clock className="w-3 h-3" />
                          {getRelativeTime(freelancer.created_at)}
                        </p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="xl:w-auto flex flex-col gap-2">
                      <div className="text-xs text-slate-500 text-center font-mono bg-slate-50 px-3 py-2 rounded-lg">
                        User ID: {freelancer.userID}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-16 text-center">
              <div className="mx-auto w-32 h-32 bg-gradient-to-br from-blue-50 via-blue-100 to-indigo-100 rounded-3xl flex items-center justify-center mb-8 shadow-lg">
                <Users className="w-16 h-16 text-blue-400" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-4">
                {search || statusFilter !== "all"
                  ? "No matches found"
                  : "No freelancers yet"}
              </h3>
              <p className="text-slate-600 text-lg leading-relaxed max-w-md mx-auto">
                {search || statusFilter !== "all"
                  ? `Try adjusting your search criteria or filters to find what you're looking for`
                  : "Freelancers will appear here once they register on the platform"}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default memo(ManageFreelancers);

