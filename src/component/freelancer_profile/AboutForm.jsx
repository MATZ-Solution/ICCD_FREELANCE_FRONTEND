import { useDispatch, useSelector } from "react-redux";
import { setUserProfile } from "../../../redux/slices/userProfileSlice";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from "yup"

const AboutForm = () => {

  const dispatch = useDispatch()
  const {professionalTitle, professionalSummary} = useSelector(state => state.userProfile.userProfile)

  const schema = Yup.object({
    professionalTitle: Yup.string().required('Professional Title is required'),
    professionalSummary: Yup.string().required('Professional Summary is required')
  });

  const { control, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      professionalTitle: professionalTitle,
      professionalSummary: professionalSummary
    }
  });

  const onSubmit = (data) => {
    console.log("data: ", data)
    dispatch(setUserProfile({ professionalTitle: data.professionalTitle, professionalSummary: data.professionalSummary}))
  };

  return (
    <div className="space-y-4">
      <Controller
        name="professionalTitle"
        control={control}
        render={({ field }) => (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Professional Title</label>
            <input
              {...field}
              type="text"
              placeholder="Enter your professional tagline"
              className={`w-full p-3 border rounded-md ${errors.professionalTitle ? "border-red-500" : "border-gray-300"}`}
            />
            {errors.professionalTitle && <p className="text-red-500 text-sm mt-1">{errors.message.professionalTitle}</p>}
          </div>
        )}
      />
      <Controller
        name="professionalSummary"
        control={control}
        render={({ field }) => (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Professional Summary</label>
            <textarea
              {...field}
              rows={6}
              placeholder="Tell us about yourself, your experience, and what you do..."
              className={`w-full p-3 border rounded-md resize-none ${errors.professionalSummary ? "border-red-500" : "border-gray-300"}`}
            />
            {errors.professionalSummary && <p className="text-red-500 text-sm mt-1">{errors.message.professionalSummary}</p>}
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