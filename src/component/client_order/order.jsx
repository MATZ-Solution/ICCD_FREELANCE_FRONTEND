import { useState, memo, useEffect } from "react";
import { Clock, CheckCircle, AlertTriangle, Eye, EllipsisVertical, Package } from "lucide-react";
import { useGetOrderByClient } from "../../../api/client/order";
import { Modal } from "./Modal";
import { DisputeModal } from "./DisputeModal";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ReviewModal from "../ReviewModal";
import Pagination from "../pagination";
import textSlicer from "../../../functions/textSlicer";
import DataLoader from "../../pages/superadmin_dashboard/DataLoader";
import useDebounce from "../../../hooks/useDebounce";
import Header from "../client_dashboard/header";

function ClientOrders() {
  const [action, setAction] = useState(false);
  const [dropDownId, setDropDownId] = useState(null);
  const [showCompleteModal, setShowCompleteModal] = useState(false);
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [showDisputeModal, setShowDisputeModal] = useState(false);
  const [showReviewModal, setshowReviewModal] = useState(false);

  const [completedOrders, setCompletedOrders] = useState([]);
  const [disputedOrders, setDisputedOrders] = useState([]);
  const [search, setSearch] = useState("");
  const pathName = useLocation().pathname;
  const [page, setPage] = useState(1);

  const navigate = useNavigate();

  const [orderDetails, setOrderDetails] = useState("");
  const { data, totalPages, isError, isLoading } = useGetOrderByClient({
    search: useDebounce(search),
    page: page,
  });

  const handleView = (id) => {
    navigate(`/client/orderDetail/${id}`);
  };

  const handleReviewSubmit = (data) => {
    alert("Thank you for your feedback!");
  };

  const client = useSelector((state) => state.user.userDetails);
  const freelancer = useSelector((state) => state.userProfile.userProfile);

  const handleCompleteClick = (item) => {
    const { id, gig_id, client_id, freelancer_id, orderId } = item;
    const userType = pathName.includes("client") ? "client" : "freelancer";
    const userId = pathName.includes("client") ? client?.id : freelancer?.id;

    setOrderDetails({
      orderId: orderId,
      gigId: gig_id,
      user_id: userId,
      client_id,
      freelancer_id,
      raised_by: userType,
      freelancerUserId: data[0]?.freelancerUserId,
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
    return configs[status] || { color: "bg-gray-100 text-gray-800", icon: Clock };
  };

  const renderStatus = (status) => {
    const config = getStatusConfig(status);
    const IconComponent = config.icon;

    return (
      <div className={`inline-flex items-center gap-2 ${config.color} rounded-full py-1 px-3 text-xs sm:text-sm font-semibold`}
      >
        <IconComponent className="w-4 h-4" />
        <span className="capitalize">{status.toLowerCase()}</span>
      </div>
    );
  };

  useEffect(() => {
    setPage(1)
  }, [search])
  // if (isLoading) return <DataLoader />;
  if (isError)
    return (
      <div className="text-center text-red-500 mt-10 p-8">
        <AlertTriangle className="w-12 h-12 mx-auto mb-4" />
        <h2 className="text-xl font-semibold">Error loading orders</h2>
        <p className="text-gray-600">Please try again later</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto p-4 sm:p-6">
        {/* Header */}
        <Header
          icon={<Package className="w-6 h-6 text-white" />}
          title="Order Management"
          description="Track And Manage Your Orders"
          placeholder="Search Orders"
          search={search}
          setSearch={setSearch}
        />
        {/* Table */}
        {isLoading ? <DataLoader /> :
          (<div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm bg-white">
            <table className="min-w-full text-sm sm:text-base text-left">
              <thead className="bg-gradient-to-r from-slate-100 to-slate-200 text-slate-700 text-xs sm:text-sm uppercase tracking-wider">
                <tr>
                  <th className="px-4 sm:px-6 py-3 font-semibold">Image</th>
                  <th className="px-4 sm:px-6 py-3 font-semibold">Gig Details</th>
                  <th className="px-4 sm:px-6 py-3 font-semibold">Package</th>
                  <th className="px-4 sm:px-6 py-3 font-semibold">Price</th>
                  <th className="px-4 sm:px-6 py-3 font-semibold">Status</th>
                  <th className="px-4 sm:px-6 py-3 font-semibold text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {data?.map((item, index) => {
                  const isCompleted = item.status === "completed";
                  const isDisputed = item.status === "disputed";
                  return (
                    <tr
                      key={item.id}
                      className={`transition-all duration-200 hover:bg-slate-50 ${index % 2 === 0 ? "bg-white" : "bg-slate-50/30"}`}
                    >
                      {/* Image */}
                      <td className="px-4 sm:px-6 py-2">
                        <div className="w-20 h-16 sm:w-28 sm:h-20 rounded-lg overflow-hidden shadow-md">
                          <img
                            src={item?.gigsImage?.split(",")[0] || "/placeholder.png"}
                            alt="Gig"
                            onError={(e) => (e.target.src = "/placeholder.png")}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </td>

                      {/* Gig Details */}
                      <td className="px-4 sm:px-6 py-2">
                        <div className="font-medium text-slate-800 line-clamp-2">
                          {textSlicer(item?.title, 40)}
                        </div>
                      </td>

                      {/* Package */}
                      <td className="px-4 sm:px-6 py-2 text-slate-600 capitalize text-sm">
                        {item.package_type?.toLowerCase()} Package
                      </td>

                      {/* Price */}
                      <td className="px-4 sm:px-6 py-2 font-semibold">
                        <span className="bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent text-sm sm:text-lg">
                          ${item.base_price}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="px-4 sm:px-6 py-2">{isCompleted ? (
                        <span className="inline-flex items-center gap-1.5 text-emerald-600 bg-emerald-50 border border-emerald-100 px-2 py-1 rounded-lg text-xs sm:text-sm font-medium">
                          ✅ Completed
                        </span>
                      ) : isDisputed ? (
                        <span className="inline-flex items-center gap-1.5 text-red-600 bg-red-50 border border-red-100 px-2 py-1 rounded-lg text-xs sm:text-sm font-medium">
                          ⚠️ Disputed
                        </span>
                      ) : renderStatus(item.status)}
                      </td>

                      {/* Actions */}
                      <td className="px-4  text-center relative">
                        <EllipsisVertical className="cursor-pointer mx-auto" onClick={() => {
                          setAction(!action);
                          setDropDownId(item?.orderId);
                        }} />
                        {action && item.orderId === dropDownId && (
                          <div className="absolute right-16 top-16 w-40 bg-white border border-slate-200 rounded-xl shadow-lg z-50">
                            <ul className="py-2">
                              <li>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleView(item.orderId);
                                  }}
                                  className="cursor-pointer w-full flex items-center gap-2 px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 transition-colors duration-150"
                                >
                                  <Eye className="w-4 h-4" />
                                  View
                                </button>
                              </li>
                              <li>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleCompleteClick(item);
                                  }}
                                  className="cursor-pointer w-full flex items-center gap-2 px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 transition-colors duration-150"
                                >
                                  <CheckCircle className="w-4 h-4" />
                                  Complete
                                </button>
                              </li>
                            </ul>
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          )}

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
