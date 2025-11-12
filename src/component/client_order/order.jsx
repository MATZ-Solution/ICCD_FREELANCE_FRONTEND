import { useState, memo } from "react";
import {
  Search,
  DollarSign,
  Clock,
  CheckCircle,
  AlertTriangle,
  Eye,
  FileText,
  EllipsisVertical,
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
import textSlicer from "../../../functions/textSlicer";

function ClientOrders() {
  const [action, setAction] = useState(false)
  const [dropDownId, setDropDownId] = useState(null)
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


  const handleView = (id) => {
    // console.log("Viewing order:", id);
    // navigate(`/client/orderDetail/${id}`)
    navigate(`/client/orderDetail/${id}`);

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
                        {textSlicer(item?.title, 40)}
                      </div>
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
                    <td className="relative px-6 py-4 text-center">
                      <EllipsisVertical className="cursor-pointer" onClick={() => {
                        setAction(!action)
                        setDropDownId(item?.orderId)
                      }} />
                      {(action && item.orderId === dropDownId) && (
                        <div className={`absolute right-26 ${index === Number(data?.length - 1) ? 'bottom-14' : 'top-16'} w-48 bg-white border border-slate-200 rounded-xl shadow-lg z-50 animate-fadeIn`}>
                          <ul className="py-2">
                            <li>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleView(item.orderId);
                                }}
                                className="curosr-pointer w-full flex items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 transition-colors duration-150"
                              >
                                <span className="text-slate-500"> <Eye className="w-4 h-4" /></span>
                                <span className="text-slate-500">View Details</span>
                              </button>
                            </li>
                            <li>
                              <button
                                onClick={(e) => {
                                  handleCompleteClick(item);
                                }}
                                className="curosr-pointer w-full flex items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 transition-colors duration-150"
                              >
                                <span className="text-slate-500"><CheckCircle className="w-4 h-4" /></span>
                                <span className="text-slate-500">Complete Order</span>
                              </button>
                            </li>
                          </ul>
                        </div>
                      )}
                      {/* <div className="flex justify-center gap-2">
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
                      </div> */}
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
                      {/* <button
                            onClick={() =>
                              setOpenMenuId(openMenuId === item.id ? null : item.id)
                            }
                            className="bg-slate-100 hover:bg-slate-200 text-slate-600 px-3 py-1.5 rounded-xl text-xs font-medium transition-colors duration-200"
                          >
                            More
                          </button> */}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
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
