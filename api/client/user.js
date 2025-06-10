import API_ROUTE from "../endpoints";
import { useQuery, useMutation } from "@tanstack/react-query";
import api from "../axios/index";
import { setToken } from "../../utils/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserDetails } from "../../redux/slices/userSlice";

export function useCheck() {
  const { data, error, isSuccess, isPending, isError } = useQuery({
    queryKey: [API_ROUTE.user.checkapi],
    queryFn: () => api.get(API_ROUTE.user.checkapi),
  });
  return {
    data: data?.data,
    error,
    isSuccess,
    isPending,
    isError,
  };
}

export function useLogin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    mutate: userLogin,
    isSuccess,
    isPending,
    isError,
    reset,
    error,
    data,
  } = useMutation({
    mutationFn: (data) => api.post(API_ROUTE.user.login, data),
    onSuccess: (response) => {
        
      setToken(response?.data?.token);
      dispatch(setUserDetails(response?.data?.data));
      navigate("/dashboard");
    },
    onError: (response) => {
      console.log("response: ", response);
    },
  });

  return {
    userLogin,
    isSuccess,
    isPending,
    isError,
    reset,
    error,
    data,
  };
}
