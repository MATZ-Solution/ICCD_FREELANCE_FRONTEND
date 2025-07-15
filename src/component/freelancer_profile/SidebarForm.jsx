import { X } from "lucide-react";
import ProfileForm from "./ProfileForm";
import LanguagesForm from "./LanguagesForm";
import AboutForm from "./AboutForm";
import EducationForm from "./EducationForm";
import CertificationsForm from "./CertificationsForm";
import SkillsForm from "./SkillsForm";

const SidebarForm = ({ isOpen, type, closeSidebar,  }) => {
  if (!isOpen) return null;

  const titles = {
    education: "Education",
    certifications: "Certifications",
    skills: "Skills and Expertise",
    profile: "Edit Profile",
    languages: "Languages",
    about: "About Me",
  };

  return (
    <div className="fixed right-0 top-0 h-full w-96 bg-white shadow-xl z-50 overflow-y-auto">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">{titles[type]}</h2>
          <button onClick={closeSidebar} className="p-1 hover:bg-gray-100 rounded">
            <X className="w-5 h-5" />
          </button>
        </div>
        {type === "profile" && <ProfileForm  />}
        {type === "languages" && ( <LanguagesForm /> )}
        {type === "about" && <AboutForm  />}
        {type === "education" && <EducationForm  />}
        {type === "certifications" && <CertificationsForm />}
        {type === "skills" && <SkillsForm />}
      </div>
    </div>
  );
};

export default SidebarForm;