import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Clock,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Download,
  Scale,
  MessageSquare,
} from "lucide-react";
import ResponseDispute from "../client_order/ResponseDispute";

function DisputeDetailPage({ userResponseData = [], data = [] }) {
  const navigate = useNavigate();
  const pathName = useLocation().pathname;
  const userType = pathName.includes("client") ? "client" : "freelancer";

  const [showSettlementModal, setShowSettlementModal] = useState(false);

  const disputeData = data[0] || null;

  console.log("useruserResponseData", userResponseData);

  const userApplyResData =
    disputeData && disputeData.raised_by !== userType
      ? {
          disputeId: disputeData.id,
          userId: disputeData.freelancerId,
          client_id: disputeData.clientId,
          userType: userType,
          freelancerUserID: disputeData.freelancerUserID,
        }
      : null;

  const getStatusBadge = (status) => {
    const statusConfig = {
      Open: {
        bg: "bg-blue-100",
        text: "text-blue-800",
        icon: <Clock className="w-4 h-4" />,
      },
      "In Review": {
        bg: "bg-yellow-100",
        text: "text-yellow-800",
        icon: <AlertTriangle className="w-4 h-4" />,
      },
      Resolved: {
        bg: "bg-green-100",
        text: "text-green-800",
        icon: <CheckCircle className="w-4 h-4" />,
      },
      Escalated: {
        bg: "bg-red-100",
        text: "text-red-800",
        icon: <AlertTriangle className="w-4 h-4" />,
      },
      Closed: {
        bg: "bg-gray-100",
        text: "text-gray-800",
        icon: <XCircle className="w-4 h-4" />,
      },
    };
    const config = statusConfig[status] || statusConfig["Open"];
    return (
      <span
        className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${config.bg} ${config.text}`}
      >
        {config.icon}
        {status}
      </span>
    );
  };

  if (!disputeData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">No dispute details found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate(-1)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Go back"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
                    Dispute ID : {disputeData.id}
                  </h1>
                  {getStatusBadge(disputeData.status)}
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 text-sm text-gray-500">
                  <span>Order: {disputeData.orderId}</span>
                  <span>Created at : {disputeData.created_at}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Summary */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Order Summary
              </h2>
              <div className="space-y-4">
                <h3 className="font-medium text-gray-900 mb-2">
                  {disputeData.title}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Total Amount</span>
                    <p className="font-semibold text-gray-900">
                      ${disputeData.total_price}
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-500">Paid Amount</span>
                    <p className="font-semibold text-green-600">
                      ${disputeData.total_price}
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-500">Order ID</span>
                    <p className="font-semibold text-gray-900">
                      {disputeData.orderId}
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-500">Gig ID</span>
                    <p className="font-semibold text-gray-900">
                      {disputeData.gigId}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Dispute Details */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Dispute Details
              </h2>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Subject</h4>
                  <p className="text-sm text-gray-600">
                    {disputeData.subject
                      ? disputeData.subject.substring(0, 50) + "..."
                      : "Dispute regarding project deliverables"}
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Reason</h4>
                  <p className="text-sm text-gray-600">
                    {disputeData.reason || "No initial message available"}
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">
                    Settlements
                  </h4>
                  <p className="text-sm text-gray-600">
                    No settlements proposed yet.
                  </p>
                </div>
              </div>
            </div>

            {/* Evidence */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Evidence
              </h2>
              {disputeData.disputeFilesClient ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {disputeData.disputeFilesClient
                    .split(",")
                    .map((evidence, i) => (
                      <div
                        key={i}
                        className="border border-gray-200 rounded-lg p-3 hover:border-gray-300 transition-colors"
                      >
                        <div className="aspect-square bg-gray-100 rounded-lg mb-3 flex items-center justify-center overflow-hidden">
                          <img
                            src={evidence}
                            alt="evidence"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <button className="w-full mt-2 inline-flex items-center justify-center gap-2 px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded hover:bg-gray-200 transition-colors">
                          <Download className="w-3 h-3" />
                          Download
                        </button>
                      </div>
                    ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500">
                  No evidence uploaded yet.
                </p>
              )}
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Freelancer Action Notice */}
            {userType === "freelancer" &&
              (userResponseData?.length === 0 ? (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h2 className="text-sm p-2 font-semibold text-red-600 bg-red-50 mb-4">
                    You have only 7 days left to respond to this dispute. If no
                    response is submitted, the decision will be made based on
                    the available information, which may weaken your case.
                  </h2>
                  <button
                    onClick={() => setShowSettlementModal(true)}
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <Scale className="w-4 h-4" />
                    Respond To The Dispute
                  </button>
                </div>
              ) : (
                <div className=" bg-blue-50 rounded-lg shadow-sm border border-gray-200 p-6">
                  <h2 className="text-sm capitalize p-2 font-semibold text-blue-800  mb-4">
                    You have already responded to the dispute. Waiting for a
                    reply from the super admin.
                  </h2>

                   <div className="mt-8 pt-6 p-6 border-t border-slate-200">
                    <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                      <MessageSquare className="w-5 h-5 text-blue-500" />
                      Your Response
                    </h3>
                    <div className="space-y-4">
                      {userResponseData
                        .filter((resp) => resp.userType === "freelancer")
                        .map((resp, i) => (
                          <div
                            key={i}
                            className="border-l-4 border-blue-500 bg-blue-50 rounded-xl p-4"
                          >
                            <p className="text-slate-700 bg-white rounded-lg p-3">
                              {resp.message}
                            </p>

                            <h1>Evidences</h1>

                            {resp?.disputeFilesFreelancer && (
                              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-3">
                                {resp.disputeFilesFreelancer
                                  .split(",")
                                  .map((file, j) => (
                                    <img
                                      key={j}
                                      src={file}
                                      alt={`freelancer evidence ${j + 1}`}
                                      className="w-32 object-cover rounded-lg"
                                    />
                                  ))}
                              </div>
                            )}
                          </div>
                        ))}
                    </div>
                  </div>
                </div>

                
              ))}

            {/* Client View */}
            {userType === "client" && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                {!userResponseData.some(
                  (resp) => resp.userType === "freelancer"
                ) ? (
                  <div className="text-center py-12">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-100 rounded-full mb-4">
                      <Clock className="w-8 h-8 text-amber-600" />
                    </div>
                    <h3 className="text-lg font-medium text-slate-800 mb-2">
                      Awaiting Freelancer Response
                    </h3>
                    <p className="text-slate-600">
                      The freelancer has not yet responded to this dispute.
                    </p>
                  </div>
                ) : (
                  <div className="mt-8 pt-6 p-6 border-t border-slate-200">
                    <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                      <MessageSquare className="w-5 h-5 text-blue-500" />
                      Response From The Freelancer To This Dispute
                    </h3>
                    <div className="space-y-4">
                      {userResponseData
                        .filter((resp) => resp.userType === "freelancer")
                        .map((resp, i) => (
                          <div
                            key={i}
                            className="border-l-4 border-blue-500 bg-blue-50 rounded-xl p-4"
                          >
                            <p className="text-slate-700 bg-white rounded-lg p-3">
                              {resp.message}
                            </p>

                            <h1>Evidences</h1>

                            {resp?.disputeFilesFreelancer && (
                              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-3">
                                {resp.disputeFilesFreelancer
                                  .split(",")
                                  .map((file, j) => (
                                    <img
                                      key={j}
                                      src={file}
                                      alt={`freelancer evidence ${j + 1}`}
                                      className="w-32 object-cover rounded-lg"
                                    />
                                  ))}
                              </div>
                            )}
                          </div>
                        ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Settlement Modal */}
      {showSettlementModal && userResponseData && (
        <ResponseDispute
          userApplyResData={userApplyResData}
          setShowSettlementModal={setShowSettlementModal}
        />
      )}
    </div>
  );
}

export default DisputeDetailPage;
