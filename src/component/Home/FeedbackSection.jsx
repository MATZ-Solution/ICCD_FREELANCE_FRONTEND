"use client";
import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Select from "react-select";
import { useAddFeedback } from "../../../api/client/feedback";
import SuccessModal from "../SuccessModal";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  userRole: yup.object().nullable().required("Please select a role"),
  message: yup.string().required("Please enter your feedback"),
});

export default function FeedbackSection() {
  const [showModal, setShowModal] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { addFeedback, isSuccess, isPending } = useAddFeedback();

  const onSubmit = (data) => {
    const payload = {
      ...data,
      userRole: data.userRole?.value,
    };
    addFeedback(payload);
  };

  useEffect(() => {
    if (isSuccess) {
      setShowModal(true);
      reset();
      setTimeout(() => setShowModal(false), 2000);
    }
  }, [isSuccess, reset]);

  const roleOptions = [
    { value: "freelancer", label: "Freelancer" },
    { value: "client", label: "Client" },
    { value: "visitor", label: "Visitor" },
  ];

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
            {/* Name */}
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

            {/* Email */}
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

            {/* Role Dropdown */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                I am a...
              </label>
              <Controller
                name="userRole"
                control={control}
                defaultValue={null}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={roleOptions}
                    placeholder="Select your role"
                    classNamePrefix="react-select"
                    className="w-full text-sm"
                    styles={{
                      control: (base, state) => ({
                        ...base,
                        borderColor: errors.userRole
                          ? "#FCA5A5"
                          : state.isFocused
                          ? "#47AAB3"
                          : "#E5E7EB",
                        boxShadow: state.isFocused
                          ? "0 0 0 3px rgba(71,170,179,0.3)"
                          : "none",
                        borderWidth: "2px",
                        borderRadius: "0.75rem",
                        padding: "2px 4px",
                      }),
                    }}
                  />
                )}
              />
              {errors.userRole && (
                <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                  ⚠️ {errors.userRole.message}
                </p>
              )}
            </div>

            {/* Message */}
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

            {/* Submit Button */}
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
          </form>
        </div>
      </div>

      {showModal && (
        <SuccessModal
          message="Thank you for your feedback! We appreciate your input."
          onClose={() => setShowModal(false)}
        />
      )}
    </section>
  );
}
