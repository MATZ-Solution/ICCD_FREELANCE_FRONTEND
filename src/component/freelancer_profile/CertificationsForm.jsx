import { useDispatch, useSelector } from "react-redux";
import { setUserProfile } from "../../../redux/slices/userProfileSlice";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useState } from "react";

const CertificationsForm = () => {

  const dispatch = useDispatch()
  const profileDetails = useSelector(state => state.userProfile.userProfile)

  const removeSkill = (data) => {
    let removeSkill = profileDetails.skills.filter(item => item.skill !== data.skill)
    if (removeSkill.length === 0) {
      dispatch(setUserProfile({ skills: [] }))
    } else {
      dispatch(setUserProfile({ skills: removeSkill }))
    }
  };

  const schema = yup.object({
    name: yup.string(),
    organization: yup.string(),
    year: yup.string(),
  });

  const { control, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: '',
      organization: '',
      year: '',
    }
  });

  const onSubmit = (data) => {
    const newCertification = {
      name: data.name,
      organization: data.organization,
      year: data.year,
    };
    dispatch(setUserProfile({ certifications: [...profileDetails.certifications, newCertification] }))
    // reset();
  };

  return (
    <div className="space-y-4">
      <Controller
        name="name"
        control={control}
        render={({ field, fieldState: { error } }) => (
          <div>
            <input
              {...field}
              type="text"
              placeholder="Certification name"
              className={`w-full p-3 border rounded-md ${error ? "border-red-500" : "border-gray-300"}`}
            />
            {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
          </div>
        )}
      />
      <Controller
        name="organization"
        control={control}
        render={({ field, fieldState: { error } }) => (
          <div>
            <input
              {...field}
              type="text"
              placeholder="Issuing organization"
              className={`w-full p-3 border rounded-md ${error ? "border-red-500" : "border-gray-300"}`}
            />
            {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
          </div>
        )}
      />
      <Controller
        name="year"
        control={control}
        render={({ field, fieldState: { error } }) => (
          <div>
            <input
              {...field}
              type="date"
              className={`w-full p-3 border rounded-md ${error ? "border-red-500" : "border-gray-300"}`}
            />
            {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
          </div>
        )}
      />
      <button onClick={handleSubmit(onSubmit)} className="w-full p-3 bg-[#47AAB3] text-white rounded-md hover:bg-[#5db7be] transition-colors">
        Add Certification
      </button>
    </div>

  )
}

export default CertificationsForm;