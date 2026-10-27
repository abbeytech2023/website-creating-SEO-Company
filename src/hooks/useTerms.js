import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { getTerms, createTerm, deleteTerm } from "../services/termService";

// GET TERMS
export function useTerms(schoolId) {
  return useQuery({
    queryKey: ["terms", schoolId],
    queryFn: () => getTerms(schoolId),
    enabled: Boolean(schoolId),
  });
}

// CREATE TERM
export function useCreateTerm() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTerm,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["terms", data.school_id],
      });
    },
  });
}

// DELETE TERM
export function useDeleteTerm() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ termId, schoolId }) => deleteTerm(termId, schoolId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["terms", variables.schoolId],
      });
    },
  });
}
