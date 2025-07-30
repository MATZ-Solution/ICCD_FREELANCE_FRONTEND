import { useState, lazy, Suspense } from "react";
import SearchIcon from '@mui/icons-material/Search';
import Tabs from "../../component/freelancer_dashboard/tabs";
import { useNavigate } from "react-router-dom";
import { useGetAllProjects } from "../../../api/client/project";
import ICCDLoader from "../../component/loader";
import ICCDError from "../../component/ICCDError";

// Lazy load Projects_table
const Projects_table = lazy(() => import("../../component/client_dashboard/project_table"));

function FreelancerProjects() {
  const navigate = useNavigate();

  const [active, setActive] = useState('Active');
  const datas = ['Active', 'Pending Approval', 'Requires Modification', 'Draft', 'Denied', 'Paused'];

  const { data, isSuccess, isPending, isError, isLoading } = useGetAllProjects();

  // Show loader while fetching
  if (isLoading || isPending) {
    return <ICCDLoader />;
  }

  // Show error if fetching fails
  if (isError) {
    return <ICCDError />;
  }

  return (
    <div className="px-4 sm:px-6 lg:px-10 w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between gap-4 sm:items-center mt-10 p-4 sm:p-6 bg-[#F8F8F8] rounded-md">
        <p className="text-lg sm:text-xl md:text-2xl font-semibold text-[#043A53]">
          Manage Projects
        </p>
        <div className="relative w-full sm:w-72">
          <input
            className="border border-gray-500 rounded-md bg-white w-full h-10 px-3 pr-10 text-sm sm:text-base"
            placeholder="Search My History..."
          />
          <SearchIcon className="absolute top-2.5 right-3 text-gray-500" />
        </div>
      </div>

      {/* Tabs (Optional) */}
      {/* <div className="mt-8 overflow-x-auto">
        <Tabs datas={datas} active={active} setActive={setActive} />
      </div> */}

      {/* Projects Table */}
      <div className="mt-6 overflow-x-auto">
        <Suspense fallback={<ICCDLoader />}>
          {isSuccess && <Projects_table data={data} />}
        </Suspense>
      </div>
    </div>
  );
}

export default FreelancerProjects;
