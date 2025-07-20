import { useState, useEffect } from 'react';
import Profile from '../../component/freelancers_gigs/profile';
import Button from '../../component/button';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { setGigsDetails } from '../../../redux/slices/gigsDetailSlice';
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import { useGetSingleGigs, useEditGigs } from '../../../api/client/gigs';

function Description() {

    const { id } = useParams()
    const navigate = useNavigate()
    const location = useLocation()
    const dispatch = useDispatch()
    const formData = location.state

    const data = useSelector(state => state.gigs.gigsDetails)
    const { data: gigsData, isSuccess, isPending, isError, isLoading } = useGetSingleGigs(id)
    const { editGigs, isSuccess: editGigsIsSucc, isPending: editGigIsPend, isError: editGigIsErr, error } = useEditGigs(id, 'json')


    const schema = yup.object({
        description: yup.string().required("description not selected"),
    })

    const { control, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            description: gigsData && gigsData?.length > 0 ? gigsData[0]?.gigsDescription?.gigsDescription : '',
        }
    });

    const onSubmit = (data) => {
        // dispatch(setGigsDetails(data));
        if (location.pathname.includes('edit')) {
            editGigs(data)
            navigate(`/freelancer/manage-gigs/gallery/edit/${id}`)
        } else {
            navigate('/freelancer/manage-gigs/gallery')
        }
    }

    useEffect(() => {
        if (gigsData && gigsData?.length > 0) {
            reset({
                description: gigsData[0]?.gigsDescription?.gigsDescription || '',
            });
        }
    }, [gigsData, reset]);

    return (
        <Profile>
            <div className='font-semibold text-2xl py-2 sm:border-b-[1px] sm:border-b-[#c4c4c4] sm:py-5'>
                <p className=''>Description</p>
            </div>
            <div className=''>
                <div className=' flex flex-col gap-5 sm:mt-5'>
                    <p className='font-semibold'>Briefly Describe Your Gig</p>
                    <div className='w-full flex flex-col gap-1'>
                        <Controller
                            control={control}
                            name="description"
                            render={({ field: { onChange, onBlur, value } }) => (
                                <textarea
                                    placeholder="I will do something I'm really good at"
                                    className='w-full h-52 border-[#B8B8B8] border-[1px] p-3 rounded-md sm:p-5'
                                    name="description"
                                    type="text"
                                    value={value}
                                    onChange={onChange}
                                />
                            )}
                        />
                        {errors?.description && (<p className="mt-1 text-red-600">{errors?.description?.message}</p>)}
                    </div>

                </div>
            </div>
            <div className="mt-5 flex sm:justify-end">
                <Button className='px-5 py-2' onClick={handleSubmit(onSubmit)}>Save & Continue</Button>
            </div>
        </Profile>
    )
}

export default Description