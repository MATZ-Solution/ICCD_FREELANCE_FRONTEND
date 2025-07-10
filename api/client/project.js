import api from "../axios";
import API_ROUTE from "../endpoints";
import { useMutation } from "@tanstack/react-query";

export function useGetProjectById(id) {
    const { data, isSuccess, isPending, isError, isLoading } = useQuery({
        queryKey: [API_ROUTE.project.getProjectById, id],
        queryFn: async () => await api.get(`${API_ROUTE.project.getProjectById}/${id}`),
        // refetchOnWindowFocus: true,
        // staleTime: 0,
        // refetchOnMount: true,
    });
    return {
        data: data?.data,
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
        return query ? `&${query}` : '';
    };

    const queryKey = [API_ROUTES.SCOUT.GET_SCOUT_FILTER, params];

    const { data, error, isLoading, isError } = useQuery(
        {
            queryKey,
            queryFn: () => api.get(`${API_ROUTES.SCOUT.GET_SCOUT_FILTER}?${constructQueryString(params)
                }`)
        }
    );
    return { scoutEntries: data?.data?.data, totalRecords: data?.data?.totalRecords, error, isLoading, isError };
}

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
            // alert("Project added successfully!")

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

// get project
export function useGetProject(params = {}) {
    const constructQueryString = (params) => {
        const query = new URLSearchParams(params).toString();
        return query ? `&${query}` : '';
    };
    const queryKey = [API_ROUTE.project.getProject, params];
    const { data, error, isLoading, isError } = useQuery(
        {
            queryKey,
            queryFn: () => api.get(`${API_ROUTE.project.getProject}?${constructQueryString(params)}`)
        }
    );
    return { projects: data?.data?.data, error, isLoading, isError };
}
