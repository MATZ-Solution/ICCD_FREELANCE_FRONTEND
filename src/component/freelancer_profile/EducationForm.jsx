import { useDispatch, useSelector } from "react-redux";
import { setUserProfile } from "../../../redux/slices/userProfileSlice";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { ChevronDown } from "lucide-react";

const EducationForm = () => {

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
    country: yup.string().required('Skill is required'),
    university_name: yup.string().required('Level is required'),
    degree:  yup.string(),
    major: yup.string(),
    year: yup.string(),
  });

  const { control, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      country: '',
      university_name: '',
      degree: '',
      major: '',
      year: '',
    }
  });

  const onSubmit = (data) => {
    console.log("data: ", data)
    const newEducation = {
      educationId: Date.now,
      university_name: data.university_name,
      country: data.country,
      degree: data.degree,
      major: data.major,
      year: data.year,
    };
    dispatch(setUserProfile({ educations: [...profileDetails.educations, newEducation] }))
    reset();
  };

  return (
    <div className="space-y-4">
      <Controller
        name="country"
        control={control}
        render={({ field, fieldState: { error } }) => (
          <div>
            <div className="relative">
              <select
                {...field}
                className={`w-full p-3 border rounded-md appearance-none bg-white ${error ? "border-red-500" : "border-gray-300"}`}
              >
                <option value="">College/university country</option>
                <option value="Pakistan">Pakistan</option>
                <option value="United States">United States</option>
                <option value="United Kingdom">United Kingdom</option>
                <option value="Canada">Canada</option>
                <option value="Australia">Australia</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
            {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
          </div>
        )}
      />
      <Controller
        name="university_name"
        control={control}
        render={({ field, fieldState: { error } }) => (
          <div>
            <input
              {...field}
              type="text"
              placeholder="College/university name"
              className={`w-full p-3 border rounded-md ${error ? "border-red-500" : "border-gray-300"}`}
            />
            {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
          </div>
        )}
      />
      <div className="grid grid-cols-2 gap-3">
        <Controller
          name="degree"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <div>
              <div className="relative">
                <select
                  {...field}
                  className={`w-full p-3 border rounded-md appearance-none bg-white ${error ? "border-red-500" : "border-gray-300"}`}
                >
                  <option value="">Degree</option>
                  <option value="B.Sc.">Bachelor's</option>
                  <option value="M.Sc.">Master's</option>
                  <option value="Ph.D.">PhD</option>
                  <option value="Diploma">Diploma</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
              {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
            </div>
          )}
        />
        <Controller
          name="major"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <div>
              <input
                {...field}
                type="text"
                placeholder="Major"
                className={`w-full p-3 border rounded-md ${error ? "border-red-500" : "border-gray-300"}`}
              />
              {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
            </div>
          )}
        />
      </div>
      <Controller
        name="year"
        control={control}
        render={({ field, fieldState: { error } }) => (
          <div>
            <div className="relative">
              <select
                {...field}
                className={`w-full p-3 border rounded-md appearance-none bg-white ${error ? "border-red-500" : "border-gray-300"}`}
              >
                <option value="">Year of graduation</option>
                {Array.from({ length: 10 }, (_, i) => {
                  const year = new Date().getFullYear() + 1 - i;
                  return (
                    <option key={year} value={year.toString()}>
                      {year}
                    </option>
                  );
                })}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
            {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
          </div>
        )}
      />
      <button onClick={handleSubmit(onSubmit)} className="w-full p-3 bg-[#47AAB3] text-white rounded-md hover:bg-[#5db7be] transition-colors">
        Add Education
      </button>
    </div>
  )
}


export default EducationForm;