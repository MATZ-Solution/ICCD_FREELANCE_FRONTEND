import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAddContact } from "../../../api/client/contact";
import { Mail, User, Building2, Tag, FileText, MessageSquare, Send, CheckCircle } from "lucide-react";

const schema = yup.object().shape({
  fullName: yup.string().required("Full Name is required"),
  email: yup.string().email("Invalid email format").required("Email is required"),
  organization: yup.string().optional(),
  category: yup.string().required("Please select a category"),
  subject: yup.string().required("Message Subject is required"),
  message: yup.string().required("Message is required"),
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
    },
  });

  const { addContact, isSuccess, isPending, isError, error } = useAddContact();
  
  const onSubmit = (data) => {
    addContact(data);
  };

  useEffect(() => {
    if (isSuccess) {
      reset();
    }
  }, [isSuccess, reset]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[#47AAB3] rounded-2xl mb-4 shadow-lg">
            <Mail className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Get in Touch</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Have a question or want to work together? We'd love to hear from you. Fill out the form below and we'll get back to you soon.
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-10">
          {isSuccess && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
              <p className="text-green-800 text-sm">Your message has been sent successfully! We'll get back to you soon.</p>
            </div>
          )}

          {isError && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
              <p className="text-red-800 text-sm">Something went wrong. Please try again.</p>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Full Name & Email Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    {...register("fullName")}
                    className={`w-full pl-11 pr-4 py-3 border ${
                      errors.fullName ? "border-red-300" : "border-gray-300"
                    } rounded-xl focus:ring-2 focus:ring-[#47AAB3] focus:border-transparent outline-none transition`}
                    placeholder="John Doe"
                  />
                </div>
                {errors.fullName && (
                  <p className="text-red-500 text-xs mt-1">{errors.fullName.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    {...register("email")}
                    className={`w-full pl-11 pr-4 py-3 border ${
                      errors.email ? "border-red-300" : "border-gray-300"
                    } rounded-xl focus:ring-2 focus:ring-[#47AAB3] focus:border-transparent outline-none transition`}
                    placeholder="john@example.com"
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                )}
              </div>
            </div>

            {/* Organization & Category Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Organization / Company
                </label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    {...register("organization")}
                    className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#47AAB3] focus:border-transparent outline-none transition"
                    placeholder="Your Company"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Controller
                    name="category"
                    control={control}
                    render={({ field }) => (
                      <select
                        {...field}
                        className={`w-full pl-11 pr-4 py-3 border ${
                          errors.category ? "border-red-300" : "border-gray-300"
                        } rounded-xl focus:ring-2 focus:ring-[#47AAB3] focus:border-transparent outline-none appearance-none bg-white transition`}
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
                </div>
                {errors.category && (
                  <p className="text-red-500 text-xs mt-1">{errors.category.message}</p>
                )}
              </div>
            </div>

            {/* Subject */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Subject <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  {...register("subject")}
                  className={`w-full pl-11 pr-4 py-3 border ${
                    errors.subject ? "border-red-300" : "border-gray-300"
                  } rounded-xl focus:ring-2 focus:ring-[#47AAB3] focus:border-transparent outline-none transition`}
                  placeholder="How can we help you?"
                />
              </div>
              {errors.subject && (
                <p className="text-red-500 text-xs mt-1">{errors.subject.message}</p>
              )}
            </div>

            {/* Message */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Message <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <MessageSquare className="absolute left-3 top-4 w-5 h-5 text-gray-400" />
                <textarea
                  rows={5}
                  {...register("message")}
                  className={`w-full pl-11 pr-4 py-3 border ${
                    errors.message ? "border-red-300" : "border-gray-300"
                  } rounded-xl focus:ring-2 focus:ring-[#47AAB3] focus:border-transparent outline-none transition resize-none`}
                  placeholder="Tell us more about your inquiry..."
                ></textarea>
              </div>
              {errors.message && (
                <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isPending}
              className={`w-full py-4 rounded-xl text-white font-semibold text-base shadow-lg transition-all duration-300 flex items-center justify-center gap-2 ${
                isSuccess
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-[#47AAB3] hover:bg-[#3a8f96] hover:shadow-xl"
              } ${isPending ? "opacity-70 cursor-not-allowed" : ""}`}
            >
              {isPending ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Sending...
                </>
              ) : isSuccess ? (
                <>
                  <CheckCircle className="w-5 h-5" />
                  Message Sent Successfully
                </>
              ) : (
                <>
                  Send Message
                  <Send className="w-5 h-5" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Footer Info */}
        <div className="text-center mt-8 text-gray-600 text-sm">
          <p>We typically respond within 24-48 hours during business days.</p>
        </div>
      </div>
    </div>
  );
}