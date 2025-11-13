import { useNavigate, useLocation } from "react-router-dom";
import { formatDate } from "../../../functions/timeFormat";
import { memo } from "react";
import { Edit, Eye, Calendar, DollarSign, Tag } from "lucide-react";

function Projects_table({ data = [] }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const handleNavigate = (id) => {
    if (pathname.includes("client")) {
      navigate(`/client/projects/${id}`);
    } else if (pathname.includes("freelancer")) {
      navigate(`/freelancer/projects/${id}`);
    } else {
      navigate(`/browse-projects/${id}`);
    }
  };

  return (
    <div className="px-4 sm:px-6 md:px-8 py-8 bg-gradient-to-br from-slate-50 to-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.length > 0 ? (
          data.map((item, index) => (
            <div
              key={item.id}
              onClick={() => handleNavigate(item?.id)}
              className="group bg-white rounded-2xl shadow-md hover:shadow-lg hover:-translate-y-1 border border-gray-100 transition-all duration-200 overflow-hidden cursor-pointer"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-[#47AAB3] to-[#3183a1]  p-5 relative">
                <div className="flex items-center gap-3">
                  <span className="bg-white text-[#155E78] font-semibold text-xs px-2 py-1 rounded-full">
                    {index + 1}
                  </span>
                </div>
                <h3 className="mt-3 text-white font-bold text-lg leading-tight line-clamp-2">
                  {item?.title || "Untitled Project"}
                </h3>
              </div>

              {/* Card Content */}
              <div className="p-5 space-y-4">
                {/* Category */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                    <Tag className="w-5 h-5 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-gray-500 font-medium">Category</p>
                    <p className="inline-block mt-1 px-3 py-1 text-xs font-semibold bg-purple-50 text-purple-800 rounded-full border border-purple-100">
                      {item?.category || "N/A"}
                    </p>
                  </div>
                </div>

                {/* Budget */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                    <DollarSign className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-gray-500 font-medium">Budget</p>
                    <p className="text-lg font-semibold text-[#155E78] mt-1">
                      {item?.budget ? `$${item.budget}` : "Negotiable"}
                    </p>
                  </div>
                </div>

                {/* Deadline */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-orange-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-gray-500 font-medium">Deadline</p>
                    <p className="text-sm font-semibold text-gray-700 mt-1">
                      {item?.deadline ? formatDate(item.deadline) : "Not set"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="px-5 pb-5 flex flex-col sm:flex-row gap-3">
                {pathname.includes("client") && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/client/edit-project/${item?.id}`);
                    }}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-[#155E78] text-sm font-medium rounded-lg transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                    Edit
                  </button>
                )}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNavigate(item?.id);
                  }}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[#47AAB3] to-[#155E78] hover:from-[#36959E] hover:to-[#2A7A84] text-white text-sm font-medium rounded-lg transition-all"
                >
                  <Eye className="w-4 h-4" />
                  View
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center py-20 text-gray-500">
            <p className="text-lg font-semibold mb-2">No projects found</p>
            <p className="text-sm text-gray-400">
              Try creating a new project or checking back later.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default memo(Projects_table);
