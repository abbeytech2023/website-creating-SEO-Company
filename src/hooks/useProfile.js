import { useQuery } from "@tanstack/react-query";
import { getCurrentProfile } from "../services/apiProfiles";

export function useProfile() {
  const {
    data: profile,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["profile"],
    queryFn: getCurrentProfile,
  });

  return {
    profile,
    isLoading,
    error,
  };
}
