import API_ROUTE from "../endPoints";
import api from "../axios/index";
import { useQuery } from "@tanstack/react-query";
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

  // yahan pe hum 'data?.data' use kar rahe hain 
  // kyunke 'data' React Query response ka part hai, aur 'data.data' backend se aaya hua JSON hai
  return {
    data: data?.data?.data,  // backend response ke andar 'data' key mein users array hai
    error,
    isLoading,
    isError,
  };
}
