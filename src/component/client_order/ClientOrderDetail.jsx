import { useState } from "react";
import {
  ArrowLeft,
  Package,
  Calendar,
  DollarSign,
  CheckCircle,
  Clock,
  MessageSquare,
  Star,
} from "lucide-react";
import { useSingleOrderByClient } from "../../../api/client/order";
import { useNavigate, useParams } from "react-router-dom";

const ClientOrderDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: orderData, isLoading, isError } = useSingleOrderByClient(id);

  if (isLoading)
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );

  if (isError)
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-red-100">
          <div className="text-red-500 text-center">
            <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Failed to load order</h3>
            <p className="text-slate-600">Please try again later</p>
          </div>
        </div>
      </div>
    );

  if (!orderData || !orderData.order)
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-2xl shadow-xl">
          <div className="text-center">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Package className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No order found</h3>
            <p className="text-slate-600">
              The order you're looking for doesn't exist
            </p>
          </div>
        </div>
      </div>
    );

  const order = orderData.order;

  const matchedPackage = orderData.packages?.find(
    (pkg) => pkg.packageType === order.package_type
  );

  let parsedPackages = {};
  if (matchedPackage) {
    try {
      parsedPackages = JSON.parse(matchedPackage.packages);
    } catch (error) {
      console.error("Failed to parse package features", error);
    }
  }

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "paid":
      case "completed":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "pending":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "cancelled":
        return "bg-red-50 text-red-700 border-red-200";
      default:
        return "bg-slate-50 text-slate-700 border-slate-200";
    }
  };

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case "paid":
      case "completed":
        return <CheckCircle className="w-4 h-4" />;
      case "pending":
        return <Clock className="w-4 h-4" />;
      default:
        return <Package className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-slate-200/50 sticky top-0 z-10">
        <div className=" mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="p-2 hover:bg-slate-100 rounded-xl transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-slate-600" />
            </button>
            <div>
              <h1 className="text-xl font-semibold text-slate-900">
                Order Details
              </h1>
              <p className="text-sm text-slate-500">Order #{id}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content: Side by Side */}
      <div className=" mx-auto space-y-8 md:space-y-0 md:grid md:grid-cols-2 md:gap-8 py-8 px-4">
        {/* Left Column: Order Hero */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
          <div className="aspect-video relative overflow-hidden">
            <img
              src={order.gigsImage}
              alt={order.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <h2 className="text-2xl font-bold text-white mb-2 drop-shadow-lg">
                {order.title}
              </h2>
              <div className="flex items-center gap-2">
                <span
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(
                    order.status
                  )}`}
                >
                  {getStatusIcon(order.status)}
                  {order.status}
                </span>
              </div>
            </div>
          </div>

          <div className="p-8">
            {/* Order Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 p-4 rounded-xl border border-blue-200/50">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-blue-500 rounded-lg">
                    <Package className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm font-medium text-blue-700">
                    Package
                  </span>
                </div>
                <p className="font-semibold text-blue-900">
                  {matchedPackage?.packageType || order.package_type}
                </p>
              </div>

              <div className="bg-gradient-to-br from-emerald-50 to-emerald-100/50 p-4 rounded-xl border border-emerald-200/50">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-emerald-500 rounded-lg">
                    <DollarSign className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm font-medium text-emerald-700">
                    Total Price
                  </span>
                </div>
                <p className="font-semibold text-emerald-900">
                  ${order.total_price}
                </p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-purple-100/50 p-4 rounded-xl border border-purple-200/50">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-purple-500 rounded-lg">
                    <Star className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm font-medium text-purple-700">
                    Revisions
                  </span>
                </div>
                <p className="font-semibold text-purple-900">
                  {matchedPackage?.revisions || order.revisions}
                </p>
              </div>

              <div className="bg-gradient-to-br from-amber-50 to-amber-100/50 p-4 rounded-xl border border-amber-200/50">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-amber-500 rounded-lg">
                    <Calendar className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm font-medium text-amber-700">
                    Created
                  </span>
                </div>
                <p className="font-semibold text-amber-900">
                  {new Date(order.created_at).toLocaleDateString()}
                </p>
              </div>
            </div>

            {/* Category & Description */}
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-3">
                  Category
                </h3>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-xl">
                  <span className="text-slate-700">{order.category}</span>
                  <span className="text-slate-400">/</span>
                  <span className="text-slate-700">{order.subCategory}</span>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-3">
                  Description
                </h3>
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                  <p className="text-slate-700 leading-relaxed">
                    {order.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Package Details */}
        {matchedPackage && (
          <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
            <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 px-8 py-6">
              <h3 className="text-xl font-bold text-white">Package Details</h3>
              <p className="text-slate-300 mt-1">
                Everything included in your order
              </p>
            </div>

            <div className="p-8 space-y-6">
              {/* Package Name & Price */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                  <h4 className="font-semibold text-slate-900 mb-2">
                    Package Name
                  </h4>
                  <p className="text-slate-700">{matchedPackage.name}</p>
                </div>

                <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                  <h4 className="font-semibold text-slate-900 mb-2">
                    Package Price
                  </h4>
                  <p className="text-2xl font-bold text-emerald-600">
                    ${matchedPackage.price}
                  </p>
                </div>
              </div>

              {/* Included Features */}
              <div>
                <h4 className="font-semibold text-slate-900 mb-4">
                  Included Features
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {Object.entries(parsedPackages)
                    .filter(([_, value]) => value === true)
                    .map(([key]) => (
                      <div
                        key={key}
                        className="flex items-center gap-3 p-3 bg-emerald-50 rounded-lg border border-emerald-200"
                      >
                        <div className="flex-shrink-0 w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center">
                          <CheckCircle className="w-3 h-3 text-white" />
                        </div>
                        <span className="text-emerald-800 font-medium">
                          {key
                            .replace(/_/g, " ")
                            .replace(/\b\w/g, (l) => l.toUpperCase())}
                        </span>
                      </div>
                    ))}
                </div>
              </div>

              <div className="pt-6 border-t border-slate-200">
                <button
                  onClick={() => navigate("/client/messages")}
                  className="w-full md:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
                >
                  <MessageSquare className="w-5 h-5" />
                  Get Update From Freelancer
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClientOrderDetail;
