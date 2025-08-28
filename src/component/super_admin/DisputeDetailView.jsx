import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
  User,
  FileText,
  DollarSign,
  Shield,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Eye,
} from "lucide-react";
import { useGetDisputeAdminById } from "../../../api/client/dispute";

export default function ViewDisputeDetail() {
  const { id } = useParams();
  const { data, isSuccess, isLoading, isError } = useGetDisputeAdminById(id);

  const [partialAmount, setPartialAmount] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  if (isLoading) return <div className="p-6 text-center">Loading...</div>;
  if (isError)
    return (
      <div className="p-6 text-center text-red-600">Error loading dispute.</div>
    );
  if (!isSuccess || !data || data.length === 0)
    return <div className="p-6 text-center">No dispute found.</div>;

  const dispute = data[0]; // Assuming API returns array with single dispute

  const handleAction = (actionType) => {
    switch (actionType) {
      case "refundClient":
        alert(`Full amount $${dispute.total_price} refunded to client.`);
        break;
      case "releaseFreelancer":
        alert(`Full amount $${dispute.total_price} released to freelancer.`);
        break;
      case "partialRefund":
        if (!partialAmount || isNaN(partialAmount) || partialAmount <= 0) {
          alert("Enter a valid partial amount.");
        } else {
          alert(`Partial refund of $${partialAmount} issued to client.`);
        }
        break;
      default:
        break;
    }
  };

  const StatusBadge = ({ status }) => {
    const colors = {
      paid: "bg-emerald-100 text-emerald-700 border-emerald-200",
      pending: "bg-amber-100 text-amber-700 border-amber-200",
      failed: "bg-red-100 text-red-700 border-red-200",
      client: "bg-blue-100 text-blue-700 border-blue-200",
      freelancer: "bg-green-100 text-green-700 border-green-200",
      default: "bg-slate-100 text-slate-700 border-slate-200",
    };
    return (
      <span
        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${
          colors[status] || colors.default
        }`}
      >
        {status}
      </span>
    );
  };

  const ImageModal = ({ src, alt, onClose }) => {
    if (!src) return null;
    return (
      <div
        className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <div className="relative max-w-4xl max-h-full">
          <img
            src={src}
            alt={alt}
            className="max-w-full max-h-full rounded-lg shadow-2xl"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white bg-opacity-20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-opacity-30 transition-all duration-200"
          >
            <XCircle className="w-6 h-6" />
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0">
            {/* Left Section */}
            <div className="flex items-center gap-3 flex-1">
              <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl shadow-lg flex-shrink-0">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                  Dispute Resolution Center
                </h1>
                <p className="text-sm text-slate-500 truncate">
                  Order ID: {dispute.orderId}
                </p>
              </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-2">
              <div className="p-2 bg-red-50 rounded-lg flex-shrink-0">
                <AlertTriangle className="w-5 h-5 text-red-500" />
              </div>
              <span className="text-sm font-medium text-red-600 whitespace-nowrap">
                Active Dispute
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="xl:col-span-2 space-y-8">
            {/* Disputant Information */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 overflow-hidden">
              <div className="bg-gradient-to-br from-[#47AAB3] via-[#2F7B86] to-[#1F5059] p-6">
                <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Dispute Raised By
                </h2>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <img
                      src={
                        dispute.raised_by === "client"
                          ? dispute.clientImg
                          : dispute.freelancerImg
                      }
                      alt="User avatar"
                      className="w-16 h-16 rounded-full border-4 border-white shadow-lg"
                    />
                    <div
                      className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-2 border-white shadow-sm ${
                        dispute.raised_by === "client"
                          ? "bg-blue-500"
                          : "bg-green-500"
                      } flex items-center justify-center`}
                    >
                      <User className="w-3 h-3 text-white" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-slate-800">
                      {dispute.raised_by === "client"
                        ? dispute.client
                        : dispute.freelancer}
                    </h3>
                    <p className="text-slate-600 text-sm">
                      {dispute.raised_by === "client"
                        ? dispute.clientEmail
                        : dispute.freelancerEmail}
                    </p>
                    <StatusBadge status={dispute.raised_by} />
                  </div>
                </div>
              </div>
            </div>

            {/* Project Information */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 overflow-hidden">
              <div className=" bg-gradient-to-br from-[#47AAB3] via-[#2F7B86] to-[#1F5059] p-6">
                <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Project Details
                </h2>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl">
                      <FileText className="w-5 h-5 text-slate-500" />
                      <div>
                        <p className="text-sm text-slate-500">Project Title</p>
                        <p className="font-medium text-slate-800">
                          {dispute.title}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl">
                      <DollarSign className="w-5 h-5 text-emerald-500" />
                      <div>
                        <p className="text-sm text-slate-500">Project Value</p>
                        <p className="font-semibold text-emerald-600 text-lg">
                          ${dispute.total_price}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl">
                      <CheckCircle className="w-5 h-5 text-emerald-500" />
                      <div>
                        <p className="text-sm text-slate-500">Payment Status</p>
                        <StatusBadge status={dispute.paymentStatus || "paid"} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Dispute Details */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 overflow-hidden">
              <div className="bg-gradient-to-r from-red-500 to-pink-600 p-6">
                <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" />
                  Dispute Information
                </h2>
              </div>
              <div className="p-6">
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-slate-800 mb-2">
                      Subject
                    </h3>
                    <p className="text-slate-600 bg-slate-50 p-4 rounded-xl">
                      {dispute.subject}
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800 mb-3">
                      Description
                    </h3>
                    <p className="text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-xl">
                      {dispute.reason}
                    </p>
                  </div>
                  {dispute.disputeFilesClient && (
                    <div>
                      <h3 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
                        <Eye className="w-4 h-4" />
                        Evidence Provided
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {dispute.disputeFilesClient
                          .split(",")
                          .map((item, index) => (
                            <div key={index} className="relative group">
                              <img
                                src={item.trim()}
                                alt={`Evidence ${index + 1}`}
                                className="w-full h-48 object-cover rounded-xl border border-slate-200 cursor-pointer transition-transform duration-200 group-hover:scale-105 shadow-sm"
                                onClick={() => setSelectedImage(item.trim())}
                              />
                            </div>
                          ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Freelancer Response (if exists) */}
            {dispute.disputeResponse && (
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 overflow-hidden">
                <div className="bg-gradient-to-r from-blue-500 to-cyan-600 p-6">
                  <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    Freelancer Response
                  </h2>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-slate-800 mb-2">
                        Response
                      </h3>
                      <p className="text-slate-700 bg-blue-50 p-4 rounded-xl">
                        {dispute.disputeResponse.reply.message}
                      </p>
                    </div>
                    {dispute.disputeResponse.reply.proof && (
                      <div>
                        <h3 className="font-semibold text-slate-800 mb-3">
                          Supporting Evidence
                        </h3>
                        <img
                          src={dispute.disputeResponse.reply.proof}
                          alt="Freelancer Evidence"
                          className="w-full max-w-md h-auto rounded-xl border border-slate-200 cursor-pointer hover:scale-105 transition-transform duration-200 shadow-sm"
                          onClick={() =>
                            setSelectedImage(
                              dispute.disputeResponse.reply.proof
                            )
                          }
                        />
                      </div>
                    )}
                    <div className="bg-blue-50 p-4 rounded-xl">
                      <h4 className="font-medium text-blue-800 mb-1">
                        Proposed Settlement
                      </h4>
                      <p className="text-blue-700">
                        {dispute.disputeResponse.reply.settlement}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar - Admin Actions */}
          <div className="xl:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 overflow-hidden sticky top-8">
              <div className="bg-gradient-to-br from-[#47AAB3] via-[#2F7B86] to-[#1F5059] p-6">
                <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Admin Actions
                </h2>
                <p className="text-purple-100 text-sm mt-1">
                  Choose resolution method
                </p>
              </div>
              <div className="p-6 space-y-4">
                <button
                  className="w-full bg-gradient-to-r from-emerald-500 to-green-600 text-white py-4 px-6 rounded-xl hover:from-emerald-600 hover:to-green-700 transform transition-all duration-200 hover:scale-105 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl"
                  onClick={() => handleAction("refundClient")}
                >
                  <DollarSign className="w-5 h-5" />
                  <span className="font-medium">Full Refund to Client</span>
                </button>

                <button
                  className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-4 px-6 rounded-xl hover:from-blue-600 hover:to-indigo-700 transform transition-all duration-200 hover:scale-105 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl"
                  onClick={() => handleAction("releaseFreelancer")}
                >
                  <DollarSign className="w-5 h-5" />
                  <span className="font-medium">Release to Freelancer</span>
                </button>

                <div className="space-y-3">
                  <label className="block text-sm font-medium text-slate-700">
                    Partial Refund Amount
                  </label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="number"
                        placeholder="0.00"
                        className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200"
                        value={partialAmount}
                        onChange={(e) => setPartialAmount(e.target.value)}
                        max={dispute.total_price}
                      />
                    </div>
                  </div>
                  <button
                    className="w-full bg-gradient-to-r from-amber-500 to-orange-600 text-white py-4 px-6 rounded-xl hover:from-amber-600 hover:to-orange-700 transform transition-all duration-200 hover:scale-105 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    onClick={() => handleAction("partialRefund")}
                    disabled={
                      !partialAmount ||
                      isNaN(partialAmount) ||
                      partialAmount <= 0
                    }
                  >
                    <DollarSign className="w-5 h-5" />
                    <span className="font-medium">Issue Partial Refund</span>
                  </button>
                </div>

                <div className="mt-6 p-4 bg-slate-50 rounded-xl">
                  <h4 className="font-medium text-slate-800 mb-2">
                    Quick Stats
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Total Value:</span>
                      <span className="font-medium text-slate-800">
                        ${dispute.total_price}
                      </span>
                    </div>
                    {/* <div className="flex justify-between">
                      <span className="text-slate-600">Dispute Age:</span>
                      <span className="font-medium text-slate-800">3 days</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Priority:</span>
                      <span className="font-medium text-red-600">High</span>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <ImageModal
          src={selectedImage}
          alt="Evidence"
          onClose={() => setSelectedImage(null)}
        />
      )}
    </div>
  );
}
