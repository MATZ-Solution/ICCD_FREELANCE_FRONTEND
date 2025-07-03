import React from 'react'
import thank_you_pic from '../../assets/freelancer_dashboard/thank_you_pic.png'
import Button from '../button'
import { useNavigate } from 'react-router-dom';

function Job_experience() {
    const navigate = useNavigate()
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="flex flex-col  bg-white rounded-lg w-full sm:w-[70%]  lg:w-[50%] mx-4 p-6">
                {/* Header */}
                <h3 className='mt-5 text-[#043A53] text-2xl font-semibold'>Enter a job that shows relevant experience</h3>
                <p className='mt-2 text-sm text-[#767676]'>We share one job title with the employer to introduce you as a candidate.</p>
                <div className='w-full mt-4 flex flex-col gap-3'>
                    <input
                        id="name"
                        name="name"
                        placeholder='Job Title'
                        className="w-full border-[1px] border-[#B8B8B8] rounded-md px-3 py-2 text-sm "
                    />
                    <input
                        id="name"
                        name="name"
                        placeholder='Company'
                        className="w-full border-[1px] border-[#B8B8B8] rounded-md px-3 py-2 text-sm "
                    />
                </div>
                <Button onClick={()=> navigate('/freelancer/success')} className='mt-4'>Continue</Button>
                <p className='w-[90%] text-sm text-center text-[#767676] mt-6 '>This site is protected by reCAPTCHA and the Google Privacy Policy
                    and Terms of Service apply.</p>
            </div>
        </div>
    )
}

export default Job_experience