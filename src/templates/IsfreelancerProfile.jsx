import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ICCDLoader from "../component/loader";
import { useCheckFreelancer } from "../../api/client/freelancer";

function IsFreelancerProfile({ children }) {
    
  const navigate = useNavigate();

  const { data, isLoading, isError } = useCheckFreelancer();

  useEffect(() => {
    if (!isLoading && data?.length === 0) {
      navigate("/freelancer/profile-form/1", { replace: true });
    }
  }, [data, isLoading, navigate]);

  if (isLoading) return <ICCDLoader />;

  if (isError) {
    return <p>Something went wrong. Please try again.</p>;
  }

  // If profile exists, allow access
  if (data?.length > 0) {
    return <>{children}</>;
  }

  return null;
}

export default IsFreelancerProfile;
