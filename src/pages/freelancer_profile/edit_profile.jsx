import { useState, useEffect } from "react";
import ProfileHeader from "../../component/freelancer_profile/ProfileHeader";
import AboutSection from "../../component/freelancer_profile/AboutSection";
import EducationSection from "../../component/freelancer_profile/EducationSection";
import CertificationsSection from "../../component/freelancer_profile/CertificationsSection";
import SkillsSection from "../../component/freelancer_profile/SkillsSection";
import QuickLinksSidebar from "../../component/freelancer_profile/QuickLinksSidebar";
import SidebarForm from "../../component/freelancer_profile/SidebarForm";
import { useGetFreelancerProfile } from "../../../api/client/freelancer";
import { useDispatch } from "react-redux";
import { getUserProfile } from "../../../redux/slices/userProfileSlice";


const FreelancerEditProfile = () => {

  const dispatch = useDispatch()
  const { data, isSuccess, isPending, isError, isLoading } = useGetFreelancerProfile()

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarType, setSidebarType] = useState(null);

  const openSidebar = (type) => {
    setSidebarType(type);
    setSidebarOpen(true);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
    setSidebarType(null);
  };

  useEffect(() => {
    if (data) {
      dispatch(getUserProfile(data));
    }
  }, [data]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 relative">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <ProfileHeader openSidebar={openSidebar} />
          <AboutSection openSidebar={openSidebar} />
          <EducationSection openSidebar={openSidebar} />
          <CertificationsSection openSidebar={openSidebar} />
          <SkillsSection openSidebar={openSidebar} />
        </div>
        <QuickLinksSidebar openSidebar={openSidebar} />
      </div>
      {sidebarOpen && <div className="fixed inset-0 backdrop-blur bg-black/30 bg-opacity-70 z-40" onClick={closeSidebar} />}
      <SidebarForm
        isOpen={sidebarOpen}
        type={sidebarType}
        closeSidebar={closeSidebar}
      />
    </div>
  );
};

export default FreelancerEditProfile;