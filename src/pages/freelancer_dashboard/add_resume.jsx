import React from 'react'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import LinkIcon from '@mui/icons-material/Link';
import PaymentIcon from '@mui/icons-material/Payment';
import CasesIcon from '@mui/icons-material/Cases';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import freelancer_pdf from '../../assets/freelancer_dashboard/freelancer_pdf.png'
import Button from '../../component/button';
import { useNavigate } from 'react-router-dom';

function Add_resume() {
    const navigate = useNavigate()
    return (
        <div className='sm:px-24 w-full shadow-lg p-5 mt-5 rounded-2xl '>
            <p className='text-[#043A53] text-xl font-semibold sm:text-2xl  lg:text-4xl'>Add a resume for the employer</p>
            <div className='flex flex-col lg:flex-row'>
                {/* Resume */}
                <div className='w-full flex flex-col'>
                    <div className='mt-5 p-5  border-[1px] border-gray-400 rounded-lg'>
                        {/* pdf header */}
                        <div className='flex justify-between'>
                            <div className='flex gap-3'>
                                <PictureAsPdfIcon className='mt-1 text-[#01AEAD]' />
                                <div>
                                    <h3 className='font-semibold text-xl'>Talha Butt CV White Low Size_5.pdf</h3>
                                    <p className='text-[#767676]'>Uploaded more than a week ago</p>
                                </div>
                            </div>
                            <CheckCircleIcon className='text-[#01AEAD]' />
                        </div>

                        <div className='flex gap-3 border-[1px] border-gray-400 rounded-lg p-5 mt-5'>
                            <img className='w-full' src={freelancer_pdf}></img>
                        </div>

                        <div className='relative flex items-center justify-center mt-5'>
                            <p className='z-10 text-sm font-semibold bg-[#F8F8F8] px-3 text-[#767676]'>OR</p>
                            <div className='z-0 absolute w-full border-[1px] border-[#CBCBCB]'></div>
                        </div>

                        <div className='flex gap-3 border-[1px] border-gray-400 rounded-lg p-5 mt-5'>
                            <PictureAsPdfIcon className='mt-1 text-[#01AEAD]' />
                            <div>
                                <h3 className='font-semibold text-xl'>Build an ICCD Format Resume</h3>
                                <p className='text-[#767676]'>We’ll guide you through it, there are only a few steps.</p>
                            </div>
                        </div>
                    </div>
                    <Button onClick={()=> navigate('/freelancer/job-experience')} className='mt-2'>Continue</Button>
                </div>
                {/* job description */}
                <div className='mt-5  lg:px-5 lg:flex lg:w-full lg:h-screen sticky top-0 '>
                    <div className='w-full relative  p-5 border-[1px] border-gray-400 rounded-lg hover:border-[1px] hover:border-[#15A9B2]'>
                        {/* <CloseIcon style={{ scale: 1 }} className='absolute right-4 top-5' /> */}
                        <h1 className=' font-bold text-xl'>Senior UI UX Designer</h1>
                        <p className='mt-3'>Angular Quantum</p>
                        <p>Pakistan</p>

                        <div className='flex gap-2 mt-2'>
                            <p className='font-semibold text-sm bg-gray-200 p-1 rounded-md'>Rs 100,000 - Rs 200,000 a month</p>
                            <p className='font-semibold text-sm bg-gray-200 p-1 rounded-md'>Full-time</p>
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
    )
}

export default Add_resume