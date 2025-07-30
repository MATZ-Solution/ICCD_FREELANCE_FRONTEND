import React, { lazy, Suspense, useEffect, useMemo } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setGigsDetails } from '../../../redux/slices/gigsDetailSlice';
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useEditGigs, useGetSingleGigs } from '../../../api/client/gigs';
import { toast } from 'react-toastify';
import ICCDLoader from '../../component/loader';
import ICCDError from '../../component/ICCDError';

// Lazy components
const Profile = lazy(() => import('../../component/freelancers_gigs/profile'));
const ReactSelect = lazy(() => import('../../component/buttonSelect'));
const Button = lazy(() => import('../../component/button'));
// const ICCDLoader = lazy(() => import('../../component/loader'));
// const ICCDError = lazy(() => import('../../component/ICCDError'));

const Overview = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { id } = useParams();

  const { data: gigsData, isSuccess, isPending, isError, isLoading, error } = useGetSingleGigs(id);
  const {
    editGigs,
    isSuccess: editGigsIsSucc,
    isPending: editGigIsPend,
    isError: editGigIsErr,
    error: editError
  } = useEditGigs(id, 'json');

  const schema = yup.object({
    gigsTitle: yup.string().required("Title not selected"),
    category: yup.string().required("Category not selected"),
    subCategory: yup.string().required("Sub-category not selected"),
  });

  const { register, control, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      gigsTitle: '',
      category: null,
      subCategory: null,
    }
  });

  useEffect(() => {
    if (gigsData && gigsData?.length > 0) {
      reset({
        gigsTitle: gigsData[0]?.gigsDescription?.gigsTitle || '',
        category: gigsData[0]?.gigsDescription?.gigsCategory || null,
        subCategory: gigsData[0]?.gigsDescription?.gigsSubcategory || null,
      });
    }
  }, [gigsData, reset]);

  useEffect(() => {
    if (editGigsIsSucc) {
      toast.success("Gig updated successfully!");
    }
  }, [editGigsIsSucc]);

  useEffect(() => {
    if (editGigIsErr && editError?.message) {
      toast.error(editError.message);
    }
  }, [editGigIsErr, editError]);

  useEffect(() => {
    if (isError && error?.message) {
      toast.error(error.message);
    }
  }, [isError, error]);

  const onSubmit = (formData) => {
    if (location.pathname.includes('edit')) {
      editGigs(formData);
      navigate(`/freelancer/manage-gigs/pricing/edit/${id}`);
                  
        toast.success("overview Saved Successfully!");
      
      
    } else {
      navigate('/freelancer/manage-gigs/pricing');
    }
  };

  const gigInfo = useMemo(() => ([
    {
      name: 'Gig title',
      details: 'As your Gig storefront, your title is the most important place to include keywords buyers use to search for services like yours.',
    },
    {
      name: 'Category',
      details: 'Choose the category and sub-category most suitable for your Gig.',
    },
    {
      name: 'Search tags',
      details: 'Tag your Gig with buzzwords relevant to the services you offer. Use all 5 tags to get found.',
    },
  ]), []);

  const options = useMemo(() => [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
  ], []);

  if (isLoading || editGigIsPend) {
    return (
      <Suspense fallback={ <div>Loading error...</div>}>
        <ICCDLoader />
      </Suspense>
    );
  }

  if (isError || editGigIsErr) {
    return (
      <Suspense fallback={<div>Loading error...</div>}>
        <ICCDError message={error?.message || editError?.message || "Something went wrong"} />
      </Suspense>
    );
  }

  return (
    <Suspense fallback={<ICCDLoader />}>
      <Profile>
        <div className='flex flex-col rounded-md mt-7 gap-6 sm:border-[#AFAFAF] sm:border-[1px] sm:mt-20 sm:gap-10 sm:p-10'>
          {gigInfo.map((item, index) => (
            <div key={index} className='flex flex-col gap-4 sm:gap-10 sm:flex-row'>
              <div className='flex flex-col sm:w-80 sm:gap-2'>
                <p className='font-semibold sm:text-lg'>{item.name}</p>
                <p className='text-sm'>{item.details}</p>
              </div>

              {item.name === 'Gig title' && (
                <div className='w-full flex flex-col gap-1'>
                  <Controller
                    control={control}
                    name="gigsTitle"
                    render={({ field }) => (
                      <textarea
                        {...field}
                        placeholder="I will do something I'm really good at"
                        className='w-full h-36 border-[#B8B8B8] border-[1px] p-3 rounded-md sm:p-5'
                      />
                    )}
                  />
                  {errors.gigsTitle && <p className="mt-1 text-red-600">{errors.gigsTitle.message}</p>}
                </div>
              )}

              {item.name === 'Category' && (
                <div className='w-full items-center justify-center flex flex-col gap-5 sm:flex-row sm:gap-1'>
                  <div className='w-full flex flex-col gap-1'>
                    <Controller
                      control={control}
                      name="category"
                      render={({ field }) => (
                        <ReactSelect
                          placeholder='Select Category'
                          onChange={(option) => field.onChange(option?.value || '')}
                          option={options}
                          value={options.find(opt => opt.value === field.value) || null}
                        />
                      )}
                    />
                    {errors.category && <p className="mt-1 text-red-600">{errors.category.message}</p>}
                  </div>

                  <div className='w-full flex flex-col gap-1'>
                    <Controller
                      control={control}
                      name="subCategory"
                      render={({ field }) => (
                        <ReactSelect
                          placeholder='Select Subcategory'
                          onChange={(option) => field.onChange(option?.value || '')}
                          option={options}
                          value={options.find(opt => opt.value === field.value) || null}
                        />
                      )}
                    />
                    {errors.subCategory && <p className="mt-1 text-red-600">{errors.subCategory.message}</p>}
                  </div>
                </div>
              )}

              {item.name === 'Search tags' && (
                <div className='w-full flex flex-col gap-1'>
                  <p className='font-semibold sm:text-lg'>Positive keywords</p>
                  <p className='text-sm'>Enter search terms you feel your buyers will use when looking for your service.</p>
                  <textarea placeholder="e.g. logo design, branding" className='w-full h-36 border-[#B8B8B8] border-[1px] p-5 rounded-md' />
                  <p className='text-sm'>5 tags maximum. Use letters and numbers only.</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-5 flex sm:justify-end">
          <Button className='px-5 py-2' onClick={handleSubmit(onSubmit)}>
            Save & Continue
          </Button>
        </div>
      </Profile>
    </Suspense>
  );
};

export default React.memo(Overview);
