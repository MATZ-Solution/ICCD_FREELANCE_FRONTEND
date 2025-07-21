import { MapPin, Clock, DollarSign, Users, Briefcase, Heart, Share2 } from "lucide-react"

// Sample job data - replace with your actual data
const jobData = {
  jobTitle: "Senior Frontend Developer",
  jobType: "Full-time",
  joblocation: "San Francisco, CA (Remote)",
  payType: "Annual Salary",
  minSalary: 120000,
  maxSalary: 180000,
  jobDescription: `We are seeking a talented Senior Frontend Developer to join our dynamic team. In this role, you will be responsible for developing and maintaining high-quality web applications using modern JavaScript frameworks.

Key Responsibilities:
• Develop responsive and interactive user interfaces using React, Next.js, and TypeScript
• Collaborate with designers and backend developers to implement pixel-perfect designs
• Optimize applications for maximum speed and scalability
• Write clean, maintainable, and well-documented code
• Participate in code reviews and mentor junior developers
• Stay up-to-date with the latest frontend technologies and best practices

Requirements:
• 5+ years of experience in frontend development
• Strong proficiency in React, JavaScript, and TypeScript
• Experience with modern CSS frameworks (Tailwind CSS preferred)
• Knowledge of state management libraries (Redux, Zustand)
• Familiarity with testing frameworks (Jest, React Testing Library)
• Experience with version control systems (Git)
• Strong problem-solving skills and attention to detail
• Excellent communication and teamwork abilities

Benefits:
• Competitive salary and equity package
• Comprehensive health, dental, and vision insurance
• Flexible work arrangements and remote work options
• Professional development opportunities
• Generous PTO and parental leave policies`,
  totalPersontoHire: 3,
}

export default function JobDetailPage() {
 

  return (
    <div className="min-h-screen bg-gray-50">
      <div className=" mx-auto px-4 py-8 max-w-4xl">
        {/* Header Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6 p-6">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-3">{jobData.jobTitle}</h1>
              <div className="flex flex-wrap gap-3 mb-4">
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                  <Briefcase className="w-3 h-3" />
                  {jobData.jobType}
                </span>
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-700 border border-gray-300">
                  <MapPin className="w-3 h-3" />
                  {jobData.joblocation}
                </span>
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
                  <Users className="w-3 h-3" />
                  {jobData.totalPersontoHire} {jobData.totalPersontoHire === 1 ? "Position" : "Positions"}
                </span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <button className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                Apply Now
              </button>
              <button className="px-6 py-3 bg-white text-gray-700 font-medium rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 flex items-center gap-2">
                <Share2 className="w-4 h-4" />
                  Share this Job
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Job Description */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Job Description</h2>
              <div className="prose prose-gray max-w-none">
                <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed text-gray-700">
                  {jobData.jobDescription}
                </pre>
              </div>
            </div>

            {/* Additional Info */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">What We Offer</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <DollarSign className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Competitive Salary</p>
                    <p className="text-sm text-gray-600">Market-rate compensation</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <Clock className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Flexible Hours</p>
                    <p className="text-sm text-gray-600">Work-life balance</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Job Details */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Job Details</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                  <DollarSign className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">Salary Range</p>
                    <p className="text-sm text-gray-600 mb-1">{jobData.payType}</p>
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
                    <p className="text-sm text-gray-600">{jobData.jobType}</p>
                  </div>
                </div>

                <hr className="border-gray-200" />

                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-red-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">Location</p>
                    <p className="text-sm text-gray-600">{jobData.joblocation}</p>
                  </div>
                </div>

                <hr className="border-gray-200" />

                <div className="flex items-start gap-3">
                  <Users className="w-5 h-5 text-purple-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">Positions Available</p>
                    <p className="text-sm text-gray-600">
                      {jobData.totalPersontoHire} {jobData.totalPersontoHire === 1 ? "opening" : "openings"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Apply */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-3">Quick Apply</h2>
              <p className="text-sm text-gray-600 mb-4">Ready to take the next step in your career?</p>
              <div className="space-y-3">
                <button className="w-full px-4 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                  Apply for this Position
                </button>
                <button className="w-full px-4 py-3 bg-white text-gray-700 font-medium rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 flex items-center justify-center gap-2">
                  <Share2 className="w-4 h-4" />
                  Share this Job
                </button>
              </div>
            </div>

            {/* Company Info */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
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
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">Series B</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Application Stats */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-3">Application Status</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Applications received</span>
                  <span className="font-medium text-gray-900">47</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Positions remaining</span>
                  <span className="font-medium text-green-600">{jobData.totalPersontoHire}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: "35%" }}></div>
                </div>
                <p className="text-xs text-gray-500 mt-2">Apply soon - positions filling quickly!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
