import { useDispatch } from "react-redux";
import { removeUserDetails } from "../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";
import { resetUserProfile } from "../redux/slices/userProfileSlice";
import { resetUserType } from "../redux/slices/userType";

const useLogout = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate()

    const logout = () => {
        localStorage.removeItem("token");
        dispatch(removeUserDetails());
        dispatch(resetUserProfile())
        dispatch(resetUserType())
        navigate('/')
    };

    return logout;
};

export default useLogout;
