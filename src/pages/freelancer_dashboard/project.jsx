import { useState, lazy, Suspense } from "react";
import SearchIcon from "@mui/icons-material/Search";
import Tabs from "../../component/freelancer_dashboard/tabs";
import { useNavigate } from "react-router-dom";
import { useGetAllProjects } from "../../../api/client/project";
import ICCDLoader from "../../component/loader";
import ICCDError from "../../component/ICCDError";
import useDebounce from "../../../hooks/useDebounce";
import { Briefcase, Package, Search } from "lucide-react";
import DataLoader from "../superadmin_dashboard/DataLoader";
// Lazy load Projects_table
const Projects_table = lazy(() =>
  import("../../component/client_dashboard/project_table")
);

function FreelancerProjects() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const [active, setActive] = useState("Active");
  const datas = [
    "Active",
    "Pending Approval",
    "Requires Modification",
    "Draft",
    "Denied",
    "Paused",
  ];

  const { data, isSuccess, isPending, isError, isLoading } = useGetAllProjects({
    search: useDebounce(search),
  });

  // Show error if fetching fails
  if (isError) {
    return <ICCDError />;
  }

  return (
    <div className="px-4 sm:px-6 lg:px-10 w-full">
      <div className="  mt-10 bg-gradient-to-r from-[#44A4AD] via-[#36969E] to-[#1E7B82] backdrop-blur-sm rounded-2xl p-6 mb-8 shadow-xl border border-white/30 relative overflow-hidden">
        {/* Background pattern overlay */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-4 right-4 w-32 h-32 bg-white rounded-full blur-2xl"></div>
          <div className="absolute bottom-4 left-4 w-24 h-24 bg-white rounded-full blur-xl"></div>
        </div>

        <div className="relative z-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 shadow-lg">
              <Briefcase className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-white mb-1">
                Active Projects
              </h1>
              <p className="text-white/80 text-sm">Active Projects For You</p>
            </div>
          </div>

          <div className="relative w-full lg:w-auto lg:min-w-[350px]">
            <div className="absolute inset-y-0 right-3 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-slate-400" />
            </div>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              //   onKeyDown={handleKeyDown}
              placeholder="Search..."
              className="rounded  w-full h-10 p-3 text-white border border-white"
            />
          </div>
        </div>
      </div>

      {/* Tabs (Optional) */}
      {/* <div className="mt-8 overflow-x-auto">
        <Tabs datas={datas} active={active} setActive={setActive} />
      </div> */}

      {/* Projects Table */}
      {isLoading ? (
        <DataLoader />
      ) : (
        <div className="mt-6 overflow-x-auto">
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
          ) : (
            isSuccess && <Projects_table data={data} />
          )}
        </div>
      )}
    </div>
  );
}

export default FreelancerProjects;
