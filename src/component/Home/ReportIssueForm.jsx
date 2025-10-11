import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAddIssue } from '../../../api/client/issue';
import { AlertCircle, AlertTriangle, FileText, Mail, User } from 'lucide-react';

// Validation Schema
const schema = yup.object().shape({
  fullName: yup
    .string()
    .required('Full name is required')
    .min(2, 'Name must be at least 2 characters'),
  email: yup
    .string()
    .required('Email is required')
    .email('Please enter a valid email address'),
  // userRole: yup
  //   .string()
  //   .required('Please select your role')
  //   .oneOf(['freelancer', 'client', 'guest'], 'Invalid role selected'),
  issueType: yup
    .string()
    .required('Please select an issue type')
    .oneOf(['technical', 'payment', 'dispute', 'account', 'content', 'other'], 'Invalid issue type'),
  // projectRef: yup.string(),
  description: yup
    .string()
    .required('Please describe your issue')
    .min(20, 'Description must be at least 20 characters'),
  // screenshot: yup
  //   .mixed()
  //   .test('fileSize', 'File size must be less than 5MB', (value) => {
  //     if (!value || value.length === 0) return true;
  //     return value[0]?.size <= 5242880;
  //   })
  //   .test('fileType', 'Only JPG, PNG, and PDF files are allowed', (value) => {
  //     if (!value || value.length === 0) return true;
  //     const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];
  //     return validTypes.includes(value[0]?.type);
  //   }),
  priority: yup
    .string()
    .required('Please select a priority level')
    .oneOf(['low', 'medium', 'high'], 'Invalid priority level'),
  // responseMethod: yup
  //   .string()
  //   .required('Please select your preferred response method')
  //   .oneOf(['email', 'inapp'], 'Invalid response method'),
});

export default function ReportIssueForm() {
  const [submitted, setSubmitted] = useState(false);
  const [fileName, setFileName] = useState('');

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      fullName: '',
      email: '',
      userRole: 'freelancer',
      issueType: '',
      // projectRef: '',
      description: '',
      // screenshot: null,
      priority: '',
      // responseMethod: '',
    },
  });

  
  const {addIssue, isSuccess, isPending, isError, error } = useAddIssue()
  const onSubmit = async (data) => {
    console.log('Form Data:', data);
    addIssue(data)
  };

  useEffect(()=> {
    reset()
  },[isSuccess])

  return (
    <div className="min-h-screen  p-5">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden">
        {/* Header */}
             <div className="text-center mb-12">
          <div className="inline-flex mt-4 items-center justify-center w-16 h-16 bg-[#47AAB3] rounded-2xl mb-4 shadow-lg">
            <AlertCircle className="w-8  h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Report an Issue</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We're here to help. Please share the details of your issue so our team can resolve it as quickly as possible.
          </p>
        </div>
        {/* Form Container */}
        <div className="p-10">
          <div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Controller
                    name="fullName"
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="text"
                        className={`w-full pl-11 pr-4 py-3 border ${
                          errors.fullName ? "border-red-300" : "border-gray-300"
                        } rounded-xl focus:ring-2 focus:ring-[#47AAB3] focus:border-transparent outline-none transition`}
                        placeholder="John Doe"
                      />
                    )}
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
                  <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="email"
                        className={`w-full pl-11 pr-4 py-3 border ${
                          errors.email ? "border-red-300" : "border-gray-300"
                        } rounded-xl focus:ring-2 focus:ring-[#47AAB3] focus:border-transparent outline-none transition`}
                        placeholder="john@example.com"
                      />
                    )}
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                )}
                <p className="text-xs text-gray-500">Used for follow-up communication</p>
              </div>
            </div>


            {/* User Role */}
            {/* <div className="mb-6">
              <label className="block text-sm font-semibold text-[#2a6d7a] mb-2">
                User Role <span className="text-red-500">*</span>
              </label>
              <Controller
                name="userRole"
                control={control}
                render={({ field }) => (
                  <select
                    {...field}
                    className={`w-full px-4 py-3 border-2 rounded-lg text-sm transition-all outline-none appearance-none bg-white cursor-pointer focus:ring-2 focus:ring-[#3b90a0] focus:ring-opacity-20 ${
                      errors.userRole ? 'border-red-500' : 'border-gray-300 focus:border-[#3b90a0]'
                    }`}
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%233b90a0' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'right 15px center',
                      paddingRight: '40px',
                    }}
                  >
                    <option value="">Select your role</option>
                    <option value="freelancer">Freelancer</option>
                    <option value="client">Client</option>
                    <option value="guest">Guest</option>
                  </select>
                )}
              />
              {errors.userRole && (
                <span className="block text-red-500 text-xs mt-1 font-medium">
                  {errors.userRole.message}
                </span>
              )}
            </div> */}

            {/* Issue Type */}
                       {/* Issue Type */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Issue Type <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <AlertTriangle className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Controller
                  name="issueType"
                  control={control}
                  render={({ field }) => (
                    <select
                      {...field}
                      className={`w-full pl-11 pr-4 py-3 border ${
                        errors.issueType ? "border-red-300" : "border-gray-300"
                      } rounded-xl focus:ring-2 focus:ring-[#47AAB3] focus:border-transparent outline-none appearance-none bg-white transition`}
                    >
                      <option value="">Select issue type</option>
                      <option value="technical">Technical Bug</option>
                      <option value="payment">Payment Problem</option>
                      <option value="dispute">Dispute</option>
                      <option value="account">Account Access</option>
                      <option value="content">Inappropriate Content</option>
                      <option value="other">Other</option>
                    </select>
                  )}
                />
              </div>
              {errors.issueType && (
                <p className="text-red-500 text-xs mt-1">{errors.issueType.message}</p>
              )}
            </div>

            {/* Project Reference */}
            {/* <div className="mb-6">
              <label className="block text-sm font-semibold text-[#2a6d7a] mb-2">
                Project / Job Reference (Optional)
              </label>
              <Controller
                name="projectRef"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    placeholder="e.g., Job ID, Project Name"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-sm transition-all outline-none focus:border-[#3b90a0] focus:ring-2 focus:ring-[#3b90a0] focus:ring-opacity-20"
                  />
                )}
              />
              <div className="text-xs text-gray-600 mt-1">
                Specify if the issue is related to a specific job or transaction
              </div>
            </div> */}

            {/* Description */}
                       {/* Description */}
            <div className="space-y-2">
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
                        errors.description ? "border-red-300" : "border-gray-300"
                      } rounded-xl focus:ring-2 focus:ring-[#47AAB3] focus:border-transparent outline-none transition resize-none`}
                      placeholder="Please describe what happened, when it occurred, and any error messages you received..."
                    ></textarea>
                  )}
                />
              </div>
              {errors.description && (
                <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>
              )}
            </div>

            {/* Screenshot Upload */}
            {/* <div className="mb-6">
              <label className="block text-sm font-semibold text-[#2a6d7a] mb-2">
                Attach Screenshot (Optional)
              </label>
              <Controller
                name="screenshot"
                control={control}
                render={({ field: { onChange, value, ...field } }) => (
                  <div className="relative">
                    <input
                      {...field}
                      type="file"
                      accept=".jpg,.jpeg,.png,.pdf"
                      onChange={(e) => {
                        onChange(e.target.files);
                        if (e.target.files.length > 0) {
                          setFileName(e.target.files[0].name);
                        } else {
                          setFileName('');
                        }
                      }}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    />
                    <div className="block px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg text-center cursor-pointer bg-gray-50 hover:border-[#3b90a0] hover:bg-[#f0f8f9] transition-all">
                      <span className="text-sm text-gray-600">📎 Click to upload or drag file here</span>
                    </div>
                  </div>
                )}
              />
              {errors.screenshot && (
                <span className="block text-red-500 text-xs mt-1 font-medium">
                  {errors.screenshot.message}
                </span>
              )}
              <div className="text-xs text-gray-600 mt-1">
                Accepted formats: JPG, PNG, PDF (Max 5MB)
              </div>
              {fileName && (
                <div className="text-xs text-[#3b90a0] font-semibold mt-2">Selected: {fileName}</div>
              )}
            </div> */}

            {/* Priority Level */}
                 <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Priority Level <span className="text-red-500">*</span>
              </label>
              <Controller
                name="priority"
                control={control}
                render={({ field }) => (
                  <div className="flex gap-6 flex-wrap">
                    {[
                      { value: 'low', label: 'Low', color: 'bg-green-50 border-green-200 text-green-700' },
                      { value: 'medium', label: 'Medium', color: 'bg-yellow-50 border-yellow-200 text-yellow-700' },
                      { value: 'high', label: 'High', color: 'bg-red-50 border-red-200 text-red-700' }
                    ].map((level) => (
                      <label
                        key={level.value}
                        className={`flex items-center gap-3 px-5 py-3 rounded-xl border-2 cursor-pointer transition-all ${
                          field.value === level.value
                            ? `${level.color} border-2 shadow-md`
                            : 'bg-white border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <input
                          {...field}
                          type="radio"
                          value={level.value}
                          checked={field.value === level.value}
                          className="w-4 h-4 cursor-pointer accent-[#47AAB3]"
                        />
                        <span className={`text-sm font-medium ${
                          field.value === level.value ? '' : 'text-gray-700'
                        }`}>
                          {level.label}
                        </span>
                      </label>
                    ))}
                  </div>
                )}
              />
              {errors.priority && (
                <p className="text-red-500 text-xs mt-1">{errors.priority.message}</p>
              )}
              <p className="text-xs text-gray-500">Helps our team triage and prioritize support requests</p>
            </div>
            {/* Response Method */}
            {/* <div className="mb-6">
              <label className="block text-sm font-semibold text-[#2a6d7a] mb-2">
                Preferred Response Method <span className="text-red-500">*</span>
              </label>
              <Controller
                name="responseMethod"
                control={control}
                render={({ field }) => (
                  <select
                    {...field}
                    className={`w-full px-4 py-3 border-2 rounded-lg text-sm transition-all outline-none appearance-none bg-white cursor-pointer focus:ring-2 focus:ring-[#3b90a0] focus:ring-opacity-20 ${
                      errors.responseMethod ? 'border-red-500' : 'border-gray-300 focus:border-[#3b90a0]'
                    }`}
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%233b90a0' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'right 15px center',
                      paddingRight: '40px',
                    }}
                  >
                    <option value="">Select response method</option>
                    <option value="email">Email</option>
                    <option value="inapp">In-app Notification</option>
                  </select>
                )}
              />
              {errors.responseMethod && (
                <span className="block text-red-500 text-xs mt-1 font-medium">
                  {errors.responseMethod.message}
                </span>
              )}
            </div> */}

            {/* Submit Button */}
            <button
              type="button"
              onClick={handleSubmit(onSubmit)}
              disabled={isPending}
              className="w-full py-4 bg-gradient-to-r from-[#3b90a0] to-[#2a7080] text-white rounded-lg text-base font-semibold cursor-pointer transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
            >
              {isPending ? 'Submitting...' : 'Submit Report'}
            </button>

            {/* Confirmation Message */}
            {isSuccess && (
              <div className="mt-5 bg-green-100 border-2 border-[#3b90a0] text-green-800 p-5 rounded-lg text-center animate-fade-in">
                <strong className="text-base">✓ Report Submitted Successfully!</strong>
                <p className="text-sm mt-2">
                  Thank you for reporting this issue. Our support team will review your
                  submission and get back to you shortly via your preferred contact method.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}