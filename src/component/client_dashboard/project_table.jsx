import { useNavigate, useLocation } from 'react-router-dom';
import { formatDate } from '../../../functions/timeFormat';
import { memo } from 'react';
import { Edit, Eye, Calendar, DollarSign, Tag } from 'lucide-react';

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

  const getProjectAvatar = (title) => {
    const colors = [
      'bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-red-500', 
      'bg-yellow-500', 'bg-indigo-500', 'bg-pink-500', 'bg-teal-500'
    ];
    const colorIndex = title ? title.length % colors.length : 0;
    const initials = title ? title.split(' ').slice(0, 2).map(word => word[0]).join('').toUpperCase() : 'P';
    
    return (
      <div className={`w-16 h-16 ${colors[colorIndex]} rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg`}>
        {initials}
      </div>
    );
  };

  return (
    <div className="px-6 py-8 bg-gradient-to-br from-slate-50 to-gray-100 min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((item, index) => (
          <div
            key={item.id}
            className="group bg-white rounded-3xl shadow-lg hover:shadow-xl transition-all duration-200 overflow-hidden border border-gray-100 cursor-pointer"
            onClick={() => handleNavigate(item?.id)}
          >
            {/* Card Header */}
            <div className="bg-gradient-to-br from-[#6FCAD3] to-[#155E78]
 p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"></div>
              
              <div className="relative flex items-center gap-4">
                {getProjectAvatar(item?.title)}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-white/70 text-xs font-medium">Project #{index + 1}</span>
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  </div>
                  <h3 className="text-white font-bold text-lg leading-tight line-clamp-2">
                    {item?.title}
                  </h3>
                </div>
              </div>
            </div>

            {/* Card Body */}
            <div className="p-6 space-y-4">
              {/* Category */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                  <Tag className="w-5 h-5 text-purple-600" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-gray-500 font-medium">Category</p>
                  <span className="inline-flex px-3 py-1 mt-1 rounded-full text-xs font-semibold bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 border border-purple-200">
                    {item?.category}
                  </span>
                </div>
              </div>

              {/* Budget */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-gray-500 font-medium">Budget</p>
                  <p className="text-lg font-bold text-[#043A53] bg-gradient-to-r from-green-100 to-emerald-100 px-3 py-1 rounded-lg inline-block mt-1">
                    {item?.budget}
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
                  <p className="text-sm font-semibold text-gray-700 mt-1">{formatDate(item?.deadline)}</p>
                </div>
              </div>
            </div>

            {/* Card Footer */}
            <div className="px-6 pb-6 flex gap-3">
              {pathname.includes('client') && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/client/edit-project/${item?.id}`);
                  }}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 hover:bg-gray-200 rounded-xl text-[#043A53] text-sm font-semibold transition-all duration-200"
                >
                  <Edit className="w-4 h-4" />
                  <span>Edit</span>
                </button>
              )}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNavigate(item?.id);
                }}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-[#47AAB3] to-[#36959e] hover:from-[#36959e] hover:to-[#2a7a84] rounded-xl text-white text-sm font-semibold transition-all duration-200"
              >
                <Eye className="w-4 h-4" />
                <span>View</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default memo(Projects_table);