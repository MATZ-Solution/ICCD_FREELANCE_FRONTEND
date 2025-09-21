import { useState, useEffect } from "react";
import ProfileHeader from "../../component/freelancer_profile/ProfileHeader";
import AboutSection from "../../component/freelancer_profile/AboutSection";
import EducationSection from "../../component/freelancer_profile/EducationSection";
import CertificationsSection from "../../component/freelancer_profile/CertificationsSection";
import SkillsSection from "../../component/freelancer_profile/SkillsSection";
import QuickLinksSidebar from "../../component/freelancer_profile/QuickLinksSidebar";
import SidebarForm from "../../component/freelancer_profile/SidebarForm";
import { useEditProfile, useGetFreelancerProfile } from "../../../api/client/freelancer";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile } from "../../../redux/slices/userProfileSlice";
import Button from "../../component/button";
import ICCDError from "../../component/ICCDError";
import ICCDLoader from "../../component/loader";
// import { toast } from "react-toastify";

const FreelancerEditProfile = () => {

  const dispatch = useDispatch()
  const profileDetails = useSelector(state => state.userProfile.userProfile)
  const { editProfile, isSuccess: isSuccProfile, isPending: isPendProfile, isError: isErrProfile, error } = useEditProfile(profileDetails.id)



  console.log(editProfile)
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

  // const handleSaveChanges = () => {

  //   const formData = new FormData();
  //   for (const key in profileDetails) {
  //     if (key === 'files') {
  //       updateData.files.forEach((file) => {
  //         formData.append("files", file);
  //       });
  //     }
  //     else if (Array.isArray(profileDetails[key])) {
  //       formData.append(key, JSON.stringify(profileDetails[key]));
  //     }
  //     else {
  //       formData.append(key, profileDetails[key])
  //     }
  //   }
  //   editProfile(formData)
  // }

    const handleSaveChanges = async () => {
  const formData = new FormData();
  
  for (const key in profileDetails) {
    if (key === "files") {
      updateData.files.forEach((file) => {
        formData.append("files", file);
      });
    } else if (Array.isArray(profileDetails[key])) {
      formData.append(key, JSON.stringify(profileDetails[key]));
    } else {
      formData.append(key, profileDetails[key]);
    }
  }

  try {
    // console.log("data: ", data)
    await editProfile(formData); // mutation
    // toast.success("Profile updated successfully!");
  } catch (error) {
    // toast.error("Failed to update profile.");
    console.error("Error updating profile:", error);
  }
};


  const { data, isSuccess, isPending, isError, isLoading } = useGetFreelancerProfile()

  useEffect(() => {
    if (data && data.length > 0) {
      dispatch(getUserProfile(data[0]));
    }
  }, [data]);

  if (isLoading || isPending) {
    return <ICCDLoader />;
  }
  if (isError || isErrProfile ) {
    return <ICCDError message={error} />;
  }
  return (
    <div className="max-w-7xl mx-auto px-4 py-6 relative">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <ProfileHeader  />
          {/* <ProfileHeader openSidebar={openSidebar} /> */}
          <AboutSection openSidebar={openSidebar} />
          <EducationSection openSidebar={openSidebar} />
          <CertificationsSection openSidebar={openSidebar} />
          <SkillsSection openSidebar={openSidebar} />
          <Button onClick={handleSaveChanges} className="px-6 py-3">Save Changes</Button>
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