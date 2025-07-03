import React from 'react'
import thank_you_pic from '../../assets/freelancer_dashboard/thank_you_pic.png'
import Button from '../button'
function Success() {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="flex flex-col items-center justify-center bg-white rounded-lg w-full lg:w-[50%] mx-4 p-6">
                {/* Header */}
                <img className='lg:w-52 lg:h-32' src={thank_you_pic}></img>
                <h3 className='mt-5 text-[#043A53] text-2xl font-semibold'>Your application has been submitted!</h3>
                <p className='mt-2 text-sm text-[#767676]'>You will get an email confirmation at muhammadtalhabutt8@gmail.com</p>
                <Button className='mt-4'>Return to job search</Button>
                <p className='w-[90%] text-sm text-center text-[#767676] mt-6 '>This site is protected by reCAPTCHA and the Google Privacy Policy
                    and Terms of Service apply.</p>
            </div>
        </div>
    )
}

export default Success