import api from "../axios";
import API_ROUTE from "../endpoints";
import { useMutation, useQuery } from "@tanstack/react-query";

// multipart form data
export function useAddproject() {
    // const pathname = usePathname();
    // const queryClient = useQueryClient();
    // const { dispatch } = useGlobalState();

    const { mutate: addProject, isSuccess, isPending, isError, error} = useMutation({
        mutationFn: async (data) =>
            await api.post(`${API_ROUTE.project.addProject}`, data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: api.defaults.headers.common["Authorization"],
                },
                timeout: 30000,
            }),
        onSuccess: (data) => {
            alert("Project added successfully!")

        },
        onError: (error) => {
            // Toast.show({
            //     type: "error",
            //     text1: "Error",
            //     text2: "Failed to edit scout",
            // });
        },
    });
    return { addProject, isSuccess, isPending, isError, error };
}

// get project by user
export function useGetProjectsByClient() {
  const { data, isSuccess, isPending, isError, isLoading } = useQuery({
    queryKey: [API_ROUTE.project.getProjectByClient],
    queryFn: async () => await api.get(`${API_ROUTE.project.getProjectByClient}`),
  });
  return {
    data: data?.data?.data,
    isSuccess,
    isPending,
    isError,
    isLoading,
  };
}

// get project by user
export function useGetAllProjects() {
  const { data, isSuccess, isPending, isError, isLoading } = useQuery({
    queryKey: [API_ROUTE.project.getAllProject],
    queryFn: async () => await api.get(`${API_ROUTE.project.getAllProject}`),
  });
  return {
    data: data?.data?.data,
    isSuccess,
    isPending,
    isError,
    isLoading,
  };
}

export function useGetProjectsById(id) {
  const { data, isSuccess, isPending, isError, isLoading } = useQuery({
    queryKey: [API_ROUTE.project.getProjectById],
    queryFn: async () => await api.get(`${API_ROUTE.project.getProjectById}/${id}`),
  });
  return {
    data: data?.data?.data,
    isSuccess,
    isPending,
    isError,
    isLoading,
  };
}

export function useApplyProject() {
    
    const { mutate: submitProposals, isSuccess, isPending, isError, error} = useMutation({
        mutationFn: async (data) =>
            await api.post(`${API_ROUTE.project.submitProposals}`, data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: api.defaults.headers.common["Authorization"],
                },
                timeout: 30000,
            }),
        onSuccess: (data) => {
            alert("CV send successfully!")

        },
        onError: (error) => {
            // Toast.show({
            //     type: "error",
            //     text1: "Error",
            //     text2: "Failed to edit scout",
            // });
        },
    });
    return { submitProposals, isSuccess, isPending, isError, error };
}
