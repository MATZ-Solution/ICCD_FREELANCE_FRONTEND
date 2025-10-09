import { useState, lazy, Suspense } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import { useGetAllProjects } from "../../api/client/project";
import ICCDLoader from "../component/loader";
import ICCDError from "../component/ICCDError";
import useDebounce from "../../hooks/useDebounce";
import Pagination from "../component/pagination";
import DataLoader from "./superadmin_dashboard/DataLoader";

// Lazy load Projects_table
const Projects_table = lazy(() =>
  import("../component/client_dashboard/project_table")
);

function BrowseProjects() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('')

  const [active, setActive] = useState("Active");
  const datas = [
    "Active",
    "Pending Approval",
    "Requires Modification",
    "Draft",
    "Denied",
    "Paused",
  ];
  // const debounce = useDebounce(searchVal, 500)

  const { data, totalPages, isSuccess, isPending, isError, isLoading } =
    useGetAllProjects({ search: useDebounce(search), page: page });


  if (isError) {
    return <ICCDError />;
  }

  return (
    <div className="px-4 sm:px-6 lg:px-10 w-full">
      {/* Header */}
      <div className=" mt-4 relative max-w-xl mx-auto">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          //   onKeyDown={handleKeyDown}
          placeholder="What projects are you looking for today"
          className="rounded  w-full h-10 p-3 border border-gray-400"
        />
        <button
          //   onClick={handleSearch}
          className="absolute w-10 h-10 top-0 right-0 flex items-center justify-center bg-black rounded-r"
          aria-label="Search"
        >
          <SearchIcon className="text-white" />
        </button>
      </div>
      {/* Tabs (Optional) */}
      {/* <div className="mt-8 overflow-x-auto">
        <Tabs datas={datas} active={active} setActive={setActive} />
      </div> */}

      {/* Projects Table */}
      {isLoading ?
        <DataLoader />
        :
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
      }
      {(data && data.length > 0) && (
        <div className="py-2">
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={(newPage) => setPage(newPage)}
          />
        </div>
      )}

    </div>
  );
}

export default BrowseProjects;
