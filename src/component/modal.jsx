import CloseIcon from '@mui/icons-material/Close';
import PaymentIcon from '@mui/icons-material/Payment';
import CasesIcon from '@mui/icons-material/Cases';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import LinkIcon from '@mui/icons-material/Link';

function Modal({ show, setShow, data }) {
    return (
        <div className="w-full flex fixed z-20 inset-0 sm:p-5 sm:items-center sm:justify-center lg:p-10 lg:hidden">
            <div className="absolute inset-0 bg-black/50 z-0"></div>

            <div className={`relative p-5 z-10 w-full flex flex-col bg-white sm:w-xl sm:rounded-2xl sm:h-[90vh] md:w-4xl `}>
                
                <div onClick={() => setShow(!show)} className='bg-gray-300 rounded-full p-1 absolute top-6 right-10'><CloseIcon /></div>
                
                <div className='w-full h-full overflow-y-scroll px-5 '>
                    <div className='w-full relative mt-5 p-5  rounded-lg '>
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

                        <div className=' mt-10 border-t-[1px] border-t-gray-400  '>

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

export default Modal