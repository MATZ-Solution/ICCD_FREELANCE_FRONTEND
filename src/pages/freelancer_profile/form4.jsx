import { EqualApproximatelyIcon } from "lucide-react";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";

const AccountSecurityStep = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      phoneNumber: "",
    },
  });

  const [emailVerified, setEmailVerified] = useState(true);
  const [phoneVerified, setPhoneVerified] = useState(false);
  const [showPhoneForm, setShowPhoneForm] = useState(false);

  const handleVerifyPhone = (data) => {
    console.log("Verified phone number:", data.phoneNumber);
    setPhoneVerified(true);
    setShowPhoneForm(false);
    reset();
  };

  return (
    <div className="max-w-6xl mx-auto p-5">
      {/* Progress Bar Section */}
      <div className="mb-8">
        <div className="bg-gray-300 my-6 h-px w-full"></div>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0 md:space-x-3 mb-5">
           <div className="flex flex-wrap items-center gap-3">
          {[1, 2, 3].map((step) => (
         <div key={step} className="flex items-center gap-1">
    <div
      className={`w-8 h-8 rounded-full flex items-center justify-center ${
        step === 3 
          ? "bg-[#01AEAD] text-white"  // active green step 1
          : "bg-[#01AEAD] text-white" // inactive steps 2 & 3 "bg-[#01AEAD] text-white"
      }`}
    >
      {step}
    </div>
    <span
      className={`${
        step === 3 ? "text-[#01AEAD]" : "text-gray-600"
      }`}
    >
      {step === 1
        ? "Personal Info"
        : step === 2
        ? "Professional Info"
        : "Account Security Info"}
    </span>
  </div>
))}

          </div>
          <div className="w-full md:w-auto">
            <div className="text-gray-500 text-sm md:text-base mb-2 md:mb-0">
              Completion Rate: 80%
            </div>
            <div className="h-2 w-full bg-gray-200 rounded overflow-hidden">
              <div
                className="h-full bg-[#01AEAD] rounded"
                style={{ width: "78%" }}
              ></div>
            </div>
          </div>
        </div>
        <div className="bg-gray-300 my-6 h-px w-full"></div>
      </div>

      <div className="flex flex-col md:flex-row justify-between md:items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold mb-3">Account Security</h2>
          <p className="text-gray-600 whitespace-pre-wrap mb-6">
            {"Trust and safety is a big deal in our community. Please verify your\nemail and phone number so that we can keep your account secured."}
          </p>
        </div>
        <p className="text-[#01AEAD] text-lg italic font-semibold md:self-end">
          * Mandatory fields
        </p>
      </div>

      <div className=" flex justify-center px-4 bg-gray-50">
        <form
          onSubmit={handleSubmit(handleVerifyPhone)}
          className="w-full bg-white p-6 rounded-lg shadow space-y-6"
        >
          {/* Email Section */}
          <div className="grid sm:grid-cols-2 gap-4 border border-gray-300 p-4 rounded">
            <div>
              <p className="font-medium text-gray-800">
                 Email <span className="text-gray-500">Private</span>
              </p>
              <p className="text-sm text-gray-500">
                Your email is used for account security.
              </p>
            </div>
            <div className="flex sm:justify-end items-center">
              {emailVerified ? (
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded text-sm whitespace-nowrap">
                  Verified
                </span>
              ) : (
                <button
                  type="button"
                  onClick={() => setEmailVerified(true)}
                  className="bg-blue-500 text-white px-3 py-1 rounded w-full sm:w-auto"
                >
                  Verify Email
                </button>
              )}
            </div>
          </div>

          {/* Phone Section */}
          <div className="grid sm:grid-cols-2 gap-4 border border-gray-300 p-4 rounded">
            <div>
              <p className="font-medium text-gray-800">
                Phone Number <span className="text-gray-500">Private</span>
              </p>
              <p className="text-sm text-gray-500">
                We'll never share your phone number.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row sm:justify-end sm:items-center gap-2 w-full">
              {phoneVerified ? (
                <span className="bg-green-100 text-[#043A53] px-3 py-1 rounded text-sm whitespace-nowrap">
                  Verified
                </span>
              ) : showPhoneForm ? (
                <div className="grid sm:grid-cols-[1fr_auto] gap-2 w-full sm:w-auto">
                  <Controller
                    name="phoneNumber"
                    control={control}
                    rules={{
                      required: "Phone number is required",
                      pattern: {
                        value: /^[0-9]{10,15}$/,
                        message: "Phone number must be 10-15 digits",
                      },
                    }}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="tel"
                        placeholder="Enter phone number"
                        className={`border p-2 rounded w-full ${
                          errors.phoneNumber
                            ? "border-red-500"
                            : "border-gray-300"
                        } focus:outline-none focus:ring-2 focus:ring-[#043A53]`}
                      />
                    )}
                  />
                  <button
                    type="submit"
                    className="bg-[#043A53] text-white px-3 py-1 rounded whitespace-nowrap"
                  >
                    Verify
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setShowPhoneForm(true)}
                  className="border border-gray-300 px-3 py-1 rounded w-full sm:w-auto"
                >
                  Add Phone Number
                </button>
              )}
            </div>
          </div>

          {errors.phoneNumber && (
            <p className="text-red-500 text-sm">{errors.phoneNumber.message}</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default AccountSecurityStep;