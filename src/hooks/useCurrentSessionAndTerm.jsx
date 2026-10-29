import { useQuery } from "@tanstack/react-query";
import { getCurrentSessionAndTerm } from "../services/getCurrentSessionTerm";

export function useCurrentSessionAndTerm(school_id) {
  return useQuery({
    queryKey: ["current_session_and_term", school_id],
    queryFn: () => getCurrentSessionAndTerm(school_id),
    enabled: Boolean(school_id),
  });
}
