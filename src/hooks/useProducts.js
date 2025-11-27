import { useQuery } from "@tanstack/react-query";
import {
  getShoes,
  getSlippers,
  getSingleShoes,
  getSingleSlippers,
} from "../services/apiProducts";

export function useGetShoes() {
  const { data } = useQuery({
    queryKey: ["shoes"],
    queryFn: getShoes,
  });

  return { data };
}

export function useGetSingleShoes(id) {
  const { data } = useQuery({
    queryKey: ["shoes"],
    queryFn: () => getSingleShoes(id),
  });

  return data;
}

export function useGetSlippers() {
  const { data } = useQuery({
    queryKey: ["slippers"],
    queryFn: getSlippers,
  });

  return { data };
}

export function useGetSingleSlippers(id) {
  const { data } = useQuery({
    queryKey: ["shoes"],
    queryFn: () => getSingleSlippers(id),
  });

  return data;
}
