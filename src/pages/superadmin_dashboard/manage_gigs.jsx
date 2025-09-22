import { useState, memo } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Box } from "lucide-react";
import { useGetAllGigs } from "../../../api/client/superadmin";

const ManageGigs = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const { data: gigs, isLoading, isError } = useGetAllGigs({search});

  const handleView = (id) => {
    navigate(`/superadmin/gig/${id}`);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const filteredGigs = gigs?.filter(
    (gig) =>
      gig.title?.toLowerCase().includes(search.toLowerCase()) ||
      gig.category?.toLowerCase().includes(search.toLowerCase())
  );

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
        <p className="text-red-500 text-lg">Error fetching gigs</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl">
                  <Box className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">
                    Gigs Management
                  </h1>
                  <p className="text-slate-600 mt-1">Manage and view all gigs</p>
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
                  placeholder="Search gigs by title or category..."
                />
              </div>
            </div>

            {/* Stats */}
            <div className="mt-6 pt-6 border-t border-slate-200">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-600">
                  {filteredGigs?.length > 0
                    ? `${filteredGigs.length} gigs found`
                    : "No gigs found"}
                </span>
                <span className="text-slate-500">
                  Last updated: {new Date().toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Gigs Grid */}
        {filteredGigs?.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGigs.map((gig) => (
              <div
                key={gig.id}
                className="bg-white rounded-xl shadow-sm border border-slate-200
                           hover:shadow-md hover:border-blue-200 transition-all duration-300
                           transform hover:-translate-y-1 overflow-hidden"
              >
                <div className="p-6 flex flex-col gap-4">
                  {/* Info */}
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-slate-800 truncate">
                      {gig.title}
                    </h3>
                    <p className="text-slate-600 mt-1">{gig.category}</p>
                    <p className="text-slate-500 text-sm mt-1 line-clamp-3">
                      {gig.description}
                    </p>
                  </div>

                  {/* Dates & Details */}
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-slate-500 font-medium">Created</span>
                      <p className="text-slate-800 font-semibold">
                        {formatDate(gig.created_at)}
                      </p>
                    </div>
                    <div>
                      <span className="text-slate-500 font-medium">
                        SubCategory
                      </span>
                      <p className="text-slate-800 font-semibold">
                        {gig.subCategory}
                      </p>
                    </div>
                    <div>
                      <span className="text-slate-500 font-medium">
                        Freelancer ID
                      </span>
                      <p className="text-slate-800 font-semibold">
                        {gig.freelancer_id}
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  {/* <button
                    onClick={() => handleView(gig.id)}
                    className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 
                               rounded-lg font-medium transition-colors duration-200"
                  >
                    View Gig
                  </button> */}
                </div>
                <div className="h-1 bg-gradient-to-r from-blue-500 to-blue-600 opacity-20"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-12">
            <div className="text-center">
              <p className="text-slate-600 mb-6">
                {search
                  ? `No gigs match your search for "${search}"`
                  : "There are no gigs in the system yet"}
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
  );
};

export default memo(ManageGigs);
