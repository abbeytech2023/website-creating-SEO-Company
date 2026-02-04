import React from "react";
import ProductCard from "../components/ProductCard";
import { useGetShoes } from "../hooks/useProducts";

export default function Shop() {
  const { data: shoes } = useGetShoes();

  return (
    <section className="p-10 grid sm:grid-cols-2   gap-8 md:grid-cols-3">
      {shoes && shoes.map((p) => <ProductCard key={p.id} product={p} />)}
    </section>
  );
}
