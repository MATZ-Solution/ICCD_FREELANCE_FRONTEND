import { useForm, Controller } from "react-hook-form";
import { useState } from "react";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const validationSchema = Yup.object({
  occupation: Yup.string().required("Occupation is required"),
  skills: Yup.array()
    .min(1, "At least one skill is required")
    .of(
      Yup.object({
        skill: Yup.string().required("Skill is required"),
        level: Yup.string().required("Skill level is required"),
      })
    ),
  education: Yup.array().of(
    Yup.object({
      institution: Yup.string().required("Institution is required"),
      level: Yup.string().required("Education level is required"),
      title: Yup.string(),
      major: Yup.string(),
      year: Yup.string(),
    })
  ),
  certifications: Yup.array().of(
    Yup.object({
      name: Yup.string().required("Certificate name is required"),
      from: Yup.string().required("Certified from is required"),
      year: Yup.string(),
    })
  ),
  personalWebsite: Yup.string().url("Must be a valid URL").nullable(),
  newOccupation: Yup.string().when("showNewOccupation", {
    is: true,
    then: (schema) => schema.required("New occupation is required"),
    otherwise: (schema) => schema.nullable(),
  }),
});

export default function ProfessionalInfoStep() {
  const [showNewOccupation, setShowNewOccupation] = useState(false);
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      occupation: "",
      skills: [],
      education: [],
      certifications: [],
      personalWebsite: "",
      newOccupation: "",
      currentSkill: "",
      currentSkillLevel: "",
      currentEducation: {
        institution: "",
        level: "",
        title: "",
        major: "",
        year: "",
      },
      currentCertification: {
        name: "",
        from: "",
        year: "",
      },
    },
  });

  const addSkill = () => {
    const { currentSkill, currentSkillLevel } = getValues();
    if (currentSkill && currentSkillLevel) {
      const updatedSkills = [
        ...getValues().skills,
        { skill: currentSkill, level: currentSkillLevel },
      ];
      setValue("skills", updatedSkills);
      setValue("currentSkill", "");
      setValue("currentSkillLevel", "");
    }
  };

  const removeSkill = (index) => {
    const updatedSkills = getValues().skills.filter((_, i) => i !== index);
    setValue("skills", updatedSkills);
  };

  const addEducation = () => {
    const { currentEducation } = getValues();
    if (currentEducation.institution && currentEducation.level) {
      const updatedEducation = [
        ...getValues().education,
        currentEducation,
      ];
      setValue("education", updatedEducation);
      setValue("currentEducation", {
        institution: "",
        level: "",
        title: "",
        major: "",
        year: "",
      });
    }
  };

  const removeEducation = (index) => {
    const updatedEducation = getValues().education.filter(
      (_, i) => i !== index
    );
    setValue("education", updatedEducation);
  };

  const addCertification = () => {
    const { currentCertification } = getValues();
    if (currentCertification.name && currentCertification.from) {
      const updatedCertifications = [
        ...getValues().certifications,
        currentCertification,
      ];
      setValue("certifications", updatedCertifications);
      setValue("currentCertification", {
        name: "",
        from: "",
        year: "",
      });
    }
  };

  const removeCertification = (index) => {
    const updatedCertifications = getValues().certifications.filter(
      (_, i) => i !== index
    );
    setValue("certifications", updatedCertifications);
  };

  const addNewOccupation = () => {
    const newOccupation = getValues().newOccupation;
    if (newOccupation.trim()) {
      setValue("occupation", newOccupation.trim());
      setValue("newOccupation", "");
      setShowNewOccupation(false);
    }
  };

  const onSubmit = (data) => {
    console.log("Form Submission Data:", {
      occupation: data.occupation,
      skills: data.skills,
      education: data.education,
      certifications: data.certifications,
      personalWebsite: data.personalWebsite,
    });
    alert("Form submitted! Check console for data.");
    navigate("/Account-Security-Step");
  };

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
        step === 3 
          ? "border border-gray-300 bg-white text-gray-300" // active green step 1
          : "bg-[#01AEAD] text-white" // inactive steps 2 & 3 "bg-[#01AEAD] text-white"
      }`}
    >
      {step}
    </div>
    <span
      className={`${
        step === 2 ? "text-[#01AEAD]" : "text-gray-600"
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
              Completion Rate: 50%
            </div>
            <div className="h-2 w-full bg-gray-200 rounded overflow-hidden">
              <div
                className="h-full bg-[#01AEAD] rounded"
                style={{ width: "66%" }}
              ></div>
            </div>
          </div>
        </div>
        <div className="bg-gray-300 my-6 h-px w-full"></div>
      </div>

      <div className="flex flex-col md:flex-row justify-between md:items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold mb-3">Professional Info</h2>
          <p className="text-gray-600 whitespace-pre-wrap mb-6">
            {"This is your time to shine. Let potential buyers know what you do\nbest and how you gained your skills, certifications, and experience."}
          </p>
        </div>
        <p className="text-[#01AEAD] text-lg italic font-semibold md:self-end">
          * Mandatory fields
        </p>
      </div>

      <div className="bg-gray-300 mb-4 h-px w-full"></div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Occupation */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div>
            <label className="block font-semibold text-lg mb-2">
              Your Occupation *
            </label>
          </div>
          <div>
            <Controller
              name="occupation"
              control={control}
              render={({ field }) => (
                <select
                  {...field}
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-cyan-500"
                >
                  <option value="">Select Occupation</option>
                  <option value="digital-marketing">Digital Marketing</option>
                  <option value="web-development">Web Development</option>
                  <option value="graphic-design">Graphic Design</option>
                  <option value="content-writing">Content Writing</option>
                  <option value="data-analysis">Data Analysis</option>
                </select>
              )}
            />
            {!showNewOccupation ? (
              <button
                type="button"
                onClick={() => setShowNewOccupation(true)}
                className="mt-3 text-[#01AEAD] font-bold hover:text-cyan-600 text-sm"
              >
                + Add New
              </button>
            ) : (
              <div className="mt-3 flex flex-col sm:flex-row gap-2">
                <Controller
                  name="newOccupation"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      placeholder="Enter new occupation"
                      className="w-full p-2 border border-gray-300 rounded text-sm"
                    />
                  )}
                />
                <button
                  type="button"
                  onClick={addNewOccupation}
                  className="w-full sm:w-auto px-3 py-2 bg-[#01AEAD] text-white rounded text-sm hover:bg-cyan-600"
                >
                  Add
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setValue("newOccupation", "");
                    setShowNewOccupation(false);
                  }}
                  className="w-full sm:w-auto px-3 py-2 bg-gray-300 text-gray-700 rounded text-sm hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            )}
            {errors.occupation && (
              <p className="text-red-500 text-sm mt-2">
                {errors.occupation.message}
              </p>
            )}
            {errors.newOccupation && (
              <p className="text-red-500 text-sm mt-2">
                {errors.newOccupation.message}
              </p>
            )}
          </div>
        </div>

        {/* Skills */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div>
            <label className="block font-semibold text-lg mb-2">Skills *</label>
            <p className="text-sm text-gray-600 whitespace-pre-wrap">
              {"List the skills related to the services you're offering and\nadd your experience level."}
            </p>
          </div>
          <div>
            <div className="flex flex-col border p-3 rounded-lg border-gray-300 sm:flex-row gap-3 items-stretch sm:items-center mb-4">
              <Controller
                name="currentSkill"
                control={control}
                render={({ field }) => (
                  <select
                    {...field}
                    className="w-full sm:flex-1 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  >
                    <option value="">Add Skill (e.g. Voice Talent)</option>
                    <option value="voice-talent">Voice Talent</option>
                    <option value="video-editing">Video Editing</option>
                    <option value="copywriting">Copywriting</option>
                    <option value="seo">SEO</option>
                    <option value="social-media">Social Media</option>
                    <option value="web-design">Web Design</option>
                  </select>
                )}
              />
              <Controller
                name="currentSkillLevel"
                control={control}
                render={({ field }) => (
                  <select
                    {...field}
                    className="w-full sm:w-auto sm:min-w-[150px] p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  >
                    <option value="">Experience Level</option>
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="expert">Expert</option>
                  </select>
                )}
              />
              <button
                type="button"
                onClick={addSkill}
                className="w-full sm:w-auto px-4 py-3 bg-[#01AEAD] text-white rounded hover:bg-cyan-600 transition-colors"
              >
                Add
              </button>
            </div>

            {getValues().skills.length > 0 && (
              <div className="space-y-2 mb-4">
                {getValues().skills.map((skill, index) => (
                  <div
                    key={index}
                    className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-gray-50 p-3 rounded"
                  >
                    <span className="capitalize">
                      {skill.skill} - {skill.level}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeSkill(index)}
                      className="text-red-500 hover:text-red-700 text-sm mt-2 sm:mt-0"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}
            {errors.skills && (
              <p className="text-red-500 text-sm mt-2">
                {errors.skills.message}
              </p>
            )}
          </div>
        </div>

        {/* Education Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div>
            <label className="block font-semibold text-lg mb-2">Education</label>
            <p className="text-sm text-gray-600 whitespace-pre-wrap">
              {"Add any relevant education details that will help\ncustomers to get to know you better."}
            </p>
          </div>
          <div>
            <div className="space-y-3 border p-3 rounded-lg border-gray-300 mb-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <Controller
                  name="currentEducation.institution"
                  control={control}
                  render={({ field }) => (
                    <select
                      {...field}
                      className="w-full sm:flex-1 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    >
                      <option value="">Country or College/University</option>
                      <option value="harvard">Harvard University</option>
                      <option value="mit">MIT</option>
                      <option value="stanford">Stanford University</option>
                      <option value="berkeley">UC Berkeley</option>
                    </select>
                  )}
                />
                <Controller
                  name="currentEducation.level"
                  control={control}
                  render={({ field }) => (
                    <select
                      {...field}
                      className="w-full sm:w-auto sm:min-w-[150px] p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    >
                      <option value="">Education Level</option>
                      <option value="bachelors">Bachelor's</option>
                      <option value="masters">Master's</option>
                      <option value="phd">PhD</option>
                    </select>
                  )}
                />
              </div>
              <div className="flex flex-col  sm:flex-row gap-3 items-stretch">
                <Controller
                  name="currentEducation.title"
                  control={control}
                  render={({ field }) => (
                    <select
                      {...field}
                      className="w-full sm:w-auto p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    >
                      <option value="">Title</option>
                      <option value="bachelor">Bachelor</option>
                      <option value="master">Master</option>
                      <option value="doctor">Doctor</option>
                    </select>
                  )}
                />
                <Controller
                  name="currentEducation.major"
                  control={control}
                  render={({ field }) => (
                    <select
                      {...field}
                      className="w-full sm:flex-1 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    >
                      <option value="">Major</option>
                      <option value="computer-science">Computer Science</option>
                      <option value="business">Business</option>
                      <option value="marketing">Marketing</option>
                      <option value="design">Design</option>
                    </select>
                  )}
                />
                <Controller
                  name="currentEducation.year"
                  control={control}
                  render={({ field }) => (
                    <select
                      {...field}
                      className="w-full sm:w-auto sm:min-w-[100px] p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    >
                      <option value="">Year</option>
                      <option value="2024">2024</option>
                      <option value="2023">2023</option>
                      <option value="2022">2022</option>
                      <option value="2021">2021</option>
                    </select>
                  )}
                />
                <button
                  type="button"
                  onClick={addEducation}
                  className="w-full sm:w-auto px-4 py-3 bg-[#01AEAD] text-white rounded hover:bg-cyan-600"
                >
                  Add
                </button>
              </div>
            </div>

            {getValues().education.length > 0 && (
              <div className="space-y-2 mb-4">
                {getValues().education.map((edu, index) => (
                  <div
                    key={index}
                    className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-gray-50 p-3 rounded"
                  >
                    <span>
                      {edu.title} in {edu.major} from {edu.institution} (
                      {edu.year})
                    </span>
                    <button
                      type="button"
                      onClick={() => removeEducation(index)}
                      className="text-red-500 hover:text-red-700 text-sm mt-2 sm:mt-0"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Certification */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div>
            <label className="block font-semibold text-lg mb-2">
              Certification
            </label>
            <p className="text-sm text-gray-600 whitespace-pre-wrap">
              {"Include any certificates or awards that are relevant to\nthe services you offer."}
            </p>
          </div>
          <div>
            <div className="flex flex-col border p-3 rounded-lg border-gray-300 sm:flex-row gap-3 mb-4">
              <Controller
                name="currentCertification.name"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    placeholder="Certificate name"
                    className="w-full sm:flex-1 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                )}
              />
              <Controller
                name="currentCertification.from"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    placeholder="Certified from"
                    className="w-full sm:flex-1 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                )}
              />
              <Controller
                name="currentCertification.year"
                control={control}
                render={({ field }) => (
                  <select
                    {...field}
                    className="w-full sm:w-auto sm:min-w-[100px] p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  >
                    <option value="">Year</option>
                    <option value="2024">2024</option>
                    <option value="2023">2023</option>
                    <option value="2022">2022</option>
                    <option value="2021">2021</option>
                  </select>
                )}
              />
              <button
                type="button"
                onClick={addCertification}
                className="w-full sm:w-auto px-4 py-3 bg-[#01AEAD] text-white rounded hover:bg-cyan-600"
              >
                Add
              </button>
            </div>
            {getValues().certifications.length > 0 && (
              <div className="space-y-2">
                {getValues().certifications.map((cert, index) => (
                  <div
                    key={index}
                    className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-gray-50 p-3 rounded"
                  >
                    <span>
                      {cert.name} from {cert.from} ({cert.year})
                    </span>
                    <button
                      type="button"
                      onClick={() => removeCertification(index)}
                      className="text-red-500 hover:text-red-700 text-sm mt-2 sm:mt-0"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Personal Website */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div>
            <label className="block font-semibold text-lg mb-2">
              Personal Website
            </label>
            <p className="text-sm text-gray-600 whitespace-pre-wrap">
              {"If you have a personal website, portfolio, or blog,\nadd the link here."}
            </p>
          </div>
          <div className="border p-3 border-gray-300 rounded-lg " >
            <Controller
              name="personalWebsite"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  placeholder="Provide a link to your own professional website"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              )}
            />
            {errors.personalWebsite && (
              <p className="text-red-500 text-sm mt-2">
                {errors.personalWebsite.message}
              </p>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex ">
          <button
            type="submit"
            className="px-6 py-3 flex  bg-[#043A53] text-white rounded-3xl hover:bg-cyan-600"
          >
            Continue <ArrowRight className="h-6 w-5" />
          </button>
        </div>
      </form>
    </div>
  );
}