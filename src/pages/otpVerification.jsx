// VerifyOtp.tsx
import { useLocation } from "react-router-dom";
import { useSubmitOtp } from "../../api/client/user";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

const VerifyOtp = () => {

  const location = useLocation();
  const { email } = location.state || {}
  console.log("location: ", email)

  const { handleOtp, isSuccess, isPending, isError, error, data } = useSubmitOtp()

  const schema = yup.object({
    otp: yup.string().required('Otp is required')
  })

  const { register, control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      otp: '',
    }
  });

  const onSubmit = (data) => {
    const allData = { ...data, email: email }
    handleOtp(allData)
  };


  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="mb-6 text-2xl font-bold text-center">Verify OTP</h2>
        <form onSubmit={handleSubmit}>
          <label className="block mb-2 text-sm font-medium">Enter OTP</label>
          <Controller
            control={control}
            name="otp"
            render={({ field: { onChange, onBlur, value } }) => (
              <input
                name="otp"
                value={value}
                onChange={onChange}
                className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter Otp"
              />
            )}
          />
          {errors.otp && (<p className="mt-4 text-red-600">{errors.otp.message}</p>)}
          {error && (<p className="text-red-500">{error}</p>)}
          <button
            type="submit"
            className="w-full py-2 font-semibold text-white bg-blue-600 mt-4 rounded hover:bg-blue-700"
            onClick={handleSubmit(onSubmit)}
          >
            Verify OTP
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerifyOtp;
