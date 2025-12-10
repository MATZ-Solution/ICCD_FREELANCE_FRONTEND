import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Briefcase } from "lucide-react";
import Jobs_table from "../../component/client_dashboard/job_table";
import ICCDError from "../../component/ICCDError";
import { useGetAllJobByClient } from "../../../api/client/job";
import useDebounce from "../../../hooks/useDebounce";
import Pagination from "../../component/pagination";
import Header from "../../component/client_dashboard/header";
import DataLoader from "../superadmin_dashboard/DataLoader";

function ClientJobs() {

  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const { data, totalPages, isLoading, isError } = useGetAllJobByClient({
    search: useDebounce(search),
    page
  });

  useEffect(() => {
    setPage(1)
  }, [search])

  if (isError) return <ICCDError />;

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6">
      {/* Header Section */}
      <Header
        icon={<Briefcase className="w-6 h-6 text-white" />}
        title="Job Opportunities"
        description="Discover and manage your career opportunities"
        placeholder="Search Jobs"
        search={search}
        setSearch={setSearch}
      />
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
      {data?.length === 0 && (
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
      {isLoading ? <DataLoader /> :
        (<div className="mt-4 overflow-x-auto">
          <Jobs_table data={data} />
        </div>)
      }

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
