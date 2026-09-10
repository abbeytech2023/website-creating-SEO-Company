import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { getStudents } from "../services/apiStudentService";

import { addStudent as addStudentService } from "../services/apiStudentService";

export function useAddStudent() {
  const queryClient = useQueryClient();

  const {
    mutate: addStudent,
    isPending,
    error,
  } = useMutation({
    mutationFn: addStudentService,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["students"],
      });

      toast.success("Student registered successfully!");
    },

    onError: (error) => {
      toast.error(error.message || "Failed to register student.");
    },
  });

  return {
    addStudent,
    isPending,
    error,
  };
}

export function useStudents() {
  const {
    data: students,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["students"],
    queryFn: getStudents,
  });

  console.log(students);

  return {
    students,
    isLoading,
    error,
  };
}
