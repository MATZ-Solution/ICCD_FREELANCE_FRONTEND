import { useState } from "react";
import ICCDLoader from "../component/loader";
import ICCDError from "../component/ICCDError";
import Pagination from "../component/pagination";
import useDebounce from "../../hooks/useDebounce";
import SearchIcon from "@mui/icons-material/Search";
import ItemNotFound from "../component/itemNotFound";
import { useGetAllProjects } from "../../api/client/project";
import Projects_table from "../component/client_dashboard/project_table";

function BrowseProjects() {

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('')

  const { data, totalPages, isError, isLoading } =
    useGetAllProjects({ search: useDebounce(search), page: page });

  if (isLoading) return <ICCDLoader />
  if (isError) return <ICCDError />

  return (
    <div className="px-4 sm:px-6 lg:px-10 w-full">
      <div className=" mt-4 relative max-w-xl mx-auto">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="What projects are you looking for today"
          className="rounded  w-full h-10 p-3 border border-gray-400"
        />
        <button
          className="absolute w-10 h-10 top-0 right-0 flex items-center justify-center bg-black rounded-r"
          aria-label="Search"
        >
          <SearchIcon className="text-white" />
        </button>
      </div>

      {/* Projects Table */}
      {(data && data?.length === 0) ?
        <ItemNotFound
          title="No Projects found"
          description="Try adding a new project or check your filters."
        />
        : <Projects_table data={data} />}

      {(data && data?.length > 0) && (
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
