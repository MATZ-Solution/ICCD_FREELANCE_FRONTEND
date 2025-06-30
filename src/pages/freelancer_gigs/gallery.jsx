import React from 'react'
import Profile from '../../component/freelancers/profile';
import ReactSelect from '../../component/buttonSelect';
import { useState } from 'react';
import Button from '../../component/button';
import CollectionsIcon from '@mui/icons-material/Collections';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { useNavigate } from 'react-router-dom';

function Gallery() {
  const navigate = useNavigate()

    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' },
    ];
    const [selectedOption1, setSelectedOption1] = useState('');
    return (
        <Profile>
            <div className='md:py-5'>
                <p className='text-lg font-semibold sm:text-2xl'>Showcase Your Services In A Gig Gallery</p>
                <p className='text-[#515151] mt-3'>Encourage buyers to choose your Gig by featuring a variety of your work.</p>
                <div className='bg-[#EEEEEE] mt-3 p-5'>
                    <p className='text-[#515151]'>Help buyers find your services more easily by adding tags to all your work samples. To comply with ICCD Freelance’s terms of
                        service, make sure to upload only content you either own or you have the permission or license to use.</p>
                </div>
            </div>

            <div className='py-5  sm:border-b-2 sm:border-b-[#ecebeb] sm:border-t-2 sm:border-t-[#ecebeb] sm:py-8'>
                <p className='text-medium font-bold'>Images (up to 3)</p>
                <p className='text-[#515151] text-sm'>Get noticed by the right buyers with visual example of your services.</p>
                <div className='flex flex-col gap-4 mt-5'>
                    {
                        Array.from({ length: 3 }).map((_, index) => (
                            <div key={index} className='w-52 h-32 flex flex-col items-center justify-center  bg-white border-[1px] border-gray-300'>
                                {index === 0 && (
                                    <div className='flex flex-col items-center justify-center'>
                                        <CollectionsIcon style={{ scale: 2 }} className='text-gray-400' />
                                        <p className='text-gray-500 mt-3 text-sm font-semibold'>Drag and drop a Photo or</p>
                                        <p className='text-blue-500 text-sm'>Browse</p>
                                    </div>
                                )}
                            </div>
                        ))
                    }
                </div>
            </div>

            <div className='sm:border-b-2 sm:border-b-[#ecebeb] sm:py-8'>
                <p className='text-medium font-bold'>Video (one only)</p>
                <p className='text-[#515151] text-sm'>Get noticed by the right buyers with visual example of your services.</p>
                <div className='flex flex-col gap-4 mt-5'>
                    {
                        Array.from({ length: 1 }).map((_, index) => (
                            <div key={index} className='w-52 h-32 flex flex-col items-center justify-center  bg-white border-[1px] border-gray-300'>
                                {index === 0 && (
                                    <div className='flex flex-col items-center justify-center'>
                                        <CollectionsIcon style={{ scale: 2 }} className='text-gray-400' />
                                        <p className='text-gray-500 mt-3 text-sm font-semibold'>Drag and drop a Photo or</p>
                                        <p className='text-blue-500 text-sm'>Browse</p>
                                    </div>
                                )}
                            </div>
                        ))
                    }
                </div>
            </div>

            <div className='py-5 sm:py-8 px-3 sm:border-b-2 sm:border-b-[#ecebeb]'>
                <p className='text-medium font-bold'>Documents (up to 2)</p>
                <p className='text-[#515151] text-sm'>Get noticed by the right buyers with visual example of your services.</p>
                <div className='flex flex-col gap-4 mt-5'>
                    {
                        Array.from({ length: 2 }).map((_, index) => (
                            <div key={index} className='w-52 h-32 flex flex-col items-center justify-center  bg-white border-[1px] border-gray-300'>
                                {index === 0 && (
                                    <div className='flex flex-col items-center justify-center'>
                                        <CollectionsIcon style={{ scale: 2 }} className='text-gray-400' />
                                        <p className='text-gray-500 mt-3 text-sm font-semibold'>Drag and drop a Photo or</p>
                                        <p className='text-blue-500 text-sm'>Browse</p>
                                    </div>
                                )}
                            </div>
                        ))
                    }
                </div>
            </div>

            <div className='flex gap-2 sm:py-8 '>
                {selectedOption1 === 'I accept' ? <CheckBoxIcon onClick={()=>setSelectedOption1('')} className='cursor-pointer'/>: <CheckBoxOutlineBlankIcon onClick={()=>setSelectedOption1('I accept')} className='cursor-pointer'/>}
                <p className='text-sm text-gray-500'>I declare that these matorials were created by myself or by my team and do not infringe on any 3rd party rights, I understand that the illegal use of digital assets is against Fiverr's Terms of Service and may result in blocking my account</p>
            </div>

            <div className="mt-5 flex sm:justify-end">
                <Button className='' onClick={() => navigate('/freelancer-profile/publish')}>Save & Continue</Button>
            </div>
        </Profile>
    )
}

export default Gallery