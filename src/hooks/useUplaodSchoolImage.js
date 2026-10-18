import { useMutation } from "@tanstack/react-query";
import { uploadSchoolImage } from "../services/apiUploadSchoolImage";

export function useUploadSchoolImage() {
  const { mutateAsync: uploadImage, isPending: isUploading } = useMutation({
    mutationFn: uploadSchoolImage,
  });

  return {
    uploadImage,
    isUploading,
  };
}
