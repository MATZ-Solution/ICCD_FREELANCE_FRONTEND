import { useState } from "react";
import SearchIcon from '@mui/icons-material/Search';
import Tabs from "../../component/freelancer_dashboard/tabs";
import Gigs_table from "../../component/freelancers_gigs/gigs_table";
import Button from "../../component/button";
import { useNavigate } from "react-router-dom";
import { useGetGigsByUser } from "../../../api/client/gigs";
import { useSelector } from "react-redux";
import ICCDLoader from "../../component/loader";
import ICCDError from "../../component/ICCDError";

function ManageGigsAndProjects() {
    const navigate = useNavigate();
    const [active, setActive] = useState('Active');
    const datas = ['Active', 'Pending Approval', 'Requires Modification', 'Draft', 'Denied', 'Paused'];

    const profileDetails = useSelector(state => state.userProfile.userProfile);
    const { data, isSuccess, isPending, isError, isLoading } = useGetGigsByUser(profileDetails.id);

    if(isLoading){
        return <ICCDLoader />
    }
    if(isError){
        return <ICCDError />
    }
//   if (!data || data.length === 0) {
//   return (
//     <div className="flex flex-col items-center justify-center py-10 text-center text-gray-500">
//       <svg
//         className="w-12 h-12 mb-3 text-gray-300"
//         fill="none"
//         stroke="currentColor"
//         strokeWidth="1.5"
//         viewBox="0 0 24 24"
//       >
//         <path
//           strokeLinecap="round"
//           strokeLinejoin="round"
//           d="M12 8v4m0 4h.01M21 12A9 9 0 113 12a9 9 0 0118 0z"
//         />
//       </svg>
//       <p className="text-sm font-medium">No gigs found</p>
//       <p className="text-xs text-gray-400 mt-1">
//         Try adding a new gig or check your filters.
//       </p>
//     </div>
//   );
// }

    return (
        <div className="px-4 sm:px-6 lg:px-10 w-full">
            <div className="flex flex-col sm:flex-row justify-between gap-4 sm:items-center mt-10 p-4 sm:p-6 bg-[#F8F8F8] rounded-md">
                <p className="text-lg sm:text-xl md:text-2xl font-medium text-[#043A53]">
                    Manage Gigs and Projects <span className="font-normal text-black">(Active Gigs) - 15</span>
                </p>

                <div className="relative w-full sm:w-72">
                    <input
                        className="border border-gray-400 rounded-md bg-white w-full h-10 px-3 pr-10 text-sm sm:text-base"
                        placeholder="Search My History..."
                    />
                    <SearchIcon className="absolute top-2.5 right-3 text-gray-500" />
                </div>
            </div>

            {/* Tabs - Uncomment if you want tabs back */}
            {/* <div className="mt-8 overflow-x-auto">
                <Tabs datas={datas} active={active} setActive={setActive} />
            </div> */}

            <div className="mt-8 flex justify-end">
                <Button className="px-4 py-2 text-sm sm:text-base" onClick={() => navigate('/freelancer/manage-gigs/overview')}>
                    Add new gigs
                </Button>
            </div>

            <div className="mt-6 overflow-x-auto">
  { !data || data.length === 0 ? (
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
                    <p className="text-sm font-medium">No Gigs found</p>
                    <p className="text-xs text-gray-400 mt-1">
                        Try adding a new Gigs or check your filters.
                    </p>
                </div>
            ) : data && <Gigs_table data={data} />}


            
            {/* // {    data && <Gigs_table data={data} />} */}
            </div>
        </div>
    );
}

export default ManageGigsAndProjects;
