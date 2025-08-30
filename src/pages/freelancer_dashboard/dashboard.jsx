import { useEffect, useState } from "react";
import { X, Users, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ShoppingCart, DollarSign, Briefcase, FolderKanban, HandCoins } from "lucide-react";

import { useGetOrderByFreelancer } from "../../../api/client/order";
import { useGetFreelDashboardData } from "../../../api/client/freelancer";
import { setUserType } from "../../../redux/slices/userType";

import ICCDLoader from "../../component/loader";
import DCard from "../../component/freelancer_dashboard/cards";
import Table from "../freelancer_gigs/table";
import LineChartComponent from "./LineChartComponent";

export default function FreelancerDashboard() {
  const [showVerificationAlert, setShowVerificationAlert] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.user.userDetails);
  const freelancer = useSelector((state) => state.userProfile.userProfile);
  const { educations, certifications, skills, languages } = freelancer;

  const { data: ordersData, isLoading: ordersLoading } = useGetOrderByFreelancer();
  const { data: dashData, isLoading: dashDataLoading } = useGetFreelDashboardData();

  useEffect(() => {
    if (freelancer?.id) {
      dispatch(setUserType({ id: freelancer.id, type: "freelancer" }));
    }
  }, [freelancer]);

  if (dashDataLoading || ordersLoading) return <ICCDLoader />;

  return (
    <div className="min-h-screen px-4 sm:px-6 bg-white">
      <div className="flex flex-col sm:flex-row">
        {/* Sidebar */}
        <aside className="hidden lg:block w-80 p-4 bg-white">
          <div className="mb-6 bg-[#F8F8F8] mt-7 rounded-lg p-4">
            <div className="flex flex-col items-center gap-3">
              <img src={freelancer?.fileUrl} alt="Profilepic" className="w-16 h-16 rounded-full" />
              <div className="text-center">
                <h3 className="capitalize font-semibold text-sm">
                  {freelancer?.firstName} {freelancer?.lastName}
                </h3>
                <p className="text-xs text-gray-500">{userDetails?.email}</p>
              </div>
            </div>
            <button
              onClick={() => navigate("/freelancer/edit-profile")}
              className="w-full mt-4 px-4 py-2 text-sm border border-[#01AEAD] rounded-md text-gray-700 hover:bg-green-600 hover:text-white cursor-pointer"
            >
              Edit Profile
            </button>
          </div>

          <div className="bg-white rounded-lg p-4">
            <h4 className="text-sm font-medium text-gray-900 mb-3">Profile Stats</h4>
            <div className="grid grid-cols-2 gap-3 text-center">
              <StatBox label="Education" count={educations?.length} />
              <StatBox label="Certificates" count={certifications?.length} />
              <StatBox label="Skills" count={skills?.length} />
              <StatBox label="Languages" count={languages?.length} />
            </div>
            <button
              onClick={() => navigate("/freelancer/edit-profile")}
              className="w-full mt-4 px-4 py-2 text-sm border border-[#01AEAD] rounded-md text-gray-700 hover:bg-green-600 hover:text-white cursor-pointer"
            >
              View
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 mt-10">
          <h1 className="capitalize text-2xl font-bold mb-2">
            Welcome, {freelancer?.firstName} {freelancer?.lastName}
          </h1>
          <p className="text-xs text-gray-600 mb-4">Find helpful resources and stats here.</p>

          {/* {showVerificationAlert && (
            <div className="flex items-start sm:items-center gap-3 bg-yellow-50 w-full rounded-lg p-4 relative">
              <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                <span className="text-black text-xs font-bold">!</span>
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold">Verify your information</p>
                <p className="text-xs text-gray-600">
                  Stay compliant to continue working with EU clients
                </p>
              </div>
              <div className="flex gap-2">
                <button className="px-4 py-2 text-sm bg-gray-800 text-white rounded-md">Verify</button>
                <button onClick={() => setShowVerificationAlert(false)} className="p-1 hover:bg-yellow-100 rounded-full">
                  <X className="w-4 h-4 text-gray-500" />
                </button>
              </div>
            </div>
          )} */}

          {/* Stats Cards */}
          <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 my-6">

            {/* old card */}
             {/* <DCard
              title="Total Gigs Added"
              value={dashData?.[0]?.totalGigsAdded}
              bottomText="48.7% You earned Last Month"
              variant="teal"
              icon={<span className="text-2xl">💼</span>}
            /> */}

            {console.log(dashData)}
          <DCard
            title="Total Gigs Added"
            value={dashData?.[0]?.totalGigsAdded}
            icon={<HandCoins className="w-6 h-6"/>}
            border="border-l-6 border-indigo-500"
            gradient="from-indigo-500 to-purple-500"
          />
          <DCard
            title="Applied Job"
            value={dashData?.[0]?.totalAppliedJobs}
            icon={<Briefcase className="w-6 h-6"/>}
            border="border-l-6 border-green-500"
            gradient="from-green-500 to-emerald-500"
          />
          <DCard
            title="Applied Projects"
            value={dashData?.[0]?.totalAppliedProject}
            icon={<FolderKanban className="w-6 h-6" />}
            border="border-l-6 border-amber-500"
            gradient="from-amber-500 to-orange-500"
          />
          </div>

          {/* Chart and Orders */}
          <div className="grid grid-cols-1 lg:grid-cols-2 ">
            <LineChartComponent data={ordersData} />
            <Table title="Recent Orders" tabs={["All"]} data={ordersData} />
          </div>
        </main>
      </div>
    </div>
  );
}

// Helper component
const StatBox = ({ label, count }) => (
  <div className="p-2 bg-gray-50 rounded-md">
    <div className="text-lg font-semibold text-gray-900">{count ?? 0}</div>
    <div className="text-xs text-gray-500">{label}</div>
  </div>
);