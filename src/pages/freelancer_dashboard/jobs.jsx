import bannerImage from '../../assets/banner_img_1.png'
import EastIcon from '@mui/icons-material/East';
import job_opp_pic from '../../assets/job_opp_pic.png'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import LinkIcon from '@mui/icons-material/Link';
import CloseIcon from '@mui/icons-material/Close';
import PaymentIcon from '@mui/icons-material/Payment';
import CasesIcon from '@mui/icons-material/Cases';
import { useState } from 'react';
import Dialog from '../../component/dialog';
import SignIn_modal1 from '../../component/modal/signIn_Modal1';
import Modal from '../../component/modal';

function Jobs() {
    const filter = ['Pay', 'Company', 'Job Type', 'Job Language', 'Location', 'Date Posted']
    const [jobsData, setJobData] = useState([])
    const companyData = [
        { title: 'UI/UX Designer', companyName: 'Angular Quantum', jobType: 'full-time' }
    ]
    const [show, setShow] = useState(false)
    return (
        <div className='px-6 sm:px-10'>
            {/* Job opportunity header */}
           {show && (<Modal show={show} setShow={setShow}/>)}
            <div className=' mt-10'>
                <section className=" flex flex-col md:flex-row items-center justify-between bg-gray-100 p-4 md:p-12 rounded-2xl shadow-lg">
                    {/* Left Text Content */}
                    <div className="w-full md:w-1/2 text-center md:text-left mb-6 md:mb-0">
                        <h1 className="text-2xl font-bold text-[#043A53] mb-4 md:text-3xl lg:text-4xl">
                            Jobs Opportunities
                        </h1>
                        <p className="text-[#767676] mb-6 ">
                            Create an account or sign in to see your personalized job recommendations.
                        </p>
                        <div className='flex items-center justify-center md:justify-start'>
                            <button className="shadow-xl flex gap-3 bg-[#15A9B2] text-white px-6 py-3 rounded-full hover:bg-[#05929c] transition cursor">
                                <p className='text-white'>Get Started</p>
                                <EastIcon />
                            </button>
                        </div>
                        <p className='mt-5 text-[#767676]'> <span className='text-[#05929c]'>Post your CV </span>- It only takes a few seconds</p>
                    </div>

                    {/* Right Image */}
                    <div className="w-full sm:w-1/2">
                        <img
                            src={job_opp_pic}
                            alt="Banner Illustration"
                            className="w-full h-auto object-contain"
                        />
                    </div>
                </section>
            </div>

            {/* Search Bar */}
            <div className='w-full flex flex-col items-center gap-4 p-5 mt-5 rounded-2xl bg-gray-100 shadow-lg lg:flex-row lg:gap-0'>
                <div className='w-full relative'>
                    <SearchOutlinedIcon className='absolute top-1 left-2' />
                    <input className='w-full h-10 px-10' placeholder='Job title, keywords, or company'></input>
                </div>
                <div className='w-full relative lg:border-l-[1px] lg:border-r-gray-400'>
                    <LocationOnIcon className='absolute top-1 left-2' />
                    <input className='w-full h-10  px-10' placeholder='City, state, zip code, or "remote"'></input>
                    <button className='hidden absolute top-0 right-2 bg-[#15A9B2] rounded-md text-white px-7 py-2 lg:flex'>Search</button>
                </div>
                <button className='w-full flex bg-[#15A9B2] rounded-md text-white text-center px-7 py-2  lg:hidden'>Search</button>
            </div>

            {/* Browse Jobs */}
            <div className='w-full shadow-lg p-5 mt-5 rounded-2xl bg-gray-100 '>
                <div className='w-full flex flex-wrap gap-3 py-5 mt-5'>
                    {filter.map((data, index) => (<div key={index} className='text-[#3d3d3d] font-semibold rounded-lg bg-gray-300 p-3'>{data}</div>))}
                </div>
                <p>Sort by: <span className='text-black font-semibold'>relevance</span></p>
                <div className='flex'>
                    <div className='w-full flex-col'>
                        {
                            Array.from({ length: 5 }).map((_, index) => (
                                <div key={index} onClick={()=> setShow(true)} className='relative mt-5 p-5 border-[1px] border-gray-400 rounded-lg hover:border-[1px] hover:border-[#15A9B2] shadow-lg'>
                                    <BookmarkBorderIcon style={{ scale: 1.3 }} className='absolute right-4 top-5' />
                                    <h1 className=' font-bold text-xl'>Senior UI UX Designer</h1>
                                    <p className='mt-3'>Angular Quantum</p>
                                    <p>Pakistan</p>
                                    <div className='flex gap-2 mt-2'>
                                        <p className='font-semibold text-sm bg-gray-200 p-1 rounded-md'>Rs 100,000 - Rs 200,000 a month</p>
                                        <p className='font-semibold text-sm bg-gray-200 p-1 rounded-md'>Full-time</p>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    <div className='hidden px-5 lg:flex lg:w-full lg:h-screen sticky top-0 '>
                        <div className='w-full relative mt-5 p-5 border-[1px] border-gray-400 rounded-lg hover:border-[1px] hover:border-[#15A9B2]'>
                            {/* <CloseIcon style={{ scale: 1 }} className='absolute right-4 top-5' /> */}
                            <h1 className=' font-bold text-xl'>Senior UI UX Designer</h1>
                            <p className='mt-3'>Angular Quantum</p>
                            <p>Pakistan</p>

                            <div className='flex gap-2 mt-2'>
                                <p className='font-semibold text-sm bg-gray-200 p-1 rounded-md'>Rs 100,000 - Rs 200,000 a month</p>
                                <p className='font-semibold text-sm bg-gray-200 p-1 rounded-md'>Full-time</p>
                            </div>

                            <div className='mt-3 flex gap-4 items-center'>
                                <button className='bg-[#15A9B2] rounded-md text-white px-7 py-2'>Apply Now</button>
                                <button className=' bg-gray-300 p-1 rounded-md'>
                                    <BookmarkBorderIcon className=' text-black rounded-md' />
                                </button>
                                <button className=' bg-gray-300 p-1 rounded-md'>
                                    <LinkIcon className=' text-black rounded-md' />
                                </button>
                            </div>

                            <div className='h-[50vh] overflow-y-scroll mt-10 border-t-[1px] border-t-gray-400  '>

                                <div className=''>
                                    <h1 className='mt-4 font-bold text-xl'>Job Details</h1>

                                    <div className='mt-4 flex flex-col gap-3'>

                                        <div className='mt-4 flex gap-3'>
                                            <PaymentIcon />
                                            <div className=''>
                                                <p className='font-semibold '>Pay</p>
                                                <p className='mt-2 font-semibold text-sm bg-gray-200 p-1 rounded-md'>Rs 100,000 - Rs 200,000 a month</p>
                                            </div>
                                        </div>

                                        <div className='flex gap-3'>
                                            <CasesIcon />
                                            <div>
                                                <p className='font-semibold '>Job Type</p>
                                                <p className='mt-2 font-semibold text-sm bg-gray-200 p-1 rounded-md'>Full-time</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className='mt-10 border-t-[1px] border-t-gray-400'>
                                    <h1 className='mt-4 font-bold text-xl'>Job Details</h1>

                                    <div className='mt-4 flex flex-col gap-3'>

                                        <div className='mt-4 flex gap-3'>
                                            <PaymentIcon />
                                            <div className=''>
                                                <p className='font-semibold '>Pay</p>
                                                <p className='mt-2 font-semibold text-sm bg-gray-200 p-1 rounded-md'>Rs 100,000 - Rs 200,000 a month</p>
                                            </div>
                                        </div>

                                        <div className='flex gap-3'>
                                            <CasesIcon />
                                            <div>
                                                <p className='font-semibold '>Job Type</p>
                                                <p className='mt-2 font-semibold text-sm bg-gray-200 p-1 rounded-md'>Full-time</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className='mt-10 border-t-[1px] border-t-gray-400'>
                                    <h1 className='mt-4 font-bold text-xl'>Job Details</h1>

                                    <div className='mt-4 flex flex-col gap-3'>

                                        <div className='mt-4 flex gap-3'>
                                            <PaymentIcon />
                                            <div className=''>
                                                <p className='font-semibold '>Pay</p>
                                                <p className='mt-2 font-semibold text-sm bg-gray-200 p-1 rounded-md'>Rs 100,000 - Rs 200,000 a month</p>
                                            </div>
                                        </div>

                                        <div className='flex gap-3'>
                                            <CasesIcon />
                                            <div>
                                                <p className='font-semibold '>Job Type</p>
                                                <p className='mt-2 font-semibold text-sm bg-gray-200 p-1 rounded-md'>Full-time</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className='mt-10 border-t-[1px] border-t-gray-400'>
                                    <h1 className='mt-4 font-bold text-xl'>Job Details</h1>

                                    <div className='mt-4 flex flex-col gap-3'>

                                        <div className='mt-4 flex gap-3'>
                                            <PaymentIcon />
                                            <div className=''>
                                                <p className='font-semibold '>Pay</p>
                                                <p className='mt-2 font-semibold text-sm bg-gray-200 p-1 rounded-md'>Rs 100,000 - Rs 200,000 a month</p>
                                            </div>
                                        </div>

                                        <div className='flex gap-3'>
                                            <CasesIcon />
                                            <div>
                                                <p className='font-semibold '>Job Type</p>
                                                <p className='mt-2 font-semibold text-sm bg-gray-200 p-1 rounded-md'>Full-time</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>


                        </div>
                    </div>
                </div>

            </div>
        </div >
    )
}

export default Jobs