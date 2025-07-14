import { useDispatch } from "react-redux";
import api from "../axios";
import API_ROUTE from "../endpoints";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { setFreelancerID } from "../../redux/slices/userSlice";

export function useGetFreelancerProfile() {
  const { data, isSuccess, isPending, isError, isLoading } = useQuery({
    queryKey: [API_ROUTE.freelancer.getFreelancerProfile],
    queryFn: async () =>
      await api.get(`${API_ROUTE.freelancer.getFreelancerProfile}`),
    // refetchOnWindowFocus: true,
    // staleTime: 0,
    // refetchOnMount: true,
  });
  return {
    data: data?.data?.data,
    isSuccess,
    isPending,
    isError,
    isLoading,
  };
}

export function useAddProfile() {
  const queryClient = useQueryClient();
  const dispatch = useDispatch()
  const {
    mutate: addProfile,
    isSuccess,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: async (data) =>
      await api.post(`${API_ROUTE.freelancer.addProfile}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: api.defaults.headers.common["Authorization"],
        },
        timeout: 30000,
      }),
    onSuccess: (data, res) => {
      alert("Profile added successfully!");
      dispatch(setFreelancerID(data?.data?.freelancerId))
      queryClient.invalidateQueries({
        queryKey: [API_ROUTE.freelancer.getFreelancerProfile],
      });
    },
    onError: (error) => {
      // Toast.show({
      //     type: "error",
      //     text1: "Error",
      //     text2: "Failed to edit scout",
      // });
    },
  });
  return { addProfile, isSuccess, isPending, isError, error };
}

export function useEditProfile(freelancerId) {
  const queryClient = useQueryClient();
  const dispatch = useDispatch()
  const {
    mutate: editProfile,
    isSuccess,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: async (data) =>
      await api.put(`${API_ROUTE.freelancer.editProfile}/${freelancerId}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: api.defaults.headers.common["Authorization"],
        },
        timeout: 30000,
      }),
    onSuccess: (data, res) => {
      alert("Profile edit successfully!");
      queryClient.invalidateQueries({
        queryKey: [API_ROUTE.freelancer.getFreelancerProfile],
      });
    },
    onError: (error) => {
      // Toast.show({
      //     type: "error",
      //     text1: "Error",
      //     text2: "Failed to edit scout",
      // });
    },
  });
  return { editProfile, isSuccess, isPending, isError, error };
}
