import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetProjectsByClient } from "../../../api/client/project";
import ICCDError from "../../component/ICCDError";
import useDebounce from "../../../hooks/useDebounce";
import Pagination from "../../component/pagination";
import Projects_table from "../../component/client_dashboard/project_table";
import { FolderKanban } from 'lucide-react';
import Header from "../../component/client_dashboard/header";
import DataLoader from "../superadmin_dashboard/DataLoader";
import ItemNotFound from "../../component/itemNotFound";

function ClientProjects() {

    const navigate = useNavigate();
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");

    const { data, totalPages, isError, isLoading } = useGetProjectsByClient({ search: useDebounce(search), page });

    if (isError) return <ICCDError />;

    return (
        <div className="px-4 sm:px-6 lg:px-10">
            {/* Header */}
            <Header
                icon={<FolderKanban className="w-6 h-6 text-white" />}
                title="Projects Overview"
                description="Manage and track your project portfolio"
                search={search}
                setSearch={setSearch}
            />

            {/* Add New Project Button */}
            <div className="mt-6 flex justify-end">
                <button
                    className="px-4 sm:px-6 py-2 bg-[#15A9B2] text-white rounded-md text-sm sm:text-base hover:bg-[#139aa0] transition-colors"
                    onClick={() => navigate('/client/post-project')}
                >
                    Add New Project
                </button>
            </div>

            {(data && data?.length === 0) && (
                <ItemNotFound title="No Projects found" description="Try adding a new project or check your filters." />
            )}

            {isLoading ? <DataLoader /> :
                (<>
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
                </>)
            }

        </div>
    );
}

export default ClientProjects;
