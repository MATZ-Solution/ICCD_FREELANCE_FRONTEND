import { useDispatch, useSelector } from "react-redux";
import { setUserProfile } from "../../../redux/slices/userProfileSlice";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

const SkillsForm = () => {

  const dispatch = useDispatch()
  const profileDetails = useSelector(state => state.userProfile.userProfile)

  const removeSkill = (data) => {
    let removeSkill = profileDetails.skills.filter(item=> item.skill !== data.skill)
    if(removeSkill.length === 0){
      dispatch(setUserProfile({skills: []}))
    }else{
      dispatch(setUserProfile({skills: removeSkill}))
    }
  };

  const schema = yup.object({
    skillName: yup.string().required('Skill is required'),
    level: yup.string().required('Level is required')
  });

  const { control, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      skillName: '',
      level: ''
    }
  });

  const onSubmit = (data) => {
    const newSkill = {
      skill: data.skillName,
      level: data.level
    };

    dispatch(setUserProfile({skills: [...profileDetails.skills,newSkill]}))
    reset();
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

        <Controller
          name="skillName"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              type="text"
              placeholder="Enter skill"
              className={`w-full p-3 border rounded-md ${errors.skillName ? "border-red-500" : "border-gray-300"}`}
            />
          )}
        />
        {errors.skillName && <p className="text-red-500 text-sm">{errors.skillName.message}</p>}

        <Controller
          name="level"
          control={control}
          render={({ field }) => (
            <select
              {...field}
              className={`w-full p-3 border rounded-md ${errors.level ? "border-red-500" : "border-gray-300"}`}
            >
              <option value="">Select level</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="expert">Expert</option>
            </select>
          )}
        />
        {errors.level && <p className="text-red-500 text-sm">{errors.level.message}</p>}

        <button type="submit" className="w-full p-3 bg-[#47AAB3] text-white rounded-md hover:bg-[#5db7be] transition-colors">
          Add Skill
        </button>
      </form>

      { profileDetails?.skills.length > 0 && (profileDetails?.skills.map((lang, index) => (
        <span key={index} className="inline px-3 py-1 bg-gray-100 text-gray-800 text-sm rounded-full  items-center gap-2">
          {lang.skill}
          <button type="button" onClick={() => removeSkill(lang)} className="text-red-500 hover:text-red-700">
            ×
          </button>
        </span>
      )))
      }
    </div>
  );
}

export default SkillsForm;
