import { useState, memo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import defaultAvatar from "../../assets/freelancer_dashboard/order_logo.png";
import { useGetAllUsers } from "../../../api/client/superadmin";
import ICCDLoader from "../../component/loader";
import ICCDError from "../../component/ICCDError";

function ManageUsers() {
  const [search, setSearch] = useState("");
  const pathName = useLocation().pathname;
  const navigate = useNavigate();

  const { data, isLoading, isError, error } = useGetAllUsers({ search });
console.log("Full axios response:", data);
console.log("Users array from backend:", data?.data?.data);


  const handleView = (id) => {
    navigate(`/superadmin/user/${id}`);
  };

  if (isLoading) return <ICCDLoader />;
  if (isError)
    return <ICCDError message={error?.message || "Failed to fetch users"} />;

  return (
    <div className="px-5 sm:px-5 lg:px-10">
      {/* Header */}
      <div className="flex flex-wrap justify-between mt-10 p-5 bg-[#F8F8F8] rounded-md">
        <p className="text-xl sm:text-2xl">
          <span className="text-[#043A53] font-semibold">All Users</span>
        </p>
        <div className="relative mt-5 sm:mt-0">
          <input
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-500 rounded-md bg-white w-72 h-10 p-2"
            placeholder="Search users..."
          />
          <SearchIcon className="absolute top-2 right-2" />
        </div>
      </div>

      {/* Users List */}
      <div className="py-6 px-4">
        {data?.length > 0 ? (
          <div className="flex flex-col gap-4">
            {data.map((user) => {
              return (
                <div
                  key={user.id}
                  className="bg-[#F8F8F8] shadow-sm rounded-xl p-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
                >
                  {/* Profile Image */}
                  <div className="flex justify-center md:justify-start w-full md:w-[10%]">
                    <img
                      src={user?.fileUrl || defaultAvatar}
                      alt="Profile"
                      className="w-20 h-20 rounded-full object-cover"
                      onError={(e) => (e.target.src = defaultAvatar)}
                    />
                  </div>

                  {/* Name */}
                  <div className="w-full md:w-[15%]">
                    <p className="text-[#737373] text-sm">Name</p>
                    <p className="text-[#043A53] font-semibold text-base truncate">
                      {user?.name}
                    </p>
                  </div>

                  {/* Email */}
                  <div className="w-full md:w-[20%]">
                    <p className="text-[#737373] text-sm">Email</p>
                    <p className="text-[#043A53] font-semibold text-base truncate">
                      {user?.email}
                    </p>
                  </div>

                  {/* Role */}
                  <div className="w-full md:w-[10%]">
                    <p className="text-[#737373] text-sm">Role</p>
                    <p className="text-[#043A53] font-semibold text-base capitalize">
                      {user?.role || "N/A"}
                    </p>
                  </div>

                  {/* Registration Date */}
                  <div className="w-full md:w-[15%]">
                    <p className="text-[#737373] text-sm">Registration Date</p>
                    <p className="text-[#043A53] font-semibold text-base">
                      {new Date(user?.created_at).toLocaleDateString()}
                    </p>
                  </div>

                  {/* Last Login */}
                  <div className="w-full md:w-[15%]">
                    <p className="text-[#737373] text-sm">Last Update</p>
                    <p className="text-[#043A53] font-semibold text-base">
                      {new Date(user?.updated_at).toLocaleDateString()}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="w-full md:w-[15%] flex flex-col md:flex-row gap-2">
                    <button
                      onClick={() => handleView(user.id)}
                      className="w-full h-12 bg-[#EDEDED] rounded-2xl p-3 flex justify-center items-center"
                    >
                      <p className="text-[#043A53] font-semibold">View</p>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-center text-sm text-gray-600">No users found</p>
        )}
      </div>
    </div>
  );
}

export default memo(ManageUsers);
