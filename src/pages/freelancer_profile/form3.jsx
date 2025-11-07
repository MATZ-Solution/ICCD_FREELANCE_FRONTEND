
import { useForm, Controller, useFieldArray } from "react-hook-form"
import * as Yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { ArrowRight } from "lucide-react"
import { useState } from "react"
import Select from 'react-select'
import ReactSelect from "../../component/buttonSelect"
import { useAddProfile } from "../../../api/client/freelancer"
import { useDispatch, useSelector } from "react-redux"
import { resetUserProfile } from "../../../redux/slices/userProfileSlice"
import { base64ToFile } from "../../../functions/base64FileConversion"
import { categoryData } from "../../../data/categoryData"
import ProgressBar from "../../component/freelancer_profile/ProgressBar"

const validationSchema = Yup.object({
  professionalTitle: Yup.string().required("Professional Title is required"),
  professionalSummary: Yup.string()
    .required("professional Summary is required")
    .min(50, "Must be at least 50 characters")
    .max(500, "Cannot exceed 500 characters"),
  categoryOfWork: Yup.string().required("Category is required"),
  experience: Yup.string().required("Experience is required"),
  // occupation: Yup.string().required("Occupation is required"),
  skills: Yup.array()
    .min(1, "At least one skill is required")
    .of(
      Yup.object({
        skill: Yup.string().required("Skill is required"),
        level: Yup.string().required("Skill level is required"),
      }),
    ),
  education: Yup.array().of(
    Yup.object({
      institution: Yup.string().required("Institution is required"),
      country: Yup.string().required("Country name is required"),
      title: Yup.string(),
      major: Yup.string(),
      year: Yup.string(),
    }),
  ),
  // certifications: Yup.array().of(
  //   Yup.object({
  //     name: Yup.string().required("Certificate name is required"),
  //     from: Yup.string().required("Certified from is required"),
  //     year: Yup.string(),
  //   }),
  // ),
  personalWebsite: Yup.string().url("Must be a valid URL").nullable(),
})

const defaultPlaceholderConfig = {
  professionalTitle: "",
  professionalSummary: "",
  skill: "Select a skill",
  // occupation: "Select your occupation",
  // skillLevel: "Select skill level",
  institution: "Select institution",
  country: " country",
  title: " title",
  major: "major",
  year: " year",
  certificationName: "certificate name",
  certificationFrom: "certified from",
  personalWebsite: "Provide a link to your professional website",
  acknowledge: Yup.boolean().oneOf([true], 'You must acknowledge the terms'),
}

export default function ProfessionalInfoStep({ placeholderConfig = defaultPlaceholderConfig }) {
  // Dropdown lists
  const dispatch = useDispatch()
  const occupationslist = [
    { value: "Digital Marketing", label: "Digital Marketing" },
    { value: "Web", label: "Web Development" },
    { value: "Graphic", label: "Graphic Designing" },
    { value: "figma", label: "Figma Design" },
  ]

  const userProfile = useSelector(state => state.userProfile.userProfile)
  const skillslist = occupationslist

  const skilllevellist = [
    { value: "Beginner", label: "Beginner" },
    { value: "Intermediate", label: "Intermediate" },
    { value: "Expert", label: "Expert" },
  ]

  const institutionList = [
    { value: "harvard", label: "Harvard University" },
    { value: "mit", label: "MIT" },
    { value: "stanford", label: "Stanford University" },
    { value: "berkeley", label: "UC Berkeley" },
  ]

  const countryList = [
    { value: "usa", label: "United States" },
    { value: "uk", label: "United Kingdom" },
    { value: "canada", label: "Canada" },
    { value: "australia", label: "Australia" },
  ]

  const titleList = [
    { value: "bachelor", label: "Bachelor" },
    { value: "master", label: "Master" },
    { value: "doctor", label: "Doctor" },
  ]

  const majorList = [
    { value: "computer-science", label: "Computer Science" },
    { value: "business", label: "Business" },
    { value: "marketing", label: "Marketing" },
    { value: "design", label: "Design" },
  ]

  const yearList = [
    { value: "2024", label: "2024" },
    { value: "2023", label: "2023" },
    { value: "2022", label: "2022" },
    { value: "2021", label: "2021" },
  ]

  const experienceList = [
    { value: "0-1", label: "0-1" },
    { value: "2-4", label: "2-4" },
    { value: "5-7", label: "5-7" },
    { value: "8+", label: "8+" },
  ]

  // Local state for managing arrays
  const [skillsList, setSkillsList] = useState([])
  const [educationList, setEducationList] = useState([])
  const [certificationsList, setCertificationsList] = useState([])

  // Current input states
  const [currentSkill, setCurrentSkill] = useState(null)
  const [currentSkillLevel, setCurrentSkillLevel] = useState(null)
  const [currentEducation, setCurrentEducation] = useState({
    institution: null,
    country: null,
    title: null,
    major: null,
    year: null,
  })
  const [currentCertification, setCurrentCertification] = useState({
    name: "",
    from: "",
    year: null,
  })

  const {
    control,
    watch,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      professionalTitle: "",
      professionalSummary: "",
      categoryOfWork: "",
      skills: [],
      experience: "",
      education: [],
      certifications: [],
      personalWebsite: "",
      // occupation: "",
    },
  })

  const acknowledge = watch("acknowledge")

  const categoryoption = categoryData?.map(city => ({
    value: city.category,
    label: city.category
  })) || [];

  // Add functions
  const addSkill = () => {
    if (currentSkill && currentSkillLevel) {
      const newSkill = { skill: currentSkill.value, level: currentSkillLevel.value }
      const updatedSkills = [...skillsList, newSkill]
      setSkillsList(updatedSkills)
      setValue("skills", updatedSkills)
      setCurrentSkill(null)
      setCurrentSkillLevel(null)
    }
  }

  const removeSkill = (index) => {
    const updatedSkills = skillsList.filter((_, i) => i !== index)
    setSkillsList(updatedSkills)
    setValue("skills", updatedSkills)
  }

  const addEducation = () => {
    if (currentEducation.institution && currentEducation.country) {
      const newEducation = {
        institution: currentEducation.institution || "",
        country: currentEducation.country || "",
        title: currentEducation.title || "",
        major: currentEducation.major || "",
        year: currentEducation.year || "",
      }
      const updatedEducation = [...educationList, newEducation]
      setEducationList(updatedEducation)
      setValue("education", updatedEducation)
      setCurrentEducation({
        institution: null,
        country: null,
        title: null,
        major: null,
        year: null,
      })
    }
  }

  const removeEducation = (index) => {
    const updatedEducation = educationList.filter((_, i) => i !== index)
    setEducationList(updatedEducation)
    setValue("education", updatedEducation)
  }

  const addCertification = () => {
    if (currentCertification.name && currentCertification.from) {
      const newCertification = {
        name: currentCertification.name,
        from: currentCertification.from,
        year: currentCertification.year?.value || "",
      }
      const updatedCertifications = [...certificationsList, newCertification]
      setCertificationsList(updatedCertifications)
      setValue("certifications", updatedCertifications)
      setCurrentCertification({
        name: "",
        from: "",
        year: null,
      })
    }
  }

  const removeCertification = (index) => {
    const updatedCertifications = certificationsList.filter((_, i) => i !== index)
    setCertificationsList(updatedCertifications)
    setValue("certifications", updatedCertifications)
  }

  const { addProfile, isSuccess, isPending, isError, error } = useAddProfile()
  const userProfileDetail = useSelector(state => state.userProfile.userProfile)

  const onSubmit = (data) => {
    const formData = new FormData();
    let updateData = { ...data, ...userProfileDetail }
    let { files, portfolio_files } = updateData
    let file = base64ToFile(files[0]?.base64, files[0]?.name, files[0]?.type)
    formData.append("files", file);
    if (portfolio_files.length > 0) {
      for (const item of portfolio_files) {
        const file = base64ToFile(item.base64, item.name, item.type);
        formData.append("portfolio_files", file);
      }
    }
    for (const key in updateData) {
      if (key !== 'files' && key !== 'portfolio_files') {
        if (Array.isArray(updateData[key])) {
          formData.append(key, JSON.stringify(updateData[key]));
        }
        else {
          formData.append(key, updateData[key])
        }
      }
    }
    addProfile(formData)
    dispatch(resetUserProfile())
  };

  return (
    <div className="max-w-6xl mx-auto p-5">
      <ProgressBar currentStep={3} />

      <div className="flex flex-col md:flex-row justify-between md:items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold mb-3">Professional Info</h2>
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

        {/* Professional Title  */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div>
            <label className="block font-semibold text-lg mb-2">Professional Title *</label>
            <p className="text-sm text-gray-600 whitespace-pre-wrap">
              {"If you have a personal website, portfolio, or blog,\nadd the link here."}
            </p>
          </div>
          <Controller
            name="professionalTitle"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="text"
                placeholder="Professional Title Like: Full Stack Web Developer, Graphic Designer"
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            )}
          />
          {errors.professionalTitle && <p className="text-red-500 text-sm mt-2">{errors.professionalTitle.message}</p>}
        </div>

        <div className="grid grid-cols-2 gap-8 items-start">
          <div>
            <label htmlFor="professionalSummary" className="block font-semibold text-lg mb-2">
              Professional Summary / Bio *
            </label>
            <p className="text-sm text-gray-600">
              Briefly describe your experience, expertise, and what you offer.
            </p>
          </div>
          <div>
            <Controller
              name="professionalSummary"
              control={control}
              render={({ field }) => (
                <textarea
                  {...field}
                  id="professionalSummary"
                  placeholder="Tell clients about your skills and experience..."
                  rows={4}
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-cyan-500 resize-vertical"
                />
              )}
            />
            <p className="text-xs text-gray-600 mt-1">min. 50 characters</p>
            {errors.professionalSummary && (
              <p className="text-red-500 text-sm mt-2">
                {errors.professionalSummary.message}
              </p>
            )}
          </div>
        </div>

        {/* Primary Category of Work  */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div>
            <label className="block font-semibold text-lg mb-2">Primary Category of Work *</label>
          </div>
          <div>
            <Controller
              name="categoryOfWork"
              control={control}
              render={({ field }) => (
                <ReactSelect
                  placeholder={placeholderConfig.occupation}
                  value={categoryoption.find(option => option.value === field.value)}
                  onChange={(selected) => field.onChange(selected ? selected.value : "")}
                  option={categoryoption}
                />
              )}
            />
            {errors.categoryOfWork && <p className="text-red-500 text-sm mt-2">{errors.categoryOfWork.message}</p>}
          </div>
        </div>


        {/* Occupation */}
        {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div>
            <label className="block font-semibold text-lg mb-2">Your Occupation *</label>
          </div>
          <div>
            <Controller
              name="occupation"
              control={control}
              render={({ field }) => (
                <ReactSelect
                  placeholder={placeholderConfig.occupation}
                  value={occupationslist.find(option => option.value === field.value)}
                  onChange={(selected) => field.onChange(selected ? selected.value : "")}
                  option={occupationslist}
                />
              )}
            />
            {errors.occupation && <p className="text-red-500 text-sm mt-2">{errors.occupation.message}</p>}
          </div>
        </div> */}

        {/* Experience */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div>
            <label className="block font-semibold text-lg mb-2">Skills *</label>
            <p className="text-sm text-gray-600 whitespace-pre-wrap">
              {"List the skills related to the services you're offering\nand add your experience level."}
            </p>
          </div>
          <div>
            <div className="flex flex-col border p-3 rounded-lg border-gray-300 sm:flex-row gap-3 items-stretch sm:items-center mb-4">
              <ReactSelect
                placeholder={placeholderConfig.skill}
                value={currentSkill}
                onChange={setCurrentSkill}
                option={skillslist}
              />
              <ReactSelect
                placeholder={placeholderConfig.skillLevel}
                value={currentSkillLevel}
                onChange={setCurrentSkillLevel}
                option={skilllevellist}
              />
              <button
                type="button"
                onClick={addSkill}
                className="w-full sm:w-auto px-4 py-3 bg-[#01AEAD] text-white rounded hover:bg-cyan-600 transition-colors"
              >
                Add
              </button>
            </div>

            {skillsList.length > 0 && (
              <div className="space-y-2 mb-4">
                <h4 className="font-medium">Added Skills:</h4>
                {skillsList.map((skill, index) => (
                  <div key={index} className="flex justify-between items-center bg-gray-50 p-3 rounded">
                    <span>
                      {skill.skill} - {skill.level}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeSkill(index)}
                      className="text-red-500 hover:text-red-700 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}
            {errors.skills && <p className="text-red-500 text-sm mt-2">{errors.skills.message}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div>
            <label className="block font-semibold text-lg mb-2">Experience *</label>
          </div>
          <div>
            <Controller
              name="experience"
              control={control}
              render={({ field }) => (
                <ReactSelect
                  placeholder={placeholderConfig.occupation}
                  value={experienceList.find(option => option.value === field.value)}
                  onChange={(selected) => field.onChange(selected ? selected.value : "")}
                  option={experienceList}
                />
              )}
            />
            {errors.experience && <p className="text-red-500 text-sm mt-2">{errors.experience.message}</p>}
          </div>
        </div>

        {/* Education */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div>
            <label className="block font-semibold text-lg mb-2">Education</label>
            <p className="text-sm text-gray-600 whitespace-pre-wrap">
              {"Add any relevant education details that will help\ncustomers to get to know you better."}
            </p>
          </div>
          <div>
            <div className="space-y-3 border p-3 rounded-lg border-gray-300 mb-4">
              <div className="flex flex-col sm:flex-row gap-3">
                {/* <ReactSelect
                  placeholder={placeholderConfig.institution}
                  value={currentEducation.institution}
                  onChange={(selected) => setCurrentEducation({ ...currentEducation, institution: selected })}
                  option={institutionList}
                /> */}
                <input
                  type="text"
                  placeholder={placeholderConfig.institution}
                  value={currentEducation.institution || ""}
                  onChange={(e) =>
                    setCurrentEducation({ ...currentEducation, institution: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />

                {/* <ReactSelect
                  placeholder={placeholderConfig.country}
                  value={currentEducation.country}
                  onChange={(selected) => setCurrentEducation({ ...currentEducation, country: selected })}
                  option={countryList}
                /> */}
                <input
                  type="text"
                  placeholder={placeholderConfig.country}
                  value={currentEducation.country || ""}
                  onChange={(e) =>
                    setCurrentEducation({ ...currentEducation, country: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />

              </div>
              <div className="flex flex-col sm:flex-row gap-3 items-stretch">
                <input
                  type="text"
                  placeholder={placeholderConfig.title}
                  value={currentEducation.title || ""}
                  onChange={(e) =>
                    setCurrentEducation({ ...currentEducation, title: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />

                <input
                  type="text"
                  placeholder={placeholderConfig.major}
                  value={currentEducation.major || ""}
                  onChange={(e) =>
                    setCurrentEducation({ ...currentEducation, major: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />

                <input
                  type="text"
                  placeholder={placeholderConfig.year}
                  value={currentEducation.year || ""}
                  onChange={(e) =>
                    setCurrentEducation({ ...currentEducation, year: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />

                {/* <ReactSelect
                  placeholder={placeholderConfig.title}
                  value={currentEducation.title}
                  onChange={(selected) => setCurrentEducation({ ...currentEducation, title: selected })}
                  option={titleList}
                />
                <ReactSelect
                  placeholder={placeholderConfig.major}
                  value={currentEducation.major}
                  onChange={(selected) => setCurrentEducation({ ...currentEducation, major: selected })}
                  option={majorList}
                />
                <ReactSelect
                  placeholder={placeholderConfig.year}
                  value={currentEducation.year}
                  onChange={(selected) => setCurrentEducation({ ...currentEducation, year: selected })}
                  option={yearList}
                /> */}
                <button
                  type="button"
                  onClick={addEducation}
                  className="w-full sm:w-auto px-4 py-3 bg-[#01AEAD] text-white rounded hover:bg-cyan-600"
                >
                  Add
                </button>
              </div>
            </div>

            {educationList.length > 0 && (
              <div className="space-y-2 mb-4">
                <h4 className="font-medium">Added Education:</h4>
                {educationList.map((edu, index) => (
                  <div key={index} className="flex justify-between items-center bg-gray-50 p-3 rounded">
                    <span>
                      {edu.title} in {edu.major} from {edu.institution} ({edu.year})
                    </span>
                    <button
                      type="button"
                      onClick={() => removeEducation(index)}
                      className="text-red-500 hover:text-red-700 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}
            {errors.education && <p className="text-red-500 text-sm mt-2">{errors.education.message}</p>}
          </div>
        </div>

        {/* Certification */}
        {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div>
            <label className="block font-semibold text-lg mb-2">Certification</label>
            <p className="text-sm text-gray-600 whitespace-pre-wrap">
              {"Include any certificates or awards that are relevant to\nthe services you offer."}
            </p>
          </div>
          <div>
            <div className="flex w-full lg:w-xl flex-col sm:flex-row border p-3 rounded-lg border-gray-300 gap-2 mb-4">
              <Controller
                name="certificationName"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    placeholder={placeholderConfig.certificationName}
                    className=" sm:flex-1 p-3  lg:p-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    onChange={(e) => {
                      field.onChange(e)
                      setCurrentCertification({ ...currentCertification, name: e.target.value })
                    }}
                  />
                )}
              />
              <Controller
                name="certificationFrom"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    placeholder={placeholderConfig.certificationFrom}
                    className=" sm:flex-1  p-3 lg:p-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    onChange={(e) => {
                      field.onChange(e)
                      setCurrentCertification({ ...currentCertification, from: e.target.value })
                    }}
                  />
                )}
              />
              <ReactSelect
                placeholder={placeholderConfig.year}
                value={currentCertification.year}
                onChange={(selected) => setCurrentCertification({ ...currentCertification, year: selected })}
                option={yearList}
              />
              <button
                type="button"
                onClick={addCertification}
                className="w-full sm:w-auto px-4 py-3 bg-[#01AEAD] text-white rounded hover:bg-cyan-600"
              >
                Add
              </button>
            </div>

            {certificationsList.length > 0 && (
              <div className="space-y-2">
                <h4 className="font-medium">Added Certifications:</h4>
                {certificationsList.map((cert, index) => (
                  <div key={index} className="flex justify-between items-center bg-gray-50 p-3 rounded">
                    <span>
                      {cert.name} from {cert.from} ({cert.year})
                    </span>
                    <button
                      type="button"
                      onClick={() => removeCertification(index)}
                      className="text-red-500 hover:text-red-700 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div> */}

        {/* Personal Website */}
        {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div>
            <label className="block font-semibold text-lg mb-2">Personal Website</label>
            <p className="text-sm text-gray-600 whitespace-pre-wrap">
              {"If you have a personal website, portfolio, or blog,\nadd the link here."}
            </p>
          </div>
          <div className="border p-3 border-gray-300 rounded-lg">
            <Controller
              name="personalWebsite"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  placeholder={placeholderConfig.personalWebsite}
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              )}
            />
            {errors.personalWebsite && <p className="text-red-500 text-sm mt-2">{errors.personalWebsite.message}</p>}
          </div>
        </div> */}

        {/* Acknowledgement */}
        <div>
          <label className="flex items-start gap-3 p-4 border-2 border-gray-200 rounded-2xl cursor-pointer hover:bg-gray-50 transition-all">
            <input
              type="checkbox"
              {...register('acknowledge')}
              className="mt-1 w-5 h-5 text-blue-500 rounded cursor-pointer"
            />
            <div>
              <p className="text-sm text-gray-900">
                I confirm that this proposal represents my original work and aligns with <span className="font-semibold">ICCD Talent Gate's guidelines</span>.
              </p>
              <p className="text-xs text-gray-500 mt-1">Please read our terms of service before submitting.</p>
            </div>
          </label>
          {errors.acknowledgment && <p className="text-red-500 text-sm">{errors.acknowledgment.message}</p>}
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isPending || !acknowledge}
            className={`flex items-center gap-2 px-6 py-3 text-white rounded transition-colors
            ${(isPending || !acknowledge)
                ? 'bg-[#01aeae97] cursor-not-allowed'
                : 'bg-[#01AEAD] hover:bg-cyan-600'}`}
          >
            Submit
          </button>

        </div>
      </form>
    </div>
  )
}