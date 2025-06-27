import React from 'react'
import Profile from '../../component/freelancers/profile';
import ReactSelect from '../../component/buttonSelect';
import { useState } from 'react';
import Button from '../../component/button';

function Requirement() {
    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' },
    ];
    const [selectedOption1, setSelectedOption1] = useState(null);
    return (
        <Profile>
            <div className=' flex flex-col rounded-md mt-7 gap-6 sm:border-[#AFAFAF] sm:border-[1px] sm:mt-12 sm:gap-10 sm:p-10  md:mt-20 '>
                <div>
                    <p className='text-lg font-semibold'>Get all the information you need from buyers</p>
                    <p className='text-[#8a8a8a]'>Add questions to help buyers provide you with exactly what you need to start working on their order.</p>
                </div>

                <div className='relative flex items-center justify-center'>
                    <p className='z-10 text-sm font-semibold bg-white px-3 text-gray-600'>FIVER QUESTIONS</p>
                    <div className='z-0 absolute w-full border-[1px] border-[#AFAFAF]'></div>
                </div>

                <div>
                    <p className='text-[#8a8a8a]'>These optional questinons will be added for all buyers.</p>
                    <div className='mt-7 flex flex-col gap-5'>
                        <div className='p-5 rounded-md border-[1px] border-[#c8c8c8] sm:p-12 shadow-md'>
                            <p className='font-semibold'>1. If you are ordering for a business, what's your industry?</p>
                            <p className=''>3D design, e-commerce, accounting, marketing, etc.</p>
                        </div>
                        <div className='p-5 rounded-md border-[1px] border-[#c8c8c8] sm:p-12 shadow-md'>
                            <p className='font-semibold'>1. If you are ordering for a business, what's your industry?</p>
                            <p className=''>3D design, e-commerce, accounting, marketing, etc.</p>
                        </div>
                    </div>
                </div>

                <div className='relative flex items-center justify-center'>
                    <p className='z-10 text-sm font-semibold bg-white px-3 capitalize'>YOUR QUESTIONS</p>
                    <div className='z-0 absolute w-full border-[1px] border-[#AFAFAF]'></div>
                </div>

                <div>
                    <p className='text-[#8a8a8a]'>Here's where you can request any details needed to complete the order.</p>
                    <p className='text-[#8a8a8a]'>There's no need to repeat any of the general questions asked above by ICCD.</p>

                    <div className='mt-10 flex flex-col gap-5 bg-gray-100 p-6'>
                        <div className='flex items-center justify-between'>
                            <p className='font-semibold'>Add a question</p>
                            <div>
                                <p className='font-semibold'>Required</p>
                            </div>
                        </div>
                        <div>
                            <textarea placeholder="Request necessary detsila such as dimensions, brand guidelined and more" className='bg-white w-full h-24 border-[#B8B8B8] border-[1px] focus:none px-2 py-2 rounded-md sm:h-12'></textarea>
                            <div className='flex justify-end'>
                                <p>0/400 characters</p>
                            </div>
                        </div>

                        <div className='flex flex-col gap-3 sm:w-40'>
                            <p className='font-semibold'>Get it in a form of: </p>
                            <ReactSelect
                                selectedOption={selectedOption1}
                                setSelectedOption={setSelectedOption1}
                                option={options}
                            />
                        </div>
                        <div className='flex  items-center justify-end gap-3'>
                            <Button className='p-3 bg-black font-semibold '>Cancel</Button>
                            <Button className='p-3 bg-black font-semibold '>Add</Button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-5 flex sm:justify-end">
                <Button className=''>Save & Continue</Button>
            </div>
        </Profile>
    )
}

export default Requirement