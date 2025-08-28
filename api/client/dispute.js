import API_ROUTE from "../endpoints";
import { useMutation } from "@tanstack/react-query";
import api from "../axios/index";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export function useAddDispute() {
    const { mutate: addDispute, isSuccess, isPending, isError, error } = useMutation({
        mutationFn: async (data) =>
            await api.post(`${API_ROUTE.dispute.addDispute}`, data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: api.defaults.headers.common["Authorization"],
                },
                timeout: 30000,
            }),
        onSuccess: (data) => {
            toast.success("Dispute Added successfully!")
        },
        onError: (error) => {
            toast.error("Error In Addding Dispute!")
        },
    });
    return { addDispute, isSuccess, isPending, isError, error };
}

export function useGetAllDisputeByClient(id) {
  const { data, isSuccess, isPending, isError, isLoading } = useQuery({
    queryKey: [API_ROUTE.dispute.getAllDisputeByClient, id],
    queryFn: async () => await api.get(`${API_ROUTE.dispute.getAllDisputeByClient}/${id}`),
    // enabled: id !== undefined && id !== null,
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

export function useGetAllDisputeByFreelancer(id) {
  const { data, isSuccess, isPending, isError, isLoading } = useQuery({
    queryKey: [API_ROUTE.dispute.getAllDisputeByFreelancer, id],
    queryFn: async () => await api.get(`${API_ROUTE.dispute.getAllDisputeByFreelancer}/${id}`),
    // enabled: id !== undefined && id !== null,
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

export function useGetDisputeById(id) {
  const { data, isSuccess, isPending, isError, isLoading } = useQuery({
    queryKey: [API_ROUTE.dispute.getDisputeById, id],
    queryFn: async () => await api.get(`${API_ROUTE.dispute.getDisputeById}/${id}`),
    // enabled: id !== undefined && id !== null,
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

export function useGetAllDisputeByAdmin(params = {}) {
  const constructQueryString = (params) => {
    const query = new URLSearchParams(params).toString();
    return query ? `&${query}` : "";
  };
  const queryKey = [API_ROUTE.dispute.getAllDisputeByAdmin, params];
  const { data, error, isLoading, isError } = useQuery({
    queryKey,
    queryFn: () =>
      api.get(`${API_ROUTE.dispute.getAllDisputeByAdmin}?${constructQueryString(params)}`),
  });
  return { data: data?.data?.data, error, isLoading, isError };
}

export function useGetDisputeAdminById(id) {
  const { data, isSuccess, isPending, isError, isLoading } = useQuery({
    queryKey: [API_ROUTE.dispute.getDisputeAdminById, id],
    queryFn: async () => await api.get(`${API_ROUTE.dispute.getDisputeAdminById}/${id}`),
    // enabled: id !== undefined && id !== null,
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



