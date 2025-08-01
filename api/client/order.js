import API_ROUTE from "../endpoints";
import { useMutation } from "@tanstack/react-query";
import api from "../axios/index";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";

export function useGetOrderByFreelancer(params = {}) {
    const profileDetails = useSelector(state => state.userProfile.userProfile)
    const { id } = profileDetails
    const constructQueryString = (params) => {
        const query = new URLSearchParams(params).toString();
        return query ? `&${query}` : "";
    };
    const queryKey = [API_ROUTE.stripeorder.getOrderByFreelancer, params];
    const { data, error, isLoading, isError } = useQuery({
        queryKey,
        queryFn: () =>
            api.get(`${API_ROUTE.stripeorder.getOrderByFreelancer}/${id}?${constructQueryString(params)}`),
    });
    return { data: data?.data?.data, error, isLoading, isError };
}

export function useGetOrderByClient(params = {}) {
    const clientDetails = useSelector(state => state.user.userDetails)
  const { id } = clientDetails
    const constructQueryString = (params) => {
        const query = new URLSearchParams(params).toString();
        return query ? `&${query}` : "";
    };
    const queryKey = [API_ROUTE.order.getAllOrderByClient, params];
    const { data, error, isLoading, isError } = useQuery({
        queryKey,
        queryFn: () =>
            api.get(`${API_ROUTE.order.getAllOrderByClient}/${id}?${constructQueryString(params)}`),
    });
    return { data: data?.data?.data, error, isLoading, isError };
}

export function useSingleOrderByFreelancer(id) {
  return useQuery({
    queryKey: ['singleOrderByFreelancer', id],
    queryFn: async () => {
      const response = await api.get(`${API_ROUTE.stripeorder.getSingleOrderByFreelancer}/${id}`);
      return response.data.data; // Backend response ka jo asli order data hai
    },
    enabled: Boolean(id),
  });
}

