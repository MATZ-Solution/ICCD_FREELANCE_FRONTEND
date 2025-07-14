import { useDispatch, useSelector } from "react-redux";
import { setUserProfile } from "../../../redux/slices/userProfileSlice";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

const ProfileForm = () => {

  const dispatch = useDispatch()
  const profileDetails = useSelector(state => state.userProfile.userProfile)

  const schema = yup.object({
    name: yup.string(),
    username: yup.string()
  });

  const { control, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: '',
      username: ''
    }
  });

  const onSubmit = (data) => {

    console.log("data: ", data)
    // dispatch(setUserProfile({ skills: [...profileDetails.skills, newSkill] }))
    // reset();
  };

  return (
    <div className="space-y-4">
      <Controller
        name="name"
        control={control}
        render={({ field, fieldState: { error } }) => (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input
              {...field}
              type="text"
              placeholder="Enter your full name"
              className={`w-full p-3 border rounded-md ${error ? "border-red-500" : "border-gray-300"}`}
            />
            {error && <p className="text-red-500 text-sm mt-1">{error.message.name}</p>}
          </div>
        )}
      />
      <Controller
        name="username"
        control={control}
        render={({ field, fieldState: { error } }) => (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
            <input
              {...field}
              type="text"
              placeholder="Enter your username"
              className={`w-full p-3 border rounded-md ${error ? "border-red-500" : "border-gray-300"}`}
            />
            {error && <p className="text-red-500 text-sm mt-1">{error.message.username}</p>}
          </div>
        )}
      />
      <button onClick={handleSubmit(onSubmit)} className="w-full p-3 bg-[#47AAB3] text-white rounded-md hover:bg-[#5db7be] transition-colors">
        Update Profile
      </button>
    </div>

  )
};

export default ProfileForm;