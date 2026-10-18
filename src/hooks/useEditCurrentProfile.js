import { useMutation } from "@tanstack/react-query";
import { editCurrentSchool } from "../services/apiSchools";

export function useEditCurrentProfile() {
  const { mutateAsync: editProfile, isPending: isEditing } = useMutation({
    mutationFn: editCurrentSchool,
  });

  return {
    editProfile,
    isEditing,
  };
}
