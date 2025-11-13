import {
  MapPin,
  Clock,
  Users,
  Heart,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  CheckCircle,
  Star,
  Briefcase,
  Calendar,
  Globe,
  Paperclip,
  FileText,
  File,
  Download
} from "lucide-react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useGetProjectsById } from "../../api/client/project";
import { formatSingleDate } from "../../functions/timeFormat";
import ProposalModal from "../component/ProposalModal";
import { useState } from "react";
import { useSelector } from "react-redux";
import ICCDLoader from "../component/loader";
import ICCDError from "../component/ICCDError";

export const ProjectDetail = () => {
  const { id } = useParams();
  const [show, setShow] = useState(false);
  const pathName = useLocation().pathname;
  const navigate = useNavigate();
  const isFreelancerPath = pathName.includes("/freelancer");
  const freelancerData = useSelector((state) => state.userProfile.userProfile);
  const { data, isLoading, isError } = useGetProjectsById(id);

  if (isLoading) return <ICCDLoader />;
  if (isError) return <ICCDError />;

  const project = data?.[0];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 px-4 sm:px-6 lg:px-8 py-10">
      {show && <ProposalModal onClose={() => setShow(false)} data={data} />}

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* ===== Main Content ===== */}
        <div className="lg:col-span-2 space-y-8">
          {/* Header */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8 hover:shadow-xl transition-all duration-300">
            <div className="space-y-5 sm:space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-2 h-8 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full"></div>
                <span className="text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wide">
                  {"We're looking for a..."}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight break-words">
                {project?.title}
              </h1>

              <div className="flex flex-wrap gap-3 sm:gap-4 md:gap-6 text-sm">
                <div className="flex items-center gap-2 sm:gap-3 bg-blue-50 px-3 sm:px-4 py-2 rounded-full">
                  <Globe className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                  <span className="font-medium text-blue-700">
                    {project?.mode || "N/A"}
                  </span>
                </div>

                <div className="flex items-center gap-2 sm:gap-3 bg-emerald-50 px-3 sm:px-4 py-2 rounded-full">
                  <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600" />
                  <span className="font-medium text-emerald-700">
                    {project?.duration}
                  </span>
                </div>

                <div className="flex items-center gap-2 sm:gap-3 bg-purple-50 px-3 sm:px-4 py-2 rounded-full">
                  <Users className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
                  <span className="font-medium text-purple-700">
                    Hiring {project?.total_freelancer} Freelancers
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Deliverables */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300">
            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-4 sm:p-6 border-b border-gray-200">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900">Deliverables</h2>
            </div>

            <div className="p-5 sm:p-8 space-y-6">
              <div
                className="prose prose-sm sm:prose-base prose-gray max-w-none"
                dangerouslySetInnerHTML={{ __html: project?.deliverable }}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-5 sm:p-6 rounded-xl border border-purple-200">
                  <div className="flex items-center gap-3 mb-3">
                    <Calendar className="w-5 h-5 text-purple-600" />
                    <h3 className="font-semibold text-purple-900">Deadline</h3>
                  </div>
                  <p className="text-purple-800 text-sm sm:text-base">
                    {formatSingleDate(project?.deadline)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Project Attachments */}
          {project?.files && project?.files.split(",").length > 0 && (
            <div className="bg-white rounded-3xl shadow-md border border-blue-100 overflow-hidden hover:shadow-xl transition-all duration-300 hover:border-blue-200">
              <div className="bg-gradient-to-r from-orange-50 to-red-50 p-5 sm:p-6 border-b border-blue-100">
                <h2 className="text-lg sm:text-2xl font-bold text-gray-900 flex items-center gap-3">
                  <Paperclip className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600" />
                  Project Attachments
                </h2>
              </div>

              <div className="p-5 sm:p-8 space-y-4">
                {project?.files.split(",").map((fileUrl, index) => {
                  const fileName = fileUrl.split("/").pop().replace(/^\d+-/, "");
                  const fileType = fileName.split(".").pop().toLowerCase();
                  return (
                    <div
                      key={index}
                      className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 sm:p-5 bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl border border-orange-200 hover:border-orange-300 transition-all hover:shadow-md"
                    >
                      <div className="flex items-center gap-3 sm:gap-4">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                          {fileType === "pdf" ? (
                            <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                          ) : (
                            <File className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                          )}
                        </div>
                        <div className="overflow-hidden">
                          <p className="font-bold text-gray-900 text-sm sm:text-base truncate max-w-[200px] sm:max-w-xs">
                            {fileName}
                          </p>
                          <p className="text-xs text-gray-500">File</p>
                        </div>
                      </div>

                      <a
                        href={fileUrl}
                        download={fileName}
                        className="flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold rounded-lg transition-all duration-300 hover:shadow-lg transform hover:scale-105 active:scale-95 text-sm sm:text-base"
                      >
                        <Download className="w-4 h-4" />
                        <span>Download</span>
                      </a>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Project Details */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8 hover:shadow-xl transition-all duration-300">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 text-center">
              <div>
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Briefcase className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 mb-1">Project Type</h3>
                <p className="text-gray-700 font-medium">{project?.type || "N/A"}</p>
              </div>

              <div>
                <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Globe className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 mb-1">Languages</h3>
                <p className="text-gray-700 font-medium">{project?.languages || "N/A"}</p>
              </div>

              <div>
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 mb-1">Deadline</h3>
                <p className="text-gray-700 font-medium">{formatSingleDate(project?.deadline)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* ===== Sidebar ===== */}
        <div className="lg:col-span-1 space-y-8">
          {/* Budget */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300">
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-5 sm:p-6 border-b border-gray-200">
              <div className="text-sm font-medium text-emerald-600 uppercase tracking-wide mb-2">
                Client Budget
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                {project?.budget} $
              </div>
            </div>

            <div className="p-5 sm:p-6 space-y-4">
              <button
                onClick={() => {
                  if (
                    !freelancerData ||
                    Object.keys(freelancerData).length === 0 ||
                    !isFreelancerPath
                  ) {
                    navigate("/login");
                  } else {
                    setShow(true);
                  }
                }}
                className="w-full bg-[#01AEAD] hover:bg-[#05929c] text-white font-bold py-3 sm:py-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 sm:gap-3 text-sm sm:text-base"
              >
                <span>👍</span>
                <span>{"I'm interested"}</span>
              </button>
            </div>
          </div>

          {/* Skills & Freelancer Type */}
          <div className="space-y-6 sm:space-y-8">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-5 sm:p-6 border-b border-gray-200">
                <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                  Required Skills
                </h2>
              </div>

              <div className="p-5 sm:p-6 flex flex-wrap gap-2">
                {project?.skills?.split(",").map((item, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-semibold bg-gradient-to-r from-pink-100 to-rose-100 text-pink-800 border border-pink-200"
                  >
                    {item.trim()}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
              <div className="bg-gradient-to-r from-pink-50 to-rose-50 p-5 sm:p-6 border-b border-gray-200">
                <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                  Freelancer Type
                </h2>
              </div>
              <div className="p-5 sm:p-6">
                <span className="inline-flex items-center px-3 py-1 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-semibold bg-gradient-to-r from-pink-100 to-rose-100 text-pink-800 border border-pink-200">
                  {project?.freelancerType}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
