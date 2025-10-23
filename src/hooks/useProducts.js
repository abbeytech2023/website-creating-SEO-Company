import { useQuery } from "@tanstack/react-query";
import { getShoes, getSlippers } from "../services/apiProducts";

export function useGetShoes() {
  const { data } = useQuery({
    queryKey: ["shoes"],
    queryFn: getShoes,
  });

  return { data };
}

export function useGetSlippers() {
  const { data } = useQuery({
    queryKey: ["slippers"],
    queryFn: getSlippers,
  });

  return { data };
}
