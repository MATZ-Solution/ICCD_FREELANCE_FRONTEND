import { useState, memo, useMemo, useCallback } from "react";
import  {Search,
  Users,
  Mail,
  User,
  MapPin,
  Clock,
  RefreshCw,
  Star,
  Sparkles,
  TrendingUp,
  Award,
  Calendar,
} from "lucide-react";

import { useGetAllFreelancers } from '../../../api/client/superadmin';

const ManageFreelancers = () => {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("created_at");
  const [sortOrder, setSortOrder] = useState("desc");
  const [statusFilter, setStatusFilter] = useState("all");


const {
    data: freelancers = [],
    isLoading,
    isError,
    
  } = useGetAllFreelancers();

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

  const refetch = () => {
    console.log("Refreshing data...");
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      active: {
        bg: "from-emerald-500/10 to-emerald-600/10",
        text: "text-emerald-700",
        dot: "bg-emerald-500",
        label: "Active",
      },
      busy: {
        bg: "from-amber-500/10 to-amber-600/10",
        text: "text-amber-700",
        dot: "bg-amber-500",
        label: "Busy",
      },
      inactive: {
        bg: "from-slate-500/10 to-slate-600/10",
        text: "text-slate-700",
        dot: "bg-slate-500",
        label: "Inactive",
      },
    };
    const config = statusConfig[status] || statusConfig.inactive;
    return (
      <span
        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold bg-gradient-to-r ${config.bg} ${config.text} border border-current/20`}
      >
        <span className={`w-2 h-2 rounded-full ${config.dot} animate-pulse`}></span>
        {config.label}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20">
      <div className="px-4 sm:px-6 lg:px-8 py-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="p-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div className="flex items-center gap-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#3C9299] via-[#2DD4BF] to-[#3C9299] rounded-2xl blur-xl opacity-30 animate-pulse"></div>
                  <div className="relative p-4 bg-gradient-to-r from-[#3C9299] via-[#2DD4BF] to-[#3C9299] rounded-2xl shadow-lg shadow-blue-500/30">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-[#4BAFAA] bg-clip-text text-transparent">
                      Freelancer Management
                    </h1>
                    <Sparkles className="w-6 h-6 text-[#4BAFAA]" />
                  </div>
                  <p className="text-slate-600 flex items-center gap-2 text-lg">
                    <TrendingUp className="w-4 h-4" />
                    Manage and view all freelancers •{" "}
                    <span className="font-bold text-blue-600">
                      {freelancers.length} total
                    </span>
                  </p>
                </div>
              </div>
              <button
                onClick={refetch}
                className="p-4 bg-gradient-to-r from-[#3C9299] via-[#2DD4BF] to-[#3C9299] text-white rounded-xl 
                           hover:from-blue-600 hover:to-purple-600 transition-all duration-300 
                           shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40
                           transform hover:scale-105"
                title="Refresh data"
              >
                <RefreshCw className="w-5 h-5" />
              </button>
            </div>

            {/* Search & Filters */}
            <div className="mt-8 pt-8 border-t border-slate-200/60 flex flex-col lg:flex-row gap-4">
              <div className="relative flex-1 group">
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                </div>
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="block w-full pl-14 pr-6 py-4 border border-slate-200 rounded-xl 
                             bg-slate-50 placeholder-slate-400 focus:outline-none focus:ring-2 
                             focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white
                             transition-all duration-300 shadow-sm hover:shadow-md font-medium"
                  placeholder="Search by name, email, skills, or location..."
                />
              </div>

              <div className="flex flex-wrap gap-4">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-6 py-4 border border-slate-200 rounded-xl bg-slate-50 
                             focus:outline-none focus:ring-2 focus:ring-blue-500/20 
                             focus:border-blue-500 focus:bg-white shadow-sm hover:shadow-md 
                             transition-all duration-300 font-semibold cursor-pointer"
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
                  className="px-6 py-4 border border-slate-200 rounded-xl bg-slate-50 
                             focus:outline-none focus:ring-2 focus:ring-blue-500/20 
                             focus:border-blue-500 focus:bg-white shadow-sm hover:shadow-md 
                             transition-all duration-300 font-semibold cursor-pointer"
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
        </div>

        {/* Freelancers List */}
        <div className="space-y-5">
          {filteredAndSortedFreelancers.length > 0 ? (
            filteredAndSortedFreelancers.map((freelancer, idx) => (
              <div
                key={freelancer.id}
                className="group relative backdrop-blur-xl rounded-2xl shadow-lg shadow-slate-200/50 
                           border border-slate-200/60 hover:shadow-xl hover:shadow-blue-200/50 
                           hover:border-blue-300/60 transition-all duration-500 transform hover:-translate-y-1 overflow-hidden"
                style={{ animationDelay: `${idx * 50}ms` }}
              >
                {/* Background Glow */}
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="relative p-6 lg:p-8 flex flex-col xl:flex-row xl:items-center gap-6 lg:gap-8">
                  {/* Profile Section */}
                  <div className="flex items-start gap-5 xl:w-1/3">
                    <div className="relative flex-shrink-0">
                      {freelancer?.fileUrl ? (
                        <img
                          src={freelancer.fileUrl}
                          alt={`${freelancer.firstName} ${freelancer.lastName}`}
                          className="w-20 h-20 rounded-2xl object-cover ring-4 ring-white shadow-xl"
                        />
                      ) : (
                        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center shadow-xl">
                          <User className="w-10 h-10 text-white" />
                        </div>
                      )}
                      {/* Status Indicator */}
                      <div className="absolute -bottom-1 -right-1">
                        {getStatusBadge(freelancer.status)}
                      </div>
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                          {freelancer.firstName} {freelancer.lastName}
                        </h3>
                      </div>
                      
                      {freelancer.rating && (
                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex items-center gap-1 px-2.5 py-1 bg-amber-500/10 rounded-lg border border-amber-200/60">
                            <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                            <span className="text-sm font-bold text-amber-700">{freelancer.rating}</span>
                          </div>
                        </div>
                      )}

                      <p className="text-slate-600 font-medium flex items-center gap-2 mb-2 text-sm">
                        <Mail className="w-4 h-4 flex-shrink-0" />
                        <span className="truncate">{freelancer.email || "N/A"}</span>
                      </p>
                      
                      {freelancer.location && (
                        <p className="text-slate-600 font-medium flex items-center gap-2 text-sm">
                          <MapPin className="w-4 h-4 flex-shrink-0" />
                          {freelancer.location}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Info Grid */}
                  <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Skills */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
                        <Award className="w-3.5 h-3.5" />
                        Skills
                      </div>
                      <p className="text-slate-800 font-medium text-sm leading-relaxed line-clamp-2">
                        {freelancer.skills || "N/A"}
                      </p>
                    </div>

                    {/* Tagline */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
                        <Sparkles className="w-3.5 h-3.5" />
                        Title
                      </div>
                      <p className="text-slate-800 font-bold text-sm">
                        {freelancer.about_tagline || "No Tagline"}
                      </p>
                    </div>

                    {/* Member Since */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
                        <Calendar className="w-3.5 h-3.5" />
                        Member Since
                      </div>
                      <p className="text-slate-800 font-bold text-sm">
                        {formatDate(freelancer.created_at)}
                      </p>
                      <p className="text-xs text-slate-500 flex items-center gap-1 font-medium">
                        <Clock className="w-3 h-3" />
                        {getRelativeTime(freelancer.created_at)}
                      </p>
                    </div>
                  </div>

                  {/* User ID Badge */}
                  <div className="xl:w-auto">
                    <div className="px-4 py-3 bg-gradient-to-br from-slate-50 to-blue-50/30 rounded-xl border border-slate-200/60 text-center">
                      <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                        User ID
                      </div>
                      <div className="font-mono font-bold text-slate-900">
                        {freelancer.userID}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg shadow-slate-200/50 border border-slate-200/60 p-16 text-center">
              <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 mb-6 shadow-lg">
                <Users className="w-12 h-12 text-blue-500" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">
                {search || statusFilter !== "all"
                  ? "No matches found"
                  : "No freelancers yet"}
              </h3>
              <p className="text-slate-600 text-lg leading-relaxed max-w-md mx-auto">
                {search || statusFilter !== "all"
                  ? "Try adjusting your search criteria or filters to find what you're looking for"
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