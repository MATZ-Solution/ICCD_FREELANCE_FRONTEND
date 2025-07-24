import API_ROUTE from "../endpoints";
import api from "../axios/index";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";

export function useGetNotification(params = {}) {
    const client = useSelector((state) => state.user.userDetails);
    const { id } = client
    const constructQueryString = (params) => {
        const query = new URLSearchParams(params).toString();
        return query ? `&${query}` : "";
    };
    const queryKey = [API_ROUTE.notifications.getNofication, params];
    const { data, error, isLoading, isError } = useQuery({
        queryKey,
        queryFn: () =>
            api.get(`${API_ROUTE.notifications.getNofication}?${constructQueryString(params)}`),
    });
    return { data: data?.data?.data, error, isLoading, isError };
}