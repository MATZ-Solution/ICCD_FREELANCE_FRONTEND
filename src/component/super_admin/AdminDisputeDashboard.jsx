import React, { useState } from "react";
import {
  Search,
  Filter,
  Clock,
  DollarSign,
  ChevronDown,
  Eye,
  Calendar,
  User,
  Shield,
  TicketPlus,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useGetAllDisputeByAdmin } from "../../../api/client/dispute";

const AdminDisputeDashboard = () => {
  const { data = [], error, isLoading, isError } = useGetAllDisputeByAdmin();
  console.log("data: ", data);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [amountFilter, setAmountFilter] = useState("all");
  const [showFilters, setShowFilters] = useState(false);

  const navigate = useNavigate();
  const handleviewdetail = (id) => {
    navigate(`/superadmin/admindisputedetail/${id}`);
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      Ressolved: {
        bg: "bg-green-100",
        text: "text-green-800",
        label: "Ressolved",
      },
      pending: {
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
    const config = statusConfig[status] || {
      bg: "bg-gray-100",
      text: "text-gray-800",
      label: status || "Unknown",
    };
    return (
      <span
        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}
      >
        {config.label}
      </span>
    );
  };

  // filtering logic
  const filtereddata = data.filter((dispute) => {
    const matchesSearch =
      !searchTerm ||
      dispute.id?.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
      dispute.orderId?.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
      dispute.client?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dispute.freelancer?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || dispute.status === statusFilter;

    const matchesAmount =
      amountFilter === "all" ||
      (amountFilter === "high" && dispute.total_price >= 2000) ||
      (amountFilter === "medium" &&
        dispute.total_price >= 1000 &&
        dispute.total_price < 2000) ||
      (amountFilter === "low" && dispute.total_price < 1000);

    return matchesSearch && matchesStatus && matchesAmount;
  });

  const stats = {
    total: data.length,
    Ressolved: data.filter((d) => d.status === "Ressolved").length,
    pendingInfo: data.filter((d) => d.status === "pending").length,
    underReview: data.filter((d) => d.status === "under_review").length,
  };

  if (isLoading) return <div className="p-6">Loading...</div>;
  if (isError) return <div className="p-6 text-red-500">Error loading disputes</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <h1 className="text-2xl font-bold text-gray-900">
            Dispute Management
          </h1>
          <p className="text-gray-600">Monitor and resolve platform disputes</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <StatCard label="Total" value={stats.total} icon={<Shield className="w-5 h-5 text-gray-600" />} />
          <StatCard label="Pending" value={stats.pendingInfo} icon={<Clock className="w-5 h-5 text-red-600" />} color="red" />
          <StatCard label="Under Review" value={stats.underReview} icon={<Eye className="w-5 h-5 text-yellow-600" />} color="yellow" />
          <StatCard label="Ressolved" value={stats.Ressolved} icon={<TicketPlus className="w-5 h-5 text-green-600" />} color="green" />
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg border border-gray-200 mb-6">
          <div className="p-4 border-b border-gray-200 flex items-center justify-between gap-4">
            <div className="flex-1 max-w-md relative">
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search disputes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              <Filter className="w-4 h-4" />
              Filters
              <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? "rotate-180" : ""}`} />
            </button>
          </div>

          {showFilters && (
            <div className="p-4 border-b border-gray-200 bg-gray-50 grid grid-cols-1 md:grid-cols-2 gap-4">
              <SelectFilter
                label="Status"
                value={statusFilter}
                onChange={setStatusFilter}
                options={[
                  { value: "all", label: "All" },
                  { value: "pending", label: "Pending" },
                  { value: "under_review", label: "Under Review" },
                  { value: "Ressolved", label: "Ressolved" },
                ]}
              />
              <SelectFilter
                label="Amount"
                value={amountFilter}
                onChange={setAmountFilter}
                options={[
                  { value: "all", label: "All" },
                  { value: "high", label: "$2000+" },
                  { value: "medium", label: "$1000-$1999" },
                  { value: "low", label: "Under $1000" },
                ]}
              />
            </div>
          )}
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <Th>Dispute Details</Th>
                  <Th>Parties</Th>
                  <Th>Status</Th>
                  <Th>Amount</Th>
                  <Th>Timeline</Th>
                  <Th className="text-right">Actions</Th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filtereddata.map((dispute) => (
                  <tr key={dispute.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <p className="text-sm font-medium text-gray-900">Dispute ID: {dispute.id}</p>
                      <p className="text-sm text-gray-500">Order ID: {dispute.orderId}</p>
                      <p className="text-xs text-gray-400">{dispute.subject}</p>
                    </td>
                    <td className="px-6 py-4">
                      <Party label="Client" name={dispute.client} color="blue" />
                      <Party label="Freelancer" name={dispute.freelancer} color="purple" />
                    </td>
                    <td className="px-6 py-4">{getStatusBadge(dispute.status)}</td>
                    <td className="px-6 py-4 mt-4 flex items-center gap-1">
                      <DollarSign className="w-4 h-4 text-gray-400" />
                      <span>{dispute.total_price}</span>
                    </td>
                    <td className="px-6 py-4 text-xs text-gray-500">
                      <Calendar className="w-3 h-3 inline mr-1 text-gray-400" />
                      Created at: {dispute.created_at}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => handleviewdetail(dispute.id)}
                        className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-lg hover:bg-blue-200"
                      >
                        <Eye className="w-3 h-3" />
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filtereddata.length === 0 && (
            <div className="text-center py-8">
              <Shield className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900">No disputes found</h3>
              <p className="text-gray-500">Try adjusting filters or search terms.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// small components
const StatCard = ({ label, value, icon, color }) => (
  <div className="bg-white p-4 rounded-lg border border-gray-200 flex items-center justify-between">
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className={`text-2xl font-bold ${color ? `text-${color}-600` : "text-gray-900"}`}>{value}</p>
    </div>
    <div className="p-2 bg-gray-100 rounded-lg">{icon}</div>
  </div>
);

const SelectFilter = ({ label, value, onChange, options }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  </div>
);

const Party = ({ label, name, color }) => (
  <div className="flex items-center gap-2 mb-1">
    <User className={`w-4 h-4 text-${color}-500`} />
    <span className="text-sm text-gray-900">{name || "N/A"}</span>
    <span className={`text-xs bg-${color}-100 text-${color}-700 px-1 rounded`}>{label}</span>
  </div>
);

const Th = ({ children, className }) => (
  <th className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${className || ""}`}>
    {children}
  </th>
);

export default AdminDisputeDashboard;
