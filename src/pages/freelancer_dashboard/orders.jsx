import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import order_logo from "../../assets/freelancer_dashboard/order_logo.png";
import { useGetOrderByFreelancer } from "../../../api/client/order";
import ICCDLoader from "../../component/loader";
import ICCDError from "../../component/ICCDError";
import OrderModal from "../../component/OrderModal";
import { Search, MoreVertical, Eye, Package, DollarSign } from "lucide-react";
import { CheckCircle, AlertTriangle, Clock, Star } from "lucide-react";
import { DisputeModal } from "../../component/client_order/DisputeModal";
import ReviewModal from "../../component/ReviewModal";
import textSlicer from "../../../functions/textSlicer";

function Orders() {
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [modalType, setModalType] = useState(""); // "deliver" | "dispute"
  const [deliveredOrders, setDeliveredOrders] = useState([]);
  const [disputedOrders, setDisputedOrders] = useState([]);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [showDisputeModal, setShowDisputeModal] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [showReviewModal, setShowReviewModal] = useState(false);

  const { data, error, isLoading, isError } = useGetOrderByFreelancer({
    search,
  });
  const pathName = useLocation().pathname;
  const navigate = useNavigate();

  const handleView = (id) => {
    if (pathName.includes("freelancer")) {
      navigate(`/freelancer/orders/${id}`);
    }
  };

  const handleDisputeSubmit = (disputeData) => {
    setShowDisputeModal(false);
    setDisputedOrders((prev) => [...prev, selectedOrderId]);
    console.log("Dispute submitted:", {
      orderId: selectedOrderId,
      ...disputeData,
    });
    alert("Dispute has been raised successfully!");
  };

  const handleReviewSubmit = (reviewData) => {
    setShowReviewModal(false);
    console.log("Review submitted:", {
      orderId: selectedOrder?.id,
      ...reviewData,
    });
    alert("Thank you for your review!");
    setSelectedOrder(null);
  };

  const handleAction = (order, type) => {
    console.log("📦 Full order object:", order);
    setSelectedOrder(order);
    setModalType(type);
    setIsModalOpen(true);
    setOpenMenuId(null);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
    setModalType("");
  };

  const handleConfirmAction = () => {
    if (modalType === "deliver") {
      console.log("Order marked as delivered:", selectedOrder?.id);
      setDeliveredOrders((prev) => [...prev, selectedOrder?.id]);
      setShowReviewModal(true);
    } else if (modalType === "dispute") {
      setSelectedOrderId(selectedOrder?.id);
      setShowDisputeModal(true);
    }
    handleCloseModal();
  };

  const statusConfig = {
    "IN PROGRESS": {
      bg: "bg-gradient-to-r from-blue-500 to-blue-600",
      icon: Clock,
      text: "text-blue-50",
      pulse: true,
    },
    pending: {
      bg: "bg-gradient-to-r from-amber-400 to-amber-500",
      icon: Clock,
      text: "text-amber-50",
    },
    paid: {
      bg: "bg-gradient-to-r from-emerald-500 to-emerald-600",
      icon: CheckCircle,
      text: "text-emerald-50",
    },
    "IN REVIEW": {
      bg: "bg-gradient-to-r from-purple-500 to-purple-600",
      icon: Star,
      text: "text-purple-50",
    },
    "ON HOLD": {
      bg: "bg-gradient-to-r from-red-500 to-red-600",
      icon: AlertTriangle,
      text: "text-red-50",
    },
  };

  const renderStatus = (status) => {
    const config = statusConfig[status] || {
      bg: "bg-gradient-to-r from-gray-500 to-gray-600",
      icon: Clock,
      text: "text-gray-50",
    };
    const IconComponent = config.icon;

    return (
      <div
        className={`flex items-center gap-2 ${config.bg
          } rounded-full py-2 px-4 max-w-max shadow-sm ${config.pulse ? "animate-pulse" : ""
          }`}
      >
        <IconComponent className={`w-3 h-3 ${config.text}`} />
        <span
          className={`capitalize ${config.text} text-xs font-semibold whitespace-nowrap`}
        >
          {status}
        </span>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Fixed Header */}
        <div className="bg-gradient-to-r from-[#44A4AD] via-[#36969E] to-[#1E7B82] backdrop-blur-sm rounded-2xl p-6 mb-8 shadow-xl border border-white/30 relative overflow-hidden">
          {/* Background pattern overlay */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-4 right-4 w-32 h-32 bg-white rounded-full blur-2xl"></div>
            <div className="absolute bottom-4 left-4 w-24 h-24 bg-white rounded-full blur-xl"></div>
          </div>

          <div className="relative z-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 shadow-lg">
                <Package className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-white mb-1">
                  Manage Orders
                </h1>
                <p className="text-white/80 text-sm">
                  Track and manage all your active orders
                </p>
              </div>
            </div>

            <div className="relative w-full lg:w-auto lg:min-w-[350px]">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-slate-400" />
              </div>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search orders, gigs, or clients..."
                className="w-full h-12 pl-12 pr-4 rounded-xl border-0 bg-white/90 backdrop-blur-sm shadow-lg ring-1 ring-white/20 placeholder-slate-400 text-slate-900 focus:ring-2 focus:ring-white/40 focus:bg-white transition-all duration-200"
              />
            </div>
          </div>
        </div>

        {/* Orders Content */}
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <ICCDLoader />
          </div>
        ) : isError || error ? (
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <ICCDError />
          </div>
        ) : !data || data.length === 0 ? (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-12 text-center shadow-lg border border-white/20">
            <div className="bg-gradient-to-br from-slate-100 to-slate-200 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
              <Package className="w-10 h-10 text-slate-400" />
            </div>
            <h3 className="text-xl font-semibold text-slate-700 mb-2">
              No Orders Found
            </h3>
            <p className="text-slate-500">
              You don't have any orders yet. Start promoting your gigs!
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm bg-white">
            <table className="min-w-full text-sm text-left">
              {/* Table Header */}
              <thead className="bg-gradient-to-r from-slate-100 to-slate-200 text-slate-700 text-xs uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-4 font-semibold">Image</th>
                  <th className="px-6 py-4 font-semibold">Gig Details</th>
                  <th className="px-6 py-4 font-semibold">Package</th>
                  <th className="px-6 py-4 font-semibold">Price</th>
                  <th className="px-6 py-4 font-semibold">Status</th>
                  <th className="px-6 py-4 font-semibold text-center">Actions</th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody className="divide-y divide-slate-100">
                {data?.map((item, index) => {
                  const isCompleted = item.status === "completed";
                  const isDisputed = item.status === "disputed";

                  return (
                    <tr
                      key={item.id}
                      className={`transition-all duration-200 hover:bg-slate-50 ${index % 2 === 0 ? "bg-white" : "bg-slate-50/30"
                        }`}
                    >
                      {/* Image */}
                      <td className="px-6 py-4">
                        <div className="relative w-28 h-20 rounded-lg overflow-hidden shadow-md group">
                          <img
                            src={item?.gigsImage?.split(",")[0] || order_logo}
                            alt="Gig"
                            onError={(e) => (e.target.src = order_logo)}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      </td>

                      {/* Gig Details */}
                      <td className="px-6 py-4 ">
                        <div className="font-medium text-slate-800 line-clamp-2 mb-1">
                          {textSlicer(item?.gigsTitle, 40)}
                          {/* {item.gigsTitle.length > 0 ? item?.gigsTitle?.slice(0,40) + "..." : item.gigsTitle} */}
                        </div>
                        {/* <div className="text-slate-500 text-xs">
                          {item.category || "No category"}
                        </div> */}
                      </td>

                      {/* Package */}
                      <td className="px-6 py-4 text-slate-600 capitalize text-sm">
                        {item.package_type?.toLowerCase()} Package
                      </td>

                      {/* Order Value */}
                      <td className="px-6 py-4 font-semibold">
                        <span className="bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent text-lg">
                          ${item.base_price}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="px-6 py-4">
                        {isCompleted ? (
                          <span className="inline-flex items-center gap-1.5 text-emerald-600 bg-emerald-50 border border-emerald-100 px-3 py-1 rounded-lg text-xs font-medium">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="w-3.5 h-3.5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth="2"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                            Completed
                          </span>
                        ) : isDisputed ? (
                          <span className="inline-flex items-center gap-1.5 text-red-600 bg-red-50 border border-red-100 px-3 py-1 rounded-lg text-xs font-medium">
                            ⚠️ Disputed
                          </span>
                        ) : (
                          renderStatus(item.status)
                        )}
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4 text-center">
                        <div className="flex justify-center gap-2">
                          <button
                            onClick={() => handleView(item.id)}
                            className="text:sm bg-gradient-to-r from-blue-500 to-blue-600 hover:shadow-lg text-white px-4 py-1.5 rounded-xl font-medium transition-all duration-200 sm:text-base"
                          >
                            View
                          </button>
                          {/* <button
                            onClick={() =>
                              setOpenMenuId(openMenuId === item.id ? null : item.id)
                            }
                            className="bg-slate-100 hover:bg-slate-200 text-slate-600 px-3 py-1.5 rounded-xl text-xs font-medium transition-colors duration-200"
                          >
                            More
                          </button> */}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Order Modal */}
      {isModalOpen && (
        <OrderModal onClose={handleCloseModal}>
          <div className="text-center">
            <div
              className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${modalType === "deliver" ? "bg-emerald-100" : "bg-red-100"
                }`}
            >
              {modalType === "deliver" ? (
                <CheckCircle className="w-8 h-8 text-emerald-600" />
              ) : (
                <AlertTriangle className="w-8 h-8 text-red-600" />
              )}
            </div>
            <h2 className="text-2xl font-bold mb-2 text-slate-800">
              {modalType === "deliver"
                ? "Mark Order as Delivered?"
                : "Raise Dispute"}
            </h2>
            <p className="text-slate-600 mb-8 leading-relaxed">
              {modalType === "deliver" ? (
                <>
                  Are you sure you want to mark order{" "}
                  <strong className="text-slate-800">
                    {selectedOrder?.gigsTitle}
                  </strong>{" "}
                  as delivered?
                </>
              ) : (
                <>
                  Do you really want to raise a dispute for order{" "}
                  <strong className="text-slate-800">
                    {selectedOrder?.gigsTitle}
                  </strong>
                  ?
                </>
              )}
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleCloseModal}
                className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-medium transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmAction}
                className={`px-6 py-3 rounded-xl text-white font-medium transition-all duration-200 transform hover:scale-105 ${modalType === "deliver"
                  ? "bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 shadow-emerald-200"
                  : "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 shadow-red-200"
                  } shadow-lg hover:shadow-xl`}
              >
                {modalType === "deliver"
                  ? "Yes, Mark Delivered"
                  : "Yes, Raise Dispute"}
              </button>
            </div>
          </div>
        </OrderModal>
      )}

      {/* Dispute Modal */}
      {showDisputeModal && (
        <DisputeModal
          onClose={() => setShowDisputeModal(false)}
          onSubmit={handleDisputeSubmit}
        />
      )}

      {/* Review Modal */}
      {showReviewModal && selectedOrder && (
        <ReviewModal
          isOpen={showReviewModal}
          onClose={() => setShowReviewModal(false)}
          onSubmit={handleReviewSubmit}
          orderData={selectedOrder}
        />
      )}
    </div>
  );
}

export default Orders;