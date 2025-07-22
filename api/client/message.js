import api from "../axios";
import API_ROUTE from "../endpoints";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";


export function useAddMessage() {
    // const pathname = usePathname();
    const queryClient = useQueryClient();
    // const { dispatch } = useGlobalState();

    const { mutate: addMessage, isSuccess, isPending, isError, error } = useMutation({
        mutationFn: async (data) =>
            await api.post(`${API_ROUTE.messages.addMessageByUser}`, data, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: api.defaults.headers.common["Authorization"],
                },
                timeout: 30000,
            }),
        onSuccess: (data) => {
            // alert("Message send successfully!")
            queryClient.invalidateQueries({
                queryKey: [API_ROUTE.messages.getAllMessageByUser],
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
    return { addMessage, isSuccess, isPending, isError, error };
}

export function useGetAllMessagesByUser() {
    const { data, isSuccess, isPending, isError, isLoading } = useQuery({
        queryKey: [API_ROUTE.messages.getAllMessageByUser],
        queryFn: async () => await api.get(`${API_ROUTE.messages.getAllMessageByUser}`),
    });
    return {
        data: data?.data?.data,
        isSuccess,
        isPending,
        isError,
        isLoading,
    };
}

export function useGetAllMsgByReceiptant(params = {}) {
    const constructQueryString = (params) => {
        const query = new URLSearchParams(params).toString();
        return query ? `&${query}` : "";
    };

    const { data, isSuccess, isPending, isError, isLoading } = useQuery({
        queryKey: [API_ROUTE.messages.getMessageByUserWithRecipitant, params],
        queryFn: async () => await api.get(`${API_ROUTE.messages.getMessageByUserWithRecipitant}?${constructQueryString(params)}`),
        enabled: params.userId !== undefined && params.userId !== null && params.recipientId !== undefined && params.recipientId !== null
    });
    return {
        data: data?.data?.data,
        isSuccess,
        isPending,
        isError,
        isLoading,
    };
}