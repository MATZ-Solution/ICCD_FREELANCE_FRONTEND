import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import order_logo from '../../assets/freelancer_dashboard/order_logo.png';
import { useGetOrderByFreelancer } from "../../../api/client/order";
import ICCDLoader from "../../component/loader";
import ICCDError from "../../component/ICCDError";
import OrderModal from "../../component/OrderModal";
import { SearchIcon } from "lucide-react";

function Orders() {
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [deliveredOrders, setDeliveredOrders] = useState([]);

  const { data, error, isLoading, isError } = useGetOrderByFreelancer({ search });
  const pathName = useLocation().pathname;
  const navigate = useNavigate();

  const handleView = (id) => {
    if (pathName.includes("freelancer")) {
      navigate(`/freelancer/orders/${id}`);
    }
  };

  const handleDeliver = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  const handleConfirmDelivery = () => {
    setDeliveredOrders((prev) => [...prev, selectedOrder?.id]);
    handleCloseModal();
  };

  const statusColors = {
    "IN PROGRESS": "bg-[#1467B0]",
    pending: "bg-yellow-500",
    paid: "bg-green-600",
    "IN REVIEW": "bg-purple-500",
    "ON HOLD": "bg-red-500",
  };

  const renderStatus = (status) => {
    const colorClass = statusColors[status] || 'bg-gray-500';
    return (
      <div className={`flex justify-center items-center ${colorClass} rounded-2xl py-1 px-3 max-w-max`}>
        <span className="capitalize text-white text-xs font-semibold whitespace-nowrap">{status}</span>
      </div>
    );
  };

  return (
    <div className="px-4 sm:px-6">
      <div className="mt-6 overflow-x-auto rounded-md border-gray-200">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Manage Orders</h1>
          <div className="relative w-full sm:w-auto sm:min-w-[300px]">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-10 pl-3 pr-10 rounded-md border border-gray-300 bg-white text-sm placeholder-gray-400"
              placeholder="Search My History..."
            />
            <SearchIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        {isLoading ? (
          <ICCDLoader />
        ) : isError || error ? (
          <ICCDError />
        ) : !data || data.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 text-center text-gray-500">
            <svg className="w-12 h-12 mb-3 text-gray-300" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12A9 9 0 113 12a9 9 0 0118 0z" />
            </svg>
            <p className="text-sm font-medium">No Orders found</p>
          </div>
        ) : (
          <div className="py-6 px-4">
            <div className="flex flex-col gap-4">
              {data.map((item) => (
                <div key={item.id} className="bg-[#F8F8F8] shadow-sm rounded-xl p-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div className="flex justify-center md:justify-start w-full md:w-[15%]">
                    <img
                      src={item?.gigsImage?.split(',')[0] || order_logo}
                      alt="Gig"
                      className="w-36 h-20 object-contain"
                      onError={(e) => (e.target.src = order_logo)}
                    />
                  </div>
                  <div className="w-full md:w-[15%]">
                    <p className="text-[#737373] text-sm">Gig Name</p>
                    <p className="text-[#043A53] font-semibold text-base truncate">{item.gigsTitle}</p>
                  </div>
                  <div className="w-full md:w-[15%]">
                    <p className="text-[#737373] text-sm">Package Type</p>
                    <p className="text-[#043A53] font-semibold text-base truncate">{item.package_type?.toLowerCase()}</p>
                  </div>
                  <div className="w-full md:w-[15%]">
                    <p className="text-[#737373] text-sm">Price</p>
                    <p className="text-[#043A53] font-semibold text-base truncate">${item.base_price}</p>
                  </div>
                  <div className="w-full md:w-[15%]">
                    <p className="text-[#737373] text-sm">Status</p>
                    <div className="mt-2">{renderStatus(item.status)}</div>
                  </div>
                  <div className="w-full md:w-[25%] flex flex-col md:flex-row gap-2 justify-center md:justify-end">
                    <button
                      onClick={() => handleView(item.id)}
                      className="h-12 bg-[#EDEDED] rounded-2xl px-6 py-3 flex justify-center items-center"
                    >
                      <p className="text-[#043A53] font-semibold">View</p>
                    </button>
                    {deliveredOrders.includes(item.id) ? (
                      <div className="h-12 bg-yellow-500 rounded-2xl px-6 py-3 flex justify-center items-center text-white">
                        <p className="font-semibold text-sm text-center">Waiting for client approval</p>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleDeliver(item)}
                        className="h-12 bg-[#3DBF07] rounded-2xl px-6 py-3 flex justify-center items-center text-white"
                      >
                        <p className="font-semibold">Deliver</p>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Deliver Modal */}
      {isModalOpen && (
        <OrderModal onClose={handleCloseModal}>
          <h2 className="text-xl font-bold mb-4">Mark Order as Delivered?</h2>
          <p className="text-gray-600 mb-6">
            Are you sure you want to mark order <strong>{selectedOrder?.gigsTitle}</strong> as delivered?
          </p>
          <div className="flex justify-end gap-4">
            <button onClick={handleCloseModal} className="px-4 py-2 bg-gray-300 rounded-md">Cancel</button>
            <button
              onClick={handleConfirmDelivery}
              className="px-4 py-2 bg-[#3DBF07] text-white rounded-md"
            >
              Yes, Deliver
            </button>
          </div>
        </OrderModal>
      )}
    </div>
  );
}

export default Orders;