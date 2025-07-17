import API_ROUTE from "../endpoints";
import { useMutation } from "@tanstack/react-query";
import api from "../axios/index";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";

export function useAddGigs() {
  // const pathname = usePathname();
  const queryClient = useQueryClient();
  // const { dispatch } = useGlobalState();

  const {
    mutate: addGigs,
    isSuccess,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: async (data) =>
      await api.post(`${API_ROUTE.gigs.addGigs}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: api.defaults.headers.common["Authorization"],
        },
        timeout: 30000,
      }),
    onSuccess: (data) => {
       queryClient.invalidateQueries({
        queryKey: [API_ROUTE.gigs.getGigsByUserId],
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
  return { addGigs, isSuccess, isPending, isError, error };
}

export function useGetGigs(params = {}) {
  const constructQueryString = (params) => {
    const query = new URLSearchParams(params).toString();
    return query ? `&${query}` : "";
  };
  const queryKey = [API_ROUTE.gigs.getGigs, params];
  const { data, error, isLoading, isError } = useQuery({
    queryKey,
    queryFn: () =>
      api.get(`${API_ROUTE.gigs.getGigs}?${constructQueryString(params)}`),
  });
  return { gigs: data?.data?.data, error, isLoading, isError };
}

export function useGetSingleGigs(id) {
  const { data, isSuccess, isPending, isError, isLoading } = useQuery({
    queryKey: [API_ROUTE.gigs.getSingleGigs, id],
    queryFn: async () => await api.get(`${API_ROUTE.gigs.getSingleGigs}/${id}`),
    // refetchOnWindowFocus: true,
    // staleTime: 60000,
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


export function useGetGigsByUser() {
  const freelancerDetails = useSelector(state=> state.userProfile.userProfile)
  const { data, isSuccess, isPending, isError, isLoading } = useQuery({
    queryKey: [API_ROUTE.gigs.getGigsByUserId, freelancerDetails.id],
    queryFn: async () => await api.get(`${API_ROUTE.gigs.getGigsByUserId}/${freelancerDetails.id}`),
  });
  return {
    data: data?.data?.data,
    isSuccess,
    isPending,
    isError,
    isLoading,
  };
}