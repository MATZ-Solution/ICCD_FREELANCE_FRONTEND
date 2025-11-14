import { useGetAllDisputeByClient } from "../../../api/client/dispute";
import ICCDLoader from "../loader";
import ICCDError from "../ICCDError";
import DisputeLists from "../dispute/disputeLists";
import Pagination from "../pagination";
import { useState } from "react";

const ClientDisputeLists = () => {
  const [page, setPage] = useState(1);

  const { data, totalPages, isPending, isError } = useGetAllDisputeByClient({ page });

  if (isPending) return <ICCDLoader />;
  if (isError) return <ICCDError />;

  return (
    <div className="px-4 sm:px-6 lg:px-10 mt-6">
      <h2 className="text-xl sm:text-2xl font-bold mb-4 text-slate-800">
        Dispute Management
      </h2>

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
