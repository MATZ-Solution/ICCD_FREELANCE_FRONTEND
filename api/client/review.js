import API_ROUTE from "../endpoints";
import { useMutation } from "@tanstack/react-query";
import api from "../axios/index";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export function useAddRating() {
  const queryClient = useQueryClient();
  const { mutate: addRating, isSuccess, isPending, isError, error } = useMutation({
    mutationFn: async (data) =>
      await api.post(`${API_ROUTE.rating.addFreelancerRating}`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: api.defaults.headers.common["Authorization"],
        },
        timeout: 30000,
      }),
    onSuccess: (data) => {
      toast.success("Rating Added successfully!")
    },
    onError: (error) => {
      toast.error("Error In Addding Rating!")
    },
  });
  return { addRating, isSuccess, isPending, isError, error };
}