import React, { useEffect, useState, lazy, Suspense } from "react";
import EastIcon from "@mui/icons-material/East";
import job_opp_pic from "../../assets/freelancer_dashboard/job_opp_pic.png";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import LinkIcon from "@mui/icons-material/Link";
import PaymentIcon from "@mui/icons-material/Payment";
import CasesIcon from "@mui/icons-material/Cases";
import { useSelector } from "react-redux";
import { useGetAllJobs, useGetJobById } from "../../../api/client/job";
import Select from "../../component/buttonSelect.jsx";
import { useLocation } from "react-router-dom";

const ProposalModal = lazy(() => import("../../component/ProposalModal"));

function Jobs() {
  const [obj, setObj] = useState({});
  const [show, setShow] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState(null);

  const freelancerData = useSelector((state) => state.userProfile.userProfile);

  const { data: allJobs, isSuccess: allJobsSuccess } = useGetAllJobs(obj);
  const { data: jobDetails, isSuccess: jobDetailsSuccess } = useGetJobById(
    selectedJobId,
    {
      enabled: !!selectedJobId,
    }
  );

  const filterNames = ["jobType", "joblocation"];

  const filterOptions = {
    jobType: [
      { value: "Full Time", label: "Full Time" },
      { value: "part_time", label: "Part Time" },
      { value: "contract", label: "Contract" },
    ],
    joblocation: [
      { value: "remote", label: "Remote" },
      { value: "karachi", label: "Karachi" },
      { value: "lahore", label: "Lahore" },
    ],
  };

  useEffect(() => {
    if (allJobsSuccess && allJobs.length > 0 && !selectedJobId) {
      setSelectedJobId(allJobs[0].id);
    }
  }, [allJobsSuccess, allJobs, selectedJobId]);

  const location = useLocation();

  const isFreelancerPath = location.pathname.includes("/freelancer");

  return (
    <div className="px-6 sm:px-10">
      {/* ✅ Lazy loaded ProposalModal inside Suspense */}
      {show && jobDetails?.length > 0 && (
        <Suspense fallback={<div className="text-center mt-5">Loading...</div>}>
          <ProposalModal
            onClose={() => setShow(false)}
            data={jobDetails}
            freelancerData={freelancerData}
          />
        </Suspense>
      )}

      {/* Banner */}
      <div className="mt-10">
        <section className="flex flex-col md:flex-row items-center justify-between bg-gray-100 p-4 md:p-12 rounded-2xl shadow-lg">
          <div className="w-full md:w-1/2 text-center md:text-left mb-6 md:mb-0">
            <h1 className="text-2xl font-bold text-[#043A53] mb-4 md:text-3xl lg:text-4xl">
              Jobs Opportunities
            </h1>
            <p className="text-[#767676] mb-6">
              Create an account or sign in to see your personalized job
              recommendations.
            </p>
            <button className="shadow-xl flex gap-3 bg-[#15A9B2] text-white px-6 py-3 rounded-full hover:bg-[#05929c] transition cursor-pointer">
              <p className="text-white">Get Started</p>
              <EastIcon />
            </button>
            <p className="mt-5 text-[#767676]">
              <span className="text-[#05929c]">Post your CV</span> - It only
              takes a few seconds
            </p>
          </div>
          <div className="w-full sm:w-1/2">
            <img
              src={job_opp_pic}
              alt="Banner"
              className="w-full h-auto object-contain"
            />
          </div>
        </section>
      </div>

      {/* Search & Filters */}
      <div className="w-full shadow-lg mt-5 rounded-2xl bg-gray-100">
        <div className="w-full flex flex-col items-center mb-5 mt-5 rounded-2xl bg-gray-100 shadow-md lg:flex-row lg:gap-0">
          <div className="w-full relative">
            <SearchOutlinedIcon className="absolute top-2 left-2" />
            <input
              onChange={(e) => setObj({ ...obj, jobTitle: e.target.value })}
              className="w-full h-10 px-10 outline-none"
              placeholder="Job title, keywords, or company"
            />
          </div>

          <div className="w-full flex flex-wrap gap-3 py-5 mt-5">
            {filterNames.map((filterName) => (
              <div key={filterName} className="w-40 relative">
                <Select
                  option={filterOptions[filterName]}
                  placeholder={filterName}
                  value={
                    obj[filterName]
                      ? filterOptions[filterName]?.find(
                          (opt) => opt.value === obj[filterName]
                        )
                      : null
                  }
                  onChange={(selectedOption) =>
                    setObj({ ...obj, [filterName]: selectedOption?.value })
                  }
                  isClearable={false}
                />
                {obj[filterName] && (
                  <button
                    onClick={() => {
                      const newFilters = { ...obj };
                      delete newFilters[filterName];
                      setObj(newFilters);
                    }}
                    className="absolute -top-2 -right-2 bg-black text-white rounded-full px-2 text-sm font-bold hover:bg-[#3C939D]"
                    title="Clear filter"
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
          </div>

          <button className="w-full flex bg-[#15A9B2] rounded-md text-white text-center px-7 py-2 lg:hidden">
            Search
          </button>
        </div>

        <p>
          Sort by: <span className="text-black font-semibold">relevance</span>
        </p>

        <div className="flex flex-col md:flex-col lg:flex-row">
          {/* Left: Job List */}
          <div className="w-full lg:w-1/2 flex flex-col">
            {allJobsSuccess &&
              allJobs?.map((job, index) => (
                <div
                  key={job.id || index}
                  onClick={() => setSelectedJobId(job.id)}
                  className="relative mt-5 p-5 border-[1px] border-gray-400 rounded-lg hover:border-[#15A9B2] shadow-lg cursor-pointer"
                >
                  <BookmarkBorderIcon className="absolute right-4 top-5 scale-125" />
                  <h1 className="font-bold text-xl">{job.jobTitle}</h1>
                  <p className="capitalize mt-3">{job.jobType}</p>
                  <p className=" capitalize mt-3">{job.name}</p>
                  <p>{job.companyName}</p>
                  <p className="mt-3">{job.joblocation}</p>
                  <div className="flex gap-2 mt-2">
                    <p className="font-semibold text-sm bg-gray-200 p-1 rounded-md">
                      Rs {job.minSalaray} - Rs {job.maxSalaray} a {job.payType}
                    </p>
                    <p className="font-semibold text-sm bg-gray-200 p-1 rounded-md">
                      {job.jobType}
                    </p>
                  </div>
                </div>
              ))}
          </div>

          {/* Right: Job Details */}
          <div className="hidden px-5 lg:flex lg:w-1/2 lg:h-screen sticky top-0">
            {jobDetailsSuccess &&
              jobDetails?.map((job, index) => (
                <div
                  key={index}
                  className="w-full mt-5 p-5 border-[1px] border-gray-400 rounded-lg hover:border-[#15A9B2]"
                >
                  <h1 className="font-bold text-xl">
                    {job.jobTitle} {job.mode}
                  </h1>
                  <p className="mt-3">{job.name}</p>
                  <p>{job.joblocation}</p>
                  <div className="flex gap-2 mt-2">
                    <p className="font-semibold text-sm bg-gray-200 p-1 rounded-md">
                      Rs {job.minSalaray} - Rs {job.maxSalaray} a {job.payType}
                    </p>
                    <p className="font-semibold text-sm bg-gray-200 p-1 rounded-md">
                      {job.jobType}
                    </p>
                  </div>
                  <div className="mt-3 flex gap-4 items-center">
                    <button
                      onClick={() => {
                        if (
                          !freelancerData ||
                          Object.keys(freelancerData).length === 0 ||
                          !isFreelancerPath
                        ) {
                          window.location.href = "/login"; // or open login modal
                        } else {
                          setShow(true);
                        }
                      }}
                      className="bg-[#15A9B2] rounded-md text-white px-7 py-2"
                    >
                      Apply Now
                    </button>

                    <button className="bg-gray-300 p-1 rounded-md">
                      <BookmarkBorderIcon className="text-black" />
                    </button>
                    <button className="bg-gray-300 p-1 rounded-md">
                      <LinkIcon className="text-black" />
                    </button>
                  </div>
                  <div className="h-[65vh] overflow-y-scroll mt-10 border-t-[1px] border-t-gray-400">
                    <h1 className="mt-4 font-bold text-xl">Job Details</h1>
                    <div className="mt-4 flex flex-col gap-3">
                      <div className="flex gap-3">
                        <PaymentIcon />
                        <div>
                          <p className="font-semibold">Pay</p>
                          <p className="mt-2 font-semibold text-sm bg-gray-200 p-1 rounded-md">
                            Rs {job.minSalaray} - Rs {job.maxSalaray} a{" "}
                            {job.payType}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <CasesIcon />
                        <div>
                          <p className="font-semibold">Job Type</p>
                          <p className="mt-2 font-semibold text-sm bg-gray-200 p-1 rounded-md">
                            {job.jobType}
                          </p>
                        </div>
                      </div>
                      <h1 className="mt-4 text-lg font-bold">Description</h1>
                      <div
                        className="mt-2  text-sm bg-gray-200 p-1 rounded-md"
                        dangerouslySetInnerHTML={{ __html: job.jobDescription }}
                      />
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Jobs;
