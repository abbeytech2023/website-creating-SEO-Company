import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import {
  getAcademicSessions,
  deleteAcademicSession,
  createAcademicSession,
} from "../services/sessionService";

export function useAcademicSessions(schoolId) {
  return useQuery({
    queryKey: ["academic_sessions", schoolId],
    queryFn: () => getAcademicSessions(schoolId),
    enabled: Boolean(schoolId),
  });
}

export function useCreateAcademicSession() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createAcademicSession,

    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["academic_sessions", data.school_id],
      });
    },
  });
}

export function useDeleteAcademicSession() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ sessionId, schoolId }) =>
      deleteAcademicSession(sessionId, schoolId),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["academic_sessions", variables.schoolId],
      });
    },
  });
}
