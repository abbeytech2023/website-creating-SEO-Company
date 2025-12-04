import React from "react";
import ProductCard from "../components/ProductCard";
import { useGetShoes } from "../hooks/useProducts";

export default function Shop() {
  const { data: shoes } = useGetShoes();

  return (
    <section className="p-6 grid gap-6 md:grid-cols-3">
      {shoes && shoes.map((p) => <ProductCard key={p.id} product={p} />)}
    </section>
  );
}
