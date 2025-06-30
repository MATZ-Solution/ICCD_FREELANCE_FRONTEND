import { useState } from "react";
import SearchIcon from '@mui/icons-material/Search';
import Tabs from "../../component/freelancer_dashboard/tabs";
import order_logo from '../../assets/order_logo.png';

function ManageGigsAndProjects() {

    const [active, setActive] = useState('Active')
    const datas = ['Active', 'Pending Approval', 'Requires Modification', 'Draft', 'Denied', 'Paused']
    const data = [
        {
            id: 1,
            clientName: 'Albert Wiliam',
            project: 'Mobile App Redesign',
            price: 250,
            due: '9d, 10h',
            status: 'IN PROGRESS',
            details: "check detail"
        },
        {
            id: 2,
            clientName: 'John Smith',
            project: 'Website Development',
            price: 500,
            due: '5d, 3h',
            status: 'PENDING',
            details: "check detail"
        },
        {
            id: 3,
            clientName: 'Emily Doe',
            project: 'UI/UX Audit',
            price: 150,
            due: '2d, 22h',
            status: 'COMPLETED',
            details: "check detail"
        },
        {
            id: 4,
            clientName: 'Michael Jordan',
            project: 'E-commerce Setup',
            price: 320,
            due: '1d, 5h',
            status: 'IN PROGRESS',
            details: "check detail"
        },
        {
            id: 5,
            clientName: 'Sara Connor',
            project: 'Branding Kit',
            price: 180,
            due: '6d, 8h',
            status: 'IN REVIEW',
            details: "check detail"
        },
        {
            id: 6,
            clientName: 'Tom Hanks',
            project: 'API Integration',
            price: 275,
            due: '12d, 4h',
            status: 'ON HOLD',
            details: "check detail"
        },
    ];

    const statusColors = {
        'IN PROGRESS': 'bg-[#1467B0]',
        PENDING: 'bg-yellow-500',
        COMPLETED: 'bg-green-600',
        'IN REVIEW': 'bg-purple-500',
        'ON HOLD': 'bg-red-500',
    };

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
                <Tabs datas={datas} active={active} setActive={setActive} />
            </div>
            {/* table */}
            <div className="py-6">
                <div className="overflow-x-auto w-full">
                    <div className="min-w-[1000px] rounded-xl">
                        <table className="min-w-full border-separate border-spacing-y-4 border-spacing-x-4">
                            <tbody>
                                {data.map((item) => (
                                    <tr key={item.id}>
                                        <td colSpan={6}>
                                            <div className="w-full bg-[#F8F8F8] shadow-sm rounded-xl flex items-center justify-between px-4 py-3 gap-4 min-w-[1000px]">
                                                {/* First Column */}
                                                <div className="flex items-center gap-5 w-[20%]">
                                                    <img src={order_logo} className="w-40 h-20" />
                                                    {/* <div className="relative w-12 h-12 rounded-full">
                                                        <img src={client_img} className="h-full object-contain" />
                                                        <div className="absolute bottom-1 right-1 bg-green-400 w-2 h-2 rounded-full"></div>
                                                    </div> */}
                                                </div>

                                                {/* Second Column */}
                                                <div className="w-[20%]">
                                                    <p className="text-[#737373]">
                                                        Title:
                                                    </p>
                                                    <p className="font-semibold text-lg text-[#043A53]">{item.project}</p>
                                                </div>

                                                {/* Price */}
                                                <div className="w-[15%]">
                                                    <p className="text-[#737373]">Impression</p>
                                                    <p className="text-[#043A53] text-lg font-semibold">${item.price}</p>
                                                </div>

                                                {/* Due */}
                                                <div className="w-[15%]">
                                                    <p className="text-[#737373]">Clicks</p>
                                                    <p className="text-[#043A53] text-lg font-semibold">{item.due}</p>
                                                </div>

                                                {/* Orders */}
                                                <div className="w-[15%]">
                                                    <p className="text-[#737373]">Orders</p>
                                                    <p className="text-[#043A53] text-lg font-semibold">{item.due}</p>
                                                </div>

                                                {/* Status */}
                                                <div className="w-[12%]">
                                                    <p className="text-[#737373]">Status</p>
                                                    <div className={` flex justify-center items-center mt-2 ${statusColors[item.status] || 'bg-gray-500'} rounded-2xl py-1`}>
                                                        <span className="text-white text-sm font-semibold">{item.status}</span>
                                                    </div>
                                                </div>

                                                {/* View */}
                                                <div className="w-[15%]">
                                                    <button className="w-full h-16 flex justify-center items-center mt-2 bg-[#EDEDED] rounded-2xl p-3">
                                                        <p className="text-[#043A53] font-semibold">View</p>
                                                    </button>
                                                </div>

                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ManageGigsAndProjects