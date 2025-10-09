import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAddContact } from "../../../api/client/contact";

// ✅ Validation Schema
const schema = yup.object().shape({
  fullName: yup.string().required("Full Name is required"),
  email: yup.string().email("Invalid email format").required("Email is required"),
  organization: yup.string().optional(),
  category: yup.string().required("Please select a category"),
  subject: yup.string().required("Message Subject is required"),
  message: yup.string().required("Message is required"),
  // attachment: yup
  //   .mixed()
  //   .test("fileSize", "File size must be less than 5MB", (fileList) => {
  //     if (!fileList || fileList.length === 0) return true;
  //     return fileList[0].size <= 5 * 1024 * 1024;
  //   }),
  // consent: yup.boolean().oneOf([true], "Consent is required"),
});

export default function ContactForm() {
  const {
    handleSubmit,
    control,
    register,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      fullName: "",
      email: "",
      organization: "",
      category: "",
      subject: "",
      message: "",
      // attachment: null,
      // consent: false,
    },
  });

  const { addContact, isSuccess, isPending, isError, error } = useAddContact()
  const onSubmit = (data) => {
    addContact(data)
    // const file = data.attachment?.[0] || null;
    // console.log({
    //   ...data,
    //   attachment: file ? file.name : "No file attached",
    // });
    // reset();
  };

  useEffect(() => {
    reset()
  }, [isSuccess])

  return (
    <div className="max-w-2xl mx-auto bg-white/80 backdrop-blur-sm shadow-2xl rounded-2xl p-8 transition-all duration-300 border border-gray-100">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">📨 Contact Us</h1>
        <p className="text-gray-500 mt-2">
          We'd love to hear from you. Share your thoughts, inquiries, or partnership ideas below.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Full Name & Email */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="relative">
            <input
              type="text"
              {...register("fullName")}
              placeholder=" "
              className="peer w-full border border-gray-300 rounded-lg px-3 pt-5 pb-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition"
            />
            <label className="absolute z-0 left-3 top-2.5 text-gray-500 text-xs peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 transition-all">
              Full Name*
            </label>
            {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName.message}</p>}
          </div>

          <div className="relative">
            <input
              type="email"
              {...register("email")}
              placeholder=" "
              className="peer w-full border border-gray-300 rounded-lg px-3 pt-5 pb-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition"
            />
            <label className="absolute left-3 top-2.5 text-gray-500 text-xs peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 transition-all">
              Email Address*
            </label>
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
          </div>
        </div>

        {/* Organization */}
        <div className="relative">
          <input
            type="text"
            {...register("organization")}
            placeholder=" "
            className="peer w-full border border-gray-300 rounded-lg px-3 pt-5 pb-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition"
          />
          <label className="absolute left-3 top-2.5 text-gray-500 text-xs peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 transition-all">
            Organization / Company
          </label>
        </div>

        {/* Category */}
        <div className="relative">
          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <select
                {...field}
                className="mt-1 w-full border border-gray-300 rounded-lg px-3 pt-5 pb-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none appearance-none bg-white transition"
              >
                <option value="">Select a category</option>
                <option value="General Inquiry">General Inquiry</option>
                <option value="Technical Support">Technical Support</option>
                <option value="Partnership">Partnership</option>
                <option value="Feedback">Feedback</option>
                <option value="Account Issue">Account Issue</option>
                <option value="Other">Other</option>
              </select>
            )}
          />
          <label className="absolute left-3 top-2.5 text-gray-500 text-xs peer-placeholder-shown:text-sm transition-all">
            Category / Purpose*
          </label>
          {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category.message}</p>}
        </div>

        {/* Subject */}
        <div className="relative">
          <input
            type="text"
            {...register("subject")}
            placeholder=" "
            className="peer w-full border border-gray-300 rounded-lg px-3 pt-5 pb-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition"
          />
          <label className="absolute left-3 top-2.5 text-gray-500 text-xs peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 transition-all">
            Message Subject*
          </label>
          {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject.message}</p>}
        </div>

        {/* Message */}
        <div className="relative">
          <textarea
            rows={4}
            {...register("message")}
            placeholder=" "
            className="peer w-full border border-gray-300 rounded-lg px-3 pt-5 pb-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition resize-none"
          ></textarea>
          <label className="absolute left-3 top-2.5 text-gray-500 text-xs peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 transition-all">
            Message / Description*
          </label>
          {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
        </div>

        {/* Attachment */}
        {/* <div>
          <label className="block font-medium text-sm mb-1 text-gray-600">
            Attachment (Optional, Max 5MB)
          </label>
          <input
            type="file"
            {...register("attachment")}
            className="block w-full text-sm text-gray-600 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 file:mr-4 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-600 hover:file:bg-blue-100 transition"
          />
          {errors.attachment && <p className="text-red-500 text-xs mt-1">{errors.attachment.message}</p>}
        </div> */}

        {/* Consent */}
        {/* <div className="flex items-start space-x-2">
          <input type="checkbox" {...register("consent")} className="mt-1 h-4 w-4 text-blue-600 rounded" />
          <span className="text-sm text-gray-600">
            I consent to ICCD Talent Gate storing and using my data to process this inquiry.*
          </span>
        </div>
        {errors.consent && <p className="text-red-500 text-xs">{errors.consent.message}</p>} */}

        {/* Submit */}
        <button
          type="submit"
          className={`w-full py-3 rounded-lg text-white font-semibold text-sm shadow-md transition-all ${isSuccess
              ? "bg-green-600 hover:bg-green-700"
              : "bg-blue-600 hover:bg-blue-700"
            }`}
        >
          {isSuccess ? "Message Sent ✅" : "Send Message"}
        </button>
      </form>
    </div>
  );
}
