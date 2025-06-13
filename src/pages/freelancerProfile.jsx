import { Link } from "react-router-dom";
import { useLogin } from "../../api/client/user";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

const FreelancerProfile = () => {

  const { userLogin, isSuccess, isPending, isError, reset, error, data } = useLogin()
  

  const schema = yup.object({
    name: yup.string(),
    gigs: yup.string()
  })

  const { register, control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: '',
      gigs: ''
    }
  });

  const onSubmit = (data) => {
    // console.log("data: ", data)
    
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800">User Profile</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name </label>
            <Controller
              control={control}
              name="name"
              render={({ field: { onChange, onBlur, value } }) => (
                <input
                  name="name"
                  type="text"
                  value={value}
                  onChange={onChange}
                  className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your Name"
                />
              )}
            />

          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">gigs</label>
            <Controller
              control={control}
              name="gigs"
              render={({ field: { onChange, onBlur, value } }) => (
                <input
                  name="gigs"
                  type="text"
                  value={value}
                  onChange={onChange}
                  className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter gigs"
                />
              )}
            />

          </div>
          <p className="text-red-600">{error}</p>
          <button
            type="submit"
            className="w-full px-4 py-2 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 transition"
            onClick={handleSubmit(onSubmit)}
            disabled={isPending ? true : false}
          >
            Save
          </button>
         
        </div>
      </div>
    </div>
  );
};

export default FreelancerProfile;
