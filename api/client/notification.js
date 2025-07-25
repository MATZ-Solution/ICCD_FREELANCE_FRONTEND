import API_ROUTE from "../endpoints";
import api from "../axios/index";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";

export function useGetNotification(id, params = {}) {
    const constructQueryString = (params) => {
        const query = new URLSearchParams(params).toString();
        return query ? `&${query}` : "";
    };
    const queryKey = [API_ROUTE.notifications.getNofication, params];
    const { data, error, isLoading, isError } = useQuery({
        queryKey,
        queryFn: () =>
            api.get(`${API_ROUTE.notifications.getNofication}/${id}?${constructQueryString(params)}`),
    });
    return { data: data?.data?.data, error, isLoading, isError };
}

export function useGetUnReadCountNot(id) {
    const queryKey = [API_ROUTE.notifications.unread_count];
    const { data, error, isLoading, isError } = useQuery({
        queryKey,
        queryFn: () =>
            api.get(`${API_ROUTE.notifications.unread_count}/${id}`),
    });
    return { data: data?.data?.data, error, isLoading, isError };
}

export function useUpdateReadNot(id) {
    const queryKey = [API_ROUTE.notifications.mark_read];
    const { data, error, isLoading, isError } = useQuery({
        queryKey,
        queryFn: () =>
            api.put(`${API_ROUTE.notifications.mark_read}/${id}`),
    });
    return { data: data?.data?.data, error, isLoading, isError };
}

