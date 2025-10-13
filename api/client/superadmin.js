import API_ROUTE from "../endPoints";
import api from "../axios/index";
import { useQuery } from "@tanstack/react-query";

export function useGetStatisticData() {
  const queryKey = [API_ROUTE.superadmin.statisticData];
  const { data, error, isLoading, isError } = useQuery({
    queryKey,
    queryFn: () =>
      api.get(`${API_ROUTE.superadmin.statisticData}`),
  });
  return {
    data: data?.data?.data,
    error,
    isLoading,
    isError,
  };
}

export function useGetAllUsers(params = {}) {
  const constructQueryString = (params) => {
    const query = new URLSearchParams(params).toString();
    return query ? `?${query}` : "";
  };

  const queryKey = [API_ROUTE.superadmin.getAllUsers, params];

  const { data, error, isLoading, isError } = useQuery({
    queryKey,
    queryFn: () =>
      api.get(`${API_ROUTE.superadmin.getAllUsers}${constructQueryString(params)}`),
  });

  return {
    data: data?.data?.data,
    error,
    isLoading,
    isError,
  };
}


export function useGetAllFreelancers(params = {}) {
  const constructQueryString = (params) => {
    const query = new URLSearchParams(params).toString();
    return query ? `?${query}` : "";
  };

  const queryKey = [API_ROUTE.superadmin.getAllFreelancers, params];

  const { data, error, isLoading, isError } = useQuery({
    queryKey,
    queryFn: () =>
      api.get(`${API_ROUTE.superadmin.getAllFreelancers}${constructQueryString(params)}`),
  });

  return {
    data: data?.data?.data,
    error,
    isLoading,
    isError,
  };
}

export function useGetAllGigs(params = {}) {
  const constructQueryString = (params) => {
    const query = new URLSearchParams(params).toString();
    return query ? `?${query}` : "";
  };

  const queryKey = [API_ROUTE.superadmin.getAllGigs, params];

  const { data, error, isLoading, isError } = useQuery({
    queryKey,
    queryFn: () =>
      api.get(`${API_ROUTE.superadmin.getAllGigs}${constructQueryString(params)}`),
  });

  return {
    data: data?.data?.data, 
    error,
    isLoading,
    isError,
  };
}


export function useGetAllProjects(params = {}) {
  const constructQueryString = (params) => {
    const query = new URLSearchParams(params).toString();
    return query ? `?${query}` : "";
  };

  const queryKey = [API_ROUTE.superadmin.getAllProjects, params];

  const { data, error, isLoading, isError } = useQuery({
    queryKey,
    queryFn: () =>
      api.get(`${API_ROUTE.superadmin.getAllProjects}${constructQueryString(params)}`),
  });

  return {
    data: data?.data?.data, 
    error,
    isLoading,
    isError,
  };
}

export function useGetAllJobs(params = {}) {
  const constructQueryString = (params) => {
    const query = new URLSearchParams(params).toString();
    return query ? `&${query}` : "";
  };
  const { data, isSuccess, isPending, isError, isLoading } = useQuery({
    queryKey: [API_ROUTE.superadmin.getAllJobs, params],
    queryFn: async () => await api.get(`${API_ROUTE.superadmin.getAllJobs}?${constructQueryString(params)}`),
    // refetchOnWindowFocus: true,
    // staleTime: 0,
    // refetchOnMount: true,
  });
  return {
    data: data?.data?.data,
    totalPages: data?.data?.totalPages,
    active_jobs: data?.data?.active_jobs,
    isSuccess,
    isPending,
    isError,
    isLoading,
  };
}
