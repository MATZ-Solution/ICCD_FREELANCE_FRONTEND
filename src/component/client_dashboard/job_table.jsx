import { memo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MapPin,
  Clock,
  DollarSign,
  Briefcase,
  Eye,
  Edit3,
  ChevronRight,
} from "lucide-react";

function Jobs_table({ data }) {
  const [selectedJob, setSelectedJob] = useState(null);
  const navigate = useNavigate();

  const handleNavigate = (id) => {
    setSelectedJob(id);
  };

  const getPayTypeStyle = (payType) =>
    ({
      Hourly:
        "bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-emerald-200",
      Fixed:
        "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-blue-200",
      Monthly:
        "bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-purple-200",
    }[payType] ||
    "bg-gradient-to-r from-gray-500 to-gray-600 text-white shadow-gray-200");

  const getLocationStyle = (location) => {
    if (!location) return "bg-gray-50 text-gray-600 border border-gray-200";
    const l = location.toLowerCase();
    if (l.includes("remote"))
      return "bg-green-50 text-green-700 border border-green-200";
    if (l.includes("hybrid"))
      return "bg-amber-50 text-amber-700 border border-amber-200";
    return "bg-blue-50 text-blue-700 border border-blue-200";
  };

  const getJobTypeStyle = (jobType) => {
    if (!jobType) return "bg-gray-50 text-gray-600 border border-gray-200";
    return "bg-indigo-50 text-indigo-700 border border-indigo-200";
  };

  if (!data || data.length === 0)
    return (
      <div className="text-center py-16">
        <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
          <Briefcase className="w-12 h-12 text-gray-400" />
        </div>
        <h3 className="text-xl font-semibold text-gray-600 mb-2">
          No jobs available
        </h3>
        <p className="text-gray-500">Check back later for new opportunities</p>
      </div>
    );

  return (
    <div className=" bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 px-6 py-8">
      {console.log(data)}
      {/* Jobs Grid */}
      <div className="grid gap-6 rounded-xl  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {data.map((item) => (
          <div
            key={item.id}
            className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-100 hover:border-gray-200 hover:-translate-y-1"
            onClick={() => handleNavigate(item.id)}
          >
            {/* Card Header */}
            <div className="p-6 pb-4">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1 min-w-0">
                  <h2 className="font-bold text-gray-900 text-lg leading-tight mb-1 group-hover:text-[#043A53] transition-colors">
                    {item.jobTitle}
                  </h2>
                  <div className="flex items-center gap-1 text-gray-500 text-sm">
                    <Clock className="w-3 h-3" />
                    <span>Posted recently</span>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-[#043A53] transition-colors ml-2 flex-shrink-0" />
              </div>

              {/* Pay Type & Salary Badge */}
              <div className="mb-4 flex flex-wrap items-center gap-2">
                {/* Salary Range Badge */}
                <span
                  className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold shadow-sm ${getPayTypeStyle(
                    item.payType
                  )}`}
                >
                  <DollarSign className="w-3 h-3" />
                  {item.minSalaray} - {item.maxSalaray}
                </span>

                {/* Pay Type Badge */}
                <span
                  className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold shadow-sm ${getPayTypeStyle(
                    item.payType
                  )}`}
                >
                  {item.payType}
                </span>
              </div>
            </div>

            {/* Job Details */}
            <div className="px-6 pb-6 space-y-3 mb-4">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0" />
                <span
                  className={`px-2 py-1 rounded-lg text-xs font-medium ${getLocationStyle(
                    item.joblocation
                  )}`}
                >
                  {item.country || "Location TBD"},{" "}
                  {item.city || "Location TBD"}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-gray-400 flex-shrink-0" />
                <span
                  className={`px-2 py-1 rounded-lg text-xs font-medium ${getJobTypeStyle(
                    item.jobType
                  )}`}
                >
                  {item.jobType || "Full-time"}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 px-6 pb-6">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/client/jobs/${item.id}`);
                }}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 bg-gradient-to-r from-[#043A53] to-[#065f73] text-white rounded-xl font-semibold text-sm hover:from-[#032e42] hover:to-[#054d5f] transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <Eye className="w-4 h-4" /> View
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/client/edit-job/${item.id}`);
                }}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 bg-gray-100 text-gray-700 rounded-xl font-semibold text-sm hover:bg-gray-200 transition-all duration-200 border border-gray-200 hover:border-gray-300"
              >
                <Edit3 className="w-4 h-4" /> Edit
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default memo(Jobs_table);
