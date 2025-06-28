import { useState } from 'react';
import Profile from '../../component/freelancers/profile';
import Button from '../../component/button';

function Description() {
    return (
        <Profile>
            <div className='font-semibold text-2xl py-2 sm:border-b-[1px] sm:border-b-[#c4c4c4] sm:py-5'>
                <p className=''>Description</p>
            </div>
            <div className=''>
                <div className=' flex flex-col gap-5 sm:mt-5'>
                    <p className='font-semibold'>Briefly Describe Your Gig</p>
                    <textarea placeholder="I will do something I'm really good at" className='w-full h-52 border-[#B8B8B8] border-[1px] p-3 rounded-md sm:p-5' ></textarea>
                </div>
            </div>
            <div className="mt-5 flex sm:justify-end">
                <Button className=''>Save & Continue</Button>
            </div>
        </Profile>
    )
}

export default Description