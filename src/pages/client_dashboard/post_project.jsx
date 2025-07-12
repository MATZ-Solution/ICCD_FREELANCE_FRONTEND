import bannerimg from "../../assets/client_dashboard/bannerimg.png";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import backgroundd from "../../assets/client_dashboard/Group.png";
import { useEffect, useState } from "react";
import ReactSelect from "../../component/buttonSelect";
import { useAddproject } from "../../../api/client/project";

const schema = yup.object({
  projectTitle: yup
    .string()
    .required("Project title is required")
    .max(80, "Maximum 80 characters allowed"),

  category: yup.string().required("Category is required"),
  subCategory: yup.string().required("Subcategory is required"),

  skills: yup
    .array()
    .of(yup.string().required())
    .min(5, "Please enter at least 5 skills"),

  projectDescription: yup
    .string()
    .required("Project description is required")
    .max(250, "Maximum 250 characters allowed"),

  budget: yup
    .string()
    .required("Budget is required")
    .test(
      "is-valid-budget-range",
      "Enter a valid budget range like 5000 - 7000",
      (value) => {
        const match = value?.match(/^\s*([\d,]+)\s*-\s*([\d,]+)\s*$/);
        if (!match) return false;
        const min = parseInt(match[1].replace(/,/g, ""));
        const max = parseInt(match[2].replace(/,/g, ""));
        return !isNaN(min) && !isNaN(max) && min < max && max - min >= 1000;
      }
    ),

  deadline: yup.date().required("Deadline is required"),

  files: yup
    .mixed()
    .test("required", "File is required", (value) => value && value.length > 0)
    .test("fileSize", "Max file size 5MB", (value) =>
      !value || !value[0] || value[0].size <= 5 * 1024 * 1024
    )
    .test("fileType", "Only jpg, png, gif allowed", (value) =>
      !value ||
      !value[0] ||
      ["image/jpeg", "image/png", "image/gif"].includes(value[0].type)
    ),
});

const categoryOptions = [
  { value: "Digital Marketing", label: "Digital Marketing" },
  { value: "Web", label: "Web Development" },
  { value: "Graphic", label: "Graphic Designing" },
  { value: "Figma", label: "Figma Design" },
];

const subCategoryOptions = [
  { value: "FrontEnd", label: "FrontEnd" },
  { value: "Backend", label: "Backend" },
  { value: "Design", label: "Design" },
  { value: "API", label: "API Integration" },
];

const ProjectForm = () => {
  const [skillInput, setSkillInput] = useState("");
  const [skills, setSkills] = useState([]);

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      projectTitle: "",
      category: null,
      subCategory: null,
      skills: [],
      projectDescription: "",
      budget: "",
      deadline: "",
      files: [],
    },
  });

  useEffect(() => {
    setValue("skills", skills);
  }, [skills, setValue]);

  const handleAddSkill = () => {
    const trimmed = skillInput.trim();
    if (trimmed && !skills.includes(trimmed)) {
      setSkills((prev) => [...prev, trimmed]);
      setSkillInput("");
    }
  };

  const handleRemoveSkill = (index) => {
    setSkills((prev) => prev.filter((_, i) => i !== index));
  };

  const { addProject, isSuccess, isPending, isError, error } = useAddproject()
  const onSubmit = (data) => {
    console.log("data: ", data)

    const formData = new FormData();

    for (const key in data) {
      console.log("key: ", key)
      if (key === 'files') {
        data.files.forEach((file) => {
          formData.append("files", file);
        });
      } 
      else if(key === 'languages'){
        console.log("data.languages: ", data.languages)
          formData.append("languages", JSON.stringify(data.languages));
      }
      else {
        formData.append(key, data[key])
      }
    }
     addProject(formData)
  };

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
        <img src={bannerimg} alt="banner" className="w-96 h-auto" />
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-4xl bg-white mx-auto px-6 py-8 space-y-6"
      >
        {/* Project Title */}
        <Controller
          control={control}
          name="projectTitle"
          render={({ field }) => (
            <div>
              <label>Project Title</label>
              <input
                {...field}
                className="w-full border rounded px-3 py-2 mt-1"
              />
              <p className="text-red-500 text-sm">{errors.projectTitle?.message}</p>
            </div>
          )}
        />

        {/* Category & subCategory */}
        <div className="flex gap-4">
          <div className="w-1/2">
            <label>Category</label>
            <Controller
              control={control}
              name="category"
              render={({ field: { onChange, value } }) => (
                <ReactSelect
                  placeholder="Select Category"
                  onChange={(selectedOption) => onChange(selectedOption?.value || "")}
                  option={categoryOptions}
                  value={categoryOptions.find((option) => option.value === value) || null}
                />
              )}
            />
            {errors.category && (
              <p className="mt-1 text-red-600">{errors.category.message}</p>
            )}
          </div>

          <div className="w-1/2">
            <label>Subcategory</label>
            <Controller
              control={control}
              name="subCategory"
              render={({ field: { onChange, value } }) => (
                <ReactSelect
                  placeholder="Select Subcategory"
                  onChange={(selectedOption) => onChange(selectedOption?.value || "")}
                  option={subCategoryOptions}
                  value={subCategoryOptions.find((option) => option.value === value) || null}
                />
              )}
            />
            {errors.subCategory && (
              <p className="mt-1 text-red-600">{errors.subCategory.message}</p>
            )}
          </div>
        </div>

        {/* Required Skills */}
        <div>
          <label>Required Skills</label>
          <div className="flex gap-2 mt-1">
            <input
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              placeholder="Enter a skill"
              className="w-full border rounded px-3 py-2"
            />
            <button
              type="button"
              onClick={handleAddSkill}
              className="bg-blue-600 text-white px-4 rounded"
            >
              Add
            </button>
          </div>

          <div className="flex flex-wrap gap-2 mt-2">
            {skills.map((skill, index) => (
              <span
                key={index}
                className="bg-teal-600 text-white px-2 py-1 rounded text-sm flex items-center gap-1"
              >
                {skill}
                <button
                  type="button"
                  onClick={() => handleRemoveSkill(index)}
                  className="text-red-300 hover:text-red-500"
                >
                  &times;
                </button>
              </span>
            ))}
          </div>

          <p className="text-red-500 text-sm">{errors.skills?.message}</p>
        </div>

        {/* Project Description */}
        <Controller
          control={control}
          name="projectDescription"
          render={({ field }) => (
            <div>
              <label>Project Description</label>
              <textarea
                {...field}
                rows={4}
                className="w-full border rounded px-3 py-2 mt-1"
              />
              <p className="text-red-500 text-sm">
                {errors.projectDescription?.message}
              </p>
            </div>
          )}
        />

        {/* Budget */}
        <Controller
          control={control}
          name="budget"
          render={({ field }) => (
            <div>
              <label>Budget</label>
              <input
                {...field}
                placeholder="e.g. 50000 - 80000"
                className="w-full border rounded px-3 py-2 mt-1"
              />
              <p className="text-red-500 text-sm">{errors.budget?.message}</p>
            </div>
          )}
        />

        {/* Deadline */}
        <Controller
          control={control}
          name="deadline"
          render={({ field }) => (
            <div>
              <label>Deadline</label>
              <input
                {...field}
                type="date"
                className="w-full border rounded px-3 py-2 mt-1"
              />
              <p className="text-red-500 text-sm">{errors.deadline?.message}</p>
            </div>
          )}
        />

        {/* Files */}
        <Controller
          control={control}
          name="files"
          render={({ field: { onChange } }) => (
            <div>
              <label>File Upload</label>
              <input
                type="file"
                onChange={(e) => {
                  const filesArray = Array.from(e.target.files); // Convert FileList to array
                  onChange(filesArray); // Update form state
                }}
                className="w-full border rounded px-3 py-2 mt-1"
              />
              <p className="text-red-500 text-sm">{errors.files?.message}</p>
            </div>
          )}
        />

        <button
          onClick={handleSubmit(onSubmit)}
          className="w-full bg-teal-600 hover:bg-teal-700 text-white py-3 rounded text-lg"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ProjectForm;