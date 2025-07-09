"use client"

import { useForm, Controller } from "react-hook-form"
import { useState } from "react"
import * as Yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { useNavigate } from "react-router-dom"

const validationSchema = Yup.object({
  firstName: Yup.string()
    .required("First name is required")
    .min(2, "First name must be at least 2 characters"),
  lastName: Yup.string()
    .required("Last name is required")
    .min(2, "Last name must be at least 2 characters"),
  displayName: Yup.string()
    .required("Display name is required")
    .min(3, "Display name must be at least 3 characters"),
  description: Yup.string()
    .required("Description is required")
    .min(50, "Description must be at least 50 characters")
    .max(500, "Description cannot exceed 500 characters"),
  profilePicture: Yup.mixed()
    .required("Profile picture is required")
    .test("fileSize", "File size must be less than 5MB", (value) =>
      value && value[0] && value[0].size <= 5 * 1024 * 1024
    )
    .test("fileType", "Only image files are allowed", (value) =>
      value && value[0] && ["image/jpeg", "image/png", "image/gif"].includes(value[0].type)
    ),
  languages: Yup.array()
    .min(1, "At least one language is required")
    .of(
      Yup.object({
        language: Yup.string().required(),
        level: Yup.string().required(),
      })
    ),
})

export default function PersonalInfoStep() {
  const [languages, setLanguages] = useState([])
  const [currentLanguage, setCurrentLanguage] = useState("")
  const [currentLevel, setCurrentLevel] = useState("")

  const navigate = useNavigate()

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      displayName: "",
      description: "",
      profilePicture: null,
      languages: [],
    },
  })

  const addLanguage = () => {
    if (currentLanguage && currentLevel) {
      const newLanguages = [...languages, { language: currentLanguage, level: currentLevel }]
      setLanguages(newLanguages)
      setValue("languages", newLanguages) // Update react-hook-form value for validation
      setCurrentLanguage("")
      setCurrentLevel("")
    }
  }

  const removeLanguage = (index) => {
    const newLanguages = languages.filter((_, i) => i !== index)
    setLanguages(newLanguages)
    setValue("languages", newLanguages) // Update react-hook-form value for validation
  }

  const onSubmit = (data) => {
    console.log({
      ...data,
      profilePicture: data.profilePicture ? data.profilePicture[0].name : null,
      languages,
    })
    alert("Form submitted! Check console for data.")
    navigate("/Professional-Info-Step")
  }

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
        step === 1
          ? "bg-[#01AEAD] text-white" // active green step 1
          : "border border-gray-300 bg-white text-gray-300" // inactive steps 2 & 3
      }`}
    >
      {step}
    </div>
    <span
      className={`${
        step === 1 ? "text-[#01AEAD]" : "text-gray-600"
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
              Completion Rate: 25%
            </div>
            <div className="h-2 w-full bg-gray-200 rounded overflow-hidden">
              <div className="h-full bg-[#01AEAD] rounded" style={{ width: "28%" }}></div>
            </div>
          </div>
        </div>
        <div className="bg-gray-300 my-6 h-px w-full"></div>
      </div>

      <div className="flex flex-col md:flex-row justify-between md:items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold mb-3">Personal Info</h2>
          <p className="text-gray-600 whitespace-pre-wrap mb-6">
            Tell us a bit about yourself. This information will appear on your public profile, so
            that potential buyers can get to know you better.
          </p>
        </div>
        <p className="text-[#01AEAD] text-lg italic font-semibold md:self-end">
          * Mandatory fields
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Full Name */}
        <div className="grid grid-cols-2 gap-8 items-start">
          <div>
            <label className="block font-semibold text-lg mb-2">
              Full Name * <span className="italic font-normal">Private</span>
            </label>
            <p className="text-sm text-gray-600">Ex: John Smith</p>
          </div>
          <div>
            <div className="flex gap-3">
              <Controller
                name="firstName"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    placeholder="First Name"
                    className="flex-1 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  />
                )}
              />
              <Controller
                name="lastName"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    placeholder="Last Name"
                    className="flex-1 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  />
                )}
              />
            </div>
            {(errors.firstName || errors.lastName) && (
              <p className="text-red-500 text-sm mt-2">
                {errors.firstName?.message || errors.lastName?.message}
              </p>
            )}
          </div>
        </div>

        {/* Display Name */}
        <div className="grid grid-cols-2 gap-8 items-start">
          <div>
            <label className="block font-semibold text-lg mb-2">Display Name *</label>
            <p className="text-sm text-gray-600 mb-2">
              To help build credible and authentic connections with customers, how buyers see your
              display name.
            </p>
            <p className="text-sm text-gray-600">
              We suggest using your first name and first initial of last name.
            </p>
          </div>
          <div>
            <Controller
              name="displayName"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  placeholder="Type your display name"
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                />
              )}
            />
            {errors.displayName && (
              <p className="text-red-500 text-sm mt-2">{errors.displayName.message}</p>
            )}
          </div>
        </div>

        {/* Profile Picture */}
        <div className="grid grid-cols-2 gap-8 items-start">
          <div>
            <label className="block font-semibold text-lg mb-2">Profile Picture *</label>
            <p className="text-sm text-gray-600">
              Add a photo to build trust and connect with customers without exactly who they hire
              from the world's largest.
            </p>
          </div>
          <div>
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center text-2xl text-gray-400">
                👤
              </div>
              <Controller
                name="profilePicture"
                control={control}
                render={({ field: { onChange, name } }) => (
                  <input
                    name={name}
                    type="file"
                    accept="image/*"
                    onChange={(e) => onChange(e.target.files)}
                    className="text-sm file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-cyan-50 file:text-cyan-700 hover:file:bg-cyan-100"
                  />
                )}
              />
            </div>
            {errors.profilePicture && (
              <p className="text-red-500 text-sm mt-2">{errors.profilePicture.message}</p>
            )}
          </div>
        </div>

        {/* Description */}
        <div className="grid grid-cols-2 gap-8 items-start">
          <div>
            <label className="block font-semibold text-lg mb-2">Description *</label>
            <p className="text-sm text-gray-600">
              Share a bit about your work experience, cool projects you can worked, and your area of
              expertise.
            </p>
          </div>
          <div>
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <textarea
                  {...field}
                  placeholder="Share a bit about your work experience, cool projects you can worked, and your area of expertise."
                  rows={4}
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent resize-vertical"
                />
              )}
            />
            <p className="text-xs text-gray-600 mt-1">min. 50 characters</p>
            {errors.description && (
              <p className="text-red-500 text-sm mt-2">{errors.description.message}</p>
            )}
          </div>
        </div>

        {/* Languages */}
        <div className="grid grid-cols-2 gap-8 items-start">
          <div>
            <label className="block font-semibold text-lg mb-2">Languages *</label>
            <p className="text-sm text-gray-600">Select your languages and proficiency levels.</p>
          </div>
          <div>
            <div className="flex gap-3 items-center mb-4">
              <select
                value={currentLanguage}
                onChange={(e) => setCurrentLanguage(e.target.value)}
                className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent min-w-[150px]"
              >
                <option value="">Language</option>
                <option value="english">English</option>
                <option value="spanish">Spanish</option>
                <option value="french">French</option>
                <option value="german">German</option>
              </select>
              <select
                value={currentLevel}
                onChange={(e) => setCurrentLevel(e.target.value)}
                className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent min-w-[150px]"
              >
                <option value="">Language Level</option>
                <option value="native">Native</option>
                <option value="fluent">Fluent</option>
                <option value="conversational">Conversational</option>
                <option value="basic">Basic</option>
              </select>
              <button
                type="button"
                onClick={addLanguage}
                className="px-4 py-3 bg-[#01AEAD] text-white rounded hover:bg-cyan-600 transition-colors"
              >
                Add
              </button>
            </div>

            {languages.length > 0 && (
              <div className="space-y-2">
                {languages.map((lang, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-gray-50 p-3 rounded"
                  >
                    <span className="capitalize">
                      {lang.language} - {lang.level}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeLanguage(index)}
                      className="text-red-500 hover:text-red-700 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}
            {errors.languages && (
              <p className="text-red-500 text-sm mt-2">{errors.languages.message}</p>
            )}
          </div>
        </div>

        <div className="pt-6">
          <button
            type="submit"
            className="px-8 py-3 bg-slate-800 text-white rounded-full hover:bg-slate-900 transition-colors"
          >
            Continue →
          </button>
        </div>
      </form>
    </div>
  )
}