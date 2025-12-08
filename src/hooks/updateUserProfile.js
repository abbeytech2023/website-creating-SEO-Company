import { useMutation } from "@tanstack/react-query";
import { UpdateUserData } from "../services/apiUpdateProfile";

export function useUpdateUserData(id) {
  const { mutate } = useMutation({
    mutationFn: (data) => UpdateUserData(data, id),
    onSuccess: () => toast.success("saved"),
  });

  return { mutate };
}
