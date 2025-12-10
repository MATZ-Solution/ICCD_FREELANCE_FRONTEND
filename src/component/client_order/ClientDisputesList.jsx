import { useGetAllDisputeByClient } from "../../../api/client/dispute";
import ICCDError from "../ICCDError";
import DisputeLists from "../dispute/disputeLists";
import Pagination from "../pagination";
import { useState, useEffect } from "react";
import { AlertTriangle } from "lucide-react";
import Header from "../client_dashboard/Header";

const ClientDisputeLists = () => {

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("")

  const { data, totalPages, isLoading, isError } = useGetAllDisputeByClient({ page });

  useEffect(() => {
    setPage(1)
  }, [search])

  if (isError) return <ICCDError />;

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6">
      <Header
        icon={<AlertTriangle className="w-6 h-6 text-white" />}
        title="Dispute Management"
        description="Manage your dispute"
        placeholder="Search Dispute"
        search={search}
        setSearch={setSearch}
      />

      {/* Dispute List */}
      <div className="overflow-x-auto">
        <DisputeLists data={data} />
      </div>

      {/* Pagination */}
      {data?.length > 0 && (
        <div className="mt-4 flex justify-center">
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={(newPage) => setPage(newPage)}
          />
        </div>
      )}

      {/* Empty State */}
      {(!data || data.length === 0) && (
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
          <p className="text-sm sm:text-base font-medium">No Disputes Found</p>
          <p className="text-xs sm:text-sm text-gray-400 mt-1">
            You currently have no disputes. Any raised disputes will appear here.
          </p>
        </div>
      )}
    </div>
  );
};

export default ClientDisputeLists;
