import { useState } from "react";
import SearchIcon from '@mui/icons-material/Search';
import Button from "../../component/button";
import { useNavigate } from "react-router-dom";
import Jobs_table from "../../component/client_dashboard/job_table";
import { useGetAllJobByClient } from "../../../api/client/job";
import ICCDLoader from "../../component/loader";
import ICCDError from "../../component/ICCDError";

function ClientJobs() {

    const navigate = useNavigate()
    const [active, setActive] = useState('Active')
    const datas = ['Active', 'Pending Approval', 'Requires Modification', 'Draft', 'Denied', 'Paused']
    const { data, isSuccess, isError, isLoading } = useGetAllJobByClient()
    console.log("data: ", data)
    if (isLoading) {
        return <ICCDLoader />
    }

    if (isError) {
        return <ICCDError />
    }
    
    return (
        <div className="px-5 sm:px-5 lg:px-10">
            <div className="flex flex-wrap justify-between mt-10 p-5 bg-[#F8F8F8] rounded-md">
                <p className="text-xl sm:text-2xl "><span className="text-[#043A53]  font-semibold">Manage Jobs</span></p>
                <div className="relative mt-5 sm:mt-0">
                    <input className="border-[1px] border-gray-500 rounded-md bg-white w-72 h-10 p-2" placeholder="Search My History..." />
                    <SearchIcon className="absolute top-2 right-2" />
                </div>
            </div>

            {/* tabs */}
            {/* <div className="mt-8 flex gap-10">
                <Tabs datas={datas} active={active} setActive={setActive} />
            </div> */}
            <div className="mt-10 flex justify-end">
                <Button className="px-5 py-2" onClick={() => navigate('/client/post-job')}>Add new job</Button>
            </div>

            {/* table */}
            {data && (<Jobs_table data={data} />)}

        </div>
    )
}

export default ClientJobs