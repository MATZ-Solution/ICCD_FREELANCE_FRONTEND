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
} from "lucide-react";
import { useParams } from "react-router-dom";
import { useGetProjectsById } from "../../../api/client/project";
import { formatSingleDate } from "../../../functions/timeFormat";
import ProposalModal from "../../component/ProposalModal";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import ICCDLoader from "../../component/loader";
import ICCDError from "../../component/ICCDError";
import { UserRound, CircleUserRound, CircleUser   } from 'lucide-react';

const ProjectDetailFreelancer = () => {
  const { id } = useParams();
  const [show, setShow] = useState(false);
  const pathName = useLocation().pathname;
  const freelancerData = useSelector((state) => state.userProfile.userProfile);
  const { data, isSuccess, isPending, isError, error, isLoading } =
    useGetProjectsById(id);

  if (isPending) {
    return <ICCDLoader />;
  }

  if (isError) {
    return <ICCDError />;
  }

  if (!data || data.length === 0) {
    return <ICCDError />;
  }

  const project = data[0];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {show && (
        <ProposalModal
          onClose={() => setShow(false)}
          data={data}
          freelancerData={freelancerData}
        />
      )}

      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Header */}
            <div className="bg-white rounded-3xl shadow-md border border-blue-100 p-8 hover:shadow-xl transition-all duration-300 hover:border-blue-200">
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-8 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full"></div>
                  <span className="text-sm font-semibold text-blue-600 uppercase tracking-wide">
                    We're looking for a...
                  </span>
                </div>

                <h1 className="lg:text-4xl md:text-3xl sm:text-2xl text-2xl font-bold text-gray-900 leading-tight">
                  {project?.title || "Project Title"}
                </h1>

                <div className="flex flex-wrap gap-4 pt-4">
                  <div className="flex items-center gap-3 bg-gradient-to-r from-blue-50 to-cyan-50 px-5 py-3 rounded-xl border border-blue-200 hover:border-blue-300 transition-all">
                    <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                      <Globe className="w-3.5 h-3.5 text-white" />
                    </div>
                    <span className="font-semibold text-blue-900">
                      {project?.mode || "N/A"}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 bg-gradient-to-r from-emerald-50 to-teal-50 px-5 py-3 rounded-xl border border-emerald-200 hover:border-emerald-300 transition-all">
                    <Clock className="w-5 h-5 text-emerald-600" />
                    <span className="font-semibold text-emerald-900">
                      {project?.duration || "N/A"}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 bg-gradient-to-r from-purple-50 to-pink-50 px-5 py-3 rounded-xl border border-purple-200 hover:border-purple-300 transition-all">
                    <Users className="w-5 h-5 text-purple-600" />
                    <span className="font-semibold text-purple-900">
                      Hiring {project?.total_freelancer || 0} Freelancers
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Overview */}
            <div className="bg-white rounded-3xl shadow-md border border-blue-100 overflow-hidden hover:shadow-xl transition-all duration-300 hover:border-blue-200">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 border-b border-blue-100">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                  <div className="w-1 h-6 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full"></div>
                  Overview
                </h2>
              </div>
              <div className="p-8 space-y-6">
                <p className="text-gray-700 leading-relaxed text-lg">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: project?.overview || "No overview available",
                    }}
                  />
                </p>

                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-500 p-6 rounded-r-xl">
                  <p className="text-blue-900 leading-relaxed font-medium">
                    💡 This project could be followed by other similar projects
                    in the coming months as we are looking for an instructional
                    technologist that can work on additional projects as they
                    are needed.
                  </p>
                </div>
              </div>
            </div>

            {/* Deliverables */}
            <div className="bg-white rounded-3xl shadow-md border border-blue-100 overflow-hidden hover:shadow-xl transition-all duration-300 hover:border-blue-200">
              <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-6 border-b border-blue-100">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                  <Briefcase className="w-6 h-6 text-emerald-600" />
                  Deliverables
                </h2>
              </div>
              <div className="p-8 space-y-6">
                <p className="text-gray-700 leading-relaxed text-lg">
                  <div
                    dangerouslySetInnerHTML={{
                      __html:
                        project?.deliverable || "No deliverables specified",
                    }}
                  />
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-2xl border border-purple-200 hover:border-purple-300 transition-all hover:shadow-md">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                        <Calendar className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="font-bold text-purple-900 text-lg">
                        Deadline
                      </h3>
                    </div>
                    <p className="text-purple-800 font-semibold text-base">
                      {project?.deadline
                        ? formatSingleDate(project.deadline)
                        : "TBD"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Project Details */}
            <div className="bg-white rounded-3xl shadow-md border border-blue-100 p-8 hover:shadow-xl transition-all duration-300 hover:border-blue-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-100 hover:border-blue-200 transition-all hover:shadow-md">
                  <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <Briefcase className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2 text-sm uppercase tracking-wide text-gray-500">
                    Project Type
                  </h3>
                  <p className="text-gray-900 font-bold text-lg">
                    {project?.type || "N/A"}
                  </p>
                </div>

                <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-100 hover:border-emerald-200 transition-all hover:shadow-md">
                  <div className="w-14 h-14 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <Globe className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2 text-sm uppercase tracking-wide text-gray-500">
                    Languages
                  </h3>
                  <p className="text-gray-900 font-bold text-lg">
                    {project?.languages || "N/A"}
                  </p>
                </div>

                <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-100 hover:border-purple-200 transition-all hover:shadow-md">
                  <div className="w-14 h-14 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <Calendar className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2 text-sm uppercase tracking-wide text-gray-500">
                    Deadline
                  </h3>
                  <p className="text-gray-900 font-bold text-lg">
                    {project?.deadline
                      ? formatSingleDate(project.deadline)
                      : "TBD"}
                  </p>
                </div>
              </div>
            </div>

            {/* Attachments */}
            {project.files && project.files.length > 0 && (
              <div className="bg-white rounded-3xl shadow-md border border-blue-100 overflow-hidden hover:shadow-xl transition-all duration-300 hover:border-blue-200">
                <div className="bg-gradient-to-r from-orange-50 to-red-50 p-6 border-b border-blue-100">
                  <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                    <Paperclip className="w-6 h-6 text-orange-600" />
                    Project Attachments
                  </h2>
                </div>
                <div className="p-8">
                  <div className="space-y-4">
                    {project.files.split(",").map((fileUrl, index) => {
                      const fileName = fileUrl.split("/").pop(); // extract filename from URL
                      const fileType = fileName.split(".").pop().toLowerCase(); // get extension
                      return (
                        <div
                          key={index}
                          className="flex items-center justify-between p-5 bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl border border-orange-200 hover:border-orange-300 transition-all hover:shadow-md"
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                              {fileType === "pdf" ? (
                                <FileText className="w-6 h-6 text-white" />
                              ) : (
                                <File className="w-6 h-6 text-white" />
                              )}
                            </div>
                            <div>
                              <p className="font-bold text-gray-900">
                                {fileName}
                              </p>
                              <p className="text-xs text-gray-500">File</p>
                            </div>
                          </div>
                          <a
                            href={fileUrl}
                            download={fileName}
                            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold rounded-lg transition-all duration-300 hover:shadow-lg transform hover:scale-105 active:scale-95"
                          >
                            <Download className="w-4 h-4" />
                            <span>Download</span>
                          </a>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* Skills and Freelancer Type */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-3xl shadow-md border border-blue-100 overflow-hidden hover:shadow-xl transition-all duration-300 hover:border-blue-200">
                <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-6 border-b border-blue-100">
                  <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                    <Star className="w-6 h-6 text-yellow-500" />
                    Required Skills
                  </h2>
                </div>
                <div className="p-6">
                  <div className="flex gap-3 flex-wrap">
                    {project?.skills ? (
                      project.skills.split(",").map((item, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-4 py-2.5 rounded-full text-sm font-semibold bg-gradient-to-r from-yellow-100 to-orange-100 text-yellow-800 border border-yellow-300 hover:border-yellow-400 transition-all hover:shadow-md"
                        >
                          {item.trim()}
                        </span>
                      ))
                    ) : (
                      <p className="text-gray-500">No skills specified</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-3xl shadow-md border border-blue-100 overflow-hidden hover:shadow-xl transition-all duration-300 hover:border-blue-200">
                <div className="bg-gradient-to-r from-pink-50 to-rose-50 p-6 border-b border-blue-100">
                  <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                    <Briefcase className="w-6 h-6 text-pink-600" />
                    Freelancer Type
                  </h2>
                </div>
                <div className="p-6">
                  <span className="inline-flex items-center px-5 py-3 rounded-full text-base font-bold bg-gradient-to-r from-pink-100 to-rose-100 text-pink-800 border border-pink-300 hover:border-pink-400 transition-all hover:shadow-md">
                    {project?.freelancerType || "Not specified"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-6 space-y-6">
              {/* Budget */}
              <div className="bg-white rounded-3xl shadow-md border border-blue-100 overflow-hidden hover:shadow-xl transition-all duration-300 hover:border-blue-200">
                <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-6 border-b border-blue-100">
                  <div className="text-sm font-semibold text-emerald-700 uppercase tracking-widest mb-3">
                    💰 Client Budget
                  </div>
                  <div className="text-4xl font-bold text-gray-900">
                    ${project?.budget || "0"}
                  </div>
                </div>
                {pathName.includes("freelancer") && (
                  <div className="p-6 space-y-4">
                    <button
                      onClick={() => setShow(true)}
                      className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-bold py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-2xl flex items-center justify-center gap-3 active:scale-95 cursor-pointer"
                    >
                      <span className="text-2xl">👍</span>
                      <span>I'm Interested</span>
                    </button>
                  </div>
                )}
              </div>

              {/* About the Employer */}
              <div className="bg-white rounded-3xl shadow-md border border-blue-100 overflow-hidden hover:shadow-xl transition-all duration-300 hover:border-blue-200">
                <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-6 border-b border-blue-100">
                  <h3 className="text-xl font-bold text-gray-900">
                    About the Employer
                  </h3>
                </div>
                <div className="p-6 space-y-5">
                  <div className="flex items-center gap-4">
                    {
                      project?.companyImg ?
                        <img
                          className="w-14 h-14 object-cover rounded-full ring-2 ring-blue-100"
                          src={project?.companyImg}
                          alt="Company logo"
                        />
                        : <CircleUser size={35}/>
                    }

                    <div>
                      <div className="font-bold text-gray-900 text-lg">
                        {project?.companyName || "Company"}
                      </div>
                      <div className="text-xs text-gray-500 uppercase tracking-wide">
                        Verified Client
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-700 leading-relaxed text-sm">
                    {project?.companyAbout ||
                      "No company information available"}
                  </p>

                  <div className="flex items-center gap-3 text-gray-700 bg-blue-50 p-4 rounded-2xl border border-blue-100 hover:border-blue-200 transition-all">
                    <MapPin className="w-5 h-5 text-blue-600 flex-shrink-0" />
                    <div>
                      <div className="font-bold text-gray-900">Pakistan</div>
                      <div className="text-xs text-gray-500">
                        Karachi, Sindh
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-emerald-700 bg-emerald-50 p-4 rounded-2xl border border-emerald-200">
                    <CheckCircle className="w-5 h-5 flex-shrink-0" />
                    <span className="font-bold">
                      Employer identity verified
                    </span>
                  </div>
                </div>
              </div>

              {/* Share this project */}
              <div className="bg-white rounded-3xl shadow-md border border-blue-100 overflow-hidden hover:shadow-xl transition-all duration-300 hover:border-blue-200">
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 border-b border-blue-100">
                  <h3 className="text-xl font-bold text-gray-900">
                    Share this project
                  </h3>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-4 gap-3">
                    <button
                      className="p-3.5 border-2 border-blue-200 rounded-xl hover:bg-blue-50 hover:border-blue-400 transition-all duration-300 group hover:shadow-md"
                      aria-label="Share on Facebook"
                    >
                      <Facebook className="w-5 h-5 text-blue-600 mx-auto group-hover:scale-125 transition-transform" />
                    </button>
                    <button
                      className="p-3.5 border-2 border-sky-200 rounded-xl hover:bg-sky-50 hover:border-sky-400 transition-all duration-300 group hover:shadow-md"
                      aria-label="Share on Twitter"
                    >
                      <Twitter className="w-5 h-5 text-sky-600 mx-auto group-hover:scale-125 transition-transform" />
                    </button>
                    <button
                      className="p-3.5 border-2 border-blue-200 rounded-xl hover:bg-blue-50 hover:border-blue-400 transition-all duration-300 group hover:shadow-md"
                      aria-label="Share on LinkedIn"
                    >
                      <Linkedin className="w-5 h-5 text-blue-700 mx-auto group-hover:scale-125 transition-transform" />
                    </button>
                    <button
                      className="p-3.5 border-2 border-pink-200 rounded-xl hover:bg-pink-50 hover:border-pink-400 transition-all duration-300 group hover:shadow-md"
                      aria-label="Share on Instagram"
                    >
                      <Instagram className="w-5 h-5 text-pink-600 mx-auto group-hover:scale-125 transition-transform" />
                    </button>
                  </div>
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
