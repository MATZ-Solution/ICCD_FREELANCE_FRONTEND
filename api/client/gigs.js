import API_ROUTE from "../endpoints";
import { useMutation } from "@tanstack/react-query";
import api from "../axios/index";


export function useAddGigs() {
    // const pathname = usePathname();
    // const queryClient = useQueryClient();
    // const { dispatch } = useGlobalState();

    const { mutate: addGigs, isSuccess, isPending, isError, error} = useMutation({
        mutationFn: async (data) =>
            await api.post(`${API_ROUTE.gigs.addGigs}`, data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: api.defaults.headers.common["Authorization"],
                },
                timeout: 30000,
            }),
        onSuccess: (data) => {

        },
        onError: (error) => {
            // Toast.show({
            //     type: "error",
            //     text1: "Error",
            //     text2: "Failed to edit scout",
            // });
        },
    });
    return { addGigs, isSuccess, isPending, isError, error};
}