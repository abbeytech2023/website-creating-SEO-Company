import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import {
  getClasses,
  createClass,
  updateClass,
  deleteClass,
} from "../services/classService";

export function useClasses(school_id) {
  const queryClient = useQueryClient();

  // 1. FETCH CLASSES
  const {
    data: classes = [],
    isPending,
    error,
  } = useQuery({
    queryKey: ["classes", school_id],
    queryFn: () => getClasses(school_id),
    enabled: !!school_id,
  });

  // 2. CREATE CLASS
  const {
    mutate: add_class,
    mutateAsync: add_class_async,
    isPending: isAdding,
  } = useMutation({
    mutationFn: (class_data) =>
      createClass({
        ...class_data,
        school_id,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["classes", school_id],
      });
      toast.success("class added successfully");
    },
  });

  // 3. UPDATE CLASS
  const {
    mutate: edit_class,
    mutateAsync: edit_class_async,
    isPending: isUpdating,
  } = useMutation({
    mutationFn: ({ class_id, class_name, section }) =>
      updateClass({
        class_id,
        class_name,
        section,
        school_id,
      }),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["classes", school_id],
      });

      toast.success("Class updated successfully!");
    },

    onError: (error) => {
      toast.error(error.message || "Failed to update class.");
      console.log(error.message);
    },
  });

  // 4. DELETE CLASS
  const {
    mutate: remove_class,
    mutateAsync: remove_class_async,
    isPending: isDeleting,
  } = useMutation({
    mutationFn: (class_id) =>
      deleteClass({
        class_id,
        school_id,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["classes", school_id],
      });
    },
  });

  return {
    // Fetch
    classes,
    isPending,
    error,

    // Create
    add_class,
    add_class_async,
    isAdding,

    // Update
    edit_class,
    edit_class_async,
    isUpdating,

    // Delete
    remove_class,
    remove_class_async,
    isDeleting,
  };
}
