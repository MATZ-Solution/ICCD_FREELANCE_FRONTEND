import { useState, memo } from "react";
import {
  Search,
  DollarSign,
  Clock,
  CheckCircle,
  AlertTriangle,
  Eye,
  FileText,
  Upload,
  X,
  Package,
  SearchIcon,
} from "lucide-react";
import { useGetOrderByClient } from "../../../api/client/order";
import ICCDLoader from "../loader";
import { Modal } from "./Modal";
import { DisputeModal } from "./DisputeModal";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ReviewModal from "../ReviewModal";
import Pagination from "../pagination";

function ClientOrders() {
  const [showCompleteModal, setShowCompleteModal] = useState(false);
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [showDisputeModal, setShowDisputeModal] = useState(false);
  const [showReviewModal, setshowReviewModal] = useState(false);

  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [completedOrders, setCompletedOrders] = useState([]);
  const [review, setReview] = useState();
  const [disputedOrders, setDisputedOrders] = useState([]);
  const [search, setSearch] = useState("");
  const pathName = useLocation().pathname;
  const [page, setPage] = useState(1);

  const navigate = useNavigate();

  const [orderDetails, setOrderDetails] = useState("");
  const { data, totalPages, isError, isLoading } = useGetOrderByClient({
    search,
    page: page
  });

  console.log(data)


  const handleView = () => {
    // console.log("Viewing order:", id);
    // navigate(`/client/orderDetail/${id}`)
    navigate(`/client/orderDetail/${data[0].orderId}`);

    // navigate to order details
  };

  const handleReviewSubmit = (data) => {
    console.log("✅ Review Submitted:", data);
    alert("Thank you for your feedback!");
  };

  const client = useSelector((state) => state.user.userDetails);
  const freelancer = useSelector(state => state.userProfile.userProfile)


  const handleCompleteClick = (item) => {
    const { id, gig_id, client_id, freelancer_id, orderId } = item;
    const userType = pathName.includes("client") ? "client" : "freelancer";
    const userId = pathName.includes("client") ? client?.id : freelancer?.id;

    // setSelectedOrderId(id);
    setOrderDetails({
      orderId: orderId, gigId: gig_id, user_id: userId,
      client_id: client_id, freelancer_id: freelancer_id,
      raised_by: userType, freelancerUserId: data[0]?.freelancerUserId

    });
    setShowCompleteModal(true);
  };

  const handleCompleteConfirm = () => {
    setShowCompleteModal(false);
    setShowTransferModal(true);
  };

  const handleCompleteCancel = () => {
    setShowCompleteModal(false);
    setShowDisputeModal(true);
  };

  const handleTransferConfirm = () => {
    setShowTransferModal(false);
    setCompletedOrders((prev) => [...prev, selectedOrderId]);
    setshowReviewModal(true);
    alert("Order completed and payment transferred successfully!");
  };

  const handleDisputeSubmit = (disputeData) => {
    setShowDisputeModal(false);
    console.log("Dispute submitted:", {
      orderId: selectedOrderId,
      ...disputeData,
    });
    setDisputedOrders((prev) => [...prev, selectedOrderId]);
    alert("Dispute has been raised successfully!");
  };

  const getStatusConfig = (status) => {
    const configs = {
      "IN PROGRESS": { color: "bg-blue-100 text-blue-800", icon: Clock },
      pending: { color: "bg-yellow-100 text-yellow-800", icon: Clock },
      paid: { color: "bg-green-100 text-green-800", icon: CheckCircle },
      "IN REVIEW": { color: "bg-purple-100 text-purple-800", icon: Eye },
      "ON HOLD": { color: "bg-red-100 text-red-800", icon: AlertTriangle },
    };
    return (
      configs[status] || { color: "bg-gray-100 text-gray-800", icon: Clock }
    );
  };

  const renderStatus = (status) => {
    const config = getStatusConfig(status);
    const IconComponent = config.icon;

    return (
      <div
        className={`inline-flex items-center gap-2 ${config.color} rounded-full py-2 px-4 text-sm font-semibold`}
      >
        <IconComponent className="w-4 h-4" />
        <span className="capitalize">{status.toLowerCase()}</span>
      </div>
    );
  };

  if (isLoading) return <ICCDLoader />;
  if (isError)
    return (
      <div className="text-center text-red-500 mt-10 p-8">
        <AlertTriangle className="w-12 h-12 mx-auto mb-4" />
        <h2 className="text-xl font-semibold">Error loading orders</h2>
        <p className="text-gray-600">Please try again later</p>
      </div>
    );

  return (
    <div className="min-h-screen  bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header Section */}
        <div className="flex flex-wrap mb-12 justify-between mt-10 p-6 bg-gradient-to-r from-[#043A53] via-[#065f73] to-[#3C939D] rounded-md">
          <div className="px-4 py-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                <Package className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-white">
                Order Management
              </h1>
            </div>
            <p className="text-blue-100 text-lg">
              Track And Manage Your Orders
            </p>
          </div>

          {/* Search Section */}
          <div className="  flex flex-col justify-center mt-4 sm:mt-0">
            <div className="relative">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search Orders..."
                className="w-72 h-10 p-2 pr-10 rounded-md border border-gray-500 bg-white focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
              <SearchIcon className="absolute top-2.5 right-2.5 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Orders List */}
        <div className="space-y-4  ">
          {data?.length > 0 ? (
            data.map((item, index) => {
              const isCompleted = completedOrders.includes(item.id);
              const isDisputed = disputedOrders.includes(item.id);
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all duration-200 cursor-pointer group"
                  onClick={() => handleView(item.id)}
                >
                  <div className="flex flex-col sm:flex-row gap-6">
                    {/* Image Section */}
                    <div className="flex-shrink-0">
                      <div className="w-full h-30 sm:w-48 sm:h-32 rounded-xl overflow-hidden bg-gray-100">
                        <img
                          src={item.gigsImage.split(",")[0]}
                          alt="Order preview"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                          onError={(e) => {
                            e.target.src =
                              "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop";
                          }}
                        />
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="flex-1 min-w-0">
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  lg:grid-cols-5  h-full">
                        {/* Project Details */}
                        <div className="lg:col-span-2 mt-4 space-y-3">
                          <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
                            {item.gigsTitle}
                          </h3>
                          <div className="flex flex-col gap-4 text-sm">
                            <div className="flex items-center gap-2">
                              <Package className="w-4 h-4 text-gray-400" />
                              <span className="text-gray-600">Package:</span>
                              <span className="font-medium text-gray-900 capitalize">
                                {item.package_type?.toLowerCase()}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-gray-600">Price:</span>
                              <span className="font-semibold text-gray-900">
                                ${item.base_price}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Status */}
                        <div className="flex w-32 mt-4 items-start">
                          <div>
                            <p className="text-sm text-gray-600 mb-2">Status</p>
                            {renderStatus(item.status)}
                          </div>
                        </div>

                        {/* Actions */}
                        <div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleView(item.id);
                            }}
                            className="p-4 h-12 mt-8 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-xl font-medium transition-colors flex items-center justify-center gap-2"
                          >
                            <Eye className="w-4 h-4" />
                            View Details
                          </button>
                        </div>
                        <div>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleCompleteClick(item);
                            }}
                            className={`flex-1 p-4 mt-8  h-12 rounded-xl font-medium transition-colors flex items-center justify-center gap-2 px-4
                                 bg-blue-600 hover:bg-blue-700 text-white focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                            }`}
                          >
                            <>
                              <CheckCircle className="w-4 h-4" />
                              <span>Complete Order</span>
                            </>
                          </button>

                          {/* <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              if (!isCompleted && !isDisputed) {
                                handleCompleteClick(item.id);
                              }
                            }}
                            disabled={isCompleted || isDisputed}
                            className={`flex-1 p-4 mt-8  h-12 rounded-xl font-medium transition-colors flex items-center justify-center gap-2 px-4
                            ${
                              isCompleted
                                ? "bg-green-100 text-green-800 cursor-default"
                                : isDisputed
                                ? "bg-red-100 text-red-800 cursor-default"
                                : "bg-blue-600 hover:bg-blue-700 text-white focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            }`}
                          >
                            {isCompleted ? (
                              <>
                                <CheckCircle className="w-4 h-4" />
                                <span>Completed</span>
                              </>
                            ) : isDisputed ? (
                              <>
                                <AlertTriangle className="w-4 h-4" />
                                <span>Disputed</span>
                              </>
                            ) : (
                              <>
                                <CheckCircle className="w-4 h-4" />
                                <span>Complete Order</span>
                              </>
                            )}
                          </button> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-16 bg-white rounded-2xl shadow-sm border border-gray-100">
              <div className="max-w-md mx-auto">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No Orders Found
                </h3>
                <p className="text-gray-600">
                  {search
                    ? `No orders match your search "${search}"`
                    : "You haven't placed any orders yet"}
                </p>
              </div>
            </div>
          )}
        </div>

        {data?.length > 0 && (
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={(newPage) => setPage(newPage)}
          />
        )}

        {/* Modals */}
        {showCompleteModal && (
          <Modal
            title="Complete this order?"
            description="Confirm if the work has been completed to your satisfaction"
            onConfirm={handleCompleteConfirm}
            onCancel={handleCompleteCancel}
            confirmText="Yes, Complete"
            cancelText="Raise Dispute"
            type="success"
          />
        )}

        {showTransferModal && (
          <Modal
            title="Transfer Payment"
            description="This will release the payment to the freelancer. This action cannot be undone."
            onConfirm={handleTransferConfirm}
            onCancel={() => setShowTransferModal(false)}
            confirmText="Transfer Payment"
            cancelText="Cancel"
            type="success"
          />
        )}

        {showDisputeModal && (
          <DisputeModal
            onClose={() => setShowDisputeModal(false)}
            onSubmit={handleDisputeSubmit}
            orderDetails={orderDetails}
            setOrderDetails={setOrderDetails}
          />
        )}

        {showReviewModal && (
          <ReviewModal
            orderData={orderDetails}
            isOpen={showReviewModal}
            onClose={() => setshowReviewModal(false)}
            onSubmit={handleReviewSubmit}
          />
        )}
      </div>
    </div>
  );
}

export default memo(ClientOrders);
