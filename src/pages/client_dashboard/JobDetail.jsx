import {
  MapPin,
  Clock,
  DollarSign,
  Users,
  Briefcase,
  Download,
  Eye,
  Calendar,
} from "lucide-react";
import { useGetJobById, getJobPropsalByClient } from "../../../api/client/job";
import { useParams } from "react-router-dom";
import { downloadFile } from "../../../functions/download_pdf";
import ICCDLoader from "../../component/loader";
import ICCDError from "../../component/ICCDError";

export default function JobDetailPage() {
  const { id } = useParams();
  const { data, isSuccess, isPending, isError, isLoading } = useGetJobById(id);
  const { jobProposals, error } = getJobPropsalByClient({ id: id });

  if (isLoading || isPending) {
    return <ICCDLoader />;
  }

  if (isError) {
    return <ICCDError message={isError} />;
  }

  if (data?.length === 0) {
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

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header Section - Enhanced */}
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
                    {jobData?.joblocation}
                  </span>
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium bg-white/20 text-white backdrop-blur-sm">
                    <Users className="w-4 h-4" />
                    {jobData?.totalPersontoHire}{" "}
                    {jobData?.totalPersontoHire === 1
                      ? "Position"
                      : "Positions"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="bg-gray-50 px-6 py-4 border-t">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Applications</p>
                  <p className="font-semibold text-gray-900">
                    {jobProposals?.length || 0}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Briefcase className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Positions Open</p>
                  <p className="font-semibold text-gray-900">
                    {jobData?.totalPersontoHire}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Eye className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Status</p>
                  <p className="font-semibold text-green-600">Active</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          {/* Main Content Area */}
          <div className="xl:col-span-3 space-y-8">
            {/* Proposals Section - Enhanced */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-white">
                      Candidate Proposals
                    </h2>
                    <p className="text-emerald-100 mt-1">
                      {jobProposals?.length || 0} candidates have applied
                    </p>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-1">
                    <span className="text-white font-medium">
                      {jobProposals?.length || 0} CVs
                    </span>
                  </div>
                </div>
              </div>
              <div className="px-4 overflow-x-auto rounded-lg">
                <table className="min-w-full bg-white">
                  <thead className="bg-[#47AAB3] text-white text-sm sticky top-0">
                    <tr>
                      <th className="px-6 py-3 text-left font-medium">Name</th>
                      <th className="px-6 py-3 text-left font-medium">Experience</th>
                      <th className="px-6 py-3 text-center font-medium">CVs</th>
                      <th className="px-6 py-3"></th>
                    </tr>
                  </thead>
                  <tbody className="text-sm divide-y divide-gray-200">
                    { jobProposals?.length > 0 ? ( jobProposals?.map((item, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap flex items-center gap-3">
                          <img src={item?.candidateImg} className="w-9 h-9 rounded-full "></img>
                          <span className="font-medium">{item?.freelancerName}</span>
                        </td>
                        <td className="px-6 py-4">{item?.experience}</td>
                        <td className="px-6 py-4 text-right">
                          <button onClick={() => downloadFile(item?.fileUrl, item?.freelancerName)} className="text-[#47AAB3] hover:underline text-sm">
                            Download CV
                          </button>
                        </td>
                      </tr>
                   ) )): (
                  <tr>
                    <td colSpan="3" className="px-6 py-4 text-center text-gray-500">
                    No CVs have been submitted for review yet.                    </td>
                  </tr>
                )}
                  </tbody>
                </table>

              <div className="p-6">
                {jobProposals?.length > 0 ? (
                  <div className="space-y-4">
                    {jobProposals.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-emerald-300 hover:shadow-md transition-all duration-200"
                      >
                        <div className="flex items-center gap-4">
                          <div className="relative">
                            <img
                              src={item?.candidateImg}
                              alt={item?.freelancerName}
                              className="w-12 h-12 rounded-full object-cover border-2 border-gray-100"
                            />
                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">
                              {item?.freelancerName}
                            </h3>
                            <p className="text-sm text-gray-600 flex items-center gap-1">
                              <Briefcase className="w-3 h-3" />
                              {item?.experience}
                            </p>
                          </div>
                        </div>

                        <button
                          onClick={() =>
                            downloadFile(item?.fileUrl, item?.freelancerName)
                          }
                          className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-lg transition-colors duration-200 border border-emerald-200"
                        >
                          <Download className="w-4 h-4" />
                          Download CV
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      No Applications Yet
                    </h3>
                    <p className="text-gray-600">
                      CVs will appear here once candidates start applying.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Job Description - Enhanced */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="bg-gray-50 p-6 border-b">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Eye className="w-4 h-4 text-blue-600" />
                  </div>
                  Job Description
                </h2>
              </div>
              <div className="p-6">
                <div
                  className="prose prose-gray max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-strong:text-gray-900"
                  dangerouslySetInnerHTML={{ __html: jobData?.jobDescription }}
                />
              </div>
            </div>
          </div>

          {/* Sidebar - Enhanced */}
          <div className="space-y-6">
            {/* Quick Actions */}
            {/* <div className="bg-gradient-to-r from-[#043A53] via-[#065f73] to-[#47AAB3] rounded-xl p-6 text-white">
              <h3 className="font-semibold mb-4">Quick Actions</h3>
              <div className="space-y-3">
               
                <button  onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/client/edit-job/${item.id}`);
                }} className="w-full bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg py-2 px-4 text-sm font-medium transition-colors duration-200">
                  Edit Job Details
                </button>
              </div>

              <div className="p-6">
                {jobProposals?.length > 0 ? (
                  <div className="space-y-4">
                    {jobProposals.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-emerald-300 hover:shadow-md transition-all duration-200"
                      >
                        <div className="flex items-center gap-4">
                          <div className="relative">
                            <img
                              src={item?.candidateImg}
                              alt={item?.freelancerName}
                              className="w-12 h-12 rounded-full object-cover border-2 border-gray-100"
                            />
                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">
                              {item?.freelancerName}
                            </h3>
                            <p className="text-sm text-gray-600 flex items-center gap-1">
                              <Briefcase className="w-3 h-3" />
                              {item?.experience}
                            </p>
                          </div>
                        </div>

                        <button
                          onClick={() =>
                            downloadFile(item?.fileUrl, item?.freelancerName)
                          }
                          className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-lg transition-colors duration-200 border border-emerald-200"
                        >
                          <Download className="w-4 h-4" />
                          Download CV
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      No Applications Yet
                    </h3>
                    <p className="text-gray-600">
                      CVs will appear here once candidates start applying.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Job Description - Enhanced */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="bg-gray-50 p-6 border-b">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Eye className="w-4 h-4 text-blue-600" />
                  </div>
                  Job Description
                </h2>
              </div>
              <div className="p-6">
                <div
                  className="prose prose-gray max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-strong:text-gray-900"
                  dangerouslySetInnerHTML={{ __html: jobData?.jobDescription }}
                />
              </div>
            </div>
          </div>

          {/* Sidebar - Enhanced */}
          <div className="space-y-6">
            {/* Quick Actions */}
            {/* <div className="bg-gradient-to-r from-[#043A53] via-[#065f73] to-[#47AAB3] rounded-xl p-6 text-white">
              <h3 className="font-semibold mb-4">Quick Actions</h3>
              <div className="space-y-3">
               
                <button  onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/client/edit-job/${item.id}`);
                }} className="w-full bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg py-2 px-4 text-sm font-medium transition-colors duration-200">
                  Edit Job Details
                </button>
              </div>
            </div> */}

            {/* Job Details Card - Enhanced */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="bg-gray-50 p-4 border-b">
                <h2 className="text-lg font-semibold text-gray-900">
                  Job Information
                </h2>
              </div>
              <div className="p-4 space-y-4">
                <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <DollarSign className="w-4 h-4 text-green-600" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-gray-900 text-sm">
                      Compensation
                    </p>
                    <p className="text-sm text-green-700 font-semibold">
                      {jobData?.payType}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-gray-900 text-sm">
                      Employment Type
                    </p>
                    <p className="text-sm text-blue-700 font-semibold">
                      {jobData?.jobType}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-red-50 rounded-lg border border-red-200">
                  <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-4 h-4 text-red-600" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-gray-900 text-sm">
                      Location
                    </p>
                    <p className="text-sm text-red-700 font-semibold">
                      {jobData?.joblocation}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg border border-purple-200">
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Users className="w-4 h-4 text-purple-600" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-gray-900 text-sm">
                      Open Positions
                    </p>
                    <p className="text-sm text-purple-700 font-semibold">
                      {jobData?.totalPersontoHire}{" "}
                      {jobData?.totalPersontoHire === 1
                        ? "opening"
                        : "openings"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Application Progress */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="bg-gray-50 p-4 border-b">
                <h3 className="font-semibold text-gray-900 text-lg">
                  Application Progress
                </h3>
              </div>
              <div className="p-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">
                      Applications received
                    </span>
                    <span className="font-semibold text-gray-900">
                      {jobProposals?.length || 0}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">
                      Positions remaining
                    </span>
                    <span className="font-semibold text-green-600">
                      {jobData?.totalPersontoHire}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-500"
                      style={{
                        width: `${Math.min(
                          ((jobProposals?.length || 0) /
                            (jobData?.totalPersontoHire * 2)) *
                            100,
                          100
                        )}%`,
                      }}
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-2 text-center">
                    {jobProposals?.length === 0
                      ? "Waiting for first application"
                      : "Applications are coming in!"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}
