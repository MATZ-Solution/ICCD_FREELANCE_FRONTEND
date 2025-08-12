import order_logo from '../../assets/freelancer_dashboard/order_logo.png';
import { useNavigate, useLocation } from 'react-router-dom';
import { formatDate } from '../../../functions/timeFormat';
import { memo } from 'react';

function Projects_table({ data }) {
  const pathName = useLocation().pathname;
  const navigate = useNavigate();

  const handleNavigate = (id) => {
    if (pathName.includes('client')) {
      navigate(`/client/projects/${id}`);
    } else if(pathName.includes('freelancer')) {
      navigate(`/freelancer/projects/${id}`);
    }else{
      navigate(`/browse-projects/${id}`);

    }
  };

  return (
    <div className="py-6 px-4">
      <div className="overflow-x-auto w-full">
        <div className="flex flex-col gap-4">
          {data.map((item) => (
            <div
              key={item.id}
              className="bg-[#F8F8F8] shadow-sm rounded-xl p-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between cursor-pointer"
            >
              {/* Image */}
              <div className="flex justify-center md:justify-start w-full md:w-[20%]">
                <img
                  src={item?.projectFiles || order_logo}
                  alt={item?.title}
                  className="w-36 h-20 object-contain"
                  onError={(e) => (e.target.src = order_logo)}
                />
              </div>

              {/* Project Name */}
              <div className="w-full md:w-[20%]">
                <p className="text-[#737373] text-sm">Project Name:</p>
                <p className="font-semibold text-base text-[#043A53] truncate">{item?.title}</p>
              </div>

              {/* Budget */}
              <div className="w-full md:w-[15%]">
                <p className="text-[#737373] text-sm">Budget</p>
                <p className="text-[#043A53] text-base font-semibold">{item?.budget}</p>
              </div>

              {/* Deadline */}
              <div className="w-full md:w-[15%]">
                <p className="text-[#737373] text-sm">Deadline</p>
                <p className="text-[#043A53] text-base font-semibold">{formatDate(item?.deadline)}</p>
              </div>

              {/* Category */}
              <div className="w-full md:w-[15%]">
                <p className="text-[#737373] text-sm">Category</p>
                <p className="text-[#043A53] text-base font-semibold">{item?.category}</p>
              </div>

              {/* Buttons */}
              <div className="w-full md:w-[25%] flex flex-col md:flex-row gap-2">
                {pathName.includes('client') && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/client/edit-project/${item?.id}`);
                    }}
                    className="w-full h-12 bg-[#EDEDED] rounded-2xl p-3 flex justify-center items-center"
                  >
                    <p className="text-[#043A53] font-semibold">Edit</p>
                  </button>
                )}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNavigate(item?.id);
                  }}
                  className="w-full h-12 bg-[#EDEDED] rounded-2xl p-3 flex justify-center items-center"
                >
                  <p className="text-[#043A53] font-semibold">View</p>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default memo(Projects_table);
