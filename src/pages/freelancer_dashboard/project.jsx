import { useState, lazy, Suspense } from "react";
import { useNavigate } from "react-router-dom";
import { useGetAllProjects } from "../../../api/client/project";
import useDebounce from "../../../hooks/useDebounce";
import ICCDError from "../../component/ICCDError";
import DataLoader from "../superadmin_dashboard/DataLoader";
import Pagination from "../../component/pagination";
import { Briefcase, Search } from "lucide-react";

// Lazy load Projects_table for better performance
const Projects_table = lazy(() => import("../../component/client_dashboard/project_table"));

function FreelancerProjects() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const { data, totalPages, isSuccess, isPending, isError, isLoading } = useGetAllProjects({
    search: useDebounce(search),
    page: page,
  });

  if (isError) return <ICCDError />;

  return (
    <div className="px-4 sm:px-6 lg:px-10 w-full">
      {/* Header */}
      <div className="mt-10 bg-gradient-to-r from-[#44A4AD] via-[#36969E] to-[#1E7B82] backdrop-blur-sm rounded-2xl p-6 mb-8 shadow-xl border border-white/30 relative overflow-hidden">
        {/* Background decorative circles */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-4 right-4 w-32 h-32 bg-white rounded-full blur-2xl"></div>
          <div className="absolute bottom-4 left-4 w-24 h-24 bg-white rounded-full blur-xl"></div>
        </div>

        <div className="relative z-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 shadow-lg">
              <Briefcase className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-white mb-1">Active Projects</h1>
              <p className="text-white/80 text-sm">Active Projects For You</p>
            </div>
          </div>

          {/* Search */}
          <div className="relative w-full lg:w-auto lg:min-w-[300px]">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-white/70" />
            </div>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search projects..."
              className="w-full pl-10 pr-4 py-2 sm:py-3 rounded-xl bg-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 border border-white/30"
            />
          </div>
        </div>
      </div>

      {/* Projects Table */}
      <div className="mt-6 overflow-x-auto">
        {isLoading || isPending ? (
          <DataLoader />
        ) : !data || data.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 text-center text-gray-500">
            <svg
              className="w-12 h-12 mb-3 text-gray-300"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 8v4m0 4h.01M21 12A9 9 0 113 12a9 9 0 0118 0z"
              />
            </svg>
            <p className="text-sm font-medium">No Projects found</p>
            <p className="text-xs text-gray-400 mt-1">Try adding a new project or check your filters.</p>
          </div>
        ) : (
          <Suspense fallback={<DataLoader />}>
            {isSuccess && <Projects_table data={data} />}
          </Suspense>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
        )}
      </div>
    </div>
  );
}

export default FreelancerProjects;
