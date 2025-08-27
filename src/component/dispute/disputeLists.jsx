import React from 'react'
import { useNavigate } from "react-router-dom";
import { getDateLabel } from "../../../functions/timeFormat";
import { Eye, Clock, AlertTriangle, CheckCircle } from "lucide-react";
import { useLocation } from 'react-router-dom';

function DisputeLists({ data }) {

    const navigate = useNavigate();
    const pathName = useLocation().pathname
    const getStatusBadge = (status) => {
        const statusConfig = {
            pending: {
                bg: "bg-blue-100",
                text: "text-blue-800",
                icon: <Clock className="w-3 h-3" />,
                border: "border-blue-200",
            },
            "In Review": {
                bg: "bg-yellow-100",
                text: "text-yellow-800",
                icon: <AlertTriangle className="w-3 h-3" />,
                border: "border-yellow-200",
            },
            Resolved: {
                bg: "bg-green-100",
                text: "text-green-800",
                icon: <CheckCircle className="w-3 h-3" />,
                border: "border-green-200",
            },
        };
        const config = statusConfig[status] || statusConfig["pending"];
        return (
            <span
                className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${config.bg} ${config.text} ${config.border}`}
            >
                {config.icon}
                {status}
            </span>
        );
    };
    const handleView = (id) => {
        navigate(pathName.includes("client") ? `/client/Disputes/${id}` : `/freelancer/Disputes/${id}`);
    };

    return (
        <div className="max-w-6xl mx-auto p-6 bg-white">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">My Disputes</h1>
                <p className="text-gray-600">Manage and track your dispute cases</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
                {data?.length === 0 ? (
                    <ItemNotFound title="No disputes found" description="You don't have any active disputes at the moment" />
                ) : (
                    <div className="divide-y divide-gray-200">
                        {data?.map((dispute, index) => (
                            <div
                                key={index}
                                className="p-6 hover:bg-gray-50 transition-colors"
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-4 mb-3">
                                            <h3 className="text-lg font-semibold text-gray-900">
                                                Order No: {dispute.id}
                                            </h3>
                                            {getStatusBadge(dispute.status)}
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                                            <div>
                                                <p className="text-sm text-gray-500 mb-1">
                                                    Counterpart
                                                </p>
                                                <div className="flex items-center gap-2">
                                                    <span className="font-medium text-gray-900">
                                                        {dispute.name}
                                                    </span>
                                                    <span
                                                        className={`px-2 py-1 rounded-full text-xs font-medium ${dispute.counterpartType === "Freelancer"
                                                            ? "bg-purple-100 text-purple-700"
                                                            : "bg-blue-100 text-blue-700"
                                                            }`}
                                                    >
                                                        {dispute.counterpartType}
                                                    </span>
                                                </div>
                                            </div>

                                            <div>
                                                <p className="text-sm text-gray-500 mb-1">
                                                    Created at:
                                                </p>
                                                <p className="font-medium text-gray-900">
                                                    {getDateLabel(dispute.created_at)}
                                                </p>
                                            </div>

                                            <div>
                                                <p className="text-sm text-gray-500 mb-1">
                                                    Description
                                                </p>
                                                <p className="text-gray-700">{dispute.subject}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                                    <button
                                        onClick={() => handleView(dispute.id)}
                                        className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                                    >
                                        <Eye className="w-4 h-4" />
                                        View
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <div className="mt-6 flex items-center justify-between text-sm text-gray-500">
                <span>
                    Showing {data?.length} dispute{data?.length !== 1 ? "s" : ""}
                </span>
                <div className="flex items-center gap-4">
                    <span className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        pending
                    </span>
                    <span className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        In Review
                    </span>
                    <span className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        Ressolved
                    </span>
                </div>
            </div>
        </div>
    )
}

export default DisputeLists