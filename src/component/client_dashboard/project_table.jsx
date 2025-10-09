import { useNavigate, useLocation } from 'react-router-dom';
import { formatDate } from '../../../functions/timeFormat';
import { memo } from 'react';
import { Edit, Eye } from 'lucide-react';


function Projects_table({ data }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const handleNavigate = (id) => {
    if (pathname.includes('client')) {
      navigate(`/client/projects/${id}`);
    } else if (pathname.includes('freelancer')) {
      navigate(`/freelancer/projects/${id}`);
    } else {
      navigate(`/browse-projects/${id}`);
    }
  };

  // Generate a simple project avatar based on title
  const getProjectAvatar = (title) => {
    const colors = [
      'bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-red-500', 
      'bg-yellow-500', 'bg-indigo-500', 'bg-pink-500', 'bg-teal-500'
    ];
    const colorIndex = title ? title.length % colors.length : 0;
    const initials = title ? title.split(' ').slice(0, 2).map(word => word[0]).join('').toUpperCase() : 'P';
    
    return (
      <div className={`w-16 h-16 ${colors[colorIndex]} rounded-4xl flex items-center justify-center text-white font-semibold text-sm`}>
        {initials}
      </div>
    );
  };

  return (
    <div className=" px-6 bg-gradient-to-br from-slate-50 to-gray-100">
      {/* Desktop Table View (lg and above) */}
      <div className="hidden lg:block">
        <div className="bg-white/70 backdrop-blur-sm shadow-xl border border-white/20 rounded-3xl overflow-hidden">
          {/* Modern Header */}
       

          <table className="w-full">
            <thead className="bg-gradient-to-r from-gray-50/80 to-slate-50/80 backdrop-blur-sm border-b border-gray-200/50">
              <tr>
                <th className="px-8 py-5 text-left text-xs font-bold text-[#043A53] uppercase tracking-wider">Project</th>
                <th className="px-8 py-5 text-left text-xs font-bold text-[#043A53] uppercase tracking-wider">Category</th>
                <th className="px-8 py-5 text-left text-xs font-bold text-[#043A53] uppercase tracking-wider">Budget</th>
                <th className="px-8 py-5 text-left text-xs font-bold text-[#043A53] uppercase tracking-wider">Deadline</th>
                <th className="px-8 py-5 text-center text-xs font-bold text-[#043A53] uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200/30 bg-white/40">
              {data.map((item, index) => (
                <tr 
                  key={item.id} 
                  className="group hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-cyan-50/50 transition-all duration-300 cursor-pointer hover:shadow-lg hover:scale-[1.01] hover:-translate-y-1"
                  onClick={() => handleNavigate(item?.id)}
                >
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        {getProjectAvatar(item?.title)}
                        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 border-2 border-white rounded-full"></div>
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-[#043A53] truncate max-w-xs group-hover:text-[#47AAB3] transition-colors">
                          {item?.title}
                        </h3>
                        <p className="text-xs text-gray-500 mt-0.5">Project #{index + 1}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 border border-purple-200">
                      {item?.category}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    <span className="text-sm font-bold text-[#043A53] bg-gradient-to-r from-green-100 to-emerald-100 px-3 py-1 rounded-lg">
                      {item?.budget}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
                      <span className="text-sm text-gray-700 font-medium">{formatDate(item?.deadline)}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex gap-3 justify-center">
                      {pathname.includes('client') && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/client/edit-project/${item?.id}`);
                          }}
                          className="group/btn relative px-4 py-2 bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 rounded-xl text-[#043A53] text-sm font-semibold transition-all duration-300 hover:shadow-lg hover:scale-105 border border-gray-300/50"
                        >
                          <span className="relative z-10"> Edit</span>
                          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl opacity-0 group-hover/btn:opacity-100 transition-opacity"></div>
                        </button>
                      )}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleNavigate(item?.id);
                        }}
                        className="group/btn relative px-4 py-2 bg-gradient-to-r from-[#47AAB3] to-[#36959e] hover:from-[#36959e] hover:to-[#2a7a84] rounded-xl text-white text-sm font-semibold transition-all duration-300 hover:shadow-xl hover:scale-105 border border-[#47AAB3]/30"
                      >
                        <span className="relative z-10"> View</span>
                        <div className="absolute inset-0 bg-white/20 rounded-xl opacity-0 group-hover/btn:opacity-100 transition-opacity"></div>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile/Tablet Card View (below lg) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 lg:hidden">
        {data.map((item) => (
          <div
            key={item.id}
            className="bg-white shadow-md rounded-2xl overflow-hidden cursor-pointer hover:shadow-lg transition"
            onClick={() => handleNavigate(item?.id)}
          >
            {/* Project Avatar */}
            <div className="w-full h-32 bg-gray-50 flex justify-center items-center">
              {getProjectAvatar(item?.title)}
            </div>

            {/* Project Details */}
            <div className="p-4 flex flex-col gap-2">
              <h2 className="text-lg font-semibold text-[#043A53] truncate">{item?.title}</h2>
              <p className="text-sm text-gray-500">{item?.category}</p>
              <p className="text-sm text-gray-500">Budget: <span className="font-semibold">{item?.budget}</span></p>
              <p className="text-sm text-gray-500">Deadline: <span className="font-semibold">{formatDate(item?.deadline)}</span></p>

              {pathname.includes('client') && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/client/edit-project/${item?.id}`);
                  }}
                  className="mt-3 w-full py-2 bg-gray-200 rounded-xl text-[#043A53] font-semibold hover:bg-gray-300 transition"
                >
                   Edit
                </button>
              )}

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNavigate(item?.id);
                }}
                className="mt-2 w-full py-2 bg-[#47AAB3] rounded-xl text-white font-semibold hover:bg-[#36959e] transition"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default memo(Projects_table);