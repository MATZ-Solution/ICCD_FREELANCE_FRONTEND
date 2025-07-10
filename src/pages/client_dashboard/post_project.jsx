import bannerimg from "../../assets/client_dashboard/bannerimg.png";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAddproject } from "../../../api/client/project";
import { useState } from "react";
import * as yup from "yup";

const schema = yup.object({
  projectTitle: yup
    .string()
    .required("Project title is required")
    .max(80, "Maximum 80 characters allowed"),

  category: yup.string().required("Category is required"),

  subCategory: yup.string().required("Subcategory is required"),

  skills: yup
    .string()
  .required("Required skills are required")
  .test(
    "min-5-skills",
    "Please enter at least 5 skills, separated by spaces or commas",
    (value) => {
      if (!value) return false;
      const skills = value
        .split(/[,\s]+/)
        .map((s) => s.trim())
        .filter(Boolean);
      return skills.length >= 5;
    }
  )
  .test(
    "only-letters-numbers",
    "Each skill must contain only letters and numbers",
    (value) => {
      if (!value) return false;
      const skills = value
        .split(/[,\s]+/)
        .map((s) => s.trim())
        .filter(Boolean);
      const regex = /^[A-Za-z0-9]+$/;
      return skills.every((skill) => regex.test(skill));
    }
  )
  ,

  ProjectDescription: yup
    .string()
    .required("Project description is required")
    .max(250, "Maximum 250 characters allowed"),

  Budget: yup
    .string()
  .required("Budget is required")
  .test(
    "is-valid-budget-range",
    "Enter a valid budget range like 5000 - 7000",
    (value) => {
      if (!value) return false;
      const regex = /^\s*([\d,]+)\s*-\s*([\d,]+)\s*$/;
      const match = value.match(regex);
      if (!match) return false;
      const min = parseInt(match[1].replace(/,/g, ""));
      const max = parseInt(match[2].replace(/,/g, ""));
      if (isNaN(min) || isNaN(max)) return false;
      if (min >= max) return false;
      if (max - min < 1000) return false;
      return true;
    }
  )
  ,

  deadline: yup.date().required("Deadline is required"),

  files: yup
    .mixed()
  .test("fileRequired", "File is required", (value) => value && value.length > 0)
  .test("fileSize", "File size must be less than 5MB", (value) =>
    !value || !value[0] || value[0].size <= 5 * 1024 * 1024
  )
  .test(
    "fileType",
    "Only image files allowed (jpg, png, gif)",
    (value) =>
      !value ||
      !value[0] ||
      ["image/jpeg", "image/png", "image/gif"].includes(value[0].type)
  )
  ,

  milestones: yup.array().of(
    yup.object({
      title: yup.string().required("Milestone title is required"),
      payment: yup
        .number()
        .typeError("Payment amount must be a number")
      .required("Payment amount is required")
      ,
      dueDate: yup.date().required("Due date is required"),
    })
  ),
});

const ProjectForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      projectTitle: "",
      category: "",
      subcategory: "",
      RequiredSkills: "",
      ProjectDescription: "",
      Budget: "",
      deadline: "",
      milestones: [{ title: "", payment: "", dueDate: "" }],
    },
  });

  const { fields, append } = useFieldArray({
    control,
    name: "milestones",
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
  const { addProject, isSuccess, isPending, isError, error } = useAddproject()

  const onSubmit = (data) => {
    console.log("data: ", data)
    const formData = new FormData();
    for (const key in data) {
      formData.append(key, data[key])
      console.log("value: ", data[key])
    }
    addProject(formData)
  };

  return (
    <div>
      {/* Banner */}
      <div className="pmcontainer bg-[#14A800] rounded-lg px-8 md:px-16 py-6 flex flex-col md:flex-row items-center justify-center md:justify-between overflow-hidden shadow-lg">
        <div className="text-white pr-4 md:w-1/2">
          <h2 className="text-3xl text-start font-semibold mb-2">
            Project Management
          </h2>
          <p className="text-base text-start">
            Choose a freelancer's personal and instantly generate work in their distinct style.
          </p>
        </div>
        <div className="flex-shrink-0">
          <img
            src={bannerimg}
            alt="Project flow illustration"
            className="w-96 h-auto"
          />
        </div>
      </div>

      {/* Form */}
      <div className="form my-4">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="border border-gray-300 rounded-lg shadow-lg p-4 sm:p-8 w-full"
        >
          {/* Project Title */}
          <div className="mb-6 flex flex-col lg:flex-row gap-6 justify-between lg:items-center">
            <div className="text-start lg:w-1/4">
              <label className="block text-gray-700 font-medium mb-1">
                Project Title
              </label>
              <p className="text-sm">
                A clear and concise name for your project that summarizes the task. Example: "E-commerce Website Redesign"
              </p>
            </div>
            <div className="lg:w-3/4">
              <Controller
                control={control}
                name="projectTitle"
                render={({ field }) => (
                  <input
                    {...field}
                    placeholder="E-commerce Website Redesign"
                    className="w-full border border-gray-300 rounded px-3 py-3 text-sm"
                    maxLength={80}
                  />
                )}
              />
              <p className="text-red-500 text-sm mt-1">
                {errors.projectTitle?.message}
              </p>
              <div className="text-right text-gray-600 text-xs mt-1">
                0 / 80 max
              </div>
            </div>
          </div>

          {/* Category */}
          <div className="mb-6 flex flex-col lg:flex-row gap-6 justify-between lg:items-center">
            <div className="text-start lg:w-1/4">
              <label className="block text-gray-700 font-medium mb-1">
                Category
              </label>
              <p className="text-sm">
                Select the most relevant category that matches your project domain.
              </p>
            </div>
            <div className="lg:w-3/4 flex gap-2 sm:gap-4">
              <div className="w-1/2">
                <Controller
                  control={control}
                  name="category"
                  render={({ field }) => (
                    <select
                      {...field}
                      className="w-full border border-gray-300 rounded px-3 py-3 text-sm"
                    >
                      <option value="">Select A Category</option>
                      <option value="Web Development">Web Development</option>
                      <option value="Graphic Design">Graphic Design</option>
                    </select>
                  )}
                />
                <p className="text-red-500 text-sm mt-1">
                  {errors.category?.message}
                </p>
              </div>
              <div className="w-1/2">
                <Controller
                  control={control}
                  name="subcategory"
                  render={({ field }) => (
                    <select
                      {...field}
                      className="w-full border border-gray-300 rounded px-3 py-3 text-sm"
                    >
                      <option value="">Select A Subcategory</option>
                      <option value="Frontend">Frontend</option>
                      <option value="Backend">Backend</option>
                    </select>
                  )}
                />
                <p className="text-red-500 text-sm mt-1">
                  {errors.subcategory?.message}
                </p>
              </div>
            </div>
          </div>

          {/* Required Skills */}
          <div className="mb-6 flex flex-col lg:flex-row justify-between lg:items-center gap-6">
            <div className="text-start lg:w-1/4">
              <label className="block text-gray-700 font-medium mb-1">
                Required Skills
              </label>
              <p className="text-sm">
                Choose the specific technical or creative skills needed to complete the project.
              </p>
            </div>
            <div className="lg:w-3/4">
              <Controller
                control={control}
                name="RequiredSkills"
                render={({ field }) => (
                  <input
                    {...field}
                    placeholder="e.g. React.js, UI/UX Design, Figma"
                    className="w-full border border-gray-300 rounded px-3 py-3 text-sm"
                  />
                )}
              />
              <p className="text-red-500 text-sm mt-1">
                {errors.RequiredSkills?.message}
              </p>
              <div className="text-start text-gray-600 text-xs mt-1">
                5 Skills minimum. Use letters and numbers only.
              </div>
            </div>
          </div>

          {/* Project Description */}
          <div className="mb-6 flex flex-col lg:flex-row justify-between lg:items-center gap-6">
            <div className="text-start lg:w-1/4">
              <label className="block text-gray-700 font-medium mb-1">
                Project Description
              </label>
              <p className="text-sm">
                Provide a detailed explanation of the project.
              </p>
            </div>
            <div className="lg:w-3/4">
              <Controller
                control={control}
                name="ProjectDescription"
                render={({ field }) => (
                  <textarea
                    {...field}
                    placeholder="More detail improves quality of proposals."
                    className="w-full border border-gray-300 rounded px-3 py-3 text-sm"
                    rows={4}
                  />
                )}
              />
              <p className="text-red-500 text-sm mt-1">
                {errors.ProjectDescription?.message}
              </p>
              <div className="text-right text-gray-600 text-xs mt-1">
                0 / 250 max
              </div>
            </div>
          </div>

          {/* Budget */}
          <div className="mb-6 flex flex-col lg:flex-row justify-between lg:items-center gap-6">
            <div className="text-start lg:w-1/4">
              <label className="block text-gray-700 font-medium mb-1">
                Budget
              </label>
              <p className="text-sm">
                Enter your total budget or price range (e.g. PKR 50,000 – 80,000).
              </p>
            </div>
            <div className="lg:w-3/4">
              <Controller
                control={control}
                name="Budget"
                render={({ field }) => (
                  <input
                    {...field}
                    placeholder="e.g. PKR 50,000 – 80,000"
                    className="w-full border border-gray-300 rounded px-3 py-3 text-sm"
                  />
                )}
              />
              <p className="text-red-500 text-sm mt-1">
                {errors.Budget?.message}
              </p>
            </div>
          </div>

          {/* Deadline */}
          <div className="mb-6 flex flex-col lg:flex-row justify-between lg:items-center gap-6">
            <div className="text-start lg:w-1/4">
              <label className="block text-gray-700 font-medium mb-1">
                Timeline / Deadline
              </label>
              <p className="text-sm">
                Select the expected delivery date.
              </p>
            </div>
            <div className="lg:w-3/4">
              <Controller
                control={control}
                name="deadline"
                render={({ field }) => (
                  <input
                    {...field}
                    type="date"
                    className="w-full border border-gray-300 rounded px-3 py-3 text-sm"
                  />
                )}
              />
              <p className="text-red-500 text-sm mt-1">
                {errors.deadline?.message}
              </p>
            </div>
          </div>

          {/* Files */}
          <div className="mb-6 flex flex-col lg:flex-row justify-between lg:items-center gap-6">
            <div className="text-start lg:w-1/4">
              <label className="block text-gray-700 font-medium mb-1">
                Files
              </label>
              <p className="text-sm">
                Attach any design briefs, sketches, or documentation.
              </p>
            </div>
            <div className="lg:w-3/4">
              <Controller
                control={control}
                name="files"
                render={({ field: { onChange } }) => (
                  <input
                    type="file"
                    onChange={(e) => onChange(e.target.files)}
                    className="w-full border border-gray-300 rounded px-3 py-3 text-sm"
                  />
                )}
              />
              <p className="text-red-500 text-sm mt-1">
                {errors.files?.message}
              </p>
            </div>
          </div>

          {/* Milestones */}
          {fields.map((field, index) => (
            <div
              key={field.id}
              className="border-t border-gray-200 p-4 rounded-lg mb-4 bg-[#f6f6f6]"
            >
              <label className="text-start block text-gray-700 font-medium mb-1">
                Milestone Title
              </label>
              <Controller
                control={control}
                name={`milestones.${index}.title`}
                render={({ field }) => (
                  <input
                    {...field}
                    placeholder="Wireframes & UI Screens"
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                  />
                )}
              />
              <p className="text-red-500 text-sm mt-1">
                {errors.milestones?.[index]?.title?.message}
              </p>

              <div className="mt-4 flex flex-col sm:flex-row gap-2 sm:gap-4">
                <div className="sm:w-1/2">
                  <label className="text-start block text-gray-700 font-medium mb-1">
                    Payment Amount
                  </label>
                  <Controller
                    control={control}
                    name={`milestones.${index}.payment`}
                    render={({ field }) => (
                      <input
                        {...field}
                        placeholder="PKR 25,000"
                        className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                      />
                    )}
                  />
                  <p className="text-red-500 text-sm mt-1">
                    {errors.milestones?.[index]?.payment?.message}
                  </p>
                  <div className="text-start text-gray-600 text-xs mt-1">
                    Specify how much you will pay for this milestone.
                  </div>
                </div>
                <div className="sm:w-1/2">
                  <label className="text-start block text-gray-700 font-medium mb-1">
                    Due Date
                  </label>
                  <Controller
                    control={control}
                    name={`milestones.${index}.dueDate`}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="date"
                        className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                      />
                    )}
                  />
                  <p className="text-red-500 text-sm mt-1">
                    {errors.milestones?.[index]?.dueDate?.message}
                  </p>
                  <div className="text-start text-gray-600 text-xs mt-1">
                    Select the date by which this milestone should be completed.
                  </div>
                </div>
              </div>
            </div>
          ))}

          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => append({ title: "", payment: "", dueDate: "" })}
              className="bg-blue-900 text-white px-4 py-2 rounded hover:bg-blue-800 transition text-sm"
            >
              Add New Milestone
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            onClick={handleSubmit(onSubmit)}
            className="w-full mt-4 py-3 bg-teal-500 text-white font-semibold rounded hover:bg-teal-600 transition text-lg"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProjectForm;