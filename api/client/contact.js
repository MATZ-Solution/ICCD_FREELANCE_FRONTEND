import { toast } from "react-toastify";
import api from "../axios";
import API_ROUTE from "../endpoints";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export function useAddContact() {
  const navigate = useNavigate();
  const { mutate: addContact, isSuccess, isPending, isError, error } = useMutation({
    mutationFn: async (data) =>
      await api.post(`${API_ROUTE.contact.addContacts}`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: api.defaults.headers.common["Authorization"],
        },
        timeout: 30000,
      }),
    onError: (error) => {
      toast.error("Error while submitting form.");
    },
  });
  return { addContact, isSuccess, isPending, isError, error };
}
