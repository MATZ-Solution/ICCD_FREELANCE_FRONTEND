import React from 'react'
import Profile from '../../component/freelancers/profile';
import ReactSelect from '../../component/buttonSelect';
import { useState } from 'react';
import Button from '../../component/button';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import publish_pic from '../../assets/publish_pic.png'
function Publish() {
    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' },
    ];
    const [selectedOption1, setSelectedOption1] = useState('option1');
    return (
        <Profile>

            <div className='mt-8 flex flex-col items-center justify-center sm:mt-12'>
                <div className='object-fit sm:w-96 sm:h-60' >
                    <img src={publish_pic} className='object-fit w-full h-full'></img>
                </div>
                <p className='text-lg sm:text-xl font-bold'>Your are almost there!</p>
                <p className='text-black text-center text-sm sm:text-base'>You just need to complete the following requirement to start selling.</p>
            </div>

            <div className='flex flex-col rounded-md mt-7 gap-6 bg-white sm:mt-12 sm:gap-10 sm:p-7 md:mt-8 '>
                <div className='sm:border-gray-300 rounded-md sm:border-[1px] sm:p-7'>
                    <div>
                        <p className='text-lg font-semibold'>Let's check if you need to fill out Form W-9</p>
                        <p className='mt-3  text-gray-700'>Form W-9 is used in the U.S. for tax purposes. You are required to fill it out only if you're defined as a U.S. person by the U.S. tax authorities. <span className='font-semibold underline'>Answering 'No' completes the check,</span> <span className='text-blue-500'>What is a U.S. person (as defined by the U.S. tax authorities)?</span></p>
                    </div>

                    <div className='mt-7'>
                        <p className='text-black font-semibold'>Are you a U.S. person?</p>
                        <div className='mt-5 flex flex-col gap-5'>
                            <div onClick={() => setSelectedOption1('option1')} className={`p-5 flex gap-3 rounded-md border-[1px] ${selectedOption1 === 'option1' ? 'border-[#01AEAD]' : 'border-[#c8c8c8]'}  sm:p-7 shadow-md cursor-pointer`}>
                                {selectedOption1 === 'option1' ? <RadioButtonCheckedIcon className='text-[#01AEAD]' /> : <RadioButtonUncheckedIcon />}
                                <div className='flex flex-col'>
                                    <p className='font-semibold'>If you are ordering for a business, what's your industry?</p>
                                    <p className='text-gray-500'>I confirm that all the services I offer on ICCD Freelance are performed while outside of the U.S.</p>
                                </div>
                            </div>
                            <div onClick={() => setSelectedOption1('option2')} className={`p-5 flex gap-3 rounded-md border-[1px] ${selectedOption1 === 'option2' ? 'border-[#01AEAD]' : 'border-[#c8c8c8]'} sm:p-7 shadow-md cursor-pointer`}>
                                {selectedOption1 === 'option2' ? <RadioButtonCheckedIcon className='text-[#01AEAD]' /> : <RadioButtonUncheckedIcon />}
                                <div className='flex flex-col'>
                                    <p className='font-semibold'>If you are ordering for a business, what's your industry?</p>
                                    <p className='text-gray-500'>U.S. tax authorities might request Form W-9 and information regarding your activity on ICCD Freelance.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <p className='mt-5'><span className='text-blue-500'>Learn more about tax regulations</span> and read our <span className='text-blue-500'>Privacy Policy</span> to learn how we use your data.</p>
                    <div className='flex justify-end'><Button className='mt-5'> Save & Continue</Button></div>
                </div>

                <div className='sm:border-gray-300 rounded-md sm:border-[1px] sm:p-7'>
                    <div>
                        <p className='text-xl font-semibold'>Identity verification</p>
                        <p className='mt-1 text-gray-700 '>Fill out your personal and business information to verify your identity. <span className='underline font-semibold'>Learn more</span></p>
                    </div>
                    <div className='mt-7 flex justify-end'>
                        <Button>Verify</Button>
                    </div>
                </div>

                <div className='sm:border-gray-300 rounded-md sm:border-[1px] sm:p-7'>
                    <div>
                        <p className='text-2xl font-semibold'>Congratulations!</p>
                        <p className='mt-4 font-semibold'>You're almost done with your first Gig.</p>
                        <p className='mt-4'>Before you start selling on ICCD Freelance, there is one last thing we need you to do: The security of your account is important to us. Therefore, we require all our sellers to verify their phone number before we can publish their first Gig.</p>
                        <p className='mt-4 text-gray-500 '>Your phone number remains private and is not used for marketing purposes. See more in our  <span className='text-blue-500'>Privacy Policy</span></p>
                    </div>
                    <div className='mt-7 flex justify-end'>
                        <Button>Verify</Button>
                    </div>
                </div>
            </div>
        </Profile>
    )
}

export default Publish