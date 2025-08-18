import { useState, memo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import { useGetOrderByClient } from "../../../api/client/order";
import ICCDLoader from "../loader";
import order_logo from "../../assets/freelancer_dashboard/order_logo.png";

// Confirmation Modal
const Modal = ({ title, onConfirm, onCancel }) => (
  <div className="fixed inset-0 bg-white/30 backdrop-blur-sm flex items-center justify-center z-50">
    <div className="bg-white rounded-lg shadow-md p-6 max-w-md w-full">
      <p className="text-lg font-semibold text-gray-800 mb-4">{title}</p>
      <div className="flex justify-end gap-4">
        <button onClick={onCancel} className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">No</button>
        <button onClick={onConfirm} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Yes</button>
      </div>
    </div>
  </div>
);

// Dispute Modal
const DisputeModal = ({ onClose, onSubmit }) => {
  const [subject, setSubject] = useState("");
  const [reason, setReason] = useState("");
  const [proof, setProof] = useState(null);

  const handleSubmit = () => {
    if (!subject || !reason) {
      alert("Please fill in all required fields.");
      return;
    }
    onSubmit({ subject, reason, proof });
  };

  return (
    <div className="fixed inset-0 bg-white/30 backdrop-blur-sm flex items-center justify-center ">
      <div className="bg-white rounded-lg shadow-md p-6 max-w-md w-full space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">Raise a Dispute</h2>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
            placeholder="Enter subject"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Reason</label>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            rows={4}
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
            placeholder="Explain your reason"
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Upload Proof (optional)</label>
          <input
            type="file"
            onChange={(e) => setProof(e.target.files[0])}
            className="text-sm"
          />
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <button onClick={onClose} className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">Cancel</button>
          <button onClick={handleSubmit} className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">Submit Dispute</button>
        </div>
      </div>
    </div>
  );
};

function ClientOrders() {
  const navigate = useNavigate();
  const pathName = useLocation().pathname;
  const [search, setSearch] = useState("");
  const [showCompleteModal, setShowCompleteModal] = useState(false);
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [showDisputeModal, setShowDisputeModal] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  // NEW STATES FOR TRACKING STATUS
  const [completedOrders, setCompletedOrders] = useState([]);
  const [disputedOrders, setDisputedOrders] = useState([]);

  const { data, isPending, isError, isLoading } = useGetOrderByClient({ search });

  console.log("Client Orders Data:", data);

   const handleView = (id) => {
    if (pathName.includes("client")) {
      navigate(`/client/orders/${id}`);
    }
  };

  const handleCompleteClick = (id) => {
    setSelectedOrderId(id);
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
    alert("Order is completed");
  };

  const handleDisputeSubmit = (disputeData) => {
    setShowDisputeModal(false);
    console.log("Dispute submitted:", {
      orderId: selectedOrderId,
      ...disputeData,
    });
    setDisputedOrders((prev) => [...prev, selectedOrderId]);
    alert("Dispute is raised");
  };

  const statusColors = {
    "IN PROGRESS": "bg-[#1467B0]",
    pending: "bg-yellow-500",
    paid: "bg-green-600",
    "IN REVIEW": "bg-purple-500",
    "ON HOLD": "bg-red-500",
  };

  const columns = [
    { key: "gigsTitle", label: "Gig Name" },
    { key: "package_type", label: "Package Type", format: (v) => v?.toLowerCase() },
    { key: "base_price", label: "Price", format: (val) => `$${val}` },
  ];

  const renderStatus = (item) => {
    const status = item.status;
    const colorClass = statusColors[status] || "bg-gray-500";
    return (
      <div className={`flex justify-center items-center ${colorClass} rounded-2xl py-1 px-3 inline-block max-w-max`}>
        <span className="capitalize text-white text-xs font-semibold whitespace-nowrap">{status}</span>
      </div>
    );
  };

  if (isLoading || isPending) return <ICCDLoader />;
  if (isError) return <div className="text-center text-red-500 mt-10">Error loading orders</div>;

  return (
    <div className="w-full h-full bg-white p-4 sm:p-6">
      {/* Header */}
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

      {/* Orders */}
      <div className="flex flex-col gap-4">
        {data?.length > 0 ? (
          data.map((item) => {
            const isCompleted = completedOrders.includes(item.id);
            const isDisputed = disputedOrders.includes(item.id);

            return (
              <div
                key={item.id}
                className="bg-[#F8F8F8] shadow-sm rounded-xl p-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between hover:bg-gray-100 transition cursor-pointer"
                onClick={() => handleView(item.id)}
              >
                <div className="flex justify-center md:justify-start w-full md:w-[15%]">
                  <img
                    src={item?.gigsImage?.split(",")[0] || order_logo}
                    alt="Order"
                    className="w-36 h-20 object-contain"
                    onError={(e) => (e.target.src = order_logo)}
                  />
                </div>

                {columns.map((col, idx) => (
                  <div key={idx} className="w-full md:w-[15%]">
                    <p className="text-[#737373] text-sm">{col.label}</p>
                    <p className="text-[#043A53] font-semibold text-base truncate">
                      {col.format ? col.format(item[col.key], item) : item[col.key]}
                    </p>
                  </div>
                ))}

                <div className="w-full md:w-[15%]">
                  <p className="text-[#737373] text-sm">Status</p>
                  <div className="mt-2">{renderStatus(item)}</div>
                </div>

                <div className="w-full md:w-[25%] flex flex-col md:flex-row gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleView(item.id);
                    }}
                    className="w-full h-12 bg-[#EDEDED] rounded-2xl p-3 flex justify-center items-center"
                  >
                    <p className="text-[#043A53] font-semibold">View</p>
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (!isCompleted && !isDisputed) handleCompleteClick(item.id);
                    }}
                    className={`w-full h-12 ${
                      isCompleted
                        ? "bg-green-200 text-green-800"
                        : isDisputed
                        ? "bg-red-200 text-red-800"
                        : "bg-[#EDEDED] text-[#043A53]"
                    } rounded-2xl p-3 flex justify-center items-center font-semibold`}
                  >
                    <p>
                      {isCompleted
                        ? "Order Completed"
                        : isDisputed
                        ? "Dispute Raised"
                        : "Complete Order"}
                    </p>
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <div className="w-full text-center text-gray-600 py-8">
            <SearchIcon className="text-gray-400 mb-4" style={{ fontSize: 48 }} />
            <h2 className="text-xl font-semibold text-gray-600 mb-2">No Orders found</h2>
          </div>
        )}
      </div>

      {/* Modals */}
      {showCompleteModal && (
        <Modal
          title="Are you sure you want to complete this order?"
          onConfirm={handleCompleteConfirm}
          onCancel={handleCompleteCancel}
        />
      )}

      {showTransferModal && (
        <Modal
          title="Are you sure you want to transfer the payment to the freelancer?"
          onConfirm={handleTransferConfirm}
          onCancel={() => setShowTransferModal(false)}
        />
      )}

      {showDisputeModal && (
        <DisputeModal
          onClose={() => setShowDisputeModal(false)}
          onSubmit={handleDisputeSubmit}
        />
      )}
    </div>
  );
}


export default memo(ClientOrders);