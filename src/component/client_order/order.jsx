import { useState } from "react";
import SearchIcon from '@mui/icons-material/Search';
import Tabs from "../../component/freelancer_dashboard/tabs";
import Gigs_table from "../../component/freelancers_gigs/gigs_table";
import Button from "../../component/button";
import { useNavigate } from "react-router-dom";
import { useGetGigsByUser } from "../../../api/client/gigs";
import { useGetOrderByClient } from "../../../api/client/order";
import OrderTable from "../freelancer_dashboard/order_table";
import { memo } from "react";
import ICCDLoader from "../loader";

function ClientOrders() {
  const navigate = useNavigate()
  const [active, setActive] = useState('Active')
  const datas = ['Active', 'Pending Approval', 'Requires Modification', 'Draft', 'Denied', 'Paused']
  let [search, setSearch] = useState('')
  const { data, isSuccess, isPending, isError, isLoading } = useGetOrderByClient({search: search})
  console.log("data: ", data)

  if (isLoading) return <ICCDLoader /> ;


  return (
    <div className="px-5 sm:px-5 lg:px-10">
      <div className="flex flex-wrap justify-between mt-10 p-5 bg-[#F8F8F8] rounded-md">
        <p className="text-xl sm:text-2xl "><span className="text-[#043A53]  font-semibold">Manage Orders</span></p>
        <div className="relative mt-5 sm:mt-0">
          <input onChange={(e) => setSearch(e.target.value)} className="border-[1px] border-gray-500 rounded-md bg-white w-72 h-10 p-2" placeholder="Search My History..." />
          <SearchIcon className="absolute top-2 right-2" />
        </div>
      </div>

      {/* tabs */}
      {/* <div className="mt-8 flex gap-10">
                <Tabs datas={datas} active={active} setActive={setActive} />
            </div> */}
      {/* <div className="mt-10 flex justify-end">
        <Button className="px-5 py-2" onClick={() => navigate('/client/post-project')}>Add new projects</Button>
      </div> */}

      {/* table */}
      {data && (<OrderTable data={data} />)}

    </div>
  )
}

export default memo(ClientOrders)

