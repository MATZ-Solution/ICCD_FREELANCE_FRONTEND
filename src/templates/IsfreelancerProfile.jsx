import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ICCDLoader from '../component/loader';

function IsFreelancerProfile({ children }) {

    const navigate = useNavigate();
    const freelancer = useSelector(state => state.userProfile.userProfile);
    useEffect(() => {
        if (!freelancer?.id) {
            navigate('/freelancer/profile-form/1');
        }
    }, [freelancer, navigate]);
    return <>{children}</>;
}

export default IsFreelancerProfile;
