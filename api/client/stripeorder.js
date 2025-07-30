import API_ROUTE from "../endpoints";
import api from "../axios/index";
import { useQuery } from "@tanstack/react-query";

export function useGetAllOrders(params = {}) {
  const constructQueryString = (params) => {
    const query = new URLSearchParams(params).toString();
    return query ? `?${query}` : "";
  };

  const queryKey = [API_ROUTE.stripeorder.getOrderAllOrder, params];

  const { data, error, isLoading, isError } = useQuery({
    queryKey,
    queryFn: () =>
      api.get(`${API_ROUTE.stripeorder.getOrderAllOrder}${constructQueryString(params)}`),
  });

  return {
    data: data?.data?.orders,
    error,
    isLoading,
    isError,
  };
}
