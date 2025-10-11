import { useForm, Controller, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import hirefast from "../../assets/client_dashboard/hirefast.png";
import backgroundd from "../../assets/client_dashboard/Group.png";
import Select from "react-select";
import RichTextEditor from "./text_editor";
import { useAddJob, useEditJobs, useGetJobById } from "../../../api/client/job";
import { useLocation, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { memo } from 'react';
import ICCDLoader from "../loader";
import Button from "../button";
import { countryData } from "../../../data/citiesData";

// Validation schema
const schema = yup.object({
  jobTitle: yup.string().required("Job title is required"),
  country: yup.string().required("Location is required"),
  city: yup.string().required("City is required"),
  jobType: yup.string().required("Job type is required"),
  minSalaray: yup
    .number()
    .typeError("Must be a number")
    .positive("Must be positive")
    .required("Minimum salary is required"),
  maxSalaray: yup
    .number()
    .typeError("Must be a number")
    .positive("Must be positive")
    .required("Maximum salary is required")
    .moreThan(yup.ref("minSalaray"), "Maximum salary must be greater than minimum"),
  payType: yup.string().required("Pay type is required"),
  jobDescription: yup.string().required("Job description is required"),
  totalPersontoHire: yup
    .number()
    .typeError("Number of people must be a number")
    .min(1, "At least 1 person must be hired")
    .required("Number of people is required"),
});

const payTypeOptions = [
  { value: "Hourly", label: "Hourly" },
  { value: "Salary", label: "Salary" },
  { value: "Commission", label: "Commission" },
  { value: "Monthly", label: "Monthly" },
];

const locationOptions = countryData.data.map(item => ({
  value: item.country,
  label: item.country
}));


function JobForm() {
  const { id } = useParams()
  const navigate = useNavigate();
  const pathName = useLocation().pathname
  const { addjob, isSuccess, isPending, isError, error } = useAddJob()
  const { data, isSuccess: getJobIsSucc, isPending: getJobIsPend, isError: getJobIsErr, isLoading: getJobIsLoad } = useGetJobById(id)
  const { editJob, isSuccess: editJobIsSucc, isPending: editJobIsPend, isError: editJobIsErr, error: editJobErr } = useEditJobs(id)

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      jobTitle: "",
      country: "",
      city: "",
      jobType: "",
      payType: "",
      minSalaray: 0,
      maxSalaray: 0,
      jobDescription: "",
      totalPersontoHire: 1,
    },
  });

  const selectedCountry = useWatch({
    control,
    name: "country",
  });

  const findCity = selectedCountry ?
    countryData.data.find(item => item.country === selectedCountry)
    : []

  const citiesoption = findCity.cities ? findCity.cities.map(item => ({
    value: item,
    label: item
  })) : [];

  const onSubmit = (data) => {
    if (pathName.includes('edit-job')) {
      editJob(data)
    } else {
      addjob(data)

    }
    navigate('/client/jobs')

  };

  useEffect(() => {
    if (data && data?.length > 0) {
      reset({
        jobTitle: data[0]?.jobTitle || '',
        country: data[0]?.country || '',
        city: data[0]?.city || '',
        jobType: data[0]?.jobType || "",
        payType: data[0]?.payType || "",
        minSalaray: data[0]?.minSalaray || 0,
        maxSalaray: data[0]?.maxSalaray || 0,
        jobDescription: data[0]?.jobDescription || "",
        totalPersontoHire: data[0]?.totalPersontoHire || 1

      });
    }
  }, [data, reset]);

  if (getJobIsLoad) return <ICCDLoader />;

  if (getJobIsLoad) {
    return <ICCDLoader />;
  }

  if (getJobIsErr || editJobIsErr || isError) {
    const combinedError = error || getJobIsErr || editJobErr;
    console.error("Error: ", combinedError);
    return <ICCDError error={combinedError} />;
  }
  return (
    <div
      className="min-h-screen bg-fixed bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundd})` }}
    >
      <div className="max-w-[850px] rounded-xl mx-auto p-12 bg-white">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <p className="text-2xl">Let's make your next</p>
            <h1 className="text-5xl font-bold text-[#043A53] mb-4">
              great hire. Fast.
            </h1>
            <p className="text-gray-600 text-lg">
              Finding the best fit for the job shouldn’t be a full Time job.
              ICCD’s simple and powerful tools let you source, screen, and hire
              faster.
            </p>
          </div>
          <div className="relative overflow-hidden">
            <img src={hirefast} alt="Hire Fast" className="w-full" />
          </div>
        </div>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-4xl mx-auto px-6 py-8 space-y-8"
      >
        {/* Section 2 - Job Basics */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold flex items-center space-x-3">
              <span className="w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                2
              </span>
              <span>Add job basics</span>
            </h2>
            <p className="text-gray-600 mt-4">
              We share one job title with the employer to introduce you as a candidate.
            </p>
          </div>
          <div className="p-6 space-y-4">
            {/* Job Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Job Title
              </label>
              <Controller
                name="jobTitle"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    placeholder="Job Title"
                    className={`w-full px-3 py-2 border rounded-md focus:ring-2 ${errors.jobTitle ? "border-red-500" : "border-gray-300"}`}
                  />
                )}
              />
              {errors.jobTitle && (
                <p className="text-red-500 text-sm mt-1">{errors.jobTitle.message}</p>
              )}
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Country
              </label>
              <Controller
                name="country"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={locationOptions}
                    value={locationOptions.find(opt => opt.value === field.value) || null}
                    onChange={(selected) => field.onChange(selected?.value)}
                    placeholder="Select a location"
                  />
                )}
              />
              {errors.country && (
                <p className="text-red-500 text-sm mt-1">{errors.country.message}</p>
              )}
            </div>

            {/* Cities */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                City
              </label>
              <Controller
                name="city"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={citiesoption}
                    value={citiesoption.find(opt => opt.value === field.value) || null}
                    onChange={(selected) => field.onChange(selected?.value)}
                    placeholder={
                      selectedCountry
                        ? "Select a city"
                        : "Please select a country first"
                    }
                    isDisabled={!selectedCountry}
                  />
                )}
              />
              {errors.city && (
                <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* Section 3 - Job Type */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold flex items-center space-x-3">
              <span className="w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                3
              </span>
              <span>Add job details</span>
            </h2>
          </div>
          <div className="p-6 space-y-4">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Job type
            </label>
            <Controller
              name="jobType"
              control={control}
              render={({ field }) => (
                <div className="flex flex-wrap gap-4">
                  {["Full Time", "Part Time", "Contract", "Internship"].map((type) => (
                    <label key={type} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        value={type}
                        checked={field.value === type}
                        onChange={() => field.onChange(type)}
                        className="w-4 h-4"
                      />
                      <span className="text-sm">{type}</span>
                    </label>
                  ))}
                </div>
              )}
            />
            {errors.jobType && (
              <p className="text-red-500 text-sm mt-1">{errors.jobType.message}</p>
            )}
          </div>
        </div>

        {/* Section 4 - Pay and Salary */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold flex items-center space-x-3">
              <span className="w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                4
              </span>
              <span>Add pay and benefits</span>
            </h2>
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Pay Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Pay Type
              </label>
              <Controller
                name="payType"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={payTypeOptions}
                    value={payTypeOptions.find(opt => opt.value === field.value) || null}
                    onChange={(selected) => field.onChange(selected?.value)}
                    placeholder="Select pay type"
                  />
                )}
              />
              {errors.payType && (
                <p className="text-red-500 text-sm mt-1">{errors.payType.message}</p>
              )}
            </div>

            {/* Min Salary */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Minimum (In Dollars $)
              </label>
              <Controller
                name="minSalaray"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="number"
                    placeholder="Rs"
                    onChange={(e) => field.onChange(Number(e.target.value))}
                    className={`w-full px-3 py-2 border rounded-md focus:ring-2 ${errors.minSalaray ? "border-red-500" : "border-gray-300"}`}
                  />
                )}
              />
              {errors.minSalaray && (
                <p className="text-red-500 text-sm mt-1">{errors.minSalaray.message}</p>
              )}
            </div>

            {/* Max Salary */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Maximum (In Dollars $)
              </label>
              <Controller
                name="maxSalaray"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="number"
                    placeholder="Rs"
                    onChange={(e) => field.onChange(Number(e.target.value))}
                    className={`w-full px-3 py-2 border rounded-md focus:ring-2 ${errors.maxSalaray ? "border-red-500" : "border-gray-300"}`}
                  />
                )}
              />
              {errors.maxSalaray && (
                <p className="text-red-500 text-sm mt-1">{errors.maxSalaray.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* Section 5 - Description */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold flex items-center space-x-3">
              <span className="w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                5
              </span>
              <span>Describe the job</span>
            </h2>
          </div>
          <div className="p-6">
            <Controller
              name="jobDescription"
              control={control}
              render={({ field }) => (
                <RichTextEditor
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Write job description here..."
                />
              )}
            />
            {errors.jobDescription && (
              <p className="text-red-500 text-sm">{errors.jobDescription.message}</p>
            )}
          </div>
        </div>

        {/* Section 6 - Hiring Plan */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold flex items-center space-x-3">
              <span className="w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                6
              </span>
              <span>Hiring plan</span>
            </h2>
          </div>
          <div className="p-6">
            <label className="block text-sm text-gray-700 mb-1">
              Number of people to hire in the next 30 days *
            </label>
            <Controller
              name="totalPersontoHire"
              control={control}
              render={({ field }) => {
                const value = typeof field.value === "number" ? field.value : 1;
                return (
                  <div className="inline-flex items-center border border-gray-300 rounded-md overflow-hidden">
                    <div className="px-4 py-2 text-gray-700">
                      {value} {value === 1 ? "person" : "people"}
                    </div>
                    <div className="flex items-center divide-x divide-gray-300">
                      <button
                        type="button"
                        onClick={() => field.onChange(value + 1)}
                        className="px-3 py-2 text-gray-600 hover:bg-gray-100"
                      >
                        +
                      </button>
                      <button
                        type="button"
                        onClick={() => field.onChange(Math.max(1, value - 1))}
                        className="px-3 py-2 text-gray-600 hover:bg-gray-100"
                      >
                        -
                      </button>
                    </div>
                  </div>
                );
              }}
            />
            {errors.totalPersontoHire && (
              <p className="text-red-500 text-sm mt-1">
                {errors.totalPersontoHire.message}
              </p>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <Button
            text="Submit"
            type="submit"
            className="w-full px-5 py-3"
            isLoading={isPending}
          />

        </div>
      </form>
    </div>
  );
}
export default memo(JobForm);
