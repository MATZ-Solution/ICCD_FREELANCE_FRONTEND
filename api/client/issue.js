import { toast } from "react-toastify";
import api from "../axios";
import API_ROUTE from "../endpoints";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export function useAddIssue() {
  const navigate = useNavigate();
  const { mutate: addIssue, isSuccess, isPending, isError, error } = useMutation({
    mutationFn: async (data) =>
      await api.post(`${API_ROUTE.issue.addIssue}`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: api.defaults.headers.common["Authorization"],
        },
        timeout: 30000,
      }),
    onError: (error) => {
      toast.error("Error while submitting issue.");
    },
  });
  return { addIssue, isSuccess, isPending, isError, error };
}
