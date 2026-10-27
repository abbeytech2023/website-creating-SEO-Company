import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiUploadProfileImage } from "../services/apiUploadSchoolImage";
import toast from "react-hot-toast";

export function useApiUploadProfileImage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: apiUploadProfileImage,

    onSuccess: (updatedUser) => {
      toast.success("Profile image updated!");

      // 🔥 Update cached user instantly
      queryClient.setQueryData(["user", updatedUser.id], updatedUser);

      // optional: refetch user list if needed
      queryClient.invalidateQueries(["users"]);
    },

    onError: (err) => {
      toast.error(err.message || "Upload failed");
    },
  });
}
