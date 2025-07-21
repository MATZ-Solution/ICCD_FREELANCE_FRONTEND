import api from "../axios";
import API_ROUTE from "../endpoints";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";


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
    enabled: id !== undefined && id !== null
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


export function useAddJob() {
    // const pathname = usePathname();
    // const queryClient = useQueryClient();
    // const { dispatch } = useGlobalState();

    const { mutate: addjob, isSuccess, isPending, isError, error} = useMutation({
        mutationFn: async (data) =>
            await api.post(`${API_ROUTE.job.addJob}`, data, {
                headers: {
                    "Content-Type": "application/json",
                    
                    Authorization: api.defaults.headers.common["Authorization"],
                },
                timeout: 30000,
            }),
        onSuccess: (data) => {
            alert("job added successfully!")

        },
        onError: (error) => {
            // Toast.show({
            //     type: "error",
            //     text1: "Error",
            //     text2: "Failed to edit scout",
            // });
        },
    });
    return { addjob, isSuccess, isPending, isError, error };
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

export function useEditJobs(id) {
  // const pathname = usePathname();
  const queryClient = useQueryClient();
  // const { dispatch } = useGlobalState();

  const {
    mutate: editJob,
    isSuccess,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: async (data) =>
      await api.put(`${API_ROUTE.job.editJob}/${id}`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: api.defaults.headers.common["Authorization"],
        },
        timeout: 30000,
      }),
    onSuccess: (data) => {
       queryClient.invalidateQueries({
        queryKey: [API_ROUTE.job.getJobsByClient],
      });
      alert("Job Edit Successfully")
    },
    onError: (error) => {
      // Toast.show({
      //     type: "error",
      //     text1: "Error",
      //     text2: "Failed to edit scout",
      // });
    },
  });
  return { editJob, isSuccess, isPending, isError, error };
}
