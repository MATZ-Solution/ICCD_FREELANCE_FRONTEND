import { useState } from "react";
import SearchIcon from '@mui/icons-material/Search';
import Tabs from "../../component/freelancer_dashboard/tabs";
import Gigs_table from "../../component/freelancers_gigs/gigs_table";
import Button from "../../component/button";
import { useNavigate } from "react-router-dom";
import { useGetGigsByUser } from "../../../api/client/gigs";
import Projects_table from "../../component/client_dashboard/project_table";
import { useGetProjectsByClient } from "../../../api/client/project";
import ICCDLoader from "../../component/loader";
import ICCDError from "../../component/ICCDError";
import useDebounce from "../../../hooks/useDebounce";

function ClientProjects() {

    const navigate = useNavigate()
    const [search, setSearch] = useState("")
    const [active, setActive] = useState('Active')
    const datas = ['Active', 'Pending Approval', 'Requires Modification', 'Draft', 'Denied', 'Paused']

    const { data, isSuccess, isPending, isError, isLoading } = useGetProjectsByClient({ search: useDebounce(search) })

    if (isError) {
        return <ICCDError />
    }

    return (
        <div className="px-5 sm:px-5 lg:px-10">
                <div className="flex flex-wrap justify-between mt-10 p-5 bg-gradient-to-r from-[#043A53] to-[#47AAB3]  rounded-md">
        <p className="text-xl sm:text-2xl ">

            <h2 className="text-2xl font-bold text-white">Projects Overview</h2>
            <p className="text-white/80 text-sm mt-1">Manage and track your project portfolio</p>
        </p>
        <div className="relative mt-5 sm:mt-0">
          <input
            onChange={(e) => setSearch(e.target.value)}
            className="border-[1px] border-gray-500 rounded-md bg-white w-72 h-10 p-2"
            placeholder="Search My History..."
          />
          <SearchIcon className="absolute top-2 right-2" />
        </div>
      </div>

            {/* tabs */}
            {/* <div className="mt-8 flex gap-10">
                <Tabs datas={datas} active={active} setActive={setActive} />
            </div> */}
            <div className="mt-10 flex justify-end">
                <button className="px-5 py-2 bg-[#15A9B2] text-white rounded" onClick={() => navigate('/client/post-project')}>Add new projects</button>
            </div>

            {/* table */}
            {
                isLoading ?
                    <ICCDLoader />
                    :
                    <div>
                        {!data || data.length === 0 ? (
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
                                <p className="text-xs text-gray-400 mt-1">
                                    Try adding a new project or check your filters.
                                </p>
                            </div>
                        ) : null}
                        {(data && data.length > 0) && (<Projects_table data={data} />)}
                    </div>
            }

        </div>
    )
}

export default ClientProjects