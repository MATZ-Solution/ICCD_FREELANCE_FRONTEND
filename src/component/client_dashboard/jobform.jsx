
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Briefcase } from "lucide-react";
import hirefast from "../../assets/client_dashboard/hirefast.png";
import backgroundd from "../../assets/client_dashboard/Group.png";
import { useState } from "react";

const schema = yup.object({
  companyName: yup.string().required("Company name is required"),
  fullname: yup.string().required("Name is required"),
  howdidyouhear: yup.string().required("How did you hear about us is required"),
  phonenumber: yup
    .string()
    .matches(/^\d{11}$/, "Phone number must be exactly 11 digits")
    .required("Phone number is required"),
  jobPost: yup.string().required("Job post is required"),
  jobTitle: yup.string().required("Job title is required"),
  location: yup.string().required("Location is required"),
  jobType: yup.string().required("Job type is required"),
  fixedhours: yup
    .number()
    .typeError("Must be a number")
    .positive("Must be positive")
    .required("Fixed hours is required"),
  hoursperweek: yup
    .number()
    .typeError("Must be a number")
    .positive("Must be positive")
    .required("Hours per week is required"),
  rate: yup.string().required("Rate is required"),
  salaryMin: yup
    .number()
    .typeError("Must be a number")
    .positive("Must be positive")
    .required("Minimum salary is required"),
  salaryMax: yup
    .number()
    .typeError("Must be a number")
    .positive("Must be positive")
    .required("Maximum salary is required")
    .moreThan(yup.ref("salaryMin"), "Maximum salary must be greater than minimum"),
  payType: yup.string().required("Pay type is required"),
  jobDescription: yup
    .string()
    // .min(50, "Description must be at least 50 characters")
    .required("Job description is required"),
  dailyUpdateEmail: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  Individualemail: yup.boolean().default(false),
  preferences: yup.object({
    resumeRequired: yup.boolean().default(false),
    allowEmailContact: yup.boolean().default(false),
  }),
  applicationDeadline: yup
    .string()
    .oneOf(["yes", "no"], "Please select a valid option")
    .required("Please select application deadline"),
  hiringTimeline: yup.string().required("Hiring timeline is required"),
  peopleToHire: yup
    .number()
    .typeError("Number of people must be a number")
    .min(1, "At least 1 person must be hired")
    .required("Number of people is required"),
});

export default function JobForm() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      companyName: "",
      fullname: "",
      howdidyouhear: "",
      phonenumber: "",
      jobTitle: "",
      jobPost: "",
      location: "",
      jobType: "",
      fixedhours: 0,
      hoursperweek: 0,
      rate: "",
      payType: "",
      salaryMin: 0,
      salaryMax: 0,
      jobDescription: "",
      dailyUpdateEmail: "",
      Individualemail: false,
      preferences: {
        resumeRequired: false,
        allowEmailContact: false,
      },
      applicationDeadline: "no",
      hiringTimeline: "",
      peopleToHire: 1,
    },
  });

  let [images, setImages] = useState([])
  const handleImage = (e) => {
    const files = Array.from(e.target.files);
    setImages((prev) => [...prev, ...files]);
  };
  const handleDeleteImage = (indexToDelete) => {
    setImages((prevImages) => prevImages.filter((_, index) => index !== indexToDelete));
  };
  console.log("images: ", images)
  // setImages([...images, cameraResult.assets[0].uri]);

  const onSubmit = (data) => {
    console.log("data: ", data)

  };

  // Predefined job post options for English-language jobs in Pakistan
  const jobPostOptions = [
    "Software Engineer",
    "Data Analyst",
    "Project Manager",
    "Graphic Designer",
    "Marketing Specialist",
    "Customer Support Representative",
    "Business Development Manager",
    "Content Writer",
    "Human Resources Manager",
    "Sales Executive",
  ];

  // Predefined location options for cities in Pakistan
  const locationOptions = [
    "Karachi",
    "Lahore",
    "Islamabad",
    "Rawalpindi",
    "Faisalabad",
    "Peshawar",
    "Quetta",
    "Multan",
    "Hyderabad",
    "Sialkot",
  ];

  // Predefined fixed hours options
  const fixedHoursOptions = [10, 20, 30, 40, 50, 60, 70, 80];

  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundd})` }}
    >

      {/* <div className="p-4">
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleImage}
        />

        <div className="mt-4 flex gap-4 flex-wrap">
          {images.map((img, index) => (
            <img
              key={index}
              src={URL.createObjectURL(img)}
              alt={`Preview ${index}`}
              className="w-32 h-32 object-cover rounded"
            />
          ))}

        </div>
      </div> */}

      {/* Hero Section */}
      <div className="max-w-4xl rounded-xl mx-auto p-12 bg-white">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <p className="text-2xl">Let's make your next</p>
            <h1 className="text-5xl font-bold text-[#043A53] mb-4">
              great hire. Fast.
            </h1>
            <p className="text-gray-600 text-lg">
              Finding the best fit for the job shouldn’t be a full-time job.
              ICCD’s simple and powerful tools let you source, screen, and hire
              faster.
            </p>
          </div>
          <div className="   relative overflow-hidden">
            <img src={hirefast} alt="Hire Fast" className="w-full" />
          </div>
        </div>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-4xl mx-auto px-6 py-8 space-y-8"
      >
        {[
          {
            number: "1",
            title: "Create an employer account",
            p: "We share one job title with the employer to introduce you as a candidate.",
            content: (
              <>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="companyName"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Company name
                    </label>
                    <Controller
                      name="companyName"
                      control={control}
                      render={({ field }) => (
                        <input
                          {...field}
                          id="companyName"
                          type="text"
                          placeholder="Enter company name"
                          className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 ${errors.companyName
                            ? "border-red-500"
                            : "border-gray-300"
                            }`}
                        />
                      )}
                    />
                    {errors.companyName && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.companyName.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="fullname"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      First name and last name *
                    </label>
                    <Controller
                      name="fullname"
                      control={control}
                      render={({ field }) => (
                        <input
                          {...field}
                          id="fullname"
                          type="text"
                          placeholder="First name and last name"
                          className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 ${errors.fullname ? "border-red-500" : "border-gray-300"
                            }`}
                        />
                      )}
                    />
                    {errors.fullname && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.fullname.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="howdidyouhear"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      How did you hear about us
                    </label>
                    <Controller
                      name="howdidyouhear"
                      control={control}
                      render={({ field }) => (
                        <input
                          {...field}
                          id="howdidyouhear"
                          type="text"
                          placeholder="How did you hear about us?"
                          className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 ${errors.howdidyouhear
                            ? "border-red-500"
                            : "border-gray-300"
                            }`}
                        />
                      )}
                    />
                    {errors.howdidyouhear && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.howdidyouhear.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="phonenumber"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Phone Number
                    </label>
                    <Controller
                      name="phonenumber"
                      control={control}
                      render={({ field }) => (
                        <input
                          {...field}
                          id="phonenumber"
                          type="tel"
                          placeholder="Phone number"
                          className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 ${errors.phonenumber
                            ? "border-red-500"
                            : "border-gray-300"
                            }`}
                        />
                      )}
                    />
                    {errors.phonenumber && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.phonenumber.message}
                      </p>
                    )}
                  </div>
                </div>
              </>
            ),
          },
          {
            number: "2",
            title: "Add job basics",
            p: "We share one job title with the employer to introduce you as a candidate.",
            content: (
              <div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="jobPost"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Job Post
                    </label>
                    <Controller
                      name="jobPost"
                      control={control}
                      render={({ field }) => (
                        <select
                          {...field}
                          id="jobPost"
                          className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 ${errors.jobPost ? "border-red-500" : "border-gray-300"
                            }`}
                        >
                          <option value="">Select a job post</option>
                          {jobPostOptions.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      )}
                    />
                    {errors.jobPost && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.jobPost.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="jobTitle"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Job Title
                    </label>
                    <Controller
                      name="jobTitle"
                      control={control}
                      render={({ field }) => (
                        <input
                          {...field}
                          id="jobTitle"
                          type="text"
                          placeholder="Job Title"
                          className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 ${errors.jobTitle ? "border-red-500" : "border-gray-300"
                            }`}
                        />
                      )}
                    />
                    {errors.jobTitle && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.jobTitle.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="w-full">
                  <label
                    htmlFor="location"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Location
                  </label>
                  <Controller
                    name="location"
                    control={control}
                    render={({ field }) => (
                      <select
                        {...field}
                        id="location"
                        className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 ${errors.location ? "border-red-500" : "border-gray-300"
                          }`}
                      >
                        <option value="">Select a location</option>
                        {locationOptions.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    )}
                  />
                  {errors.location && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.location.message}
                    </p>
                  )}
                </div>
              </div>
            ),
          },
          {
            number: "3",
            title: "Add job details",
            p: "We share one job title with the employer to introduce you as a candidate.",
            content: (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Job type
                  </label>
                  <Controller
                    name="jobType"
                    control={control}
                    render={({ field }) => (
                      <div className="flex flex-wrap gap-4">
                        {["Full-time", "Part-time", "Contract", "Internship"].map(
                          (type) => (
                            <label
                              key={type}
                              className="flex items-center space-x-2 cursor-pointer"
                            >
                              <input
                                type="radio"
                                value={type}
                                checked={field.value === type}
                                onChange={() => field.onChange(type)}
                                className="w-4 h-4 text-teal-600 border-gray-300 focus:ring-teal-500"
                              />
                              <span className="text-sm text-gray-700">{type}</span>
                            </label>
                          )
                        )}
                      </div>
                    )}
                  />
                  {errors.jobType && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.jobType.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Expected Hours
                  </label>
                  <div className="grid md:grid-cols-2  lg:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Show By
                      </label>
                      <Controller
                        name="fixedhours"
                        control={control}
                        render={({ field }) => (
                          <select
                            {...field}
                            id="fixedhours"
                            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 ${errors.fixedhours
                              ? "border-red-500"
                              : "border-gray-300"
                              }`}
                            onChange={(e) => field.onChange(Number(e.target.value))}
                          >
                            <option value="">Select fixed hours</option>
                            {fixedHoursOptions.map((option) => (
                              <option key={option} value={option}>
                                {option} hours
                              </option>
                            ))}
                          </select>
                        )}
                      />
                      {errors.fixedhours && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.fixedhours.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Fixed At
                      </label>
                      <Controller
                        name="hoursperweek"
                        control={control}
                        render={({ field }) => (
                          <input
                            {...field}
                            type="number"
                            placeholder="Hours per week"
                            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 ${errors.hoursperweek
                              ? "border-red-500"
                              : "border-gray-300"
                              }`}
                            onChange={(e) => field.onChange(Number(e.target.value))}
                          />
                        )}
                      />
                      {errors.hoursperweek && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.hoursperweek.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </>
            ),
          },
          {
            number: "4",
            title: "Add pay and benefits",
            p: "We share one job title with the employer to introduce you as a candidate.",
            content: (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Pay
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <label
                      htmlFor="payType"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Show Pay By
                    </label>
                    <Controller
                      name="payType"
                      control={control}
                      render={({ field }) => (
                        <select
                          {...field}
                          id="payType"
                          className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 ${errors.payType ? "border-red-500" : "border-gray-300"
                            }`}
                        >
                          <option value="">Select pay type</option>
                          <option value="hourly">Hourly</option>
                          <option value="salary">Salary</option>
                          <option value="commission">Commission</option>
                        </select>
                      )}
                    />
                    {errors.payType && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.payType.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="salaryMin"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Minimum
                    </label>
                    <Controller
                      name="salaryMin"
                      control={control}
                      render={({ field }) => (
                        <input
                          {...field}
                          type="number"
                          placeholder="Rs"
                          className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 ${errors.salaryMin ? "border-red-500" : "border-gray-300"
                            }`}
                          onChange={(e) => field.onChange(Number(e.target.value))}
                        />
                      )}
                    />
                    {errors.salaryMin && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.salaryMin.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="salaryMax"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Maximum
                    </label>
                    <Controller
                      name="salaryMax"
                      control={control}
                      render={({ field }) => (
                        <input
                          {...field}
                          type="number"
                          placeholder="Rs"
                          className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 ${errors.salaryMax ? "border-red-500" : "border-gray-300"
                            }`}
                          onChange={(e) => field.onChange(Number(e.target.value))}
                        />
                      )}
                    />
                    {errors.salaryMax && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.salaryMax.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="rate"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Rate
                    </label>
                    <Controller
                      name="rate"
                      control={control}
                      render={({ field }) => (
                        <select
                          {...field}
                          id="rate"
                          className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 ${errors.rate ? "border-red-500" : "border-gray-300"
                            }`}
                        >
                          <option value="">Select rate</option>
                          <option value="month">Per month</option>
                          <option value="week">Per week</option>
                          <option value="day">Per day</option>
                          <option value="year">Per year</option>
                        </select>
                      )}
                    />
                    {errors.rate && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.rate.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ),
          },
          {
            number: "5",
            title: "Describe the job",
            p: "We share one job title with the employer to introduce you as a candidate.",
            content: (
              <div>
                <label
                  htmlFor="jobDescription"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Job description *
                </label>
                <Controller
                  name="jobDescription"
                  control={control}
                  render={({ field }) => (
                    <textarea
                      {...field}
                      id="jobDescription"
                      rows={8}
                      placeholder="Describe the role, responsibilities, requirements, and what makes your company great..."
                      className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 resize-y ${errors.jobDescription
                        ? "border-red-500"
                        : "border-gray-300"
                        }`}
                    />
                  )}
                />
                {errors.jobDescription && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.jobDescription.message}
                  </p>
                )}
              </div>
            ),
          },
          {
            number: "6",
            title: "Set preferences",
            p: "We share one job title with the employer to introduce you as a candidate.",
            content: (
              <div className="space-y-6">
                <div className="space-y-3">
                  <h3 className="text-sm font-medium text-[#01AEAD]">
                    Communication preferences
                  </h3>
                  <label className="block text-sm font-medium text-gray-700">
                    Send daily updates to *
                  </label>
                  <Controller
                    name="dailyUpdateEmail"
                    control={control}
                    render={({ field }) => (
                      <>
                        <input
                          {...field}
                          type="email"
                          placeholder="Enter email"
                          className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 ${errors.dailyUpdateEmail
                            ? "border-red-500"
                            : "border-gray-300"
                            }`}
                        />
                        {errors.dailyUpdateEmail && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.dailyUpdateEmail.message}
                          </p>
                        )}
                      </>
                    )}
                  />
                  <Controller
                    name="Individualemail"
                    control={control}
                    render={({ field }) => (
                      <label className="flex items-center space-x-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={field.value}
                          onChange={(e) => field.onChange(e.target.checked)}
                          className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
                        />
                        <span className="text-sm text-gray-700">
                          Plus, send an individual email update each time someone
                          applies.
                        </span>
                      </label>
                    )}
                  />
                </div>
                <div className="space-y-3">
                  <h3 className="text-sm font-medium text-[#01AEAD]">
                    Application preferences
                  </h3>
                  <Controller
                    name="preferences.resumeRequired"
                    control={control}
                    render={({ field }) => (
                      <label className="flex items-center space-x-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={field.value}
                          onChange={(e) => field.onChange(e.target.checked)}
                          className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
                        />
                        <span className="text-sm text-gray-700">
                          Resume is required
                        </span>
                      </label>
                    )}
                  />
                  <Controller
                    name="preferences.allowEmailContact"
                    control={control}
                    render={({ field }) => (
                      <label className="flex items-center space-x-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={field.value}
                          onChange={(e) => field.onChange(e.target.checked)}
                          className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
                        />
                        <span className="text-sm text-gray-700">
                          Let potential candidates contact you about this job by
                          email to the address provided.
                        </span>
                      </label>
                    )}
                  />
                  <Controller
                    name="applicationDeadline"
                    control={control}
                    render={({ field }) => (
                      <div>
                        <label className="text-sm text-gray-700 block mb-1">
                          Is there an application deadline?
                        </label>
                        <div className="flex items-center space-x-6">
                          <label className="flex items-center space-x-2">
                            <input
                              type="radio"
                              value="no"
                              checked={field.value === "no"}
                              onChange={() => field.onChange("no")}
                              className="text-teal-600 focus:ring-teal-500"
                            />
                            <span className="text-sm text-gray-700">No</span>
                          </label>
                          <label className="flex items-center space-x-2">
                            <input
                              type="radio"
                              value="yes"
                              checked={field.value === "yes"}
                              onChange={() => field.onChange("yes")}
                              className="text-teal-600 focus:ring-teal-500"
                            />
                            <span className="text-sm text-gray-700">Yes</span>
                          </label>
                        </div>
                        {errors.applicationDeadline && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.applicationDeadline.message}
                          </p>
                        )}
                      </div>
                    )}
                  />
                </div>
                <div className="space-y-4">
                  <h3 className="text-sm font-medium text-[#01AEAD]">
                    Hiring details
                  </h3>
                  <label className="block text-sm text-gray-700">
                    Hiring timeline for this job *
                  </label>
                  <Controller
                    name="hiringTimeline"
                    control={control}
                    render={({ field }) => (
                      <>
                        <select
                          {...field}
                          className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 ${errors.hiringTimeline
                            ? "border-red-500"
                            : "border-gray-300"
                            }`}
                        >
                          <option value="">Select timeline</option>
                          <option value="1-3">1 to 3 days</option>
                          <option value="4-7">4 to 7 days</option>
                          <option value="7-14">1 to 2 weeks</option>
                          <option value="15-30">2 to 4 weeks</option>
                        </select>
                        {errors.hiringTimeline && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.hiringTimeline.message}
                          </p>
                        )}
                      </>
                    )}
                  />
                  <div>
                    <label className="block text-sm text-gray-700 mb-1">
                      Number of people to hire in the next 30 days *
                    </label>
                    <Controller
                      name="peopleToHire"
                      control={control}
                      render={({ field }) => {
                        const value =
                          typeof field.value === "number" ? field.value : 1;
                        return (
                          <>
                            <div className="inline-flex items-center border border-gray-300 rounded-md overflow-hidden">
                              <div className="px-4 py-2 text-gray-700">
                                {value} {value === 1 ? "person" : "people"}
                              </div>
                              <div className="flex items-center divide-x divide-gray-300 border border-gray-300 rounded overflow-hidden">
                                <div className="h-6 w-px bg-gray-300" />
                                <button
                                  type="button"
                                  onClick={() => field.onChange(value + 1)}
                                  className="px-3 py-2 text-gray-600 hover:bg-gray-100"
                                >
                                  +
                                </button>
                                <div className="h-6 w-px bg-gray-300" />
                                <button
                                  type="button"
                                  onClick={() =>
                                    field.onChange(Math.max(1, value - 1))
                                  }
                                  className="px-3 py-2 text-gray-600 hover:bg-gray-100"
                                >
                                  -
                                </button>
                              </div>
                            </div>
                            {errors.peopleToHire && (
                              <p className="text-red-500 text-sm mt-1">
                                {errors.peopleToHire.message}
                              </p>
                            )}
                          </>
                        );
                      }}
                    />
                  </div>
                </div>
              </div>
            ),
          },
        ].map((section) => (
          <div
            key={section.number}
            className="bg-white rounded-lg shadow-sm border border-gray-200"
          >
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold flex items-center space-x-3">
                <span className="w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {section.number}
                </span>
                <span>{section.title}</span>
              </h2>
              <p className="text-gray-600 mt-4 ">{section.p}</p>
            </div>
            <div className="p-6 space-y-4">{section.content}</div>
          </div>
        ))}
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-[#01AEAD] w-full hover:bg-teal-700 text-white font-semibold px-12 py-3 rounded-md shadow-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
          >
            Continue
          </button>
        </div>
      </form>
    </div>
  );
}