import { useDispatch, useSelector } from "react-redux";
import { setUserProfile } from "../../../redux/slices/userProfileSlice";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

const AboutForm = () => {

  const dispatch = useDispatch()
  const profileDetails = useSelector(state => state.userProfile.userProfile)
  console.log("about section profile: ", profileDetails)

  const schema = yup.object({
    about_tagline: yup.string().required('Skill is required'),
    about_description: yup.string().required('Level is required')
  });

  const { control, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      about_tagline: '',
      about_description: ''
    }
  });

  const onSubmit = (data) => {
    console.log("data: ", data)
    dispatch(setUserProfile({ about_tagline: data.about_tagline, about_description: data.about_description}))
  };

  return (
    <div className="space-y-4">
      <Controller
        name="about_tagline"
        control={control}
        render={({ field, fieldState: { error } }) => (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tagline</label>
            <input
              {...field}
              type="text"
              placeholder="Enter your professional tagline"
              className={`w-full p-3 border rounded-md ${error ? "border-red-500" : "border-gray-300"}`}
            />
            {error && <p className="text-red-500 text-sm mt-1">{error.message.about_tagline}</p>}
          </div>
        )}
      />
      <Controller
        name="about_description"
        control={control}
        render={({ field, fieldState: { error } }) => (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              {...field}
              rows={6}
              placeholder="Tell us about yourself, your experience, and what you do..."
              className={`w-full p-3 border rounded-md resize-none ${error ? "border-red-500" : "border-gray-300"}`}
            />
            {error && <p className="text-red-500 text-sm mt-1">{error.message.about_description}</p>}
          </div>
        )}
      />
      <button onClick={handleSubmit(onSubmit)} className="w-full p-3 bg-[#47AAB3] text-white rounded-md hover:bg-[#5db7be] transition-colors">
        Update About Section
      </button>
    </div>
  )
}

export default AboutForm;