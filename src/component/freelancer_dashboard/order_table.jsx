import { useLocation, useNavigate } from "react-router-dom";

const OrderTable = ({ data }) => {
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
          {data?.length > 0 ? (
            <div className="flex flex-col gap-4">
              {data.map((item, index) => (
                <div
                  key={index}
                  className="bg-[#F8F8F8] shadow-sm rounded-xl flex flex-col sm:flex-row sm:items-center justify-between px-4 py-4 gap-4"
                >
                  {/* Image */}
                  <div className="flex items-center justify-center sm:justify-start sm:w-1/5 w-full">
                    <img
                      src={item?.gigsImage?.split(',')[0]}
                      alt="Gig"
                      className="w-full max-w-[120px] h-auto object-cover rounded-md"
                    />
                  </div>

                  {/* Gig Title */}
                  <div className="sm:w-1/5 w-full">
                    <p className="text-[#737373] text-sm">Gig Name</p>
                    <p className="font-semibold text-base text-[#043A53] truncate">
                      {item.gigsTitle}
                    </p>
                  </div>

                  {/* Package Type */}
                  <div className="sm:w-1/5 w-full">
                    <p className="text-[#737373] text-sm">Package Type</p>
                    <p className="capitalize font-semibold text-base text-[#043A53] truncate">
                      {item.package_type}
                    </p>
                  </div>

                  {/* Price */}
                  <div className="sm:w-1/6 w-full">
                    <p className="text-[#737373] text-sm">Price</p>
                    <p className="text-[#043A53] text-base font-semibold">
                      ${item.base_price}
                    </p>
                  </div>

                  {/* Status */}
                  <div className="sm:w-1/6 w-full">
                    <p className="text-[#737373] text-sm">Status</p>
                    <div
                      className={`flex justify-center items-center mt-2 ${
                        statusColors[item.status] || 'bg-gray-500'
                      } rounded-2xl py-1 px-3 inline-block max-w-max`}
                    >
                      <span className="capitalize text-white text-xs font-semibold whitespace-nowrap">
                        {item.status}
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
              ))}
            </div>
          ) : (
            <p className="text-center text-sm text-gray-600">No records found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderTable;
