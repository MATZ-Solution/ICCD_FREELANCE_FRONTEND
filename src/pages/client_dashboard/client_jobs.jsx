import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import { Briefcase } from "lucide-react";

import Jobs_table from "../../component/client_dashboard/job_table";
import ICCDLoader from "../../component/loader";
import ICCDError from "../../component/ICCDError";
import { useGetAllJobByClient } from "../../../api/client/job";
import useDebounce from "../../../hooks/useDebounce";
import Pagination from "../../component/pagination";

function ClientJobs() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const { data, totalPages, isLoading, isError } = useGetAllJobByClient({
    search: useDebounce(search),
    page
  });

  if (isLoading) return <ICCDLoader />;
  if (isError) return <ICCDError />;

  const activeCount = data?.length || 0;

  return (
    <div className="px-4 sm:px-6 lg:px-10">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-10 p-4 sm:p-6 bg-gradient-to-r from-[#043A53] via-[#065f73] to-[#3C939D] rounded-md">
        <div className="mb-4 sm:mb-0">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
              <Briefcase className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white">
              Job Opportunities
            </h1>
          </div>
          <p className="text-blue-100 text-sm sm:text-lg">
            Discover and manage your career opportunities
          </p>
        </div>

        {/* Search Section */}
        <div className="relative w-full sm:w-72">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search Jobs..."
            className="w-full h-10 pl-3 pr-10 rounded-md border border-gray-500 bg-white focus:outline-none focus:ring-2 focus:ring-blue-300 text-sm sm:text-base"
          />
          <SearchIcon className="absolute top-2.5 right-2.5 text-gray-400 w-5 h-5" />
          <div className="mt-3 flex items-center gap-2 text-xs sm:text-sm text-blue-100 font-bold">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            {activeCount} Active {activeCount === 1 ? "Position" : "Positions"}
          </div>
        </div>
      </div>

      {/* Add New Job Button */}
      <div className="mt-6 flex justify-end">
        <button
          className="px-4 sm:px-5 py-2 bg-[#15A9B2] text-white rounded-md text-sm sm:text-base hover:bg-[#139aa0] transition-colors"
          onClick={() => navigate("/client/post-job")}
        >
          Add New Job
        </button>
      </div>

      {/* Empty State */}
      {!activeCount && (
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
          <p className="text-sm sm:text-base font-medium">No Jobs Found</p>
          <p className="text-xs sm:text-sm text-gray-400 mt-1">
            Try adding a new job or adjust your search criteria.
          </p>
        </div>
      )}

      {/* Jobs Table */}
      {activeCount > 0 && (
        <div className="mt-4 overflow-x-auto">
          <Jobs_table data={data} />
        </div>
      )}

      {/* Pagination */}
      {data?.length > 0 && (
        <div className="mt-4">
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={(newPage) => setPage(newPage)}
          />
        </div>
      )}
    </div>
  );
}

export default ClientJobs;
