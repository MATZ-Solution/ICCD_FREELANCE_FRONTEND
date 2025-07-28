import { useState } from "react";
import { Search as SearchIcon } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserType } from "../../redux/slices/userType";

const YourComponent = ({ freelancerCheck, freelancer, search, setSearch }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div>
      {/* Toggle Button visible below lg */}
      <button
        className="lg:hidden px-3 py-2 border rounded"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? "Close Menu" : "Open Menu"}
      </button>

      {/* Nav: Visible by default on md and above (original), but now hidden on lg and up */}
      {/* We'll hide this on lg and up, and use the toggle menu for below lg */}
      <nav className="hidden lg:flex ml-10 space-x-1 gap-4">
        <div className="relative">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="What services are you looking for today"
            className="rounded w-xl h-10 p-3 border border-gray-400"
          />
          <div className="absolute w-10 h-10 top-0 right-0 flex items-center justify-center bg-black">
            <SearchIcon className="text-white" />
          </div>
        </div>
        <button
          onClick={() =>
            freelancerCheck?.length === 0
              ? navigate(`/freelancer/profile-form/1`)
              : (navigate(`/freelancer/dashboard`),
                dispatch(setUserType({ id: freelancer?.id, type: "freelancer" })))
          }
          className="px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-50"
        >
          Switch to freelancer
        </button>
        <button
          onClick={() => navigate(`/client/order`)}
          className="px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-50"
        >
          Orders
        </button>
      </nav>

      {/* Mobile toggle menu below lg */}
      {isOpen && (
        <nav className="lg:hidden ml-4 mt-2 space-y-4">
          <div className="relative">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="What services are you looking for today"
              className="rounded w-full h-10 p-3 border border-gray-400"
            />
            <div className="absolute w-10 h-10 top-0 right-0 flex items-center justify-center bg-black">
              <SearchIcon className="text-white" />
            </div>
          </div>
          <button
            onClick={() =>
              freelancerCheck?.length === 0
                ? navigate(`/freelancer/profile-form/1`)
                : (navigate(`/freelancer/dashboard`),
                  dispatch(setUserType({ id: freelancer?.id, type: "freelancer" })))
            }
            className="w-full px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-50 text-left"
          >
            Switch to freelancer
          </button>
          <button
            onClick={() => navigate(`/client/order`)}
            className="w-full px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-50 text-left"
          >
            Orders
          </button>
        </nav>
      )}
    </div>
  );
};

export default YourComponent;
