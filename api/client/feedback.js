import { toast } from "react-toastify";
import api from "../axios";
import API_ROUTE from "../endpoints";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export function useAddFeedback() {
  const navigate = useNavigate();
  const { mutate: addFeedback, isSuccess, isPending, isError, error } = useMutation({
    mutationFn: async (data) =>
      await api.post(`${API_ROUTE.feedback.addFeedback}`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: api.defaults.headers.common["Authorization"],
        },
        timeout: 30000,
      }),
    onError: (error) => {
      toast.error("Error while submitting feedback.");
    },
  });
  return { addFeedback, isSuccess, isPending, isError, error };
}
