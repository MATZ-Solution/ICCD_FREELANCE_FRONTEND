import { useForm, Controller, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Select from "react-select";
import RichTextEditor from "../../component/client_dashboard/text_editor";
import bannerimg from "../../assets/client_dashboard/bannerimg.png";
import backgroundd from "../../assets/client_dashboard/Group.png";
import { useAddproject, useEditProjects, useGetProjectsById } from "../../../api/client/project";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ICCDError from '../../component/ICCDError';
import Button from "../../component/button";
import { categoryData } from "../../../data/categoryData";
import { Upload, X } from "lucide-react";

// Validation Schema
const schema = yup.object({
  title: yup.string().required("Project title is required").max(80),
  category: yup.string().required("Category is required"),
  subCategory: yup.string().required("Subcategory is required"),
  skills: yup.array().of(yup.string()).min(1, "At least one skill is required"),
  description: yup.string().required("Project description is required").max(2000),
  deliverable: yup.string().required("Deliverables are required").max(1500),
  budget: yup.string().required("Budget is required").test(
    "is-valid-budget-range",
    "Enter a valid budget range like 500 - 1000",
    (value) => {
      if (!value) return false;
      const match = value.match(/^\s*([\d,]+)\s*-\s*([\d,]+)\s*$/);
      if (!match) return false;
      const min = parseInt(match[1].replace(/,/g, ""), 10);
      const max = parseInt(match[2].replace(/,/g, ""), 10);
      return !isNaN(min) && !isNaN(max) && min < max && max - min >= 100;
    }
  ),
  // currency: yup.string().required("Currency is required"),
  duration: yup.string().required("Project duration is required"),
  deadline: yup.date().required("Deadline is required").nullable(),
  freelancerType: yup.string().required("Freelancer type is required"),
  experienceLevel: yup.string().required("Experience level is required"),
  // locationPreference: yup.string().required("Location preference is required"),
  attachments: yup.array(),
  termsAcknowledged: yup.boolean().oneOf([true], "You must accept the terms"),
});

const currencyOptions = [
  { value: "USD", label: "USD ($)" },
  { value: "EUR", label: "EUR (€)" },
  { value: "GBP", label: "GBP (£)" },
  { value: "PKR", label: "PKR (₨)" },
  { value: "AED", label: "AED (د.إ)" },
  { value: "SAR", label: "SAR (﷼)" }
];

const durationOptions = [
  { value: "2 weeks", label: "2 weeks" },
  { value: "1 month", label: "1 month" },
  { value: "2-3 months", label: "2-3 months" },
  { value: "3-6 months", label: "3-6 months" },
  { value: "6+ months", label: "6+ months" }
];

const experienceLevelOptions = [
  { value: "Beginner", label: "Beginner" },
  { value: "Intermediate", label: "Intermediate" },
  { value: "Expert", label: "Expert" }
];

const freelancerTypeOptions = [
  { value: "Individual", label: "Individual Freelancer" },
  { value: "Agency", label: "Agency / Team" }
];

const locationOptions = [
  { value: "Global", label: "Global" },
  { value: "OIC Countries", label: "OIC Countries" },
  { value: "Pakistan", label: "Pakistan" },
  { value: "Saudi Arabia", label: "Saudi Arabia" },
  { value: "UAE", label: "United Arab Emirates" },
  { value: "Turkey", label: "Turkey" },
  { value: "Egypt", label: "Egypt" },
  { value: "Malaysia", label: "Malaysia" },
  { value: "Indonesia", label: "Indonesia" },
  { value: "Other", label: "Other (Specify in details)" }
];

const ProjectForm = () => {
  const pathName = useLocation().pathname;
  const { id } = useParams();
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      title: "",
      category: "",
      subCategory: "",
      skills: [],
      description: "",
      deliverable: "",
      budget: "",
      // currency: "USD",
      duration: "",
      deadline: null,
      freelancerType: "",
      experienceLevel: "",
      // locationPreference: "",
      attachments: [],
      termsAcknowledged: false
    },
  });

  const { addProject, isSuccess, isPending, isError, error } = useAddproject();
  const { editProject } = useEditProjects(id);
  const { data: getProData } = useGetProjectsById(id);

  const selectedCategory = useWatch({
    control,
    name: "category",
  });

  const selectedSubCategory = useWatch({
    control,
    name: "subCategory",
  });

  const categoryOptions = categoryData ? categoryData.map((item) => ({
    value: item.category,
    label: item.category
  })) : [];

  const subCategoryOptions = selectedCategory
    ? categoryData.find(item => item.category === selectedCategory)?.subcategories.map((item) => ({
      value: item.subcategory,
      label: item.subcategory
    })) || []
    : [];

  const skillsOptions = selectedSubCategory
    ? categoryData
      ?.find(item => item.category === selectedCategory)
      ?.subcategories
      ?.find(sub => sub.subcategory === selectedSubCategory)
      ?.skills
      ?.map(skill => ({
        value: skill,
        label: skill,
      })) || []
    : [];

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files || []);
    const maxSize = 5 * 1024 * 1024;

    const validFiles = files.filter(file => {
      if (file.size > maxSize) {
        alert(`${file.name} is too large. Maximum size is 5MB.`);
        return false;
      }
      return true;
    });

    setUploadedFiles([...uploadedFiles, ...validFiles.map(f => ({
      file: f,
      name: f.name,
      size: (f.size / 1024 / 1024).toFixed(2),
      id: Math.random()
    }))]);
  };

  const removeFile = (id) => {
    setUploadedFiles(uploadedFiles.filter(f => f.id !== id));
  };

  const onSubmit = (data) => {
    const formData = new FormData();

    if (uploadedFiles && uploadedFiles.length > 0) {
      uploadedFiles?.forEach((img) => {
        if (img.file) formData.append("files", img.file);
      });
    }

    for (const key in data) {
      if (Array.isArray(data[key])) {
        formData.append(key, JSON.stringify(data[key]));
      }
      else if (typeof data[key] === "object") {
        formData.append(key, JSON.stringify(data[key]));
      }
      else {
        formData.append(key, data[key])
      }
    }
    if (pathName.includes('edit-project')) {
      editProject(formData);
    } else {
      addProject(formData);
    }

    if (isSuccess) {
      setSubmitSuccess(true);
      setTimeout(() => {
        reset();
        setUploadedFiles([]);
        setSubmitSuccess(false);
      }, 2000);
    }
  };

  useEffect(() => {
    if (pathName.includes('edit-project') && getProData && getProData?.length > 0) {
      reset({
        title: getProData[0]?.title || '',
        category: getProData[0]?.category || '',
        subCategory: getProData[0]?.subCategory || "",
        description: getProData[0]?.description || "",
        deliverable: getProData[0]?.deliverable || "",
        budget: getProData[0]?.budget || "",
        currency: getProData[0]?.currency || "USD",
        deadline: getProData[0]?.deadline || null,
        duration: getProData[0]?.duration || "",
        skills: getProData[0]?.skills?.split(',') || [],
        freelancerType: getProData[0]?.freelancerType || "",
        experienceLevel: getProData[0]?.experienceLevel || "",
        locationPreference: getProData[0]?.locationPreference || "",
        termsAcknowledged: false,
      });
    }
  }, [getProData, reset, pathName]);

  // if (isError) {
  //   return <ICCDError message={error?.message || "An error occurred"} />;
  // }

  return (
    <div
      className="bg-fixed bg-cover bg-center min-h-screen"
      style={{ backgroundImage: `url(${backgroundd})` }}
    >
      {/* Banner Section */}
      <div className="max-w-5xl mx-auto px-6 py-8 space-y-8 bg-[#44A4AD] rounded-lg md:px-16 text-white flex flex-col md:flex-row items-center justify-between shadow-lg">
        <div className="md:w-1/2">
          <h2 className="text-3xl font-semibold mb-2">Project Management</h2>
          <p>Choose a freelancer's personal and instantly generate work.</p>
        </div>
        <img src={bannerimg} alt="Banner" className="w-96 h-auto" />
      </div>

      {/* Success Message */}
      {submitSuccess && (
        <div className="max-w-5xl mx-auto mt-6 px-6">
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg flex items-center gap-2">
            <span>✓</span> Project posted successfully!
          </div>
        </div>
      )}

      {/* Form Section */}
      <div className="max-w-5xl bg-white mx-auto px-6 py-8 space-y-8 my-8 rounded-lg shadow-lg">

        {/* Section 1: Basic Information */}
        <div>
          <h3 className="text-2xl font-bold text-gray-800 mb-6 pb-3 border-b-2 border-teal-500">
            Section 1: Basic Information
          </h3>

          {/* Project Title */}
          <Controller
            control={control}
            name="title"
            render={({ field }) => (
              <div className="mb-6">
                <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-2">
                  Project Title <span className="text-red-500">*</span>
                </label>
                <input
                  {...field}
                  id="title"
                  aria-label="Project Title"
                  placeholder="e.g., Website Development for Chamber of Commerce Portal"
                  className="w-full border border-gray-300 rounded px-4 py-2 mt-1 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
                {errors.title && (
                  <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
                )}
              </div>
            )}
          />

          {/* Category and Subcategory */}
          <div className="flex gap-4 flex-col md:flex-row">
            <div className="w-full md:w-1/2">
              <label htmlFor="category" className="block text-sm font-semibold text-gray-700 mb-2">
                Category <span className="text-red-500">*</span>
              </label>
              <Controller
                control={control}
                name="category"
                render={({ field: { onChange, value } }) => (
                  <Select
                    inputId="category"
                    placeholder="Select Category"
                    onChange={(selectedOption) => onChange(selectedOption?.value || "")}
                    options={categoryOptions}
                    value={categoryOptions.find((option) => option.value === value) || null}
                    className="mt-1"
                  />
                )}
              />
              {errors.category && (
                <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>
              )}
            </div>

            <div className="w-full md:w-1/2">
              <label htmlFor="subCategory" className="block text-sm font-semibold text-gray-700 mb-2">
                Sub-Category <span className="text-red-500">*</span>
              </label>
              <Controller
                control={control}
                name="subCategory"
                render={({ field: { onChange, value } }) => (
                  <Select
                    inputId="subCategory"
                    onChange={(selectedOption) => onChange(selectedOption?.value || "")}
                    options={subCategoryOptions}
                    value={subCategoryOptions.find((option) => option.value === value) || null}
                    className="mt-1"
                    placeholder={selectedCategory ? "Select Sub-Category" : "Please select category first"}
                    isDisabled={!selectedCategory}
                  />
                )}
              />
              {errors.subCategory && (
                <p className="text-red-500 text-sm mt-1">{errors.subCategory.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* Section 2: Project Details */}
        <div>
          <h3 className="text-2xl font-bold text-gray-800 mb-6 pb-3 border-b-2 border-teal-500">
            Section 2: Project Details
          </h3>

          {/* Project Description */}
          <Controller
            control={control}
            name="description"
            render={({ field: { value, onChange } }) => (
              <div className="mb-6">
                <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-2">
                  Project Description <span className="text-red-500">*</span>
                </label>
                <RichTextEditor
                  id="description"
                  placeholder="Provide a detailed description of your project objectives, scope, and requirements"
                  value={value}
                  onChange={onChange}
                />
                <p className="text-gray-500 text-xs mt-1">{value.length}/2000 characters</p>
                {errors.description && (
                  <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
                )}
              </div>
            )}
          />

          {/* Expected Deliverables */}
          <Controller
            control={control}
            name="deliverable"
            render={({ field: { value, onChange } }) => (
              <div className="mb-6">
                <label htmlFor="deliverable" className="block text-sm font-semibold text-gray-700 mb-2">
                  Expected Deliverables <span className="text-red-500">*</span>
                </label>
                <RichTextEditor
                  id="deliverable"
                  placeholder="e.g., Functional website, documentation, testing report, source code"
                  value={value}
                  onChange={onChange}
                />
                <p className="text-gray-500 text-xs mt-1">{value.length}/1500 characters</p>
                {errors.deliverable && (
                  <p className="text-red-500 text-sm mt-1">{errors.deliverable.message}</p>
                )}
              </div>
            )}
          />

          {/* Skills Required */}
          <div className="mb-6">
            <label htmlFor="skills" className="block text-sm font-semibold text-gray-700 mb-2">
              Skills Required <span className="text-red-500">*</span>
            </label>
            <Controller
              control={control}
              name="skills"
              render={({ field: { onChange, value } }) => (
                <div>
                  <Select
                    inputId="skills"
                    isMulti
                    onChange={(selectedOptions) =>
                      onChange(selectedOptions ? selectedOptions.map((option) => option.value) : [])
                    }
                    options={skillsOptions}
                    value={skillsOptions.filter((option) => value && value.includes(option.value)) || null}
                    className="mt-1"
                    placeholder={selectedSubCategory ? "Select Skills" : "Please select Sub-Category first"}
                    isDisabled={!selectedSubCategory}
                  />
                  {errors.skills && (
                    <p className="text-red-500 text-sm mt-1">{errors.skills.message}</p>
                  )}
                </div>
              )}
            />
          </div>

          {/* Budget, Currency and Duration */}
          {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6"> */}
          {/* <div className="md:col-span-2"> */}
          <div className="mb-6">
            <Controller
              control={control}
              name="budget"
              render={({ field }) => (
                <div>
                  <label htmlFor="budget" className="block text-sm font-semibold text-gray-700 mb-2">
                    Estimated Budget <span className="text-red-500">*</span>
                  </label>
                  <input
                    {...field}
                    id="budget"
                    placeholder="e.g., 500 - 1000"
                    className="w-full border border-gray-300 rounded px-4 py-2 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    aria-label="Budget range"
                  />
                  <p className="text-gray-500 text-xs mt-1">Enter range like: 500 - 1000</p>
                  {errors.budget && (
                    <p className="text-red-500 text-sm mt-1">{errors.budget.message}</p>
                  )}
                </div>
              )}
            />
          </div>
          {/* </div> */}

          {/* <Controller
              control={control}
              name="currency"
              render={({ field: { onChange, value } }) => (
                <div>
                  <label htmlFor="currency" className="block text-sm font-semibold text-gray-700 mb-2">
                    Currency <span className="text-red-500">*</span>
                  </label>
                  <Select
                    inputId="currency"
                    placeholder="Currency"
                    onChange={(opt) => onChange(opt?.value || "")}
                    options={currencyOptions}
                    value={currencyOptions.find((o) => o.value === value) || null}
                    className="text-gray-700"
                  />
                  {errors.currency && (
                    <p className="text-red-500 text-sm mt-1">{errors.currency.message}</p>
                  )}
                </div>
              )}
            /> */}
          {/* </div> */}

          {/* Project Duration */}
          <Controller
            control={control}
            name="duration"
            render={({ field: { onChange, value } }) => (
              <div className="mb-6">
                <label htmlFor="duration" className="block text-sm font-semibold text-gray-700 mb-2">
                  Project Duration <span className="text-red-500">*</span>
                </label>
                <Select
                  inputId="duration"
                  placeholder="Select Duration"
                  onChange={(opt) => onChange(opt?.value || "")}
                  options={durationOptions}
                  value={durationOptions.find((o) => o.value === value) || null}
                  className="text-gray-700"
                />
                {errors.duration && (
                  <p className="text-red-500 text-sm mt-1">{errors.duration.message}</p>
                )}
              </div>
            )}
          />

          {/* Attachments */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Attachments <span className="text-gray-500">(Optional)</span>
            </label>
            <p className="text-gray-500 text-xs mb-3">Upload briefs, mockups, requirements, or project files. Max 5MB per file.</p>

            <label className="flex items-center justify-center w-full px-4 py-6 border-2 border-dashed border-teal-300 rounded-lg cursor-pointer hover:border-teal-500 hover:bg-teal-50 transition-colors">
              <div className="flex flex-col items-center">
                <Upload className="w-8 h-8 text-teal-600 mb-2" />
                <span className="text-sm font-medium text-teal-600">Click to upload or drag and drop</span>
              </div>
              <input
                type="file"
                multiple
                onChange={handleFileUpload}
                className="hidden"
                accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.jpg,.jpeg,.png,.gif,.zip"
              />
            </label>

            {uploadedFiles.length > 0 && (
              <div className="mt-4 space-y-2">
                <p className="text-sm font-medium text-gray-700">Uploaded Files:</p>
                {uploadedFiles.map((file) => (
                  <div key={file.id} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg border border-gray-200">
                    <span className="text-sm text-gray-700">
                      {file.name} <span className="text-gray-500">({file.size} MB)</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => removeFile(file.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Section 3: Additional Preferences */}
        <div>
          <h3 className="text-2xl font-bold text-gray-800 mb-6 pb-3 border-b-2 border-teal-500">
            Section 3: Additional Preferences
          </h3>

          {/* Freelancer Type */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Freelancer Type <span className="text-red-500">*</span>
            </label>
            <Controller
              control={control}
              name="freelancerType"
              render={({ field: { onChange, value } }) => (
                <div className="flex flex-col space-y-2">
                  {freelancerTypeOptions.map((option) => (
                    <label key={option.value} className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        value={option.value}
                        checked={value === option.value}
                        onChange={() => onChange(option.value)}
                        className="w-4 h-4 text-teal-600 border-gray-300"
                        aria-label={`Select ${option.label}`}
                      />
                      <span className="ml-3 text-gray-700">{option.label}</span>
                    </label>
                  ))}
                </div>
              )}
            />
            {errors.freelancerType && (
              <p className="text-red-500 text-sm mt-1">{errors.freelancerType.message}</p>
            )}
          </div>

          {/* Experience Level */}
          <div className="mb-6">
            <label htmlFor="experienceLevel" className="block text-sm font-semibold text-gray-700 mb-2">
              Experience Level <span className="text-red-500">*</span>
            </label>
            <Controller
              control={control}
              name="experienceLevel"
              render={({ field: { onChange, value } }) => (
                <Select
                  inputId="experienceLevel"
                  placeholder="Select Experience Level"
                  onChange={(opt) => onChange(opt?.value || "")}
                  options={experienceLevelOptions}
                  value={experienceLevelOptions.find((o) => o.value === value) || null}
                  className="text-gray-700"
                />
              )}
            />
            {errors.experienceLevel && (
              <p className="text-red-500 text-sm mt-1">{errors.experienceLevel.message}</p>
            )}
          </div>

          {/* Location Preference */}
          {/* <Controller
            control={control}
            name="locationPreference"
            render={({ field: { onChange, value } }) => (
              <div className="mb-6">
                <label htmlFor="locationPreference" className="block text-sm font-semibold text-gray-700 mb-2">
                  Location Preference <span className="text-red-500">*</span>
                </label>
                <Select
                  inputId="locationPreference"
                  placeholder="Select Location Preference"
                  onChange={(opt) => onChange(opt?.value || "")}
                  options={locationOptions}
                  value={locationOptions.find((o) => o.value === value) || null}
                  className="text-gray-700"
                />
                {errors.locationPreference && (
                  <p className="text-red-500 text-sm mt-1">{errors.locationPreference.message}</p>
                )}
              </div>
            )}
          /> */}

          {/* Deadline */}
          <Controller
            control={control}
            name="deadline"
            render={({ field: { onChange, value } }) => (
              <div className="mb-6">
                <label htmlFor="deadline" className="block text-sm font-semibold text-gray-700 mb-2">
                  Deadline <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  id="deadline"
                  value={value ? new Date(value).toISOString().split("T")[0] : ""}
                  onChange={(e) => onChange(e.target.value ? new Date(e.target.value).toISOString().slice(0, 19).replace('T', ' ') : null)}
                  className="w-full border border-gray-300 rounded px-4 py-2 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  aria-label="Project deadline"
                />
                {errors.deadline && (
                  <p className="text-red-500 text-sm mt-1">{errors.deadline.message}</p>
                )}
              </div>
            )}
          />
        </div>

        {/* Section 4: Terms & Conditions */}
        <div>
          <h3 className="text-2xl font-bold text-gray-800 mb-6 pb-3 border-b-2 border-teal-500">
            Section 4: Review and Submit
          </h3>

          <Controller
            control={control}
            name="termsAcknowledged"
            render={({ field: { onChange, value } }) => (
              <div>
                <label className="flex items-start cursor-pointer p-4 bg-blue-50 rounded-lg border border-blue-200 hover:border-blue-300 transition-colors">
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={() => onChange(!value)}
                    className="w-4 h-4 mt-1 text-teal-600 border-gray-300 rounded"
                    aria-label="Accept terms and conditions"
                  />
                  <span className="ml-3 text-gray-700">
                    I confirm that the project details are accurate and comply with ICCD Talent Gate's Terms of Service.
                  </span>
                </label>
                {errors.termsAcknowledged && (
                  <p className="text-red-500 text-sm mt-2">{errors.termsAcknowledged.message}</p>
                )}
              </div>
            )}
          />
        </div>

        {/* Submit Button */}
        <div className="flex gap-4 pt-6 border-t">
          <Button
            text={pathName.includes('edit-project') ? "Update Project" : "Post Project"}
            onClick={handleSubmit(onSubmit)}
            isLoading={isPending || isSubmitting}
            className="w-full px-5 py-2 rounded"
          />
        </div>
      </div>
    </div>
  );
};

export default ProjectForm;
