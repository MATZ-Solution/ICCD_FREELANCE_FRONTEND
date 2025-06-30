import { useState } from "react";
import Table2 from "../../component/table2"
import SearchIcon from '@mui/icons-material/Search';
import Tabs from "../../component/freelancer_dashboard/tabs";

function ManageGigsAndProjects() {

    const [active, setActive] = useState('Active')
    const datas = ['Active', 'Pending Approval', 'Requires Modification', 'Draft', 'Denied', 'Paused']
    
    return (
        <div className="px-5 sm:px-5 lg:px-10">
            <div className="flex flex-wrap justify-between mt-10 p-5 bg-[#F8F8F8] rounded-md">
                <p className="text-xl sm:text-2xl "><span className="text-[#043A53]  font-semibold">Manage Gigs and Projects</span> (Active Gigs) - 15</p>
                <div className="relative mt-5 sm:mt-0">
                    <input className="border-[1px] border-gray-500 rounded-md bg-white w-72 h-10 p-2" placeholder="Search My History..." />
                    <SearchIcon className="absolute top-2 right-2" />
                </div>
            </div>
            <div className="mt-8 flex gap-10">
               <Tabs datas={datas} active={active} setActive={setActive}/>
            </div>
            {/* table */}
            <div>
                <Table2 />
            </div>
        </div>
    )
}

export default ManageGigsAndProjects