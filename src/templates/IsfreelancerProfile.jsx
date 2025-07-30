import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ICCDLoader from '../component/loader';
import { useLocation } from 'react-router-dom';

function IsFreelancerProfile({ children }) {

    const navigate = useNavigate();
    const pathName = useLocation().pathname
    const freelancer = useSelector(state => state.userProfile.userProfile);

    useEffect(() => {
        console.log("is freelancer profile useEffect is called!")
        if (!freelancer?.id) {  
           navigate('/freelancer/profile-form/1');  
        }
    }, [navigate]);
    return <>{children}</>;
}

export default IsFreelancerProfile;
