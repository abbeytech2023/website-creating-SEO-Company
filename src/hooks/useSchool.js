import { useQuery } from "@tanstack/react-query";
import { useAuthContext } from "./useAuthContext";
import { getCurrentSchool } from "../services/apiSchools";

export function useSchool() {
  const { user } = useAuthContext();

  const {
    data: school,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["school", user?.id],

    queryFn: () => getCurrentSchool(user.id),

    enabled: !!user?.id,
  });

  return {
    school,
    isLoading,
    error,
  };
}
