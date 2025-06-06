import API_ROUTE from "../endpoints"
import { useQuery } from "@tanstack/react-query"
import api from "../axios"

export function useCheck(){

   const { data, error, isSuccess, isPending, isError } = useQuery({
        queryKey: [API_ROUTE.user.checkapi],
        queryFn: () => api.get(API_ROUTE.user.checkapi),
        
    })
    return {
        data: data?.data, error, isSuccess, isPending, isError
    }
}