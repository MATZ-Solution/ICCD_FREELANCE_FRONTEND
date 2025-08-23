import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Select from "react-select";
import RichTextEditor from "../../component/client_dashboard/text_editor";
import bannerimg from "../../assets/client_dashboard/bannerimg.png";
import backgroundd from "../../assets/client_dashboard/Group.png";
import { useAddproject, useEditProjects, useGetProjectsById } from "../../../api/client/project";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import ICCDError from '../../component/ICCDError';
import Button from "../../component/button";

const schema = yup.object({
  title: yup.string().required("Project title is required").max(80),
  category: yup.string().required("Category is required"),
  subCategory: yup.string().required("Subcategory is required"),
  skills: yup.array().of(yup.string()).min(1, "At least one skill is required"),
  description: yup.string().required("Project description is required").max(1000),
  overview: yup.string().required("Project overview is required").max(1000),
  deliverable: yup.string().required("Deliverable are required").max(1000),
  budget: yup
    .string()
    .required("Budget is required")
    .test(
      "is-valid-budget-range",
      "Enter a valid budget range like 5000 - 7000",
      (value) => {
        if (!value) return false;
        const match = value.match(/^\s*([\d,]+)\s*-\s*([\d,]+)\s*$/);
        if (!match) return false;
        const min = parseInt(match[1].replace(/,/g, ""), 10);
        const max = parseInt(match[2].replace(/,/g, ""), 10);
        return !isNaN(min) && !isNaN(max) && min < max && max - min >= 1000;
      }
    ),
  type: yup.string().required("Price Type is required"),
  language: yup.array().of(yup.string()).min(1, "At least one language is required"),
  freelancerType: yup.string().required("Freelancer Type is required"),
  deadline: yup.date().required("Deadline is required").nullable(),
  duration: yup.string().required("Hiring timeline is required"),
  total_freelancer: yup.number().min(1, "At least one freelancer is required").integer(),
  mode: yup.string().required("Mode is required"),
});


const categoryOptions = [
  { value: "Digital Marketing", label: "Digital Marketing" },
  { value: "Web", label: "Web Development" },
  { value: "Graphic", label: "Graphic Designing" },
  { value: "Figma", label: "Figma Design" },
];

const subCategoryOptions = [
  { value: "FullStack", label: "FullStack" },
  { value: "FrontEnd", label: "FrontEnd" },
  { value: "Backend", label: "Backend" },
  { value: "Design", label: "Design" },
  { value: "API", label: "API Integration" },
];

const skillsOptions = [
  { value: "React", label: "React" },
  { value: "Node.js", label: "Node.js" },
  { value: "Figma", label: "Figma" },
  { value: "Photoshop", label: "Photoshop" },
  { value: "SEO", label: "SEO" },
  { value: "Laravel", label: "Laravel" },
  { value: "Java", label: "Java" },
];

const languageOptions = [
  { value: "French", label: "French" },
  { value: "English", label: "English" },
  { value: "Urdu", label: "Urdu" },
  { value: "German", label: "German" },
  { value: "Turkish", label: "Turkish" },
];

const freelancerTypeOptions = [
  { value: "Digital Marketing", label: "Digital Marketing" },
  { value: "Web", label: "Web Development" },
  { value: "Graphic", label: "Graphic Designing" },
  { value: "Figma", label: "Figma Design" },
];

const timeLineOptions = [
  { value: "1 to 2 Month", label: "1 to 2 Month" },
  { value: "2 to 4 Month", label: "2 to 4 Month" },
  { value: "4 to 6 Month", label: "4 to 6 Month" },
  { value: "6 to 12 Month", label: "6 to 12 Month" },
];

const typeOptions = [
  { value: "FixedPrice", label: "Fixed Price" },
  { value: "Flexible", label: "Flexible" },
];

const modeOptions = ["Physical", "Remote", "Hybrid"];

const ProjectForm = () => {
  const pathName = useLocation().pathname
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      title: "",
      category: "",
      subCategory: "",
      skills: [],
      description: "",
      overview: "",
      deliverable: "",
      budget: "",
      deadline: null,
      duration: "",
      total_freelancer: 1,
      mode: "",
      type: "",
      language: [],
      freelancerType: "",
    },
  });

  const {id} = useParams()
  const { addProject, isSuccess, isPending, isError, error } = useAddproject();
  const { editProject} = useEditProjects(id)
  const {data: getProData} = useGetProjectsById(id)
  
  const onSubmit = (data) => {
    if (pathName.includes('edit-project')) {
      editProject(data)
    } else {
      addProject(data);
    }
  };

  // console.log("skills: ", getProData[0]?.skills.split(','))
  useEffect(() => {
    if (pathName.includes('edit-project') && getProData && getProData?.length > 0) {
      reset({
        title: getProData[0]?.title || '',
        category: getProData[0]?.category || '',
        subCategory: getProData[0]?.subCategory || "",
        description: getProData[0]?.description || "",
        overview: getProData[0]?.overview || "",
        deliverable: getProData[0]?.deliverable || "",
        budget: getProData[0]?.budget || "",
        deadline: getProData[0]?.deadline || null,
        duration: getProData[0]?.duration || "",
        skills: getProData[0]?.skills.split(',') || [],
        language: getProData[0]?.languages.split(',') || [],
        total_freelancer: getProData[0]?.total_freelancer || 1,
        mode: getProData[0]?.mode || "",
        type: getProData[0]?.type || "",
        freelancerType: getProData[0]?.freelancerType || "",
      });
    }
  }, [getProData, reset]);

  //  if (isError || error) {
  //     return  <ICCDError message={isError} />
  //   }

  return (
    <div
      className="bg-fixed bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundd})` }}
    >
      <div className="max-w-4xl mx-auto px-6 py-8 space-y-8 bg-[#14A800] rounded-lg md:px-16 text-white flex flex-col md:flex-row items-center justify-between shadow-lg">
        <div className="md:w-1/2">
          <h2 className="text-3xl font-semibold mb-2">Project Management</h2>
          <p>Choose a freelancer's personal and instantly generate work.</p>
        </div>
        <img src={bannerimg} alt="Banner" className="w-96 h-auto" />
      </div>

      <div className="max-w-4xl bg-white mx-auto px-6 py-8 space-y-6">
        <Controller
          control={control}
          name="title"
          render={({ field }) => (
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Project Title
              </label>
              <input
                {...field}
                id="title"
                aria-label="Project Title"
                className="w-full border rounded px-3 py-2 mt-1 focus:ring-teal-500 focus:border-teal-500"
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
              )}
            </div>
          )}
        />

        <div className="flex gap-4">
          <div className="w-1/2">
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">
              Category
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

          <div className="w-1/2">
            <label htmlFor="subCategory" className="block text-sm font-medium text-gray-700">
              Subcategory
            </label>
            <Controller
              control={control}
              name="subCategory"
              render={({ field: { onChange, value } }) => (
                <Select
                  inputId="subCategory"
                  placeholder="Select Subcategory"
                  onChange={(selectedOption) => onChange(selectedOption?.value || "")}
                  options={subCategoryOptions}
                  value={subCategoryOptions.find((option) => option.value === value) || null}
                  className="mt-1"
                />
              )}
            />
            {errors.subCategory && (
              <p className="text-red-500 text-sm mt-1">{errors.subCategory.message}</p>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="skills" className="block text-sm font-medium text-gray-700">
            Required Skills
          </label>
          <Controller
            control={control}
            name="skills"
            render={({ field: { onChange, value } }) => (
              <div>
                <Select
                  inputId="skills"
                  isMulti
                  placeholder="Select Required Skills"
                  onChange={(selectedOptions) =>
                    onChange(selectedOptions ? selectedOptions.map((option) => option.value) : [])
                  }
                  options={skillsOptions}
                  value={skillsOptions.filter((option) => value && value.includes(option.value))}
                  className="mt-1"
                />
                {errors.skills && (
                  <p className="text-red-500 text-sm mt-1">{errors.skills.message}</p>
                )}
              </div>
            )}
          />
        </div>

        <Controller
          control={control}
          name="description"
          render={({ field: { value, onChange } }) => (
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Project Description
              </label>
              <RichTextEditor
                id="description"
                placeholder="Provide a detailed description of your project."
                value={value}
                onChange={onChange}
              />
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
              )}
            </div>
          )}
        />

        <Controller
          control={control}
          name="overview"
          render={({ field: { value, onChange } }) => (
            <div>
              <label htmlFor="overview" className="block text-sm font-medium text-gray-700">
                Project Overview
              </label>
              <RichTextEditor
                id="overview"
                placeholder="Give a brief overview of your project"
                value={value}
                onChange={onChange}
              />
              {errors.overview && (
                <p className="text-red-500 text-sm mt-1">{errors.overview.message}</p>
              )}
            </div>
          )}
        />

        <Controller
          control={control}
          name="deliverable"
          render={({ field: { value, onChange } }) => (
            <div>
              <label htmlFor="deliverable" className="block text-sm font-medium text-gray-700">
                Deliverables
              </label>
              <RichTextEditor
                id="deliverable"
                placeholder="Describe the files, documents, or results you will deliver upon project completion"
                value={value}
                onChange={onChange}
              />
              {errors.deliverable && (
                <p className="text-red-500 text-sm mt-1">{errors.deliverable.message}</p>
              )}
            </div>
          )}
        />

        <Controller
          control={control}
          name="budget"
          render={({ field }) => (
            <div>
              <label htmlFor="budget" className="block text-sm font-medium text-gray-700">
                Budget
              </label>
              <input
                {...field}
                id="budget"
                placeholder="e.g. 50000 - 80000"
                className="w-full border rounded px-3 py-2 mt-1 focus:ring-teal-500 focus:border-teal-500"
                aria-label="Budget range"
              />
              {errors.budget && (
                <p className="text-red-500 text-sm mt-1">{errors.budget.message}</p>
              )}
            </div>
          )}
        />

        <Controller
          control={control}
          name="deadline"
          render={({ field: { onChange, value } }) => (
            <div>
              <label htmlFor="deadline" className="block text-sm font-medium text-gray-700">
                Deadline
              </label>
              <input
                type="date"
                id="deadline"
                value={value ? new Date(value).toISOString().split("T")[0] : ""}
                onChange={(e) => onChange(e.target.value ? new Date(e.target.value).toISOString().slice(0, 19).replace('T', ' ') : null)}
                className="w-full border rounded px-3 py-2 mt-1 focus:ring-teal-500 focus:border-teal-500"
                aria-label="Project deadline"
              />
              {errors.deadline && (
                <p className="text-red-500 text-sm mt-1">{errors.deadline.message}</p>
              )}
            </div>
          )}
        />

        <div className="space-y-4">
          <h3 className="text-sm font-medium text-[#01AEAD]">Hiring details</h3>
          <label htmlFor="duration" className="block text-sm font-medium text-gray-700">
            Hiring timeline for this job *
          </label>
          <Controller
            name="duration"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Select
                inputId="duration"
                placeholder="Select a Timeline"
                onChange={(selectedOption) => onChange(selectedOption?.value || "")}
                options={timeLineOptions}
                value={timeLineOptions.find((option) => option.value === value) || null}
                className="mt-1"
              />
            )}
          />
          {errors.duration && (
            <p className="text-red-500 text-sm mt-1">{errors.duration.message}</p>
          )}

          <div>
            <label htmlFor="total_freelancer" className="block text-sm font-medium text-gray-700 mb-1">
              Number of Freelancers to hire for this Project *
            </label>
            <Controller
              name="total_freelancer"
              control={control}
              render={({ field: { onChange, value } }) => (
                <div className="inline-flex items-center border border-gray-300 rounded-md overflow-hidden">
                  <span className="px-4 py-2 text-gray-700">
                    {value} {value === 1 ? "person" : "people"}
                  </span>
                  <div className="flex items-center">
                    <button
                      type="button"
                      onClick={() => onChange(value + 1)}
                      className="px-3 py-2 text-gray-600 hover:bg-gray-100"
                      aria-label="Increase freelancer count"
                    >
                      +
                    </button>
                    <div className="h-6 w-px bg-gray-300" />
                    <button
                      type="button"
                      onClick={() => onChange(Math.max(1, value - 1))}
                      className="px-3 py-2 text-gray-600 hover:bg-gray-100"
                      aria-label="Decrease freelancer count"
                    >
                      -
                    </button>
                  </div>
                </div>
              )}
            />
            {errors.total_freelancer && (
              <p className="text-red-500 text-sm mt-1">{errors.total_freelancer.message}</p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Mode
          </label>
          <Controller
            name="mode"
            control={control}
            render={({ field: { onChange, value } }) => (
              <div className="flex flex-wrap gap-4">
                {modeOptions.map((type) => (
                  <label
                    key={type}
                    className="flex items-center space-x-2 cursor-pointer"
                  >
                    <input
                      type="radio"
                      value={type}
                      checked={value === type}
                      onChange={() => onChange(type)}
                      className="w-4 h-4 text-teal-600 border-gray-300 focus:ring-teal-500"
                      aria-label={`Select ${type} mode`}
                    />
                    <span className="text-sm text-gray-700">{type}</span>
                  </label>
                ))}
              </div>
            )}
          />
          {errors.mode && (
            <p className="text-red-500 text-sm mt-1">{errors.mode.message}</p>
          )}
        </div>

        <div className="w-1/2">
          <label htmlFor="type" className="block text-sm font-medium text-gray-700">
            Select Type
          </label>
          <Controller
            control={control}
            name="type"
            render={({ field: { onChange, value } }) => (
              <Select
                inputId="type"
                placeholder="Select type"
                onChange={(selectedOption) => onChange(selectedOption?.value || "")}
                options={typeOptions}
                value={typeOptions.find((option) => option.value === value) || null}
                className="mt-1"
              />
            )}
          />
          {errors.type && (
            <p className="text-red-500 text-sm mt-1">{errors.type.message}</p>
          )}
        </div>

        <div className="w-1/2">
          <label htmlFor="language" className="block text-sm font-medium text-gray-700">
            Languages
          </label>
          <Controller
            control={control}
            name="language"
            render={({ field: { onChange, value } }) => (
              <Select
                inputId="language"
                isMulti
                placeholder="Select Languages"
                onChange={(selectedOptions) =>
                  onChange(selectedOptions ? selectedOptions.map((option) => option.value) : [])
                }
                options={languageOptions}
                value={languageOptions.filter((option) => value && value.includes(option.value))}
                className="mt-1"
              />
            )}
          />
          {errors.language && (
            <p className="text-red-500 text-sm mt-1">{errors.language.message}</p>
          )}
        </div>

        <div className="w-1/2">
          <label htmlFor="freelancerType" className="block text-sm font-medium text-gray-700">
            Select Freelancer Type
          </label>
          <Controller
            control={control}
            name="freelancerType"
            render={({ field: { onChange, value } }) => (
              <Select
                inputId="freelancerType"
                placeholder="Select Freelancer Type"
                onChange={(selectedOption) => onChange(selectedOption?.value || "")}
                options={freelancerTypeOptions}
                value={freelancerTypeOptions.find((option) => option.value === value) || null}
                className="mt-1"
              />
            )}
          />
          {errors.freelancerType && (
            <p className="text-red-500 text-sm mt-1">{errors.freelancerType.message}</p>
          )}
        </div>

        <Button text="Submit" className="w-full px-5 py-2 rounded" isLoading={isPending} onClick={handleSubmit(onSubmit)} />
          
        
      </div>
    </div>
  );
};

export default ProjectForm;