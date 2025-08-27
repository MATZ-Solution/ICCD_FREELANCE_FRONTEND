import React, { useState } from "react";
import { User, FileText, DollarSign, Clock } from "lucide-react";
import { useGetDisputeAdminById } from "../../../api/client/dispute";
import { useParams } from "react-router-dom";

const fakeDispute = {

  disputeRaised: {
    id: 1,
    role: 'client',
    name: "Alice Smith",
    email: "alice@example.com",
    avatar: "https://ui-avatars.io/api/?name=Alice+Smith&background=3b82f6&color=fff",
    orderId: 12,
    gigTitle: "Professional Logo Design & Brand Identity Package",
    totalAmount: 500,
    paymentStatus: "paid",
    deliveryDate: "2025-08-22T18:00:00",
    freelancerId: 12,
    subject: "Problem with freelancer",
    message: "I have not received the deliverable on time. The project was supposed to be completed by August 22nd, but I still haven't received the final files.",
    proof: "https://via.placeholder.com/400x300/f59e0b/ffffff?text=Payment+Receipt",
    settlement: "Pay back"
  },
  disputeResponse: {
    id: 1,
    fk: 1,
    role: "freelancer",
    reply: {
      message: "I have not completed the work yet.",
      proof: "https://via.placeholder.com/400x300/000000/ffffff?text=Proof",
      settlement: "Partial refund proposed"
    }
  }
};

export default function ViewDisputeDetail() {

  const { id } = useParams()
  const { data, isSuccess, isPending, isError, isLoading } = useGetDisputeAdminById(id)
  console.log("data: ", data)

  const { disputeRaised, disputeResponse } = fakeDispute;
  const [partialAmount, setPartialAmount] = useState("");

  const handleAction = (actionType) => {
    switch (actionType) {
      case "refundClient":
        alert(`Full amount $${disputeRaised.totalAmount} refunded to client.`);
        break;
      case "releaseFreelancer":
        alert(`Full amount $${disputeRaised.totalAmount} released to freelancer.`);
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

  if (isLoading) return "Loading..."
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-xl p-8 transform transition-all duration-300 hover:shadow-2xl">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <FileText className="w-6 h-6 text-blue-600" />
          Dispute Details
        </h2>

        {/* Client Info */}
        <div className="flex items-center gap-4 mb-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
          {
            (data[0]?.freelancerImg || data[0]?.clientImg) ?
              <img
                src={data[0]?.raised_by === 'client' ? data[0]?.clientImg : data[0]?.freelancerImg}
                alt={disputeRaised.name}
                className="w-16 h-16 rounded-full border-2 border-blue-500"
              />
              :
           <User className="w-4 h-4 text-gray-500" />
          }

          <div>
            <p className="font-semibold text-lg text-gray-800">{data[0]?.raised_by === 'client' ? data[0]?.client : data[0]?.freelancer} <span className="text-sm text-gray-500">({data[0]?.raised_by})</span></p>
            <p className="text-sm text-gray-600 flex items-center gap-1">
              <User className="w-4 h-4 text-gray-500" />
              {data[0]?.raised_by === 'client' ? data[0]?.clientEmail : data[0]?.freelancerEmail}
            </p>
          </div>
        </div>

        {/* Order Info */}
        <div className="mb-8">
          <h3 className="font-semibold text-xl text-gray-800 mb-4 flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-600" />
            Order Information
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <p className="text-gray-700"><strong>Order ID:</strong> {data[0]?.orderId}</p>
            <p className="text-gray-700"><strong>Gig Title:</strong> {data[0]?.title}</p>
            <p className="text-gray-700 flex items-center gap-1">
              <DollarSign className="w-4 h-4 text-green-600" />
              <strong>Total Amount:</strong> ${data[0]?.total_price}
            </p>
            <p className="text-gray-700"><strong>Payment Status:</strong> <span className={`capitalize ${data[0]?.paymentStatus === 'paid' ? 'text-green-600' : 'text-red-600'}`}>{disputeRaised.paymentStatus}</span></p>
            {/* <p className="text-gray-700 flex items-center gap-1">
              <Clock className="w-4 h-4 text-gray-500" />
              <strong>Delivery Date:</strong> {new Date(disputeRaised.deliveryDate).toLocaleString()}
            </p> */}
          </div>
        </div>

        {/* Client Dispute */}
        <div className="mb-8 p-6 bg-white rounded-lg shadow-sm border border-gray-200">
          <h3 className="font-semibold text-xl text-gray-800 mb-4 flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-600" />
            Client Dispute
          </h3>
          <p className="text-gray-700 mb-2"><strong>Subject:</strong> {data[0]?.subject}</p>
          <p className="text-gray-700 mb-4"><strong>Message:</strong> {data[0]?.reason}</p>
          {(data[0]?.disputeFilesClient && data[0]?.disputeFilesClient.split(",").length > 0) && (
            <>
              {data[0]?.disputeFilesClient.split(",").map((item, index) => (
                <img
                  key={index}
                  src={item}
                  alt="Client Proof"
                  className="mt-2 w-full max-w-md h-auto rounded-lg border border-gray-300 transform transition-all duration-300 hover:scale-105"
                />
              ))}
            </>
          )}
          {/* <p className="mt-4 text-gray-700"><strong>Settlement Requested:</strong> {disputeRaised.settlement}</p> */}
        </div>

        {/* Freelancer Response */}
        {disputeResponse && (
          <div className="mb-8 p-6 bg-gray-50 rounded-lg shadow-sm border border-gray-200">
            <h3 className="font-semibold text-xl text-gray-800 mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-600" />
              Freelancer Response
            </h3>
            <p className="text-gray-700 mb-2"><strong>Role:</strong> <span className="capitalize">{disputeResponse.role}</span></p>
            <p className="text-gray-700 mb-4"><strong>Message:</strong> {disputeResponse.reply.message}</p>
            {disputeResponse.reply.proof && (
              <img
                src={disputeResponse.reply.proof}
                alt="Freelancer Proof"
                className="mt-2 w-full max-w-md h-auto rounded-lg border border-gray-300 transform transition-all duration-300 hover:scale-105"
              />
            )}
            <p className="mt-4 text-gray-700"><strong>Settlement Proposed:</strong> {disputeResponse.reply.settlement}</p>
          </div>
        )}

        {/* Admin Action Panel */}
        <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-200">
          <h3 className="font-semibold text-xl text-gray-800 mb-4 flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-600" />
            Admin Actions
          </h3>
          <div className="flex flex-col gap-4">
            <button
              className="bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transform transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
              onClick={() => handleAction("refundClient")}
            >
              <DollarSign className="w-5 h-5" />
              Refund Full Amount to Client
            </button>
            <button
              className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transform transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
              onClick={() => handleAction("releaseFreelancer")}
            >
              <DollarSign className="w-5 h-5" />
              Release Full Amount to Freelancer
            </button>
            <div className="flex gap-3 items-center">
              <input
                type="number"
                placeholder="Partial amount"
                className="border border-gray-300 rounded-lg p-3 w-32 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                value={partialAmount}
                onChange={(e) => setPartialAmount(e.target.value)}
              />
              <button
                className="bg-yellow-600 text-white py-3 px-6 rounded-lg hover:bg-yellow-700 transform transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
                onClick={() => handleAction("partialRefund")}
              >
                <DollarSign className="w-5 h-5" />
                Issue Partial Refund
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}