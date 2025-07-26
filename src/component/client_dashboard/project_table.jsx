import order_logo from '../../assets/freelancer_dashboard/order_logo.png';
import { useNavigate, useLocation } from 'react-router-dom';
import { formatDate } from '../../../functions/timeFormat';

function Projects_table({ data }) {
  const pathName = useLocation().pathname;
  const navigate = useNavigate();

  const handleNavigate = (id) => {
    if (pathName.includes('client')) {
      navigate(`/client/projects/${id}`);
    } else {
      navigate(`/freelancer/projects/${id}`);
    }
  };

  return (
    <div className="py-6 px-4">
      <div className="overflow-x-auto w-full">
        <div className="min-w-full rounded-xl">
          <table className="w-full border-separate border-spacing-y-4 border-spacing-x-4">
            <tbody>
              {data.map((item) => (
                <tr key={item.id}>
                  <td colSpan={6}>
                    <div
                      className="
                        w-full bg-[#F8F8F8] shadow-sm rounded-xl
                        flex flex-col gap-3 px-4 py-4
                        cursor-pointer
                        md:flex-row md:items-center md:justify-between md:gap-4 md:min-w-[1000px]
                      "
                      // Uncomment below if you want entire row clickable
                      // onClick={() => handleNavigate(item?.id)}
                    >
                      {/* First Column: Image */}
                      <div className="flex items-center gap-5 w-full md:w-[20%] justify-center md:justify-start">
                        <img
                          src={item?.projectFiles || order_logo}
                          alt={item?.title}
                          className="w-40 h-20 object-contain"
                          onError={(e) => (e.target.src = order_logo)}
                        />
                      </div>

                      {/* Second Column: Project Name */}
                      <div className="w-full md:w-[20%]">
                        <p className="text-[#737373] text-sm md:text-base">Project Name:</p>
                        <p className="font-semibold text-lg text-[#043A53] truncate">{item?.title}</p>
                      </div>

                      {/* Budget */}
                      <div className="w-full md:w-[15%]">
                        <p className="text-[#737373] text-sm md:text-base">Budget</p>
                        <p className="text-[#043A53] text-lg font-semibold">{item?.budget}</p>
                      </div>

                      {/* Deadline */}
                      <div className="w-full md:w-[15%]">
                        <p className="text-[#737373] text-sm md:text-base">Deadline</p>
                        <p className="text-[#043A53] text-lg font-semibold">{formatDate(item?.deadline)}</p>
                      </div>

                      {/* Category */}
                      <div className="w-full md:w-[15%]">
                        <p className="text-[#737373] text-sm md:text-base">Category</p>
                        <p className="text-[#043A53] text-lg font-semibold">{item?.category}</p>
                      </div>

                      {/* Buttons */}
                      <div className="w-full md:w-[15%] flex flex-col gap-2 mt-2 md:mt-0">
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
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Projects_table;
