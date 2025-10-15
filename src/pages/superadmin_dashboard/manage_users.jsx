import { useState, memo } from "react";
import { Search, Users, User } from "lucide-react";
import { useGetAllUsers } from "../../../api/client/superadmin";
import DataError from "./DataError";
import useDebounce from "../../../hooks/useDebounce";
import DataLoader from "./DataLoader";
import { formatDate, getRelativeTime } from "../../../functions/timeFormat";
import Pagination from "../../component/pagination";

const SORT_OPTIONS = [
  { value: "name", label: "Name" },
  { value: "email", label: "Email" },
  { value: "created_at", label: "Registration Date" },
  { value: "updated_at", label: "Last Update" },
];

const FILTER_OPTIONS = [
  { value: "all", label: "All Users" },
  { value: "recent", label: "Recent (Last 30 days)" },
  { value: "active", label: "Active Users" },
  { value: "inactive", label: "Inactive Users" },
];

function ManageUsers() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const { data, totalPages, isLoading, isError, error } = useGetAllUsers({ search: useDebounce(search), page });

  if (isLoading) return <DataLoader />;
  if (isError) return <DataError onclickfunction={handleRefresh} tag="Users" />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="px-4 sm:px-6 lg:px-8 py-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="px-8 py-3">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-6">
              <div className="flex items-center gap-4">
                <div className="p-4 bg-gradient-to-r from-[#3C9299] via-[#2DD4BF] to-[#3C9299] rounded-2xl shadow-lg shadow-blue-500/30">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-slate-800">
                    User Management
                  </h1>
                  <p className="text-slate-600 mt-1">
                    Manage and monitor all system users
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full sm:w-80 pl-10 pr-4 py-3 border border-slate-200 rounded-xl bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Search users..."
                  />
                </div>
              </div>
            </div>

            {/* Stats */}
            {/* <div className="mt-6 pt-6 border-t border-slate-200">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-xl">
                  <div className="flex items-center gap-3">
                    <Users className="w-6 h-6 text-blue-600" />
                    <div>
                      <p className="text-xl font-bold text-blue-800">
                        {data?.length}
                      </p>
                      <p className="text-blue-600 text-xs">Total Users</p>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-x-auto">
          {data?.length > 0 ? (
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th
                    onClick={() => handleSort("name")}
                    className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider cursor-pointer"
                  >
                    Name
                  </th>
                  <th
                    onClick={() => handleSort("email")}
                    className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider cursor-pointer"
                  >
                    Email
                  </th>
                  <th
                    onClick={() => handleSort("created_at")}
                    className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider cursor-pointer"
                  >
                    Joined
                  </th>
                  <th
                    onClick={() => handleSort("updated_at")}
                    className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider cursor-pointer"
                  >
                    Last Active
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {data?.map((user) => (
                  <tr key={user.id} className="hover:bg-slate-50">

                    <td className="px-4 py-3 text-sm font-medium text-slate-800 flex items-center gap-2">
                      {user?.fileUrl ? (
                        <img
                          src={user.fileUrl}
                          alt={user.name}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center">
                          <User className="w-4 h-4 text-slate-500" />
                        </div>
                      )}
                      {user.name}
                    </td>

                    <td className="px-4 py-3 text-sm text-slate-600">
                      {user.email}
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-600">
                      {formatDate(user.created_at)}
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-600">
                      {getRelativeTime(user.updated_at)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="p-12 text-center">
              <Users className="w-16 h-16 text-slate-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-800 mb-2">
                No users found
              </h3>
              <p className="text-slate-600 mb-4">
                {search
                  ? `No users match "${search}"`
                  : "No users in the system yet"}
              </p>
              <button
                onClick={handleRefresh}
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl font-medium transition-colors duration-200"
              >
                Refresh
              </button>
            </div>
          )}
        </div>

        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={(newPage) => setPage(newPage)}
        />
      </div>
    </div>
  );
}

export default memo(ManageUsers);
