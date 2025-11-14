import { useState } from "react";
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from "react-router-dom";
import { useGetProjectsByClient } from "../../../api/client/project";
import ICCDLoader from "../../component/loader";
import ICCDError from "../../component/ICCDError";
import useDebounce from "../../../hooks/useDebounce";
import Pagination from "../../component/pagination";
import Projects_table from "../../component/client_dashboard/project_table";

function ClientProjects() {
    const navigate = useNavigate();
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");

    const { data, totalPages, isError, isLoading } = useGetProjectsByClient({ search: useDebounce(search), page });

    if (isError) return <ICCDError />;

    return (
        <div className="px-4 sm:px-6 lg:px-10">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-10 p-4 sm:p-5 bg-gradient-to-r from-[#043A53] to-[#47AAB3] rounded-md">
                <div className="mb-4 sm:mb-0">
                    <h2 className="text-2xl sm:text-3xl font-bold text-white">Projects Overview</h2>
                    <p className="text-white/80 text-sm sm:text-base mt-1">Manage and track your project portfolio</p>
                </div>

                {/* Search */}
                <div className="relative w-full sm:w-72">
                    <input
                        onChange={(e) => setSearch(e.target.value)}
                        className="border border-gray-500 rounded-md bg-white w-full h-10 pl-3 pr-10 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-300"
                        placeholder="Search My Projects..."
                    />
                    <SearchIcon className="absolute top-2.5 right-2.5 text-gray-400 w-5 h-5" />
                </div>
            </div>

            {/* Add New Project Button */}
            <div className="mt-6 flex justify-end">
                <button
                    className="px-4 sm:px-6 py-2 bg-[#15A9B2] text-white rounded-md text-sm sm:text-base hover:bg-[#139aa0] transition-colors"
                    onClick={() => navigate('/client/post-project')}
                >
                    Add New Project
                </button>
            </div>

            {/* Table / Loader */}
            <div className="mt-6 overflow-x-auto">
                {isLoading ? (
                    <ICCDLoader />
                ) : (
                    <>
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
                                <p className="text-sm sm:text-base font-medium">No Projects found</p>
                                <p className="text-xs sm:text-sm text-gray-400 mt-1">
                                    Try adding a new project or check your filters.
                                </p>
                            </div>
                        ) : (
                            <>
                                <Projects_table data={data} />
                                {totalPages > 1 && (
                                    <div className="mt-4">
                                        <Pagination
                                            currentPage={page}
                                            totalPages={totalPages}
                                            onPageChange={(newPage) => setPage(newPage)}
                                        />
                                    </div>
                                )}
                            </>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}

export default ClientProjects;
