import { useState } from "react";
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
  username: yup.string().required("Username is required").min(3, "Username must be at least 3 characters"),
});

const languagesSchema = yup.object().shape({
  languages: yup.array().of(yup.string()).min(1, "At least one language is required"),
  newLanguage: yup.string(),
});

const aboutSchema = yup.object().shape({
  tagline: yup.string().required("Tagline is required").max(100, "Tagline must be less than 100 characters"),
  description: yup.string().required("Description is required").min(50, "Description must be at least 50 characters"),
});

const FreelancerEditProfile = () => {
  console.log("FreelancerUserProfile component rendered");

  // State
  const [profileData, setProfileData] = useState({
    name: "Syed Mohiuddin",
    username: "syedmohiuddin",
    tagline: "Transforming ideas into powerful web experiences.",
    description:
      "I'm a passionate and self-driven full-stack web developer based in Karachi, Pakistan, with over a year of experience building modern, responsive, and scalable web applications. Since the 9th grade, I've been fascinated by how websites and digital products are created. That curiosity has evolved into strong technical skills and a growing portfolio, including multiple personal and client projects ranging from admin dashboards to e-commerce and affiliate platforms.",
  });

  const [languages, setLanguages] = useState(["English", "Urdu", "French"]);
  const [educationList, setEducationList] = useState([
    {
      id: 1,
      degree: "B.Sc.",
      major: "computer science",
      institution: "Karachi School of Business And Leadership",
      location: "Pakistan",
      year: "2027",
    },
  ]);
  const [certificationList, setCertificationList] = useState([]);
  const [skillsList, setSkillsList] = useState([
    { id: 1, name: "Next Js", level: "expert" },
    { id: 2, name: "React Js", level: "expert" },
    { id: 3, name: "Node Js", level: "expert" },
    { id: 4, name: "Express", level: "expert" },
    { id: 5, name: "JavaScript", level: "expert" },
    { id: 6, name: "TypeScript", level: "expert" },
  ]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarType, setSidebarType] = useState(null);

  // Form Hooks
  const educationForm = useForm({ resolver: yupResolver(educationSchema), defaultValues: { country: "", universityName: "", degree: "", major: "", graduationYear: "" } });
  const certificationForm = useForm({ resolver: yupResolver(certificationSchema), defaultValues: { name: "", organization: "", issueDate: "" } });
  const skillForm = useForm({ resolver: yupResolver(skillSchema), defaultValues: { skillName: "", level: "" } });
  const profileForm = useForm({ resolver: yupResolver(profileSchema), defaultValues: { name: profileData.name, username: profileData.username } });
  const languagesForm = useForm({ resolver: yupResolver(languagesSchema), defaultValues: { languages, newLanguage: "" } });
  const aboutForm = useForm({ resolver: yupResolver(aboutSchema), defaultValues: { tagline: profileData.tagline, description: profileData.description } });

  // Handlers
  const openSidebar = (type) => {
    console.log(`Opening sidebar for: ${type}`);
    setSidebarType(type);
    setSidebarOpen(true);
    if (type === "profile") profileForm.reset({ name: profileData.name, username: profileData.username });
    else if (type === "languages") languagesForm.reset({ languages, newLanguage: "" });
    else if (type === "about") aboutForm.reset({ tagline: profileData.tagline, description: profileData.description });
  };

  const closeSidebar = () => {
    console.log("Closing sidebar");
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

  console.log("Education ===>", newData);

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
    console.log("Certification ===>", newData);

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
    console.log("Skill form submitted:", newData);
    setSkillsList((prev) => [...prev, newData]);
    skillForm.reset();
    alert("Skill added successfully!");
  };

  const onProfileSubmit = (data) => {
    console.log("Profile form state before submission:", profileForm.watch()); // Debug log
    console.log("Profile form submitted:", data);
    setProfileData((prev) => ({ ...prev, name: data.name, username: data.username }));
    closeSidebar();
    alert("Profile updated successfully!");
  };

  const onLanguagesSubmit = (data) => {
    console.log("Languages form state before submission:", languagesForm.watch()); // Debug log
    console.log("Languages form submitted:", data);
    setLanguages(data.languages || []);
    closeSidebar();
    alert("Languages updated successfully!");
  };

  const onAboutSubmit = (data) => {
    console.log("About form state before submission:", aboutForm.watch()); // Debug log
    console.log("About form submitted:", data);
    setProfileData((prev) => ({ ...prev, tagline: data.tagline, description: data.description }));
    closeSidebar();
    alert("About section updated successfully!");
  };

  const removeEducation = (id) => {
    console.log("Removing education with id:", id);
    setEducationList((prev) => prev.filter((edu) => edu.id !== id));
  };

  const removeCertification = (id) => {
    console.log("Removing certification with id:", id);
    setCertificationList((prev) => prev.filter((cert) => cert.id !== id));
  };

  const removeSkill = (id) => {
    console.log("Removing skill with id:", id);
    setSkillsList((prev) => prev.filter((skill) => skill.id !== id));
  };

  const addLanguage = (newLanguage) => {
    console.log("Adding language:", newLanguage);
    if (newLanguage && !languages.includes(newLanguage)) {
      const updatedLanguages = [...languages, newLanguage];
      setLanguages(updatedLanguages);
      languagesForm.setValue("languages", updatedLanguages);
      languagesForm.setValue("newLanguage", "");
    }
  };

  const removeLanguage = (languageToRemove) => {
    console.log("Removing language:", languageToRemove);
    const updatedLanguages = languages.filter((lang) => lang !== languageToRemove);
    setLanguages(updatedLanguages);
    languagesForm.setValue("languages", updatedLanguages);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 relative">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <ProfileHeader profileData={profileData} languages={languages} openSidebar={openSidebar} />
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