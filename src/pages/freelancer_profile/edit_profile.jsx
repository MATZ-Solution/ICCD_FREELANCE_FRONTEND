import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import ProfileHeader from "../../component/freelancer_profile/ProfileHeader";
import AboutSection from "../../component/freelancer_profile/AboutSection";
import EducationSection from "../../component/freelancer_profile/EducationSection";
import CertificationsSection from "../../component/freelancer_profile/CertificationsSection";
import SkillsSection from "../../component/freelancer_profile/SkillsSection";
import QuickLinksSidebar from "../../component/freelancer_profile/QuickLinksSidebar";
import SidebarForm from "../../component/freelancer_profile/SidebarForm";
import { useEditProfile, useGetFreelancerProfile } from "../../../api/client/freelancer";
import { useDispatch, useSelector } from "react-redux";
import { setUserProfile } from "../../../redux/slices/userProfileSlice";
// Validation Schemas
const educationSchema = yup.object().shape({
  country: yup.string().required("Country is required"),
  universityName: yup.string().required("University name is required"),
  degree: yup.string().required("Degree is required"),
  major: yup.string().required("Major is required"),
  graduationYear: yup.string().required("Graduation year is required"),
});

const certificationSchema = yup.object().shape({
  name: yup.string().required("Certification name is required"),
  organization: yup.string().required("Issuing organization is required"),
  issueDate: yup.string().required("Issue date is required"),
});

const skillSchema = yup.object().shape({
  skillName: yup.string().required("Skill name is required"),
  level: yup.string().required("Skill level is required"),
});

const profileSchema = yup.object().shape({
  name: yup.string().required("Name is required").min(2, "Name must be at least 2 characters"),
  email: yup.string().required("email is required").min(3, "email must be at least 3 characters"),
});

const languagesSchema = yup.object().shape({
  languages: yup.array().of(yup.string()).min(1, "At least one language is required"),
  newLanguage: yup.string(),
});

const aboutSchema = yup.object().shape({
  about_tagline: yup.string().required("about_tagline is required").max(100, "about_tagline must be less than 100 characters"),
  about_description: yup.string().required("about_Description is required").min(50, "about_Description must be at least 50 characters"),
});

const FreelancerEditProfile = () => {

  const dispatch = useDispatch()
  const profileDetails = useSelector(state=> state.userProfile.userProfile)
  const [freelancerId, setFreelancerId] = useState('');
  const { data, isSuccess, isPending, isError, isLoading } = useGetFreelancerProfile()
  const { editProfile, isSuccess: editProfileSuccess, isPending: editProfilePending, isError: editProfileIsErr, error: editProfileErr } = useEditProfile(freelancerId)


  const [skillsList, setSkillsList] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [educationList, setEducationList] = useState([]);
  const [profileData, setProfileData] = useState({
    name: data ? data[0]?.firstName : '',
    email: data ? data[0]?.email : '',
    about_tagline: data ? data[0]?.about_tagline : '',
    about_description: data ? data[0]?.about_description : ''
  });


useEffect(() => {
  if (data &&  data.length > 0) {
    dispatch(setUserProfile(data[0]));
  }
}, [data]);


  const [certificationList, setCertificationList] = useState([]);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarType, setSidebarType] = useState(null);

  // Form Hooks
  const educationForm = useForm({ resolver: yupResolver(educationSchema), defaultValues: { country: "", universityName: "", degree: "", major: "", graduationYear: "" } });
  const certificationForm = useForm({ resolver: yupResolver(certificationSchema), defaultValues: { name: "", organization: "", issueDate: "" } });
  const skillForm = useForm({ resolver: yupResolver(skillSchema), defaultValues: { skillName: "", level: "" } });
  const profileForm = useForm({ resolver: yupResolver(profileSchema), defaultValues: { name: profileData[0]?.name, email: profileData[0]?.email } });
  const languagesForm = useForm({ resolver: yupResolver(languagesSchema), defaultValues: { languages, newLanguage: "" } });
  const aboutForm = useForm({ resolver: yupResolver(aboutSchema), defaultValues: { about_tagline: profileData.about_tagline, about_description: profileData.about_description } });

  // Handlers
  const openSidebar = (type) => {
    setSidebarType(type);
    setSidebarOpen(true);
    if (type === "profile") profileForm.reset({ name: profileData.name, email: profileData.email });
    else if (type === "languages") languagesForm.reset({ languages, newLanguage: "" });
    else if (type === "about") aboutForm.reset({ about_tagline: profileData.about_tagline, about_description: profileData.about_description });
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
    setSidebarType(null);
    educationForm.reset();
    certificationForm.reset();
    skillForm.reset();
    profileForm.reset();
    languagesForm.reset();
    aboutForm.reset();
  };

  const onEducationSubmit = (data) => {
    const newData = {
      id: Date.now(),
      degree: data.degree,
      major: data.major,
      institution: data.universityName,
      location: data.country,
      year: data.graduationYear,
    };
    setEducationList((prev) => [...prev, newData]);
    educationForm.reset();
    alert("Education added successfully!");
  };


  const onCertificationSubmit = (data) => {
    const newData = {
      id: Date.now(),
      name: data.name,
      organization: data.organization,
      issueDate: data.issueDate,
    };

    setCertificationList((prev) => [...prev, newData]);
    certificationForm.reset();
    alert("Certification added successfully!");
  };

  const onSkillSubmit = (data) => {
    const newData = {
      id: Date.now(),
      name: data.skillName,
      level: data.level,
    };
    setSkillsList((prev) => [...prev, newData]);
    skillForm.reset();
    alert("Skill added successfully!");
  };

  const onProfileSubmit = (data) => {
    // console.log("data: ", data)
    // setProfileData((prev) => ({ ...prev, name: data.name, email: data.email,about_tagline: data.about_tagline }));
    // addProfile(data)
    closeSidebar();
    alert("Profile updated successfully!");
  };

  const onLanguagesSubmit = (data) => {
    let { languages } = data
    let form = new FormData()
    form.append('languages', JSON.stringify(languages))
    editProfile(form)
    closeSidebar();
    alert("Languages updated successfully!");
  };

  const onAboutSubmit = (data) => {
    const form = new FormData()
    form.append('about_tagline', data.about_tagline)
    form.append('about_description', data.about_description)
    // addProfile(form)
    closeSidebar();
    alert("About section updated successfully!");
  };

  const removeEducation = (id) => {
    setEducationList((prev) => prev.filter((edu) => edu.id !== id));
  };

  const removeCertification = (id) => {
    setCertificationList((prev) => prev.filter((cert) => cert.id !== id));
  };

  const removeSkill = (id) => {
    console.log("Removing skill with id:", id);
    setSkillsList((prev) => prev.filter((skill) => skill.id !== id));
  };

  const addLanguage = (newLanguage) => {
    if (newLanguage && !languages.includes(newLanguage)) {
      const updatedLanguages = [...languages, newLanguage];
      setLanguages(updatedLanguages);
      languagesForm.setValue("languages", updatedLanguages);
      languagesForm.setValue("newLanguage", "");
    }
  };

  const removeLanguage = (languageToRemove) => {
    const updatedLanguages = languages.filter((lang) => lang !== languageToRemove);
    setLanguages(updatedLanguages);
    languagesForm.setValue("languages", updatedLanguages);
  };


  return (
    <div className="max-w-7xl mx-auto px-4 py-6 relative">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {data && <ProfileHeader profileData={data} languages={languages} openSidebar={openSidebar} />}
          <AboutSection profileData={profileData} skillsList={skillsList} openSidebar={openSidebar} />
          <EducationSection educationList={educationList} removeEducation={removeEducation} openSidebar={openSidebar} />
          <CertificationsSection certificationList={certificationList} removeCertification={removeCertification} openSidebar={openSidebar} />
          <SkillsSection skillsList={skillsList} removeSkill={removeSkill} openSidebar={openSidebar} />
        </div>
        <QuickLinksSidebar
          educationList={educationList}
          certificationList={certificationList}
          skillsList={skillsList}
          languages={languages}
          openSidebar={openSidebar}
        />
      </div>
      {sidebarOpen && <div className="fixed inset-0 backdrop-blur bg-black/30 bg-opacity-70 z-40" onClick={closeSidebar} />}
      <SidebarForm
        isOpen={sidebarOpen}
        type={sidebarType}
        closeSidebar={closeSidebar}
        forms={{ educationForm, certificationForm, skillForm, profileForm, languagesForm, aboutForm }}
        handlers={{
          onEducationSubmit,
          onCertificationSubmit,
          onSkillSubmit,
          onProfileSubmit,
          onLanguagesSubmit,
          onAboutSubmit,
          addLanguage,
          removeLanguage,
        }}
      />
    </div>
  );
};

export default FreelancerEditProfile;