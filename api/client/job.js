import api from "../axios";
import API_ROUTE from "../endpoints";
import { useQuery } from "@tanstack/react-query";

export function useGetAllJobs(params = {}) {
  const constructQueryString = (params) => {
    const query = new URLSearchParams(params).toString();
    return query ? `&${query}` : "";
  };
  const { data, isSuccess, isPending, isError, isLoading } = useQuery({
    queryKey: [API_ROUTE.job.getAllJob, params],
    queryFn: async () => await api.get(`${API_ROUTE.job.getAllJob}?${constructQueryString(params)}`),
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

export function useGetJobById(id) {
  const { data, isSuccess, isPending, isError, isLoading } = useQuery({
    queryKey: [API_ROUTE.job.getJobById, id],
    queryFn: async () => await api.get(`${API_ROUTE.job.getJobById}/${id}`),
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

// infinite query
export function useGetScoutFilterEntries(params = {}) {
  const constructQueryString = (params) => {
    const query = new URLSearchParams(params).toString();
    return query ? `&${query}` : "";
  };

  const queryKey = [API_ROUTES.SCOUT.GET_SCOUT_FILTER, params];
  const { data, error, isLoading, isError } = useQuery({
    queryKey,
    queryFn: () =>
      api.get(
        `${API_ROUTE.SCOUT.GET_SCOUT_FILTER}?${constructQueryString(params)}`
      ),
  });
  return {
    scoutEntries: data?.data?.data,
    totalRecords: data?.data?.totalRecords,
    error,
    isLoading,
    isError,
  };
}

// multipart form data
export function useAddJob() {
  // const pathname = usePathname();
  // const queryClient = useQueryClient();
  // const { dispatch } = useGlobalState();

  const {
    mutate: addJob,
    isSuccess,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: async (data) =>
      await api.post(`${API_ROUTE.job.addJob}/${id}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: api.defaults.headers.common["Authorization"],
        },
        timeout: 30000,
      }),
    onSuccess: (data) => {},
    onError: (error) => {
      // Toast.show({
      //     type: "error",
      //     text1: "Error",
      //     text2: "Failed to edit scout",
      // });
    },
  });
  return { addJob, isSuccess, isPending, isError, reset, error, data };
}

// get project
export function useGetJob(params = {}) {
  const constructQueryString = (params) => {
    const query = new URLSearchParams(params).toString();
    return query ? `&${query}` : "";
  };
  const queryKey = [API_ROUTE.job.getJob, params];
  const { data, error, isLoading, isError } = useQuery({
    queryKey,
    queryFn: () =>
      api.get(`${API_ROUTE.job.getJob}?${constructQueryString(params)}`),
  });
  return { jobs: data?.data?.data, error, isLoading, isError };
}

export function useGetAllJobByClient(params = {}) {
  const constructQueryString = (params) => {
    const query = new URLSearchParams(params).toString();
    return query ? `&${query}` : "";
  };
  const { data, isSuccess, isPending, isError, isLoading } = useQuery({
    queryKey: [API_ROUTE.job.getJobsByClient, params],
    queryFn: async () => await api.get(`${API_ROUTE.job.getJobsByClient}?${constructQueryString(params)}`),
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
