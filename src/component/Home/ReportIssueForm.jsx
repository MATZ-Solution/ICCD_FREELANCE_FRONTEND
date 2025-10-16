"use client";
import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Select from "react-select";
import { useAddIssue } from "../../../api/client/issue";
import {
  AlertCircle,
  AlertTriangle,
  FileText,
  Mail,
  User,
  CheckCircle2,
} from "lucide-react";

const schema = yup.object().shape({
  fullName: yup
    .string()
    .required("Full name is required")
    .min(2, "Name must be at least 2 characters"),
  email: yup
    .string()
    .required("Email is required")
    .email("Please enter a valid email address"),
  userRole: yup
    .string()
    .required("Please select your role")
    .oneOf(["freelancer", "client", "visitor"], "Invalid role selected"),
  issueType: yup
    .string()
    .required("Please select an issue type")
    .oneOf(
      ["technical", "payment", "dispute", "account", "content", "other"],
      "Invalid issue type"
    ),
  description: yup
    .string()
    .required("Please describe your issue")
    .min(20, "Description must be at least 20 characters"),
  priority: yup
    .string()
    .required("Please select a priority level")
    .oneOf(["low", "medium", "high"], "Invalid priority level"),
});

const issueOptions = [
  { value: "technical", label: "Technical Bug" },
  { value: "payment", label: "Payment Problem" },
  { value: "dispute", label: "Dispute" },
  { value: "account", label: "Account Access" },
  { value: "content", label: "Inappropriate Content" },
  { value: "other", label: "Other" },
];

export default function ReportIssueForm() {
  const [showTick, setShowTick] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      fullName: "",
      email: "",
      userRole: "",
      issueType: "",
      description: "",
      priority: "",
    },
  });

  const { addIssue, isSuccess, isPending } = useAddIssue();

  const onSubmit = async (data) => {
    console.log("Form Data:", data);
    addIssue(data);
  };

  useEffect(() => {
    if (isSuccess) {
      setShowTick(true);
      reset();
      setTimeout(() => setShowTick(false), 2500);
    }
  }, [isSuccess]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-5 flex items-center justify-center">
      <div className="max-w-3xl w-full bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
        <div className="text-center p-10 border-b border-gray-100 bg-gradient-to-r from-[#f8fbfb] to-[#e9f6f7]">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[#47AAB3] rounded-2xl mb-4 shadow-lg">
            <AlertCircle className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Report an Issue</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We're here to help. Please share the details of your issue so our team can resolve it quickly.
          </p>
        </div>

        <div className="p-10">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Controller
                    name="fullName"
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="text"
                        className={`w-full pl-11 pr-4 py-3 border ${
                          errors.fullName ? "border-red-300" : "border-gray-300"
                        } rounded-xl focus:ring-2 focus:ring-[#47AAB3] outline-none transition`}
                        placeholder="John Doe"
                      />
                    )}
                  />
                </div>
                {errors.fullName && (
                  <p className="text-red-500 text-xs mt-1">{errors.fullName.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="email"
                        className={`w-full pl-11 pr-4 py-3 border ${
                          errors.email ? "border-red-300" : "border-gray-300"
                        } rounded-xl focus:ring-2 focus:ring-[#47AAB3] outline-none transition`}
                        placeholder="john@example.com"
                      />
                    )}
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                User Role <span className="text-red-500">*</span>
              </label>
              <Controller
                name="userRole"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={[
                      { value: "freelancer", label: "Freelancer" },
                      { value: "client", label: "Client" },
                      { value: "visitor", label: "Visitor" },
                    ]}
                    onChange={(option) => field.onChange(option?.value)}
                    value={
                      [
                        { value: "freelancer", label: "Freelancer" },
                        { value: "client", label: "Client" },
                        { value: "visitor", label: "Visitor" },
                      ].find((opt) => opt.value === field.value) || null
                    }
                    placeholder="Select your role"
                    classNamePrefix="react-select"
                    styles={{
                      control: (base, state) => ({
                        ...base,
                        borderRadius: "0.75rem",
                        borderColor: errors.userRole ? "#fca5a5" : "#d1d5db",
                        boxShadow: state.isFocused
                          ? "0 0 0 2px #47AAB3"
                          : "none",
                        "&:hover": { borderColor: "#47AAB3" },
                      }),
                    }}
                  />
                )}
              />
              {errors.userRole && (
                <p className="text-red-500 text-xs mt-1">{errors.userRole.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Issue Type <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <AlertTriangle className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Controller
                  name="issueType"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={issueOptions}
                      placeholder="Select issue type"
                      classNamePrefix="react-select"
                      onChange={(selected) =>
                        field.onChange(selected?.value)
                      }
                      value={
                        issueOptions.find(
                          (opt) => opt.value === field.value
                        ) || null
                      }
                      styles={{
                        control: (base, state) => ({
                          ...base,
                          paddingLeft: "2rem",
                          borderRadius: "0.75rem",
                          borderColor: errors.issueType
                            ? "#F87171"
                            : "#D1D5DB",
                          boxShadow: state.isFocused
                            ? "0 0 0 2px #47AAB3"
                            : "none",
                          "&:hover": { borderColor: "#47AAB3" },
                        }),
                      }}
                    />
                  )}
                />
              </div>
              {errors.issueType && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.issueType.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Issue Description <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <FileText className="absolute left-3 top-4 w-5 h-5 text-gray-400" />
                <Controller
                  name="description"
                  control={control}
                  render={({ field }) => (
                    <textarea
                      {...field}
                      rows={5}
                      className={`w-full pl-11 pr-4 py-3 border ${
                        errors.description
                          ? "border-red-300"
                          : "border-gray-300"
                      } rounded-xl focus:ring-2 focus:ring-[#47AAB3] outline-none resize-none`}
                      placeholder="Please describe the issue..."
                    ></textarea>
                  )}
                />
              </div>
              {errors.description && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.description.message}
                </p>
              )}
            </div>

            {/* Priority (Radio) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Priority Level <span className="text-red-500">*</span>
              </label>
              <Controller
                name="priority"
                control={control}
                render={({ field }) => (
                  <div className="flex gap-6 flex-wrap">
                    {[
                      {
                        value: "low",
                        label: "Low",
                        color: "bg-green-50 border-green-200 text-green-700",
                      },
                      {
                        value: "medium",
                        label: "Medium",
                        color:
                          "bg-yellow-50 border-yellow-200 text-yellow-700",
                      },
                      {
                        value: "high",
                        label: "High",
                        color: "bg-red-50 border-red-200 text-red-700",
                      },
                    ].map((level) => (
                      <label
                        key={level.value}
                        className={`flex items-center gap-3 px-5 py-3 rounded-xl border-2 cursor-pointer transition-all ${
                          field.value === level.value
                            ? `${level.color} border-2 shadow-md`
                            : "bg-white border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <input
                          {...field}
                          type="radio"
                          value={level.value}
                          checked={field.value === level.value}
                          className="w-4 h-4 accent-[#47AAB3]"
                        />
                        <span
                          className={`text-sm font-medium ${
                            field.value === level.value
                              ? ""
                              : "text-gray-700"
                          }`}
                        >
                          {level.label}
                        </span>
                      </label>
                    ))}
                  </div>
                )}
              />
              {errors.priority && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.priority.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isPending || showTick}
              className={`w-full py-4 flex justify-center items-center gap-2 text-white rounded-lg text-base font-semibold transition-all shadow-lg ${
                showTick
                  ? "bg-green-600 hover:bg-green-600"
                  : "bg-gradient-to-r from-[#3b90a0] to-[#2a7080] hover:shadow-xl"
              }`}
            >
              {showTick ? (
                <>
                  <CheckCircle2 className="animate-scale-in w-6 h-6 text-white" />
                  <span className="animate-fade-in">
                    Submitted Successfully!
                  </span>
                </>
              ) : isPending ? (
                "Submitting..."
              ) : (
                "Submit Report"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
