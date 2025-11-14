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
  Download,
  File,
  FileText,
  Paperclip,
  CircleUser
} from "lucide-react";
import { useParams, useLocation } from "react-router-dom";
import { useGetProjectsById } from "../../../api/client/project";
import { formatSingleDate } from "../../../functions/timeFormat";
import ProposalModal from "../../component/ProposalModal";
import { useState } from "react";
import { useSelector } from "react-redux";
import ICCDLoader from "../../component/loader";
import ICCDError from "../../component/ICCDError";

const ProjectDetailFreelancer = () => {
  const { id } = useParams();
  const [show, setShow] = useState(false);
  const pathName = useLocation().pathname;
  const freelancerData = useSelector((state) => state.userProfile.userProfile);
  const { data, isPending, isError } = useGetProjectsById(id);

  if (isPending) return <ICCDLoader />;
  if (isError || !data || data.length === 0) return <ICCDError />;

  const project = data[0];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {show && <ProposalModal onClose={() => setShow(false)} data={data} freelancerData={freelancerData} />}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header */}
            <div className="bg-white rounded-3xl shadow-md border border-blue-100 p-6 sm:p-8 hover:shadow-xl transition-all duration-300 hover:border-blue-200">
              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-1 h-6 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full"></div>
                  <span className="text-xs sm:text-sm font-semibold text-blue-600 uppercase tracking-wide">
                    We're looking for a...
                  </span>
                </div>

                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                  {project?.title || "Project Title"}
                </h1>

                <div className="flex flex-wrap gap-3 sm:gap-4 pt-3 sm:pt-4">
                  {/* Mode */}
                  <div className="flex items-center gap-2 sm:gap-3 bg-gradient-to-r from-blue-50 to-cyan-50 px-4 py-2 sm:px-5 sm:py-3 rounded-xl border border-blue-200 hover:border-blue-300 transition-all">
                    <div className="w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                      <Globe className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-white" />
                    </div>
                    <span className="font-semibold text-blue-900 text-xs sm:text-sm">{project?.mode || "N/A"}</span>
                  </div>

                  {/* Duration */}
                  <div className="flex items-center gap-2 sm:gap-3 bg-gradient-to-r from-emerald-50 to-teal-50 px-4 py-2 sm:px-5 sm:py-3 rounded-xl border border-emerald-200 hover:border-emerald-300 transition-all">
                    <Clock className="w-4 sm:w-5 h-4 sm:h-5 text-emerald-600" />
                    <span className="font-semibold text-emerald-900 text-xs sm:text-sm">{project?.duration || "N/A"}</span>
                  </div>

                  {/* Freelancers */}
                  <div className="flex items-center gap-2 sm:gap-3 bg-gradient-to-r from-purple-50 to-pink-50 px-4 py-2 sm:px-5 sm:py-3 rounded-xl border border-purple-200 hover:border-purple-300 transition-all">
                    <Users className="w-4 sm:w-5 h-4 sm:h-5 text-purple-600" />
                    <span className="font-semibold text-purple-900 text-xs sm:text-sm">
                      Hiring {project?.total_freelancer || 0} Freelancers
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Overview */}
            <div className="bg-white rounded-3xl shadow-md border border-blue-100 overflow-hidden hover:shadow-xl transition-all duration-300 hover:border-blue-200">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 sm:p-6 border-b border-blue-100">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center gap-2 sm:gap-3">
                  <div className="w-1 h-6 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full"></div>
                  Overview
                </h2>
              </div>
              <div className="p-4 sm:p-8 space-y-4 sm:space-y-6">
                <div className="text-gray-700 leading-relaxed text-sm sm:text-lg" dangerouslySetInnerHTML={{ __html: project?.overview || "No overview available" }} />
              </div>
            </div>

            {/* Deliverables */}
            <div className="bg-white rounded-3xl shadow-md border border-blue-100 overflow-hidden hover:shadow-xl transition-all duration-300 hover:border-blue-200">
              <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-4 sm:p-6 border-b border-blue-100">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center gap-2 sm:gap-3">
                  <Briefcase className="w-5 sm:w-6 h-5 sm:h-6 text-emerald-600" />
                  Deliverables
                </h2>
              </div>
              <div className="p-4 sm:p-8 space-y-4 sm:space-y-6">
                <div className="text-gray-700 leading-relaxed text-sm sm:text-lg" dangerouslySetInnerHTML={{ __html: project?.deliverable || "No deliverables specified" }} />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-4 sm:p-6 rounded-2xl border border-purple-200 hover:border-purple-300 transition-all hover:shadow-md">
                    <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                        <Calendar className="w-4 sm:w-5 h-4 sm:h-5 text-white" />
                      </div>
                      <h3 className="font-bold text-purple-900 text-sm sm:text-lg">Deadline</h3>
                    </div>
                    <p className="text-purple-800 font-semibold text-sm sm:text-base">
                      {project?.deadline ? formatSingleDate(project.deadline) : "TBD"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Project Details */}
            <div className="bg-white rounded-3xl shadow-md border border-blue-100 p-4 sm:p-8 hover:shadow-xl transition-all duration-300 hover:border-blue-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
                {["type", "languages", "deadline"].map((field, i) => (
                  <div key={i} className={`text-center p-4 sm:p-6 rounded-2xl ${field === "type" ? "bg-blue-50 border-blue-100" : field === "languages" ? "bg-emerald-50 border-emerald-100" : "bg-purple-50 border-purple-100"} border hover:border-opacity-90 transition-all hover:shadow-md`}>
                    <div className="w-14 h-14 mx-auto mb-4 rounded-full flex items-center justify-center bg-gradient-to-r from-blue-500 to-cyan-500 shadow-lg">
                      {field === "type" && <Briefcase className="w-7 h-7 text-white" />}
                      {field === "languages" && <Globe className="w-7 h-7 text-white" />}
                      {field === "deadline" && <Calendar className="w-7 h-7 text-white" />}
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2 text-sm uppercase tracking-wide text-gray-500">
                      {field === "type" ? "Project Type" : field === "languages" ? "Languages" : "Deadline"}
                    </h3>
                    <p className="text-gray-900 font-bold text-lg">
                      {field === "type" ? project?.type || "N/A" : field === "languages" ? project?.languages || "N/A" : project?.deadline ? formatSingleDate(project.deadline) : "TBD"}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Attachments */}
            {project.files && project.files.length > 0 && (
              <div className="bg-white rounded-3xl shadow-md border border-blue-100 overflow-hidden hover:shadow-xl transition-all duration-300 hover:border-blue-200">
                <div className="bg-gradient-to-r from-orange-50 to-red-50 p-4 sm:p-6 border-b border-blue-100">
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center gap-2 sm:gap-3">
                    <Paperclip className="w-5 sm:w-6 h-5 sm:h-6 text-orange-600" />
                    Project Attachments
                  </h2>
                </div>
                <div className="p-4 sm:p-8 space-y-4 sm:space-y-6">
                  {project.files.split(",").map((fileUrl, index) => {
                    const fileName = fileUrl.split("/").pop();
                    const fileType = fileName.split(".").pop().toLowerCase();
                    return (
                      <div key={index} className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0 p-4 sm:p-5 bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl border border-orange-200 hover:border-orange-300 transition-all hover:shadow-md">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                            {fileType === "pdf" ? <FileText className="w-6 h-6 text-white" /> : <File className="w-6 h-6 text-white" />}
                          </div>
                          <div>
                            <p className="font-bold text-gray-900">{fileName}</p>
                            <p className="text-xs text-gray-500">File</p>
                          </div>
                        </div>
                        <a
                          href={fileUrl}
                          download={fileName}
                          className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold rounded-lg transition-all duration-300 hover:shadow-lg transform hover:scale-105 active:scale-95"
                        >
                          <Download className="w-4 h-4" /> Download
                        </a>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Skills & Freelancer Type */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {/* Skills */}
              <div className="bg-white rounded-3xl shadow-md border border-blue-100 overflow-hidden hover:shadow-xl transition-all duration-300 hover:border-blue-200">
                <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-4 sm:p-6 border-b border-blue-100">
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center gap-2 sm:gap-3">
                    <Star className="w-5 sm:w-6 h-5 sm:h-6 text-yellow-500" /> Required Skills
                  </h2>
                </div>
                <div className="p-4 sm:p-6 flex flex-wrap gap-2 sm:gap-3">
                  {project?.skills ? project.skills.split(",").map((item, idx) => (
                    <span key={idx} className="inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold bg-gradient-to-r from-yellow-100 to-orange-100 text-yellow-800 border border-yellow-300 hover:border-yellow-400 transition-all hover:shadow-md">
                      {item.trim()}
                    </span>
                  )) : <p className="text-gray-500">No skills specified</p>}
                </div>
              </div>

              {/* Freelancer Type */}
              <div className="bg-white rounded-3xl shadow-md border border-blue-100 overflow-hidden hover:shadow-xl transition-all duration-300 hover:border-blue-200">
                <div className="bg-gradient-to-r from-pink-50 to-rose-50 p-4 sm:p-6 border-b border-blue-100">
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center gap-2 sm:gap-3">
                    <Briefcase className="w-5 sm:w-6 h-5 sm:h-6 text-pink-600" /> Freelancer Type
                  </h2>
                </div>
                <div className="p-4 sm:p-6">
                  <span className="inline-flex items-center px-4 sm:px-5 py-2.5 rounded-full text-sm sm:text-base font-bold bg-gradient-to-r from-pink-100 to-rose-100 text-pink-800 border border-pink-300 hover:border-pink-400 transition-all hover:shadow-md">
                    {project?.freelancerType || "Not specified"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 flex flex-col gap-6">
            <div className="lg:sticky top-6 space-y-6">
              {/* Budget */}
              <div className="bg-white rounded-3xl shadow-md border border-blue-100 overflow-hidden hover:shadow-xl transition-all duration-300 hover:border-blue-200">
                <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-4 sm:p-6 border-b border-blue-100">
                  <div className="text-sm sm:text-base font-semibold text-emerald-700 uppercase tracking-widest mb-3">
                    💰 Client Budget
                  </div>
                  <div className="text-3xl sm:text-4xl font-bold text-gray-900">
                    ${project?.budget || "0"}
                  </div>
                </div>
                {pathName.includes("freelancer") && (
                  <div className="p-4 sm:p-6">
                    <button
                      onClick={() => setShow(true)}
                      className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-bold py-3 sm:py-4 px-4 sm:px-6 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-2xl flex items-center justify-center gap-2 sm:gap-3 active:scale-95 cursor-pointer text-sm sm:text-base"
                    >
                      👍 I'm Interested
                    </button>
                  </div>
                )}
              </div>

              {/* About Employer */}
              <div className="bg-white rounded-3xl shadow-md border border-blue-100 overflow-hidden hover:shadow-xl transition-all duration-300 hover:border-blue-200">
                <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-4 sm:p-6 border-b border-blue-100">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900">About the Employer</h3>
                </div>
                <div className="p-4 sm:p-6 space-y-4 sm:space-y-5">
                  <div className="flex items-center gap-3">
                    {project?.companyImg ? (
                      <img className="w-12 sm:w-14 h-12 sm:h-14 object-cover rounded-full ring-2 ring-blue-100" src={project?.companyImg} alt="Company logo" />
                    ) : (
                      <CircleUser size={35} />
                    )}
                    <div>
                      <div className="font-bold text-gray-900 text-sm sm:text-lg">{project?.companyName || "Company"}</div>
                      <div className="text-xs sm:text-sm text-gray-500 uppercase tracking-wide">Verified Client</div>
                    </div>
                  </div>

                  <p className="text-gray-700 leading-relaxed text-sm sm:text-base">{project?.companyAbout || "No company information available"}</p>

                  <div className="flex items-center gap-2 sm:gap-3 text-gray-700 bg-blue-50 p-3 sm:p-4 rounded-2xl border border-blue-100 hover:border-blue-200 transition-all">
                    <MapPin className="w-4 sm:w-5 h-4 sm:h-5 text-blue-500" />
                    <span className="text-xs sm:text-sm">{project?.location || "N/A"}</span>
                  </div>
                </div>
              </div>

              {/* Share */}
              <div className="bg-white rounded-3xl shadow-md border border-blue-100 overflow-hidden hover:shadow-xl transition-all duration-300 hover:border-blue-200 p-4 sm:p-6 flex items-center justify-between gap-3">
                <span className="font-bold text-gray-900 text-sm sm:text-base">Share</span>
                <div className="flex items-center gap-2 sm:gap-3">
                  <Facebook className="w-5 h-5 text-blue-600 hover:scale-110 transition-transform" />
                  <Twitter className="w-5 h-5 text-blue-400 hover:scale-110 transition-transform" />
                  <Linkedin className="w-5 h-5 text-blue-700 hover:scale-110 transition-transform" />
                  <Instagram className="w-5 h-5 text-pink-500 hover:scale-110 transition-transform" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailFreelancer;
