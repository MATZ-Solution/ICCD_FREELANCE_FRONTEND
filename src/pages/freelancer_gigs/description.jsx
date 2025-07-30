// Description.jsx
import { memo, lazy, useState, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setGigsDetails } from '../../../redux/slices/gigsDetailSlice';
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useGetSingleGigs, useEditGigs } from '../../../api/client/gigs';
import { toast } from 'react-toastify';

const Profile = lazy(() => import('../../component/freelancers_gigs/profile'));
const Button = lazy(() => import('../../component/button'));
const ICCDLoader = lazy(() => import('../../component/loader'));

const Description = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    const formData = location.state;
    const data = useSelector(state => state.gigs.gigsDetails);

    const { data: gigsData, isLoading } = useGetSingleGigs(id);
    const { editGigs, isPending: editGigIsPend } = useEditGigs(id, 'json');

    const schema = yup.object({
        description: yup.string().required("Description is required"),
    });

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            description: '',
        },
    });

    useEffect(() => {
        if (gigsData && gigsData?.length > 0) {
            reset({
                description: gigsData[0]?.gigsDescription?.gigsDescription || '',
            });
        }
    }, [gigsData, reset]);

    if (isLoading || editGigIsPend) {
        return (
            <ICCDLoader />
        );
    }

    const onSubmit = (data) => {
        if (location.pathname.includes('edit')) {
            editGigs(data);
            navigate(`/freelancer/manage-gigs/gallery/edit/${id}`);
            toast.success("Gig description Eduted!");

        } else {
            dispatch(setGigsDetails(data));
            navigate('/freelancer/manage-gigs/gallery');
            toast.success("Gig description saved!");

        }
    };

    return (
        <Profile>
            <div className='font-semibold text-2xl py-2 sm:border-b-[1px] sm:border-b-[#c4c4c4] sm:py-5'>
                <p>Description</p>
            </div>
            <div>
                <div className='flex flex-col gap-5 sm:mt-5'>
                    <p className='font-semibold'>Briefly Describe Your Gig</p>
                    <div className='w-full flex flex-col gap-1'>
                        <Controller
                            control={control}
                            name="description"
                            render={({ field }) => (
                                <textarea
                                    {...field}
                                    placeholder="I will do something I'm really good at"
                                    className='w-full h-52 border-[#B8B8B8] border-[1px] p-3 rounded-md sm:p-5'
                                />
                            )}
                        />
                        {errors?.description && (
                            <p className="mt-1 text-red-600">{errors.description.message}</p>
                        )}
                    </div>
                </div>
            </div>
            <div className="mt-5 flex sm:justify-end">
                <Button className='px-5 py-2' onClick={handleSubmit(onSubmit)}>
                    Save & Continue
                </Button>
            </div>
        </Profile>
    );
};

export default memo(Description);
