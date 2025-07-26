const OrderTable = ({ data }) => {
  const statusColors = {
    'IN PROGRESS': 'bg-[#1467B0]',
    PENDING: 'bg-yellow-500',
    COMPLETED: 'bg-green-600',
    'IN REVIEW': 'bg-purple-500',
    'ON HOLD': 'bg-red-500',
  };

  return (
    <div className="py-6">
      <div className="overflow-x-auto w-full">
        <div className="w-full rounded-xl">
          <table className="w-full border-separate border-spacing-y-4 border-spacing-x-0 sm:border-spacing-x-4">
            <tbody>
              {data?.map((item, index) => (
                <tr key={index}>
                  <td colSpan={6}>
                    <div className="w-full bg-[#F8F8F8] shadow-sm rounded-xl flex flex-col sm:flex-row sm:items-center justify-between px-4 py-4 gap-4">
                      {/* First Column - Images */}
                      <div className="flex items-center gap-4 sm:w-1/5 w-full">
                        <img
                          src={item.gigsImage}
                          alt="Gig"
                          className="w-full max-w-[150px] h-auto object-cover rounded-md"
                        />
                        <div className="relative w-12 h-12 rounded-full flex-shrink-0">
                          <img
                            src={item.clientImage}
                            alt="Client"
                            className="h-full w-full object-contain rounded-full"
                          />
                          <div className="absolute bottom-1 right-1 bg-green-400 w-3 h-3 rounded-full border border-white"></div>
                        </div>
                      </div>

                      {/* Second Column - Client & Title */}
                      <div className="sm:w-1/5 w-full">
                        <p className="text-[#737373] text-sm sm:text-base">
                          Client: <span className="font-semibold text-black">{item.clientName}</span>
                        </p>
                        <p className="font-semibold text-base sm:text-lg text-[#043A53] truncate">
                          {item.gigsTitle}
                        </p>
                      </div>

                      {/* Price */}
                      <div className="sm:w-1/6 w-full">
                        <p className="text-[#737373] text-sm sm:text-base">Price</p>
                        <p className="text-[#043A53] text-base sm:text-lg font-semibold">${item.price}</p>
                      </div>

                      {/* Due */}
                      <div className="sm:w-1/6 w-full">
                        <p className="text-[#737373] text-sm sm:text-base">Due in</p>
                        <p className="text-[#043A53] text-base sm:text-lg font-semibold">{item.due}</p>
                      </div>

                      {/* Status */}
                      <div className="sm:w-1/6 w-full">
                        <p className="text-[#737373] text-sm sm:text-base">Status</p>
                        <div
                          className={`flex justify-center items-center mt-2 ${
                            statusColors[item.status] || 'bg-gray-500'
                          } rounded-2xl py-1 px-3 inline-block max-w-max`}
                        >
                          <span className="text-white text-xs sm:text-sm font-semibold whitespace-nowrap">
                            {item.status}
                          </span>
                        </div>
                      </div>

                      {/* View Button */}
                      <div className="sm:w-1/6 w-full">
                        <button className="w-full h-12 sm:h-16 flex justify-center items-center mt-2 bg-[#EDEDED] rounded-2xl p-3 text-[#043A53] font-semibold hover:bg-gray-300 transition">
                          View
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
};

export default OrderTable;
