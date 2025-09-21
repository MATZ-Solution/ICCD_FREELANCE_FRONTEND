import {
  Clock,
  Users,
  Briefcase,
  Calendar,
  Globe,
} from "lucide-react"
import { useParams } from "react-router-dom";
import { useGetProjectProposalByClient, useGetProjectsByClient, useGetProjectsById } from "../../../api/client/project";
import { formatSingleDate } from "../../../functions/timeFormat";
import ProposalModal from "../../component/ProposalModal";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { downloadFile } from "../../../functions/download_pdf";
import ICCDLoader from "../../component/loader";
import ICCDError from "../../component/ICCDError";

export const ProjectDetailClient = () => {

  const { id } = useParams()
  let [show, setShow] = useState(false)
  const pathName = useLocation().pathname
  const { data, isSuccess, isPending, isError, isLoading } = useGetProjectsByClient(id)
  const { data: propData, isSuccess: propSucc, isPending: propIsPend, isError: propIsErr, isLoading: propIsLoad } = useGetProjectProposalByClient(id)

  
  console.log("props data: ", propData)
  if (isLoading || propIsLoad) {
     return <ICCDLoader /> 
   }
   
    if (isError || propIsErr) {
       return <ICCDError /> 
     }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {show && (<ProposalModal onClose={() => setShow(false)} data={data} />)}
      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Header */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 hover:shadow-xl transition-all duration-300">
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-8 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full"></div>
                  <span className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                    {"We're looking for a..."}
                  </span>
                </div>
                <h1 className="lg:text-3xl text-xl  md:text-2xl sm:text-2xl font-bold text-gray-900 leading-tight">
                  {data[0]?.title}
                </h1>

                <div className="flex flex-wrap gap-6 text-sm">
                  <div className="flex items-center gap-3 bg-blue-50 px-4 py-2 rounded-full">
                    <div className="w-5 h-5 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                      <Globe className="w-3 h-3 text-white" />
                    </div>
                    <span className="font-medium text-blue-700">{data[0]?.mode}</span>
                  </div>
                  <div className="flex items-center gap-3 bg-emerald-50 px-4 py-2 rounded-full">
                    <Clock className="w-5 h-5 text-emerald-600" />
                    <span className="font-medium text-emerald-700">{data[0]?.duration}</span>
                  </div>
                  <div className="flex items-center gap-3 bg-purple-50 px-4 py-2 rounded-full">
                    <Users className="w-5 h-5 text-purple-600" />
                    <span className="font-medium text-purple-700">Hiring   {data[0]?.total_freelancer} Freelancers</span>
                  </div>
                </div>
              </div>
            </div>

            {/* About the employer */}
            {/* <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300">
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 border-b border-gray-200">
                <div className="flex items-center gap-3">
                  <Briefcase className="w-6 h-6 text-gray-600" />
                  <h2 className="text-xl font-bold text-gray-900">About the employer</h2>
                </div>
              </div>
              <div className="p-8">
                <p className="text-gray-700 leading-relaxed text-lg">
                  Synergis Education partners with institutions to launch pre- and post-licensure nursing programs,
                  doctoral programs and in-demand graduate degrees driven by mission of our partner institutions, the
                  local employer trends and student needs. The Academic Services department works directly with the
                  faculty and leaders at the partner institution to develop high-quality, innovative course curriculum.
                </p>
              </div>
            </div> */}

            {/* Overview */}
            {/* <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900">Overview</h2>
              </div>
              <div className="p-8 space-y-6">
                <p className="text-gray-700 leading-relaxed text-lg">
                  {data[0]?.overview}
                </p>
                <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-r-lg">
                  <p className="text-blue-800 leading-relaxed">
                    This project could be followed by other similar projects in the coming months as we are looking for
                    an instructional technologist that can work on additional projects as they are needed.
                  </p>
                </div>
              </div>
            </div> */}


            {/* Proposals */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300">
              <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900">Clients & Proposals</h2>
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
                    {propData.length > 0 ? (
                    propData?.map((item, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap flex items-center gap-3">
                          <img src={item?.freelancerImg} className="w-9 h-9 rounded-full bg-gray-200"></img>
                          <span className="font-medium">{item?.name}</span>
                        </td>
                        <td className="px-6 py-4">{item?.experience}</td>
                        <td className="px-6 py-4 text-right">
                          <button onClick={()=> downloadFile(item?.fileUrl, item?.name)} className="text-[#47AAB3] hover:underline text-sm">
                            Download CV
                          </button>
                        </td>
                      </tr>
                    )) ) : (
                  <tr>
                    <td colSpan="3" className="px-6 py-4 text-center text-gray-500">
                    No CVs have been submitted for review yet.                    </td>
                  </tr>
                )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Deliverables */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300">
              <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900">Deliverables</h2>
              </div>
              <div className="p-8 space-y-6">
               
                 <div
                className="prose prose-sm prose-gray max-w-none"
                dangerouslySetInnerHTML={{ __html: data[0]?.deliverable }}
              />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* <div className="bg-gradient-to-br from-orange-50 to-red-50 p-6 rounded-xl border border-orange-200">
                    <div className="flex items-center gap-3 mb-3">
                      <Clock className="w-5 h-5 text-orange-600" />
                      <h3 className="font-semibold text-orange-900">Time Estimate</h3>
                    </div>
                    <p className="text-orange-800">12-16 hours depending on skill level</p>
                  </div> */}

                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-200">
                    <div className="flex items-center gap-3 mb-3">
                      <Calendar className="w-5 h-5 text-purple-600" />
                      <h3 className="font-semibold text-purple-900">Deadline</h3>
                    </div>
                    <p className="text-purple-800">{formatSingleDate(data[0]?.deadline)}</p>
                  </div>
                </div>
              </div>
            </div>
            {/* Time commitment */}
            {/* <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300">
              <div className="bg-gradient-to-r from-teal-50 to-cyan-50 p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900">Time commitment</h2>
              </div>
              <div className="p-8 space-y-6">
                <p className="text-gray-700 leading-relaxed text-lg">
                  This project involves taking a course map document, ancillary files, and hyperlinks to build out a
                  5-module university-level course in the Blackboard LMS. We estimate this project will take 12 to 16
                  hours.
                </p>
                <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                  <p className="text-gray-700 leading-relaxed">
                    <span className="font-semibold text-gray-900">Required Software:</span> MS Word only. Temporary
                    access to the Blackboard LMS sub-account will be provided.
                  </p>
                </div>
              </div>
            </div> */}

            {/* Project Details */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 hover:shadow-xl transition-all duration-300">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Briefcase className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">Project Type</h3>
                  <p className="text-gray-700 font-medium">{data[0]?.type}</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Globe className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">Languages</h3>
                  <p className="text-gray-700 font-medium">{data[0]?.languages}</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Calendar className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">Project Deadline</h3>
                  <p className="text-gray-700 font-medium">{formatSingleDate(data[0]?.deadline)} </p>
                </div>
              </div>
            </div>

           
          </div>

          {/* Sidebar */}

          <div className="lg:col-span-1">

            <div className="sticky top-6 space-y-8">

              {/* Budget */}
              <div className="bg-white  rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300">
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 border-b border-gray-200">
                  <div className="text-sm font-medium text-emerald-600 uppercase tracking-wide mb-2">Client Budget</div>
                  <div className="text-3xl font-bold text-gray-900 mb-4">{data[0]?.budget} $</div>
                  <div className="flex items-center gap-3">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <div
                          key={i}
                          className={`w-3 h-3 rounded-sm mr-1 ${i < 3 ? "bg-emerald-400" : "bg-gray-300"}`}
                        ></div>
                      ))}
                    </div>
                    <span className="text-sm text-gray-600 font-medium">{propData && propData?.length} Proposals</span>
                  </div>
                </div>
                {pathName.includes('freelancer') && (
                  <div className="p-6 space-y-4">
                    <button onClick={() => setShow(true)} className="cursor-pointer w-full bg-[#01AEAD] hover:bg-[#05929c]  text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-3">
                      <span className="text-xl">👍</span>
                      <span>{"I'm interested"}</span>
                    </button>
                  </div>
                )}

                 {/* Skills and Freelancer Type */}
           
              </div>
               <div className="grid grid-cols-1 md:grid-cols-1  mt-8 gap-8">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300">
                <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-6 border-b border-gray-200">
                  <h2 className="text-xl font-bold text-gray-900">Required Skills</h2>

                  {/* <p className="text-sm text-orange-600 font-medium mt-1">
                    You have 2 out of 3 skills required for the job
                  </p> */}
                </div>
                <div className="p-6">
                  <div className="flex gap-2">
                    {
                      data[0]?.skills?.split(',').map((item, index) => (
                        <span key={index} className="inline-flex  items-center px-4 py-2 rounded-full text-sm font-semibold bg-gradient-to-r from-pink-100 to-rose-100 text-pink-800 border border-pink-200">
                          {item}
                        </span>
                      ))
                    }
                  </div>
                  {/* <div className="flex items-center gap-2">
                    <div className="flex">
                      <Star className="w-5 h-5 text-yellow-400 fill-current" />
                      <Star className="w-5 h-5 text-yellow-400 fill-current" />
                      <Star className="w-5 h-5 text-gray-300" />
                    </div>
                    <span className="text-sm text-gray-600 font-medium">Skill Match</span>
                  </div> */}
                </div>
              </div>
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300">
                <div className="bg-gradient-to-r from-pink-50 to-rose-50 p-6 border-b border-gray-200">
                  <h2 className="text-xl font-bold text-gray-900">Freelancer Type</h2>
                </div>
                <div className="p-6">
                  <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-gradient-to-r from-pink-100 to-rose-100 text-pink-800 border border-pink-200">
                    {data[0]?.freelancerType}
                  </span>
                </div>
              </div>
            </div>

              {/* About the Employer */}
              {/* <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300">
                <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-6 border-b border-gray-200">
                  <h3 className="text-xl font-bold text-gray-900">About the Employer</h3>
                </div>
                <div className="p-6 space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      <img src={profilepic} />
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 mb-1">Talha Butt</div>
                      <div className="font-bold text-gray-900 text-lg">Matz Solutions Pvt Ltd</div>
                    </div>
                  </div>

                  <p className="text-gray-700 leading-relaxed">
                    The office of Digital Learning Design and Development is a unit of Digital and Lifelong Learning at
                    the University of North Carolina at Chapel Hill.
                  </p>

                  <div className="flex items-center gap-3 text-gray-600 bg-gray-50 p-4 rounded-xl">
                    <MapPin className="w-5 h-5 text-blue-600" />
                    <div>
                      <div className="font-semibold text-gray-900">Pakistan</div>
                      <div className="text-sm text-gray-500">Karachi</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-emerald-600 bg-emerald-50 p-4 rounded-xl border border-emerald-200">
                    <CheckCircle className="w-5 h-5" />
                    <span className="font-semibold">Employer identity verified</span>
                  </div>
                </div>
              </div> */}

              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectDetailClient;