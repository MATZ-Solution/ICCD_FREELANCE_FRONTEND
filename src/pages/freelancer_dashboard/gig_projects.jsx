import { useState } from "react";
import SearchIcon from '@mui/icons-material/Search';
import Tabs from "../../component/freelancer_dashboard/tabs";
import Gigs_table from "../../component/freelancers_gigs/gigs_table";
import Button from "../../component/button";
import { useNavigate } from "react-router-dom";
import { useGetGigsByUser } from "../../../api/client/gigs";
import { useSelector } from "react-redux";
import ICCDLoader from "../../component/loader";

function ManageGigsAndProjects() {
    const navigate = useNavigate();
    const [active, setActive] = useState('Active');
    const datas = ['Active', 'Pending Approval', 'Requires Modification', 'Draft', 'Denied', 'Paused'];

    const profileDetails = useSelector(state => state.userProfile.userProfile);
    const { data, isSuccess, isPending, isError, isLoading } = useGetGigsByUser(profileDetails.id);

    if(isLoading){
        return <ICCDLoader />
    }

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
                {data && <Gigs_table data={data} />}
            </div>
        </div>
    );
}

export default ManageGigsAndProjects;
