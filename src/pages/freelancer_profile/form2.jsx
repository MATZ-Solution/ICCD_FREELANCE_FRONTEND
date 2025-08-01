
import { useForm, Controller } from "react-hook-form"
import * as Yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { ArrowRight } from "lucide-react"
import { useState } from "react"
import Select from 'react-select'
import ReactSelect from "../../component/buttonSelect"
import { useSelector } from "react-redux"
import { useAddProfile } from "../../../api/client/freelancer"
import { useDispatch } from "react-redux"
import { resetUserProfile } from "../../../redux/slices/userProfileSlice"
import { base64ToFile } from "../../../functions/base64FileConversion"

const validationSchema = Yup.object({
  occupation: Yup.string().required("Occupation is required"),
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
  certifications: Yup.array().of(
    Yup.object({
      name: Yup.string().required("Certificate name is required"),
      from: Yup.string().required("Certified from is required"),
      year: Yup.string(),
    }),
  ),
  personalWebsite: Yup.string().url("Must be a valid URL").nullable(),
})

const defaultPlaceholderConfig = {
  occupation: "Select your occupation",
  skill: "Select a skill",
  skillLevel: "Select skill level",
  institution: "Select institution",
  country: " country",
  title: " title",
  major: "major",
  year: " year",
  certificationName: "certificate name",
  certificationFrom: "certified from",
  personalWebsite: "Provide a link to your professional website",
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
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      occupation: "",
      skills: [],
      education: [],
      certifications: [],
      personalWebsite: "",
    },
  })

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
        institution: currentEducation.institution?.value || "",
        country: currentEducation.country?.value || "",
        title: currentEducation.title?.value || "",
        major: currentEducation.major?.value || "",
        year: currentEducation.year?.value || "",
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
    let { files } = updateData
    let file = base64ToFile(files[0]?.base64, files[0]?.name, files[0]?.type)
    formData.append("files", file);
    for (const key in updateData) {
      if (key !== 'files') {
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
          <div className="mb-8">
        <div className="bg-gray-300 my-6 h-px w-full"></div>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0 md:space-x-3 mb-5">
          <div className="flex flex-wrap items-center gap-3">
            {[1, 2].map((step) => (
              <div key={step} className="flex items-center gap-1">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 2
                    ? "bg-[#01AEAD] text-white" // active green step 1
                    : "border border-gray-300 bg-white text-gray-300" // inactive steps 2 & 3
                    }`}
                >
                  {step}
                </div>
                <span
                  className={`${step === 2 ? "text-[#01AEAD]" : "text-gray-600"
                    }`}
                >
                  {step === 1
                    ? "Personal Info"
                    : "Professional Info"
                  }
                </span>
              </div>
            ))}

          </div>
          <div className="w-full md:w-auto">
            <div className="text-gray-500 text-sm md:text-base mb-2 md:mb-0">
              Completion Rate: 100%
            </div>
            <div className="h-2 w-full bg-gray-200 rounded overflow-hidden">
              <div className="h-full bg-[#01AEAD] rounded" style={{ width: "100%" }}></div>
            </div>
          </div>
        </div>
        <div className="bg-gray-300 my-6 h-px w-full"></div>
      </div>

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
        {/* Occupation */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
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
        </div>

        {/* Skills */}
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
                <ReactSelect
                  placeholder={placeholderConfig.institution}
                  value={currentEducation.institution}
                  onChange={(selected) => setCurrentEducation({ ...currentEducation, institution: selected })}
                  option={institutionList}
                />
                <ReactSelect
                  placeholder={placeholderConfig.country}
                  value={currentEducation.country}
                  onChange={(selected) => setCurrentEducation({ ...currentEducation, country: selected })}
                  option={countryList}
                />
              </div>
              <div className="flex flex-col sm:flex-row gap-3 items-stretch">
                <ReactSelect
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
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
        </div>

        {/* Personal Website */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
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
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            disabled={isPending ? true : false}
            type="submit"
            className={`flex items-center gap-2 px-6 py-3  text-white rounded  transition-colors
              ${isPending ? 'bg-[#01aeae97]' : 'bg-[#01AEAD] hover:bg-cyan-600'}`}
          >
            Submit 
          </button>
        </div>
      </form>
    </div>
  )
}