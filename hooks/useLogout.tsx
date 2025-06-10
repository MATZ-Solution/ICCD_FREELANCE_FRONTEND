import { useDispatch } from "react-redux";
import { removeUserDetails } from "../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";

const useLogout = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate()

    const logout = () => {
        localStorage.removeItem("token");
        dispatch(removeUserDetails());
        navigate('/login')
    };

    return logout;
};

export default useLogout;
