import order_logo from '../../assets/freelancer_dashboard/order_logo.png';
import { useNavigate, useLocation } from 'react-router-dom';
import { formatDate } from '../../../functions/timeFormat';
import { memo } from 'react';

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

  return (
    <div className="py-6 px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {data.map((item) => (
          <div
            key={item.id}
            className="bg-white shadow-md rounded-2xl overflow-hidden cursor-pointer hover:shadow-lg transition"
          >
            {/* Project Image */}
            <div className="w-full h-48 bg-gray-100 flex justify-center items-center">
              <img
                src={item?.projectFiles || order_logo}
                alt={item?.title}
                className="object-contain w-full h-full"
                onError={(e) => (e.target.src = order_logo)}
              />
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
