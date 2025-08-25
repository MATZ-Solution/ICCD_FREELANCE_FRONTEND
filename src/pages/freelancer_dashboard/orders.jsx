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

  const handleAction = (order, type) => {
    setSelectedOrder(order);
    setModalType(type);
    setIsModalOpen(true);
    setOpenMenuId(null); // close dropdown
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
    setModalType("");
  };

  const handleConfirmAction = () => {
    if (modalType === "deliver") {
      setDeliveredOrders((prev) => [...prev, selectedOrder?.id]);
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
        className={`flex items-center gap-2 ${
          config.bg
        } rounded-full py-2 px-4 max-w-max shadow-sm ${
          config.pulse ? "animate-pulse" : ""
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
          <div className="space-y-4">
            {data.map((item, index) => {
              const isCompleted = deliveredOrders.includes(item.id);
              const isDisputed = disputedOrders.includes(item.id);

              return (
                <div
                  key={item.id}
                  className="group bg-white/80 backdrop-blur-sm hover:bg-white/95 rounded-2xl p-6  border border-white/20 transition-all duration-300 transform hover:-translate-y-1"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex flex-col xl:flex-row xl:items-center gap-6">
                    {/* Image */}
                    <div className="flex justify-center xl:justify-start xl:w-[200px]">
                      <div className="relative rounded-xl bg-gradient-to-br from-slate-100 to-slate-200">
                        <img
                          src={item?.gigsImage?.split(",")[0] || order_logo}
                          alt="Gig"
                          onError={(e) => (e.target.src = order_logo)}
                          className="w-40 h-24 object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                    </div>

                    {/* Info */}
                    <div className="flex-1 justify-center items-center grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-6 xl:gap-12">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-slate-500 text-sm">
                          <Eye className="w-4 h-4" />
                          <span>Gig Details</span>
                        </div>
                        <h3 className="font-semibold text-slate-800 text-md line-clamp-2">
                          {item.gigsTitle}
                        </h3>
                        <div className="flex items-center gap-2 mt-2">
                          <Package className="w-4 h-4 text-slate-400" />
                          <span className="text-sm text-slate-600 capitalize">
                            {item.package_type?.toLowerCase()} Package
                          </span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-slate-500 text-sm">
                          <DollarSign className="w-4 h-4" />
                          <span>Order Value</span>
                        </div>
                        <div className="text-2xl font-bold bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent">
                          ${item.base_price}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <p className="text-slate-500 text-sm">Current Status</p>
                        {renderStatus(item.status)}
                      </div>

                      {/* Actions */}
                      <div className="flex items-center ">
                        <button
                          onClick={() => handleView(item.id)}
                          className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl px-6 py-3 font-medium flex items-center gap-2 hover:shadow-xl transition-all duration-200"
                        >
                          <Eye className="w-4 h-4" /> View Details
                        </button>
                      </div>
                      <div className="flex items-center ">
                        {isCompleted ? (
                          <div className="flex items-center text-emerald-600 gap-2 bg-emerald-50 rounded-xl px-4 py-3">
                            <CheckCircle className="w-5 h-5" />
                            <span className="font-medium">Completed</span>
                          </div>
                        ) : isDisputed ? (
                          <div className="flex items-center text-red-600 gap-2 bg-red-50 rounded-xl px-4 py-3">
                            <AlertTriangle className="w-5 h-5" />
                            <span className="font-medium">Disputed</span>
                          </div>
                        ) : (
                          <div className="relative">
                            <button
                              onClick={() =>
                                setOpenMenuId(
                                  openMenuId === item.id ? null : item.id
                                )
                              }
                              className="p-3 rounded-xl hover:bg-slate-100 transition-colors duration-200 bg-slate-50"
                            >
                              <MoreVertical className="w-5 h-5 text-slate-600" />
                            </button>

                            {openMenuId === item.id && (
                              <div className="absolute right-0 bottom-full mb-2 w-48 bg-white shadow-2xl rounded-xl border border-slate-200 z-50">
                                <button
                                  onClick={() => handleAction(item, "deliver")}
                                  className="w-full text-left px-4 py-3 hover:bg-emerald-50 text-emerald-600 font-medium flex items-center gap-3"
                                >
                                  <CheckCircle className="w-4 h-4" /> Mark as
                                  Delivered
                                </button>
                                <button
                                  onClick={() => handleAction(item, "dispute")}
                                  className="w-full text-left px-4 py-3 hover:bg-red-50 text-red-600 font-medium flex items-center gap-3"
                                >
                                  <AlertTriangle className="w-4 h-4" /> Raise
                                  Dispute
                                </button>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Order Modal */}
      {isModalOpen && (
        <OrderModal onClose={handleCloseModal}>
          <div className="text-center">
            <div
              className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                modalType === "deliver" ? "bg-emerald-100" : "bg-red-100"
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
                className={`px-6 py-3 rounded-xl text-white font-medium transition-all duration-200 transform hover:scale-105 ${
                  modalType === "deliver"
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
    </div>
  );
}

export default Orders;