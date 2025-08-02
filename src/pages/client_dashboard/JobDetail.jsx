import { MapPin, Clock, DollarSign, Users, Briefcase, Heart, Share2 } from "lucide-react"
import { useGetJobById, getJobPropsalByClient } from "../../../api/client/job"
import { useParams } from "react-router-dom"
import { useRef } from "react"
import { downloadFile } from "../../../functions/download_pdf"
import ICCDLoader from "../../component/loader"
import ICCDError from '../../component/ICCDError';
export default function JobDetailPage() {

  const { id } = useParams()
  const { data, isSuccess, isPending, isError, isLoading } = useGetJobById(id)
  const { jobProposals, error } = getJobPropsalByClient()
  console.log("jobProposals: ", jobProposals)

  if (isLoading || isPending) {
    return <ICCDLoader /> 
  }
  if (isError) {
    return  <ICCDError message={isError} />
  }
  if (data?.length === 0) {
    return <p>No jobs to show</p>
  }
  return (
    <div className="min-h-screen bg-gray-50">
      <div className=" mx-auto px-4 py-8 max-w-4xl">
        {/* Header Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6 p-6">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-3">{data[0]?.jobTitle}</h1>
              <div className="flex flex-wrap gap-3 mb-4">
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                  <Briefcase className="w-3 h-3" />
                  {data[0]?.jobType}
                </span>
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-700 border border-gray-300">
                  <MapPin className="w-3 h-3" />
                  {data[0]?.joblocation}
                </span>
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
                  <Users className="w-3 h-3" />
                  {data[0]?.totalPersontoHire} {data[0]?.totalPersontoHire === 1 ? "Position" : "Positions"}
                </span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">

            
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Job Description */}
               {/* Propsals */}
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
                    {jobProposals?.map((item, index) => (
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
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-white h-full w-full rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Job Description</h2>
              <div className="prose prose-gray max-w-none">
              <div
                className="prose prose-sm prose-gray max-w-none"
                dangerouslySetInnerHTML={{ __html: data[0]?.jobDescription }}
              />

              </div>
            </div>


          </div>

          {/* Sidebar */}
          <div className=" space-y-6">

            {/* Company Info */}
            {/* <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-3">About the Company</h2>
              <div className="space-y-3">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl">TC</span>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">TechCorp Inc.</h3>
                  <p className="text-sm text-gray-600 mb-3">
                    Join our innovative team and help shape the future of technology. We're committed to creating an
                    inclusive workplace where everyone can thrive.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">500+ employees</span>
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">Tech Industry</span>
                  </div>
                </div>
              </div>
            </div> */}

         

            {/* Job Details */}
           <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Job Details</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                  <DollarSign className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">Salary Range</p>
                    <p className="text-sm text-gray-600 mb-1">{data[0]?.payType}</p>
                    {/* <p className="text-lg font-semibold text-green-600">
                      {formatSalary(jobData.minSalary, jobData.maxSalary)}
                    </p> */}
                  </div>
                </div>

                <hr className="border-gray-200" />

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">Employment Type</p>
                    <p className="text-sm text-gray-600">{data[0]?.jobType}</p>
                  </div>
                </div>

                <hr className="border-gray-200" />

                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-red-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">Location</p>
                    <p className="text-sm text-gray-600">{data[0]?.joblocation}</p>
                  </div>
                </div>

                <hr className="border-gray-200" />

                <div className="flex items-start gap-3">
                  <Users className="w-5 h-5 text-purple-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">Positions Available</p>
                    <p className="text-sm text-gray-600">
                      {data[0]?.totalPersontoHire} {data[0]?.totalPersontoHire === 1 ? "opening" : "openings"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Application Stats */}
            {/* <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-3">Application Status</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Applications received</span>
                  <span className="font-medium text-gray-900">47</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Positions remaining</span>
                  <span className="font-medium text-green-600">{data[0]?.totalPersontoHire}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: "35%" }}></div>
                </div>
                <p className="text-xs text-gray-500 mt-2">Apply soon - positions filling quickly!</p>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  )
}
