import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import Gigs_table from "../../component/freelancers_gigs/gigs_table";
import Button from "../../component/button";
import { useNavigate } from "react-router-dom";
import { useGetGigsByUser } from "../../../api/client/gigs";
import { useSelector } from "react-redux";
import ICCDLoader from "../../component/loader";
import ICCDError from "../../component/ICCDError";
import { Folder, Package } from "lucide-react";
import Pagination from "../../component/pagination";

function ManageGigsAndProjects() {
  const navigate = useNavigate();
  const [active] = useState("Active");
  const [page, setPage] = useState(1);
  const profileDetails = useSelector((state) => state.userProfile.userProfile);
  const { data, totalPages, isLoading, isError } = useGetGigsByUser({page: page});

  if (isLoading) return <ICCDLoader />;
  if (isError) return <ICCDError />;

  return (
    <div className="px-4 sm:px-6  lg:px-10 w-full min-h-screen">
      <div className="  mt-10 bg-gradient-to-r from-[#44A4AD] via-[#36969E] to-[#1E7B82] backdrop-blur-sm rounded-2xl p-6 mb-8 shadow-xl border border-white/30 relative overflow-hidden">
        {/* Background pattern overlay */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-4 right-4 w-32 h-32 bg-white rounded-full blur-2xl"></div>
          <div className="absolute bottom-4 left-4 w-24 h-24 bg-white rounded-full blur-xl"></div>
        </div>

        <div className="relative z-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 shadow-lg">
              <Folder className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-white mb-1">
                Manage Gigs
              </h1>
              <p className="text-white/80 text-sm">
                ({active} Gigs) - {data?.length || 0}
              </p>
            </div>
          </div>

          {/* <div className="relative w-full lg:w-auto lg:min-w-[350px]">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-slate-400" />
              </div>
        <input
            className="border border-gray-400 rounded-lg bg-white w-full h-10 sm:h-12 px-3 pr-10 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#043A53]"
            placeholder="Search My Gigs..."
          />
            </div> */}
        </div>
      </div>

      {/* Add Gig Button */}
      <div className="mt-4 sm:mt-6 flex justify-end">
        <button
          className="px-4 sm:px-6 py-2 text-sm sm:text-base font-semibold rounded-lg bg-[#043A53] text-white hover:bg-[#052f47] transition-colors"
          onClick={() => navigate("/freelancer/manage-gigs/overview")}
        >
          Add New Gig
        </button>
      </div>

      {/* Gigs Table */}
      <div className="mt-4 sm:mt-6">
        {!data || data.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 sm:py-16 text-center text-gray-500">
            <svg
              className="w-12 h-12 sm:w-16 sm:h-16 mb-3 text-gray-300"
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
            <p className="text-sm sm:text-base font-medium">No Gigs Found</p>
            <p className="text-xs sm:text-sm text-gray-400 mt-1 max-w-xs sm:max-w-md">
              Try adding a new gig or check your filters.
            </p>
          </div>
        ) : (
          <Gigs_table data={data} />
        )}
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={(newPage) => setPage(newPage)}
        />
      </div>
    </div>
  );
}

export default ManageGigsAndProjects;
