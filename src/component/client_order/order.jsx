import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import Tabs from "../../component/freelancer_dashboard/tabs";
import Button from "../../component/button";
import { useNavigate } from "react-router-dom";
import { useGetOrderByClient } from "../../../api/client/order";
import OrderTable from "../freelancer_dashboard/order_table";
import { memo } from "react";
import ICCDLoader from "../loader";

function ClientOrders() {
  const navigate = useNavigate();
  const [active, setActive] = useState("Active");
  const datas = ["Active", "Pending Approval", "Requires Modification", "Draft", "Denied", "Paused"];
  const [search, setSearch] = useState("");
  const { data, isSuccess, isPending, isError, isLoading } = useGetOrderByClient({ search });

  if (isLoading || isPending) return <ICCDLoader />;
  if (isError) return <ICCDError />;

  if (!data || data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8 px-4 text-center text-gray-500 min-h-[50vh]">
        <svg
          className="w-10 h-10 sm:w-12 sm:h-12 mb-3 text-gray-300"
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
        <p className="text-sm sm:text-base font-medium">No Orders found</p>
      </div>
    );
  }

  return (
    <div className="w-full px-3 sm:px-4 lg:px-6 py-4 sm:py-6">
      {/* Header Section */}
      <div className="flex flex-col gap-3 sm:gap-4 bg-[#F8F8F8] p-3 sm:p-4 rounded-md">
        <p className="text-base sm:text-lg md:text-xl font-semibold text-[#043A53]">Manage Orders</p>

        <div className="relative w-full max-w-[400px]">
          <input
            type="text"
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-9 sm:h-10 pl-3 pr-10 rounded-md border border-gray-300 bg-white text-xs sm:text-sm placeholder-gray-400"
            placeholder="Search My History..."
          />
          <SearchIcon className="absolute top-2.5 sm:top-3 right-3 text-gray-500 w-4 h-4 sm:w-5 sm:h-5" />
        </div>
      </div>

      {/* Optional Tabs */}
      {/* <div className="mt-4 sm:mt-6 flex flex-wrap gap-3 sm:gap-4">
        <Tabs datas={datas} active={active} setActive={setActive} />
      </div> */}

      {/* Optional Button */}
      {/* <div className="mt-4 sm:mt-6 flex justify-end">
        <Button className="px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm" onClick={() => navigate("/client/post-project")}>
          Add new projects
        </Button>
      </div> */}

      {/* Responsive Table */}
      <div className="mt-4 sm:mt-6 w-full">
        <OrderTable data={data} />
      </div>
    </div>
  );
}

export default memo(ClientOrders);