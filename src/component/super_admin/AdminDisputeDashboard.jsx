import React, { useState } from "react";
import {
  Search,
  Filter,
  AlertTriangle,
  Clock,
  DollarSign,
  Flag,
  ChevronDown,
  Eye,
  Calendar,
  User,
  TrendingUp,
  Shield,
  TicketPlus,
} from "lucide-react";
import { Navigate, useNavigate } from "react-router-dom";
import { useGetAllDisputeByAdmin } from "../../../api/client/dispute";

const AdminDisputeDashboard = () => {

   const { data, error, isLoading, isError } = useGetAllDisputeByAdmin()
   console.log("data: ", data)

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [amountFilter, setAmountFilter] = useState("all");
  const [showFilters, setShowFilters] = useState(false);

  const [disputes] = useState([
    {
      id: "DSP-2024-001",
      orderId: "ORD-2024-001",
      clientName: "Tech Solutions Inc.",
      freelancerName: "Sarah Johnson",
      createdAt: "2024-01-15 10:30 AM",
      age: "2 days",
      amount: 2500,
      status: "Ressolved",
      priority: "high",
      suspicious: true,
      lastActivity: "2 hours ago",
      subject: "Payment delay dispute",
    },
    {
      id: "DSP-2024-002",
      orderId: "ORD-2024-002",
      clientName: "StartupCorp",
      freelancerName: "Mike Chen",
      createdAt: "2024-01-14 3:15 PM",
      age: "3 days",
      amount: 1200,
      status: "pending_info",
      priority: "medium",
      suspicious: false,
      lastActivity: "1 day ago",
      subject: "Quality of work dispute",
    },
    {
      id: "DSP-2024-003",
      orderId: "ORD-2024-003",
      clientName: "Global Marketing Ltd.",
      freelancerName: "Lisa Wang",
      createdAt: "2024-01-13 11:45 AM",
      age: "4 days",
      amount: 850,
      status: "under_review",
      priority: "low",
      suspicious: false,
      lastActivity: "3 hours ago",
      subject: "Scope change dispute",
    },
    {
      id: "DSP-2024-004",
      orderId: "ORD-2024-004",
      clientName: "Enterprise Solutions",
      freelancerName: "John Davis",
      createdAt: "2024-01-12 9:20 AM",
      age: "5 days",
      amount: 4500,
      status: "Ressolved",
      subject: "Milestone completion dispute",
    },
    {
      id: "DSP-2024-005",
      orderId: "ORD-2024-005",
      clientName: "Design Studio Pro",
      freelancerName: "Emma Wilson",
      createdAt: "2024-01-11 2:10 PM",
      age: "6 days",
      amount: 750,
      status: "pending_info",
      priority: "medium",
      suspicious: false,
      lastActivity: "6 hours ago",
      subject: "Communication breakdown",
    },
  ]);

  const navigate = useNavigate();
  const handleviewdetail = () => {
    navigate(`/superadmin/admindisputedetail/${data[0]?.id}`);
  };
  const getStatusBadge = (status) => {
    const statusConfig = {
      Ressolved: {
        bg: "bg-green-100",
        text: "text-green-800",
        label: "Ressolved",
      },
      pending_info: {
        bg: "bg-red-100",
        text: "text-red-800",
        label: "Pending",
      },
      under_review: {
        bg: "bg-yellow-100",
        text: "text-yellow-800",
        label: "Under Review",
      },
    };
    const config = statusConfig[status] || statusConfig["Ressolved"];
    return (
      <span
        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}
      >
        {config.label}
      </span>
    );
  };

  const filteredDisputes = disputes.filter((dispute) => {
    const matchesSearch =
      !searchTerm ||
      dispute.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dispute.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dispute.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dispute.freelancerName.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || dispute.status === statusFilter;
    const matchesPriority =
      priorityFilter === "all" || dispute.priority === priorityFilter;
    const matchesAmount =
      amountFilter === "all" ||
      (amountFilter === "high" && dispute.amount >= 2000) ||
      (amountFilter === "medium" &&
        dispute.amount >= 1000 &&
        dispute.amount < 2000) ||
      (amountFilter === "low" && dispute.amount < 1000);

    return matchesSearch && matchesStatus && matchesPriority && matchesAmount;
  });

  const stats = {
    total: disputes.length,
    Ressolved: disputes.filter((d) => d.status === "Ressolved").length,
    pendingInfo: disputes.filter((d) => d.status === "pending_info").length,
    underReview: disputes.filter((d) => d.status === "under_review").length,
    suspicious: disputes.filter((d) => d.suspicious).length,
  };

  if(isLoading) return 'Loading...'

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Dispute Management
              </h1>
              <p className="text-gray-600">
                Monitor and resolve platform disputes
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Disputes</p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.total}
                </p>
              </div>
              <div className="p-2 bg-gray-100 rounded-lg">
                <Shield className="w-5 h-5 text-gray-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Pending</p>
                <p className="text-2xl font-bold text-red-600">
                  {stats.pendingInfo}
                </p>
              </div>
              <div className="p-2 bg-red-100 rounded-lg">
                <Clock className="w-5 h-5 text-red-600" />
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Under Review</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {stats.underReview}
                </p>
              </div>
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Eye className="w-5 h-5 text-yellow-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Ressolved</p>
                <p className="text-2xl font-bold text-green-600">
                  {stats.Ressolved}
                </p>
              </div>
              <div className="p-2 bg-green-100 rounded-lg">
                <TicketPlus className="w-5 h-5 text-green-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg border border-gray-200 mb-6">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between gap-4">
              <div className="flex-1 max-w-md">
                <div className="relative">
                  <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search disputes, orders, or parties..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Filter className="w-4 h-4" />
                Filters
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    showFilters ? "rotate-180" : ""
                  }`}
                />
              </button>
            </div>
          </div>

          {showFilters && (
            <div className="p-4 border-b border-gray-200 bg-gray-50">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="all">All Statuses</option>
                    <option value="pending_info">Pending</option>
                    <option value="under_review">Under Review</option>
                    <option value="Ressolved">Ressolved</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Amount Range
                  </label>
                  <select
                    value={amountFilter}
                    onChange={(e) => setAmountFilter(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="all">All Amounts</option>
                    <option value="high">$2000+</option>
                    <option value="medium">$1000-$1999</option>
                    <option value="low">Under $1000</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Disputes Table */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Dispute Details
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Parties
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Timeline
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data?.map((dispute, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-medium text-gray-900">
                            Dispute ID: {dispute.id}
                          </p>
                          {/* {dispute.suspicious && (
                            <Flag
                              className="w-4 h-4 text-orange-500"
                              title="Suspicious Activity"
                            />
                          )} */}
                        </div>
                        <p className="text-sm text-gray-500">
                          Order ID: {dispute.orderId}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          {dispute.subject}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-blue-500" />
                          <span className="text-sm text-gray-900">
                            {dispute.client}
                          </span>
                          <span className="text-xs bg-blue-100 text-blue-700 px-1 rounded">
                            Client
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-purple-500" />
                          <span className="text-sm text-gray-900">
                            {dispute.freelancer}
                          </span>
                          <span className="text-xs bg-purple-100 text-purple-700 px-1 rounded">
                            Freelancer
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="space-y-2">
                        {dispute.status}
                        {/* {getStatusBadge(dispute.status)} */}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-1">
                        <DollarSign className="w-4 h-4 text-gray-400" />
                        <span className="text-sm font-medium text-gray-900">
                          {dispute.total_price}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="space-y-1">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-gray-400" />
                          <span className="text-xs text-gray-500">
                            Created at: {dispute.created_at}
                          </span>
                        </div>
                        {/* <p className="text-xs text-gray-400">
                          Age: {dispute.age}
                        </p> */}
                        {/* <p className="text-xs text-gray-400">
                          Last: {dispute.lastActivity}
                        </p> */}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <button
                        onClick={handleviewdetail}
                        className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-lg hover:bg-blue-200 transition-colors"
                      >
                        <Eye className="w-3 h-3" />
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredDisputes.length === 0 && (
            <div className="text-center py-8">
              <Shield className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No disputes found
              </h3>
              <p className="text-gray-500">
                Try adjusting your filters or search terms.
              </p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {filteredDisputes.length > 0 && (
          <div className="mt-6 flex items-center justify-between">
            <div className="text-sm text-gray-500">
              Showing {filteredDisputes.length} of {disputes.length} disputes
            </div>
            <div className="flex items-center gap-2">
              <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 text-sm">
                Previous
              </button>
              <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm">
                1
              </button>
              <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 text-sm">
                2
              </button>
              <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 text-sm">
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDisputeDashboard;
