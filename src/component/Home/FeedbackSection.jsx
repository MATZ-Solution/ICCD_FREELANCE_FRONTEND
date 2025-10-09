"use client";
import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAddFeedback } from "../../../api/client/feedback";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  message: yup.string().required("Please enter your feedback"),
});

export default function FeedbackSection() {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { addFeedback, isSuccess, isPending, isError, error } = useAddFeedback()
  const onSubmit = (data) => {
    addFeedback(data)
  };

  useEffect(()=>{
    reset()
  },[isSuccess])

  return (
    <section
      className="relative bg-white py-20 px-4 overflow-hidden"
      id="feedback"
    >
      <div className="relative max-w-2xl mx-auto">
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-100">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-[#44A4AD] via-[#2E7A81] to-[#1C4C50] rounded-2xl mb-4 shadow-lg transform hover:scale-110 transition-transform duration-300">
              <span className="text-3xl text-white">💬</span>
            </div>
            <h2 className="text-4xl font-bold mb-3 bg-gradient-to-r from-[#44A4AD] via-[#2E7A81] to-[#1C4C50] bg-clip-text text-transparent">
              We Value Your Feedback
            </h2>
            <p className="text-gray-600 text-lg max-w-md mx-auto">
              Share your thoughts and help us create better experiences for everyone
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Your Name
              </label>
              <Controller
                name="name"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <input
                    {...field}
                    placeholder="John Doe"
                    className={`w-full p-4 rounded-xl border-2 transition-all duration-300 bg-white ${
                      errors.name
                        ? "border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-100"
                        : "border-gray-200 focus:border-[#47AAB3] focus:ring-4 focus:ring-[#47AAB3]/30"
                    } outline-none`}
                  />
                )}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                  ⚠️ {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>
              <Controller
                name="email"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <input
                    {...field}
                    placeholder="john@example.com"
                    type="email"
                    className={`w-full p-4 rounded-xl border-2 transition-all duration-300 bg-white ${
                      errors.email
                        ? "border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-100"
                        : "border-gray-200 focus:border-[#47AAB3] focus:ring-4 focus:ring-[#47AAB3]/30"
                    } outline-none`}
                  />
                )}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                  ⚠️ {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Your Feedback
              </label>
              <Controller
                name="message"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <textarea
                    {...field}
                    placeholder="Tell us what you think... We're all ears! 👂"
                    rows={5}
                    className={`w-full p-4 rounded-xl border-2 transition-all duration-300 bg-white resize-none ${
                      errors.message
                        ? "border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-100"
                        : "border-gray-200 focus:border-[#47AAB3] focus:ring-4 focus:ring-[#47AAB3]/30"
                    } outline-none`}
                  />
                )}
              />
              {errors.message && (
                <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                  ⚠️ {errors.message.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="w-full bg-gradient-to-r from-[#44A4AD] via-[#2E7A81] to-[#1C4C50] text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
            >
              {isPending ? (
                <>
                  <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Sending...</span>
                </>
              ) : (
                <>
                  <span>Send Feedback</span>
                  <span className="text-xl">✨</span>
                </>
              )}
            </button>

            {isSuccess && (
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 text-green-700 px-6 py-4 rounded-xl text-center animate-pulse">
                <p className="flex items-center justify-center gap-2 font-semibold">
                  ✅ Thank you! Your feedback has been received.
                </p>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
