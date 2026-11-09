import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import {
  getSubjects,
  getSubjectById,
  createSubject,
  updateSubject,
  deleteSubject,
} from "../services/subjectsService";

export function useSubjects(school_id) {
  const queryClient = useQueryClient();

  // 1. GET ALL SUBJECTS
  const {
    data: subjects = [],
    isPending,
    error,
  } = useQuery({
    queryKey: ["subjects", school_id],
    queryFn: () => getSubjects(school_id),
    enabled: !!school_id,
  });

  // 2. GET ONE SUBJECT
  const get_subject = (subject_id) => {
    return queryClient.fetchQuery({
      queryKey: ["subject", school_id, subject_id],
      queryFn: () => getSubjectById({ subject_id, school_id }),
    });
  };

  // 3. CREATE SUBJECT
  const { mutate: create_subject, isPending: isCreating } = useMutation({
    mutationFn: createSubject,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["subjects", school_id],
      });
    },
  });

  // 4. UPDATE SUBJECT
  const { mutate: update_subject, isPending: isUpdating } = useMutation({
    mutationFn: updateSubject,

    onSuccess: (updated_subject) => {
      queryClient.invalidateQueries({
        queryKey: ["subjects", school_id],
      });

      queryClient.invalidateQueries({
        queryKey: ["subject", school_id, updated_subject.id],
      });
    },
  });

  // 5. DELETE SUBJECT
  const { mutate: delete_subject, isPending: isDeleting } = useMutation({
    mutationFn: deleteSubject,

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["subjects", school_id],
      });

      queryClient.removeQueries({
        queryKey: ["subject", school_id, variables.subject_id],
      });
    },
  });

  return {
    subjects,
    isPending,
    error,

    get_subject,

    create_subject,
    isCreating,

    update_subject,
    isUpdating,

    delete_subject,
    isDeleting,
  };
}
