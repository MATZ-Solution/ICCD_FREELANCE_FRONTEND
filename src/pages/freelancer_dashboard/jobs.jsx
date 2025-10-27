import React, { useEffect, useState, lazy, Suspense } from "react";
import EastIcon from "@mui/icons-material/East";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import WorkIcon from "@mui/icons-material/Work";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import FilterListIcon from "@mui/icons-material/FilterList";
import CloseIcon from "@mui/icons-material/Close";
import { useSelector } from "react-redux";
import { useGetAllJobs, useGetJobById } from "../../../api/client/job";
import Select from "../../component/buttonSelect.jsx";
import { useLocation, useNavigate } from "react-router-dom";
import Pagination from "../../component/pagination";
import { oicCountries } from "../../../data/oic_contries.js";
import useDebounce from "../../../hooks/useDebounce.jsx";

const JobProposalModal = lazy(() => import("../../component/JobProposalModal"));

function Jobs() {
  const [city, setCity] = useState("")
  const [country, setCountry] = useState("")
  const [jobTitle, setJobTitle] = useState("")
  const [show, setShow] = useState(false);
  const [page, setPage] = useState(1);
  const [mobileJobModal, setMobileJobModal] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const navigate = useNavigate();
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [savedJobs, setSavedJobs] = useState(new Set());

  const locationOptions = oicCountries.map(item => ({
    value: item.country,
    label: item.country
  }));

  const findCity = country ?
    oicCountries.find(item => item.country === country)
    : [];

  const citiesoption = findCity.cities ? findCity.cities.map(item => ({
    value: item,
    label: item
  })) : [];

  const freelancerData = useSelector((state) => state.userProfile.userProfile);

  const {
    data: allJobs,
    totalPages,
    isSuccess: allJobsSuccess,
  } = useGetAllJobs({ jobTitle: useDebounce(jobTitle), city, country, page });

  const { data: jobDetails, isSuccess: jobDetailsSuccess } = useGetJobById(
    selectedJobId,
    { enabled: !!selectedJobId }
  );

  useEffect(() => {
    if (allJobsSuccess && allJobs.length > 0 && !selectedJobId) {
      setSelectedJobId(allJobs[0].id);
    }
  }, [allJobsSuccess, allJobs, selectedJobId]);

  const location = useLocation();
  const isFreelancerPath = location.pathname.includes("/freelancer");

  const toggleSaveJob = (jobId) => {
    setSavedJobs(prev => {
      const newSet = new Set(prev);
      if (newSet.has(jobId)) {
        newSet.delete(jobId);
      } else {
        newSet.add(jobId);
      }
      return newSet;
    });
  };

  const renderJobDetails = () => {
    return (
      (jobDetails?.length > 0) &&
      jobDetails?.map((job, index) => (
        <div key={index} className="w-full p-4 sm:p-6 lg:p-8 animate-fadeIn">
          {/* Header with glassmorphism effect */}
          <div className="bg-gradient-to-r from-[#44A4AD]/10 to-transparent p-4 sm:p-6 rounded-2xl mb-4 sm:mb-6 border border-[#44A4AD]/20">
            <div className="flex items-start justify-between mb-3 sm:mb-4">
              <div className="flex-1 pr-2">
                <h1 className="font-bold text-xl sm:text-2xl lg:text-3xl text-gray-900 mb-2">
                  {job.jobTitle}
                </h1>
                <p className="text-base sm:text-lg text-[#44A4AD] font-medium">{job.name}</p>
              </div>

            </div>

            <div className="flex items-center gap-2 text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base">
              <LocationOnIcon className="text-[#44A4AD]" fontSize="small" />
              <span>{job.country}</span>
            </div>

            <div className="flex flex-wrap gap-2 sm:gap-3">
              <span className="px-3 sm:px-4 py-1.5 sm:py-2 bg-white border border-[#44A4AD]/30 text-[#44A4AD] rounded-full text-xs sm:text-sm font-semibold shadow-sm">
                ${job.minSalaray} - ${job.maxSalaray} / {job.payType}
              </span>
              <span className="px-3 sm:px-4 py-1.5 sm:py-2 bg-[#44A4AD] text-white rounded-full text-xs sm:text-sm font-semibold shadow-sm">
                {job.jobType}
              </span>
              {job.mode && (
                <span className="px-3 sm:px-4 py-1.5 sm:py-2 bg-gray-100 text-gray-700 rounded-full text-xs sm:text-sm font-semibold">
                  {job.mode}
                </span>
              )}
            </div>
          </div>

          {/* Apply Button */}
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
            className="w-full bg-gradient-to-r from-[#44A4AD] to-[#3a8c94] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-base sm:text-lg hover:shadow-lg hover:scale-[1.02] transition-all duration-300 mb-6 sm:mb-8"
          >
            Apply for this position
          </button>

          {/* Job Details Cards */}
          <div className="space-y-4 sm:space-y-6">
            <div className="bg-gray-50 p-4 sm:p-6 rounded-xl border border-gray-200">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2">
                <WorkIcon className="text-[#44A4AD]" />
                Job Details
              </h2>
              <div className="grid gap-3 sm:gap-4">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-2 sm:py-3 border-b border-gray-200 gap-1 sm:gap-0">
                  <span className="text-gray-600 font-medium text-sm sm:text-base">Compensation</span>
                  <span className="text-gray-900 font-semibold text-sm sm:text-base">
                    ${job.minSalaray} - ${job.maxSalaray} / {job.payType}
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-2 sm:py-3 border-b border-gray-200 gap-1 sm:gap-0">
                  <span className="text-gray-600 font-medium text-sm sm:text-base">Employment Type</span>
                  <span className="text-gray-900 font-semibold text-sm sm:text-base">{job.jobType}</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-2 sm:py-3 gap-1 sm:gap-0">
                  <span className="text-gray-600 font-medium text-sm sm:text-base">Location</span>
                  <span className="text-gray-900 font-semibold text-sm sm:text-base">{job.country}</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white p-4 sm:p-6 rounded-xl border border-gray-200">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">About this role</h2>
              <div
                className="prose prose-sm sm:prose max-w-none text-gray-700 leading-relaxed text-sm sm:text-base"
                dangerouslySetInnerHTML={{ __html: job.jobDescription }}
              />
            </div>
          </div>
        </div>
      ))
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-[#44A4AD]/5">
      {/* Proposal Modal */}
      {show && jobDetails?.length > 0 && (
        <Suspense fallback={<div className="text-center mt-5">Loading...</div>}>
          <JobProposalModal
            onClose={() => setShow(false)}
            data={jobDetails}
            freelancerData={freelancerData}
          />
        </Suspense>
      )}

      <div className="px-3 sm:px-4 md:px-6 lg:px-10 max-w-[1600px] mx-auto">
        {/* Mobile Job Details Modal */}
        {mobileJobModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-3 sm:p-4">
            <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto relative shadow-2xl">
              <button
                className="sticky top-0 right-0 float-right m-3 sm:m-4 p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors z-10"
                onClick={() => setMobileJobModal(false)}
              >
                <CloseIcon />
              </button>
              {renderJobDetails()}
            </div>
          </div>
        )}

        {/* Hero Section - Fully Responsive */}
        <div className="mt-4 sm:mt-6 lg:mt-12 mb-6 sm:mb-8">
          <div className="relative overflow-hidden bg-gradient-to-br from-[#44A4AD] via-[#3a8c94] to-[#2d6b73] rounded-2xl sm:rounded-3xl shadow-2xl">
            {/* Animated background patterns */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-1/4 w-48 sm:w-72 md:w-96 h-48 sm:h-72 md:h-96 bg-white rounded-full blur-3xl animate-float"></div>
              <div className="absolute bottom-0 right-1/4 w-40 sm:w-60 md:w-80 h-40 sm:h-60 md:h-80 bg-white rounded-full blur-3xl animate-float-delayed"></div>
            </div>

            {/* Geometric patterns */}
            <div className="absolute right-0 top-0 w-1/2 h-full opacity-5">
              <svg className="w-full h-full" viewBox="0 0 400 400">
                <circle cx="350" cy="50" r="100" fill="white" />
                <circle cx="300" cy="200" r="60" fill="white" />
                <circle cx="380" cy="300" r="80" fill="white" />
              </svg>
            </div>

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-center p-5 sm:p-8 lg:p-12">
              {/* Left Content */}
              <div>
                <div className="inline-block mb-3 sm:mb-4 px-3 sm:px-4 py-1.5 sm:py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs sm:text-sm font-semibold animate-slideDown">
                  🚀 {allJobs?.length || 0}+ Active Opportunities
                </div>

                <h1 className="text-2xl sm:text-3xl md:text-4xl  font-bold text-white mb-4 sm:mb-6 leading-tight animate-slideUp">
                  Discover Your Next
                  <span className="block mt-1 sm:mt-2 bg-gradient-to-r from-white via-yellow-100 to-white bg-clip-text text-transparent">
                    Career Adventure
                  </span>
                </h1>

                <p className="text-base sm:text-lg md:text-xl text-white/90 mb-6 sm:mb-8 max-w-xl leading-relaxed">
                  Connect with leading companies and find positions that match your skills, ambitions, and lifestyle.
                </p>

                {/* <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 mb-6 sm:mb-8">
                  <button className="px-6 sm:px-8 py-3 sm:py-4 bg-white text-[#44A4AD] rounded-xl font-semibold hover:scale-105 transition-transform shadow-lg text-sm sm:text-base">
                    Browse All Jobs
                  </button>
                  <button className="px-6 sm:px-8 py-3 sm:py-4 bg-white/10 backdrop-blur-sm text-white rounded-xl font-semibold hover:bg-white/20 transition-all border border-white/30 text-sm sm:text-base">
                    Upload Your CV
                  </button>
                </div> */}
                <div className="flex flex-wrap gap-4 sm:gap-6 text-white/80 text-xs sm:text-sm">
                  <div className="flex items-center gap-2">
                    <TrendingUpIcon fontSize="small" />
                    <span>Trending Positions</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <WorkIcon fontSize="small" />
                    <span>Remote-Friendly</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <LocationOnIcon fontSize="small" />
                    <span>Global Opportunities</span>
                  </div>
                </div>
              </div>

              {/* Right Illustration - Hidden on mobile, visible on lg+ */}
              <div className="hidden lg:flex justify-center items-center">
                <div className="relative w-full max-w-md animate-float">
                  {/* 3D Isometric Job Cards Illustration */}
                  <svg viewBox="0 0 400 400" className="w-full h-[50vh] drop-shadow-2xl">
                    <g opacity="0.6" transform="translate(50, 20) rotate(-10)">
                      <rect x="0" y="0" width="120" height="150" rx="12" fill="white" />
                      <rect x="15" y="20" width="90" height="12" rx="4" fill="#44A4AD" />
                      <rect x="15" y="45" width="70" height="8" rx="4" fill="#E5E7EB" />
                      <rect x="15" y="60" width="60" height="8" rx="4" fill="#E5E7EB" />
                      <circle cx="95" cy="25" r="8" fill="#FFD700" />
                    </g>

                    {/* Main card */}
                    <g transform="translate(100, 80)">
                      <rect x="0" y="0" width="200" height="240" rx="16" fill="white" filter="url(#shadow)" />

                      {/* Company logo circle */}
                      <circle cx="100" cy="40" r="25" fill="#44A4AD" opacity="0.2" />
                      <circle cx="100" cy="40" r="20" fill="#44A4AD" />
                      <text x="100" y="48" textAnchor="middle" fill="white" fontSize="20" fontWeight="bold">W</text>

                      {/* Job title */}
                      <rect x="40" y="80" width="120" height="16" rx="4" fill="#1F2937" />

                      {/* Details */}
                      <rect x="30" y="110" width="80" height="10" rx="4" fill="#9CA3AF" />
                      <rect x="30" y="130" width="100" height="10" rx="4" fill="#9CA3AF" />

                      {/* Tags */}
                      <rect x="30" y="160" width="60" height="24" rx="12" fill="#44A4AD" opacity="0.2" />
                      <rect x="100" y="160" width="70" height="24" rx="12" fill="#44A4AD" opacity="0.2" />

                      {/* Apply button */}
                      <rect x="30" y="200" width="140" height="30" rx="15" fill="#44A4AD" />
                      <text x="100" y="220" textAnchor="middle" fill="white" fontSize="12" fontWeight="600">Apply Now</text>
                    </g>

                    {/* Floating card top right */}
                    <g opacity="0.7" transform="translate(280, 40) rotate(10)">
                      <rect x="0" y="0" width="100" height="130" rx="10" fill="white" />
                      <rect x="12" y="15" width="76" height="10" rx="4" fill="#44A4AD" />
                      <rect x="12" y="35" width="60" height="7" rx="3" fill="#E5E7EB" />
                      <rect x="12" y="50" width="50" height="7" rx="3" fill="#E5E7EB" />
                      <circle cx="78" cy="20" r="6" fill="#10B981" />
                    </g>

                    {/* Bottom floating element */}
                    <g opacity="0.5" transform="translate(60, 300)">
                      <circle cx="30" cy="30" r="30" fill="white" />
                      <path d="M20 30 L30 40 L40 20" stroke="#44A4AD" strokeWidth="3" fill="none" strokeLinecap="round" />
                    </g>

                    {/* Decorative dots */}
                    <circle cx="320" cy="260" r="4" fill="white" opacity="0.6" />
                    <circle cx="80" cy="280" r="3" fill="white" opacity="0.6" />
                    <circle cx="340" cy="180" r="5" fill="white" opacity="0.6" />

                    {/* Shadow filter */}
                    <defs>
                      <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
                        <feDropShadow dx="0" dy="10" stdDeviation="20" floodOpacity="0.3" />
                      </filter>
                    </defs>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Search & Filter Section - Fully Responsive */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 mb-6 sm:mb-8 border border-gray-100">
          <div className="flex flex-col lg:flex-row gap-3 sm:gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <SearchOutlinedIcon className="absolute top-3 sm:top-4 left-3 sm:left-4 text-gray-400" />
              <input
                onChange={(e) => setJobTitle(e.target.value)}
                className="w-full h-12 sm:h-14 pl-10 sm:pl-12 pr-4 rounded-lg sm:rounded-xl border-2 border-gray-200 outline-none focus:border-[#44A4AD] transition-colors text-gray-900 text-sm sm:text-base"
                placeholder="Search by title, keyword..."
              />
            </div>

            {/* Filters - Desktop */}
            <div className="hidden lg:flex gap-3 items-center">
              <div className="w-56">
                <Select
                  placeholder="Country"
                  option={locationOptions}
                  value={locationOptions.find(opt => opt.value === country) || ""}
                  onChange={(selected) => setCountry(selected?.value || '')}
                />
              </div>

              <div className="w-56">
                <Select
                  placeholder={country ? "City" : "Select country first"}
                  option={citiesoption}
                  value={citiesoption.find(opt => opt.value === city) || null}
                  onChange={(selected) => setCity(selected?.value || '')}
                  isDisabled={!country}
                />
              </div>

              {/* <button className="h-14 px-8 bg-gradient-to-r from-[#44A4AD] to-[#3a8c94] text-white rounded-xl font-semibold hover:shadow-lg transition-all whitespace-nowrap">
                Search
              </button> */}
            </div>

            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden h-12 sm:h-14 px-4 sm:px-6 bg-[#44A4AD] text-white rounded-lg sm:rounded-xl font-semibold flex items-center justify-center gap-2 text-sm sm:text-base"
            >
              <FilterListIcon />
              Filters
            </button>
          </div>

          {/* Mobile Filters Dropdown */}
          {showFilters && (
            <div className="lg:hidden mt-4 space-y-3 pb-4">
              <Select
                placeholder="Country"
                option={locationOptions}
                value={locationOptions.find(opt => opt.value === country) || ""}
                onChange={(selected) => setCountry(selected?.value || '')}
              />
              <Select
                placeholder={country ? "City" : "Select country first"}
                option={citiesoption}
                value={citiesoption.find(opt => opt.value === city) || null}
                onChange={(selected) => setCity(selected?.value || '')}
                isDisabled={!country}
              />
              <button className="w-full h-12 sm:h-14 bg-gradient-to-r from-[#44A4AD] to-[#3a8c94] text-white rounded-lg sm:rounded-xl font-semibold text-sm sm:text-base">
                Apply Filters
              </button>
            </div>
          )}
        </div>

        {/* Results Section */}
        {/* <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 gap-3 sm:gap-0">
          <p className="text-gray-600 text-sm sm:text-base">
            Showing <span className="font-bold text-[#44A4AD]">{allJobs?.length || 0}</span> opportunities
          </p>
          <select className="px-3 sm:px-4 py-2 border border-gray-200 rounded-lg outline-none focus:border-[#44A4AD] text-xs sm:text-sm w-full sm:w-auto">
            <option>Most Relevant</option>
            <option>Latest</option>
            <option>Salary: High to Low</option>
          </select>
        </div> */}

        {/* Job Listings - Fully Responsive */}
        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
          {/* Left: Job Cards */}
          <div className="w-full lg:w-1/2 space-y-3 sm:space-y-4">
            {allJobsSuccess && allJobs?.length > 0 ? (
              allJobs.map((job, index) => (
                <div
                  key={job.id || index}
                  onClick={() => {
                    setSelectedJobId(job.id);
                    if (window.innerWidth < 1024) {
                      setMobileJobModal(true);
                    }
                  }}
                  className={`group relative bg-white p-4 sm:p-6 rounded-xl sm:rounded-2xl border-2 transition-all cursor-pointer hover:shadow-xl hover:-translate-y-1 ${selectedJobId === job.id
                      ? 'border-[#44A4AD] shadow-lg'
                      : 'border-gray-200 hover:border-[#44A4AD]'
                    }`}
                >

                  <div className="pr-8 sm:pr-12">
                    <h3 className="font-bold text-lg sm:text-xl text-gray-900 mb-2 group-hover:text-[#44A4AD] transition-colors">
                      {job.jobTitle}
                    </h3>

                    <p className="text-[#44A4AD] font-medium mb-2 sm:mb-3 text-sm sm:text-base">{job.name}</p>

                    <div className="flex items-center gap-2 text-gray-600 mb-3 sm:mb-4 text-xs sm:text-sm">
                      <LocationOnIcon fontSize="small" className="text-gray-400" />
                      <span>{job.country}</span>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-3 sm:mb-4">
                      <span className="px-2.5 sm:px-3 py-1 bg-[#44A4AD]/10 text-[#44A4AD] rounded-full text-xs sm:text-sm font-semibold">
                        ${job.minSalaray} - ${job.maxSalaray}
                      </span>
                      <span className="px-2.5 sm:px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs sm:text-sm font-medium">
                        {job.jobType}
                      </span>
                      <span className="px-2.5 sm:px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs sm:text-sm font-medium">
                        {job.payType}
                      </span>
                    </div>

                    <div className="flex items-center text-[#44A4AD] text-xs sm:text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                      View Details
                      <EastIcon fontSize="small" className="ml-2" />
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="w-full text-center py-12 sm:py-16 bg-white rounded-xl sm:rounded-2xl border-2 border-dashed border-gray-200">
                <WorkIcon className="mx-auto text-gray-300 mb-4" sx={{ fontSize: { xs: 48, sm: 64 } }} />
                <p className="text-gray-500 text-base sm:text-lg">No jobs found matching your criteria</p>
                <p className="text-gray-400 text-xs sm:text-sm mt-2">Try adjusting your filters</p>
              </div>
            )}

            {allJobs?.length > 0 && (
              <div className="pt-4">
                <Pagination
                  currentPage={page}
                  totalPages={totalPages}
                  onPageChange={(newPage) => setPage(newPage)}
                />
              </div>
            )}
          </div>

          {/* Right: Job Details - Desktop Only */}

          {allJobs?.length > 0 && (
            <div className="hidden lg:block lg:w-1/2">
              <div className="sticky top-6 bg-white rounded-2xl border-2 border-gray-200 max-h-[92vh] overflow-y-auto shadow-lg">
                {renderJobDetails()}
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float 3s ease-in-out 1.5s infinite;
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slideUp {
          animation: slideUp 0.6s ease-out;
        }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slideDown {
          animation: slideDown 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}

export default Jobs;