import { X } from "lucide-react";
import ProfileForm from "./ProfileForm";
import LanguagesForm from "./LanguagesForm";
import AboutForm from "./AboutForm";
import EducationForm from "./EducationForm";
import CertificationsForm from "./CertificationsForm";
import SkillsForm from "./SkillsForm";

const SidebarForm = ({ isOpen, type, closeSidebar, forms, handlers }) => {
  if (!isOpen) return null;
  console.log("forms: ", forms)

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
        {type === "profile" && <ProfileForm form={forms.profileForm} onSubmit={handlers.onProfileSubmit} />}
        {type === "languages" && (
          <LanguagesForm
            form={forms.languagesForm}
            onSubmit={handlers.onLanguagesSubmit}
            addLanguage={handlers.addLanguage}
            removeLanguage={handlers.removeLanguage}
          />
        )}
        {type === "about" && <AboutForm form={forms.aboutForm} onSubmit={handlers.onAboutSubmit} />}
        {type === "education" && <EducationForm form={forms.educationForm} onSubmit={handlers.onEducationSubmit} />}
        {type === "certifications" && <CertificationsForm form={forms.certificationForm} onSubmit={handlers.onCertificationSubmit} />}
        {type === "skills" && <SkillsForm form={forms.skillForm} onSubmit={handlers.onSkillSubmit} />}
      </div>
    </div>
  );
};

export default SidebarForm;