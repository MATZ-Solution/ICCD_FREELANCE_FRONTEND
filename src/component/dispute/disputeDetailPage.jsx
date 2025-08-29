import { useState } from 'react'
import { useLocation } from 'react-router-dom';
import { ArrowLeft, Clock, AlertTriangle, CheckCircle, XCircle, Download, Send, Scale, X } from "lucide-react";
import ResponseDispute from '../client_order/ResponseDispute';

function DisputeDetailPage({ userResponseData, data }) {

    const pathName = useLocation().pathname
    const userType = pathName.includes("client") ? 'client' : 'freelancer'
    const [showSettlementModal, setShowSettlementModal] = useState(false)
    const responseData = data[0]?.raised_by !== userType ? {
        disputeId: data[0]?.id, userId: data[0]?.freelancerId,
        client_id: data[0]?.clientId, 
        userType: userType, freelancerUserID: data[0]?.freelancerUserID
    } : null

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

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <button
                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                aria-label="Go back"
                            >
                                <ArrowLeft className="w-5 h-5 text-gray-600" />
                            </button>
                            <div>
                                <div className="flex items-center gap-3 mb-1">
                                    <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
                                        Dispute ID : {data[0]?.id}
                                    </h1>
                                    {getStatusBadge(data[0]?.status)}
                                </div>
                                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 text-sm text-gray-500">
                                    <span>Order: {data[0]?.orderId}</span>
                                    <span>Created at : {data[0]?.created_at}</span>
                                    {/* <span>Last Activity: {dispute.lastActivity}</span> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Column - Order Summary & Evidence */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Order Summary */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">
                                Order Summary
                            </h2>
                            <div className="space-y-4">
                                <div>
                                    <h3 className="font-medium text-gray-900 mb-2">
                                        {data[0]?.title}
                                    </h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                                        <div>
                                            <span className="text-gray-500">Total Amount</span>
                                            <p className="font-semibold text-gray-900">
                                                ${data[0]?.total_price}
                                            </p>
                                        </div>
                                        <div>
                                            <span className="text-gray-500">Paid Amount</span>
                                            <p className="font-semibold text-green-600">
                                                ${data[0]?.total_price}
                                            </p>
                                        </div>
                                        <div>
                                            <span className="text-gray-500">Escrow Amount</span>
                                            <p className="font-semibold text-blue-600">
                                                ${data[0]?.total_price}
                                            </p>
                                        </div>
                                        <div>
                                            <span className="text-gray-500">Order ID</span>
                                            <p className="font-semibold text-gray-900">
                                                {data[0]?.orderId}
                                            </p>
                                        </div>
                                        <div>
                                            <span className="text-gray-500">Gig ID</span>
                                            <p className="font-semibold text-gray-900">
                                                {data[0]?.gigId}
                                            </p>
                                        </div>
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
                                        {data[0]?.subject.substring(0, 50) + "..." ||
                                            "Dispute regarding project deliverables"}
                                    </p>
                                </div>
                                <div>
                                    <h4 className="font-medium text-gray-900 mb-2">
                                        Reason
                                    </h4>
                                    <p className="text-sm text-gray-600">
                                        {data[0]?.reason ||
                                            "No initial message available"}
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

                        {/* Evidence Gallery */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">
                                Evidence
                            </h2>
                            {data[0]?.disputeFilesClient?.split(",").length > 0 ? (
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                    {data[0]?.disputeFilesClient.split(",").map((evidence, index) => (
                                        <div
                                            key={index}
                                            className="border border-gray-200 rounded-lg p-3 hover:border-gray-300 transition-colors"
                                        >
                                            <div className="aspect-square bg-gray-100 rounded-lg mb-3 flex items-center justify-center overflow-hidden">
                                                <img
                                                    src={evidence}
                                                    // alt={evidence.name}
                                                    className="w-full h-full object-cover"
                                                />
                                                {/* {evidence.type === "image" ? (
                          <img
                            src={evidence}
                            // alt={evidence.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <Paperclip className="w-8 h-8 text-gray-400" />
                        )} */}
                                            </div>
                                            <div className="text-sm">
                                                <p className="font-medium text-gray-900 truncate">
                                                    {evidence.name}
                                                </p>
                                                <p className="text-gray-500">{evidence.size}</p>
                                                <p className="text-xs text-gray-400">
                                                    By {evidence.uploadedBy} • {evidence.uploadedAt}
                                                </p>
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

                    {/* Right Column - Chat & Actions */}

                    <div className="space-y-6">
                        {/* Actions */}
                        {(data[0]?.raised_by !== userType) && (
                            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                                <h2 className="text-sm p-2 font-semibold text-red-600 bg-red-50 mb-4">
                                    You have only 7 days left to respond to this dispute. If no
                                    response is submitted, the decision will be made based on the
                                    available information, which may weaken your case.
                                </h2>

                                <div className="space-y-3">
                                    {/* {canProposeSettlement && ( */}
                                    <button
                                        onClick={() => setShowSettlementModal(true)}
                                        className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                                        aria-label="Propose a settlement"
                                    >
                                        <Scale className="w-4 h-4" />
                                        Response To The Dispute
                                    </button>
                                    {/* )} */}
                                </div>
                            </div>
                        )}
                        {/* Chat Thread */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                            <div className="p-4 border-b border-gray-200">
                                <h2 className="text-lg font-semibold text-gray-900">
                                    Discussion
                                </h2>
                            </div>
                            <div className="p-4 max-h-96 overflow-y-auto space-y-4">
                                {dispute.messages.map((message) => (
                                    <div
                                        key={message.id}
                                        className={`flex gap-3 ${message.sender === dispute.userRole
                                            ? "flex-row-reverse"
                                            : ""
                                            }`}
                                    >
                                        <div
                                            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${message.isAdmin
                                                ? "bg-red-100 text-red-700"
                                                : message.sender === "client"
                                                    ? "bg-blue-100 text-blue-700"
                                                    : "bg-purple-100 text-purple-700"
                                                }`}
                                        >
                                            {message.isAdmin
                                                ? "A"
                                                : message.sender === "client"
                                                    ? "C"
                                                    : "F"}
                                        </div>
                                        <div
                                            className={`flex-1 max-w-xs ${message.sender === dispute.userRole
                                                ? "items-end"
                                                : "items-start"
                                                } flex flex-col`}
                                        >
                                            <div
                                                className={`p-3 rounded-lg ${message.sender === dispute.userRole
                                                    ? "bg-blue-600 text-white"
                                                    : "bg-gray-100 text-gray-900"
                                                    }`}
                                            >
                                                <p className="text-sm">{message.message}</p>
                                            </div>
                                            <div className="text-xs text-gray-500 mt-1">
                                                <span className="font-medium">
                                                    {message.senderName}
                                                </span>{" "}
                                                • {message.timestamp}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="p-4 border-t border-gray-200">
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        // value={quickReply}
                                        // onChange={(e) => setQuickReply(e.target.value)}
                                        placeholder="Type your message..."
                                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        // onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                                        aria-label="Type a message"
                                    />
                                    <button
                                        // onClick={handleSendMessage}
                                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                        aria-label="Send message"
                                    >
                                        <Send className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Settlement Modal */}
            {showSettlementModal && (
                <ResponseDispute responseData={responseData} setShowSettlementModal={setShowSettlementModal}/>
                // <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                //     <div className="bg-white rounded-lg p-6 w-full max-w-md">
                //         <div className="flex items-center justify-between mb-4">
                //             <h3 className="text-lg font-semibold text-gray-900">
                //                 Address This Dispute
                //             </h3>
                //             <button
                //                 onClick={() => setShowSettlementModal(false)}
                //                 className="text-gray-400 hover:text-gray-600"
                //                 aria-label="Close modal"
                //             >
                //                 <X className="w-5 h-5" />
                //             </button>
                //         </div>
                //         <div className="space-y-4">
                //             <div>
                //                 <label className="block text-sm font-medium text-gray-700 mb-1">
                //                     Response
                //                 </label>
                //                 <textarea
                //                     // value={settlementMessage}
                //                     // onChange={(e) => setSettlementMessage(e.target.value)}
                //                     placeholder="Explain your settlement proposal..."
                //                     rows={4}
                //                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                //                     aria-label="Settlement message"
                //                 />
                //             </div>
                //             <div>
                //                 <label className="block text-sm font-medium text-gray-700 mb-1">
                //                     Settlement Message
                //                 </label>
                //                 <textarea
                //                     // value={settlementMessage}
                //                     // onChange={(e) => setSettlementMessage(e.target.value)}
                //                     placeholder="Explain your settlement proposal..."
                //                     rows={4}
                //                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                //                     aria-label="Settlement message"
                //                 />
                //             </div>
                //             <div>
                //                 <label className="block text-sm font-medium text-gray-700 mb-1">
                //                     Upload Evidence (Optional)
                //                 </label>
                //                 <input
                //                     type="file"
                //                     className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                //                     // onChange={handleFileUpload}
                //                     aria-label="Upload settlement evidence"
                //                 />
                //             </div>
                //             <div className="flex gap-3 pt-4">
                //                 <button
                //                     // onClick={() => setShowSettlementModal(false)}
                //                     className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                //                     aria-label="Cancel settlement proposal"
                //                 >
                //                     Cancel
                //                 </button>
                //                 <button
                //                     // onClick={handleProposeSettlement}
                //                     className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                //                     aria-label="Propose settlement"
                //                 >
                //                     Propose
                //                 </button>
                //             </div>
                //         </div>
                //     </div>
                // </div>
            )}
        </div>
    )
}

const dispute = {
    id: "DSP-2024-001",
    orderRef: "ORD-2024-001",
    status: "Open",
    createdAt: "2024-01-15 10:30 AM",
    lastActivity: "2024-01-16 2:45 PM",
    userRole: "client",
    adminInvolved: false,
    order: {
        title: "E-commerce Website Development",
        totalAmount: 2500,
        paidAmount: 1250,
        escrowAmount: 1250,
        milestones: [
            {
                id: 1,
                name: "Homepage Design",
                amount: 750,
                status: "Completed",
                dueDate: "2024-01-10",
            },
            {
                id: 2,
                name: "Product Pages",
                amount: 1000,
                status: "In Progress",
                dueDate: "2024-01-20",
            },
            {
                id: 3,
                name: "Payment Integration",
                amount: 750,
                status: "Pending",
                dueDate: "2024-01-30",
            },
        ],
        attachments: [
            { id: 1, name: "project-brief.pdf", size: "2.4 MB", type: "pdf" },
            { id: 2, name: "wireframes.sketch", size: "5.1 MB", type: "sketch" },
        ],
    },
    evidence: [
        {
            id: 1,
            name: "screenshot-1.png",
            type: "image",
            size: "1.2 MB",
            uploadedBy: "client",
            uploadedAt: "2024-01-15 11:00 AM",
            thumbnail:
                "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0yNSAyNUw3NSA3NU0yNSA3NUw3NSAyNSIgc3Ryb2tlPSIjOUI5Q0EwIiBzdHJva2Utd2lkdGg9IjIiLz4KPC9zdmc+",
        },
        {
            id: 2,
            name: "communication-log.pdf",
            type: "document",
            size: "0.8 MB",
            uploadedBy: "freelancer",
            uploadedAt: "2024-01-15 3:30 PM",
        },
        {
            id: 3,
            name: "work-progress.png",
            type: "image",
            size: "2.1 MB",
            uploadedBy: "freelancer",
            uploadedAt: "2024-01-16 9:15 AM",
            thumbnail:
                "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjRUZGNkZGIi8+CjxjaXJjbGUgY3g9IjUwIiBjeT0iNDAiIHI9IjE1IiBmaWxsPSIjOTMzM0VBIi8+CjxyZWN0IHg9IjMwIiB5PSI2MCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjIwIiBmaWxsPSIjOTMzM0VBIi8+Cjwvc3ZnPg==",
        },
    ],
    messages: [
        {
            id: 1,
            sender: "client",
            senderName: "Tech Solutions Inc.",
            message:
                "The freelancer has not delivered the work as per specifications. The homepage design does not match the approved wireframes.",
            timestamp: "2024-01-15 10:30 AM",
            isAdmin: false,
        },
        {
            id: 2,
            sender: "freelancer",
            senderName: "Sarah Johnson",
            message:
                "I have followed the wireframes exactly. The client requested multiple changes that were not part of the original scope. I have documentation of all communications.",
            timestamp: "2024-01-15 3:30 PM",
            isAdmin: false,
        },
        {
            id: 3,
            sender: "client",
            senderName: "Tech Solutions Inc.",
            message:
                "The changes I requested were clarifications, not scope changes. Please review the attached screenshots.",
            timestamp: "2024-01-16 9:00 AM",
            isAdmin: false,
        },
        {
            id: 4,
            sender: "freelancer",
            senderName: "Sarah Johnson",
            message:
                "I have uploaded the current progress. As you can see, the work matches the specifications. I am willing to make minor adjustments if needed.",
            timestamp: "2024-01-16 2:45 PM",
            isAdmin: false,
        },
    ],
};

export default DisputeDetailPage