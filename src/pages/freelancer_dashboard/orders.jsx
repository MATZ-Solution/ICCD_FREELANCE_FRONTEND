import { useState } from "react";
import OrderTable from "../../component/freelancer_dashboard/order_table"
import SearchIcon from '@mui/icons-material/Search';

function Orders() {

    const [active, setActive] = useState('Active')
    const navigation = ['Active', 'Pending Approval', 'Requires Modification', 'Draft', 'Denied', 'Paused']
    
    return (
        <div className="px-5 sm:px-5 lg:px-10">
            <div className="flex flex-wrap justify-between mt-10 p-5 bg-[#F8F8F8] rounded-md">
                <p className="text-xl sm:text-2xl "><span className="text-[#043A53]  font-semibold">Manage Order</span> (Active Orders) - 7 ($3,500)</p>
                <div className="relative mt-5 sm:mt-0">
                    <input className="border-[1px] border-gray-500 rounded-md bg-white w-72 h-10 p-2" placeholder="Search My History..." />
                    <SearchIcon className="absolute top-2 right-2" />
                </div>
            </div>
            <div className="mt-8 flex gap-10">
                {navigation.map((data, index) => (
                    <button key={index} className="cursor-pointer" onClick={()=> setActive(data)}>
                        <p  className={`font-semibold ${active === data ? 'text-[#3DBF07]' : 'text-[#A8A8A8]'}`}>{data}</p>
                    </button>
                    ))
                }
            </div>
            {/* table */}
            <div>
                <OrderTable />
            </div>
        </div>
    )
}

export default Orders