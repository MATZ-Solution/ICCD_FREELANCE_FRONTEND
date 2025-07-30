import { useState, memo } from "react";
import SearchIcon from '@mui/icons-material/Search';
import { useGetAllOrders } from "../../../api/client/stripeorder";
import OrderTable from "../freelancer_dashboard/order_table";
import ICCDLoader from "../loader";
import ICCDError from '../ICCDError';

function SuperAdminAllOrders() {
  const [search, setSearch] = useState('');

  const {
    data,
    isLoading,
    isError,
    error,
  } = useGetAllOrders({ search });

  if (isLoading) return <ICCDLoader />;
  if (isError) return <ICCDError message={error?.message || "Failed to fetch orders"} />;

  return (
    <div className="px-5 sm:px-5 lg:px-10">
      <div className="flex flex-wrap justify-between mt-10 p-5 bg-[#F8F8F8] rounded-md">
        <p className="text-xl sm:text-2xl">
          <span className="text-[#043A53] font-semibold">All Orders</span>
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

      {data && <OrderTable data={data} />}
    </div>
  );
}

export default memo(SuperAdminAllOrders);
