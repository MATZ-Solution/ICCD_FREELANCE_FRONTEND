import { useLocation, useNavigate } from "react-router-dom";

const OrderTable = ({ data }) => {

  console.log("data: ", data)
    const pathName = useLocation().pathname;
    const navigate = useNavigate();
  
  const statusColors = {
    'IN PROGRESS': 'bg-[#1467B0]',
    'pending': 'bg-yellow-500',
    'paid': 'bg-green-600',
    'IN REVIEW': 'bg-purple-500',
    'ON HOLD': 'bg-red-500',
  };

    const handleNavigate = (id) => {
    if (pathName.includes('freelancer')) {
      navigate(`/freelancer/orders/${id}`);
    } 
  };

  return (
    <div className="py-6">
      <div className="overflow-x-auto w-full">
        <div className="w-full rounded-xl">
          {data?.length > 0 ?
            <table className="w-full border-separate border-spacing-y-4 border-spacing-x-0 sm:border-spacing-x-4">
              <tbody>
                {data?.map((item, index) => (
                  <tr key={index}>
                    <td colSpan={6}>
                      <div className="w-full bg-[#F8F8F8] shadow-sm rounded-xl flex flex-col sm:flex-row sm:items-center justify-between px-4 py-4 gap-4">
                        {/* First Column - Images */}
                        <div className="flex items-center gap-4 sm:w-1/5 w-full">
                          <img
                            src={item?.gigsImage?.split(',')[0]}
                            alt="Gig"
                            className="w-full max-w-[150px] h-auto object-cover rounded-md"
                          />
                          {/* <div className="relative w-12 h-12 rounded-full flex-shrink-0">
                          <img
                            src={item.clientImage}
                            alt="Client"
                            className="h-full w-full object-contain rounded-full"
                          />
                          <div className="absolute bottom-1 right-1 bg-green-400 w-3 h-3 rounded-full border border-white"></div>
                        </div> */}
                        </div>

                        {/* Second Column - Client & Title */}
                        <div className="sm:w-1/5 w-full">
                          {/* <p className="text-[#737373] text-sm sm:text-base">
                          Client: <span className="font-semibold text-black">{item.clientName}</span>
                        </p> */}
                          <p className="text-[#737373] text-sm sm:text-base">Gig Name</p>
                          <p className="font-semibold text-base sm:text-lg text-[#043A53] truncate">
                            {item.gigsTitle}
                          </p>
                        </div>

                        <div className="sm:w-1/5 w-full">
                          {/* <p className="text-[#737373] text-sm sm:text-base">
                          Client: <span className="font-semibold text-black">{item.clientName}</span>
                        </p> */}
                          <p className="text-[#737373] text-sm sm:text-base">Package Type</p>
                          <p className="capitalize font-semibold text-base sm:text-lg text-[#043A53] truncate">
                            {item.package_type}
                          </p>
                        </div>

                        {/* Price */}
                        <div className="sm:w-1/6 w-full">
                          <p className="text-[#737373] text-sm sm:text-base">Price</p>
                          <p className="text-[#043A53] text-base sm:text-lg font-semibold">${item.base_price}</p>
                        </div>

                        {/* Due */}
                        {/* <div className="sm:w-1/6 w-full">
                        <p className="text-[#737373] text-sm sm:text-base">Due in</p>
                        <p className="text-[#043A53] text-base sm:text-lg font-semibold">{item.due}</p>
                      </div> */}

                        {/* Status */}
                        <div className="sm:w-1/6 w-full">
                          <p className="text-[#737373] text-sm sm:text-base">Status</p>
                          <div
                            className={`flex justify-center items-center mt-2 ${statusColors[item.status] || 'bg-gray-500'
                              } rounded-2xl py-1 px-3 inline-block max-w-max`}
                          >
                            <span className="capitalize text-white text-xs sm:text-sm font-semibold whitespace-nowrap">
                              {item?.status}
                            </span>
                          </div>
                        </div>

                        {/* View Button */}
                        <div className="sm:w-1/6 w-full">
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
            :
            <p>No records Found</p>
          }

        </div>
      </div>
    </div>
  );
};

export default OrderTable;
