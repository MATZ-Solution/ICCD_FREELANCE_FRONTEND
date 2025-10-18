import {
  MapPin,
  User,
  Clock,
  DollarSign,
  Users,
  Briefcase,
  Download,
  Eye,
  BriefcaseBusiness,
  X,
  Check,
  XCircle,
} from "lucide-react";
import {
  useGetJobById,
  getJobPropsalByClient,
  useJobCloseById,
  useJobProposalAction,
} from "../../../api/client/job";
import { useParams } from "react-router-dom";
import { downloadFile } from "../../../functions/download_pdf";
import ICCDLoader from "../../component/loader";
import ICCDError from "../../component/ICCDError";
import { useState } from "react";

export default function JobDetailPage() {
  const { id } = useParams();
  const { data, isSuccess, isPending, isError, isLoading } = useGetJobById(id);
  const { jobProposals, error } = getJobPropsalByClient({ id });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { closejob } = useJobCloseById(id);
  const { updateProposalAction, isLoading: actionloading } =
    useJobProposalAction();

  if (isLoading || isPending) {
    return <ICCDLoader />;
  }

  if (isError) {
    return <ICCDError message={isError} />;
  }

  if (!data || data.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Briefcase className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-xl text-gray-600">No job details found</p>
        </div>
      </div>
    );
  }

  const jobData = data[0];

  const handleAction = (item, action) => {
    updateProposalAction({
      id: item.id,
      name: item.freelancerName,
      email: item.email,
      remaining_position: jobData?.remaining_position,
      jobId: jobData?.id,
      action,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-8 overflow-hidden">
          <div className="bg-gradient-to-r from-[#043A53] via-[#065f73] to-[#47AAB3] rounded-xl p-6 text-white">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-white mb-3">
                  {jobData?.jobTitle}
                </h1>
                <div className="flex flex-wrap gap-3">
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium bg-white/20 text-white backdrop-blur-sm">
                    <Briefcase className="w-4 h-4" />
                    {jobData?.jobType}
                  </span>
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium bg-white/20 text-white backdrop-blur-sm">
                    <MapPin className="w-4 h-4" />
                    {jobData?.city} , {jobData?.country}
                  </span>
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium bg-white/20 text-white backdrop-blur-sm">
                    <Users className="w-4 h-4" />
                    {jobData?.totalPersontoHire}{" "}
                    {jobData?.totalPersontoHire === 1
                      ? "Position"
                      : "Positions"}
                  </span>
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium bg-white/20 text-white backdrop-blur-sm">
                    <DollarSign className="w-4 h-4" /> {jobData?.minSalaray} -{" "}
                    {jobData?.maxSalaray}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="bg-gray-50 px-6 py-6 border-t">
            <div
              className={`grid grid-cols-1 sm:grid-cols-2 ${
                jobData?.status !== "closed"
                  ? "lg:grid-cols-4"
                  : "lg:grid-cols-3"
              } gap-4`}
            >
              <StatCard
                icon={<Users className="w-6 h-6 text-green-600" />}
                bg="bg-green-100"
                title="Applications"
                value={jobProposals?.length || 0}
              />
              <StatCard
                icon={<Briefcase className="w-6 h-6 text-blue-600" />}
                bg="bg-blue-100"
                title="Positions Open"
                value={jobData?.totalPersontoHire}
              />
              <StatCard
                icon={<Eye className="w-6 h-6 text-purple-600" />}
                bg="bg-purple-100"
                title="Status"
                value={jobData?.status}
                valueClass={
                  jobData?.status !== "closed"
                    ? "text-green-600 bg-green-100 px-2 py-1 rounded-full"
                    : "text-red-600 bg-red-100 px-2 py-1 rounded-full"
                }
              />

              <div className="flex  lg:items-center lg:justify-center">
                {jobData?.status !== "closed" && (
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 w-40 justify-center px-4 py-2 bg-red-600 text-white rounded-lg shadow-sm hover:bg-red-700 transition"
                  >
                    <BriefcaseBusiness className="w-5 h-5" />
                    <span>Close the Job</span>
                  </button>
                )}

                {isModalOpen && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50 backdrop-blur-sm">
                    <div className="bg-white rounded-lg shadow-lg max-w-md w-full mx-4 p-6 relative">
                      {/* Close Icon */}
                      <button
                        onClick={() => setIsModalOpen(false)}
                        className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                      >
                        <X className="w-5 h-5" />
                      </button>

                      <h2 className="text-xl font-semibold mb-2">
                        Close this Job?
                      </h2>
                      <p className="text-gray-600 mb-6">
                        Once closed, applicants will no longer be able to apply
                        for this position.
                      </p>

                      <div className="flex justify-end gap-3">
                        <button
                          onClick={() => setIsModalOpen(false)}
                          className="px-4 py-2 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => {
                            closejob();
                            setIsModalOpen(false);
                          }}
                          className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 transition"
                        >
                          Yes, Close Job
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          {/* Main Content Area */}
          <div className="xl:col-span-3 space-y-8">
            {/* Job Description - moved below proposals */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="bg-gray-50 p-6 border-gray-300 border-b">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Eye className="w-4 h-4 text-blue-600" />
                  </div>
                  Job Description
                </h2>
              </div>
              <div className="p-6">
                <div
                  className="prose prose-gray max-w-none"
                  dangerouslySetInnerHTML={{ __html: jobData?.jobDescription }}
                />
              </div>
            </div>

            {/* Proposals Section */}
            <ProposalSection
              jobProposals={jobProposals}
              handleAction={handleAction}
              actionloading={actionloading}
            />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Job Info */}
            <JobInfoCard jobData={jobData} />
            {/* Application Progress */}
            <ApplicationProgress
              applications={jobProposals?.length || 0}
              totalPositions={jobData?.remaining_position}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ----------------- COMPONENTS ----------------- */

function StatCard({ icon, bg, title, value, valueClass }) {
  return (
    <div className="flex items-center gap-3">
      <div
        className={`w-10 h-10 ${bg} rounded-lg flex items-center justify-center`}
      >
        {icon}
      </div>
      <div>
        <p className="text-sm text-gray-600">{title}</p>
        <p
          className={` capitalize font-semibold ${
            valueClass || "text-gray-900"
          }`}
        >
          {value}
        </p>
      </div>
    </div>
  );
}

function ProposalSection({ jobProposals, handleAction, actionloading }) {
  const [filter, setFilter] = useState("all");

  const filteredProposals = jobProposals?.filter((item) => {
    if (filter === "all") return true;
    if (filter === "shortlisted") return item?.status === "selected";
    return true;
  });

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white">Candidate Proposals</h2>
          <p className="text-emerald-100 mt-1">
            {jobProposals?.length || 0} candidates have applied
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          {[
            { key: "all", label: "All" },
            { key: "shortlisted", label: "Shortlisted" },
          ].map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`px-4 py-2 rounded-lg border transition-all duration-200 text-sm font-medium ${
                filter === f.key
                  ? "bg-white text-emerald-700 border-emerald-300"
                  : "bg-white/20 text-white border-white/30 hover:bg-white/30"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Proposals List */}
      <div className="p-6">
        {filteredProposals?.length > 0 ? (
          <div className="space-y-4">
            {filteredProposals.map((item, index) => (
              <div
                key={index}
                className="flex flex-col md:flex-row md:items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-emerald-300 hover:shadow-md transition-all duration-200"
              >
                {/* Candidate Info */}
                <div className="flex items-center gap-4 mb-3 md:mb-0">
                  <User />
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {item?.name}
                    </h3>
                    <p className="text-sm text-gray-600 flex items-center gap-1">
                      <Briefcase className="w-3 h-3" />
                      Experience: {item?.experience} Years
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col lg:flex-row items-center gap-2">
                  {item?.status === "selected" ? (
                    <span className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-lg border border-green-200">
                      <Check className="w-4 h-4" />
                      Accepted
                    </span>
                  ) : item?.status === "not selected" ? (
                    <span className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 text-red-700 rounded-lg border border-red-200">
                      <XCircle className="w-4 h-4" />
                      Rejected
                    </span>
                  ) : (
                    <>
                      <button
                        onClick={() =>
                          downloadFile(item?.fileUrl, item?.freelancerName)
                        }
                        className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-lg transition-colors duration-200 border border-emerald-200"
                      >
                        <Download className="w-4 h-4" />
                        Download CV
                      </button>

                      <button
                        onClick={() => handleAction(item, "accept")}
                        disabled={actionloading}
                        className={`inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg border transition-colors duration-200
    ${
      actionloading
        ? "bg-green-100 text-green-500 border-green-200 cursor-not-allowed"
        : "bg-green-50 hover:bg-green-100 text-green-700 border-green-200"
    }`}
                      >
                        {actionloading ? (
                          <>
                            <svg
                              className="animate-spin h-4 w-4 text-green-600"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8v4l3.5-3.5L12 0v4a8 8 0 01-8 8z"
                              ></path>
                            </svg>
                            Processing...
                          </>
                        ) : (
                          <>
                            <Check className="w-4 h-4" />
                            Accept
                          </>
                        )}
                      </button>

                      <button
                        onClick={() => handleAction(item, "rejected")}
                        disabled={actionloading}
                        className={`inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg border transition-colors duration-200
    ${
      actionloading
        ? "bg-red-100 text-red-500 border-red-200 cursor-not-allowed"
        : "bg-red-50 hover:bg-red-100 text-red-700 border-red-200"
    }`}
                      >
                        {actionloading ? (
                          <>
                            <svg
                              className="animate-spin h-4 w-4 text-red-600"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8v4l3.5-3.5L12 0v4a8 8 0 01-8 8z"
                              ></path>
                            </svg>
                            Processing...
                          </>
                        ) : (
                          <>
                            <XCircle className="w-4 h-4" />
                            Reject
                          </>
                        )}
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No {filter !== "all" ? filter.replace(/([A-Z])/g, " $1") : ""}{" "}
              Applications
            </h3>
            <p className="text-gray-600">
              CVs will appear here once candidates start applying.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function JobInfoCard({ jobData }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="bg-gray-50 border-gray-300 p-4 border-b">
        <h2 className="text-lg font-semibold text-gray-900">Job Information</h2>
      </div>
      <div className="p-4 space-y-4">
        <InfoItem
          icon={<DollarSign className="w-4 h-4 text-green-600" />}
          bg="bg-green-100"
          title="Compensation"
          value={jobData?.payType}
          valueClass="text-green-700"
        />
        <InfoItem
          icon={<Clock className="w-4 h-4 text-blue-600" />}
          bg="bg-blue-100"
          title="Employment Type"
          value={jobData?.jobType}
          valueClass="text-blue-700"
        />
        <InfoItem
          icon={<MapPin className="w-4 h-4 text-red-600" />}
          bg="bg-red-100"
          title="Location"
          value={jobData?.city}
          valueClass="text-red-700"
        />
        <InfoItem
          icon={<Users className="w-4 h-4 text-purple-600" />}
          bg="bg-purple-100"
          title="Open Positions"
          value={`${jobData?.totalPersontoHire} ${
            jobData?.totalPersontoHire === 1 ? "opening" : "openings"
          }`}
          valueClass="text-purple-700"
        />
      </div>
    </div>
  );
}

function InfoItem({ icon, bg, title, value, valueClass }) {
  return (
    <div
      className={`flex items-start gap-3 p-3 ${bg.replace(
        "100",
        "50"
      )} rounded-lg border border-gray-50`}
    >
      <div
        className={`w-8 h-8 ${bg} rounded-lg flex items-center justify-center flex-shrink-0`}
      >
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <p className="font-medium text-gray-900 text-sm">{title}</p>
        <p className={`text-sm font-semibold ${valueClass}`}>{value}</p>
      </div>
    </div>
  );
}

function ApplicationProgress({ applications, totalPositions }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="bg-gray-50 p-4  border-gray-300 border-b">
        <h3 className="font-semibold  text-gray-900 text-lg">
          Application Progress
        </h3>
      </div>
      <div className="p-4">
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Applications received</span>
            <span className="font-semibold text-gray-900">{applications}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Positions remaining</span>
            <span className="font-semibold text-green-600">
              {totalPositions}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
            <div
              className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-500"
              style={{
                width: `${Math.min(
                  (applications / (totalPositions * 2)) * 100,
                  100
                )}%`,
              }}
            />
          </div>
          <p className="text-xs text-gray-500 mt-2 text-center">
            {applications === 0
              ? "Waiting for first application"
              : "Applications are coming in!"}
          </p>
        </div>
      </div>
    </div>
  );
}
