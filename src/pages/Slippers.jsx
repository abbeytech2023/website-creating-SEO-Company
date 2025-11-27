import React from "react";
import ProductCard from "../components/ProductCard";
import { useGetShoes } from "../hooks/useProducts";
import { useGetSlippers } from "../hooks/useProducts";

export default function Slippers() {
  const { data: shoes } = useGetShoes();
  const { data: slippers } = useGetSlippers();

  const palm = slippers || [];

  return (
    <section className="p-6 grid gap-6 md:grid-cols-3">
      {palm && palm.map((p) => <ProductCard key={p.id} product={p} />)}
    </section>
  );
}
