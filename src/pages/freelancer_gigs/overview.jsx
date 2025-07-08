import { useState } from 'react';
import ReactSelect from '../../component/buttonSelect';
import Profile from '../../component/freelancers_gigs/profile';
import Button from '../../component/button';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

function Overview() {

  const navigate = useNavigate()

  const schema = yup.object({
    gigsTitle: yup.string().required("title not selected"),
    category: yup.string().required("category not selected"),
    subCategory: yup.string().required("sub category not selected"),
  })

  const { register, control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      gigsTitle: '',
      category: null,
      subCategory: null
    }
  });

  let data = [
    { name: 'Gig title', details: 'As your Gig storefront, your title is the most important place to include keywords that buyers would likely use to search for a service like yours.' },
    { name: 'Category', details: 'Choose the category and sub-category most suitable for your Gig.' },
    { name: 'Search tags', details: 'Tag your Gig with buzz words that are relevant to the services you offer. Use all 5 tags to get found.' },
  ]
  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
  ];

  const onSubmit = (data) => {
    console.log("data: ", data)
    navigate('/freelancer/manage-gigs/pricing', { state: data })
  }

  return (
    <Profile>
      <div className='flex flex-col rounded-md mt-7 gap-6 sm:border-[#AFAFAF] sm:border-[1px] sm:mt-20 sm:gap-10 sm:p-10'>
        {
          data.map((item, index) => (
            <div key={index} className='flex flex-col gap-4 sm:gap-10 sm:flex-row'>
              <div className='flex flex-col sm:w-80 sm:gap-2'>
                <p className='font-semibold sm:text-lg'>{item.name}</p>
                <p className='text-sm'>{item.details}</p>
              </div>
              {item.name === 'Gig title' &&
                (
                  <div className='w-full flex flex-col gap-1'>
                    <Controller
                      control={control}
                      name="gigsTitle"
                      render={({ field: { onChange, onBlur, value } }) => (
                        <textarea
                          placeholder="I will do something I'm really good at"
                          className='w-full h-36 border-[#B8B8B8] border-[1px] p-3 rounded-md sm:p-5'
                          name="gigsTitle"
                          type="text"
                          value={value}
                          onChange={onChange}
                        />
                      )}
                    />
                    {errors?.gigsTitle && (<p className="mt-1 text-red-600">{errors?.gigsTitle?.message}</p>)}
                  </div>
                )
              }
              {item.name === 'Category' &&
                (
                  <div className='w-full items-center justify-center flex flex-col gap-5 sm:flex-row sm:gap-1'>
                    <div className='w-full flex flex-col gap-1'>
                      <Controller
                        control={control}
                        name="category"
                        render={({ field: { onChange, onBlur, value, } }) => (
                          <ReactSelect
                            placeholder='Select Category'
                            onChange={(selectedOption) => onChange(selectedOption?.value || '')}
                            option={options}
                            value={options.find(option => option.value === value) || null}
                          />
                        )}
                      />
                      {errors?.category && (<p className="mt-1 text-red-600">{errors?.category?.message}</p>)}
                    </div>
                    <div className='w-full flex flex-col gap-1'>
                      <Controller
                        control={control}
                        name="subCategory"
                        render={({ field: { onChange, onBlur, value, } }) => (
                          <ReactSelect
                            placeholder='Select Category'
                            onChange={(selectedOption) => onChange(selectedOption?.value || '')}
                            option={options}
                            value={options.find(option => option.value === value) || null}
                          />
                        )}
                      />
                      {errors?.subCategory && (<p className="mt-1 text-red-600">{errors?.subCategory?.message}</p>)}
                    </div>
                  </div>
                )
              }
              {item.name === 'Search tags' &&
                (
                  <div className='w-full flex flex-col gap-1'>
                    <p className='font-semibold sm:text-lg'>Positive keywords</p>
                    <p className='text-sm'>Enter search terms you feel your buyers will use when looking for your service.</p>
                    <textarea placeholder="I will do something I'm really good at" className='w-full h-36 border-[#B8B8B8] border-[1px] focus:none p-5 rounded-md'></textarea>
                    <p className='text-sm'>5 tags maximum. Use letters and numbers only.</p>
                  </div>
                )
              }
            </div>
          ))
        }
      </div>
      <div className="mt-5 flex sm:justify-end">
        <Button

          className='px-5 py-2' onClick={handleSubmit(onSubmit)}>Save & Continue</Button>
      </div>
    </Profile>
  )
}

export default Overview