import api from "../axios";
import API_ROUTE from "../endpoints";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";

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

export function useEditProfile() {
  const queryClient = useQueryClient();

  const {
    mutate: addProfile,
    isSuccess,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: async (data) =>
      await api.put(`${API_ROUTE.freelancer.editProfile}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: api.defaults.headers.common["Authorization"],
        },
        timeout: 30000,
      }),
    onSuccess: (data) => {
      alert("Profile added successfully!");
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
