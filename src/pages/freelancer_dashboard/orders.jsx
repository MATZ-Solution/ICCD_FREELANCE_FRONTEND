import { useState } from "react";
import OrderTable from "../../component/freelancer_dashboard/order_table";
import SearchIcon from '@mui/icons-material/Search';
import { useGetOrderByFreelancer } from "../../../api/client/order";
import ICCDLoader from "../../component/loader";
import ICCDError from "../../component/ICCDError";

function Orders() {
  const [active, setActive] = useState('Active');
  const navigation = ['Active', 'Pending Approval', 'Requires Modification', 'Draft', 'Denied', 'Paused'];
  let [search, setSearch] = useState('')

  const { data, error, isLoading, isError } = useGetOrderByFreelancer({ search: search });
  console.log("data: ", data);
  if (isLoading ) {
         return <ICCDLoader /> 
       }

         if (error || isError) {
         return <ICCDError /> 
       }


  return (
    <div className="px-4 sm:px-6 lg:px-10">

      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-10 p-5 bg-[#F8F8F8] rounded-md gap-4 sm:gap-0">
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-[#043A53]">
          Manage Order <span className="font-normal text-sm sm:text-base md:text-lg">(Active Orders) - 7 ($3,500)</span>
        </p>

        <div className="relative w-full sm:w-72">
          <input
            onChange={(e) => setSearch(e.target.value)}
            type="search"
            className="border border-gray-400 rounded-md bg-white w-full h-10 px-3 pr-10 text-sm sm:text-base
              focus:outline-none focus:ring-2 focus:ring-[#3DBF07]"
            placeholder="Search My History..."
          />
          <SearchIcon className="absolute top-2.5 right-3 text-gray-500" />
        </div>
      </div>

      {/* Navigation Buttons */}
      {/* <nav
          aria-label="Order navigation"
          className="mt-8 flex flex-wrap gap-3 sm:gap-6 justify-start"
        >
          {navigation.map((item, index) => (
            <button
              key={index}
              onClick={() => setActive(item)}
              className={`cursor-pointer py-1 px-3 rounded-md transition-colors duration-200
                ${active === item ? 'bg-[#3DBF07] text-white' : 'text-[#A8A8A8] hover:text-[#3DBF07] hover:bg-gray-100'}`}
              aria-current={active === item ? 'page' : undefined}
            >
              <span className="font-semibold text-xs sm:text-sm">{item}</span>
            </button>
          ))}
        </nav> */}

      {/* Table Container */}
      <div className="mt-6 overflow-x-auto rounded-md border border-gray-200">
        <OrderTable data={data} />
      </div>
    </div>
  );
}

export default Orders;
