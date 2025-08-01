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
    className={`flex items-center justify-between ${
      isFullWidth ? "col-span-full" : ""
    }`}
  >
    <dt className="font-medium flex items-center gap-1 text-white/90">
      {Icon && <Icon className="h-4 w-4 text-white/70" aria-hidden="true" />}
      {label}
    </dt>
    <dd className="text-white/90">{children}</dd>
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col items-center py-8 px-4">
      <div className="w-full max-w-4xl">
        <h1 className="text-4xl font-extrabold mb-2 text-center text-gray-900">
          Order Details
        </h1>
        <p className="text-lg text-gray-600 mb-8 text-center">
          Comprehensive overview of your project order.
        </p>

        <div className="rounded-lg shadow-md bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white">
          {/* Card Header */}
          <div className="flex flex-row items-center justify-between space-y-0 pb-4 p-6 border-b border-white/30">
            <h2 className="text-3xl font-bold">Order #{order.id}</h2>
            <span
              className={`inline-flex items-center px-3 py-1 rounded-full text-base font-medium capitalize ${getStatusClasses(
                order.status
              )}`}
            >
              {order.status}
            </span>
          </div>

          {/* Card Content */}
          <div className="grid gap-8 pt-6 p-6">
            {/* Order Summary Section */}
            <section aria-labelledby="order-summary-title" className="mb-8">
              <h3
                id="order-summary-title"
                className="text-xl font-semibold mb-4 flex items-center gap-2 text-white"
              >
                <DollarSign
                  className="h-5 w-5"
                  aria-hidden="true"
                />{" "}
                Order Summary
              </h3>
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 text-base">
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

            <div className="border-t border-white/30 my-6"></div>

            {/* Client Details Section */}
            <section aria-labelledby="client-details-title" className="mb-8">
              <h3
                id="client-details-title"
                className="text-xl font-semibold mb-4 flex items-center gap-2 text-white"
              >
                <User className="h-5 w-5" aria-hidden="true" /> Client Details
              </h3>
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 text-base">
                <DetailRow label="Email" icon={Mail}>
                  <span className="flex items-center gap-1">{order.email}</span>
                </DetailRow>
                <DetailRow label="Client ID">
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-6 rounded-full bg-blue-400 bg-opacity-50 text-white flex items-center justify-center text-xs">
                      CL
                    </div>
                    {order.client_id}
                  </div>
                </DetailRow>
                <DetailRow label="Session ID" isFullWidth>
                  <span className="text-sm font-mono bg-white bg-opacity-20 px-2 py-1 rounded text-black">
                    {order.session_id}
                  </span>
                </DetailRow>
              </dl>
            </section>

            <div className="border-t border-white/30 my-6"></div>

            {/* Freelancer & Gig Details Section */}
            <section aria-labelledby="freelancer-project-title" className="mb-8">
              <h3
                id="freelancer-project-title"
                className="text-xl font-semibold mb-4 flex items-center gap-2 text-white"
              >
                <Briefcase className="h-5 w-5" aria-hidden="true" /> Project & Freelancer
              </h3>
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 text-base">
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
                  <span className="flex items-center gap-2">
                    <CalendarDays className="h-4 w-4 text-white/70" aria-hidden="true" />
                    {formattedDate}
                    <Clock className="h-4 w-4 text-white/70 ml-2" aria-hidden="true" />
                    {formattedTime}
                  </span>
                </DetailRow>
              </dl>
            </section>
          </div>

          {/* Card Footer */}
          <div className="flex flex-col sm:flex-row justify-end gap-4 pt-6 p-6 border-t border-white/30">
            <button
              onClick={() => navigate("/messages")}
              aria-label="Message Freelancer"
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-white/40 bg-white bg-opacity-20 text-black hover:bg-opacity-30 h-10 px-4 py-2 w-full sm:w-auto"
            >
              <MessageSquare className="mr-2 h-4 w-4" aria-hidden="true" /> Message Freelancer
            </button>
            <button
              onClick={() => navigate(`/client/gigs/gigs_details/${order.gig_id}`)}
              aria-label="View Gig Details"
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-white bg-opacity-20 text-black hover:bg-opacity-30 h-10 px-4 py-2 w-full sm:w-auto"
            >
              <Eye className="mr-2 h-4 w-4" aria-hidden="true" /> View Gig Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
