import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  DollarSign,
  CalendarDays,
  Clock,
  Package,
  Repeat,
  Mail,
  User,
  Briefcase,
  MessageSquare,
  Eye,
} from "lucide-react";
import { useSingleOrderByFreelancer } from "../../../api/client/order";

const DetailRow = ({ label, icon: Icon, children, isFullWidth = false }) => (
  <div
    className={`flex flex-col sm:flex-row sm:items-center justify-between gap-y-1 ${
      isFullWidth ? "col-span-full" : ""
    }`}
  >
    <dt className="font-medium flex items-center gap-1 text-white/90">
      {Icon && <Icon className="h-4 w-4 text-white/70" aria-hidden="true" />}
      {label}
    </dt>
    <dd className="text-white/90 break-words w-full sm:w-auto text-sm sm:text-base">
      {children}
    </dd>
  </div>
);

export default function OrderDetailPage() {
  const { orderId } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, isError } = useSingleOrderByFreelancer(orderId);

  if (isLoading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div
          className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16"
          aria-label="Loading spinner"
        />
      </div>
    );

  if (isError)
    return (
      <div className="text-center text-red-600 mt-10">
        <p>Oops! Something went wrong while fetching the order.</p>
      </div>
    );

  if (!data)
    return (
      <div className="text-center text-gray-600 mt-10">
        <p>No order found for the given ID.</p>
      </div>
    );

  const order = data;

  // Format created date/time
  const createdDate = new Date(order.created_at);
  const formattedDate = createdDate.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const formattedTime = createdDate.toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
  });

  function getStatusClasses(status) {
    switch (status?.toLowerCase()) {
      case "completed":
        return "bg-green-600 bg-opacity-80 text-green-100";
      case "pending":
        return "bg-yellow-600 bg-opacity-80 text-yellow-100";
      case "cancelled":
      case "failed":
        return "bg-red-600 bg-opacity-80 text-red-100";
      default:
        return "bg-gray-600 bg-opacity-80 text-gray-100";
    }
  }

  function formatCurrency(value) {
    return new Intl.NumberFormat("en-PK", {
      style: "currency",
      currency: "PKR",
      minimumFractionDigits: 0,
    }).format(value || 0);
  }

 return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col items-center py-6 px-2 sm:px-4 md:px-6 lg:px-8">
      <div className="w-full max-w-5xl">
        <h1 className="text-3xl sm:text-4xl font-extrabold mb-2 text-center text-gray-900">
          Order Details
        </h1>
        <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 text-center">
          Comprehensive overview of your project order.
        </p>

        <div className="rounded-lg shadow-md bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white overflow-hidden">
          {/* Card Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 sm:p-6 border-b border-white/30 gap-2">
            <h2 className="text-2xl sm:text-3xl font-bold">Order #{order.id}</h2>
            <span
              className={`inline-flex items-center px-3 py-1 rounded-full text-sm sm:text-base font-medium capitalize ${getStatusClasses(
                order.status
              )}`}
            >
              {order.status}
            </span>
          </div>

          {/* Card Content */}
          <div className="grid gap-6 sm:gap-8 p-4 sm:p-6">
            {/* Order Summary */}
            <section>
              <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 flex items-center gap-2 text-white">
                <DollarSign className="h-5 w-5" /> Order Summary
              </h3>
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 text-sm sm:text-base">
                <DetailRow label="Total Price" icon={DollarSign}>
                  <span className="font-bold">{formatCurrency(order.total_price)}</span>
                </DetailRow>
                <DetailRow label="Base Price">
                  {formatCurrency(order.base_price)}
                </DetailRow>
                <DetailRow label="Quantity">{order.quantity}</DetailRow>
                <DetailRow label="Package Type" icon={Package}>
                  <span className="flex items-center gap-1">
                    <Package className="h-4 w-4 text-white/70" />
                    {order.package_type}
                  </span>
                </DetailRow>
                <DetailRow label="Revisions" icon={Repeat}>
                  {order.revisions}
                </DetailRow>
              </dl>
            </section>

            <div className="border-t border-white/30" />

            {/* Client Details */}
            <section>
              <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 flex items-center gap-2 text-white">
                <User className="h-5 w-5" /> Client Details
              </h3>
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 text-sm sm:text-base">
                <DetailRow label="Email" icon={Mail}>
                  {order.email}
                </DetailRow>
                <DetailRow label="Session ID" isFullWidth>
                  <span className="text-xs font-mono bg-white bg-opacity-20 px-2 py-1 rounded text-black break-all">
                    {order.session_id}
                  </span>
                </DetailRow>
              </dl>
            </section>

            <div className="border-t border-white/30" />

            {/* Freelancer Info */}
            <section>
              <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 flex items-center gap-2 text-white">
                <Briefcase className="h-5 w-5" /> Project & Freelancer
              </h3>
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 text-sm sm:text-base">
                <DetailRow label="Freelancer ID">
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-6 rounded-full bg-green-400 bg-opacity-50 text-white flex items-center justify-center text-xs">
                      FR
                    </div>
                    {order.freelancer_id}
                  </div>
                </DetailRow>
                <DetailRow label="Gig ID">{order.gig_id}</DetailRow>
                <DetailRow label="Created At" isFullWidth>
                  <span className="flex flex-wrap items-center gap-2">
                    <CalendarDays className="h-4 w-4 text-white/70" />
                    {formattedDate}
                    <Clock className="h-4 w-4 text-white/70 ml-2" />
                    {formattedTime}
                  </span>
                </DetailRow>
              </dl>
            </section>
          </div>

          {/* Footer Actions */}
          <div className="flex flex-col sm:flex-row justify-end items-center gap-3 p-4 sm:p-6 border-t border-white/30">
            <button
              onClick={() => navigate("/messages")}
              className="w-full sm:w-auto inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium border border-white/40 bg-white bg-opacity-20 text-black hover:bg-opacity-30 h-10 px-4 py-2"
            >
              <MessageSquare className="mr-2 h-4 w-4" /> Message Freelancer
            </button>
            <button
              onClick={() =>
                navigate(`/client/gigs/gigs_details/${order.gig_id}`)
              }
              className="w-full sm:w-auto inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium bg-white bg-opacity-20 text-black hover:bg-opacity-30 h-10 px-4 py-2"
            >
              <Eye className="mr-2 h-4 w-4" /> View Gig Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}