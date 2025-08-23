import { useState } from "react";
import SearchIcon from '@mui/icons-material/Search';
import Gigs_table from "../../component/freelancers_gigs/gigs_table";
import Button from "../../component/button";
import { useNavigate } from "react-router-dom";
import { useGetGigsByUser } from "../../../api/client/gigs";
import { useSelector } from "react-redux";
import ICCDLoader from "../../component/loader";
import ICCDError from "../../component/ICCDError";

function ManageGigsAndProjects() {
  const navigate = useNavigate();
  const [active] = useState('Active');
  const profileDetails = useSelector(state => state.userProfile.userProfile);
  const { data, isLoading, isError } = useGetGigsByUser(profileDetails.id);

  if (isLoading) return <ICCDLoader />;
  if (isError) return <ICCDError />;

  return (
    <div className="px-4 sm:px-6 lg:px-10 w-full min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between gap-4 items-start sm:items-center mt-6 sm:mt-10 p-4 sm:p-6 bg-[#F8F8F8] rounded-lg">
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-md text-sm text-[#043A53] leading-tight">
          Manage Gigs and Projects{" "}
          <span className="font-normal text-black">({active} Gigs) - {data?.length || 0}</span>
        </p>
        {/* <div className="relative w-full sm:w-64 md:w-72">
          <input
            className="border border-gray-400 rounded-lg bg-white w-full h-10 sm:h-12 px-3 pr-10 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#043A53]"
            placeholder="Search My Gigs..."
          />
          <SearchIcon className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500" />
        </div> */}
      </div>

      {/* Add Gig Button */}
      <div className="mt-4 sm:mt-6 flex justify-end">
        <button
          className="px-4 sm:px-6 py-2 text-sm sm:text-base font-semibold rounded-lg bg-[#043A53] text-white hover:bg-[#052f47] transition-colors"
          onClick={() => navigate('/freelancer/manage-gigs/overview')}
        >
          Add New Gig
        </button>
      </div>

      {/* Gigs Table */}
      <div className="mt-4 sm:mt-6">
        {(!data || data.length === 0) ? (
          <div className="flex flex-col items-center justify-center py-10 sm:py-16 text-center text-gray-500">
            <svg className="w-12 h-12 sm:w-16 sm:h-16 mb-3 text-gray-300" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12A9 9 0 113 12a9 9 0 0118 0z" />
            </svg>
            <p className="text-sm sm:text-base font-medium">No Gigs Found</p>
            <p className="text-xs sm:text-sm text-gray-400 mt-1 max-w-xs sm:max-w-md">Try adding a new gig or check your filters.</p>
          </div>
        ) : (
          <Gigs_table data={data} />
        )}
      </div>
    </div>
  );
}

export default ManageGigsAndProjects;