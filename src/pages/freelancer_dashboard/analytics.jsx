
import DonutChartCard from "../../component/freelancer_dashboard/donutChart";
// import OverviewChartF from "../../component/freelancer_dashboard/overviewChart";
import Widgets from "../../component/freelancer_dashboard/widget";
import Table from "../../component/freelancer_dashboard/table";
import SearchIcon from '@mui/icons-material/Search';

// import OverviewChartF from "../../component/freelancer_dashboard/overviewChart";

const FreelancerAnalytics = () => {
  const ordersData = {
    "March 2023": [
      { name: "Pending", value: 60 },
      { name: "Active", value: 20 },
      { name: "Canceled", value: 20 },
    ],
  };

  const orders = [
    { id: 1, name: "Property No:1", description: "RUETEX GMBH", type: "Paid", amount: 20, date: "2023-01-05", status: "active" },
    { id: 2, name: "Property No: 2", description: "RUETEX GMBH", type: "Pending", amount: 60000, date: "2024-01-05", status: "completed" },
    { id: 3, name: "Property No:3", description: "RUETEX GMBH", type: "Paid", amount: 150, date: "2024-01-05", status: "pending" },
  ];

  const orderTabs = ["All", "Paid", "Pending"];

  const getStatusColor = (status) => ({
    active: "bg-green-500",
    completed: "bg-blue-500",
    pending: "bg-yellow-500",
  }[status]);

  const ordersColors = ["#4e6cff", "#4ecc7d", "#f99247"];

  const earningsData = {
    "March 2023": [
      { name: "Active Payments", value: 60 },
      { name: "Canceled Payments", value: 60 },
      { name: "Pending Payments", value: 20 },
    ],
  };

  const earningsColors = ["#fcd34d", "#3b82f6", "#4ade80"];

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-wrap justify-between mt-5 p-5 bg-[#F8F8F8] rounded-md">
        <p className="text-xl sm:text-2xl "><span className="text-[#043A53]  font-semibold">Analytics</span> (Active Gigs) - 15</p>
        <div className="relative mt-5 sm:mt-0">
          <input className="border-[1px] border-gray-500 rounded-md bg-white w-72 h-10 p-2" placeholder="Search My History..." />
          <SearchIcon className="absolute top-2 right-2" />
        </div>
      </div>

      {/* Overview Charts */}
      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-[#F8F8F8] rounded-2xl p-4">
          {/* <OverviewChartF period="Monthly" colorScheme="purple" /> */}
        </div>
        <div className="bg-[#F8F8F8] rounded-2xl p-4">
          {/* <OverviewChartF period="Weekly" colorScheme="green" /> */}
        </div>
      </div>

      {/* Donut Charts + Table */}
      <div className="grid grid-cols-1  md:grid-cols-2  lg:grid-cols-3 gap-6 mb-6 items-center">
        <DonutChartCard
          title="Orders"
          dataPerMonth={ordersData}
          totalCount={45}
          colorList={ordersColors}
          centerLabelSubtext="Orders"
          topBg="bg-[#5C6B9C]"
        />

        <DonutChartCard
          title="Earnings"
          dataPerMonth={earningsData}
          totalCount={45}
          colorList={earningsColors}
          centerLabelSubtext="Orders"
          topBg="bg-[#6F42C1]"
          innerRadius={60}
        />

        <div className="mb-6">
          <Table
            title="Recent Orders"
            tabs={orderTabs}
            data={orders}
            getStatusColor={getStatusColor}
          />
        </div>
      </div>

      {/* Widgets */}
      <div className="flex mt-4 ml-6 flex-col lg:flex-row gap-4">
        <Widgets
          heading="Sales Analytics"
          subheading1="Earned This Month"
          price1="$156,00"
          subheading2="Orders Created"
          price2="$69"
          subheading3="Average Selling Price"
          price3="$15"
          subheading4="Positive Rating"
          rating="99%"
        />
        <Widgets widget="Add Widget" />
        <Widgets widget="Add Widget" />
        <Widgets widget="Add Widget" />
      </div>
    </div>
  );
};

export default FreelancerAnalytics;