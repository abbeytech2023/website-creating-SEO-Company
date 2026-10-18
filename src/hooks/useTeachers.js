import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { registerTeacher } from "../services/apiAuth";

export function useRegisterTeacher() {
  const queryClient = useQueryClient();

  const { mutate: register_teacher, isPending } = useMutation({
    mutationFn: registerTeacher,

    onSuccess: () => {
      toast.success("Teacher registered successfully!");

      queryClient.invalidateQueries({
        queryKey: ["teachers"],
      });
    },

    onError: (error) => {
      toast.error(error.message);
    },
  });

  return {
    register_teacher,
    isPending,
  };
}
