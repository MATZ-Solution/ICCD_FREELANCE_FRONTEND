import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setToken } from "../../utils/auth";
import { setUserDetails } from "../../redux/slices/userSlice";
import { setUserType } from "../../redux/slices/userType";
import ICCDLoader from './loader';

const GoogleCallback = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");

    if (token) {
      // Optionally, decode token to get user info
      const payload = JSON.parse(atob(token.split(".")[1]));
      const user = { id: payload.userId, email: payload.email };

      // Save JWT
      setToken(token);

      // Save user in Redux
      dispatch(setUserDetails(user));
      dispatch(setUserType({ id: user.id, type: "client" }));

      // Redirect
      navigate("/client");
    } else {
      // If no token, redirect to login
      navigate("/login");
    }
  }, [location.search]);

  return <ICCDLoader/>;
};

export default GoogleCallback;
