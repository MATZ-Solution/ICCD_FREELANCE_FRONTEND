import React, { useState } from 'react';
import EastIcon from '@mui/icons-material/East';
import job_opp_pic from '../../assets/freelancer_dashboard/job_opp_pic.png';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import LinkIcon from '@mui/icons-material/Link';
import PaymentIcon from '@mui/icons-material/Payment';
import CasesIcon from '@mui/icons-material/Cases';
import ReactSelect from 'react-select';
import Modal from '../../component/modal';
import { useNavigate } from 'react-router-dom';
import { useGetAllJobs, useGetJobById } from '../../../api/client/job';
import { useEffect } from 'react';
import useDebounce from '../../../hooks/useDebounce';
import { useSelector } from 'react-redux';
import ProposalModal from '../../component/ProposalModal';

function Jobs() {
  const navigate = useNavigate();
  let [obj, setObj] = useState({})
  const [show, setShow] = useState(false);
  const filterNames = ['jobType', 'joblocation'];
  const [selectedJobId, setSelectedJobId] = useState(null);
  const freelancerData = useSelector(state => state.userProfile.userProfile)

  // Fetch all jobs
  const { data: allJobs, isSuccess: allJobsSuccess } = useGetAllJobs(obj);

  const { data: jobDetails, isSuccess: jobDetailsSuccess } = useGetJobById(selectedJobId, {
    enabled: !!selectedJobId, 
  });


  const filterOptions = {
    jobType: [
      { value: 'Full Time', label: 'Full Time' },
      { value: 'part_time', label: 'Part Time' },
      { value: 'contract', label: 'Contract' },
    ],

    'joblocation': [
      { value: 'remote', label: 'Remote' },
      { value: 'karachi', label: 'Karachi' },
      { value: 'lahore', label: 'Lahore' },
    ],
  };

  return (
    <div className="px-6 sm:px-10">
      {/* {show && <Modal show={show} setShow={setShow} />} */}
      {(show && jobDetails?.length > 0) && (<ProposalModal onClose={() => setShow(false)} data={jobDetails} freelancerData={freelancerData} />)}
      {/* Banner */}
      <div className="mt-10">
        <section className="flex flex-col md:flex-row items-center justify-between bg-gray-100 p-4 md:p-12 rounded-2xl shadow-lg">
          <div className="w-full md:w-1/2 text-center md:text-left mb-6 md:mb-0">
            <h1 className="text-2xl font-bold text-[#043A53] mb-4 md:text-3xl lg:text-4xl">
              Jobs Opportunities
            </h1>
            <p className="text-[#767676] mb-6">
              Create an account or sign in to see your personalized job recommendations.
            </p>
            <div className="flex items-center justify-center md:justify-start">
              <button className="shadow-xl flex gap-3 bg-[#15A9B2] text-white px-6 py-3 rounded-full hover:bg-[#05929c] transition cursor-pointer">
                <p className="text-white">Get Started</p>
                <EastIcon />
              </button>
            </div>
            <p className="mt-5 text-[#767676]">
              <span className="text-[#05929c]">Post your CV </span>-It only takes a few seconds
            </p>
          </div>

          <div className="w-full sm:w-1/2">
            <img src={job_opp_pic} alt="Banner Illustration" className="w-full h-auto object-contain" />
          </div>
        </section>
      </div>

      {/* Search Bar */}
      <div className="w-full flex flex-col items-center gap-4 p-5 mt-5 rounded-2xl bg-gray-100 shadow-lg lg:flex-row lg:gap-0">
        <div className="w-full relative">
          <SearchOutlinedIcon className="absolute top-2 left-2" />
          <input onChange={(e) => setObj({ ...obj, jobTitle: e.target.value })} className="w-full h-10 px-10 outline-none" placeholder="Job title, keywords, or company" />
        </div>
        <div className="w-full relative lg:border-l-[1px] lg:border-r-gray-400">
          <LocationOnIcon className="absolute top-2 left-2" />
          <input className="w-full h-10 px-10 outline-none" placeholder='City, state, zip code, or "remote"' />
          <button className="hidden absolute top-0 right-2 bg-[#15A9B2] rounded-md text-white px-7 py-2 lg:flex">
            Search
          </button>
        </div>
        <button className="w-full flex bg-[#15A9B2] rounded-md text-white text-center px-7 py-2 lg:hidden">
          Search
        </button>
      </div>

      {/* Browse Jobs */}
      <div className="w-full shadow-lg p-5 mt-5 rounded-2xl bg-gray-100">
        <div className="w-full flex flex-wrap gap-3 py-5 mt-5">
          {filterNames.map((filterName) => (
            <div key={filterName} className="w-40">
              <ReactSelect
                options={filterOptions[filterName]}
                placeholder={`${filterName}`}
                className="text-[#3d3d3d] font-semibold rounded-lg bg-gray-300 p-1"
                onChange={(selectedOption) => setObj({ ...obj, [filterName]: selectedOption.value })}
              />
            </div>
          ))}
        </div>

        <p>
          Sort by: <span className="text-black font-semibold">relevance</span>
        </p>

        <div className="flex flex-col md:flex-col lg:flex-row">
          {/* Left side - job list */}
          <div className="w-full lg:w-1/2 flex flex-col">
            {allJobsSuccess &&
              allJobs?.map((job, index) => (
                <div
                  key={job.id || index}
                  onClick={() => {
                    setSelectedJobId(job.id);
                    // setShow(true);
                  }}
                  className="relative mt-5 p-5 border-[1px] border-gray-400 rounded-lg hover:border-[#15A9B2] shadow-lg cursor-pointer"
                >
                  <BookmarkBorderIcon style={{ scale: 1.3 }} className="absolute right-4 top-5" />
                  <h1 className="font-bold text-xl">{job.jobTitle}</h1>
                  <p className="mt-3">{job.jobType}</p>
                  <p className="mt-3">{job.name}</p>
                  <p>{job.companyName}</p>
                  <p className="mt-3">{job.joblocation}</p>
                  <div className="flex gap-2 mt-2">
                    <p className="font-semibold text-sm bg-gray-200 p-1 rounded-md">
                      Rs {job.minSalaray} - Rs {job.maxSalaray} a {job.payType}
                    </p>
                    <p className="font-semibold text-sm bg-gray-200 p-1 rounded-md">{job.jobType}</p>
                  </div>
                </div>
              ))}
          </div>

          {/* Right side - job details */}
          <div className="hidden px-5 lg:flex lg:w-1/2 lg:h-screen sticky top-0">
            {jobDetailsSuccess && jobDetails?.map((job, index) => (
              <div key={index} className="w-full relative mt-5 p-5 border-[1px] border-gray-400 rounded-lg hover:border-[#15A9B2]">
                <h1 className="font-bold text-xl">
                  {job.jobTitle} {job.mode}
                </h1>
                <p className="mt-3">{job.name}</p>
                <p>{job.joblocation}</p>

                <div className="flex gap-2 mt-2">
                  <p className="font-semibold text-sm bg-gray-200 p-1 rounded-md">
                    Rs {job.minSalaray} - Rs {job.maxSalaray} a {job.payType}
                  </p>
                  <p className="font-semibold text-sm bg-gray-200 p-1 rounded-md">{job.jobType}</p>
                </div>

                <div className="mt-3 flex gap-4 items-center">
                  <button
                    onClick={() => setShow(true)}
                    className="bg-[#15A9B2] rounded-md text-white px-7 py-2"
                  >
                    Apply Now
                  </button>
                  <button className="bg-gray-300 p-1 rounded-md">
                    <BookmarkBorderIcon className="text-black rounded-md" />
                  </button>
                  <button className="bg-gray-300 p-1 rounded-md">
                    <LinkIcon className="text-black rounded-md" />
                  </button>
                </div>

                <div className="h-[50vh] overflow-y-scroll mt-10 border-t-[1px] border-t-gray-400">
                  <div>
                    <h1 className="mt-4 font-bold text-xl">Job Details</h1>
                    <div className="mt-4 flex flex-col gap-3">
                      <div className="mt-4 flex gap-3">
                        <PaymentIcon />
                        <div>
                          <p className="font-semibold ">Pay</p>
                          <p className="mt-2 font-semibold text-sm bg-gray-200 p-1 rounded-md">
                            Rs {job.minSalaray} - Rs {job.maxSalaray} a {job.payType}
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <CasesIcon />
                        <div>
                          <p className="font-semibold ">Job Type</p>
                          <p className="mt-2 font-semibold text-sm bg-gray-200 p-1 rounded-md">{job.jobType}</p>
                        </div>
                      </div>

                      <h1 className="mt-4 text-lg font-bold">Description</h1>
                      <p className="mt-2 text-sm bg-gray-200 p-1 rounded-md">{job.jobDescription}</p>
                    </div>
                  </div>
                </div>
              </div>
            ), (
              <p className="text-gray-500 mt-5">Select a job to see details</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Jobs;
