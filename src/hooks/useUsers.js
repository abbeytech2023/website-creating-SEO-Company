import { useQuery } from "@tanstack/react-query";
import { getAkubeStores, getShoeMakers, getUsers } from "../services/apiUsers";

export function useGetShoeMakers() {
  const { data } = useQuery({
    queryKey: ["shoe-makers"],
    queryFn: getShoeMakers,
  });

  return { data };
}

export function useGetAkubeStores() {
  const { data } = useQuery({
    queryKey: ["akube-stores"],
    queryFn: getAkubeStores,
  });

  return { data };
}
